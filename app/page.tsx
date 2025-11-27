import { SectorCard } from "@/components/ui/SectorCard";
import { StatCard } from "@/components/ui/StatCard";
import { TopBar } from "../components/layout/TopBar";
import { getDashboardData } from "@/lib/dashboardData";

const accentPalette = [
  "from-brand-primary to-brand-secondary",
  "from-brand-secondary to-brand-accent",
  "from-emerald-400 to-brand-secondary",
  "from-orange-400 to-brand-primary",
  "from-brand-accent to-pink-500",
];

export default async function Home() {
  const { stats, sectors, personas, kpiHighlights } = await getDashboardData();
  return (
    <main className="min-h-screen">
      <TopBar />
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="card glow space-y-4 p-6">
            <p className="badge">Çoklu sektör — SaaS uyumlu — RBAC — MySQL</p>
            <h1 className="text-3xl font-semibold leading-tight text-white">
              Ürün geliştirirken hızlanmanız için sektör bağımsız admin paneli taslağı
            </h1>
            <p className="text-white/70">
              Veri modelini, oturum açmayı, yetki kurgusunu ve KPI şablonlarını hazır
              getiren Next.js + MySQL başlangıç paketi. Tüm sektör modülleri bileşen
              bazlıdır, kolayca özelleştirilip devre dışı bırakılabilir.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              <span className="badge">JWT + Session destekli kimlik</span>
              <span className="badge">Çoklu tenant & RBAC</span>
              <span className="badge">Audit & log tutma</span>
              <span className="badge">Hazır KPI kartları</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                label="Tenant"
                value={stats.tenants.toString()}
                trend="Aktif müşteri"
              />
              <StatCard
                label="Modül"
                value={stats.modules.toString()}
                trend="Sektör modülü"
              />
              <StatCard
                label="KPI"
                value={stats.kpis.toString()}
                trend="Takip edilen gösterge"
              />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {personas.length ? (
                personas.map((persona) => (
                  <div
                    key={persona.role}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm text-white/60">{persona.role}</p>
                    <p className="text-white font-semibold">{persona.focus}</p>
                    <p className="mt-2 text-white/70 text-sm">{persona.expectations}</p>
                  </div>
                ))
              ) : (
                <div
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
                >
                  Rol verisi bulunamadı. `roles` tablosuna kayıt ekleyin veya seed çalıştırın.
                </div>
              )}
            </div>
          </div>
          <div className="card glow p-6 space-y-4">
            <p className="badge">Güvenlik & Altyapı</p>
            <div className="space-y-3 text-sm text-white/80">
              <Item label="Kimlik & Yetki" detail="JWT + HttpOnly cookie, bcrypt, RBAC hiyerarşisi" />
              <Item label="Çoklu Tenant" detail="Şirket bazlı veri ayrıştırma, config tabloları" />
              <Item label="Audit" detail="Günlük bazlı event log, ip/device fingerprint" />
              <Item label="Bildirim" detail="E-posta, webhook, bildirim kutusu altyapısı" />
              <Item label="Raporlama" detail="KPI kartları, hızlı filtreler, kaydedilmiş görünümler" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              <p className="text-white font-semibold">Teknik Yığın</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Next.js 14 App Router, React Server Components</li>
                <li>TailwindCSS taslak bileşenleri</li>
                <li>PlanetScale/MySQL uyumlu SQL şeması</li>
                <li>Auth için JWT & session saklama hazır kanca yerleri</li>
              </ul>
            </div>
          </div>
        </div>

        <section id="sectors" className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Sektör şablonları</h2>
            <p className="text-sm text-white/70">Her biri modüler yapıda, veri modeli ve KPI önerileriyle</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {sectors.length ? (
              sectors.map((sector, idx) => (
                <SectorCard
                  key={sector.id}
                  sector={sector}
                  accentClass={accentPalette[idx % accentPalette.length]}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                Sektör kaydı bulunamadı. `sectors` ve `modules` tablolarını doldurun veya
                `database/seed.sql` dosyasını çalıştırın.
              </div>
            )}
          </div>
        </section>

        <section id="metrics" className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="card glow space-y-4 p-6">
            <p className="badge">KPI & dashboard kurguları</p>
            <h3 className="text-xl font-semibold text-white">Hazır gösterge panelleri</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {kpiHighlights.length ? (
                kpiHighlights.map((kpi) => (
                  <StatCard
                    key={kpi.id}
                    label={kpi.name}
                    value={kpi.unit ? `${kpi.value} ${kpi.unit}` : kpi.value}
                    trend={kpi.periodEnd ? `Bitiş: ${kpi.periodEnd}` : undefined}
                  />
                ))
              ) : (
                <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
                  KPI verisi bulunamadı. `kpi_definitions` ve `kpi_values` tablolarına kayıt
                  ekleyin.
                </div>
              )}
            </div>
          </div>
          <div className="card glow space-y-3 p-6" id="architecture">
            <p className="badge">Mimarî taslak</p>
            <h3 className="text-xl font-semibold text-white">Katmanlı mimari</h3>
            <ul className="list-disc space-y-2 pl-4 text-sm text-white/80">
              <li>UI: Next.js RSC, route segmentleriyle rol bazlı sayfalar</li>
              <li>Domain: Sektör modülleri için esnek hizmet sınıfları</li>
              <li>Data: Repository pattern, MySQL üzerinde view & index önerileri</li>
              <li>Observability: AuditLog + Activity feed tabloları</li>
              <li>Deployment: Container tabanlı, CDN + Edge cache uyumu</li>
            </ul>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
              Login, tenant, rol ve audit akışları için API uçları hazır yer imleri ile birlikte
              gelir. Sonraki adımda Next.js API route veya edge function ile doldurulabilir.
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Item({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <span className="mt-1 h-2 w-2 rounded-full bg-brand-secondary" aria-hidden />
      <div>
        <p className="font-semibold text-white">{label}</p>
        <p className="text-white/70">{detail}</p>
      </div>
    </div>
  );
}
