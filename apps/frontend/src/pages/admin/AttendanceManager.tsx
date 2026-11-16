import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  CalendarCheck,
  Calendar,
  Save,
  CheckCircle2,
  Users,
  Check,
  X,
  Clock,
  FileSpreadsheet,
} from 'lucide-react';

export const AttendanceManager: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sheet, setSheet] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<'sheet' | 'reports'>('sheet');
  const [monthlyReports, setMonthlyReports] = useState<any[]>([]);

  useEffect(() => {
    api.get('/classes').then((res: any) => {
      setClasses(res.data);
      if (res.data.length > 0) {
        const cls = res.data[12] || res.data[0];
        setSelectedClassId(cls.id);
        setSelectedSectionId(cls.sections?.[0]?.id || 'sec-class-13-a');
      }
    });
  }, []);

  const loadAttendance = () => {
    if (!selectedClassId || !selectedSectionId || !selectedDate) return;
    setLoading(true);
    setSaveSuccess(false);
    api
      .get(`/attendance/sheet?classId=${selectedClassId}&sectionId=${selectedSectionId}&date=${selectedDate}`)
      .then((res: any) => {
        setSheet(res.data.sheet);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAttendance();
  }, [selectedClassId, selectedSectionId, selectedDate]);

  const loadReports = () => {
    api.get('/attendance/reports').then((res: any) => {
      setMonthlyReports(res.data);
    });
  };

  const handleStatusToggle = (studentId: string, newStatus: string) => {
    setSheet((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status: newStatus } : item))
    );
  };

  const markAllAs = (status: string) => {
    setSheet((prev) => prev.map((item) => ({ ...item, status })));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      await api.post('/attendance/bulk', {
        classId: selectedClassId,
        sectionId: selectedSectionId,
        date: selectedDate,
        records: sheet.map((s) => ({
          studentId: s.studentId,
          status: s.status,
          remarks: s.remarks,
        })),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e: any) {
      alert(e.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const selectedClass = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Attendance Management</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Daily roll-call registry, duplicate prevention, and monthly student attendance compliance
          </p>
        </div>

        <div className="bg-secondary-100 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setViewMode('sheet')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'sheet' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Mark Daily Sheet</span>
          </button>
          <button
            onClick={() => {
              setViewMode('reports');
              loadReports();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'reports' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Monthly Reports</span>
          </button>
        </div>
      </div>

      {viewMode === 'sheet' ? (
        <>
          {/* Controls Bar: Class, Section, Date */}
          <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-secondary-700 mb-1">Select Class:</label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  const cls = classes.find((c) => c.id === e.target.value);
                  if (cls && cls.sections?.length > 0) {
                    setSelectedSectionId(cls.sections[0].id);
                  }
                }}
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
              <label className="block text-xs font-bold text-secondary-700 mb-1">Select Section:</label>
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                {(selectedClass?.sections || []).map((sec: any) => (
                  <option key={sec.id} value={sec.id}>
                    Section {sec.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-secondary-700 mb-1">Attendance Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-semibold"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => markAllAs('PRESENT')}
                className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 flex-1"
              >
                All Present
              </button>
              <button
                type="button"
                onClick={handleSaveAttendance}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 flex-1 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : 'Save Sheet'}</span>
              </button>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Attendance successfully recorded for {sheet.length} students! Database synchronized.</span>
            </div>
          )}

          {/* Attendance Student Sheet */}
          {loading ? (
            <LoadingSkeleton rows={6} />
          ) : (
            <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
                  <tr>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Mark Status</th>
                    <th className="p-3.5">Current Status</th>
                    <th className="p-3.5">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-appBorder text-secondary-700">
                  {sheet.map((item) => (
                    <tr key={item.studentId} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-secondary-500">{item.rollNumber || '101'}</td>
                      <td className="p-3.5 font-bold text-secondary-900">{item.studentName}</td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(item.studentId, 'PRESENT')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              item.status === 'PRESENT'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 text-secondary-600 hover:bg-emerald-50'
                            }`}
                          >
                            P
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(item.studentId, 'ABSENT')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              item.status === 'ABSENT'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-slate-100 text-secondary-600 hover:bg-rose-50'
                            }`}
                          >
                            A
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(item.studentId, 'LATE')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              item.status === 'LATE'
                                ? 'bg-amber-600 text-white shadow-sm'
                                : 'bg-slate-100 text-secondary-600 hover:bg-amber-50'
                            }`}
                          >
                            L
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusToggle(item.studentId, 'LEAVE')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              item.status === 'LEAVE'
                                ? 'bg-sky-600 text-white shadow-sm'
                                : 'bg-slate-100 text-secondary-600 hover:bg-sky-50'
                            }`}
                          >
                            LV
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-3.5">
                        <input
                          type="text"
                          value={item.remarks || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSheet((prev) =>
                              prev.map((s) => (s.studentId === item.studentId ? { ...s, remarks: val } : s))
                            );
                          }}
                          placeholder="Optional remarks..."
                          className="px-2 py-1 rounded border border-appBorder text-xs w-48"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        /* View 2: Monthly Consolidated Report */
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Admission No</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Class & Sec</th>
                <th className="p-3.5">Present Days</th>
                <th className="p-3.5">Absent Days</th>
                <th className="p-3.5">Leaves</th>
                <th className="p-3.5">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {monthlyReports.map((r) => (
                <tr key={r.studentId} className="hover:bg-slate-50">
                  <td className="p-3.5 font-mono font-bold text-primary-600">{r.admissionNumber}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{r.fullName}</td>
                  <td className="p-3.5">{r.className} - {r.sectionName}</td>
                  <td className="p-3.5 font-bold text-emerald-600">{r.presentDays}</td>
                  <td className="p-3.5 font-bold text-rose-600">{r.absentDays}</td>
                  <td className="p-3.5 text-secondary-500">{r.leaveDays}</td>
                  <td className="p-3.5">
                    <span className="font-bold px-2 py-0.5 rounded text-[11px] bg-emerald-50 text-emerald-700">
                      {r.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

