import Link from "next/link";

export default function Home() {
  return (
    <main className="login-page">
      <div className="login-card">
        <h1>Admin Paneli</h1>
        <p>Yönetim paneline giriş yapmak için devam edin.</p>
        <Link className="button" href="/login">
          Giriş Yap
        </Link>
      </div>
    </main>
  );
}
