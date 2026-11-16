import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Mail,
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  Star,
} from 'lucide-react';
import { Card3DTilt } from '../../components/common/Card3DTilt';

interface TeacherCard {
  id: string;
  name: string;
  role: string;
  department: string;
  qualification: string;
  experience: string;
  image: string;
  achievements: string;
}

const FACULTY_MEMBERS: TeacherCard[] = [
  {
    id: 'f-1',
    name: 'Dr. Rajesh Verma',
    role: 'Head of Department & PGT Mathematics',
    department: 'Mathematics',
    qualification: 'Ph.D., M.Sc. (Gold Medalist, DU)',
    experience: '18 Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    achievements: 'Author of CBSE Class 12 Problem Sets; 45+ students scored 100/100 in Mathematics Board.',
  },
  {
    id: 'f-2',
    name: 'Mrs. Anita Deshmukh',
    role: 'Head of Science & PGT Physics',
    department: 'Science',
    qualification: 'M.Sc. Physics (IIT Roorkee), B.Ed.',
    experience: '15 Years',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    achievements: 'Mentor for National Science Exhibition; 12 students qualified for JEE Advanced.',
  },
  {
    id: 'f-3',
    name: 'Mr. Arvind Saxena',
    role: 'Head of Humanities & PGT English',
    department: 'Languages',
    qualification: 'M.A. English Literature (JNU), CELTA',
    experience: '14 Years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    achievements: 'Convenor of Greenwood Model UN; National Debating Coach of the Year 2024.',
  },
  {
    id: 'f-4',
    name: 'Mrs. Meenakshi Soni',
    role: 'PGT Chemistry & Lab Coordinator',
    department: 'Science',
    qualification: 'M.Sc. Chemistry, B.Ed.',
    experience: '12 Years',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    achievements: 'Published researcher in Green Chemistry; In-charge of Composite Chemistry Lab.',
  },
  {
    id: 'f-5',
    name: 'Mr. Vikram Sen',
    role: 'Head of Computer Science & Robotics',
    department: 'Technology',
    qualification: 'M.Tech Computer Science, B.E.',
    experience: '11 Years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    achievements: 'Lead Mentor for Atal Tinkering Lab; Guided school team to International Robotics Championship.',
  },
  {
    id: 'f-6',
    name: 'Coach Baljit Singh',
    role: 'Director of Physical Education & Sports',
    department: 'Sports',
    qualification: 'M.P.Ed. (NIS Patiala certified)',
    experience: '16 Years',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    achievements: 'Former National Athlete; Coached 3 CBSE National Gold Medalists in Athletics.',
  },
  {
    id: 'f-7',
    name: 'Mrs. Rohini Nair',
    role: 'TGT Social Sciences & Environmental Studies',
    department: 'Humanities',
    qualification: 'M.A. History, B.Ed.',
    experience: '9 Years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    achievements: 'Pioneer of Greenwood Eco-Club and Heritage Walk educational series.',
  },
  {
    id: 'f-8',
    name: 'Mrs. Shalini Roy',
    role: 'Primary Wing Coordinator (Grades 1-5)',
    department: 'Primary',
    qualification: 'M.A. Child Psychology, B.Ed.',
    experience: '13 Years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    achievements: 'Expert in Montessori & Phonics methodologies with 100% reading fluency benchmarks.',
  },
];

export const FacultyStaff: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = ['ALL', 'Mathematics', 'Science', 'Languages', 'Technology', 'Sports', 'Primary'];

  const filteredFaculty = FACULTY_MEMBERS.filter((teacher) => {
    const matchesDept = selectedDept === 'ALL' || teacher.department === selectedDept;
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#0F172A] selection:bg-[#C5A880] selection:text-[#0B132B]">
      {/* Editorial Banner */}
      <section className="bg-[#070C1A] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#C5A880]/30 backdrop-blur-md">
            <Users className="w-3.5 h-3.5" /> Academic Mentors
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Distinguished Faculty & Mentors
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-light">
            Scholars, passionate researchers, and dedicated mentors committed to unlocking the highest intellectual potential in every scholar.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-[#EDE4D6] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Department Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-[#0B132B] text-[#D4AF37] shadow'
                    : 'bg-[#FAF8F5] hover:bg-[#F2ECE2] text-slate-700 border border-[#EDE4D6]'
                }`}
              >
                {dept === 'ALL' ? 'All Departments' : dept}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search faculty by name, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#EDE4D6] text-xs focus:ring-2 focus:ring-[#C5A880] focus:outline-none bg-[#FAF8F5]"
            />
          </div>
        </div>
      </section>

      {/* Faculty Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFaculty.map((teacher) => (
            <Card3DTilt key={teacher.id} maxTilt={6}>
              <div className="bg-white rounded-2xl shadow-sm border border-[#EDE4D6] overflow-hidden hover:shadow-xl transition-all flex flex-col group h-full">
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B132B]/85 backdrop-blur-md text-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {teacher.department}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0B132B] leading-tight group-hover:text-[#8E6E41] transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#8E6E41] mt-0.5">{teacher.role}</p>

                    <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                      <p className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                        <span className="truncate">{teacher.qualification}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                        <span>{teacher.experience} Experience</span>
                      </p>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EDE4D6] leading-relaxed italic">
                      "{teacher.achievements}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/online-enquiry"
                      className="w-full py-2 text-center text-xs font-serif font-bold text-[#8E6E41] hover:text-[#0B132B] bg-[#FAF8F5] hover:bg-[#F2ECE2] rounded-xl block transition-colors border border-[#EDE4D6]"
                    >
                      Connect with Faculty →
                    </Link>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* Institutional Faculty Standards */}
      <section className="bg-white border-t border-[#EDE4D6] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B]">85+</p>
            <p className="text-xs font-serif font-bold text-[#8E6E41] uppercase tracking-wider mt-1">Postgraduate Faculty</p>
            <p className="text-[11px] text-slate-500 mt-0.5">100% B.Ed. & Masters qualified</p>
          </div>
          <div className="p-4">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A880]">1:16</p>
            <p className="text-xs font-serif font-bold text-[#8E6E41] uppercase tracking-wider mt-1">Faculty-Student Ratio</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Individual mentoring focus</p>
          </div>
          <div className="p-4">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#0B132B]">12+ Yrs</p>
            <p className="text-xs font-serif font-bold text-[#8E6E41] uppercase tracking-wider mt-1">Average Experience</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Senior CBSE evaluators</p>
          </div>
          <div className="p-4">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A880]">100 hrs</p>
            <p className="text-xs font-serif font-bold text-[#8E6E41] uppercase tracking-wider mt-1">Annual Faculty Training</p>
            <p className="text-[11px] text-slate-500 mt-0.5">NEP 2020 workshops</p>
          </div>
        </div>
      </section>
    </div>
  );
};
