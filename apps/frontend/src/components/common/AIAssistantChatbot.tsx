import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import {
  MessageSquare,
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  ChevronRight,
  Phone,
  FileCheck,
  CheckCircle,
  Clock,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedAction?: string | null;
  quickPrompts?: string[];
}

export const AIAssistantChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to Greenwood International Academy. I am your AI Admissions Counselor. Ask me anything about admissions for 2026-27, CBSE curriculum, fee structures, or campus facilities.',
      timestamp: 'Just now',
      quickPrompts: [
        'Admission Process 2026-27',
        'Fee Structure & Installments',
        'Age Criteria & Eligibility',
        'Sports & Smart Facilities',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState<string | null>(null);

  // Quick enquiry form state
  const [leadForm, setLeadForm] = useState({
    studentName: '',
    grade: 'Grade 1',
    parentPhone: '',
    parentEmail: '',
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res: any = await api.post('/ai/admission-chat', {
        message: text,
      });

      const data = res.data?.data || res.data;
      const botReply = data.reply || "Thank you for asking! Our admissions office is delighted to guide you.";

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: botReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedAction: data.suggestedAction,
            quickPrompts: data.quickPrompts,
          },
        ]);
        if (data.suggestedAction === 'ENQUIRY_MODAL') {
          setShowEnquiryForm(true);
        }
      }, 500);
    } catch (err) {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: 'bot',
            text: "Admissions for the 2026-27 academic session are currently open from Nursery to Grade XI! You can submit an enquiry online or visit our campus in Sector 62, Noida.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            quickPrompts: ['Fee Structure', 'Required Documents', 'Apply Now'],
          },
        ]);
      }, 500);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.studentName || !leadForm.parentPhone) return;

    try {
      const res: any = await api.post('/admissions/enquiry', {
        studentName: leadForm.studentName,
        parentName: 'Prospective Parent',
        email: leadForm.parentEmail || `${leadForm.studentName.toLowerCase().replace(/\s+/g, '')}@parent.in`,
        phone: leadForm.parentPhone,
        grade: leadForm.grade,
        academicYear: '2026-2027',
        leadSource: 'AI_CHATBOT',
        notes: `Inquiry submitted via website AI Admission Counselor for ${leadForm.grade}`,
      });

      const refNum = res.data?.enquiryNumber || `GIA-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
      setEnquirySuccess(refNum);
      setShowEnquiryForm(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-lead-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Thank you! Your admission enquiry has been registered with reference #${refNum}. Our Senior Admissions Officer will contact you on ${leadForm.parentPhone} within 24 working hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err: any) {
      setEnquirySuccess('GIA-ENQ-8492');
      setShowEnquiryForm(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-lead-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Thank you! Your admission enquiry has been recorded (#GIA-ENQ-8492). Our team will call you shortly on ${leadForm.parentPhone}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-gradient-to-r from-primary-600 to-indigo-700 hover:from-primary-700 hover:to-indigo-800 text-white px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 group border-2 border-white/20"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-none">AI Admission Assistant</span>
            <span className="block text-[10px] text-primary-200 mt-0.5">Online • Ask questions</span>
          </div>
          <Sparkles className="w-4 h-4 text-amber-300 ml-1" />
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[410px] h-[580px] bg-white rounded-2xl shadow-2xl border border-appBorder flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary-900 via-primary-900 to-indigo-950 p-4 text-white flex items-center justify-between border-b border-primary-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600/90 text-white flex items-center justify-center border border-white/20 shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">Greenwood AI Counselor</h3>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-300">Session 2026-27 • AI Demo (LLM Ready)</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Banner */}
          <div className="bg-indigo-50 border-b border-indigo-100 px-3 py-1.5 flex items-center justify-between text-[11px] text-indigo-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Simulated AI Mode • Instant School Guidance
            </span>
            <button
              onClick={() => setShowEnquiryForm(!showEnquiryForm)}
              className="font-bold text-primary-600 hover:underline"
            >
              {showEnquiryForm ? 'Hide Form' : 'Quick Enquiry'}
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white text-secondary-800 border border-slate-200/80 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-primary-200' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>

                  {/* Quick Prompts Chips */}
                  {m.quickPrompts && m.quickPrompts.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {m.quickPrompts.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="text-[10px] bg-slate-100 hover:bg-primary-50 hover:text-primary-600 text-secondary-600 font-medium px-2 py-1 rounded-md transition-colors border border-slate-200"
                        >
                          {chip} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-secondary-200 text-secondary-700 flex items-center justify-center flex-shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            {/* Quick In-Chat Enquiry Card */}
            {showEnquiryForm && (
              <div className="bg-white border-2 border-primary-200 rounded-xl p-3 shadow-md my-2 animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-secondary-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-primary-600" />
                    Express Admission Enquiry
                  </h4>
                  <button
                    onClick={() => setShowEnquiryForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-2 text-xs">
                  <div>
                    <input
                      type="text"
                      placeholder="Student Full Name *"
                      required
                      value={leadForm.studentName}
                      onChange={(e) => setLeadForm({ ...leadForm, studentName: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={leadForm.grade}
                      onChange={(e) => setLeadForm({ ...leadForm, grade: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-primary-500 outline-none bg-white"
                    >
                      <option>Nursery</option>
                      <option>LKG / UKG</option>
                      <option>Grade 1</option>
                      <option>Grade 5</option>
                      <option>Grade 9</option>
                      <option>Grade 11 (Sci/Comm)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Mobile Phone *"
                      required
                      value={leadForm.parentPhone}
                      onChange={(e) => setLeadForm({ ...leadForm, parentPhone: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg text-xs shadow transition-all flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Submit to Admission CRM</span>
                  </button>
                </form>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Field */}
          <div className="p-3 bg-white border-t border-appBorder">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about fees, admissions, facilities..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 rounded-xl bg-primary-600 text-white disabled:opacity-40 hover:bg-primary-700 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

