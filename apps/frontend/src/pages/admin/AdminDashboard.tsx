import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { mockDashboard } from '../../services/mockData';
import { StatCard } from '../../components/common/StatCard';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Users,
  GraduationCap,
  Building2,
  CalendarCheck,
  UserX,
  CreditCard,
  FileCheck2,
  ArrowUpRight,
  TrendingUp,
  UserCheck2,
  Calendar,
  Plus,
  Sparkles,
  Bot,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  FileText,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';

const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EC4899'];

export const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiCard, setShowAiCard] = useState(true);

  const fetchAiSummary = async () => {
    setAiLoading(true);
    try {
      const res: any = await api.post('/ai/executive-summary', {});
      const aiData = res?.data?.highlights ? res.data : res?.highlights ? res : res?.data;
      setAiSummary(aiData);
    } catch (e) {
      // Fallback structured briefing
      setAiSummary({
        schoolName: 'Greenwood International Academy',
        mode: 'AI_EXECUTIVE_AGENT',
        highlights: [
          'Admission Momentum: Inbound enquiries surging 24% month-on-month with 78% conversion to school visits.',
          'Fee Collection Realization: ₹22.75 Lakhs collected to date. Current collection efficiency at 92.4%.',
          'Attendance Integrity: 94.6% average student attendance this week with 0 unexcused teacher absences.',
        ],
        riskAlerts: [
          '5 new website admission enquiries awaiting counselor follow-up within 24h SLA.',
          'Class 9-B and 10-A have 14 overdue fee reminders pending term exam roll-number dispatch.',
        ],
        actionRecommendations: [
          'Trigger automated WhatsApp fee reminder blast to pending guardians prior to next installment cutoff.',
          'Schedule Principal Open House webinar this Saturday for prospective Class 11 Science/Commerce parents.',
        ],
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      try {
        const res: any = await api.get('/dashboard');
        // Support both the API envelope and an already-unwrapped response.
        const dashboard = res?.data?.stats ? res.data : res?.stats ? res : null;
        if (active && dashboard?.stats && dashboard?.charts && dashboard?.widgets) {
          setData(dashboard);
        } else if (active) {
          // Keep the dashboard usable if the API returns an unexpected payload.
          setData(mockDashboard);
        }
      } catch (error) {
        console.error('Unable to load dashboard data; showing demo data.', error);
        if (active) setData(mockDashboard);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadDashboard();

    fetchAiSummary();

    return () => {
      active = false;
    };
  }, []);

  if (loading && !data) {
    return <LoadingSkeleton rows={8} />;
  }

  const { stats, charts, widgets } = data || mockDashboard;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner & Quick Actions */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Real-time analytics and management oversight for Greenwood International Academy • AY 2026-27
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/admissions"
            className="px-3.5 py-2 rounded-lg bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <UserCheck2 className="w-3.5 h-3.5" />
            <span>Admission CRM</span>
          </Link>
          <Link
            to="/admin/students"
            className="px-3.5 py-2 rounded-lg border border-appBorder text-secondary-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit Student</span>
          </Link>
          <Link
            to="/admin/attendance"
            className="px-3.5 py-2 rounded-lg border border-appBorder text-secondary-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Mark Attendance</span>
          </Link>
          <Link
            to="/admin/fees"
            className="px-3.5 py-2 rounded-lg border border-appBorder text-secondary-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Fee Collection</span>
          </Link>
        </div>
      </div>

      {/* 10 Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Enrolled on campus"
          icon={GraduationCap}
          trend={{ value: '4.8% vs last year', isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          subtitle="Postgraduate faculty"
          icon={Users}
          color="slate"
        />
        <StatCard
          title="Total Staff"
          value={stats.totalStaff}
          subtitle="Support & Admin"
          icon={Building2}
          color="slate"
        />
        <StatCard
          title="Classes & Wings"
          value={stats.totalClasses}
          subtitle="Pre-KG to Class 12"
          icon={Building2}
          color="primary"
        />
        <StatCard
          title="Total Enquiries"
          value={stats.totalAdmissionEnquiries}
          subtitle="Session 2026-27"
          icon={UserCheck2}
          trend={{ value: '18% this month', isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Approved Admissions"
          value={stats.newAdmissions}
          subtitle="Converted leads"
          icon={FileCheck2}
          color="success"
        />
        <StatCard
          title="Present Today"
          value={stats.presentStudentsToday}
          subtitle={`Attendance rate ${stats.attendanceRateToday}`}
          icon={CalendarCheck}
          color="success"
        />
        <StatCard
          title="Absent Today"
          value={stats.absentStudentsToday}
          subtitle="Leaves & unexcused"
          icon={UserX}
          color="danger"
        />
        <StatCard
          title="Fees Collected"
          value={`₹${(stats.totalFeesCollected / 100000).toFixed(2)} L`}
          subtitle="Total verified revenue"
          icon={CreditCard}
          trend={{ value: '92% target', isPositive: true }}
          color="success"
        />
        <StatCard
          title="Pending Fees"
          value={`₹${(stats.totalFeesPending / 1000).toFixed(1)} K`}
          subtitle="Outstanding invoices"
          icon={CreditCard}
          color="warning"
        />
      </div>

      {/* AI School Report Assistant: Executive Briefing Widget */}
      {showAiCard && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-primary-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Bot className="w-48 h-48 text-indigo-400" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/80 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/80 text-white flex items-center justify-center shadow-inner border border-white/20">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-white tracking-tight">AI Executive Briefing</h3>
                    <span className="text-[10px] bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-bold">
                      AI School Report Assistant
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Continuous cross-module analysis across Attendance, Admissions, and Fee Collections
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchAiSummary}
                  disabled={aiLoading}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/10 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? 'Analyzing...' : 'Refresh AI Analysis'}</span>
                </button>
                <button
                  onClick={() => setShowAiCard(false)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {aiSummary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* 1. Key Performance Highlights */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2.5">
                  <h4 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Operational Highlights
                  </h4>
                  <ul className="space-y-2 text-slate-200 leading-relaxed">
                    {aiSummary.highlights?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Priority Risk Alerts */}
                <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-500/20 space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Attention & Risk Flags
                  </h4>
                  <ul className="space-y-2 text-amber-100/90 leading-relaxed">
                    {aiSummary.riskAlerts?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold mt-0.5">⚠️</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Action Recommendations */}
                <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-500/20 space-y-2.5">
                  <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    Recommended Executive Actions
                  </h4>
                  <ul className="space-y-2 text-emerald-100/90 leading-relaxed">
                    {aiSummary.actionRecommendations?.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-indigo-900/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Status: <strong className="text-emerald-400">AI Demo Mode (LLM API Ready)</strong></span>
              <span>Audited under Greenwood Academic Oversight Committee</span>
            </div>
          </div>
        </div>
      )}

      {/* 5 Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Monthly Admission & Enquiry Trend */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-secondary-900">Admission CRM Pipeline Trends</h3>
              <p className="text-xs text-secondary-500">Monthly comparison of inbound enquiries vs completed admissions</p>
            </div>
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded">2026</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.monthlyAdmissions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Bar dataKey="enquiries" fill="#C7D2FE" name="Enquiries" radius={[4, 4, 0, 0]} />
                <Bar dataKey="count" fill="#4F46E5" name="Enrolled" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Class-wise Student Distribution */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-base font-bold text-secondary-900">Wing-wise Enrollment</h3>
            <p className="text-xs text-secondary-500">Distribution across school divisions</p>
          </div>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.classDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="students"
                >
                  {charts.classDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-secondary-600 pt-2 border-t border-appBorder">
            {charts.classDistribution.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="truncate">{item.name}: {item.students}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Fee Collection vs Target Trend */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-secondary-900">Monthly Fee Collection (in ₹ Lakhs)</h3>
              <p className="text-xs text-secondary-500">Collected amounts vs budgeted targets</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">Razorpay & Offline</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.monthlyFeeCollection} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Area type="monotone" dataKey="target" stroke="#CBD5E1" fill="#F8FAFC" name="Target (Lakhs)" />
                <Area type="monotone" dataKey="collected" stroke="#10B981" fill="#D1FAE5" name="Collected (Lakhs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Attendance Trend (Last 6 Days) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-secondary-900">Weekly Attendance Rate (%)</h3>
              <p className="text-xs text-secondary-500">Campus-wide daily present percentage</p>
            </div>
            <span className="text-xs font-bold text-emerald-600">Avg 94.4%</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[85, 100]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    color: '#FFF',
                    fontSize: '12px',
                    border: 'none',
                  }}
                />
                <Line type="monotone" dataKey="rate" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} name="Present %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Widgets Grid: Recent Enquiries & Pending Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Enquiries Table Widget */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-secondary-900">Recent Admission Enquiries</h3>
              <p className="text-xs text-secondary-500">Live website leads awaiting follow-up</p>
            </div>
            <Link to="/admin/admissions" className="text-xs font-bold text-primary-600 hover:underline">
              View All Enquiries →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-y border-appBorder text-secondary-600 font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-3">Enquiry No</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Parent Contact</th>
                  <th className="py-2.5 px-3">Lead Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-appBorder text-secondary-700">
                {widgets.recentEnquiries.map((enq: any) => (
                  <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-primary-600">{enq.enquiryNumber}</td>
                    <td className="py-2.5 px-3 font-bold text-secondary-900">{enq.studentName}</td>
                    <td className="py-2.5 px-3">{enq.applyingClass}</td>
                    <td className="py-2.5 px-3">
                      <div>{enq.parentName}</div>
                      <div className="text-[10px] text-secondary-400">{enq.phone}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <StatusBadge status={enq.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Fee Invoices Widget */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-secondary-900">Pending Fee Invoices</h3>
              <p className="text-xs text-secondary-500">Immediate follow-ups required</p>
            </div>
            <Link to="/admin/fees" className="text-xs font-bold text-primary-600 hover:underline">
              View All Invoices →
            </Link>
          </div>

          <div className="space-y-3">
            {widgets.pendingInvoices.map((inv: any) => (
              <div
                key={inv.id}
                className="p-3 rounded-xl bg-slate-50 border border-appBorder flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-secondary-900">{inv.studentName}</p>
                  <p className="text-[11px] text-secondary-500">
                    {inv.invoiceNumber} • {inv.className}-{inv.sectionName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rose-600">₹{inv.balanceAmount.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] font-semibold text-secondary-400">Due {inv.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

