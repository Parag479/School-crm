import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Settings, Shield, Save, CheckCircle2, History, Database, Server } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const [school, setSchool] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'audit'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get('/settings/school'), api.get('/settings/audit-logs')])
      .then(([schRes, logRes]: any) => {
        setSchool(schRes.data);
        setAuditLogs(logRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/settings/school', school);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !school) return <LoadingSkeleton rows={8} />;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">System & School Configuration</h1>
          <p className="text-xs text-secondary-500 mt-1">
            School affiliation particulars, multi-tenant parameters, and security audit logs
          </p>
        </div>

        <div className="bg-secondary-100 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'general' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
            }`}
          >
            School Profile
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit' ? 'bg-white text-primary-600 shadow-sm' : 'text-secondary-600'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>School parameters saved and active across all modules!</span>
        </div>
      )}

      {activeTab === 'general' ? (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
              Institution Identity & Board Affiliation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">School Name</label>
                <input
                  type="text"
                  value={school.name || ''}
                  onChange={(e) => setSchool({ ...school, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">School Code</label>
                <input
                  type="text"
                  value={school.code || ''}
                  onChange={(e) => setSchool({ ...school, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">CBSE Affiliation Number</label>
                <input
                  type="text"
                  value={school.affiliationNumber || ''}
                  onChange={(e) => setSchool({ ...school, affiliationNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Affiliated Board</label>
                <select
                  value={school.board || 'CBSE'}
                  onChange={(e) => setSchool({ ...school, board: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs bg-white font-semibold"
                >
                  <option value="CBSE">Central Board of Secondary Education (CBSE)</option>
                  <option value="ICSE">Council for the Indian School Certificate (ICSE)</option>
                  <option value="STATE_BOARD">State Board</option>
                  <option value="IB">International Baccalaureate (IB)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Operating Currency</label>
                <input
                  type="text"
                  value={`${school.currency} (${school.currencySymbol})`}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs bg-slate-50 text-secondary-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-secondary-700 mb-1">Official Website</label>
                <input
                  type="text"
                  value={school.website || ''}
                  onChange={(e) => setSchool({ ...school, website: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-xs font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-appBorder">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
              >
                {saving ? 'Saving...' : 'Save School Settings'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Audit Logs Table */
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Resource</th>
                <th className="p-3.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="p-3.5 font-mono text-secondary-500">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{log.userName || 'System'}</td>
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-secondary-600">{log.resource}</td>
                  <td className="p-3.5 text-secondary-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

