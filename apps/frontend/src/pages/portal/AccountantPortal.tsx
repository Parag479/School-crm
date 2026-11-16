import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Printer,
  FileSpreadsheet,
  LogOut,
  Receipt,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AccountantPortal: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get('/fees/invoices'), api.get('/payments')])
      .then(([invRes, payRes]: any) => {
        setInvoices(invRes.data);
        setPayments(payRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalPending = invoices.reduce((sum, i) => sum + (i.balanceAmount || 0), 0);

  if (loading) return <LoadingSkeleton rows={8} />;

  return (
    <div className="min-h-screen bg-slate-50 text-appText pb-16">
      {/* Header */}
      <header className="bg-white border-b border-appBorder sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-secondary-900 tracking-tight">Finance & Accounts Desk</h1>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                Greenwood International Academy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="text-xs font-bold text-secondary-600 hover:text-primary-600 hidden sm:block"
            >
              Switch to Admin CRM →
            </Link>
            <div className="flex items-center gap-2 pl-3 border-l border-appBorder">
              <span className="text-xs font-bold text-secondary-900">{user?.name || 'Accounts Officer'}</span>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-1.5 rounded-lg text-secondary-500 hover:text-rose-600 hover:bg-slate-100"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">Total Fees Collected</p>
            <h2 className="text-3xl font-black text-emerald-600 mt-1">₹{totalCollected.toLocaleString('en-IN')}</h2>
            <p className="text-xs text-secondary-500 mt-1">Verified Razorpay & Offline payments</p>
          </div>

          <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">Total Outstanding Balance</p>
            <h2 className="text-3xl font-black text-rose-600 mt-1">₹{totalPending.toLocaleString('en-IN')}</h2>
            <p className="text-xs text-secondary-500 mt-1">Unpaid student quarterly invoices</p>
          </div>

          <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary-400">Total Invoices Billed</p>
            <h2 className="text-3xl font-black text-secondary-900 mt-1">{invoices.length}</h2>
            <p className="text-xs text-secondary-500 mt-1">Academic Session 2026-27</p>
          </div>
        </div>

        {/* Action Link */}
        <div className="flex justify-end">
          <Link
            to="/admin/fees"
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5"
          >
            <Receipt className="w-4 h-4" />
            <span>Open Complete Invoicing Engine</span>
          </Link>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-secondary-900">Verified Payment Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary-50 border-b border-appBorder uppercase font-bold text-secondary-600">
                <tr>
                  <th className="p-3">Receipt No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Payment Mode</th>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-appBorder text-secondary-700">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-primary-600">{p.receiptNumber}</td>
                    <td className="p-3 font-bold text-secondary-900">{p.studentName}</td>
                    <td className="p-3 font-bold text-emerald-600">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3 font-semibold">{p.paymentMode}</td>
                    <td className="p-3 font-mono text-secondary-500">{p.transactionReference || p.razorpayPaymentId || '—'}</td>
                    <td className="p-3 text-secondary-500">{new Date(p.paidAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

