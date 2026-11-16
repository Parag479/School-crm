import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  Upload,
  CheckCircle2,
  CalendarCheck,
  Bell,
  LogOut,
  Send,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const StudentPortal: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [homeworkList, setHomeworkList] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Homework submit modal
  const [submittingHw, setSubmittingHw] = useState<any | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/students/stu-001'),
      api.get('/homework?classId=class-13&sectionId=sec-class-13-a'),
      api.get('/notices?role=STUDENTS'),
    ])
      .then(([stuRes, hwRes, notRes]: any) => {
        setData(stuRes.data);
        setHomeworkList(hwRes.data);
        setNotices(notRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmitHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingHw) return;
    try {
      await api.post(`/homework/${submittingHw.id}/submit`, {
        studentId: 'stu-001',
        notes: submissionNotes,
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmittingHw(null);
        setSubmissionNotes('');
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Submission failed');
    }
  };

  if (loading || !data) return <LoadingSkeleton rows={8} />;

  const { student, marks, timetable, attendance } = data;

  return (
    <div className="min-h-screen bg-slate-50 text-appText pb-16">
      {/* Student Navbar */}
      <header className="bg-white border-b border-appBorder sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-secondary-900 tracking-tight">Student Portal</h1>
              <p className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">
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
              <span className="text-xs font-bold text-secondary-900">{student.fullName}</span>
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
        {/* Banner */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
              alt={student.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-200"
            />
            <div>
              <h2 className="text-xl font-bold text-secondary-900">Welcome Back, {student.firstName}!</h2>
              <p className="text-xs text-secondary-500">
                Admission No: <strong className="font-mono text-primary-600">{student.admissionNumber}</strong> • Class: {student.className}-{student.sectionName}
              </p>
              <p className="text-xs font-semibold text-secondary-700 mt-0.5">
                Roll No: {student.rollNumber || '101'} • Term 1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-[10px] font-bold uppercase text-emerald-600">My Attendance</p>
              <p className="text-2xl font-black text-emerald-700">{student.attendancePercentage || 94}%</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
              <p className="text-[10px] font-bold uppercase text-sky-600">Pending Tasks</p>
              <p className="text-2xl font-black text-sky-700">{homeworkList.length}</p>
            </div>
          </div>
        </div>

        {/* 2-Column: Homework Left, Timetable Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Homework Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <div>
                <h3 className="text-base font-bold text-secondary-900">Assigned Homework & Exercises</h3>
                <p className="text-xs text-secondary-500">Submit notebook photographs or typed answers</p>
              </div>
              <BookOpen className="w-5 h-5 text-primary-600" />
            </div>

            <div className="space-y-3">
              {homeworkList.map((hw) => (
                <div key={hw.id} className="p-4 rounded-xl border border-appBorder bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-50 text-primary-700">
                      {hw.subjectName}
                    </span>
                    <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Due {hw.dueDate}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-secondary-900">{hw.title}</h4>
                  <p className="text-xs text-secondary-600 leading-relaxed">{hw.description}</p>

                  <div className="pt-2 border-t border-appBorder flex items-center justify-between">
                    <span className="text-[11px] text-secondary-400">By {hw.teacherName}</span>
                    <button
                      onClick={() => setSubmittingHw(hw)}
                      className="px-3 py-1.5 rounded-lg bg-primary-600 text-white font-bold text-xs hover:bg-primary-700 flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Submit Solution</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Timetable Column */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <div>
                <h3 className="text-base font-bold text-secondary-900">Today's Class Schedule</h3>
                <p className="text-xs text-secondary-500">Monday Period Timetable</p>
              </div>
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>

            <div className="space-y-2.5">
              {(timetable || []).slice(0, 6).map((slot: any) => (
                <div key={slot.id} className="p-3 rounded-xl bg-slate-50 border border-appBorder flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">
                      Period {slot.periodNumber}
                    </span>
                    <p className="font-bold text-secondary-900 mt-1">{slot.subjectName}</p>
                    <p className="text-[11px] text-secondary-500">{slot.teacherName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-secondary-800">{slot.startTime}</p>
                    <p className="text-[10px] text-secondary-400">{slot.roomNumber || 'Room 204'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-secondary-900 border-b border-appBorder pb-3">
            School Announcements & Circulars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-appBorder bg-slate-50 space-y-2">
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                  {new Date(n.publishedAt).toLocaleDateString()}
                </span>
                <h4 className="text-sm font-bold text-secondary-900">{n.title}</h4>
                <p className="text-xs text-secondary-600 leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Homework Submission Modal */}
      {submittingHw && (
        <Modal
          isOpen={!!submittingHw}
          onClose={() => setSubmittingHw(null)}
          title={`Submit: ${submittingHw.title}`}
          subtitle={`Subject: ${submittingHw.subjectName} • Due: ${submittingHw.dueDate}`}
          maxWidth="md"
        >
          {submitSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-secondary-900">Homework Submitted!</h4>
              <p className="text-xs text-secondary-500">Your educator has been notified for evaluation.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitHomework} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">
                  Answers & Rough Work Notes *
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Type your answers, solution steps, or write proof explanations..."
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>

              <div className="p-3 rounded-lg border border-dashed border-appBorder text-center text-xs text-secondary-500">
                <Upload className="w-5 h-5 text-secondary-400 mx-auto mb-1" />
                <span>Upload notebook scan / PDF (Optional)</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Homework</span>
              </button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

