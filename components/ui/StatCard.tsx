import { ReactNode } from "react";

export type StatCardProps = {
  label: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, trend, icon }: StatCardProps) {
  return (
    <div className="card glow flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>{label}</span>
        {icon}
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
      {trend ? <span className="text-emerald-400 text-sm">{trend}</span> : null}
    </div>
  );
}
