import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdmissionEnquirySchema, AdmissionEnquiryInput } from '../../utils/validation';
import { api } from '../../services/api';
import { CheckCircle2, Upload, FileText, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OnlineEnquiry: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdmissionEnquiryInput>({
    resolver: zodResolver(AdmissionEnquirySchema),
    defaultValues: {
      gender: 'MALE',
      applyingClass: 'Class 1',
    },
  });

  const onSubmit = async (data: AdmissionEnquiryInput) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const response: any = await api.post('/admissions/enquiry', data);
      setSuccessData(response.data);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit admission enquiry. Please verify details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admissions Information</span>
          </Link>
        </div>

        {successData ? (
          <div className="bg-white rounded-3xl border border-appBorder p-8 sm:p-14 shadow-card text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Application Received Successfully
              </span>
              <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
                Welcome to Greenwood Admissions
              </h2>
              <p className="text-sm text-secondary-600 max-w-lg mx-auto">
                Thank you for applying for <span className="font-bold text-secondary-900">{successData.studentName}</span>. Your enquiry has been registered in the EduManage CRM.
              </p>
            </div>

            {/* Generated Enquiry Badge */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-appBorder max-w-md mx-auto space-y-2">
              <p className="text-xs uppercase font-bold tracking-wider text-secondary-400">Your Official Enquiry Number</p>
              <p className="text-3xl font-black text-primary-600 font-mono tracking-wider">
                {successData.enquiryNumber}
              </p>
              <p className="text-[11px] text-secondary-500">
                Please quote this number for all follow-up communications and campus visit scheduling.
              </p>
            </div>

            <div className="text-xs text-secondary-500 max-w-md mx-auto space-y-1">
              <p>✔ Admission Officer: <span className="font-semibold text-secondary-800">{successData.assignedOfficerName || 'Pooja Singhania'}</span></p>
              <p>✔ Follow-Up Call Scheduled by: <span className="font-semibold text-secondary-800">{successData.followUpDate || 'Within 48 hours'}</span></p>
              <p>✔ Confirmation email dispatched to: <span className="font-semibold text-secondary-800">{successData.email}</span></p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setSuccessData(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-appBorder text-xs font-bold text-secondary-700 hover:bg-slate-50"
              >
                Submit Another Enquiry
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-bold shadow-md hover:bg-primary-700"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-appBorder p-8 sm:p-12 shadow-card space-y-8">
            <div className="border-b border-appBorder pb-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold border border-primary-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Session 2026-27</span>
              </div>
              <h1 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
                Online Admission Enquiry
              </h1>
              <p className="text-sm text-secondary-600">
                Please complete the form below. Once received, our admissions team will contact you to schedule an interaction and campus tour.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 1. Student Particulars */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
                  1. Student Particulars
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('studentName')}
                      placeholder="e.g. Vihaan Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.studentName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.studentName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Date of Birth (YYYY-MM-DD) *
                    </label>
                    <input
                      type="date"
                      {...register('dateOfBirth')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.dateOfBirth && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.dateOfBirth.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Gender *
                    </label>
                    <select
                      {...register('gender')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Class Applying For *
                    </label>
                    <select
                      {...register('applyingClass')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="Pre-KG">Pre-KG</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 - Science">Class 11 - Science</option>
                      <option value="Class 11 - Commerce">Class 11 - Commerce</option>
                      <option value="Class 12 - Science">Class 12 - Science</option>
                      <option value="Class 12 - Commerce">Class 12 - Commerce</option>
                    </select>
                    {errors.applyingClass && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.applyingClass.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Previous / Current School (if applicable)
                  </label>
                  <input
                    type="text"
                    {...register('currentSchool')}
                    placeholder="e.g. Delhi Public School, Indirapuram"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* 2. Parent / Guardian Contact Details */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-900 border-b border-appBorder pb-2">
                  2. Parent / Guardian Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      {...register('parentName')}
                      placeholder="e.g. Alok Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.parentName && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.parentName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary-700 mb-1">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="e.g. 9810112233"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="e.g. alok.sharma@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    {...register('address')}
                    placeholder="House / Flat No., Sector, City, Pincode"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-secondary-700 mb-1">
                    Specific Queries / Special Interests
                  </label>
                  <textarea
                    rows={3}
                    {...register('message')}
                    placeholder="Mention any sports specialization, transport requirement, or medical note..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-appBorder text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-primary-600 text-white font-bold text-sm shadow-md hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'Submit Online Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

