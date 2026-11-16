import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  Users,
  Building,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Laptop,
  Trophy,
  Cpu,
  BookOpen,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Compass,
  Star,
  Activity,
  Send,
  Eye,
  Check,
  ChevronDown,
  Quote,
} from 'lucide-react';
import { api } from '../../services/api';
import { School3DHeroCanvas } from '../../components/common/School3DHeroCanvas';
import { Card3DTilt } from '../../components/common/Card3DTilt';
import { Book3DViewer } from '../../components/common/Book3DViewer';

export const Home: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    api
      .get('/website/public')
      .then((res: any) => {
        setData(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cms = data?.cms || {};
  const news = data?.news || [];
  const events = data?.events || [];
  const gallery = data?.gallery || [];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 4000);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 overflow-hidden bg-[#FAF9F5] text-[#050B18] selection:bg-[#D4AF37] selection:text-[#050B18]">
      {/* ========================================================
          1. HERO SECTION: "Shaping Minds. Inspiring Futures."
          With Interactive 3D Open Academic Book Experience
         ======================================================== */}
      <section className="relative min-h-[92vh] lg:min-h-[98vh] bg-[#050B18] text-white flex items-center justify-center overflow-hidden">
        {/* Full-width editorial high-resolution campus photography with deep royal obsidian overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=85&w=1920"
            alt="Greenwood International Academy Campus"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.25] contrast-[1.1]"
          />
          {/* Subtle vignette and luxury imperial navy gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#0A1435]/70 to-[#050B18]/90" />
        </div>

        {/* Ambient Warm Golden & Sapphire Light Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container (2-Column Editorial Grid on Desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-28 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Headline & Luxury Accolades */}
            <div className="lg:col-span-7 space-y-7 text-left">
              {/* Accreditation Emblem */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.22em] border border-[#D4AF37]/35 backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Admissions 2026–2027 • CBSE Affiliation No. 2130842</span>
              </div>

              {/* Master Headline: Shaping Minds. Inspiring Futures. */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.08]">
                Shaping Minds.{' '}
                <span className="italic font-normal bg-gradient-to-r from-[#F5E6C4] via-[#D4AF37] to-[#BF9827] bg-clip-text text-transparent">
                  Inspiring Futures.
                </span>
              </h1>

              {/* Supporting Narrative */}
              <p className="text-base sm:text-xl text-slate-200 font-light leading-relaxed max-w-xl">
                An institution of rare distinction where academic rigor meets timeless values, unlocking each student’s highest potential on the global stage.
              </p>

              {/* Luxury CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/online-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#BF9827] to-[#997523] text-[#050B18] font-serif font-bold text-sm tracking-wide shadow-xl shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40 hover:from-[#E4BF6E] hover:to-[#D4AF37] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-serif font-semibold text-sm tracking-wide backdrop-blur-md border border-white/20 hover:border-[#D4AF37]/50 transition-all text-center flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  <span>Discover Our Legacy</span>
                </Link>
              </div>

              {/* Institutional Accolade Plaque */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">28+ Years</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 uppercase tracking-widest mt-1">Excellence Legacy</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white">100%</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 uppercase tracking-widest mt-1">CBSE Distinction</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37]">1:12</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 uppercase tracking-widest mt-1">Faculty Mentorship</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white">2,500+</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-300 uppercase tracking-widest mt-1">Global Scholars</p>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive 3D Open Academic Book Viewport */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-[#D4AF37]/30 backdrop-blur-xl p-2 sm:p-4 shadow-2xl overflow-hidden group">
                {/* 3D Book Interactive Canvas */}
                <School3DHeroCanvas className="w-full h-full" />

                {/* Floating Interactive Badge */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <div className="px-3 py-1.5 rounded-full bg-[#050B18]/80 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span>Interactive 3D Book • Move Cursor to Tilt</span>
                  </div>
                </div>

                {/* Bottom Stats Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex items-center justify-between px-4 py-2 rounded-xl bg-[#050B18]/70 border border-white/10 backdrop-blur-md text-[11px] text-slate-300">
                  <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    CBSE & Cambridge
                  </span>
                  <span className="text-slate-400">Holistic Pedagogy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-slate-400 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Scroll to Discover</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </section>

      {/* ========================================================
          SECTION A: Welcome to Our Institution (Editorial Split)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#EDE4D6] bg-white">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=900"
                alt="Greenwood International Campus Grounds"
                className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                    Noida NCR Campus
                  </span>
                  <h4 className="font-serif text-lg font-bold">12-Acre Sustainable Smart Learning Environment</h4>
                </div>
              </div>
            </div>

            {/* Inset Quote Plaque */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-5 rounded-xl shadow-xl border border-[#EDE4D6] max-w-xs hidden sm:block">
              <p className="font-serif text-xs italic text-slate-700 leading-relaxed">
                "We do not merely prepare students for university examinations; we prepare them to navigate and lead life."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8E6E41] mt-2">
                — Greenwood Academic Charter
              </p>
            </div>
          </div>

          {/* Editorial Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
              Welcome to Greenwood
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B132B] tracking-tight leading-[1.15]">
              A Heritage of Academic Rigor and Enlightened Mentorship
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {cms.schoolIntro ||
                'Founded in 1998, Greenwood International Academy represents the pinnacle of modern Indian school education. Rooted in the rich cultural ethos of our nation and enriched by international pedagogical practices, our institution fosters intellectual curiosity, aesthetic refinement, and moral integrity.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#EDE4D6]">
                <h4 className="font-serif text-sm font-bold text-[#0B132B] flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]"></span>
                  Our Educational Vision
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To nurture empathetic global citizens anchored in timeless values, intellectual fearlessness, and creative mastery.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#EDE4D6]">
                <h4 className="font-serif text-sm font-bold text-[#0B132B] flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#0B132B]"></span>
                  Our Enduring Mission
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Delivering transformative education through world-class educators, bespoke mentorship, and cutting-edge facilities.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#8E6E41] hover:text-[#0B132B] tracking-wider uppercase border-b border-[#C5A880] pb-1 transition-colors"
              >
                <span>Read Full Institutional History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE 3D PROSPECTUS BOOK VIEWER
         ======================================================== */}
      <section className="bg-gradient-to-b from-[#FAF9F5] via-[#F4EFE6] to-[#FAF9F5] py-8 sm:py-12 border-t border-[#E5D7B7]">
        <Book3DViewer />
      </section>

      {/* ========================================================
          SECTION B: Our Academic Excellence (Curriculum Stages)
         ======================================================== */}
      <section className="bg-white py-20 border-y border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
              Curriculum Continuum
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight">
              A Structured Pathway to Academic Brilliance
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Aligned with the Central Board of Secondary Education (CBSE) and the National Education Policy (NEP 2020) 5+3+3+4 continuum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stage: 'Early Childhood Wing',
                grades: 'Pre-KG, LKG, UKG',
                desc: 'Play-based sensory discovery, phonics mastery, foundational literacy, and joyful socio-emotional growth.',
                image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
              },
              {
                stage: 'Primary Wing',
                grades: 'Grades 1 – 5',
                desc: 'Foundational numeracy, experiential science projects, multi-lingual fluency, and creative computational logic.',
                image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400',
              },
              {
                stage: 'Middle School',
                grades: 'Grades 6 – 8',
                desc: 'Subject specialization, scientific inquiry, foreign languages (French & Sanskrit), Model UN, and design thinking.',
                image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
              },
              {
                stage: 'Secondary & Sr. Sec.',
                grades: 'Grades 9 – 12',
                desc: 'Rigorous CBSE board training with distinguished Science, Commerce, and AI stream pathways with entrance prep.',
                image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
              },
            ].map((program, idx) => (
              <Card3DTilt key={idx} maxTilt={6}>
                <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#EDE4D6] shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between group">
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src={program.image}
                      alt={program.stage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B132B]/80 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                      {program.grades}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B132B] group-hover:text-[#8E6E41] transition-colors">
                        {program.stage}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">{program.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-[#EDE4D6]">
                      <Link
                        to="/academics"
                        className="text-xs font-serif font-bold text-[#8E6E41] hover:text-[#0B132B] flex items-center justify-between"
                      >
                        <span>View Academic Plan</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: Why Families Choose Us (Distinctive Features)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
            The Greenwood Distinction
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight">
            Why Discerning Families Entrust Us with Their Children
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            An ecosystem built upon individual attention, academic excellence, physical prowess, and joyful discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Faculty of Scholars',
              desc: 'Over 85% of faculty members hold postgraduate or doctoral degrees with an average of 12+ years of pedagogical mastery.',
              badge: 'Faculty Standard',
            },
            {
              title: '100% Board Top Honors',
              desc: 'Consistent first-division results in CBSE Class 10 and 12 examinations, with students consistently ranking among national toppers.',
              badge: 'Academic Record',
            },
            {
              title: 'Individual Student Mentorship',
              desc: 'An intimate 1:16 teacher-to-student ratio guarantees personalized academic diagnostic monitoring and remedial focus.',
              badge: 'Mentorship Focus',
            },
            {
              title: 'Atal Tinkering STEM & Robotics',
              desc: 'Government-recognized innovation lab equipped with 3D printers, sensor kits, drone engineering, and coding from Grade 3.',
              badge: 'Technological Edge',
            },
            {
              title: 'Olympic Sports Infrastructure',
              desc: 'All-weather heated semi-Olympic swimming pool, synthetic basketball courts, and FIFA-standard football training turf.',
              badge: 'Athletic Excellence',
            },
            {
              title: 'Safe, Monitored Campus Fleet',
              desc: 'Air-conditioned luxury bus fleet with female attendants, live parent GPS tracking, CCTV surveillance, and resident doctor infirmary.',
              badge: 'Safety First',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-[#EDE4D6] shadow-sm hover:shadow-md hover:border-[#C5A880] transition-all space-y-3"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E6E41] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#EDE4D6]">
                {item.badge}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0B132B]">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION D: Campus & Facilities (Editorial Asymmetric Grid)
         ======================================================== */}
      <section className="bg-white py-20 border-y border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
                World-Class Infrastructure
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight mt-1">
                Spaces Designed for Exploration & Growth
              </h2>
            </div>
            <Link
              to="/facilities"
              className="text-xs font-serif font-bold text-[#8E6E41] hover:text-[#0B132B] flex items-center gap-1 uppercase tracking-wider border-b border-[#C5A880] pb-0.5"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Facility (Left 7 cols) */}
            <div className="md:col-span-7 rounded-2xl overflow-hidden relative shadow-md group h-96">
              <img
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=900"
                alt="Robotics Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-8 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Atal Innovation Mission
                  </span>
                  <h3 className="font-serif text-2xl font-bold mt-1">Advanced Robotics & STEM Innovation Hub</h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-lg">
                    Hands-on micro-controllers, 3D prototyping, sensor systems, and artificial intelligence incubation for aspiring innovators.
                  </p>
                </div>
              </div>
            </div>

            {/* Facility Card 2 (Right 5 cols) */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden relative shadow-md group h-96">
              <img
                src="https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=700"
                alt="Semi Olympic Pool"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-8 text-white">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    Aquatic Center
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1">Semi-Olympic Heated Swimming Arena</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    All-weather 25-meter competitive facility with certified NIS coaching and dedicated life-guards.
                  </p>
                </div>
              </div>
            </div>

            {/* Facility Card 3 (3 cols) */}
            <div className="md:col-span-4 rounded-2xl overflow-hidden relative shadow-md group h-72">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=500"
                alt="Smart Classroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-5 text-white">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Interactive Learning</span>
                  <h4 className="font-serif text-base font-bold">Smart Digital Classrooms</h4>
                </div>
              </div>
            </div>

            {/* Facility Card 4 (4 cols) */}
            <div className="md:col-span-4 rounded-2xl overflow-hidden relative shadow-md group h-72">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=500"
                alt="Library"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-5 text-white">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Knowledge Hub</span>
                  <h4 className="font-serif text-base font-bold">20,000+ Volume Library</h4>
                </div>
              </div>
            </div>

            {/* Facility Card 5 (4 cols) */}
            <div className="md:col-span-4 rounded-2xl overflow-hidden relative shadow-md group h-72">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=500"
                alt="Composite Science Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-transparent to-transparent flex items-end p-5 text-white">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">Research Standard</span>
                  <h4 className="font-serif text-base font-bold">Composite Science Labs</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION E: Principal's Message (Editorial Layout)
         ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#EDE4D6] p-8 sm:p-14 shadow-card grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 text-center sm:text-left">
            <div className="relative mx-auto sm:mx-0 w-60 h-72 sm:w-68 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Dr. Sunita Sharma"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-serif text-lg font-bold text-[#0B132B]">Dr. Sunita Sharma</h4>
              <p className="text-xs font-semibold text-[#8E6E41]">Principal & Director of Academics</p>
              <p className="text-[11px] text-slate-500">Ph.D. in Educational Pedagogy, M.Ed., M.Sc.</p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-[#8E6E41]">
              <Quote className="w-8 h-8 opacity-40 rotate-180" />
              <span className="text-xs font-serif font-bold uppercase tracking-[0.2em]">
                From the Principal's Desk
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B132B] leading-snug">
              "Education is not merely the filling of a vessel, but the lighting of a lifelong flame of curiosity and character."
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
              "At Greenwood, we measure success not solely by premier university admissions or board topper aggregates—though our scholars achieve both with distinction—but by the depth of character, intellectual courage, and compassion our graduates carry into society."
            </p>

            <div className="pt-2">
              <Link
                to="/principal-message"
                className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#8E6E41] hover:text-[#0B132B] uppercase tracking-wider border-b border-[#C5A880] pb-1 transition-colors"
              >
                <span>Read Full Principal's Welcome</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION F: Student Life (Visual Storytelling)
         ======================================================== */}
      <section className="bg-[#070C1A] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
              Co-Curricular Breadth
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              A Vibrant Tapestry of Student Life
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light">
              Beyond textbooks: leadership, dramatic arts, Model UN diplomacy, debate societies, and athletic championships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Model United Nations & Public Debate',
                desc: 'Greenwood delegation annually ranks among top teams in national diplomatic forums, honing public speaking and global statecraft.',
                image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=500',
              },
              {
                title: 'Visual & Performing Arts Conservatory',
                desc: 'Dedicated studios for classical Indian music, contemporary western orchestra, classical dance, and fine oil painting.',
                image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=500',
              },
              {
                title: 'Competitive House Athletic Leagues',
                desc: 'Four historic houses—Ashoka, Shivaji, Tagore, and Raman—compete annually across 14 sports disciplines and quiz derbies.',
                image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=500',
              },
            ].map((life, i) => (
              <div
                key={i}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group hover:border-[#C5A880]/50 transition-all flex flex-col justify-between"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={life.image}
                    alt={life.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {life.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{life.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION G: Latest News & Events (Magazine Layout)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Headlines Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE4D6] pb-3">
              <div>
                <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41]">Headlines</span>
                <h3 className="text-2xl font-serif font-bold text-[#0B132B]">Institutional News & Updates</h3>
              </div>
              <Link to="/news" className="text-xs font-serif font-bold text-[#8E6E41] hover:underline uppercase tracking-wider">
                Full Press Archive →
              </Link>
            </div>

            <div className="space-y-4">
              {news.slice(0, 3).map((n: any) => (
                <div
                  key={n.id}
                  className="bg-white rounded-2xl border border-[#EDE4D6] p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 group"
                >
                  {n.coverImage && (
                    <img
                      src={n.coverImage}
                      alt={n.title}
                      className="w-full sm:w-36 h-28 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                  )}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E6E41]">
                      {new Date(n.publishedDate || Date.now()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#0B132B] group-hover:text-[#8E6E41] transition-colors">
                      <Link to="/news">{n.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{n.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events Calendar Right */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EDE4D6] pb-3">
              <div>
                <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41]">Calendar</span>
                <h3 className="text-2xl font-serif font-bold text-[#0B132B]">Upcoming Calendar</h3>
              </div>
              <Link to="/events" className="text-xs font-serif font-bold text-[#8E6E41] hover:underline uppercase tracking-wider">
                View Calendar →
              </Link>
            </div>

            <div className="space-y-3">
              {events.slice(0, 3).map((e: any) => (
                <div
                  key={e.id}
                  className="bg-white rounded-2xl border border-[#EDE4D6] p-4 shadow-sm hover:border-[#C5A880] transition-all flex items-start gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] text-[#0B132B] flex flex-col items-center justify-center flex-shrink-0 border border-[#EDE4D6] font-serif font-bold">
                    <span className="text-[9px] uppercase tracking-wider text-[#8E6E41]">
                      {new Date(e.startDate || Date.now()).toLocaleString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg leading-none">{new Date(e.startDate || Date.now()).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0B132B]">{e.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{e.description}</p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8E6E41]" />
                      <span>{e.location || 'School Campus'}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION H: Parent Testimonials (Refined Typography)
         ======================================================== */}
      <section className="bg-white py-20 border-y border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
              Voices of Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight">
              Reflections from Our School Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  'Greenwood nurtured our son from a hesitant boy into a national robotics gold medalist and state debate captain. The teacher guidance is simply without equal.',
                author: 'Mr. Vikram Malhotra',
                role: 'Father of Aarav (Grade 10)',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
              },
              {
                quote:
                  'The balanced emphasis on competitive sports and CBSE academic rigor allowed my daughter to represent the state in swimming while securing 96.4% in her boards.',
                author: 'Mrs. Meenakshi Sundaram',
                role: 'Mother of Riya (Grade 11)',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
              },
              {
                quote:
                  'The rigorous foundation in Physics and Mathematics that I built at Greenwood was the bedrock that allowed me to crack IIT-JEE and graduate from IIT Delhi.',
                author: 'Ankit Aggarwal',
                role: 'Alumnus (Batch 2021) • Senior Software Engineer',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl border border-[#EDE4D6] p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C5A880] mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-slate-700 leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#EDE4D6]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#C5A880]"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#0B132B]">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION I: Admissions CTA (Full-Width Luxury Banner)
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0B132B] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden border border-[#C5A880]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 text-[#D4AF37] px-3.5 py-1 rounded-full border border-white/15">
                Academic Session 2026–2027
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
                Begin Your Child's Journey with Greenwood
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-light leading-relaxed">
                Admissions are currently open from Nursery through Grade XI. We invite you to schedule an interactive campus tour with our admissions committee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/online-enquiry"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#B08E60] text-[#070C1A] font-serif font-bold text-sm tracking-wide shadow-lg hover:from-[#D4AF37] hover:to-[#C5A880] transition-all text-center"
                >
                  Apply Online for Admission
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-serif font-semibold text-sm border border-white/20 transition-all text-center"
                >
                  Schedule Campus Tour
                </Link>
              </div>
            </div>

            {/* Newsletter Subscription Card */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/15 space-y-3">
              <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                Institutional Gazette & Updates
              </h4>
              <p className="text-xs text-slate-300 font-light">
                Subscribe to receive admissions timelines, event bulletins, and academic newsletters.
              </p>
              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscription confirmed. Thank you!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 text-[#0B132B] text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#C5A880] hover:bg-[#B08E60] text-[#070C1A] text-xs font-serif font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Subscribe to Gazette</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
