import { query } from "@/lib/db";

export type DashboardStats = {
  tenants: number;
  modules: number;
  kpis: number;
  integrations: number;
};

export type KpiInfo = {
  id: string;
  name: string;
  unit: string | null;
  description: string | null;
};

export type ModuleWithKpis = {
  id: string;
  name: string;
  summary: string | null;
  status: string | null;
  kpis: KpiInfo[];
};

type ModuleRow = ModuleWithKpis & { sector_id: string };

type SectorRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
};

export type SectorWithModules = SectorRow & {
  modules: ModuleWithKpis[];
};

export type RolePersona = {
  role: string;
  focus: string;
  expectations: string;
};

export type KpiHighlight = {
  id: string;
  name: string;
  value: string;
  unit: string | null;
  periodEnd: string | null;
  description: string | null;
};

export type DemoUser = {
  email: string;
  status: string;
  roles: string;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [tenantStat] = await query<{ count: number }>("SELECT COUNT(*) AS count FROM tenants");
  const [moduleStat] = await query<{ count: number }>("SELECT COUNT(*) AS count FROM modules");
  const [kpiStat] = await query<{ count: number }>("SELECT COUNT(*) AS count FROM kpi_definitions");
  const [integrationStat] = await query<{ count: number }>(
    "SELECT COUNT(*) AS count FROM integration_endpoints"
  );

  return {
    tenants: tenantStat?.count ?? 0,
    modules: moduleStat?.count ?? 0,
    kpis: kpiStat?.count ?? 0,
    integrations: integrationStat?.count ?? 0,
  };
}

export async function getSectorsWithModules(): Promise<SectorWithModules[]> {
  const sectors = await query<SectorRow>(
    "SELECT id, code, name, description FROM sectors ORDER BY name ASC"
  );
  if (!sectors.length) return [];

  const modules = await query<ModuleRow>(
    "SELECT id, sector_id, name, summary, status FROM modules ORDER BY name ASC"
  );
  const kpis = await query<KpiInfo & { module_id: string }>(
    "SELECT id, module_id, name, unit, description FROM kpi_definitions"
  );

  const modulesBySector = modules.reduce<Record<string, ModuleWithKpis[]>>((acc, mod) => {
    if (!acc[mod.sector_id as string]) acc[mod.sector_id as string] = [];
    acc[mod.sector_id as string].push({
      ...mod,
      kpis: [],
    });
    return acc;
  }, {});

  kpis.forEach((kpi) => {
    Object.values(modulesBySector).forEach((mods) => {
      mods.forEach((mod) => {
        if (mod.id === kpi.module_id) {
          mod.kpis.push({
            id: kpi.id,
            name: kpi.name,
            unit: kpi.unit,
            description: kpi.description,
          });
        }
      });
    });
  });

  return sectors.map((sector) => ({
    ...sector,
    modules: modulesBySector[sector.id] ?? [],
  }));
}

export async function getRolePersonas(): Promise<RolePersona[]> {
  const roles = await query<{ name: string; description: string | null; scope: string | null }>(
    "SELECT name, description, scope FROM roles ORDER BY name ASC LIMIT 6"
  );

  const scopeFocus: Record<string, string> = {
    platform: "Kimlik, yetki, entegrasyon",
    business: "Operasyon ve iş akışı",
    analytics: "Raporlama ve KPI görünürlüğü",
  };

  return roles.map((role) => ({
    role: role.name,
    focus: scopeFocus[role.scope ?? "business"] ?? "Operasyon",
    expectations: role.description || "Rol tanımı güncellenmeli",
  }));
}

export async function getKpiHighlights(): Promise<KpiHighlight[]> {
  const rows = await query<{
    id: string;
    name: string;
    unit: string | null;
    description: string | null;
    value: number | string;
    period_end: Date | null;
  }>(
    `
    SELECT kd.id, kd.name, kd.unit, kd.description, kv.value, kv.period_end
    FROM kpi_definitions kd
    JOIN kpi_values kv ON kv.kpi_id = kd.id
    ORDER BY kv.period_end DESC
    LIMIT 4
    `
  );

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    unit: row.unit,
    description: row.description,
    value: typeof row.value === "number" ? row.value.toString() : row.value,
    periodEnd: row.period_end ? row.period_end.toISOString().slice(0, 10) : null,
  }));
}

export async function getDemoUsers(): Promise<DemoUser[]> {
  return query<DemoUser>(
    `
    SELECT 
      u.email,
      u.status,
      COALESCE(GROUP_CONCAT(DISTINCT r.name ORDER BY r.name SEPARATOR ', '), 'Rol atanmadı') AS roles
    FROM users u
    LEFT JOIN user_roles ur ON ur.user_id = u.id
    LEFT JOIN roles r ON r.id = ur.role_id
    GROUP BY u.id
    ORDER BY (u.last_login_at IS NULL) ASC, u.last_login_at DESC
    LIMIT 4
    `
  );
}

export async function getDashboardData() {
  const [stats, sectors, personas, kpiHighlights] = await Promise.all([
    getDashboardStats(),
    getSectorsWithModules(),
    getRolePersonas(),
    getKpiHighlights(),
  ]);

  return { stats, sectors, personas, kpiHighlights };
}
