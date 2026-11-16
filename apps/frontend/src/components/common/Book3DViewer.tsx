import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Sparkles, Award, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookPage {
  title: string;
  subtitle: string;
  badge?: string;
  content: string[];
  image?: string;
  stats?: { label: string; value: string }[];
}

const PAGES: { left: BookPage; right: BookPage }[] = [
  // Spread 1: Introduction & Heritage
  {
    left: {
      title: 'Heritage of Excellence',
      subtitle: 'Nurturing Global Visionaries Since 1998',
      badge: 'Academic Legacy',
      content: [
        'Greenwood International Academy stands at the pinnacle of Indian and international schooling, seamlessly combining timeless values with frontier scientific research.',
        'Spanning a lush 22-acre smart campus, our pedagogical philosophy empowers students from Pre-K to Grade XII with critical reasoning, intellectual humility, and leadership agility.',
      ],
      stats: [
        { label: 'Academic Heritage', value: '28+ Years' },
        { label: 'Campus Area', value: '22 Acres' },
        { label: 'Student-Teacher Ratio', value: '1:12' },
      ],
    },
    right: {
      title: 'World-Class Curriculum',
      subtitle: 'Dual CBSE & Cambridge Global Pathways',
      badge: 'Dual Accreditation',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=900',
      content: [
        'Empowered by Cambridge Assessment International Education (CAIE) and CBSE Senior Secondary certification.',
        'Our experiential syllabus integrates Artificial Intelligence literacy, Oxford Debating, Financial Numeracy, and Design Thinking right from Grade 6.',
      ],
      stats: [
        { label: 'Board Top Scorers', value: '98.6%' },
        { label: 'Global Uni Acceptance', value: '100%' },
      ],
    },
  },
  // Spread 2: STEM, Robotics & World-Class Facilities
  {
    left: {
      title: 'Frontier AI & Robotics',
      subtitle: 'Preparing Leaders for Industry 5.0',
      badge: 'STEM Innovation',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=900',
      content: [
        'Our state-of-the-art Atal Tinkering Lab & Robotics Research Studio feature humanoid robotics kits, 3D printing, and IoT sensor stations.',
        'Every student completes hands-on Capstone projects addressing climate resilience, smart agricultural tech, and algorithmic problem solving.',
      ],
      stats: [
        { label: 'Advanced Labs', value: '8 Labs' },
        { label: 'Robotics Patents', value: '14 Filed' },
      ],
    },
    right: {
      title: 'Olympic Sports & Wellness',
      subtitle: 'Where Physical Agility Meets Mental Fortitude',
      badge: 'Athletics & Fitness',
      content: [
        'World-standard infrastructure including an Olympic-sized 50m temperature-controlled swimming pool, FIFA-grade turf, and indoor badminton arena.',
        'Professional NIS-certified coaches guide students in football, basketball, gymnastics, lawn tennis, fencing, and horse riding.',
      ],
      stats: [
        { label: 'National Medals', value: '420+' },
        { label: 'Sports Academies', value: '12 Sports' },
        { label: 'Certified Coaches', value: '25+' },
      ],
    },
  },
  // Spread 3: Admissions & University Destinations
  {
    left: {
      title: 'Ivy & Global Placements',
      subtitle: 'Alumni Across Top Global Universities',
      badge: 'Global Pathways',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900',
      content: [
        'Dedicated Career & College Counselling Bureau providing personalized portfolio mentoring, SAT/ACT workshops, and scholarship prep.',
        'Our graduates regularly secure admissions into Oxford, Cambridge, MIT, Stanford, IITs, AIIMS, and National Law Universities.',
      ],
      stats: [
        { label: 'Scholarships Secured', value: '₹14.8 Cr' },
        { label: 'Ivy League Admits', value: '48+' },
      ],
    },
    right: {
      title: 'Admissions 2026–2027',
      subtitle: 'Begin Your Child’s Journey to Greatness',
      badge: 'Enrollment Open',
      content: [
        'Admissions are now open for Pre-Nursery through Grade XI. Due to limited classroom cohorts of 24 students, early application is strongly encouraged.',
        'Scholarships up to 100% tuition merit waivers available for state/national rank holders in academics, science Olympiads, and sports.',
      ],
      stats: [
        { label: 'Cohort Size', value: '24 Max' },
        { label: 'Merit Scholarships', value: 'Up to 100%' },
      ],
    },
  },
];

export const Book3DViewer: React.FC = () => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const totalSpreads = PAGES.length;

  const handleNext = () => {
    if (currentSpread < totalSpreads - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread((prev) => prev + 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentSpread((prev) => prev - 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const spread = PAGES[currentSpread];

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#BF9827] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Interactive 3D Experience</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#050B18] tracking-tight">
          Explore Our <span className="italic text-[#BF9827]">Academic Prospectus</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base font-light">
          Flip through our official school handbook in real-time 3D. Click the navigation arrows or page corners to turn pages.
        </p>
      </div>

      {/* 3D BOOK DESKTOP & MOBILE WRAPPER */}
      <div className="relative perspective-[2000px] select-none">
        {/* Soft Book Drop Shadow & Ambient Floor Reflection */}
        <div className="absolute -inset-4 bg-gradient-to-b from-[#0A1435]/10 via-[#0A1435]/5 to-transparent blur-2xl rounded-3xl -z-10" />

        {/* The Open Book Hardcover Base */}
        <div
          className={`relative bg-[#0A1435] p-3 sm:p-5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(5,11,24,0.45),0_0_0_1px_rgba(212,175,55,0.35)] transition-transform duration-500 ${
            isFlipping ? (flipDirection === 'next' ? 'rotate-y-1' : '-rotate-y-1') : 'rotate-y-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Gold Embossed Spine Header */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-[#D4AF37]/30 text-[#D4AF37] text-xs font-serif tracking-widest">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>GREENWOOD INTERNATIONAL ACADEMY • OFFICIAL PROSPECTUS 2026–27</span>
            </div>
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#D4AF37]/80">
              SPREAD {currentSpread + 1} OF {totalSpreads}
            </span>
          </div>

          {/* OPEN TWO-PAGE SPREAD CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-3 relative bg-[#FAF7EE] rounded-xl overflow-hidden shadow-inner border border-[#E5D7B7]">
            {/* Center Book Spine Crease & Shadow */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/40 to-black/25 z-20 pointer-events-none shadow-sm" />

            {/* LEFT PAGE */}
            <div
              className={`p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-r from-[#F4EFE2] to-[#FAF7EE] relative border-b md:border-b-0 md:border-r border-[#E5D7B7] transition-all duration-500 ${
                isFlipping && flipDirection === 'prev' ? 'opacity-70 scale-98' : 'opacity-100 scale-100'
              }`}
            >
              {/* Subtle Paper Grain Overlay */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0A1435] text-[#D4AF37]">
                    {spread.left.badge}
                  </span>
                  <span className="text-xs font-serif text-slate-400">Page {currentSpread * 2 + 1}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#050B18]">
                    {spread.left.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#BF9827]">{spread.left.subtitle}</p>
                </div>

                {spread.left.image && (
                  <div className="rounded-lg overflow-hidden h-36 sm:h-44 shadow-md border border-[#E5D7B7]">
                    <img
                      src={spread.left.image}
                      alt={spread.left.title}
                      className="w-full h-full object-cover filter contrast-[1.05]"
                    />
                  </div>
                )}

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                  {spread.left.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              {spread.left.stats && (
                <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-[#E5D7B7]/70 text-center">
                  {spread.left.stats.map((stat, idx) => (
                    <div key={idx} className="bg-white/70 p-2 rounded border border-[#E5D7B7]/50 shadow-sm">
                      <div className="text-base sm:text-lg font-serif font-bold text-[#0A1435]">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT PAGE */}
            <div
              className={`p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-l from-[#F4EFE2] to-[#FAF7EE] relative transition-all duration-500 ${
                isFlipping && flipDirection === 'next' ? 'opacity-70 scale-98' : 'opacity-100 scale-100'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#BF9827]/15 text-[#997523] border border-[#BF9827]/30">
                    {spread.right.badge}
                  </span>
                  <span className="text-xs font-serif text-slate-400">Page {currentSpread * 2 + 2}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#050B18]">
                    {spread.right.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#BF9827]">{spread.right.subtitle}</p>
                </div>

                {spread.right.image && (
                  <div className="rounded-lg overflow-hidden h-36 sm:h-44 shadow-md border border-[#E5D7B7]">
                    <img
                      src={spread.right.image}
                      alt={spread.right.title}
                      className="w-full h-full object-cover filter contrast-[1.05]"
                    />
                  </div>
                )}

                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                  {spread.right.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Action / Stats Footer */}
              <div className="pt-6 mt-6 border-t border-[#E5D7B7]/70">
                {spread.right.stats && (
                  <div className="grid grid-cols-2 gap-3 text-center mb-4">
                    {spread.right.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white/70 p-2.5 rounded border border-[#E5D7B7]/50 shadow-sm">
                        <div className="text-base sm:text-lg font-serif font-bold text-[#0A1435]">{stat.value}</div>
                        <div className="text-[10px] text-slate-500 font-medium uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {currentSpread === totalSpreads - 1 ? (
                  <Link
                    to="/admissions/enquiry"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#0A1435] text-[#D4AF37] hover:bg-[#111D3E] font-medium text-xs tracking-wider uppercase transition shadow-md group"
                  >
                    <span>Proceed to Online Admission</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <div className="text-center text-[11px] text-slate-400 italic">
                    Turn to next page to view campus life & admissions
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BOOK NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={handlePrev}
              disabled={currentSpread === 0 || isFlipping}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition ${
                currentSpread === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400 bg-white/5'
                  : 'bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/30 shadow'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            {/* Spread Indicator Dots */}
            <div className="flex items-center gap-2">
              {PAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => !isFlipping && setCurrentSpread(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSpread ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to spread ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentSpread === totalSpreads - 1 || isFlipping}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition ${
                currentSpread === totalSpreads - 1
                  ? 'opacity-40 cursor-not-allowed text-slate-400 bg-white/5'
                  : 'bg-[#D4AF37] hover:bg-[#BF9827] text-[#050B18] font-bold shadow-lg shadow-[#D4AF37]/20'
              }`}
            >
              <span>Next Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

