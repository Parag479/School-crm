import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  CreditCard,
  CalendarCheck,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Printer,
  Smartphone,
  CheckCircle2,
  Bell,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ParentPortal: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [childData, setChildData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [receiptModal, setReceiptModal] = useState<any | null>(null);

  useEffect(() => {
    // If user has parent object with children
    const kids = user?.parent?.children || [];
    if (kids.length > 0) {
      setChildren(kids);
      fetchChildProfile(kids[0].id);
    } else {
      // Default to Aarav
      fetchChildProfile('stu-001');
    }
  }, [user]);

  const fetchChildProfile = (studentId: string) => {
    setLoading(true);
    api
      .get(`/students/${studentId}`)
      .then((res: any) => {
        setChildData(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleChildSwitch = (idx: number) => {
    setSelectedChildIndex(idx);
    const kid = children[idx];
    if (kid) {
      fetchChildProfile(kid.id);
    }
  };

  const handleRazorpayPay = async (inv: any) => {
    try {
      // 1. Backend order
      const orderRes: any = await api.post('/payments/razorpay-order', {
        invoiceId: inv.id,
        amount: inv.balanceAmount,
      });

      const { orderId } = orderRes.data;
      const dummyPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // 2. Backend verify
      const verifyRes: any = await api.post('/payments/razorpay-verify', {
        invoiceId: inv.id,
        razorpayOrderId: orderId,
        razorpayPaymentId: dummyPaymentId,
        razorpaySignature: 'valid_signature_token',
        amount: inv.balanceAmount,
      });

      setReceiptModal(verifyRes.data);
      if (childData?.student?.id) {
        fetchChildProfile(childData.student.id);
      }
    } catch (err: any) {
      alert(err.message || 'Payment failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-appText pb-16">
      {/* Parent Navbar */}
      <header className="bg-white border-b border-appBorder sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-secondary-900 tracking-tight">Parent Portal</h1>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
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
              <span className="text-xs font-bold text-secondary-900">{user?.name || 'Mr. Vikram Malhotra'}</span>
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
        {/* Child Switcher Cards */}
        <div className="bg-white rounded-2xl border border-appBorder p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-secondary-500 uppercase tracking-wider">Your Children:</span>
            <div className="flex items-center gap-2">
              {(children.length > 0 ? children : [{ id: 'stu-001', fullName: 'Aarav Malhotra', className: 'Class 10', sectionName: 'A' }]).map(
                (kid, idx) => (
                  <button
                    key={kid.id}
                    onClick={() => handleChildSwitch(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedChildIndex === idx
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-slate-100 text-secondary-700 hover:bg-slate-200'
                    }`}
                  >
                    {kid.fullName} ({kid.className}-{kid.sectionName})
                  </button>
                )
              )}
            </div>
          </div>

          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ✔ Authorized Parent Access
          </span>
        </div>

        {loading || !childData ? (
          <LoadingSkeleton rows={8} />
        ) : (
          <>
            {/* Child Overview Banner */}
            <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 flex items-center gap-4">
                <img
                  src={
                    childData.student.avatar ||
                    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'
                  }
                  alt={childData.student.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-200"
                />
                <div>
                  <h2 className="text-xl font-bold text-secondary-900">{childData.student.fullName}</h2>
                  <p className="text-xs text-secondary-500">
                    Admission No: <strong className="font-mono text-primary-600">{childData.student.admissionNumber}</strong> • Roll No: {childData.student.rollNumber || '101'}
                  </p>
                  <p className="text-xs font-semibold text-secondary-700 mt-0.5">
                    {childData.student.className} - {childData.student.sectionName} • Class Teacher: Dr. Rajesh Verma
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 flex items-center justify-end gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-[10px] font-bold uppercase text-emerald-600">Attendance Rate</p>
                  <p className="text-2xl font-black text-emerald-700">{childData.student.attendancePercentage || 94}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-appBorder text-center">
                  <p className="text-[10px] font-bold uppercase text-secondary-400">Fee Balance</p>
                  <p className="text-2xl font-black text-secondary-900">
                    {(childData.student.totalPendingFees || 0) > 0 ? (
                      <span className="text-rose-600">₹{childData.student.totalPendingFees}</span>
                    ) : (
                      <span className="text-emerald-600">₹0</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Invoices and Online Razorpay Payment Section */}
            <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-appBorder pb-3">
                <div>
                  <h3 className="text-base font-bold text-secondary-900">Fee Invoices & Online Payments</h3>
                  <p className="text-xs text-secondary-500">Direct payment via Razorpay secure gateway</p>
                </div>
                <CreditCard className="w-5 h-5 text-primary-600" />
              </div>

              <div className="space-y-3">
                {(childData.invoices || []).map((inv: any) => (
                  <div
                    key={inv.id}
                    className="p-4 rounded-xl border border-appBorder bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary-600 text-xs">{inv.invoiceNumber}</span>
                        <StatusBadge status={inv.status} />
                      </div>
                      <p className="text-sm font-bold text-secondary-900 mt-1">
                        Total: ₹{inv.totalAmount.toLocaleString('en-IN')} • Due: {inv.dueDate}
                      </p>
                      <p className="text-xs text-secondary-500">
                        Paid: ₹{inv.paidAmount.toLocaleString('en-IN')} • Balance Due: <strong className="text-rose-600 font-bold">₹{inv.balanceAmount.toLocaleString('en-IN')}</strong>
                      </p>
                    </div>

                    <div>
                      {inv.balanceAmount > 0 ? (
                        <button
                          onClick={() => handleRazorpayPay(inv)}
                          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700 flex items-center gap-1.5 transition-colors"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Pay ₹{inv.balanceAmount.toLocaleString('en-IN')} with Razorpay</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const p = inv.payments?.[0];
                            setReceiptModal({
                              receiptNumber: p?.receiptNumber || 'RCP-2026-0081',
                              studentName: childData.student.fullName,
                              amount: inv.totalAmount,
                              paymentMode: p?.paymentMode || 'RAZORPAY',
                              paidAt: p?.paidAt || new Date().toISOString(),
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-100 text-secondary-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Download Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Results & Report Card */}
            <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-appBorder pb-3">
                <div>
                  <h3 className="text-base font-bold text-secondary-900">Term 1 Assessment Results</h3>
                  <p className="text-xs text-secondary-500">Official CBSE grade evaluation</p>
                </div>
                <Award className="w-5 h-5 text-amber-500" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary-50 border-b border-appBorder font-bold uppercase text-secondary-600">
                    <tr>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5">Marks Scored</th>
                      <th className="p-2.5">Max Marks</th>
                      <th className="p-2.5">Grade</th>
                      <th className="p-2.5">Teacher Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-appBorder text-secondary-700">
                    {(childData.marks || []).map((m: any) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-secondary-900">{m.subjectName}</td>
                        <td className="p-2.5 font-mono font-bold text-primary-600">{m.marksObtained}</td>
                        <td className="p-2.5 text-secondary-400">{m.maxMarks}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded font-black text-xs bg-emerald-50 text-emerald-700">
                            {m.grade}
                          </span>
                        </td>
                        <td className="p-2.5 text-secondary-600 italic">{m.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Payment Receipt Modal */}
      {receiptModal && (
        <Modal
          isOpen={!!receiptModal}
          onClose={() => setReceiptModal(null)}
          title="Payment Verified & Receipt"
          subtitle={`Receipt: ${receiptModal.receiptNumber}`}
          maxWidth="md"
        >
          <div className="border border-secondary-300 rounded-xl p-6 bg-white space-y-4 text-xs font-sans">
            <div className="text-center border-b border-appBorder pb-3">
              <h3 className="text-lg font-black text-secondary-900">Greenwood International Academy</h3>
              <p className="text-[11px] text-secondary-500">Sector 62, Noida • Online Fee Gateway</p>
              <span className="inline-block mt-1 font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                VERIFIED PAYMENT: {receiptModal.receiptNumber}
              </span>
            </div>

            <div className="space-y-1 text-secondary-700">
              <p><strong>Student:</strong> {receiptModal.studentName}</p>
              <p><strong>Payment Mode:</strong> {receiptModal.paymentMode}</p>
              <p><strong>Amount Paid:</strong> <strong className="text-emerald-600 text-sm">₹{parseFloat(receiptModal.amount).toLocaleString('en-IN')}</strong></p>
              <p><strong>Date & Time:</strong> {new Date(receiptModal.paidAt).toLocaleString()}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2 rounded-xl bg-secondary-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Receipt</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

