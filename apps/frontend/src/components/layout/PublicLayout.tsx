import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AIAssistantChatbot } from '../common/AIAssistantChatbot';
import { WhatsAppButton } from '../common/WhatsAppButton';
import {
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  LogIn,
  ShieldCheck,
  UserCheck,
  Users,
  BookOpen,
  ArrowRight,
  Award,
  Sparkles,
  MapPin,
  Compass,
  CheckCircle2,
} from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'about' | 'academics' | 'campus' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setLoginDropdownOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F172A] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* 1. Top Auxiliary Institutional Bar */}
      <div className="bg-[#070C1A] text-slate-300 text-[11px] py-2 px-4 border-b border-amber-900/20 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#2563EB] transition-colors">
              <Phone className="w-3 h-3 text-[#2563EB]" />
              <span>Admissions: +91 120 4589200</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-[#2563EB] transition-colors">
              <Mail className="w-3 h-3 text-[#2563EB]" />
              <span>admissions@greenwood.edu.in</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3 h-3 text-[#2563EB]" />
              <span>Campus Hours: 8:00 AM – 3:30 PM (Mon–Sat)</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-3 text-slate-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
            <div className="border-l border-slate-700/60 pl-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
                CBSE Affiliation: 2130842
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Luxury Navigation Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md border-b border-[#E2E8F0 border-[#EDE4D6] py-3 text-[#0B132B]'
            : isHomePage
            ? 'bg-gradient-to-b from-[#0B0F19]/90 to-transparent py-4 text-white'
            : 'bg-[#FAF8F5] border-b border-[#EDE4D6] py-4 text-[#0B132B]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* School Monogram & Crest Brand */}
            <Link to="/" className="flex items-center gap-3.5 group">
              {/* Crest Monogram */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#0B132B] to-[#1C2E52] border border-[#2563EB]/50 text-[#2563EB] flex items-center justify-center shadow-md group-hover:border-[#2563EB] transition-all flex-shrink-0">
                <span className="font-serif font-black text-lg tracking-wider">GIA</span>
              </div>
              <div className="text-left">
                <h1 className={`text-lg sm:text-xl font-serif font-bold tracking-tight leading-none ${isScrolled || !isHomePage ? 'text-[#0B132B]' : 'text-white'}`}>
                  GREENWOOD
                </h1>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isScrolled || !isHomePage ? 'text-[#1E40AF]' : 'text-[#D4AF37]'}`}>
                  International Academy
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links with Mega Menu Triggers */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-2 text-xs font-bold tracking-wide transition-colors ${
                    isActive ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                Home
              </NavLink>

              {/* Mega Menu Trigger: About Us */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('about')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold tracking-wide transition-colors ${
                    activeMegaMenu === 'about' ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === 'about' && (
                  <div className="absolute left-0 mt-1 w-[560px] bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-12 gap-6 text-[#0B132B]">
                    <div className="col-span-5 bg-gradient-to-br from-[#0B132B] to-[#1C2E52] rounded-xl p-4 text-white flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                          Est. 1998
                        </span>
                        <h4 className="font-serif text-base font-bold">28 Years of Legacy</h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          A distinguished institution cultivating character, academic rigor, and compassionate leadership.
                        </p>
                      </div>
                      <Link
                        to="/about"
                        className="text-xs font-bold text-[#2563EB] hover:text-white flex items-center gap-1 mt-4"
                      >
                        <span>Full Heritage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="col-span-7 space-y-3">
                      <Link
                        to="/about"
                        className="block p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                      >
                        <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF] flex items-center gap-1.5">
                          <span>Institutional Overview</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">Foundational history, mission, vision, and core values.</p>
                      </Link>

                      <Link
                        to="/principal-message"
                        className="block p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                      >
                        <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF] flex items-center gap-1.5">
                          <span>From the Principal's Desk</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">Dr. Sunita Sharma's welcome and educational philosophy.</p>
                      </Link>

                      <Link
                        to="/faculty"
                        className="block p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                      >
                        <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF] flex items-center gap-1.5">
                          <span>Distinguished Faculty</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">Directory of 85+ postgraduate educators and mentors.</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mega Menu Trigger: Academics */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('academics')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold tracking-wide transition-colors ${
                    activeMegaMenu === 'academics' ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Academics</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === 'academics' && (
                  <div className="absolute -left-16 mt-1 w-[620px] bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-12 gap-6 text-[#0B132B]">
                    <div className="col-span-5 bg-slate-100 rounded-xl overflow-hidden relative group">
                      <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400"
                        alt="Academic Learning"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-4 text-white">
                        <div>
                          <p className="text-[10px] font-bold text-[#D4AF37] uppercase">NEP 2020 Aligned</p>
                          <h4 className="font-serif text-sm font-bold">Experiential CBSE Curricula</h4>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-7 grid grid-cols-2 gap-3">
                      <Link to="/academics" className="p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                        <span className="text-[10px] font-bold text-[#1E40AF] uppercase">Foundation</span>
                        <h5 className="text-xs font-bold text-[#0B132B] mt-0.5">Early Childhood</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Pre-KG to UKG sensory learning.</p>
                      </Link>

                      <Link to="/academics" className="p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                        <span className="text-[10px] font-bold text-[#1E40AF] uppercase">Preparatory</span>
                        <h5 className="text-xs font-bold text-[#0B132B] mt-0.5">Primary Wing</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Grades 1 – 5 foundational inquiry.</p>
                      </Link>

                      <Link to="/academics" className="p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                        <span className="text-[10px] font-bold text-[#1E40AF] uppercase">Middle</span>
                        <h5 className="text-xs font-bold text-[#0B132B] mt-0.5">Middle School</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Grades 6 – 8 STEAM specialization.</p>
                      </Link>

                      <Link to="/academics" className="p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors">
                        <span className="text-[10px] font-bold text-[#1E40AF] uppercase">Senior</span>
                        <h5 className="text-xs font-bold text-[#0B132B] mt-0.5">Secondary & Sr. Sec</h5>
                        <p className="text-[10px] text-slate-500 mt-0.5">Grades 9 – 12 Science & Commerce.</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Mega Menu Trigger: Campus Life */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('campus')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button
                  className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold tracking-wide transition-colors ${
                    activeMegaMenu === 'campus' ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Campus Life</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {activeMegaMenu === 'campus' && (
                  <div className="absolute -left-20 mt-1 w-[580px] bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150 grid grid-cols-2 gap-4 text-[#0B132B]">
                    <Link to="/facilities" className="p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EDE4D6] group">
                      <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF]">Smart Infrastructure</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Interactive 4K flat panels, STEM labs, and sports arenas.</p>
                    </Link>

                    <Link to="/gallery" className="p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EDE4D6] group">
                      <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF]">Visual Gallery</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Curated photographs of campus life, annual meets, and arts.</p>
                    </Link>

                    <Link to="/events" className="p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EDE4D6] group">
                      <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF]">Events & Calendar</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Upcoming school activities, debates, sports meets, and PTMs.</p>
                    </Link>

                    <Link to="/news" className="p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors border border-transparent hover:border-[#EDE4D6] group">
                      <h5 className="text-xs font-bold text-[#0B132B] group-hover:text-[#1E40AF]">Press & Bulletins</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Latest announcements, student achievements, and awards.</p>
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/facilities"
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-bold tracking-wide transition-colors ${
                    isActive ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                Facilities
              </NavLink>

              <NavLink
                to="/admissions"
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-bold tracking-wide transition-colors ${
                    isActive ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                Admissions
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 text-xs font-bold tracking-wide transition-colors ${
                    isActive ? 'text-[#2563EB]' : isScrolled || !isHomePage ? 'text-[#0B132B] hover:text-[#1E40AF]' : 'text-slate-200 hover:text-white'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Right CTAs: Portal Login + Luxury Admission CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Portal Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isScrolled || !isHomePage
                      ? 'border-[#EDE4D6] text-[#0B132B] hover:bg-[#FAF8F5]'
                      : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Portal Login</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {loginDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-[#EDE4D6] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-[#0B132B]"
                    onMouseLeave={() => setLoginDropdownOpen(false)}
                  >
                    <div className="px-3.5 py-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1E40AF]">
                        Select Authorized Portal
                      </p>
                    </div>
                    <button
                      onClick={() => { setLoginDropdownOpen(false); navigate('/login?role=admin'); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#0B132B] hover:bg-[#FAF8F5] hover:text-[#1E40AF] flex items-center gap-2.5 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                      <span>Admin & Principal Desk</span>
                    </button>
                    <button
                      onClick={() => { setLoginDropdownOpen(false); navigate('/login?role=teacher'); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#0B132B] hover:bg-[#FAF8F5] hover:text-[#1E40AF] flex items-center gap-2.5 font-medium"
                    >
                      <UserCheck className="w-4 h-4 text-indigo-600" />
                      <span>Faculty & Teacher Portal</span>
                    </button>
                    <button
                      onClick={() => { setLoginDropdownOpen(false); navigate('/login?role=parent'); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#0B132B] hover:bg-[#FAF8F5] hover:text-[#1E40AF] flex items-center gap-2.5 font-medium"
                    >
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Parent Progress Portal</span>
                    </button>
                    <button
                      onClick={() => { setLoginDropdownOpen(false); navigate('/login?role=student'); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#0B132B] hover:bg-[#FAF8F5] hover:text-[#1E40AF] flex items-center gap-2.5 font-medium"
                    >
                      <BookOpen className="w-4 h-4 text-sky-600" />
                      <span>Student Academic Portal</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Luxury Admission CTA Button */}
              <Link
                to="/online-enquiry"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-[#070C1A] text-xs font-serif font-bold shadow-md hover:shadow-lg transition-all tracking-wide"
              >
                Apply for Admission
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/online-enquiry"
                className="px-3 py-1.5 text-xs font-serif font-bold bg-[#2563EB] text-[#070C1A] rounded-lg"
              >
                Apply
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl ${isScrolled || !isHomePage ? 'text-[#0B132B]' : 'text-white'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EDE4D6] px-5 pt-3 pb-8 space-y-3 animate-in fade-in duration-200 text-[#0B132B]">
            <div className="space-y-1 text-sm font-serif font-bold">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Home</NavLink>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">About Our School</NavLink>
              <NavLink to="/principal-message" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Principal's Desk</NavLink>
              <NavLink to="/academics" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Academics & Wings</NavLink>
              <NavLink to="/facilities" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Campus & Facilities</NavLink>
              <NavLink to="/faculty" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Faculty & Staff</NavLink>
              <NavLink to="/admissions" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Admissions 2026-27</NavLink>
              <NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Visual Gallery</NavLink>
              <NavLink to="/events" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-slate-200">Events & News</NavLink>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2">Contact Us</NavLink>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <Link
                to="/online-enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center rounded-xl bg-[#2563EB] text-[#070C1A] text-xs font-serif font-bold shadow"
              >
                Apply for Admission 2026-27
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl border border-slate-300 text-xs font-bold text-slate-800"
              >
                Portal Login Desk
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 3. Luxury Editorial Footer */}
      <footer className="bg-[#070C1A] text-slate-300 pt-16 pb-10 border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            {/* Col 1: Brand & Heritage */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0B132B] border border-[#2563EB]/60 text-[#2563EB] flex items-center justify-center font-serif font-bold text-lg">
                  GIA
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-white tracking-tight">GREENWOOD</h2>
                  <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                    International Academy
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-md font-normal">
                Established in 1998, Greenwood International Academy is a premier CBSE day and residential institution committed to intellectual inquiry, moral character, and global leadership.
              </p>
              <div className="flex items-center space-x-3 text-slate-400 pt-2">
                <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-[#2563EB] hover:text-[#070C1A] transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-[#2563EB] hover:text-[#070C1A] transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-[#2563EB] hover:text-[#070C1A] transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-[#2563EB] hover:text-[#070C1A] transition-colors"><Youtube className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Col 2: Institutional Navigation */}
            <div>
              <h3 className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest mb-4">The Institution</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/about" className="hover:text-white transition-colors">School History & Ethos</Link></li>
                <li><Link to="/principal-message" className="hover:text-white transition-colors">From the Principal's Desk</Link></li>
                <li><Link to="/faculty" className="hover:text-white transition-colors">Faculty & Academic Mentors</Link></li>
                <li><Link to="/facilities" className="hover:text-white transition-colors">Campus & Facilities</Link></li>
                <li><Link to="/gallery" className="hover:text-white transition-colors">Visual Gallery</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">Press & Announcements</Link></li>
              </ul>
            </div>

            {/* Col 3: Academic Continuum */}
            <div>
              <h3 className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Academics</h3>
              <ul className="space-y-2 text-xs">
                <li><Link to="/academics" className="hover:text-white transition-colors">Early Childhood (Pre-KG to UKG)</Link></li>
                <li><Link to="/academics" className="hover:text-white transition-colors">Primary Wing (Grades 1 – 5)</Link></li>
                <li><Link to="/academics" className="hover:text-white transition-colors">Middle School (Grades 6 – 8)</Link></li>
                <li><Link to="/academics" className="hover:text-white transition-colors">Secondary CBSE (Grades 9 & 10)</Link></li>
                <li><Link to="/academics" className="hover:text-white transition-colors">Senior Secondary (Sci & Comm)</Link></li>
                <li><Link to="/online-enquiry" className="text-[#2563EB] font-bold hover:underline">Admission Enquiry 2026-27 →</Link></li>
              </ul>
            </div>

            {/* Col 4: Campus Contact & Affiliation */}
            <div>
              <h3 className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest mb-4">Admissions & Campus</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
                  <span>Plot 14, Institutional Area, Sector 62, Noida, NCR, UP 201309</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>+91 120 4589200 / +91 98101 12233</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>info@greenwood.edu.in</span>
                </li>
                <li className="pt-2">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">CBSE Affiliation: 2130842</p>
                    <p className="text-[10px] text-slate-400">School Code: GIA-DEL-042</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Greenwood International Academy. All Rights Reserved. Powered by EduManage ERP.</p>
            <div className="flex items-center space-x-6">
              <Link to="/about" className="hover:text-slate-400">Governance</Link>
              <Link to="/contact" className="hover:text-slate-400">Campus Tour</Link>
              <Link to="/login" className="hover:text-[#2563EB] font-bold">Authorized Portal Login</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Features for Phase 1 Demo */}
      <WhatsAppButton />
      <AIAssistantChatbot />
    </div>
  );
};
