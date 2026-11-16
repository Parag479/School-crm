import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Globe, Save, CheckCircle2, Image, MessageSquare, Phone, Sparkles } from 'lucide-react';

export const WebsiteCMSManager: React.FC = () => {
  const [cms, setCms] = useState<any>({
    heroHeadline: '',
    heroSubheadline: '',
    heroImageUrl: '',
    schoolIntro: '',
    vision: '',
    mission: '',
    principalName: '',
    principalDesignation: '',
    principalMessage: '',
    statsStudents: 2450,
    statsTeachers: 145,
    statsYears: 28,
    statsClassrooms: 84,
    phone: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    api
      .get('/website/public')
      .then((res: any) => {
        if (res.data?.cms) {
          setCms(res.data.cms);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await api.post('/website/cms', {
        pageKey: 'HOME',
        content: cms,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to save website content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSkeleton rows={8} />;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Website Content Management (CMS)</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Edit live homepage hero section, principal's desk message, statistics counters, and campus contact details
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveCMS}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Publishing Changes...' : 'Publish to Public Website'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Live website content updated successfully! Refresh the public website to verify changes.</span>
        </div>
      )}

      <form onSubmit={handleSaveCMS} className="space-y-6">
        {/* Section 1: Hero Banner */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
            1. Homepage Hero Section
          </h3>

          <div>
            <label className="block text-xs font-semibold text-secondary-700 mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={cms.heroHeadline || ''}
              onChange={(e) => setCms({ ...cms, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm font-bold text-secondary-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary-700 mb-1">Hero Subheadline</label>
            <textarea
              rows={2}
              value={cms.heroSubheadline || ''}
              onChange={(e) => setCms({ ...cms, heroSubheadline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs text-secondary-700 leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary-700 mb-1">Hero Image URL</label>
            <input
              type="text"
              value={cms.heroImageUrl || ''}
              onChange={(e) => setCms({ ...cms, heroImageUrl: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg border border-appBorder text-xs font-mono"
            />
          </div>
        </div>

        {/* Section 2: Principal Message */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
            2. From the Principal's Desk
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Principal Full Name</label>
              <input
                type="text"
                value={cms.principalName || ''}
                onChange={(e) => setCms({ ...cms, principalName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Designation & Degrees</label>
              <input
                type="text"
                value={cms.principalDesignation || ''}
                onChange={(e) => setCms({ ...cms, principalDesignation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-secondary-700 mb-1">Principal's Welcome Address</label>
            <textarea
              rows={4}
              value={cms.principalMessage || ''}
              onChange={(e) => setCms({ ...cms, principalMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs text-secondary-700 leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Statistics Counters */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
            3. Homepage Statistics Counters
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Enrolled Students</label>
              <input
                type="number"
                value={cms.statsStudents || 2450}
                onChange={(e) => setCms({ ...cms, statsStudents: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Educators</label>
              <input
                type="number"
                value={cms.statsTeachers || 145}
                onChange={(e) => setCms({ ...cms, statsTeachers: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Years of Legacy</label>
              <input
                type="number"
                value={cms.statsYears || 28}
                onChange={(e) => setCms({ ...cms, statsYears: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Smart Classrooms</label>
              <input
                type="number"
                value={cms.statsClassrooms || 84}
                onChange={(e) => setCms({ ...cms, statsClassrooms: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Contact & Campus Info */}
        <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
            4. Campus Official Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Helpline Phone Number</label>
              <input
                type="text"
                value={cms.phone || ''}
                onChange={(e) => setCms({ ...cms, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Official Admissions Email</label>
              <input
                type="email"
                value={cms.email || ''}
                onChange={(e) => setCms({ ...cms, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-semibold"
              />
            </div>
            <div className="col-span-full">
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Postal Campus Address</label>
              <input
                type="text"
                value={cms.address || ''}
                onChange={(e) => setCms({ ...cms, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

