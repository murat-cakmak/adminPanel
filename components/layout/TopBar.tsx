import Link from "next/link";
import { navItems } from "@/lib/navigation";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 bg-brand-dark/80 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary shadow-card" />
          <div>
            <p className="text-sm text-white/60">Çoklu Sektör Yönetim Paneli</p>
            <p className="font-semibold text-lg">AdminOS</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 hover:border-white/30"
          >
            Login
          </Link>
          <button className="button-primary text-sm">Demo Paneli Aç</button>
        </div>
      </div>
    </header>
  );
}
