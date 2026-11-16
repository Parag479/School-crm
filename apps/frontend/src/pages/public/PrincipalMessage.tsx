import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  Heart,
  Quote,
  CheckCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const PrincipalMessage: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F172A] selection:bg-[#C5A880] selection:text-[#0B132B]">
      {/* Editorial Hero Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" /> Leadership & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            From the Principal's Desk
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-light">
            Nurturing inquisitive minds, empathetic hearts, and fearless ethical leaders for over 28 years.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Principal Profile Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-md border border-[#EDE4D6] overflow-hidden sticky top-28">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Dr. Sunita Sharma"
                className="w-full h-84 object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <h3 className="font-serif text-xl font-bold">Dr. Sunita Sharma</h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">Ph.D. in Educational Pedagogy, M.Ed., M.Sc.</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="border-b border-slate-100 pb-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Designation</p>
                <p className="font-serif text-sm font-bold text-[#0B132B] mt-0.5">Principal & Director of Academics</p>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Experience</p>
                <p className="font-serif text-sm font-bold text-[#0B132B] mt-0.5">28+ Years in Progressive School Education</p>
              </div>

              <div className="border-b border-slate-100 pb-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Key Accolades</p>
                <ul className="space-y-1 mt-1 text-slate-600 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>National Best Educator Award (CBSE)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Global Educational Leadership Fellow</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  to="/online-enquiry"
                  className="w-full py-3 bg-[#C5A880] hover:bg-[#B08E60] text-[#070C1A] font-serif font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <span>Book Interactive Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Message Prose */}
          <div className="lg:col-span-8 space-y-6 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#EDE4D6]">
            <div className="flex items-center gap-2 text-[#8E6E41]">
              <Quote className="w-10 h-10 opacity-30 rotate-180" />
              <span className="text-xs font-serif font-bold uppercase tracking-[0.2em]">
                A Personal Welcome to Parents & Scholars
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight leading-snug">
              "Education is not merely the filling of a vessel, but the lighting of a lifelong flame of curiosity and character."
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                It is my profound privilege to welcome you to <strong>Greenwood International Academy</strong>. As educators and mentors, we believe that every child who steps onto our campus brings a singular constellation of talents, curiosity, and boundless potential.
              </p>
              <p>
                In an era dominated by rapid technological change, automation, and artificial intelligence, the ultimate goal of schooling must transcend rote scores. At Greenwood, our curriculum integrates <strong>CBSE academic rigor</strong> with 21st-century experiential learning—empowering students in robotics, computational thinking, scientific inquiry, environmental stewardship, and fine arts.
              </p>
              <p>
                Equally fundamental is character. We instill timeless Indian core values—integrity, mutual respect, humility, and civic responsibility. Our graduates do not merely excel in premier university entrances; they emerge as compassionate global citizens anchored in values.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="pt-6 border-t border-[#EDE4D6]">
              <h3 className="font-serif text-base font-bold text-[#0B132B] mb-4">
                Our Educational Commitments to Every Greenwood Scholar:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D6]">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#8E6E41] flex items-center justify-center font-bold mb-2">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#0B132B]">Academic Excellence</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Continuous assessment, personalized remedial support, and 100% board pass consistency.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D6]">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#8E6E41] flex items-center justify-center font-bold mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#0B132B]">Safe & Inclusive Campus</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Zero-tolerance anti-bullying policy, certified counselors, and 24x7 CCTV monitoring.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D6]">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#8E6E41] flex items-center justify-center font-bold mb-2">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#0B132B]">Emotional Well-Being</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Mindfulness routines, sports training, and dedicated social-emotional development.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EDE4D6]">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#8E6E41] flex items-center justify-center font-bold mb-2">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-xs font-bold text-[#0B132B]">Future-Ready Skills</h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Atal Tinkering Lab, financial literacy, communication labs, and Model United Nations.
                  </p>
                </div>
              </div>
            </div>

            {/* Closing Signature Area */}
            <div className="pt-6 border-t border-[#EDE4D6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif text-sm font-bold text-[#0B132B]">Dr. Sunita Sharma</p>
                <p className="text-xs text-slate-500">Principal, Greenwood International Academy</p>
                <p className="text-[11px] text-[#8E6E41] font-semibold mt-0.5">principal@greenwood.edu.in</p>
              </div>

              <Link
                to="/admissions"
                className="px-6 py-2.5 rounded-xl bg-[#0B132B] hover:bg-black text-white font-serif text-xs font-bold transition-all shadow"
              >
                Explore Admissions 2026-27 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
