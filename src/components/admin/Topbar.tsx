export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <strong>Kontrol Paneli</strong>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Hoş geldiniz, Admin
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="search">🔍 Ara...</div>
        <div>🔔</div>
      </div>
    </header>
  );
}
