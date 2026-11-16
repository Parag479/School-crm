import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { BookOpen, Plus, Calendar, Clock, CheckCircle2, UserCheck, Paperclip } from 'lucide-react';

export const HomeworkManager: React.FC = () => {
  const [homework, setHomework] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [form, setForm] = useState({
    classId: '',
    sectionId: '',
    subjectId: 'subj-10-math',
    title: '',
    description: '',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get('/homework'), api.get('/classes')])
      .then(([hwRes, clsRes]: any) => {
        setHomework(hwRes.data);
        setClasses(clsRes.data);
        if (clsRes.data.length > 0 && !form.classId) {
          setForm((prev) => ({
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
  }, []);

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/homework', form);
      setCreateModalOpen(false);
      fetchData();
      alert('Homework assigned successfully to students!');
    } catch (err: any) {
      alert(err.message || 'Failed to create homework');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Homework & Assignments</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Assign curriculum tasks, set deadlines, and monitor student portal digital submissions
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-bold hover:bg-primary-700 shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Homework</span>
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homework.map((hw) => (
            <div key={hw.id} className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">
                    {hw.subjectName}
                  </span>
                  <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Due {hw.dueDate}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-secondary-900">{hw.title}</h3>
                  <p className="text-xs text-secondary-600 mt-1 line-clamp-3 leading-relaxed">{hw.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-appBorder flex items-center justify-between text-xs text-secondary-500">
                <span>Assigned by {hw.teacherName}</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {hw.submissionsCount || 28} Submissions
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Homework Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Assign New Homework"
          subtitle="Publish assignment to Student & Parent Portals"
          maxWidth="md"
        >
          <form onSubmit={handleCreateHomework} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Target Class *</label>
                <select
                  value={form.classId}
                  onChange={(e) => setForm({ ...form, classId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Homework Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Quadratic Equations Exercise 4.3"
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Instructions & Problem Sets *</label>
              <textarea
                rows={4}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed instructions for student notebooks..."
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Assign Homework
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

