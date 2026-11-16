import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { School, BookOpen, Plus, Users, Award, CheckCircle2 } from 'lucide-react';

export const AcademicClasses: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createClassModal, setCreateClassModal] = useState(false);
  const [createSubjectModal, setCreateSubjectModal] = useState(false);

  // Form states
  const [newClassName, setNewClassName] = useState('');
  const [subjectForm, setSubjectForm] = useState({
    classId: '',
    name: '',
    code: '',
    type: 'THEORY',
    teacherId: '',
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get('/classes'), api.get('/teachers')])
      .then(([clsRes, tchRes]: any) => {
        setClasses(clsRes.data);
        setTeachers(tchRes.data);
        if (clsRes.data.length > 0 && !subjectForm.classId) {
          setSubjectForm((prev) => ({
            ...prev,
            classId: clsRes.data[0].id,
            teacherId: tchRes.data[0]?.id || '',
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/classes', { name: newClassName });
      setCreateClassModal(false);
      setNewClassName('');
      fetchData();
      alert('Class created successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to create class');
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/subjects', subjectForm);
      setCreateSubjectModal(false);
      fetchData();
      alert('Subject assigned successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to add subject');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Classes & Academic Wings</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Manage academic grade levels, sections (A/B/C), room numbers, and subject curricula
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCreateSubjectModal(true)}
            className="px-3.5 py-2 border border-appBorder text-secondary-700 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-primary-600" />
            <span>Add Subject</span>
          </button>
          <button
            onClick={() => setCreateClassModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Class</span>
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm hover:shadow-card transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-secondary-900">{cls.name}</h3>
                    <p className="text-[11px] text-secondary-400 font-mono">Order Rank #{cls.numericOrder}</p>
                  </div>
                </div>

                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-secondary-700">
                  {cls.studentCount || 40} Students
                </span>
              </div>

              {/* Sections */}
              <div className="space-y-1.5 border-t border-appBorder pt-3">
                <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-wider">Sections Configured</p>
                <div className="flex flex-wrap gap-2">
                  {(cls.sections || []).map((sec: any) => (
                    <span key={sec.id} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-secondary-800">
                      Section {sec.name} ({sec.roomNumber || 'Room 101'})
                    </span>
                  ))}
                </div>
              </div>

              {/* Subjects in Class */}
              <div className="space-y-1.5 border-t border-appBorder pt-3">
                <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-wider">Curriculum Subjects</p>
                <div className="space-y-1">
                  {(cls.subjects || []).length > 0 ? (
                    (cls.subjects || []).map((sub: any) => (
                      <div key={sub.id} className="flex items-center justify-between text-xs py-0.5 text-secondary-700">
                        <span className="font-semibold">{sub.name}</span>
                        <span className="text-[10px] text-secondary-400 font-mono">{sub.code}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-secondary-400 italic">Standard CBSE syllabus applied</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: Create Class */}
      {createClassModal && (
        <Modal
          isOpen={createClassModal}
          onClose={() => setCreateClassModal(false)}
          title="Create New Academic Class"
          subtitle="Adds grade level with default Section A"
          maxWidth="sm"
        >
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Class / Grade Name *</label>
              <input
                type="text"
                required
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="e.g. Class 11 - Humanities"
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Create Class & Section A
            </button>
          </form>
        </Modal>
      )}

      {/* MODAL 2: Add Subject */}
      {createSubjectModal && (
        <Modal
          isOpen={createSubjectModal}
          onClose={() => setCreateSubjectModal(false)}
          title="Assign New Subject to Class"
          subtitle="Configure course code and assign educator"
          maxWidth="md"
        >
          <form onSubmit={handleCreateSubject} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Select Target Class *</label>
              <select
                value={subjectForm.classId}
                onChange={(e) => setSubjectForm({ ...subjectForm, classId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Subject Title *</label>
                <input
                  type="text"
                  required
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">CBSE Subject Code *</label>
                <input
                  type="text"
                  required
                  value={subjectForm.code}
                  onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                  placeholder="e.g. AI-417"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Assigned Teacher</label>
              <select
                value={subjectForm.teacherId}
                onChange={(e) => setSubjectForm({ ...subjectForm, teacherId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white"
              >
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} ({t.designation})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Save Subject Allocation
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

