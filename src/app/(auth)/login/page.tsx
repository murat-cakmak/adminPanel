export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div>
          <strong>Yönetici Girişi</strong>
          <p style={{ margin: "6px 0 0", color: "var(--muted)" }}>
            Kontrol paneline erişmek için kimliğinizi doğrulayın.
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="email">Kullanıcı adı veya e-posta</label>
          <input id="email" type="email" placeholder="admin@sirket.com" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input id="password" type="password" placeholder="••••••••" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: 12, color: "var(--muted)" }}>
            <input type="checkbox" style={{ marginRight: 6 }} /> Beni hatırla
          </label>
          <a href="/" style={{ fontSize: 12, color: "var(--primary)" }}>
            Şifremi unuttum?
          </a>
        </div>
        <button className="button" type="button">
          Güvenli Giriş
        </button>
        <p className="login-footer">
          Sisteme erişim sorunu yaşıyorsanız destek ekibine ulaşın.
        </p>
      </div>
    </main>
  );
}
