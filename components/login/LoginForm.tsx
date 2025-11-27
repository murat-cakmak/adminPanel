'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Demo amaçlı: gerçek auth endpoint yok. Form gönderilince home'a yönlendiriyoruz.
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "").trim();

      if (!email || !password) {
        setError("E-posta ve şifre gerekli");
        return;
      }

      // TODO: /api/login eklendiğinde burada fetch yapın ve gelen JWT/Session'ı yönetin.
      router.push("/");
    },
    [router]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm text-white/80" htmlFor="email">
          E-posta
        </label>
        <input
          id="email"
          name="email"
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
          name="password"
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
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button type="submit" className="button-primary w-full text-base">
        Giriş yap
      </button>
    </form>
  );
}
