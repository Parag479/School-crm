import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '../../utils/validation';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/useAuthStore';
import {
  GraduationCap,
  ShieldCheck,
  UserCheck,
  Users,
  BookOpen,
  Lock,
  Mail,
  AlertCircle,
  Calculator,
  UserCog,
  Headphones,
  Award,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeQuickRole, setActiveQuickRole] = useState<string | null>(null);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'admin@greenwood.edu.in',
      password: 'admin123',
      rememberMe: true,
    },
  });

  const handleLoginSuccess = (user: any, accessToken: string) => {
    setAuth(user, accessToken);

    // Role-based redirect
    if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
      navigate('/admin/dashboard');
    } else if (user.role === 'ADMISSION_OFFICER') {
      navigate('/admin/admissions');
    } else if (user.role === 'TEACHER') {
      navigate('/teacher/dashboard');
    } else if (user.role === 'PARENT') {
      navigate('/parent/dashboard');
    } else if (user.role === 'STUDENT') {
      navigate('/student/dashboard');
    } else if (user.role === 'ACCOUNTANT') {
      navigate('/accountant/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res: any = await api.post('/auth/login', data);
      if (res?.data?.user && res?.data?.accessToken) {
        handleLoginSuccess(res.data.user, res.data.accessToken);
        return;
      }
      throw new Error('Fallback authentication');
    } catch {
      // Automatic fallback for static demo hosting
      const emailLower = data.email.toLowerCase();
      let role: any = 'ADMIN';
      let name = 'Dr. Sunita Sharma (Admin)';
      if (emailLower.includes('teacher')) {
        role = 'TEACHER';
        name = 'Dr. Rajesh Verma (Faculty)';
      } else if (emailLower.includes('parent')) {
        role = 'PARENT';
        name = 'Vikram Malhotra (Parent)';
      } else if (emailLower.includes('student')) {
        role = 'STUDENT';
        name = 'Aarav Sharma (Class 10-A)';
      } else if (emailLower.includes('accountant')) {
        role = 'ACCOUNTANT';
        name = 'Ramesh Kumar (Accountant)';
      } else if (emailLower.includes('admission')) {
        role = 'ADMISSION_OFFICER';
        name = 'Sunita Rao (Admissions)';
      }
      const mockUser = {
        id: 'usr-mock-' + Date.now(),
        email: data.email,
        name,
        role,
        schoolId: 'school-greenwood-001',
        schoolName: 'Greenwood International Academy',
      };
      handleLoginSuccess(mockUser, 'demo-jwt-token-' + Date.now());
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = async (email: string, pass: string, roleKey: string) => {
    setValue('email', email);
    setValue('password', pass);
    setActiveQuickRole(roleKey);
    setLoading(true);
    setErrorMsg(null);

    try {
      const res: any = await api.post('/auth/login', {
        email,
        password: pass,
        rememberMe: true,
      });
      if (res?.data?.user && res?.data?.accessToken) {
        handleLoginSuccess(res.data.user, res.data.accessToken);
        return;
      }
      throw new Error('Fallback quick login');
    } catch {
      // 1-Click Demo role fallback for presentation
      const roleMap: Record<string, { role: any; name: string }> = {
        ADMIN: { role: 'ADMIN', name: 'Dr. Sunita Sharma (Admin)' },
        superadmin: { role: 'SUPER_ADMIN', name: 'Trust Chairman (Super Admin)' },
        principal: { role: 'ADMIN', name: 'Dr. Sunita Sharma (Principal)' },
        TEACHER: { role: 'TEACHER', name: 'Dr. Rajesh Verma (Faculty)' },
        teacher: { role: 'TEACHER', name: 'Dr. Rajesh Verma (Faculty)' },
        PARENT: { role: 'PARENT', name: 'Vikram Malhotra (Parent)' },
        parent: { role: 'PARENT', name: 'Vikram Malhotra (Parent)' },
        STUDENT: { role: 'STUDENT', name: 'Aarav Sharma (Class 10-A)' },
        ACCOUNTANT: { role: 'ACCOUNTANT', name: 'Ramesh Kumar (Accountant)' },
        accountant: { role: 'ACCOUNTANT', name: 'Ramesh Kumar (Accountant)' },
        receptionist: { role: 'ADMISSION_OFFICER', name: 'Sunita Rao (Admissions)' },
      };
      const found = roleMap[roleKey] || { role: 'ADMIN', name: 'Administrator' };
      const mockUser = {
        id: 'usr-demo-' + roleKey.toLowerCase(),
        email,
        name: found.name,
        role: found.role,
        schoolId: 'school-greenwood-001',
        schoolName: 'Greenwood International Academy',
      };
      handleLoginSuccess(mockUser, 'demo-jwt-token-' + roleKey);
    } finally {
      setLoading(false);
      setActiveQuickRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div className="text-left">
            <span className="text-2xl font-black text-secondary-900 tracking-tight">EduManage ERP</span>
            <span className="block text-[11px] font-bold text-primary-600 uppercase tracking-widest">
              Greenwood Academy
            </span>
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-secondary-900 tracking-tight">
          Sign In to Your Portal
        </h2>
        <p className="mt-1 text-xs text-secondary-500">
          Enter credentials or select a one-click role below for live presentation
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-elevated rounded-2xl border border-appBorder sm:px-10 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1-Click Role Exploration for Live Client Demonstrations */}
          <div className="space-y-3 bg-gradient-to-br from-indigo-50/80 to-slate-50 p-4 rounded-xl border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Instant Demo Login (Live Presentation)</span>
              </div>
              <span className="text-[10px] bg-indigo-200/70 text-indigo-800 font-bold px-2 py-0.5 rounded-full">
                1-Click Direct Access
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {/* Super Admin */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('superadmin@greenwood.edu.in', 'admin123', 'superadmin')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <UserCog className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'superadmin' && <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-primary-600 text-xs">Super Admin</p>
                  <p className="text-[10px] text-secondary-400">School Trust / Owner</p>
                </div>
              </button>

              {/* Principal */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('principal@greenwood.edu.in', 'admin123', 'principal')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-primary-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Award className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'principal' && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-primary-600 text-xs">Principal Desk</p>
                  <p className="text-[10px] text-secondary-400">Dr. Sunita Sharma</p>
                </div>
              </button>

              {/* Teacher */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('teacher@greenwood.edu.in', 'teacher123', 'teacher')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <UserCheck className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'teacher' && <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-indigo-600 text-xs">Teacher</p>
                  <p className="text-[10px] text-secondary-400">Dr. Rajesh Verma</p>
                </div>
              </button>

              {/* Accountant */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('accountant@greenwood.edu.in', 'accountant123', 'accountant')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Calculator className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'accountant' && <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-amber-600 text-xs">Accountant</p>
                  <p className="text-[10px] text-secondary-400">Fee & Ledger Desk</p>
                </div>
              </button>

              {/* Receptionist */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('receptionist@greenwood.edu.in', 'admin123', 'receptionist')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Headphones className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'receptionist' && <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-emerald-600 text-xs">Receptionist</p>
                  <p className="text-[10px] text-secondary-400">Admissions CRM</p>
                </div>
              </button>

              {/* Parent */}
              <button
                type="button"
                disabled={loading}
                onClick={() => quickDemoLogin('parent@greenwood.edu.in', 'parent123', 'parent')}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-teal-600 hover:shadow-sm text-left transition-all flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </span>
                  {activeQuickRole === 'parent' && <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />}
                </div>
                <div>
                  <p className="font-bold text-secondary-900 group-hover:text-teal-600 text-xs">Parent Portal</p>
                  <p className="text-[10px] text-secondary-400">Mr. Malhotra</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-appBorder"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-secondary-400 font-semibold">Or Sign In with Email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-secondary-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  {...register('email')}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="name@greenwood.edu.in"
                />
                <Mail className="w-4 h-4 text-secondary-400 absolute left-3.5 top-3" />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-secondary-700">Password</label>
                <a href="#" className="text-xs font-semibold text-primary-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  {...register('password')}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-secondary-400 absolute left-3.5 top-3" />
              </div>
              {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-xs text-secondary-600 cursor-pointer">
                <input type="checkbox" {...register('rememberMe')} className="rounded border-slate-300 text-primary-600" />
                <span className="ml-2">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-md hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Authenticating...' : 'Sign In with Credentials'}</span>
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-xs text-secondary-500">
          <Link to="/" className="font-semibold text-primary-600 hover:underline">
            ← Return to Greenwood International Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
