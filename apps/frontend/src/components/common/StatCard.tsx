import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'slate';
}

const colorStyles = {
  primary: 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-indigo-100',
  success: 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-100',
  warning: 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-100',
  danger: 'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-100',
  slate: 'bg-slate-100 text-slate-700 border-slate-200 shadow-slate-100',
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
}) => {
  return (
    <Card3DTilt maxTilt={5} scale={1.02} glare={true}>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-500">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-black text-secondary-900 tracking-tight">{value}</h3>
              {trend && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                    trend.isPositive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
              )}
            </div>
            {subtitle && <p className="text-[11px] text-secondary-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform ${colorStyles[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Card3DTilt>
  );
};
