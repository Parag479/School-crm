import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ClipboardList,
  Calendar,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export const Admissions: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the age criteria for Pre-KG and Grade 1 admissions?',
      a: 'As per NEP directives, the child should be 3+ years for Pre-KG and 6+ years for Grade 1 as of March 31 of the academic year of admission.',
    },
    {
      q: 'What is the admission procedure for transfer cases in higher classes?',
      a: 'For Classes 2 to 9 and 11, admission is granted subject to seat availability, previous academic records, and an interactive baseline competency assessment in English and Mathematics.',
    },
    {
      q: 'Does the school provide door-to-door transportation?',
      a: 'Yes, Greenwood operates a modern fleet of air-conditioned GPS-tracked buses with CCTV cameras, lady attendants, and first-aid kits covering all major sectors of Noida, Greater Noida, and Indirapuram.',
    },
    {
      q: 'What documents are mandatory at the time of admission?',
      a: 'Birth Certificate (issued by Municipal Corporation), Aadhaar Card copies of student and parents, 4 passport-size photographs, previous school report card, and original Transfer Certificate (countersigned by CBSE/State education department for outstation transfers).',
    },
    {
      q: 'What are the fee payment modes and schedule?',
      a: 'School fees are collected quarterly (April, July, October, January). Payments can be made online via credit/debit card, UPI, net banking through the Parent Portal (Razorpay), or via cheque/demand draft at the school accounts desk.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#FAF8F5] text-[#0F172A] selection:bg-[#C5A880] selection:text-[#0B132B]">
      {/* Editorial Header Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 backdrop-blur-md">
            Academic Session 2026–2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Admissions & Enrollment
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Discover a transformative educational journey for your child. A merit-oriented, transparent, and student-centered admissions process.
          </p>
        </div>
      </section>

      {/* 4-Step Process Continuum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41] block">
            Step-by-Step Procedure
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Four Steps to Joining Greenwood
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Online Enquiry & Registration',
              desc: 'Submit your online registration form with student details or connect with our AI Admission Assistant.',
            },
            {
              step: '02',
              title: 'Interactive Child Assessment',
              desc: 'A friendly interaction for primary students or an informal baseline assessment for middle/senior grades.',
            },
            {
              step: '03',
              title: 'Counseling & Documentation',
              desc: 'Meet with our academic counselors and verify essential municipal birth and transfer certificates.',
            },
            {
              step: '04',
              title: 'Provisional Offer & Enrollment',
              desc: 'Formal offer of admission issued upon seat availability, followed by smooth online fee settlement.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-7 rounded-3xl border border-[#EDE4D6] shadow-sm space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#C5A880] block">{item.step}</span>
              <h3 className="font-serif text-base font-bold text-[#0B132B]">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/online-enquiry"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#B08E60] text-[#070C1A] font-serif font-bold text-xs tracking-wider uppercase hover:from-[#D4AF37] hover:to-[#C5A880] transition-all shadow"
          >
            <span>Proceed to Online Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 border-y border-[#EDE4D6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.2em] text-[#8E6E41]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B]">Everything Parents Want to Know</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#EDE4D6] overflow-hidden bg-[#FAF8F5] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-serif font-bold text-sm text-[#0B132B] hover:text-[#8E6E41]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A880] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-[#EDE4D6] font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
