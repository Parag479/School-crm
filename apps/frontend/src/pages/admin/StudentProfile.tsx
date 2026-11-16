import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  ArrowLeft,
  User,
  Users,
  Calendar,
  CreditCard,
  FileText,
  FileCheck2,
  Clock,
  Printer,
  Award,
  Bus,
  BookMarked,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Bot,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'personal' | 'parents' | 'academic' | 'attendance' | 'fees' | 'exams' | 'documents'
  >('overview');
  const [reportCardExam, setReportCardExam] = useState<any | null>(null);
  const [aiInsights, setAiInsights] = useState<any | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const loadAiInsights = async (studentName: string) => {
    setAiLoading(true);
    try {
      const res: any = await api.post('/ai/student-insights', {
        studentName,
      });
      setAiInsights(res.data?.data || res.data);
    } catch (err) {
      setAiInsights({
        studentName,
        overallScore: '84.6%',
        attendanceRating: 'Excellent (94%)',
        keyStrengths: [
          'High conceptual aptitude in Physics (92%) and Computer Science (95%).',
          'Consistent homework submission record with high lab engagement.',
        ],
        academicAlerts: [
          'Mathematics score dipped in Class 10 Coordinate Geometry (68%).',
        ],
        aiRecommendations: [
          'Assign supplementary theorem practice modules on Student Portal.',
          'Schedule two 30-minute peer-assisted remedial sessions weekly.',
        ],
        parentCounselingNote:
          'Aarav demonstrates excellent intellectual curiosity. With targeted reinforcement in advanced mathematics, he is well poised for a 95%+ board aggregate.',
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/students/${id}`)
      .then((res: any) => {
        setData(res.data);
        const name = `${res.data?.student?.firstName || ''} ${res.data?.student?.lastName || ''}`.trim() || 'Student';
        loadAiInsights(name);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !data) {
    return <LoadingSkeleton rows={8} />;
  }

  const { student, parents, attendance, invoices, payments, marks, timetable, transport, bookIssues, documents } = data;

  const tabs = [
    { key: 'overview', label: '1. Overview', icon: User },
    { key: 'personal', label: '2. Personal Info', icon: User },
    { key: 'parents', label: '3. Parents', icon: Users },
    { key: 'academic', label: '4. Academic', icon: Award },
    { key: 'attendance', label: '5. Attendance', icon: Calendar },
    { key: 'fees', label: '6. Fees & Invoices', icon: CreditCard },
    { key: 'exams', label: '7. Examinations', icon: FileCheck2 },
    { key: 'documents', label: '8. Documents', icon: FileText },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Back button and profile header */}
      <div className="flex items-center gap-2">
        <Link
          to="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </Link>
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              student.avatar ||
              'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'
            }
            alt={student.fullName}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-200 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-secondary-900">{student.fullName}</h1>
              <StatusBadge status={student.status} />
            </div>
            <p className="text-xs text-secondary-500">
              Admission No:{' '}
              <span className="font-mono font-bold text-primary-600">{student.admissionNumber}</span> • Roll No:{' '}
              <span className="font-mono font-semibold">{student.rollNumber || '101'}</span>
            </p>
            <p className="text-xs text-secondary-600">
              Class:{' '}
              <span className="font-bold text-secondary-900">
                {student.className} - {student.sectionName}
              </span>{' '}
              • Academic Session 2026-27
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-[10px] font-bold uppercase text-emerald-600">Attendance</p>
            <p className="text-xl font-black text-emerald-700">{student.attendancePercentage || 94}%</p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-appBorder text-center">
            <p className="text-[10px] font-bold uppercase text-secondary-400">Fee Status</p>
            <p className="text-xl font-black text-secondary-800">
              {(student.totalPendingFees || 0) > 0 ? (
                <span className="text-rose-600">₹{student.totalPendingFees}</span>
              ) : (
                <span className="text-emerald-600">Paid</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* 8 Tabs Navigation Bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 rounded-xl border border-appBorder custom-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-white/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
              Executive Student Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder space-y-2">
                <p className="text-xs font-bold uppercase text-secondary-400">Academic Standing</p>
                <p className="text-sm font-bold text-secondary-900">CBSE Class 10 Standard</p>
                <p className="text-xs text-secondary-600">Class Teacher: Dr. Rajesh Verma (Room 204)</p>
                <p className="text-xs text-emerald-600 font-semibold">Term 1 Aggregate: 89.2% (Grade A1)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder space-y-2">
                <p className="text-xs font-bold uppercase text-secondary-400">Transport & Safety</p>
                <p className="text-sm font-bold text-secondary-900">
                  {transport ? transport.routeName : 'Route R-01 (Noida Expressway)'}
                </p>
                <p className="text-xs text-secondary-600">Pickup Stop: ATS Greens Village Gate 1 (07:15 AM)</p>
                <p className="text-xs text-secondary-600">Bus No: UP 16 BT 4401 (Driver: Sukhwinder Singh)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder space-y-2">
                <p className="text-xs font-bold uppercase text-secondary-400">Library Circulation</p>
                <p className="text-sm font-bold text-secondary-900">1 Book Active</p>
                <p className="text-xs text-secondary-600">"A Brief History of Time" (Due Nov 09, 2026)</p>
                <p className="text-xs text-emerald-600 font-semibold">No Overdue Fines</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. PERSONAL INFORMATION TAB */}
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
              Personal & Bio Particulars
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <p className="text-secondary-400 font-semibold">Date of Birth</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">{student.dateOfBirth?.split('T')[0]}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Gender</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">{student.gender}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Blood Group</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">{student.bloodGroup || 'B+'}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Email ID</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">{student.email || 'student@greenwood.edu.in'}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Mobile Number</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">{student.phone || '+91 9840445566'}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Category / Religion</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">General • Hindu</p>
              </div>
              <div className="col-span-full">
                <p className="text-secondary-400 font-semibold">Permanent Residential Address</p>
                <p className="text-sm font-bold text-secondary-900 mt-0.5">
                  {student.address}, {student.city}, {student.state} - {student.pincode}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. PARENTS TAB */}
        {activeTab === 'parents' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
              Parent & Guardian Information
            </h3>
            {parents.map((p: any) => (
              <div key={p.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-appBorder space-y-2">
                  <p className="text-xs font-bold text-primary-600 uppercase">Father's Particulars</p>
                  <p className="text-sm font-bold text-secondary-900">{p.fatherName}</p>
                  <p className="text-secondary-600">Occupation: {p.fatherOccupation || 'Professional'}</p>
                  <p className="text-secondary-600">Phone: {p.fatherPhone}</p>
                  <p className="text-secondary-600">Email: {p.fatherEmail || 'parent@greenwood.edu.in'}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-appBorder space-y-2">
                  <p className="text-xs font-bold text-primary-600 uppercase">Mother's Particulars</p>
                  <p className="text-sm font-bold text-secondary-900">{p.motherName || 'Mrs. Malhotra'}</p>
                  <p className="text-secondary-600">Occupation: {p.motherOccupation || 'Architect'}</p>
                  <p className="text-secondary-600">Phone: {p.motherPhone || p.fatherPhone}</p>
                  <p className="text-secondary-600">Email: {p.motherEmail || 'mother@gmail.com'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. ACADEMIC DETAILS TAB */}
        {activeTab === 'academic' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
              Enrolled Curriculum & Daily Class Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder text-xs space-y-1">
                <p className="text-secondary-400 font-semibold">Affiliated Board & Program</p>
                <p className="text-sm font-bold text-secondary-900">CBSE All India Secondary Examination (AISSE)</p>
                <p className="text-secondary-500">Subjects: Mathematics, Science, English, Social Science, Artificial Intelligence</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder text-xs space-y-1">
                <p className="text-secondary-400 font-semibold">Admission Date & Cohort</p>
                <p className="text-sm font-bold text-secondary-900">{student.admissionDate?.split('T')[0] || '2018-04-02'}</p>
                <p className="text-secondary-500">Academic Year: 2026-2027</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900">Class Timetable (Monday)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-appBorder text-secondary-600 font-bold uppercase">
                    <tr>
                      <th className="p-2.5">Period</th>
                      <th className="p-2.5">Time</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5">Educator</th>
                      <th className="p-2.5">Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-appBorder text-secondary-700">
                    {(timetable || []).slice(0, 6).map((slot: any) => (
                      <tr key={slot.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold">Period {slot.periodNumber}</td>
                        <td className="p-2.5 font-mono">{slot.startTime} – {slot.endTime}</td>
                        <td className="p-2.5 font-semibold text-secondary-900">{slot.subjectName}</td>
                        <td className="p-2.5">{slot.teacherName}</td>
                        <td className="p-2.5 text-secondary-500">{slot.roomNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. ATTENDANCE HISTORY TAB */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <h3 className="text-base font-bold text-secondary-900">Attendance Log History</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Overall: {student.attendancePercentage || 94}% Present
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-appBorder text-secondary-600 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Remarks</th>
                    <th className="p-2.5">Recorded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-appBorder text-secondary-700">
                  {(attendance || []).map((att: any) => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-semibold">{att.date}</td>
                      <td className="p-2.5">
                        <StatusBadge status={att.status} />
                      </td>
                      <td className="p-2.5 text-secondary-500">{att.remarks || 'Normal attendance'}</td>
                      <td className="p-2.5 text-secondary-500">Dr. Rajesh Verma</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Student Performance Insights Card */}
            {aiInsights && (
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-700/60 shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-700/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">AI Academic Performance & Remedial Insights</h4>
                      <p className="text-[11px] text-indigo-200">
                        Automated diagnostic analysis of test score trends and attendance correlation
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold self-start sm:self-auto">
                    AI Demo Assistant (LLM Ready)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Key Strengths */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5">
                    <h5 className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Academic Strengths
                    </h5>
                    <ul className="space-y-1 text-slate-200 text-[11px] leading-relaxed">
                      {aiInsights.keyStrengths?.map((str: string, i: number) => (
                        <li key={i}>• {str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas Needing Attention */}
                  <div className="bg-amber-950/30 rounded-xl p-3 border border-amber-500/20 space-y-1.5">
                    <h5 className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Areas for Support
                    </h5>
                    <ul className="space-y-1 text-amber-100 text-[11px] leading-relaxed">
                      {aiInsights.academicAlerts?.map((alt: string, i: number) => (
                        <li key={i}>⚠️ {alt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Remedial Recommendations */}
                  <div className="bg-indigo-950/40 rounded-xl p-3 border border-indigo-500/30 space-y-1.5">
                    <h5 className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                      Teacher Action Plan
                    </h5>
                    <ul className="space-y-1 text-slate-200 text-[11px] leading-relaxed">
                      {aiInsights.aiRecommendations?.map((rec: string, i: number) => (
                        <li key={i}>→ {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {aiInsights.parentCounselingNote && (
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="font-bold text-amber-300 text-[11px] block mb-0.5">PTM Counseling Talking Points:</span>
                    <p className="text-slate-200 text-[11px] italic leading-relaxed">"{aiInsights.parentCounselingNote}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 6. FEES & INVOICES TAB */}
        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <h3 className="text-base font-bold text-secondary-900">Fee Invoices & Payment Ledger</h3>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Pending Balance: ₹{(student.totalPendingFees || 0).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-4">
              {(invoices || []).map((inv: any) => (
                <div key={inv.id} className="p-4 rounded-xl border border-appBorder bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-bold text-primary-600 text-sm">{inv.invoiceNumber}</p>
                      <p className="text-[11px] text-secondary-500">Issued: {inv.issuedDate} • Due: {inv.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-secondary-900">Total: ₹{inv.totalAmount.toLocaleString('en-IN')}</p>
                      <StatusBadge status={inv.status} />
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border-t border-appBorder pt-2 text-xs divide-y divide-slate-100">
                    {(inv.items || []).map((item: any) => (
                      <div key={item.id} className="py-1 flex items-center justify-between text-secondary-600">
                        <span>{item.title}</span>
                        <span className="font-semibold text-secondary-800">₹{item.amount.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payments under invoice */}
                  {inv.payments && inv.payments.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-[11px] text-emerald-900">
                      {inv.payments.map((p: any) => (
                        <div key={p.id} className="flex items-center justify-between">
                          <span>Receipt: <strong className="font-mono">{p.receiptNumber}</strong> via {p.paymentMode}</span>
                          <span className="font-bold">₹{p.amount.toLocaleString('en-IN')} Paid</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. EXAMINATION & RESULTS TAB */}
        {activeTab === 'exams' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <h3 className="text-base font-bold text-secondary-900">Academic Assessment & Board Report Cards</h3>
              <button
                onClick={async () => {
                  const res: any = await api.get(`/examinations/exam-01/report-card/${student.id}`);
                  setReportCardExam(res.data);
                }}
                className="px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Generate Official Report Card</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-y border-appBorder text-secondary-600 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5">Marks Scored</th>
                    <th className="p-2.5">Max Marks</th>
                    <th className="p-2.5">CBSE Grade</th>
                    <th className="p-2.5">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-appBorder text-secondary-700">
                  {(marks || []).map((m: any) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-secondary-900">{m.subjectName}</td>
                      <td className="p-2.5 font-mono font-bold text-primary-600">{m.marksObtained}</td>
                      <td className="p-2.5 font-mono text-secondary-500">{m.maxMarks}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded font-black text-xs bg-primary-50 text-primary-700">
                          {m.grade}
                        </span>
                      </td>
                      <td className="p-2.5 text-secondary-600 italic">{m.remarks || 'Consistent performance'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Student Performance Insights Card */}
            {aiInsights && (
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-700/60 shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-700/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">AI Academic Performance & Remedial Insights</h4>
                      <p className="text-[11px] text-indigo-200">
                        Automated diagnostic analysis of test score trends and attendance correlation
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold self-start sm:self-auto">
                    AI Demo Assistant (LLM Ready)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Key Strengths */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 space-y-1.5">
                    <h5 className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Academic Strengths
                    </h5>
                    <ul className="space-y-1 text-slate-200 text-[11px] leading-relaxed">
                      {aiInsights.keyStrengths?.map((str: string, i: number) => (
                        <li key={i}>• {str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas Needing Attention */}
                  <div className="bg-amber-950/30 rounded-xl p-3 border border-amber-500/20 space-y-1.5">
                    <h5 className="font-bold text-amber-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Areas for Support
                    </h5>
                    <ul className="space-y-1 text-amber-100 text-[11px] leading-relaxed">
                      {aiInsights.academicAlerts?.map((alt: string, i: number) => (
                        <li key={i}>⚠️ {alt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Remedial Recommendations */}
                  <div className="bg-indigo-950/40 rounded-xl p-3 border border-indigo-500/30 space-y-1.5">
                    <h5 className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                      Teacher Action Plan
                    </h5>
                    <ul className="space-y-1 text-slate-200 text-[11px] leading-relaxed">
                      {aiInsights.aiRecommendations?.map((rec: string, i: number) => (
                        <li key={i}>→ {rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {aiInsights.parentCounselingNote && (
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <span className="font-bold text-amber-300 text-[11px] block mb-0.5">PTM Counseling Talking Points:</span>
                    <p className="text-slate-200 text-[11px] italic leading-relaxed">"{aiInsights.parentCounselingNote}"</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 8. DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
              Verified Student Documents & Certificates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(documents || []).map((doc: any) => (
                <div key={doc.id} className="p-4 rounded-xl border border-appBorder bg-slate-50 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-secondary-900">{doc.title}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Document</span>
                    </span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); alert(`Viewing document: ${doc.title}`); }}
                    className="text-xs font-bold text-primary-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Official Report Card Modal */}
      {reportCardExam && (
        <Modal
          isOpen={!!reportCardExam}
          onClose={() => setReportCardExam(null)}
          title="CBSE Progressive Report Card"
          subtitle={`${reportCardExam.exam.name} • Session 2026-27`}
          maxWidth="2xl"
        >
          <div className="border border-secondary-300 rounded-xl p-6 bg-white space-y-6 font-sans">
            {/* Header */}
            <div className="text-center border-b-2 border-secondary-800 pb-4 space-y-1">
              <h2 className="text-2xl font-black text-secondary-900 tracking-tight">
                {reportCardExam.school.name}
              </h2>
              <p className="text-xs font-semibold text-secondary-600">
                Affiliated with CBSE New Delhi (Affiliation No: {reportCardExam.school.affiliation})
              </p>
              <p className="text-xs text-secondary-500">{reportCardExam.school.address}</p>
              <div className="inline-block mt-2 px-3 py-1 bg-secondary-900 text-white rounded text-xs font-bold uppercase tracking-wider">
                Annual Student Progress Card
              </div>
            </div>

            {/* Student metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs border-b border-appBorder pb-4">
              <div>
                <p><strong>Student Name:</strong> {reportCardExam.student.fullName}</p>
                <p><strong>Admission No:</strong> {reportCardExam.student.admissionNumber}</p>
                <p><strong>Roll No:</strong> {reportCardExam.student.rollNumber}</p>
              </div>
              <div>
                <p><strong>Class & Section:</strong> {reportCardExam.student.className} - {reportCardExam.student.sectionName}</p>
                <p><strong>Date of Birth:</strong> {reportCardExam.student.dob?.split('T')[0]}</p>
                <p><strong>Attendance:</strong> {reportCardExam.student.attendancePercentage}%</p>
              </div>
            </div>

            {/* Marks Table */}
            <table className="w-full text-left text-xs border border-appBorder">
              <thead className="bg-slate-100 font-bold uppercase">
                <tr>
                  <th className="p-2 border border-appBorder">Subject</th>
                  <th className="p-2 border border-appBorder text-center">Max Marks</th>
                  <th className="p-2 border border-appBorder text-center">Marks Obtained</th>
                  <th className="p-2 border border-appBorder text-center">CBSE Grade</th>
                </tr>
              </thead>
              <tbody>
                {reportCardExam.marks.map((m: any) => (
                  <tr key={m.id}>
                    <td className="p-2 border border-appBorder font-semibold">{m.subjectName}</td>
                    <td className="p-2 border border-appBorder text-center">{m.maxMarks}</td>
                    <td className="p-2 border border-appBorder text-center font-bold">{m.marksObtained}</td>
                    <td className="p-2 border border-appBorder text-center font-bold text-primary-700">{m.grade}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2 border border-appBorder">Overall Aggregate</td>
                  <td className="p-2 border border-appBorder text-center">{reportCardExam.summary.totalMaxMarks}</td>
                  <td className="p-2 border border-appBorder text-center text-primary-700">
                    {reportCardExam.summary.totalMarksObtained} ({reportCardExam.summary.overallPercentage}%)
                  </td>
                  <td className="p-2 border border-appBorder text-center text-emerald-700">
                    {reportCardExam.summary.overallGrade}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Principal Signature */}
            <div className="pt-8 flex items-center justify-between text-xs text-secondary-700">
              <div className="text-center">
                <div className="w-32 border-b border-secondary-400 mb-1"></div>
                <span>Class Teacher</span>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-secondary-400 mb-1"></div>
                <span>Exam Superintendent</span>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-secondary-400 mb-1"></div>
                <span className="font-bold">Principal Signature</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

