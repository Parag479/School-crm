/**
 * Comprehensive Mock Data Provider for Frontend Demo Mode (e.g. Vercel static hosting)
 * Allows full inspection of Admin Dashboard, Admission CRM, Students, Teachers, Fees, etc.
 */

export const mockDashboard = {
  stats: {
    totalStudents: 2450,
    systemStudentsCount: 120,
    totalTeachers: 145,
    totalStaff: 48,
    totalClasses: 14,
    newAdmissions: 312,
    totalAdmissionEnquiries: 84,
    presentStudentsToday: 2310,
    absentStudentsToday: 140,
    attendanceRateToday: '94.3%',
    totalFeesCollected: 8450000,
    totalFeesPending: 1230000,
  },
  charts: {
    monthlyAdmissions: [
      { month: 'Jun 2026', count: 18, enquiries: 45 },
      { month: 'Jul 2026', count: 24, enquiries: 52 },
      { month: 'Aug 2026', count: 12, enquiries: 31 },
      { month: 'Sep 2026', count: 9, enquiries: 28 },
      { month: 'Oct 2026', count: 15, enquiries: 39 },
      { month: 'Nov 2026', count: 22, enquiries: 48 },
    ],
    monthlyFeeCollection: [
      { month: 'May 2026', collected: 14.5, target: 15.0 },
      { month: 'Jun 2026', collected: 18.2, target: 18.0 },
      { month: 'Jul 2026', collected: 28.5, target: 30.0 },
      { month: 'Aug 2026', collected: 12.0, target: 14.0 },
      { month: 'Sep 2026', collected: 16.8, target: 17.5 },
      { month: 'Oct 2026', collected: 32.4, target: 35.0 },
    ],
    classDistribution: [
      { name: 'Pre-Primary', students: 280 },
      { name: 'Primary (1-5)', students: 740 },
      { name: 'Middle (6-8)', students: 590 },
      { name: 'Secondary (9-10)', students: 480 },
      { name: 'Sr Sec (11-12)', students: 360 },
    ],
    attendanceTrend: [
      { day: 'Mon', rate: 95.2 },
      { day: 'Tue', rate: 96.1 },
      { day: 'Wed', rate: 94.8 },
      { day: 'Thu', rate: 95.5 },
      { day: 'Fri', rate: 93.8 },
      { day: 'Sat', rate: 91.4 },
    ],
  },
  widgets: {
    recentEnquiries: [
      {
        id: 'adm-001',
        enquiryNumber: 'ENQ-2026-0042',
        studentName: 'Vihaan Sharma',
        parentName: 'Rajesh Sharma',
        phone: '+91 98112 34567',
        email: 'rajesh.sharma@example.com',
        applyingClass: 'Class 11 Science',
        status: 'NEW_ENQUIRY',
        source: 'WEBSITE',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'adm-002',
        enquiryNumber: 'ENQ-2026-0043',
        studentName: 'Ananya Deshmukh',
        parentName: 'Sanjay Deshmukh',
        phone: '+91 98223 45678',
        email: 'sanjay.d@example.com',
        applyingClass: 'Class 1',
        status: 'FOLLOW_UP',
        source: 'WHATSAPP',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'adm-003',
        enquiryNumber: 'ENQ-2026-0044',
        studentName: 'Kabir Mehta',
        parentName: 'Pooja Mehta',
        phone: '+91 98334 56789',
        email: 'pooja.mehta@example.com',
        applyingClass: 'Class 9',
        status: 'SCHOOL_VISIT',
        source: 'WALK_IN',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      },
    ],
    pendingInvoices: [
      {
        id: 'inv-001',
        invoiceNumber: 'INV-2026-0891',
        studentName: 'Arjun Verma',
        className: 'Class 10',
        sectionName: 'A',
        amount: 32000,
        balanceAmount: 16000,
        status: 'PARTIAL',
        dueDate: '2026-12-05',
      },
      {
        id: 'inv-002',
        invoiceNumber: 'INV-2026-0892',
        studentName: 'Rhea Sen',
        className: 'Class 8',
        sectionName: 'B',
        amount: 28000,
        balanceAmount: 28000,
        status: 'PENDING',
        dueDate: '2026-11-30',
      },
    ],
    upcomingExams: [
      { id: 'ex-1', title: 'Half-Yearly Summative Assessment 2026', startDate: '2026-12-08', endDate: '2026-12-20' },
      { id: 'ex-2', title: 'Pre-Board Examination I (Class 10 & 12)', startDate: '2027-01-12', endDate: '2027-01-25' },
    ],
    upcomingEvents: [
      { id: 'ev-1', title: 'Annual Inter-School Robotics & AI Conclave', date: '2026-11-28', location: 'Dr. Kalam Auditorium' },
      { id: 'ev-2', title: 'Annual Sports Day & Athletic Meet', date: '2026-12-15', location: 'Olympic Synthetic Arena' },
    ],
    recentNotices: [
      { id: 'nt-1', title: 'Winter Uniform Transition Advisory', date: '2026-11-15', target: 'All Parents' },
      { id: 'nt-2', title: 'CBSE Board Registration Verification (Class 10 & 12)', date: '2026-11-12', target: 'Secondary Section' },
    ],
  },
};

export const mockStudents = [
  {
    id: 'std-001',
    admissionNumber: 'GIA-2024-0104',
    rollNumber: '101',
    firstName: 'Aarav',
    lastName: 'Sharma',
    name: 'Aarav Sharma',
    dateOfBirth: '2011-04-14',
    gender: 'MALE',
    bloodGroup: 'B+',
    status: 'ACTIVE',
    class: { id: 'cls-10', name: 'Class 10', code: '10' },
    section: { id: 'sec-10a', name: 'A' },
    fatherName: 'Dr. Rajesh Sharma',
    fatherPhone: '+91 98112 34567',
    motherName: 'Sunita Sharma',
    address: 'B-42, Sector 14, Noida, UP',
    emergencyContact: '+91 98112 34567',
    attendancePercent: 96.5,
    feesStatus: 'CLEARED',
  },
  {
    id: 'std-002',
    admissionNumber: 'GIA-2024-0105',
    rollNumber: '102',
    firstName: 'Ananya',
    lastName: 'Deshmukh',
    name: 'Ananya Deshmukh',
    dateOfBirth: '2011-07-22',
    gender: 'FEMALE',
    bloodGroup: 'O+',
    status: 'ACTIVE',
    class: { id: 'cls-10', name: 'Class 10', code: '10' },
    section: { id: 'sec-10a', name: 'A' },
    fatherName: 'Sanjay Deshmukh',
    fatherPhone: '+91 98223 45678',
    motherName: 'Priya Deshmukh',
    address: 'Flat 402, Royal Palms, Greater Noida',
    emergencyContact: '+91 98223 45678',
    attendancePercent: 98.2,
    feesStatus: 'CLEARED',
  },
  {
    id: 'std-003',
    admissionNumber: 'GIA-2023-0891',
    rollNumber: '103',
    firstName: 'Rohan',
    lastName: 'Kapoor',
    name: 'Rohan Kapoor',
    dateOfBirth: '2011-09-05',
    gender: 'MALE',
    bloodGroup: 'A+',
    status: 'ACTIVE',
    class: { id: 'cls-10', name: 'Class 10', code: '10' },
    section: { id: 'sec-10a', name: 'A' },
    fatherName: 'Alok Kapoor',
    fatherPhone: '+91 98445 67890',
    motherName: 'Ritu Kapoor',
    address: 'C-12, Express Greens, Sector 78',
    emergencyContact: '+91 98445 67890',
    attendancePercent: 92.0,
    feesStatus: 'PENDING',
  },
];

export const mockTeachers = [
  {
    id: 'tch-001',
    employeeCode: 'FAC-2018-042',
    firstName: 'Dr. Rajesh',
    lastName: 'Verma',
    name: 'Dr. Rajesh Verma',
    designation: 'Head of Department - Physics & Astronomy',
    qualification: 'Ph.D. in Experimental Physics (IIT Delhi)',
    experienceYears: 18,
    department: 'Science & Robotics',
    email: 'rajesh.verma@greenwood.edu.in',
    phone: '+91 98101 23456',
    status: 'ACTIVE',
    classesHandled: ['Class 11 Science', 'Class 12 Science'],
  },
  {
    id: 'tch-002',
    employeeCode: 'FAC-2020-089',
    firstName: 'Meenakshi',
    lastName: 'Sundaram',
    name: 'Meenakshi Sundaram',
    designation: 'Senior PGT Mathematics & Vedic Math Coordinator',
    qualification: 'M.Sc. Mathematics (Delhi University), B.Ed.',
    experienceYears: 14,
    department: 'Mathematics',
    email: 'meenakshi.s@greenwood.edu.in',
    phone: '+91 98202 34567',
    status: 'ACTIVE',
    classesHandled: ['Class 10-A', 'Class 10-B', 'Class 12-A'],
  },
];

export const mockAdmissions = [
  {
    id: 'adm-101',
    enquiryNumber: 'ENQ-2026-0042',
    studentName: 'Vihaan Sharma',
    dateOfBirth: '2010-06-12',
    gender: 'MALE',
    parentName: 'Dr. Rajesh Sharma',
    phone: '+91 98112 34567',
    email: 'rajesh.sharma@example.com',
    applyingClass: 'Class 11 Science',
    status: 'NEW_ENQUIRY',
    source: 'WEBSITE',
    createdAt: new Date().toISOString(),
    assignedCounselor: 'Sunita Rao',
  },
  {
    id: 'adm-102',
    enquiryNumber: 'ENQ-2026-0043',
    studentName: 'Ananya Deshmukh',
    dateOfBirth: '2020-03-18',
    gender: 'FEMALE',
    parentName: 'Sanjay Deshmukh',
    phone: '+91 98223 45678',
    email: 'sanjay.d@example.com',
    applyingClass: 'Pre-Nursery',
    status: 'FOLLOW_UP',
    source: 'WHATSAPP',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    assignedCounselor: 'Vikram Joshi',
  },
  {
    id: 'adm-103',
    enquiryNumber: 'ENQ-2026-0044',
    studentName: 'Aarav Mehta',
    dateOfBirth: '2012-09-25',
    gender: 'MALE',
    parentName: 'Pooja Mehta',
    phone: '+91 98334 56789',
    email: 'pooja.mehta@example.com',
    applyingClass: 'Class 9',
    status: 'SCHOOL_VISIT',
    source: 'WALK_IN',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    assignedCounselor: 'Sunita Rao',
  },
];

export const mockClasses = [
  { id: 'cls-1', name: 'Class 1', sections: ['A', 'B', 'C'], studentCount: 72, classTeacher: 'Priya Nambiar' },
  { id: 'cls-9', name: 'Class 9', sections: ['A', 'B', 'C', 'D'], studentCount: 96, classTeacher: 'Amit Saxena' },
  { id: 'cls-10', name: 'Class 10', sections: ['A', 'B', 'C'], studentCount: 84, classTeacher: 'Meenakshi Sundaram' },
  { id: 'cls-11', name: 'Class 11', sections: ['Science', 'Commerce', 'Humanities'], studentCount: 90, classTeacher: 'Dr. Rajesh Verma' },
  { id: 'cls-12', name: 'Class 12', sections: ['Science', 'Commerce', 'Humanities'], studentCount: 88, classTeacher: 'Anuradha Sen' },
];

export const mockFeesInvoices = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-001',
    studentName: 'Aarav Sharma',
    admissionNumber: 'GIA-2024-0104',
    className: 'Class 10-A',
    totalAmount: 48000,
    paidAmount: 48000,
    balanceAmount: 0,
    status: 'PAID',
    dueDate: '2026-10-15',
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-002',
    studentName: 'Rohan Kapoor',
    admissionNumber: 'GIA-2023-0891',
    className: 'Class 10-A',
    totalAmount: 48000,
    paidAmount: 24000,
    balanceAmount: 24000,
    status: 'PARTIAL',
    dueDate: '2026-11-30',
  },
];

export function getMockResponse(url: string = '', method: string = 'GET', data?: any): any {
  const cleanUrl = url.replace(/^\/api\/v1/, '').split('?')[0];

  // Auth Login
  if (cleanUrl.includes('/auth/login') || cleanUrl.includes('/auth')) {
    const email = data?.email || 'admin@greenwood.edu.in';
    let role = 'ADMIN';
    let name = 'Administrator (Dr. Sunita Sharma)';
    if (email.includes('teacher')) {
      role = 'TEACHER';
      name = 'Dr. Rajesh Verma (Physics HOD)';
    } else if (email.includes('parent')) {
      role = 'PARENT';
      name = 'Vikram Malhotra (Parent of Vivaan)';
    } else if (email.includes('student')) {
      role = 'STUDENT';
      name = 'Aarav Sharma (Class 10-A)';
    } else if (email.includes('accountant')) {
      role = 'ACCOUNTANT';
      name = 'Ramesh Kumar (Chief Accountant)';
    }
    return {
      success: true,
      data: {
        accessToken: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token',
        user: {
          id: 'usr-mock-' + Date.now(),
          email,
          name,
          role,
          schoolId: 'school-greenwood-001',
          schoolName: 'Greenwood International Academy',
        },
      },
    };
  }

  // Dashboard
  if (cleanUrl.includes('/dashboard')) {
    return { success: true, data: mockDashboard };
  }

  // Students
  if (cleanUrl.includes('/students')) {
    return { success: true, data: { students: mockStudents, total: mockStudents.length } };
  }

  // Teachers
  if (cleanUrl.includes('/teachers')) {
    return { success: true, data: { teachers: mockTeachers, total: mockTeachers.length } };
  }

  // Admissions
  if (cleanUrl.includes('/admissions') || cleanUrl.includes('/admission')) {
    return { success: true, data: { admissions: mockAdmissions, total: mockAdmissions.length } };
  }

  // Classes
  if (cleanUrl.includes('/classes') || cleanUrl.includes('/academic/classes')) {
    return { success: true, data: { classes: mockClasses, total: mockClasses.length } };
  }

  // Fees
  if (cleanUrl.includes('/fees') || cleanUrl.includes('/fee')) {
    return { success: true, data: { invoices: mockFeesInvoices, total: mockFeesInvoices.length } };
  }

  // AI Summary
  if (cleanUrl.includes('/ai/executive-summary')) {
    return {
      success: true,
      data: {
        schoolName: 'Greenwood International Academy',
        mode: 'AI_EXECUTIVE_AGENT',
        highlights: [
          'Admission Momentum: Inbound enquiries surging 24% month-on-month with 78% conversion to school visits.',
          'Fee Collection Realization: ₹84.50 Lakhs collected to date. Current collection efficiency at 92.4%.',
          'Attendance Integrity: 94.3% average student attendance this week with 0 unexcused teacher absences.',
        ],
        riskAlerts: [
          '5 new website admission enquiries awaiting counselor follow-up within 24h SLA.',
          'Class 9-B and 10-A have 14 overdue fee reminders pending term exam roll-number dispatch.',
        ],
        actionRecommendations: [
          'Trigger automated WhatsApp fee reminder blast to pending guardians prior to next installment cutoff.',
          'Schedule Principal Open House webinar this Saturday for prospective Class 11 Science/Commerce parents.',
        ],
      },
    };
  }

  // Default fallback for any other entity
  return { success: true, data: [] };
}

