import React from 'react';
import { Laptop, BookOpen, Trophy, Bus, HeartPulse, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card3DTilt } from '../../components/common/Card3DTilt';

export const Facilities: React.FC = () => {
  const facilities = [
    {
      title: 'Smart Interactive Classrooms',
      icon: Laptop,
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600',
      desc: 'All 84 classrooms are fitted with 75-inch 4K touchscreen interactive panels, digital stylus pens, high-fidelity sound, and ergonomic modular seating to facilitate collaborative inquiry.',
    },
    {
      title: 'STEAM & Artificial Intelligence Lab',
      icon: Cpu,
      img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600',
      desc: 'Equipped with 3D printers, Arduino and Raspberry Pi hardware kits, drone testing cages, and high-performance workstations for Python, machine learning, and robotics engineering.',
    },
    {
      title: 'Olympic-Standard Sports Complex',
      icon: Trophy,
      img: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=600',
      desc: 'Features a FIFA-certified floodlit synthetic turf football ground, 400m athletic track, 25m heated semi-Olympic swimming pool, wooden squash courts, and 4 international basketball courts.',
    },
    {
      title: 'Central Knowledge Library',
      icon: BookOpen,
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600',
      desc: 'Home to over 20,000 fiction and non-fiction titles, digital Kindle kiosks, JSTOR research database subscriptions, and peaceful sound-dampened reading alcoves.',
    },
    {
      title: 'Composite Science Laboratories',
      icon: ShieldCheck,
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600',
      desc: 'Independent, fully equipped Physics, Chemistry, and Biology research laboratories adhering to strict safety protocols, equipped with fume hoods and digital microscopes.',
    },
    {
      title: '24/7 Medical Infirmary',
      icon: HeartPulse,
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      desc: 'Staffed by full-time resident physicians and trained pediatric nurses, featuring a 6-bed emergency observation bay and dedicated on-campus ambulance services.',
    },
    {
      title: 'Air-Conditioned GPS Transport Fleet',
      icon: Bus,
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600',
      desc: '25+ luxury air-conditioned school buses traversing major NCR routes, equipped with live parent mobile GPS tracking, CCTV interior cameras, speed governors, and female attendants.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#FAF8F5] text-[#0F172A] selection:bg-[#C5A880] selection:text-[#0B132B]">
      {/* Editorial Header Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 backdrop-blur-md">
            World-Class 12-Acre Campus
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Campus & Smart Infrastructure
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Thoughtfully designed learning environments that inspire scientific curiosity, artistic expression, and athletic distinction.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f, idx) => {
            const Icon = f.icon;
            return (
              <Card3DTilt key={idx} maxTilt={6}>
                <div className="bg-white rounded-3xl overflow-hidden border border-[#EDE4D6] shadow-sm hover:shadow-xl transition-all h-full flex flex-col justify-between group">
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0B132B]/85 text-[#D4AF37] flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#0B132B] group-hover:text-[#8E6E41] transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{f.desc}</p>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* Campus Tour CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B132B] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#C5A880]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold">Schedule an In-Person Campus Walkthrough</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-light">
              Experience our facilities in person. Guided tours are conducted daily Monday through Saturday by our administrative admissions officers.
            </p>
          </div>
          <Link
            to="/online-enquiry"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A880] to-[#B08E60] text-[#070C1A] font-serif font-bold text-xs tracking-wider uppercase hover:from-[#D4AF37] hover:to-[#C5A880] transition-all shadow whitespace-nowrap"
          >
            Book Guided Campus Tour
          </Link>
        </div>
      </section>
    </div>
  );
};
