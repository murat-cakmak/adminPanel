import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-6 py-10">
      <div className="w-full max-w-lg space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-card">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary" />
          <h1 className="text-2xl font-semibold text-white">Admin Paneli Giriş</h1>
          <p className="text-sm text-white/70">
            JWT + Session uyumlu login akışı için form bileşeni. Backend uçlarını ekleyerek
            hazır hale getirin.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-white/80" htmlFor="email">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-xl border border-white/10 bg-brand-dark px-4 py-3 text-white focus:border-brand-secondary focus:outline-none"
              placeholder="admin@ornek.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/80" htmlFor="password">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-xl border border-white/10 bg-brand-dark px-4 py-3 text-white focus:border-brand-secondary focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-brand-dark" />
              Beni hatırla
            </label>
            <Link href="#" className="text-brand-secondary hover:text-brand-primary">
              Şifremi unuttum
            </Link>
          </div>
          <button type="submit" className="button-primary w-full text-base">
            Giriş yap
          </button>
        </form>
        <div className="rounded-2xl border border-white/10 bg-brand-dark p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Demo hesaplar</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>admin@ornek.com / Çok Faktörlü ile oturum</li>
            <li>operasyon@ornek.com / RBAC ile kısıtlı modüller</li>
            <li>misafir@ornek.com / sadece rapor okuma</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
