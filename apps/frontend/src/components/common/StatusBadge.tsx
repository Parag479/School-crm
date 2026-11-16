import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const statusMap: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  // Leads
  NEW_ENQUIRY: { label: 'New Enquiry', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  CONTACTED: { label: 'Contacted', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  FOLLOW_UP: { label: 'Follow Up', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  SCHOOL_VISIT: { label: 'School Visit', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  APPLICATION_SUBMITTED: { label: 'Application Submitted', bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  DOCUMENT_VERIFICATION: { label: 'Doc Verification', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  APPROVED: { label: 'Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  REJECTED: { label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },

  // Attendance
  PRESENT: { label: 'Present', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  ABSENT: { label: 'Absent', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  LATE: { label: 'Late', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  LEAVE: { label: 'Leave', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  HALF_DAY: { label: 'Half Day', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },

  // Payments / Invoices
  PAID: { label: 'Paid', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  PARTIAL: { label: 'Partial', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  PENDING: { label: 'Pending', bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
  OVERDUE: { label: 'Overdue', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },

  // General Status
  ACTIVE: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  INACTIVE: { label: 'Inactive', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  SUCCESS: { label: 'Success', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  ISSUED: { label: 'Issued', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  RETURNED: { label: 'Returned', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusMap[status] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

