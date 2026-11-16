import React from 'react';
import { LucideIcon, FolderOpen } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="space-y-3 animate-pulse p-4">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-slate-100 rounded w-full"></div>
      ))}
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = FolderOpen,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-appBorder my-4">
      <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-secondary-900">{title}</h3>
      <p className="text-sm text-secondary-500 max-w-sm mt-1">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

