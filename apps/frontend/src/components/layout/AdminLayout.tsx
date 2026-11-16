import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/useAuthStore';
import {
  Menu,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBreadcrumbTitle = () => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="min-h-screen bg-appBg text-appText flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-appBorder shadow-sm flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumbs / Page Context */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-secondary-500">
              <span className="font-medium text-secondary-400">Admin CRM</span>
              <span>/</span>
              <span className="font-bold text-secondary-900">{getBreadcrumbTitle()}</span>
            </div>
          </div>

          {/* Quick Academic Selector & Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Link to Public Site */}
            <Link
              to="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-secondary-600 hover:text-primary-600 bg-secondary-50 hover:bg-primary-50 rounded-lg border border-appBorder transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>

            {/* Academic Year Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-primary-50 text-primary-700 rounded-lg border border-primary-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>AY 2026-27 (Active)</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-secondary-600 hover:bg-slate-100 relative transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
              </button>

              {notificationsOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-elevated border border-appBorder py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-appBorder flex items-center justify-between">
                    <span className="text-xs font-bold text-secondary-900 uppercase tracking-wider">
                      System Notifications
                    </span>
                    <span className="text-[10px] font-semibold text-primary-600">Mark all read</span>
                  </div>
                  <div className="divide-y divide-appBorder max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 text-xs transition-colors">
                      <p className="font-semibold text-secondary-900">New Website Admission Enquiry</p>
                      <p className="text-secondary-500 mt-0.5">Vihaan Sharma applied for Class 9.</p>
                      <span className="text-[10px] text-secondary-400 mt-1 block">5 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 text-xs transition-colors">
                      <p className="font-semibold text-secondary-900">Online Fee Payment Received</p>
                      <p className="text-secondary-500 mt-0.5">₹31,500 received via Razorpay for Aarav Malhotra.</p>
                      <span className="text-[10px] text-secondary-400 mt-1 block">2 hours ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 text-xs transition-colors">
                      <p className="font-semibold text-secondary-900">CBSE Term 1 Marks Uploaded</p>
                      <p className="text-secondary-500 mt-0.5">Class 10-A Mathematics marks recorded by Dr. Rajesh Verma.</p>
                      <span className="text-[10px] text-secondary-400 mt-1 block">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
                  }
                  alt={user?.name || 'User'}
                  className="w-9 h-9 rounded-full object-cover border border-primary-200"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-secondary-900 leading-none">{user?.name || 'Administrator'}</p>
                  <span className="inline-block text-[10px] font-semibold text-primary-600 bg-primary-50 px-1.5 py-0.2 rounded mt-0.5">
                    {user?.role || 'ADMIN'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-secondary-400 hidden sm:block" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-elevated border border-appBorder py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-appBorder">
                    <p className="text-xs font-bold text-secondary-900">{user?.name || 'Admin User'}</p>
                    <p className="text-[11px] text-secondary-500 truncate">{user?.email || 'admin@greenwood.edu.in'}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/admin/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-secondary-700 hover:bg-slate-50"
                    >
                      School Settings
                    </Link>
                    <Link
                      to="/teacher/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-secondary-700 hover:bg-slate-50"
                    >
                      Switch to Teacher Portal
                    </Link>
                    <Link
                      to="/parent/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-secondary-700 hover:bg-slate-50"
                    >
                      Switch to Parent Portal
                    </Link>
                    <Link
                      to="/student/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-medium text-secondary-700 hover:bg-slate-50"
                    >
                      Switch to Student Portal
                    </Link>
                  </div>
                  <div className="border-t border-appBorder pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

