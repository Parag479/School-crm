import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Users, Plus, Search, Mail, Phone, Award, Building, CheckCircle2 } from 'lucide-react';

export const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'teachers' | 'staff'>('teachers');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'MALE',
    dateOfBirth: '1985-06-12',
    joiningDate: '2020-04-01',
    designation: 'PGT Senior Teacher',
    qualification: 'M.Sc., B.Ed.',
    experienceYears: 8,
    departmentId: 'dept-01',
    address: 'Sector 62, Noida',
    salary: 68000,
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get(`/teachers?search=${search}`),
      api.get('/staff'),
      api.get('/departments'),
    ])
      .then(([tchRes, stfRes, depRes]: any) => {
        setTeachers(tchRes.data);
        setStaff(stfRes.data);
        setDepartments(depRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teachers', form);
      setAddModalOpen(false);
      fetchData();
      alert('Teacher added successfully and portal credentials generated!');
    } catch (err: any) {
      alert(err.message || 'Failed to add teacher');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Staff & Faculty Directory</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Certified educators, administrative staff, departments, and payroll profiles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-secondary-100 p-1 rounded-xl flex items-center">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'teachers' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
              }`}
            >
              Faculty ({teachers.length})
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'staff' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
              }`}
            >
              Support Staff ({staff.length})
            </button>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Educator</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm">
        <div className="relative max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by educator name, ID, designation..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-secondary-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : activeTab === 'teachers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((tch) => (
            <div key={tch.id} className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm hover:shadow-card transition-all space-y-4">
              <div className="flex items-start gap-3.5">
                <img
                  src={tch.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={tch.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border border-primary-200 flex-shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-secondary-900">{tch.fullName}</h3>
                  <p className="text-xs font-bold text-primary-600">{tch.designation}</p>
                  <p className="text-[11px] font-mono text-secondary-400">{tch.employeeId} • {tch.departmentName || 'Academics'}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-appBorder text-xs space-y-1">
                <p className="text-secondary-600"><strong>Qualification:</strong> {tch.qualification}</p>
                <p className="text-secondary-600"><strong>Experience:</strong> {tch.experienceYears} Years</p>
                <p className="text-secondary-600"><strong>Joined:</strong> {tch.joiningDate?.split('T')[0]}</p>
              </div>

              <div className="text-xs text-secondary-500 space-y-1 border-t border-appBorder pt-3">
                <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-secondary-400" /><span>{tch.email}</span></p>
                <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-secondary-400" /><span>{tch.phone}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Employee ID</th>
                <th className="p-3.5">Full Name</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Designation</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {staff.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-mono font-bold text-primary-600">{st.employeeId}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{st.fullName}</td>
                  <td className="p-3.5 font-semibold">{st.department}</td>
                  <td className="p-3.5">{st.designation}</td>
                  <td className="p-3.5">{st.phone} • {st.email}</td>
                  <td className="p-3.5"><StatusBadge status={st.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Teacher Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Onboard New Educator"
          subtitle="Provisions teacher account and classroom access"
          maxWidth="lg"
        >
          <form onSubmit={handleAddTeacher} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="e.g. Shalini"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  placeholder="e.g. Nair"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="shalini.nair@greenwood.edu.in"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9810112233"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Department</label>
                <select
                  value={form.departmentId}
                  onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Highest Qualification *</label>
                <input
                  type="text"
                  required
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  value={form.experienceYears}
                  onChange={(e) => setForm({ ...form, experienceYears: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Add Faculty Member & Generate Access
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

