import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  DollarSign,
  Printer,
  CheckCircle2,
  FileText,
  AlertCircle,
  Receipt,
  Smartphone,
} from 'lucide-react';

export const FeesManager: React.FC = () => {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  // Modals
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [collectPaymentModal, setCollectPaymentModal] = useState<any | null>(null);
  const [viewReceiptModal, setViewReceiptModal] = useState<any | null>(null);

  // New Invoice form
  const [newInvoiceData, setNewInvoiceData] = useState({
    studentId: '',
    title: 'Q4 Tuition & Development Fee',
    amount: '24000',
    dueDate: '2027-01-15',
  });

  // Collect Payment form
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'CASH',
    transactionReference: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get(`/fees/invoices?status=${statusFilter}&search=${search}`),
      api.get('/students'),
    ])
      .then(([invRes, stuRes]: any) => {
        setInvoices(invRes.data);
        setStudents(stuRes.data);
        if (stuRes.data.length > 0 && !newInvoiceData.studentId) {
          setNewInvoiceData((prev) => ({ ...prev, studentId: stuRes.data[0].id }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, search]);

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/fees/invoices', {
        studentId: newInvoiceData.studentId,
        dueDate: newInvoiceData.dueDate,
        items: [
          {
            title: newInvoiceData.title,
            amount: parseFloat(newInvoiceData.amount),
            category: 'TUITION',
          },
        ],
      });
      setGenerateModalOpen(false);
      fetchData();
      alert('Invoice generated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to generate invoice');
    }
  };

  const handleCollectOfflinePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectPaymentModal) return;
    try {
      const res: any = await api.post('/payments/collect-offline', {
        invoiceId: collectPaymentModal.id,
        amount: parseFloat(paymentData.amount || collectPaymentModal.balanceAmount),
        paymentMode: paymentData.paymentMode,
        transactionReference: paymentData.transactionReference,
      });
      setCollectPaymentModal(null);
      fetchData();
      setViewReceiptModal(res.data);
    } catch (err: any) {
      alert(err.message || 'Payment collection failed');
    }
  };

  const handleSimulateRazorpay = async (inv: any) => {
    try {
      // 1. Create order
      const orderRes: any = await api.post('/payments/razorpay-order', {
        invoiceId: inv.id,
        amount: inv.balanceAmount,
      });

      const { orderId } = orderRes.data;
      const dummyPaymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      // 2. Call backend signature verify
      const verifyRes: any = await api.post('/payments/razorpay-verify', {
        invoiceId: inv.id,
        razorpayOrderId: orderId,
        razorpayPaymentId: dummyPaymentId,
        razorpaySignature: 'simulated_valid_signature_token',
        amount: inv.balanceAmount,
      });

      fetchData();
      setViewReceiptModal(verifyRes.data);
    } catch (err: any) {
      alert(err.message || 'Razorpay checkout simulation error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Fee Management & Invoices</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Student fee invoicing, offline desk collections, online Razorpay integration, and PDF receipts
          </p>
        </div>

        <button
          onClick={() => setGenerateModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, invoice no, admission no..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-secondary-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-semibold text-secondary-600 whitespace-nowrap">Filter Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-appBorder text-xs bg-white text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold"
          >
            <option value="ALL">All Invoices</option>
            <option value="PENDING">Pending Invoices</option>
            <option value="PARTIAL">Partially Paid</option>
            <option value="PAID">Fully Paid</option>
          </select>
        </div>
      </div>

      {/* Invoices List Table */}
      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Class & Section</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Paid Amount</th>
                <th className="p-3.5">Balance</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-primary-600">{inv.invoiceNumber}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{inv.studentName}</td>
                  <td className="p-3.5">{inv.className} - {inv.sectionName}</td>
                  <td className="p-3.5 font-semibold text-secondary-900">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 font-semibold text-emerald-600">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 font-bold text-rose-600">₹{inv.balanceAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 text-secondary-500">{inv.dueDate}</td>
                  <td className="p-3.5">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      {inv.balanceAmount > 0 ? (
                        <>
                          <button
                            onClick={() => {
                              setCollectPaymentModal(inv);
                              setPaymentData({
                                amount: String(inv.balanceAmount),
                                paymentMode: 'CASH',
                                transactionReference: '',
                              });
                            }}
                            className="px-2.5 py-1 rounded bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs"
                          >
                            Collect Desk
                          </button>
                          <button
                            onClick={() => handleSimulateRazorpay(inv)}
                            className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 border border-indigo-200"
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>Razorpay</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            const p = inv.payments?.[0];
                            if (p) {
                              setViewReceiptModal({
                                receiptNumber: p.receiptNumber,
                                studentName: inv.studentName,
                                invoiceId: inv.id,
                                amount: inv.totalAmount,
                                paymentMode: p.paymentMode,
                                paidAt: p.paidAt,
                              });
                            } else {
                              alert('Paid invoice details verified.');
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-secondary-700 font-bold text-xs flex items-center gap-1"
                        >
                          <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Receipt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL 1: Generate New Invoice */}
      {generateModalOpen && (
        <Modal
          isOpen={generateModalOpen}
          onClose={() => setGenerateModalOpen(false)}
          title="Generate Student Fee Invoice"
          subtitle="Create installment bill with due date"
          maxWidth="md"
        >
          <form onSubmit={handleGenerateInvoice} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Select Student *</label>
              <select
                value={newInvoiceData.studentId}
                onChange={(e) => setNewInvoiceData({ ...newInvoiceData, studentId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.admissionNumber}) • {s.className}-{s.sectionName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Fee Description *</label>
              <input
                type="text"
                required
                value={newInvoiceData.title}
                onChange={(e) => setNewInvoiceData({ ...newInvoiceData, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Total Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={newInvoiceData.amount}
                  onChange={(e) => setNewInvoiceData({ ...newInvoiceData, amount: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={newInvoiceData.dueDate}
                  onChange={(e) => setNewInvoiceData({ ...newInvoiceData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Generate Invoice & Update Student Ledger
            </button>
          </form>
        </Modal>
      )}

      {/* MODAL 2: Collect Payment at Desk */}
      {collectPaymentModal && (
        <Modal
          isOpen={!!collectPaymentModal}
          onClose={() => setCollectPaymentModal(null)}
          title="Record Fee Payment at Desk"
          subtitle={`Student: ${collectPaymentModal.studentName} • ${collectPaymentModal.invoiceNumber}`}
          maxWidth="md"
        >
          <form onSubmit={handleCollectOfflinePayment} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-appBorder text-xs space-y-1">
              <p className="text-secondary-500">Invoice Balance Due: <strong className="text-rose-600 font-bold">₹{collectPaymentModal.balanceAmount.toLocaleString('en-IN')}</strong></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Paying Amount (₹) *</label>
              <input
                type="number"
                required
                max={collectPaymentModal.balanceAmount}
                value={paymentData.amount}
                onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold text-secondary-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Payment Mode *</label>
              <select
                value={paymentData.paymentMode}
                onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                <option value="CASH">Cash Collection</option>
                <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS)</option>
                <option value="CHEQUE">Cheque / Demand Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Transaction Ref / Cheque No</label>
              <input
                type="text"
                value={paymentData.transactionReference}
                onChange={(e) => setPaymentData({ ...paymentData, transactionReference: e.target.value })}
                placeholder="e.g. UTR-998822 or Cheque #401201"
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700"
            >
              Confirm Collection & Print Receipt
            </button>
          </form>
        </Modal>
      )}

      {/* MODAL 3: Printable Fee Receipt */}
      {viewReceiptModal && (
        <Modal
          isOpen={!!viewReceiptModal}
          onClose={() => setViewReceiptModal(null)}
          title="Official Fee Payment Receipt"
          subtitle={`Receipt: ${viewReceiptModal.receiptNumber || 'RCP-2026-0081'}`}
          maxWidth="md"
        >
          <div className="border border-secondary-300 rounded-xl p-6 bg-white space-y-4 text-xs font-sans">
            <div className="text-center border-b border-appBorder pb-3">
              <h3 className="text-lg font-black text-secondary-900">Greenwood International Academy</h3>
              <p className="text-[11px] text-secondary-500">Sector 62, Noida, UP • CBSE Affiliation No: CBSE/AFF/2130842</p>
              <span className="inline-block mt-1 font-mono font-bold bg-slate-100 text-secondary-800 px-2 py-0.5 rounded">
                RECEIPT: {viewReceiptModal.receiptNumber || 'RCP-2026-0081'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-secondary-700">
              <p><strong>Student:</strong> {viewReceiptModal.studentName || 'Aarav Malhotra'}</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}</p>
              <p><strong>Payment Mode:</strong> {viewReceiptModal.paymentMode || 'RAZORPAY'}</p>
              <p><strong>Status:</strong> <span className="font-bold text-emerald-600">SUCCESS</span></p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-appBorder flex items-center justify-between">
              <span className="font-bold text-secondary-800">Amount Paid:</span>
              <span className="text-lg font-black text-primary-600">
                ₹{parseFloat(viewReceiptModal.amount || 31500).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-4 border-t border-appBorder flex items-center justify-between text-secondary-500">
              <span>Authorized Signature: Accounts Office</span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-secondary-900 text-white font-bold text-xs flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

