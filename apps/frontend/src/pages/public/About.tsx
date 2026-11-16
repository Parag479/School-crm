import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Target, Compass, Users2, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 bg-[#FAF8F5] text-[#0F172A] selection:bg-[#C5A880] selection:text-[#0B132B]">
      {/* Editorial Header Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 backdrop-blur-md">
            The Greenwood Charter
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Our Heritage & Philosophy
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Established in 1998 with an unwavering commitment to redefine K-12 education through moral values, experiential pedagogy, and holistic student mentorship.
          </p>
        </div>
      </section>

      {/* History and Genesis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
              Genesis & Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight leading-snug">
              28 Years of Inspiring Young Minds to Lead with Honor
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Greenwood International Academy was established under the visionary patronage of the Greenwood Educational Trust in 1998. What began as a boutique learning center has blossomed into one of Delhi-NCR's most decorated institutions, educating over 2,500 students across an integrated 12-acre smart campus.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Affiliated with the Central Board of Secondary Education (CBSE, New Delhi), our pedagogy is rooted in the rich ethos of Indian cultural heritage while harmoniously embracing progressive methodologies: STEAM inquiry, robotics, design thinking, and collaborative global forums.
            </p>

            <div className="border-l-4 border-[#C5A880] pl-4 py-2 italic font-serif text-slate-800 text-sm bg-white rounded-r-xl border border-l-0 border-[#EDE4D6] shadow-sm">
              "We believe school is not a preparation for life; school is life itself in its most curious and luminous form."
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#EDE4D6] bg-white">
              <img
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"
                alt="School Foundation"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values Cards */}
      <section className="bg-white py-16 border-y border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
              Foundational Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
              Core Principles Guiding Every Classroom
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#EDE4D6] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#8E6E41] flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B132B]">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To be a premier global center of educational innovation where intellectual rigor, ethical values, and joyful curiosity unite to inspire compassionate leaders.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#EDE4D6] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#8E6E41] flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B132B]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To cultivate self-directed, resilient thinkers through experiential curricula, state-of-the-art laboratory infrastructure, and empathetic educator mentorship.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#EDE4D6] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#8E6E41] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0B132B]">Core Values</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Satya (Truth & Integrity), Karuna (Compassion), Dhruti (Perseverance), and Vasudhaiva Kutumbakam (The World is One Family) inform every school endeavor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Leadership Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B132B] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C5A880]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">Experience Greenwood Firsthand</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-light">
              We warmly welcome prospective parents and guardians to walk our campus grounds, tour our scientific laboratories, and engage with our leadership.
            </p>
          </div>
          <Link
            to="/online-enquiry"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#B08E60] text-[#070C1A] font-serif font-bold text-xs tracking-wider uppercase hover:from-[#D4AF37] hover:to-[#C5A880] transition-all shadow whitespace-nowrap"
          >
            Request Campus Tour & Meeting
          </Link>
        </div>
      </section>
    </div>
  );
};
