import React from 'react';
import { BookOpen, CheckCircle, GraduationCap, Laptop, Sparkles, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Academics: React.FC = () => {
  return (
    <div className="space-y-20 pb-20 bg-[#FAF8F5] text-[#0F172A] selection:bg-[#2563EB] selection:text-white">
      {/* Editorial Header Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#2563EB]/30 backdrop-blur-md">
            CBSE Curriculum & NEP 2020 Aligned
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Academic Rigor & Inquiry
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            A comprehensive, rigorous, and inquiry-led curriculum designed to foster deep conceptual mastery, mathematical logic, and scientific fearlessness.
          </p>
        </div>
      </section>

      {/* Teaching Methodology & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#1E40AF] block">
              Pedagogical Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B] tracking-tight leading-snug">
              Experiential, Competency-Driven & Deeply Inquisitive
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              At Greenwood Academy, rote memorization is entirely replaced by scientific inquiry, real-world application, and structured analytical discourse. Our continuum seamlessly implements the progressive National Education Policy 2020 framework and CBSE learning benchmarks.
            </p>
            <div className="space-y-2.5 pt-2">
              {[
                'Interdisciplinary STEAM continuum integrating coding, robotics, and creative arts.',
                'Flipped classrooms and hands-on digital simulations in Science and Mathematics.',
                'Continuous diagnostic evaluation with personalized remedial and enrichment clinics.',
                '1:16 faculty-student ratio ensuring individualized academic guidance and care.',
              ].map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-[#1E40AF] flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#EDE4D6] bg-white">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
                alt="Classroom Instruction"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Academic Wings Grid */}
      <section className="bg-white py-16 border-y border-[#EDE4D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#1E40AF] block">
              Developmental Stages
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
              The Four Academic Wings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Foundational Stage (Pre-KG to UKG)',
                subtitle: 'Ages 3 – 6 Years',
                desc: 'Sensory-rich Montessori environments focused on fine-motor control, phonetic language fluency, early mathematical reasoning, and joyful social play.',
                subjects: 'Phonics, Number Fun, Sensory Science, Visual Arts, Music & Movement',
              },
              {
                title: 'Preparatory Wing (Grades 1 – 5)',
                subtitle: 'Ages 6 – 11 Years',
                desc: 'Transition into experiential learning, reading comprehension, laboratory exploration, introduction to computing logic, and multilingual exposure.',
                subjects: 'English, Hindi, Mathematics, Environmental Studies, Coding, Physical Education',
              },
              {
                title: 'Middle School Wing (Grades 6 – 8)',
                subtitle: 'Ages 11 – 14 Years',
                desc: 'Deep subject specialization, integrated science laboratories, third language study (French or Sanskrit), Model UN, and design thinking projects.',
                subjects: 'Physics, Chemistry, Biology, Mathematics, Social Sciences, French/Sanskrit, AI',
              },
              {
                title: 'Secondary & Senior Secondary (Grades 9 – 12)',
                subtitle: 'Ages 14 – 18 Years',
                desc: 'Rigorous preparation for CBSE Board examinations along with comprehensive coaching modules for JEE, NEET, CUET, and CLAT with specialized streams.',
                subjects: 'Science Stream (PCM/PCB), Commerce Stream with Informatics, Humanities',
              },
            ].map((wing, i) => (
              <div key={i} className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#EDE4D6] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E40AF] bg-white px-3 py-1 rounded-full border border-[#EDE4D6]">
                  {wing.subtitle}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0B132B]">{wing.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{wing.desc}</p>
                <div className="pt-3 border-t border-[#EDE4D6] text-xs">
                  <span className="font-bold text-[#0B132B]">Curricular Core: </span>
                  <span className="text-slate-600 italic">{wing.subjects}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B132B] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#2563EB]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">Enroll in the 2026–2027 Academic Session</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-light">
              Limited seats are available across all grade wings. Contact our admissions counselor for syllabus guides and seat availability.
            </p>
          </div>
          <Link
            to="/online-enquiry"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-[#070C1A] font-serif font-bold text-xs tracking-wider uppercase hover:from-[#D4AF37] hover:to-[#2563EB] transition-all shadow whitespace-nowrap"
          >
            Apply Online for Admission
          </Link>
        </div>
      </section>
    </div>
  );
};
