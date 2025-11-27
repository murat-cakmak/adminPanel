import type { SectorTemplate } from "@/lib/sectorConfig";

export function SectorCard({ template }: { template: SectorTemplate }) {
  return (
    <div className="card glow flex h-full flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="badge text-white/90">
            <span className="text-lg">{template.icon}</span>
            <span>{template.title}</span>
          </div>
          <p className="mt-2 text-sm text-white/70">{template.summary}</p>
        </div>
        <div
          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${template.gradient} opacity-90 shadow-card`}
        />
      </div>
      <div className="space-y-3 text-sm text-white/80">
        {template.modules.map((mod) => (
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
            <p className="mt-1 text-white/70">{mod.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/80">
              {mod.kpis.map((kpi) => (
                <span
                  key={kpi}
                  className="rounded-full bg-brand-primary/20 px-2 py-1 text-brand-secondary"
                >
                  {kpi}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="button-primary w-full">Sektör Şablonunu Aktifleştir</button>
    </div>
  );
}
