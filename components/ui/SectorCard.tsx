import type { SectorWithModules } from "@/lib/dashboardData";

type SectorCardProps = {
  sector: SectorWithModules;
  accentClass?: string;
};

export function SectorCard({ sector, accentClass }: SectorCardProps) {
  return (
    <div className="card glow flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="badge text-white/90">
            <span className="text-lg">{sector.code.toUpperCase()}</span>
            <span>{sector.name}</span>
          </div>
          <p className="mt-2 text-sm text-white/70">
            {sector.description || "Sektör açıklaması henüz girilmedi."}
          </p>
        </div>
        <div
          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${accentClass ?? "from-brand-primary to-brand-secondary"} opacity-90 shadow-card`}
        />
      </div>
      <div className="space-y-3 text-sm text-white/80">
        {sector.modules.map((mod) => (
          <div
            key={mod.name}
            className="rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{mod.name}</p>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/70">
                {mod.kpis.length} KPI
              </span>
            </div>
            <p className="mt-1 text-white/70">{mod.summary || "Özet bilgisi ekleyin"} </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
              {mod.kpis.map((kpi) => (
                <span
                  key={kpi.id}
                  className="rounded-full bg-brand-primary/20 px-2 py-1 text-brand-secondary"
                >
                  {kpi.name}
                </span>
              ))}
              {!mod.kpis.length ? (
                <span className="rounded-full bg-white/10 px-2 py-1 text-white/60">
                  KPI ekleyin
                </span>
              ) : null}
            </div>
          </div>
        ))}
        {!sector.modules.length ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-white/70">
            Bu sektör için henüz modül eklenmedi.
          </div>
        ) : null}
      </div>
      <button className="button-primary w-full">Sektör Şablonunu Aktifleştir</button>
    </div>
  );
}
