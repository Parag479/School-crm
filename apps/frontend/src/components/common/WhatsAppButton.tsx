import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '919810112233'; // Greenwood Admissions Hotline
  const message = encodeURIComponent(
    'Hello Greenwood International Academy, I would like to enquire about admission procedures and fee structure for the 2026-27 session.'
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 group border-2 border-white/20"
      title="Chat with Admissions on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </div>
      <span className="hidden sm:inline text-xs font-bold leading-none">WhatsApp Enquiry</span>
    </a>
  );
};

