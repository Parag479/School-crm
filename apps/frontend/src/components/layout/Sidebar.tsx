import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck2,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  CreditCard,
  BookMarked,
  Bus,
  Bell,
  Globe,
  Settings,
  Users2,
  FileSpreadsheet,
  Calendar,
  X,
  School,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navSections = [
    {
      title: 'CORE',
      items: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Admission CRM', path: '/admin/admissions', icon: UserCheck2 },
        { label: 'Students', path: '/admin/students', icon: GraduationCap },
        { label: 'Teachers & Staff', path: '/admin/teachers', icon: Users2 },
      ],
    },
    {
      title: 'ACADEMICS & SESSIONS',
      items: [
        { label: 'Classes & Sections', path: '/admin/classes', icon: School },
        { label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
        { label: 'Examinations & Marks', path: '/admin/examinations', icon: FileSpreadsheet },
        { label: 'Timetable', path: '/admin/timetable', icon: Calendar },
        { label: 'Homework', path: '/admin/homework', icon: BookOpen },
      ],
    },
    {
      title: 'OPERATIONS & FINANCE',
      items: [
        { label: 'Fees & Invoices', path: '/admin/fees', icon: CreditCard },
        { label: 'Library', path: '/admin/library', icon: BookMarked },
        { label: 'Transport', path: '/admin/transport', icon: Bus },
      ],
    },
    {
      title: 'COMMUNICATION & CMS',
      items: [
        { label: 'Notices & Circulars', path: '/admin/notices', icon: Bell },
        { label: 'Website CMS', path: '/admin/website-cms', icon: Globe },
        { label: 'School Settings', path: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-secondary-900 text-slate-300 transition-transform duration-300 ease-in-out border-r border-secondary-800 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-800 bg-secondary-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center font-black shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">EduManage</span>
              <span className="block text-[10px] font-semibold text-primary-400 uppercase tracking-widest leading-none">
                School ERP CRM
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {navSections.map((sec) => (
            <div key={sec.title}>
              <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {sec.title}
              </p>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-primary-600 text-white font-semibold shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-secondary-800/80'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* School Tenant & Version Footnote */}
        <div className="p-3 border-t border-secondary-800 bg-secondary-950/40">
          <div className="px-3 py-2 rounded-lg bg-secondary-800/60 border border-secondary-700/60 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              GIA
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Greenwood Academy</p>
              <p className="text-[10px] text-slate-400 font-mono">CBSE • AY 2026-27</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

