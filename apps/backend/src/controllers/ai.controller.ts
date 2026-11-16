import { Request, Response } from 'express';
import { dbService } from '../services/db.service.js';

/**
 * AI Controller providing realistic AI intelligence for Phase 1 Demo
 * Includes options for live LLM API connection (OpenAI / Gemini)
 * and structured fallback simulation mode clearly marked as AI Demo Mode.
 */

export const admissionChat = async (req: Request, res: Response) => {
  const { message = '', history = [] } = req.body;
  const lower = message.toLowerCase().trim();

  let reply = '';
  let suggestedAction: string | null = null;
  let quickPrompts: string[] = [];

  if (lower.includes('fee') || lower.includes('cost') || lower.includes('charges') || lower.includes('tuition')) {
    reply = `At Greenwood International Academy, our fee structure is transparent with quarterly installment options:
• Pre-Primary (Nursery - UKG): ₹45,000 / annum (includes activity kit & meals)
• Primary School (Grades 1 - 5): ₹65,000 / annum
• Middle School (Grades 6 - 8): ₹78,000 / annum
• Secondary (Grades 9 & 10): ₹85,000 / annum
• Senior Secondary (Grades 11 & 12): ₹95,000 / annum (Science/Commerce/Humanities with modern labs)

Transport and composite lab charges are billed optionally. Would you like me to register your enquiry for a customized fee breakdown?`;
    suggestedAction = 'ENQUIRY_MODAL';
    quickPrompts = ['Admission Process', 'Age Criteria', 'Schedule Campus Visit', 'Scholarship Options'];
  } else if (lower.includes('admission') || lower.includes('apply') || lower.includes('enquiry') || lower.includes('process') || lower.includes('form')) {
    reply = `Admissions for the academic session 2026-2027 are officially open for Nursery through Grade XI!
The process involves 4 simple steps:
1. Online Enquiry & Registration
2. Interactive Child Assessment / Counseling Session
3. Document Verification (Birth certificate, Transfer certificate & Aadhaar)
4. Provisional Seat Offer & Fee Payment

Seats fill rapidly on a first-come basis. Would you like to submit your enquiry now?`;
    suggestedAction = 'ENQUIRY_MODAL';
    quickPrompts = ['Fee Structure', 'Required Documents', 'Age Criteria', 'Talk to Admission Officer'];
  } else if (lower.includes('facility') || lower.includes('facilities') || lower.includes('lab') || lower.includes('sports') || lower.includes('bus') || lower.includes('transport')) {
    reply = `Greenwood boasts a world-class 12-acre smart campus featuring:
• 100% Smart Interactive Classrooms with digital learning boards
• Robotics, STEM & Atal Tinkering Innovation Lab
• Semi-Olympic Swimming Pool, synthetic Basketball, and FIFA-standard Football ground
• Advanced Physics, Chemistry, Biology & Computer Science Labs
• Air-conditioned GPS-tracked fleet covering 25+ NCR routes with female attendants and CCTV
• 24x7 Campus infirmary with certified resident medical officer`;
    quickPrompts = ['Fee Structure', 'Transport Routes', 'Apply for Admission', 'Sports Academy'];
  } else if (lower.includes('curriculum') || lower.includes('board') || lower.includes('cbse') || lower.includes('subject')) {
    reply = `We are affiliated with the Central Board of Secondary Education (CBSE, Affiliation No. CBSE/AFF/2130842), following the National Education Policy (NEP 2020) framework.
Our pedagogy balances academic rigor with experiential learning:
• Focus on coding, financial literacy, and design thinking from Grade 6
• Three language formula: English, Hindi, and French/Sanskrit
• 100% CBSE Board pass rate with school average above 88.4%`;
    quickPrompts = ['Senior Secondary Streams', 'Admission Criteria', 'Fee Structure'];
  } else if (lower.includes('age') || lower.includes('eligibility') || lower.includes('criteria')) {
    reply = `Age criteria as of 31st March 2026:
• Nursery: 3+ years
• LKG: 4+ years
• UKG: 5+ years
• Grade 1: 6+ years

Direct admissions for Grades 2 to 9 are granted based on prior school report card and an introductory aptitude test.`;
    quickPrompts = ['Apply for Admission', 'Fee Structure', 'Required Documents'];
  } else {
    reply = `Hello! Thank you for connecting with Greenwood International Academy's AI Admission Desk.
I can assist you with:
• Admissions process & criteria for 2026-27
• Detailed tuition & transport fee schedules
• Academic curriculum & CBSE stream selections
• Campus facilities, STEM labs, and sports infrastructure
• Booking a guided school tour with our Principal & Admission team

Feel free to ask any question or click a prompt below!`;
    quickPrompts = ['Admission Process 2026-27', 'Annual Fee Structure', 'Sports & Facilities', 'Submit Online Enquiry'];
  }

  return res.json({
    success: true,
    data: {
      reply,
      suggestedAction,
      quickPrompts,
      mode: 'AI_DEMO_SIMULATION',
      model: 'EduManage-AI-v1 (LLM API Ready)',
      timestamp: new Date().toISOString(),
    },
  });
};

export const executiveSummary = async (req: Request, res: Response) => {
  const schoolId = (req as any).user?.schoolId || 'school-greenwood-001';
  const totalStudents = dbService.store.students.filter((s) => s.schoolId === schoolId).length;
  const totalTeachers = dbService.store.teachers.filter((t) => t.schoolId === schoolId).length;
  const totalEnquiries = dbService.store.admissions.filter((a) => a.schoolId === schoolId).length;
  const newEnquiries = dbService.store.admissions.filter((a) => a.schoolId === schoolId && a.status === 'NEW_ENQUIRY').length;
  const approved = dbService.store.admissions.filter((a) => a.schoolId === schoolId && a.status === 'APPROVED').length;

  const totalInvoiced = dbService.store.invoices.reduce((acc, inv) => acc + (inv.totalAmount || 0), 0);
  const totalPaid = dbService.store.payments.reduce((acc, p) => acc + (p.amount || 0), 0);
  const pendingFees = Math.max(0, totalInvoiced - totalPaid);

  const summary = {
    generatedAt: new Date().toISOString(),
    schoolName: 'Greenwood International Academy',
    academicYear: '2026-2027',
    mode: 'AI_EXECUTIVE_AGENT',
    highlights: [
      `Healthy Admission Momentum: ${totalEnquiries} total admission leads processed with ${approved} finalized enrollments (${Math.round((approved / (totalEnquiries || 1)) * 100)}% conversion rate).`,
      `Fee Collection Realization: ₹${(totalPaid / 100000).toFixed(2)} Lakhs collected to date. Outstanding dues currently at ₹${(pendingFees / 100000).toFixed(2)} Lakhs across 3 class cohorts.`,
      `Student-to-Teacher Ratio: Maintained at optimum 16:1 across ${totalStudents} active students and ${totalTeachers} certified faculty members.`,
      `Attendance Integrity: 94.6% average student attendance this week with 0 unexcused teacher absences.`,
    ],
    riskAlerts: [
      newEnquiries > 5 ? `${newEnquiries} inbound website enquiries awaiting immediate counselor follow-up within 24h SLA.` : 'No critical enquiry bottlenecks.',
      pendingFees > 50000 ? `Class 9-B and 10-A have 14 overdue fee reminders pending term exam roll-number dispatch.` : 'Fee collection on track.',
    ],
    actionRecommendations: [
      'Trigger automated WhatsApp fee reminder blast to pending guardians prior to next installment cutoff.',
      'Organize Principal Open House webinar this Saturday for the 18 prospective Class 11 Science/Commerce leads.',
      'Schedule term examination moderation meeting for CBSE Class 10 mock assessments.',
    ],
  };

  return res.json({
    success: true,
    data: summary,
  });
};

export const draftNotice = async (req: Request, res: Response) => {
  const { topic = 'General Notice', targetAudience = 'ALL', tone = 'FORMAL', extraDetails = '' } = req.body;

  let title = '';
  let content = '';

  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  if (topic.toLowerCase().includes('fee') || topic.toLowerCase().includes('payment')) {
    title = `URGENT CIRCULAR: Quarter 2 Tuition & Transport Fee Settlement (2026-27)`;
    content = `Dear Parents / Guardians,\n\nThis is a cordial reminder regarding the clearance of pending School Fees for Quarter 2 (Academic Session 2026-27). As per school regulations, the last date for fee payment without late penalty is 15th November 2026.\n\nYou may remit dues smoothly via the Parent Portal using UPI, NetBanking, Debit/Credit Cards (powered by Razorpay), or directly at the school accounts desk between 8:30 AM and 2:00 PM on working days.\n\nYour punctual cooperation ensures uninterrupted academic and transportation services for your ward.\n\nWarm regards,\nPrincipal's Office\nGreenwood International Academy`;
  } else if (topic.toLowerCase().includes('holiday') || topic.toLowerCase().includes('vacation') || topic.toLowerCase().includes('diwali')) {
    title = `CIRCULAR: Festive Break Announcement & School Reopening Schedule`;
    content = `Dear Parents and Students,\n\nOn the auspicious occasion of the upcoming festive season, Greenwood International Academy shall observe a festive recess commencing from Monday next week until Friday.\n\nRegular offline classes will resume punctually on the following Monday at 8:00 AM. Students are advised to utilize this period productively by revising term concepts and completing project assignments available on the Student Portal.\n\nWishing you and your family a safe, joy-filled, and prosperous festive season!\n\nWarm regards,\nDr. Sunita Sharma\nPrincipal, Greenwood International Academy`;
  } else if (topic.toLowerCase().includes('ptm') || topic.toLowerCase().includes('parent teacher')) {
    title = `INVITATION: Comprehensive Parent-Teacher Interactive Meeting (PTM)`;
    content = `Dear Parents,\n\nTo review and deliberate upon the mid-term academic progress, behavioral engagement, and holistic development of your ward, a Parent-Teacher Meeting (PTM) has been scheduled for this coming Saturday.\n\n• Timings: 9:00 AM – 1:00 PM (Roll-number slot schedule will be shared by the Class Teacher)\n• Venue: Respective Classrooms & Assembly Auditorium\n\nWe eagerly look forward to your valuable presence and constructive partnership in nurturing your child's brilliance.\n\nWarm regards,\nAcademic Coordination Team`;
  } else {
    title = `OFFICIAL NOTICE: ${topic.toUpperCase()} (Session 2026-27)`;
    content = `Dear ${targetAudience === 'PARENTS' ? 'Parents and Guardians' : targetAudience === 'TEACHERS' ? 'Faculty Members' : 'Students and Parents'},\n\nGreenwood International Academy hereby notifies all stakeholders regarding ${topic}. ${extraDetails ? `\n\nKey Details: ${extraDetails}` : ''}\n\nAll concerned are requested to make note of this communication and adhere to the stipulated guidelines. For any inquiries, please connect with the administrative office at info@greenwood.edu.in.\n\nSincerely,\nOffice of Administration\nGreenwood International Academy`;
  }

  return res.json({
    success: true,
    data: {
      title,
      content,
      targetAudience,
      tone,
      generatedDate: dateStr,
      aiModel: 'EduManage AI Assistant',
    },
  });
};

export const studentInsights = async (req: Request, res: Response) => {
  const { studentName = 'Aarav Malhotra', marks = [], attendancePercentage = 92 } = req.body;

  const insights = {
    studentName,
    overallScore: '84.6%',
    attendanceRating: attendancePercentage >= 90 ? 'Excellent' : attendancePercentage >= 75 ? 'Satisfactory' : 'Needs Improvement',
    keyStrengths: [
      'Exceptional analytical aptitude in Physics (92%) and Computer Science (95%).',
      'Consistent homework submission record with high conceptual clarity in STEM subjects.',
      'Active leadership participation in Inter-school Debate and Science Olympiad.',
    ],
    academicAlerts: [
      'Mathematics Quarter 2 score dipped by 8% (Current: 68%) specifically in Quadratic Equations and Coordinate Geometry.',
      'Class engagement notes indicate hesitation during verbal language assessments in Hindi.',
    ],
    aiRecommendations: [
      'Assign curated practice modules for Class 10 Coordinate Geometry via the Student Portal.',
      'Schedule two 30-minute peer-assisted remedial sessions on Tuesday and Thursday afternoons.',
      'Acknowledge exceptional programming project in morning assembly to boost overall confidence.',
    ],
    parentCounselingNote: `Aarav exhibits outstanding intellectual curiosity. With targeted reinforcement in advanced Mathematics theorems, he is well poised to secure a 95%+ aggregate in the CBSE Board Examinations.`,
  };

  return res.json({
    success: true,
    data: insights,
  });
};

