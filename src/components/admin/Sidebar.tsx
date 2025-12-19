import Link from "next/link";

const navItems = [
  { label: "Kontrol Paneli", href: "/dashboard" },
  { label: "Blog", href: "/blog" },
  { label: "Projeler", href: "/projects" },
  { label: "Hizmetler", href: "/services" },
  { label: "Kullanıcılar", href: "/users" },
  { label: "Ayarlar", href: "/home-settings" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Admin avatar"
          loading="lazy"
        />
        <div>
          <strong>Admin Paneli</strong>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Yönetici</div>
        </div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <Link
            className={item.href === "/dashboard" ? "active" : ""}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: "auto", display: "grid", gap: 12 }}>
        <Link className="nav-item" href="/settings">
          ⚙️ Ayarlar
        </Link>
        <Link className="nav-item" href="/login">
          🚪 Çıkış Yap
        </Link>
      </div>
    </aside>
  );
}
