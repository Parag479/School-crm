import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { BookMarked, Plus, Search, BookOpen, CheckCircle, ArrowRight, CornerDownLeft } from 'lucide-react';

export const LibraryManager: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const fetchData = () => {
    setLoading(true);
    Promise.all([api.get(`/library/books?search=${search}`), api.get('/students')])
      .then(([bkRes, stuRes]: any) => {
        setBooks(bkRes.data);
        setStudents(stuRes.data);
        if (stuRes.data.length > 0 && !selectedStudentId) {
          setSelectedStudentId(stuRes.data[0].id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleIssueBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBook) return;
    try {
      await api.post('/library/issue', {
        bookId: selectedBook.id,
        studentId: selectedStudentId,
      });
      setIssueModalOpen(false);
      fetchData();
      alert(`"${selectedBook.title}" issued successfully!`);
    } catch (err: any) {
      alert(err.message || 'Book issue failed');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Library & Knowledge Center</h1>
          <p className="text-xs text-secondary-500 mt-1">
            Book catalog, ISBN accession, student circulation, and return dues tracking
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-appBorder p-4 shadow-sm flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book title, author, ISBN..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-appBorder text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="w-4 h-4 text-secondary-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary-50 border-b border-appBorder text-secondary-600 font-bold uppercase">
              <tr>
                <th className="p-3.5">ISBN</th>
                <th className="p-3.5">Book Title</th>
                <th className="p-3.5">Author</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Rack Location</th>
                <th className="p-3.5">Availability</th>
                <th className="p-3.5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-appBorder text-secondary-700">
              {books.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-secondary-500">{b.isbn}</td>
                  <td className="p-3.5 font-bold text-secondary-900">{b.title}</td>
                  <td className="p-3.5">{b.author}</td>
                  <td className="p-3.5 font-semibold text-primary-600">{b.category}</td>
                  <td className="p-3.5 font-mono text-secondary-400">{b.locationRack || 'RACK-01'}</td>
                  <td className="p-3.5">
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        b.availableCopies > 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {b.availableCopies} / {b.totalCopies} Available
                    </span>
                  </td>
                  <td className="p-3.5">
                    {b.availableCopies > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedBook(b);
                          setIssueModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white transition-all text-xs font-bold"
                      >
                        Issue Book
                      </button>
                    ) : (
                      <span className="text-secondary-400 text-xs italic">All Issued</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Issue Book Modal */}
      {issueModalOpen && selectedBook && (
        <Modal
          isOpen={issueModalOpen}
          onClose={() => setIssueModalOpen(false)}
          title={`Issue: ${selectedBook.title}`}
          subtitle={`By ${selectedBook.author} • Available: ${selectedBook.availableCopies}`}
          maxWidth="sm"
        >
          <form onSubmit={handleIssueBook} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-700 mb-1">Issue to Student *</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-appBorder text-xs bg-white font-semibold"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.admissionNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-appBorder text-xs text-secondary-600 space-y-1">
              <p>✔ Standard loan duration: 14 Days</p>
              <p>✔ Due Date: {new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]}</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md hover:bg-primary-700"
            >
              Confirm Circulation Issue
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

