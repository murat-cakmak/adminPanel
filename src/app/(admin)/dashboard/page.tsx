const stats = [
  { label: "Toplam Blog Yazısı", value: "124", delta: "+5%" },
  { label: "Yayındaki Projeler", value: "45", delta: "+2%" },
  { label: "Bekleyen Teklifler", value: "3", delta: "Bekliyor" },
  { label: "Toplam Kullanıcı", value: "1,205", delta: "+8%" }
];

const activities = [
  {
    name: "Ahmet Yılmaz",
    detail: "yeni bir yorum yaptı.",
    time: "5 dakika önce"
  },
  {
    name: "Ayşe Demir",
    detail: "yeni üye kaydı.",
    time: "1 saat önce"
  },
  {
    name: "XYZ Ltd. Şti.",
    detail: "yeni bir teklif formu gönderdi.",
    time: "3 saat önce"
  }
];

export default function DashboardPage() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <section>
        <h1 style={{ margin: 0 }}>Genel Bakış</h1>
        <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
          Site istatistikleri ve aktiviteleri burada görüntüleniyor.
        </p>
      </section>

      <section className="card-grid">
        {stats.map((stat) => (
          <div className="card stat-card" key={stat.label}>
            <div className="label">{stat.label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="value">{stat.value}</div>
              <span className="badge">{stat.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="card chart">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Ziyaretçi İstatistiği</strong>
            <div style={{ display: "flex", gap: 8 }}>
              <span className="badge">7 Gün</span>
              <span className="badge" style={{ background: "#eef2ff", color: "#1e3a8a" }}>
                30 Gün
              </span>
            </div>
          </div>
          <div className="bars">
            {["60%", "70%", "55%", "80%", "65%", "100%", "75%"].map(
              (height, index) => (
                <div
                  key={`${height}-${index}`}
                  className={`bar${index === 5 ? " active" : ""}`}
                  style={{ height }}
                />
              )
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", color: "var(--muted)", fontSize: 12 }}>
            {["Pts", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Son Aktiviteler</strong>
            <a href="/" style={{ fontSize: 12, color: "var(--primary)" }}>
              Tümü
            </a>
          </div>
          <div className="activities">
            {activities.map((activity) => (
              <div className="activity-item" key={activity.name}>
                <img
                  src={`https://i.pravatar.cc/100?u=${activity.name}`}
                  alt={activity.name}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{activity.name}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {activity.detail}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <strong>Hızlı İşlemler</strong>
        <div className="quick-actions" style={{ marginTop: 12 }}>
          <button className="button" type="button">
            Yeni Blog Ekle
          </button>
          <button className="button secondary" type="button">
            Hizmet Ekle
          </button>
          <button className="button secondary" type="button">
            Teklifleri İncele
          </button>
        </div>
      </section>
    </div>
  );
}
