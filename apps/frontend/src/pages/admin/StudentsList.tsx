import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  GraduationCap,
  Eye,
  Filter,
  UserCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();

  // Add student form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '2010-08-15',
    gender: 'MALE',
    bloodGroup: 'B+',
    email: '',
    phone: '',
    address: 'Sector 62, Noida',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201309',
    classId: '',
    sectionId: '',
    academicYearId: 'ay-2026-2027',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get(`/students?search=${search}&classId=${classFilter}`),
      api.get('/classes'),
    ])
      .then(([stuRes, clsRes]: any) => {
        setStudents(stuRes.data);
        setClasses(clsRes.data);
        if (clsRes.data.length > 0 && !formData.classId) {
          setFormData((prev) => ({
            ...prev,
            classId: clsRes.data[12]?.id || clsRes.data[0]?.id,
            sectionId: clsRes.data[12]?.sections?.[0]?.id || clsRes.data[0]?.sections?.[0]?.id || '',
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [search, classFilter]);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/students', formData);
      setAddModalOpen(false);
      fetchData();
      alert('Student admitted successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to add student');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Student Directory</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Browse and manage all registered student profiles, academics, and document verification
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Admit New Student</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll no, admission number..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-secondary-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-semibold text-secondary-600 whitespace-nowrap">Filter Class:</label>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-appBorder text-xs bg-white text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="ALL">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Admission No</th>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Class & Section</th>
                <th className="p-3.5">Roll No</th>
                <th className="p-3.5">Attendance %</th>
                <th className="p-3.5">Fee Status</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {students.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-primary-600">{stu.admissionNumber}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          stu.avatar ||
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150'
                        }
                        alt={stu.fullName}
                        className="w-8 h-8 rounded-full object-cover border border-primary-200"
                      />
                      <div>
                        <p className="font-bold text-secondary-900">{stu.fullName}</p>
                        <p className="text-[10px] text-secondary-400">{stu.gender} • DOB {stu.dateOfBirth?.split('T')[0]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-secondary-800">
                    {stu.className} - {stu.sectionName}
                  </td>
                  <td className="p-3.5 font-mono">{stu.rollNumber || '—'}</td>
                  <td className="p-3.5">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        (stu.attendancePercentage || 94) >= 90
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {stu.attendancePercentage || 94}%
                    </span>
                  </td>
                  <td className="p-3.5">
                    {(stu.totalPendingFees || 0) > 0 ? (
                      <span className="font-bold text-rose-600">
                        Pending ₹{stu.totalPendingFees.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-600">All Cleared</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={stu.status} />
                  </td>
                  <td className="p-3.5">
                    <Link
                      to={`/admin/students/${stu.id}`}
                      className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 font-bold hover:bg-primary-600 hover:text-white transition-all inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Student Modal */}
      {addModalOpen && (
        <Modal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          title="Direct Student Admission"
          subtitle="Generate student record and parent file"
          maxWidth="lg"
        >
          <form onSubmit={handleCreateStudent} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Vivaan"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Gupta"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Assign Class *</label>
                <select
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Assign Section *</label>
                <select
                  value={formData.sectionId}
                  onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
                >
                  <option value="sec-class-13-a">Section A</option>
                  <option value="sec-class-13-b">Section B</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Father's Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="e.g. Manoj Gupta"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Father's Phone (10 digits) *</label>
                <input
                  type="tel"
                  required
                  value={formData.fatherPhone}
                  onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                  placeholder="9811223344"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Mother's Full Name *</label>
              <input
                type="text"
                required
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                placeholder="e.g. Seema Gupta"
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
              >
                Enroll Student & Generate Admission ID
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

