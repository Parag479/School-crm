import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const News: React.FC = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    api
      .get('/news/public')
      .then((res: any) => setNewsList(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-400 bg-secondary-800 px-3 py-1 rounded-full border border-secondary-700">
            Press & Media
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Greenwood News Desk</h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Official announcements, student achievements, academic recognitions, and school development milestones.
          </p>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsList.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {article.coverImage && (
                  <img src={article.coverImage} alt={article.title} className="w-full h-56 object-cover" />
                )}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-secondary-500">
                    <span className="flex items-center gap-1 font-semibold text-primary-600">
                      <User className="w-3.5 h-3.5" />
                      {article.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(article.publishedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">{article.excerpt}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="px-5 py-2.5 rounded-xl bg-primary-50 text-primary-600 font-bold text-xs hover:bg-primary-600 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Article Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          subtitle={`By ${selectedArticle.author} • ${new Date(selectedArticle.publishedDate).toLocaleDateString()}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            {selectedArticle.coverImage && (
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-64 object-cover rounded-xl"
              />
            )}
            <div className="text-sm text-secondary-700 leading-relaxed whitespace-pre-line space-y-3">
              {selectedArticle.content}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

