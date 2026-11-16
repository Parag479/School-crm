import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Kanban,
  Table as TableIcon,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  UserCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PIPELINE_STAGES = [
  { key: 'NEW_ENQUIRY', label: 'New Enquiry', color: 'border-blue-400 bg-blue-50/50' },
  { key: 'CONTACTED', label: 'Contacted', color: 'border-indigo-400 bg-indigo-50/50' },
  { key: 'FOLLOW_UP', label: 'Follow Up', color: 'border-amber-400 bg-amber-50/50' },
  { key: 'SCHOOL_VISIT', label: 'School Visit', color: 'border-purple-400 bg-purple-50/50' },
  { key: 'APPLICATION_SUBMITTED', label: 'Application Submitted', color: 'border-cyan-400 bg-cyan-50/50' },
  { key: 'DOCUMENT_VERIFICATION', label: 'Doc Verification', color: 'border-orange-400 bg-orange-50/50' },
  { key: 'APPROVED', label: 'Approved', color: 'border-emerald-400 bg-emerald-50/50' },
  { key: 'REJECTED', label: 'Rejected', color: 'border-rose-400 bg-rose-50/50' },
];

export const AdmissionCRM: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');

  // Modals state
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [convertModalEnquiry, setConvertModalEnquiry] = useState<any | null>(null);
  const [newEnquiryModal, setNewEnquiryModal] = useState(false);
  const [followupNote, setFollowupNote] = useState('');
  const [nextFollowupDate, setNextFollowupDate] = useState('');
  const [convertClassId, setConvertClassId] = useState('');
  const [convertSectionId, setConvertSectionId] = useState('');
  const [convertSuccess, setConvertSuccess] = useState<any | null>(null);

  // Manual new enquiry form state
  const [newEnqForm, setNewEnqForm] = useState({
    studentName: '',
    dateOfBirth: '2016-05-15',
    gender: 'MALE',
    parentName: '',
    phone: '',
    email: '',
    applyingClass: 'Class 5',
    currentSchool: '',
    message: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get(`/admissions?search=${search}&applyingClass=${classFilter}`),
      api.get('/classes'),
    ])
      .then(([admRes, clsRes]: any) => {
        setEnquiries(admRes.data);
        setClasses(clsRes.data);
        if (clsRes.data.length > 0) {
          setConvertClassId(clsRes.data[12]?.id || clsRes.data[0]?.id);
          setConvertSectionId(clsRes.data[12]?.sections?.[0]?.id || clsRes.data[0]?.sections?.[0]?.id || '');
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [search, classFilter]);

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      await api.patch(`/admissions/${enquiryId}/status`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleAddFollowup = async () => {
    if (!selectedEnquiry || !followupNote) return;
    try {
      await api.patch(`/admissions/${selectedEnquiry.id}/status`, {
        note: followupNote,
        followUpDate: nextFollowupDate || selectedEnquiry.followUpDate,
      });
      setFollowupNote('');
      fetchData();
      // refresh selected enquiry
      const updated: any = await api.get(`/admissions/${selectedEnquiry.id}`);
      setSelectedEnquiry(updated.data);
    } catch (e) {
      alert('Failed to add note');
    }
  };

  const handleConvertStudent = async () => {
    if (!convertModalEnquiry) return;
    try {
      const res: any = await api.post(`/admissions/${convertModalEnquiry.id}/convert`, {
        classId: convertClassId,
        sectionId: convertSectionId,
      });
      setConvertSuccess(res.data);
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Conversion failed');
    }
  };

  const handleCreateEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admissions/enquiry', newEnqForm);
      setNewEnquiryModal(false);
      setNewEnqForm({
        studentName: '',
        dateOfBirth: '2016-05-15',
        gender: 'MALE',
        parentName: '',
        phone: '',
        email: '',
        applyingClass: 'Class 5',
        currentSchool: '',
        message: '',
      });
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to create enquiry');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Controls */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Admission Lead CRM</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Track inquiries, automate follow-ups, and convert applicants into enrolled students
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* View Toggle */}
          <div className="bg-secondary-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setNewEnquiryModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Enquiry</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, parent, phone, ENQ#..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-secondary-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-semibold text-secondary-600 whitespace-nowrap">Filter Class:</label>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-appBorder text-xs bg-white text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ALL">All Classes</option>
            <option value="Pre-KG">Pre-KG</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="Class 11 - Science">Class 11 - Science</option>
          </select>
        </div>
      </div>

      {/* View 1: KANBAN BOARD */}
      {viewMode === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar min-h-[600px]">
          {PIPELINE_STAGES.map((stage) => {
            const stageLeads = enquiries.filter((e) => e.status === stage.key);
            return (
              <div
                key={stage.key}
                className="w-72 flex-shrink-0 bg-slate-100/70 rounded-2xl border border-appBorder p-3 flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-2 py-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-600"></span>
                    <h3 className="text-xs font-bold text-secondary-900">{stage.label}</h3>
                  </div>
                  <span className="text-[11px] font-bold bg-white text-secondary-600 px-2 py-0.5 rounded-full border border-appBorder">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[650px] pr-1">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={async () => {
                        const res: any = await api.get(`/admissions/${lead.id}`);
                        setSelectedEnquiry(res.data);
                      }}
                      className="bg-white rounded-xl border border-appBorder p-4 shadow-sm hover:shadow-card hover:border-primary-300 transition-all cursor-pointer space-y-2.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                          {lead.enquiryNumber}
                        </span>
                        <span className="text-[10px] font-semibold text-secondary-500">
                          {lead.applyingClass}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                          {lead.studentName}
                        </h4>
                        <p className="text-xs text-secondary-500 mt-0.5">Parent: {lead.parentName}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-secondary-400 pt-1 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-secondary-400" />
                          <span>{lead.phone}</span>
                        </span>
                        {lead.followUpDate && (
                          <span className="flex items-center gap-1 text-amber-600 font-semibold">
                            <Clock className="w-3 h-3" />
                            <span>{lead.followUpDate}</span>
                          </span>
                        )}
                      </div>

                      {/* Quick stage advance selector */}
                      <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="w-full py-1 px-2 text-[11px] font-semibold rounded bg-slate-50 border border-slate-200 text-secondary-700"
                        >
                          {PIPELINE_STAGES.map((s) => (
                            <option key={s.key} value={s.key}>
                              Move: {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {lead.status === 'APPROVED' && !lead.convertedStudentId && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConvertModalEnquiry(lead);
                            setConvertSuccess(null);
                          }}
                          className="w-full mt-2 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Admit as Student</span>
                        </button>
                      )}

                      {lead.convertedStudentId && (
                        <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold py-1 px-2 rounded text-center">
                          ✔ Enrolled in School
                        </div>
                      )}
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="py-8 text-center text-xs text-secondary-400 italic">No leads in stage</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View 2: DATA TABLE */
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Enquiry Number</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Applying Class</th>
                <th className="p-3.5">Parent Details</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Follow-Up Date</th>
                <th className="p-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {enquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-primary-600">{enq.enquiryNumber}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{enq.studentName}</td>
                  <td className="p-3.5">{enq.applyingClass}</td>
                  <td className="p-3.5">
                    <div>{enq.parentName}</div>
                    <div className="text-[11px] text-secondary-400">{enq.phone} • {enq.email}</div>
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={enq.status} />
                  </td>
                  <td className="p-3.5 text-secondary-500">{enq.followUpDate || '—'}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          const res: any = await api.get(`/admissions/${enq.id}`);
                          setSelectedEnquiry(res.data);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-secondary-700"
                      >
                        View
                      </button>
                      {enq.status === 'APPROVED' && !enq.convertedStudentId && (
                        <button
                          onClick={() => {
                            setConvertModalEnquiry(enq);
                            setConvertSuccess(null);
                          }}
                          className="px-2.5 py-1 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Admit
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

      {/* MODAL 1: Lead Details & Follow-up History */}
      {selectedEnquiry && (
        <Modal
          isOpen={!!selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.studentName}`}
          subtitle={`${selectedEnquiry.enquiryNumber} • Class: ${selectedEnquiry.applyingClass}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-appBorder text-xs">
              <div>
                <p className="text-secondary-400 font-semibold">Parent Name:</p>
                <p className="text-secondary-900 font-bold">{selectedEnquiry.parentName}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Contact Phone:</p>
                <p className="text-secondary-900 font-bold">{selectedEnquiry.phone}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Email Address:</p>
                <p className="text-secondary-900">{selectedEnquiry.email}</p>
              </div>
              <div>
                <p className="text-secondary-400 font-semibold">Current School:</p>
                <p className="text-secondary-900">{selectedEnquiry.currentSchool || 'None specified'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-secondary-400 font-semibold">Parent Message:</p>
                <p className="text-secondary-800 italic mt-0.5">"{selectedEnquiry.message || 'No remarks entered'}"</p>
              </div>
            </div>

            {/* Change Lead Status */}
            <div>
              <label className="block text-xs font-bold text-secondary-700 mb-1">Update Pipeline Stage:</label>
              <select
                value={selectedEnquiry.status}
                onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-semibold bg-white"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Follow-up Notes History */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-900">Follow-Up History & Notes</h4>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {(selectedEnquiry.followups || []).map((f: any) => (
                  <div key={f.id} className="p-3 rounded-lg bg-slate-50 border border-appBorder text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-primary-600">{f.officerName}</span>
                      <span className="text-secondary-400">{new Date(f.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-secondary-700">{f.note}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="space-y-2 pt-2 border-t border-appBorder">
                <textarea
                  rows={2}
                  value={followupNote}
                  onChange={(e) => setFollowupNote(e.target.value)}
                  placeholder="Record interaction notes (e.g. parent called, visit booked for Saturday 11 AM)..."
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-secondary-500 font-semibold">Next Follow-Up:</span>
                    <input
                      type="date"
                      value={nextFollowupDate}
                      onChange={(e) => setNextFollowupDate(e.target.value)}
                      className="px-2 py-1 rounded border border-appBorder text-xs"
                    />
                  </div>
                  <button
                    onClick={handleAddFollowup}
                    className="px-4 py-1.5 rounded-lg bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 shadow-sm"
                  >
                    Add Follow-up Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Convert to Enrolled Student */}
      {convertModalEnquiry && (
        <Modal
          isOpen={!!convertModalEnquiry}
          onClose={() => setConvertModalEnquiry(null)}
          title="Admit Lead as Enrolled Student"
          subtitle={`Converting ${convertModalEnquiry.studentName} (${convertModalEnquiry.enquiryNumber})`}
          maxWidth="md"
        >
          {convertSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900">Student Enrolled Successfully!</h3>
              <p className="text-xs text-secondary-600">
                A permanent student record and fee invoice have been generated.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-appBorder">
                <p className="text-[11px] uppercase font-bold text-secondary-400">Assigned Admission Number</p>
                <p className="text-2xl font-black text-primary-600 font-mono mt-1">
                  {convertSuccess.admissionNumber}
                </p>
              </div>
              <button
                onClick={() => setConvertModalEnquiry(null)}
                className="w-full py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-secondary-600">
                Please select the designated Class and Section for enrollment. The system will automatically allocate a unique admission number (e.g. <span className="font-mono font-bold">GIA-2026-00X</span>) and generate the first term invoice.
              </p>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Allocated Class *</label>
                <select
                  value={convertClassId}
                  onChange={(e) => setConvertClassId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Allocated Section *</label>
                <select
                  value={convertSectionId}
                  onChange={(e) => setConvertSectionId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
                >
                  <option value="sec-class-13-a">Section A</option>
                  <option value="sec-class-13-b">Section B</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleConvertStudent}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Confirm Admission & Generate Student File</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* MODAL 3: Add Manual Enquiry */}
      {newEnquiryModal && (
        <Modal
          isOpen={newEnquiryModal}
          onClose={() => setNewEnquiryModal(false)}
          title="Create New Admission Enquiry"
          subtitle="Record lead from front desk or phone inquiry"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateEnquiry} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={newEnqForm.studentName}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, studentName: e.target.value })}
                  placeholder="e.g. Vivaan Aggarwal"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={newEnqForm.dateOfBirth}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Parent Name *</label>
                <input
                  type="text"
                  required
                  value={newEnqForm.parentName}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, parentName: e.target.value })}
                  placeholder="e.g. Manoj Aggarwal"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  required
                  value={newEnqForm.phone}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, phone: e.target.value })}
                  placeholder="9810112233"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newEnqForm.email}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, email: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Applying Class *</label>
                <select
                  value={newEnqForm.applyingClass}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, applyingClass: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  <option value="Pre-KG">Pre-KG</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 5">Class 5</option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11 - Science">Class 11 - Science</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Save Admission Enquiry
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

