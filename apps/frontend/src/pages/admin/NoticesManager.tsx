import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import {
  Bell,
  Plus,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Bot,
  Wand2,
  Send,
  Loader2,
  FileText,
} from 'lucide-react';

export const NoticesManager: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiDrafting, setAiDrafting] = useState(false);

  // Normal Form State
  const [form, setForm] = useState({
    title: '',
    content: '',
    targetRole: 'ALL',
    isImportant: false,
  });

  // AI Generator State
  const [aiForm, setAiForm] = useState({
    topic: 'Quarter 2 Tuition & Transport Fee Settlement',
    targetAudience: 'PARENTS',
    tone: 'FORMAL',
    extraDetails: '',
  });

  const [aiPreview, setAiPreview] = useState<{
    title: string;
    content: string;
    targetAudience: string;
  } | null>(null);

  const fetchData = () => {
    setLoading(true);
    api
      .get('/notices')
      .then((res: any) => setNotices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/notices', form);
      setCreateModalOpen(false);
      setForm({ title: '', content: '', targetRole: 'ALL', isImportant: false });
      fetchData();
      alert('Official notice published successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to publish notice');
    }
  };

  const handleGenerateAiNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiDrafting(true);
    try {
      const res: any = await api.post('/ai/draft-notice', aiForm);
      const data = res.data?.data || res.data;
      setAiPreview({
        title: data.title,
        content: data.content,
        targetAudience: aiForm.targetAudience,
      });
    } catch (err: any) {
      // Fallback
      setAiPreview({
        title: `OFFICIAL CIRCULAR: ${aiForm.topic.toUpperCase()}`,
        content: `Dear Parents and Students,\n\nGreenwood International Academy hereby issues this notification regarding ${aiForm.topic}. All concerned are advised to comply with the stipulated schedule.\n\nWarm regards,\nPrincipal's Office`,
        targetAudience: aiForm.targetAudience,
      });
    } finally {
      setAiDrafting(false);
    }
  };

  const handleApplyAiToForm = () => {
    if (!aiPreview) return;
    setForm({
      title: aiPreview.title,
      content: aiPreview.content,
      targetRole: aiPreview.targetAudience,
      isImportant: true,
    });
    setAiModalOpen(false);
    setCreateModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Notices & Circulars Board</h1>
            <span className="text-[10px] bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Powered
            </span>
          </div>
          <p className="text-xs text-secondary-500 mt-1">
            Publish institutional notifications, board advisories, sports circulars, and emergency alerts
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* AI Notice Drafter Button */}
          <button
            onClick={() => {
              setAiModalOpen(true);
              setAiPreview(null);
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-primary-600 text-white rounded-xl text-xs font-bold hover:shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Draft with AI Notice Generator</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-secondary-900 text-white rounded-xl text-xs font-bold hover:bg-black shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice</span>
          </button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm space-y-3 transition-all ${
                n.isImportant ? 'border-primary-300 ring-1 ring-primary-100' : 'border-appBorder'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 uppercase">
                    Audience: {n.targetRole}
                  </span>
                  {n.isImportant && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 uppercase flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Important Circular</span>
                    </span>
                  )}
                </div>

                <span className="text-xs text-secondary-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(n.publishedAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-secondary-900">{n.title}</h3>
                <p className="text-xs sm:text-sm text-secondary-600 mt-1.5 leading-relaxed whitespace-pre-line">{n.content}</p>
              </div>

              <div className="pt-2 border-t border-appBorder text-[11px] text-secondary-400">
                Issued by: <strong className="text-secondary-700">{n.authorName || 'Principal Office'}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Notice Generator Modal */}
      {aiModalOpen && (
        <Modal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          title="AI Notice & Announcement Generator"
          subtitle="Generate institutional circulars in seconds (Demo Mode - LLM Ready)"
          maxWidth="lg"
        >
          <div className="space-y-5">
            {/* Quick Prompt Topic Chips */}
            <div>
              <label className="block text-xs font-bold text-secondary-700 mb-2">
                Popular Quick Topics:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Quarter 2 Tuition & Transport Fee Settlement',
                  'Festive Diwali Vacation & Reopening',
                  'Comprehensive Parent-Teacher Interactive Meeting (PTM)',
                  'Annual Sports Day & Athletic Meet 2026',
                  'CBSE Class 10 & 12 Board Pre-Board Schedule',
                  'Winter Uniform Advisory & Timing Update',
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setAiForm({ ...aiForm, topic: chip })}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      aiForm.topic === chip
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                        : 'bg-slate-50 text-secondary-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerateAiNotice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">Target Audience</label>
                  <select
                    value={aiForm.targetAudience}
                    onChange={(e) => setAiForm({ ...aiForm, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-medium"
                  >
                    <option value="PARENTS">Parents & Guardians</option>
                    <option value="ALL">Entire School Community</option>
                    <option value="TEACHERS">Educators & Faculty</option>
                    <option value="STUDENTS">Students Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">Tone & Format</label>
                  <select
                    value={aiForm.tone}
                    onChange={(e) => setAiForm({ ...aiForm, tone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-medium"
                  >
                    <option value="FORMAL">Formal & Authoritative</option>
                    <option value="URGENT">Urgent Advisory</option>
                    <option value="CELEBRATORY">Warm & Celebratory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Notice Topic / Instructions</label>
                <input
                  type="text"
                  required
                  value={aiForm.topic}
                  onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                  placeholder="e.g. Schedule of Annual Sports Day"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Special Details (Optional)</label>
                <input
                  type="text"
                  value={aiForm.extraDetails}
                  onChange={(e) => setAiForm({ ...aiForm, extraDetails: e.target.value })}
                  placeholder="e.g. Venue is School Main Stadium; Parents requested to be seated by 8:30 AM"
                  className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={aiDrafting}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {aiDrafting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Professional Circular...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate Circular Draft</span>
                  </>
                )}
              </button>
            </form>

            {/* AI Output Preview */}
            {aiPreview && (
              <div className="bg-slate-50 border-2 border-indigo-200 rounded-xl p-4 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    Generated Official Draft
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                    Target: {aiPreview.targetAudience}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-secondary-900">{aiPreview.title}</h4>
                  <p className="text-xs text-secondary-700 mt-2 whitespace-pre-line leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                    {aiPreview.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAiPreview(null)}
                    className="px-3 py-1.5 text-xs text-secondary-600 hover:text-secondary-900 font-semibold"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyAiToForm}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept & Insert into Publisher</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Manual / Final Create Notice Modal */}
      {createModalOpen && (
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Publish Official School Notice"
          subtitle="Dispatches notifications to authorized user portals"
          maxWidth="md"
        >
          <form onSubmit={handleCreateNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Target Audience *</label>
              <select
                value={form.targetRole}
                onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                <option value="ALL">All Campus (Parents, Students, Teachers)</option>
                <option value="PARENTS">Parents Only</option>
                <option value="TEACHERS">Educators & Faculty</option>
                <option value="STUDENTS">Students Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Circular Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. CBSE Term 2 Practical Examination Guidelines"
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Notice Content *</label>
              <textarea
                rows={6}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Type circular announcement..."
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isImportant"
                checked={form.isImportant}
                onChange={(e) => setForm({ ...form, isImportant: e.target.checked })}
                className="rounded border-slate-300 text-primary-600"
              />
              <label htmlFor="isImportant" className="text-xs font-semibold text-secondary-700 cursor-pointer">
                Mark as High Priority / Pin to Top
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700 transition-colors"
            >
              Publish Notice to Portals
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};
