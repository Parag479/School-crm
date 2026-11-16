import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Calendar, Clock, BookOpen, User } from 'lucide-react';

export const TimetableManager: React.FC = () => {
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('MONDAY');

  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  useEffect(() => {
    setLoading(true);
    api
      .get('/timetables?classId=class-13&sectionId=sec-class-13-a')
      .then((res: any) => setTimetable(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const daySlots = timetable.filter((t) => t.dayOfWeek === selectedDay);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Master Timetable & Schedule</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Weekly period grid, educator assignments, and room allocation for Class 10-A
          </p>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl border border-appBorder overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedDay === day ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600 hover:text-secondary-900'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {daySlots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-2xl border border-appBorder p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">
                  Period {slot.periodNumber}
                </span>
                <span className="text-xs font-mono font-semibold text-secondary-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot.startTime} – {slot.endTime}</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-secondary-900">{slot.subjectName}</h3>
                <p className="text-xs text-secondary-500 mt-0.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{slot.teacherName}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-appBorder flex items-center justify-between text-[11px] text-secondary-400">
                <span>Room: {slot.roomNumber || 'Room 204'}</span>
                <span className="text-emerald-600 font-semibold">Active Session</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

