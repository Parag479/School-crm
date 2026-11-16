import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-secondary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-400 bg-secondary-800 px-3 py-1 rounded-full border border-secondary-700">
            Reach Out
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Contact Our Campus</h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            We welcome queries from parents, prospective students, and alumni. Reach out to our admission counselors or administrative office.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-2.5 py-1 rounded">
                Greenwood Campus
              </span>
              <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">Get in Touch</h2>
              <p className="text-sm text-secondary-600 leading-relaxed">
                Our helpdesk is accessible by phone, email, and in person during school office hours.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-appBorder shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-secondary-900">Campus Address</h4>
                  <p className="text-xs text-secondary-600 mt-0.5">
                    Plot 14, Institutional Area, Sector 62, Noida, Uttar Pradesh 201309
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-appBorder shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-secondary-900">Telephone Helpline</h4>
                  <p className="text-xs text-secondary-600 mt-0.5">+91 120 4589200 (Board)</p>
                  <p className="text-xs text-secondary-600">+91 98101 12233 (Admissions Desk)</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-appBorder shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-secondary-900">Email Addresses</h4>
                  <p className="text-xs text-secondary-600 mt-0.5">Admissions: admissions@greenwood.edu.in</p>
                  <p className="text-xs text-secondary-600">General Enquiries: info@greenwood.edu.in</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-appBorder shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-secondary-900">Office Working Hours</h4>
                  <p className="text-xs text-secondary-600 mt-0.5">
                    Monday to Saturday: 8:00 AM – 4:30 PM (Closed on Second Saturdays & Gazetted Holidays)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-appBorder p-8 sm:p-10 shadow-card">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900">Message Received!</h3>
                  <p className="text-sm text-secondary-600 max-w-md mx-auto">
                    Thank you for reaching out. Our front desk coordinator will respond to your enquiry within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold shadow-md hover:bg-primary-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">Send an Official Enquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alok Sharma"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alok.sharma@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-secondary-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Transfer Certificate Query"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">Your Message / Query *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please type your query in detail..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-md hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Query</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-appBorder overflow-hidden shadow-card">
          <iframe
            title="School Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.376859556277!2d77.3629474!3d28.6288863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5456e7d8051%3A0xb35a09d3568c4cf3!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

