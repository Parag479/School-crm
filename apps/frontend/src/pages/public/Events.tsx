import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Calendar, MapPin, Clock, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('/events/public')
      .then((res: any) => setEvents(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-400 bg-secondary-800 px-3 py-1 rounded-full border border-secondary-700">
            Campus Activities
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Events & Celebrations</h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Stay up to date with school festivals, academic olympiads, athletic tournaments, and annual exhibitions.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-appBorder overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {evt.bannerImage && (
                  <img src={evt.bannerImage} alt={evt.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700">
                      {evt.category}
                    </span>
                    <span className="text-secondary-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" />
                      {new Date(evt.startDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-secondary-900">{evt.title}</h3>
                  <p className="text-xs text-secondary-600 leading-relaxed">{evt.description}</p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-secondary-500 mt-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-secondary-400" />
                  <span>{evt.location}</span>
                </span>
                <Link
                  to="/contact"
                  className="font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <span>RSVP / Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

