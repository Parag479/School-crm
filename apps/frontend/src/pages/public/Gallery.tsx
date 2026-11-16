import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { Image as ImageIcon, ZoomIn, Play } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  useEffect(() => {
    api
      .get('/gallery/public')
      .then((res: any) => setItems(res.data))
      .catch(() => {});
  }, []);

  const categories = ['ALL', 'CAMPUS', 'SPORTS', 'EVENTS', 'CELEBRATIONS', 'CLASSROOMS', 'LABS'];

  const filteredItems =
    activeCategory === 'ALL'
      ? items
      : items.filter((item) => item.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-400 bg-secondary-800 px-3 py-1 rounded-full border border-secondary-700">
            Moments & Milestones
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Campus Photo Gallery</h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Glimpses of academic discovery, sporting victories, cultural triumphs, and daily campus vibrancy at Greenwood Academy.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-secondary-600 border border-appBorder hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-card group cursor-pointer hover:shadow-card-hover transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-secondary-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-secondary-900 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-primary-700 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-base font-bold text-secondary-900">{item.title}</h4>
                {item.caption && <p className="text-xs text-secondary-500 mt-1">{item.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title={selectedImage.title}
          subtitle={`Category: ${selectedImage.category}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[500px] object-contain rounded-xl bg-slate-900"
            />
            {selectedImage.caption && (
              <p className="text-sm text-secondary-700 italic text-center">{selectedImage.caption}</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

