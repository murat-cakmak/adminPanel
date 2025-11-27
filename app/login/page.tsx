import { getDemoUsers } from "@/lib/dashboardData";
import { LoginForm } from "@/components/login/LoginForm";

export default async function LoginPage() {
  const demoUsers = await getDemoUsers();

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

        <LoginForm />

        {demoUsers.length ? (
          <div className="rounded-2xl border border-white/10 bg-brand-dark p-4 text-sm text-white/70">
            <p className="font-semibold text-white">Demo hesaplar (veritabanından)</p>
            <ul className="mt-2 space-y-2">
              {demoUsers.map((user) => (
                <li key={user.email} className="flex flex-col gap-1 rounded-lg bg-white/5 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">{user.email}</span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase text-white/70">
                      {user.status}
                    </span>
                  </div>
                  <span className="text-xs text-white/60">{user.roles}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-brand-dark p-4 text-sm text-white/70">
            Demo kullanıcı bulunamadı. `users` ve `roles` tablolarına kayıt ekleyin veya
            `database/seed.sql` dosyasını çalıştırın.
          </div>
        )}
      </div>
    </main>
  );
}
