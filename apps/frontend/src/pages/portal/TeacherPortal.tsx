import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  UserCheck,
  CalendarCheck,
  BookOpen,
  FileSpreadsheet,
  Calendar,
  Users,
  LogOut,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const TeacherPortal: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);
  const [homework, setHomework] = useState<any[]>([]);
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/students?classId=class-13&sectionId=sec-class-13-a'),
      api.get('/homework?teacherId=tch-001'),
      api.get('/timetables?teacherId=tch-001'),
    ])
      .then(([stuRes, hwRes, ttRes]: any) => {
        setStudents(stuRes.data);
        setHomework(hwRes.data);
        setTimetable(ttRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton rows={8} />;

  return (
    <div className="min-h-screen bg-slate-50 text-appText pb-16">
      {/* Teacher Navbar */}
      <header className="bg-white border-b border-appBorder sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-secondary-900 tracking-tight">Teacher Workspace</h1>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
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
              <span className="text-xs font-bold text-secondary-900">{user?.name || 'Dr. Rajesh Verma'}</span>
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
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-secondary-900">Good Day, {user?.name || 'Dr. Rajesh Verma'}</h2>
            <p className="text-xs text-secondary-500">
              Department: Senior PGT Mathematics • Head of Department • Class 10-A Class Teacher
            </p>
            <p className="text-xs text-secondary-700">Today's Class Strength: 40 Students (Room 204)</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/admin/attendance"
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Mark Roll Call</span>
            </Link>
            <Link
              to="/admin/examinations"
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Enter Exam Marks</span>
            </Link>
          </div>
        </div>

        {/* 2-Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Class Students Roster */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <div>
                <h3 className="text-base font-bold text-secondary-900">Class 10-A Student Roster</h3>
                <p className="text-xs text-secondary-500">Class Teacher Assigned Section</p>
              </div>
              <Users className="w-5 h-5 text-primary-600" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary-50 border-b border-appBorder uppercase font-bold text-secondary-600">
                  <tr>
                    <th className="p-2.5">Roll No</th>
                    <th className="p-2.5">Student Name</th>
                    <th className="p-2.5">Admission No</th>
                    <th className="p-2.5">Attendance</th>
                    <th className="p-2.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-appBorder text-secondary-700">
                  {students.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-secondary-500">{stu.rollNumber || '101'}</td>
                      <td className="p-2.5 font-bold text-secondary-900">{stu.fullName}</td>
                      <td className="p-2.5 font-mono text-primary-600">{stu.admissionNumber}</td>
                      <td className="p-2.5 font-bold text-emerald-600">{stu.attendancePercentage || 94}%</td>
                      <td className="p-2.5">
                        <Link
                          to={`/admin/students/${stu.id}`}
                          className="text-xs font-bold text-primary-600 hover:underline"
                        >
                          View File
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Weekly Timetable */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-appBorder pb-3">
              <div>
                <h3 className="text-base font-bold text-secondary-900">My Teaching Schedule</h3>
                <p className="text-xs text-secondary-500">Monday Timetable Allocation</p>
              </div>
              <Calendar className="w-5 h-5 text-primary-600" />
            </div>

            <div className="space-y-2.5">
              {(timetable || []).slice(0, 4).map((slot: any) => (
                <div key={slot.id} className="p-3 rounded-xl bg-slate-50 border border-appBorder flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                      Period {slot.periodNumber}
                    </span>
                    <p className="font-bold text-secondary-900 mt-1">{slot.subjectName}</p>
                    <p className="text-[10px] text-secondary-500">Class 10-A ({slot.roomNumber || 'Room 204'})</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-bold text-secondary-800">{slot.startTime} – {slot.endTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

