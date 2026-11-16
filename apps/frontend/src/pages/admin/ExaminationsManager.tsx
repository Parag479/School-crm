import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  FileCheck2,
  Plus,
  Calendar,
  Save,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Award,
} from 'lucide-react';

export const ExaminationsManager: React.FC = () => {
  const [exams, setExams] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [marksModalOpen, setMarksModalOpen] = useState(false);
  const [marksSheet, setMarksSheet] = useState<any[]>([]);
  const [savingMarks, setSavingMarks] = useState(false);
  const [selectedReportCard, setSelectedReportCard] = useState<any | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get('/examinations'), api.get('/students')])
      .then(([exRes, stuRes]: any) => {
        setExams(exRes.data);
        setStudents(stuRes.data);
        if (exRes.data.length > 0) {
          setSelectedExamId(exRes.data[0].id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openMarksEntry = () => {
    // Populate marks sheet with active students
    const sheet = students.map((s) => ({
      studentId: s.id,
      studentName: s.fullName,
      rollNumber: s.rollNumber || '101',
      marksObtained: s.id === 'stu-001' ? 76 : 70,
      maxMarks: 80,
      remarks: 'Strong conceptual clarity',
    }));
    setMarksSheet(sheet);
    setMarksModalOpen(true);
  };

  const calculateGrade = (scored: number, max: number) => {
    const p = (scored / max) * 100;
    if (p >= 91) return 'A1';
    if (p >= 81) return 'A2';
    if (p >= 71) return 'B1';
    if (p >= 61) return 'B2';
    if (p >= 51) return 'C1';
    if (p >= 41) return 'C2';
    if (p >= 33) return 'D';
    return 'E';
  };

  const handleSaveMarks = async () => {
    setSavingMarks(true);
    try {
      await api.post('/examinations/marks/bulk', {
        examId: selectedExamId || 'exam-01',
        classId: 'class-13',
        subjectId: 'subj-10-math',
        marksList: marksSheet.map((m) => ({
          studentId: m.studentId,
          marksObtained: parseFloat(m.marksObtained),
          maxMarks: parseFloat(m.maxMarks),
          remarks: m.remarks,
        })),
      });
      setMarksModalOpen(false);
      alert('Examination marks saved and CBSE grades computed!');
    } catch (e: any) {
      alert(e.message || 'Failed to save marks');
    } finally {
      setSavingMarks(false);
    }
  };

  const handleViewReportCard = async (studentId: string) => {
    try {
      const res: any = await api.get(`/examinations/exam-01/report-card/${studentId}`);
      setSelectedReportCard(res.data);
    } catch (e) {
      alert('Report card generation error');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Examinations & Grade Reports</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Exam schedules, bulk marks entry sheet with automatic CBSE grading, and printable student progress cards
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openMarksEntry}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Enter Exam Marks</span>
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="space-y-6">
          {/* Active Examinations List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full uppercase">
                      {exam.type}
                    </span>
                    <h3 className="text-lg font-bold text-secondary-900 mt-1.5">{exam.name}</h3>
                  </div>
                  <span className="text-xs font-semibold text-secondary-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exam.startDate?.split('T')[0]} to {exam.endDate?.split('T')[0]}</span>
                  </span>
                </div>

                <div className="border-t border-appBorder pt-3 space-y-2">
                  <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-wider">Scheduled Exam Papers</p>
                  <div className="space-y-1.5">
                    {(exam.subjects || []).map((s: any) => (
                      <div key={s.id} className="p-2 rounded-lg bg-slate-50 border border-appBorder flex items-center justify-between text-xs">
                        <span className="font-bold text-secondary-900">{s.subjectName}</span>
                        <div className="flex items-center gap-4 text-secondary-500">
                          <span>{s.examDate} ({s.startTime} – {s.endTime})</span>
                          <span className="font-bold text-primary-600">Max {s.maxMarks}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Student Report Cards Quick Access */}
          <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-secondary-900">Class 10 Student Report Cards (Term 1)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {students.map((stu) => (
                <div key={stu.id} className="p-4 rounded-xl border border-appBorder bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-secondary-900">{stu.fullName}</p>
                    <p className="text-[10px] font-mono text-secondary-400">{stu.admissionNumber}</p>
                  </div>
                  <button
                    onClick={() => handleViewReportCard(stu.id)}
                    className="px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Report</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Bulk Marks Entry Sheet */}
      {marksModalOpen && (
        <Modal
          isOpen={marksModalOpen}
          onClose={() => setMarksModalOpen(false)}
          title="CBSE Marks Entry Sheet"
          subtitle="Class 10-A • Mathematics (Standard) • Max Marks: 80"
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="max-h-96 overflow-y-auto border border-appBorder rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase sticky top-0">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Marks Scored</th>
                    <th className="p-3">Computed Grade</th>
                    <th className="p-3">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-appBorder text-secondary-700">
                  {marksSheet.map((m, idx) => (
                    <tr key={m.studentId} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-secondary-500">{m.rollNumber}</td>
                      <td className="p-3 font-bold text-secondary-900">{m.studentName}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          max={m.maxMarks}
                          min={0}
                          value={m.marksObtained}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMarksSheet((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, marksObtained: val } : item))
                            );
                          }}
                          className="w-20 px-2 py-1 rounded border border-appBorder text-xs font-bold text-primary-600"
                        />
                      </td>
                      <td className="p-3">
                        <span className="font-black px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700">
                          {calculateGrade(parseFloat(m.marksObtained) || 0, m.maxMarks)}
                        </span>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={m.remarks}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMarksSheet((prev) =>
                              prev.map((item, i) => (i === idx ? { ...item, remarks: val } : item))
                            );
                          }}
                          className="w-48 px-2 py-1 rounded border border-appBorder text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleSaveMarks}
              disabled={savingMarks}
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700 flex items-center justify-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingMarks ? 'Saving...' : 'Save Marks & Publish Grades'}</span>
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL 2: Printable Report Card */}
      {selectedReportCard && (
        <Modal
          isOpen={!!selectedReportCard}
          onClose={() => setSelectedReportCard(null)}
          title="CBSE Progressive Report Card"
          subtitle={`${selectedReportCard.exam.name}`}
          maxWidth="2xl"
        >
          <div className="border border-secondary-300 rounded-xl p-6 bg-white space-y-6 font-sans text-xs">
            <div className="text-center border-b-2 border-secondary-800 pb-4 space-y-1">
              <h2 className="text-xl font-black text-secondary-900 tracking-tight">
                {selectedReportCard.school.name}
              </h2>
              <p className="text-secondary-600">CBSE Affiliation No: {selectedReportCard.school.affiliation}</p>
              <div className="inline-block mt-1 px-3 py-0.5 bg-secondary-900 text-white rounded text-[11px] font-bold uppercase">
                Official Term Report Card
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-appBorder pb-3">
              <p><strong>Student:</strong> {selectedReportCard.student.fullName}</p>
              <p><strong>Class:</strong> {selectedReportCard.student.className} - {selectedReportCard.student.sectionName}</p>
              <p><strong>Admission No:</strong> {selectedReportCard.student.admissionNumber}</p>
              <p><strong>Attendance:</strong> {selectedReportCard.student.attendancePercentage}%</p>
            </div>

            <table className="w-full text-left border border-appBorder">
              <thead className="bg-slate-100 font-bold uppercase">
                <tr>
                  <th className="p-2 border border-appBorder">Subject</th>
                  <th className="p-2 border border-appBorder text-center">Max Marks</th>
                  <th className="p-2 border border-appBorder text-center">Marks Scored</th>
                  <th className="p-2 border border-appBorder text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {selectedReportCard.marks.map((m: any) => (
                  <tr key={m.id}>
                    <td className="p-2 border border-appBorder font-semibold">{m.subjectName}</td>
                    <td className="p-2 border border-appBorder text-center">{m.maxMarks}</td>
                    <td className="p-2 border border-appBorder text-center font-bold text-primary-600">{m.marksObtained}</td>
                    <td className="p-2 border border-appBorder text-center font-bold text-emerald-700">{m.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-6 flex items-center justify-between">
              <span>Principal Signature: Dr. Sunita Sharma</span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-secondary-900 text-white font-bold text-xs flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

