import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger.js';

export interface DBStore {
  schools: any[];
  academicYears: any[];
  users: any[];
  departments: any[];
  classes: any[];
  sections: any[];
  subjects: any[];
  teachers: any[];
  staff: any[];
  students: any[];
  parents: any[];
  studentParents: any[];
  studentDocuments: any[];
  admissions: any[];
  admissionFollowups: any[];
  attendanceSessions: any[];
  attendanceRecords: any[];
  feeCategories: any[];
  feeStructures: any[];
  invoices: any[];
  payments: any[];
  paymentTransactions: any[];
  examinations: any[];
  examSubjects: any[];
  marks: any[];
  timetables: any[];
  homeworks: any[];
  homeworkSubmissions: any[];
  libraryBooks: any[];
  bookIssues: any[];
  vehicles: any[];
  drivers: any[];
  transportRoutes: any[];
  transportAllocations: any[];
  notices: any[];
  events: any[];
  news: any[];
  galleries: any[];
  websitePages: any[];
  auditLogs: any[];
}

const DEFAULT_SCHOOL_ID = 'school-greenwood-001';

class DatabaseService {
  public store: DBStore = {
    schools: [],
    academicYears: [],
    users: [],
    departments: [],
    classes: [],
    sections: [],
    subjects: [],
    teachers: [],
    staff: [],
    students: [],
    parents: [],
    studentParents: [],
    studentDocuments: [],
    admissions: [],
    admissionFollowups: [],
    attendanceSessions: [],
    attendanceRecords: [],
    feeCategories: [],
    feeStructures: [],
    invoices: [],
    payments: [],
    paymentTransactions: [],
    examinations: [],
    examSubjects: [],
    marks: [],
    timetables: [],
    homeworks: [],
    homeworkSubmissions: [],
    libraryBooks: [],
    bookIssues: [],
    vehicles: [],
    drivers: [],
    transportRoutes: [],
    transportAllocations: [],
    notices: [],
    events: [],
    news: [],
    galleries: [],
    websitePages: [],
    auditLogs: [],
  };

  private initialized = false;

  constructor() {
    this.seedInitialData();
  }

  public async seedInitialData() {
    if (this.initialized) return;

    logger.info('Initializing EduManage in-memory repository with comprehensive Indian School dataset...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedTeacherPassword = await bcrypt.hash('teacher123', 10);
    const hashedParentPassword = await bcrypt.hash('parent123', 10);
    const hashedStudentPassword = await bcrypt.hash('student123', 10);
    const hashedAccountantPassword = await bcrypt.hash('accountant123', 10);

    // 1. School
    const school = {
      id: DEFAULT_SCHOOL_ID,
      name: 'Greenwood International Academy',
      slug: 'greenwood-international',
      code: 'GIA-DEL-042',
      affiliationNumber: 'CBSE/AFF/2130842',
      board: 'CBSE',
      address: 'Plot 14, Institutional Area, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201309',
      phone: '+91 120 4589200',
      email: 'admissions@greenwood.edu.in',
      website: 'https://greenwood.edu.in',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=200',
      principalName: 'Dr. Sunita Sharma (Ph.D., M.Ed.)',
      principalMessage:
        'Welcome to Greenwood International Academy. For over 25 years, our mission has been to nurture critical thinkers, compassionate leaders, and lifelong learners equipped for a dynamic global landscape.',
      establishedYear: 1998,
      currency: 'INR',
      currencySymbol: '₹',
      activeAcademicYearId: 'ay-2026-2027',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.store.schools.push(school);

    // 2. Academic Years
    const academicYears = [
      {
        id: 'ay-2025-2026',
        schoolId: DEFAULT_SCHOOL_ID,
        name: '2025-2026',
        startDate: '2025-04-01',
        endDate: '2026-03-31',
        isCurrent: false,
      },
      {
        id: 'ay-2026-2027',
        schoolId: DEFAULT_SCHOOL_ID,
        name: '2026-2027',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        isCurrent: true,
      },
    ];
    this.store.academicYears.push(...academicYears);

    // 3. Users
    const users = [
      {
        id: 'usr-admin-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Dr. Sunita Sharma (Admin)',
        email: 'admin@greenwood.edu.in',
        passwordHash: hashedAdminPassword,
        phone: '+91 9810112233',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-teacher-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Dr. Rajesh Verma',
        email: 'teacher@greenwood.edu.in',
        passwordHash: hashedTeacherPassword,
        phone: '+91 9820223344',
        role: 'TEACHER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-parent-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Vikram Malhotra',
        email: 'parent@greenwood.edu.in',
        passwordHash: hashedParentPassword,
        phone: '+91 9830334455',
        role: 'PARENT',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-student-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Aarav Malhotra',
        email: 'student@greenwood.edu.in',
        passwordHash: hashedStudentPassword,
        phone: '+91 9840445566',
        role: 'STUDENT',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-accountant-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Ramesh Chandra',
        email: 'accountant@greenwood.edu.in',
        passwordHash: hashedAccountantPassword,
        phone: '+91 9850556677',
        role: 'ACCOUNTANT',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-admissions-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Pooja Singhania (Admissions Head)',
        email: 'admissions@greenwood.edu.in',
        passwordHash: hashedAdminPassword,
        phone: '+91 9860667788',
        role: 'ADMISSION_OFFICER',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-superadmin-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Executive Trustee (Super Admin)',
        email: 'superadmin@greenwood.edu.in',
        passwordHash: hashedAdminPassword,
        phone: '+91 9811122233',
        role: 'SUPER_ADMIN',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-principal-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Dr. Sunita Sharma (Principal)',
        email: 'principal@greenwood.edu.in',
        passwordHash: hashedAdminPassword,
        phone: '+91 9810112233',
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr-reception-001',
        schoolId: DEFAULT_SCHOOL_ID,
        name: 'Sunita Mehra (Reception Desk)',
        email: 'receptionist@greenwood.edu.in',
        passwordHash: hashedAdminPassword,
        phone: '+91 9870778899',
        role: 'ADMISSION_OFFICER',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    ];
    this.store.users.push(...users);

    // 4. Departments
    const departments = [
      { id: 'dept-01', schoolId: DEFAULT_SCHOOL_ID, name: 'Mathematics', headName: 'Dr. Rajesh Verma' },
      { id: 'dept-02', schoolId: DEFAULT_SCHOOL_ID, name: 'Science & Technology', headName: 'Mrs. Anita Deshmukh' },
      { id: 'dept-03', schoolId: DEFAULT_SCHOOL_ID, name: 'Languages & Humanities', headName: 'Mr. Arvind Saxena' },
      { id: 'dept-04', schoolId: DEFAULT_SCHOOL_ID, name: 'Physical Education & Sports', headName: 'Coach Baljit Singh' },
      { id: 'dept-05', schoolId: DEFAULT_SCHOOL_ID, name: 'Commerce & Economics', headName: 'Mrs. Neha Bansal' },
    ];
    this.store.departments.push(...departments);

    // 5. Classes & Sections
    const classNames = [
      'Pre-KG', 'LKG', 'UKG',
      'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
      'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
      'Class 11 - Science', 'Class 11 - Commerce', 'Class 12 - Science', 'Class 12 - Commerce',
    ];

    classNames.forEach((name, idx) => {
      const classId = `class-${idx + 1}`;
      this.store.classes.push({
        id: classId,
        schoolId: DEFAULT_SCHOOL_ID,
        name,
        numericOrder: idx + 1,
      });

      // 2 Sections per class: A and B
      ['A', 'B'].forEach((secName) => {
        this.store.sections.push({
          id: `sec-${classId}-${secName.toLowerCase()}`,
          classId,
          name: secName,
          classTeacherId: idx === 12 && secName === 'A' ? 'tch-001' : undefined,
          roomNumber: `Block A, Room ${101 + idx}`,
          capacity: 40,
        });
      });
    });

    // 6. Subjects for Class 10 (idx 12)
    const subjectsClass10 = [
      { id: 'subj-10-math', schoolId: DEFAULT_SCHOOL_ID, classId: 'class-13', name: 'Mathematics (Standard)', code: 'MATH-041', type: 'THEORY', teacherId: 'tch-001', teacherName: 'Dr. Rajesh Verma' },
      { id: 'subj-10-sci', schoolId: DEFAULT_SCHOOL_ID, classId: 'class-13', name: 'Science', code: 'SCI-086', type: 'BOTH', teacherId: 'tch-002', teacherName: 'Mrs. Anita Deshmukh' },
      { id: 'subj-10-eng', schoolId: DEFAULT_SCHOOL_ID, classId: 'class-13', name: 'English Language & Lit', code: 'ENG-184', type: 'THEORY', teacherId: 'tch-003', teacherName: 'Mr. Arvind Saxena' },
      { id: 'subj-10-sst', schoolId: DEFAULT_SCHOOL_ID, classId: 'class-13', name: 'Social Science', code: 'SST-087', type: 'THEORY', teacherId: 'tch-004', teacherName: 'Mrs. Kavita Roy' },
      { id: 'subj-10-cs', schoolId: DEFAULT_SCHOOL_ID, classId: 'class-13', name: 'Artificial Intelligence & IT', code: 'AI-417', type: 'PRACTICAL', teacherId: 'tch-005', teacherName: 'Mr. Sameer Sen' },
    ];
    this.store.subjects.push(...subjectsClass10);

    // 7. Teachers
    const teachers = [
      {
        id: 'tch-001',
        schoolId: DEFAULT_SCHOOL_ID,
        userId: 'usr-teacher-001',
        employeeId: 'EMP-TCH-101',
        firstName: 'Rajesh',
        lastName: 'Verma',
        fullName: 'Dr. Rajesh Verma',
        email: 'teacher@greenwood.edu.in',
        phone: '+91 9820223344',
        gender: 'MALE',
        dateOfBirth: '1982-05-14',
        joiningDate: '2015-06-01',
        designation: 'Senior PGT Mathematics & HOD',
        qualification: 'M.Sc., B.Ed., Ph.D. (Applied Mathematics)',
        experienceYears: 14,
        departmentId: 'dept-01',
        departmentName: 'Mathematics',
        address: 'B-402, Prateek Fedora, Sector 120, Noida',
        salary: 85000,
        status: 'ACTIVE',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: 'tch-002',
        schoolId: DEFAULT_SCHOOL_ID,
        employeeId: 'EMP-TCH-102',
        firstName: 'Anita',
        lastName: 'Deshmukh',
        fullName: 'Mrs. Anita Deshmukh',
        email: 'anita.deshmukh@greenwood.edu.in',
        phone: '+91 9820223355',
        gender: 'FEMALE',
        dateOfBirth: '1985-09-22',
        joiningDate: '2017-07-15',
        designation: 'PGT Science & Chemistry',
        qualification: 'M.Sc. (Chemistry), B.Ed.',
        experienceYears: 11,
        departmentId: 'dept-02',
        departmentName: 'Science & Technology',
        address: 'Flat 604, Supertech Capetown, Noida',
        salary: 75000,
        status: 'ACTIVE',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
      },
      {
        id: 'tch-003',
        schoolId: DEFAULT_SCHOOL_ID,
        employeeId: 'EMP-TCH-103',
        firstName: 'Arvind',
        lastName: 'Saxena',
        fullName: 'Mr. Arvind Saxena',
        email: 'arvind.saxena@greenwood.edu.in',
        phone: '+91 9820223366',
        gender: 'MALE',
        dateOfBirth: '1980-03-11',
        joiningDate: '2012-04-10',
        designation: 'Senior TGT English',
        qualification: 'M.A. (English Lit), B.Ed.',
        experienceYears: 16,
        departmentId: 'dept-03',
        departmentName: 'Languages & Humanities',
        address: 'C-12, Sector 50, Noida',
        salary: 72000,
        status: 'ACTIVE',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
      },
    ];
    this.store.teachers.push(...teachers);

    // 8. Staff
    this.store.staff.push(
      {
        id: 'stf-001',
        schoolId: DEFAULT_SCHOOL_ID,
        employeeId: 'EMP-ADM-201',
        firstName: 'Ramesh',
        lastName: 'Chandra',
        fullName: 'Mr. Ramesh Chandra',
        email: 'accountant@greenwood.edu.in',
        phone: '+91 9850556677',
        department: 'Finance & Accounts',
        designation: 'Chief Accounts Officer',
        joiningDate: '2014-08-01',
        status: 'ACTIVE',
      },
      {
        id: 'stf-002',
        schoolId: DEFAULT_SCHOOL_ID,
        employeeId: 'EMP-ADM-202',
        firstName: 'Pooja',
        lastName: 'Singhania',
        fullName: 'Mrs. Pooja Singhania',
        email: 'admissions@greenwood.edu.in',
        phone: '+91 9860667788',
        department: 'Admissions & CRM',
        designation: 'Senior Admission Counselor',
        joiningDate: '2019-03-15',
        status: 'ACTIVE',
      }
    );

    // 9. Parents
    const parent1 = {
      id: 'par-001',
      schoolId: DEFAULT_SCHOOL_ID,
      userId: 'usr-parent-001',
      fatherName: 'Vikram Malhotra',
      fatherOccupation: 'Vice President, Infosys Ltd.',
      fatherPhone: '+91 9830334455',
      fatherEmail: 'parent@greenwood.edu.in',
      motherName: 'Ritu Malhotra',
      motherOccupation: 'Architect & Interior Designer',
      motherPhone: '+91 9830334456',
      motherEmail: 'ritu.malhotra@gmail.com',
      address: 'Tower 4, Apt 1102, ATS Greens Village, Sector 93A, Noida',
      createdAt: new Date().toISOString(),
    };
    this.store.parents.push(parent1);

    // 10. Students
    const student1 = {
      id: 'stu-001',
      schoolId: DEFAULT_SCHOOL_ID,
      userId: 'usr-student-001',
      admissionNumber: 'GIA-2026-001',
      rollNumber: '101',
      firstName: 'Aarav',
      lastName: 'Malhotra',
      fullName: 'Aarav Malhotra',
      dateOfBirth: '2010-08-16',
      gender: 'MALE',
      bloodGroup: 'B+',
      category: 'General',
      religion: 'Hindu',
      email: 'student@greenwood.edu.in',
      phone: '+91 9840445566',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      address: 'Tower 4, Apt 1102, ATS Greens Village, Sector 93A',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304',
      classId: 'class-13', // Class 10
      className: 'Class 10',
      sectionId: 'sec-class-13-a',
      sectionName: 'A',
      academicYearId: 'ay-2026-2027',
      admissionDate: '2018-04-02',
      status: 'ACTIVE',
      attendancePercentage: 94.2,
      totalPendingFees: 12500,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const student2 = {
      id: 'stu-002',
      schoolId: DEFAULT_SCHOOL_ID,
      admissionNumber: 'GIA-2026-002',
      rollNumber: '102',
      firstName: 'Ananya',
      lastName: 'Malhotra',
      fullName: 'Ananya Malhotra',
      dateOfBirth: '2014-11-05',
      gender: 'FEMALE',
      bloodGroup: 'O+',
      category: 'General',
      religion: 'Hindu',
      email: 'ananya.m@student.greenwood.edu.in',
      phone: '+91 9830334455',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      address: 'Tower 4, Apt 1102, ATS Greens Village, Sector 93A',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201304',
      classId: 'class-8', // Class 6
      className: 'Class 6',
      sectionId: 'sec-class-8-a',
      sectionName: 'A',
      academicYearId: 'ay-2026-2027',
      admissionDate: '2020-04-01',
      status: 'ACTIVE',
      attendancePercentage: 96.5,
      totalPendingFees: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const student3 = {
      id: 'stu-003',
      schoolId: DEFAULT_SCHOOL_ID,
      admissionNumber: 'GIA-2026-003',
      rollNumber: '103',
      firstName: 'Rohan',
      lastName: 'Gupta',
      fullName: 'Rohan Gupta',
      dateOfBirth: '2010-04-12',
      gender: 'MALE',
      bloodGroup: 'A+',
      category: 'OBC',
      religion: 'Hindu',
      email: 'rohan.gupta@student.greenwood.edu.in',
      phone: '+91 9911223344',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      address: 'House 88, Sector 44',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      classId: 'class-13',
      className: 'Class 10',
      sectionId: 'sec-class-13-a',
      sectionName: 'A',
      academicYearId: 'ay-2026-2027',
      admissionDate: '2019-04-05',
      status: 'ACTIVE',
      attendancePercentage: 88.0,
      totalPendingFees: 24000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const student4 = {
      id: 'stu-004',
      schoolId: DEFAULT_SCHOOL_ID,
      admissionNumber: 'GIA-2026-004',
      rollNumber: '104',
      firstName: 'Diya',
      lastName: 'Kapur',
      fullName: 'Diya Kapur',
      dateOfBirth: '2010-09-25',
      gender: 'FEMALE',
      bloodGroup: 'AB+',
      category: 'General',
      religion: 'Sikh',
      email: 'diya.k@student.greenwood.edu.in',
      phone: '+91 9811882233',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      address: 'Villa 19, Jaypee Greens, Greater Noida',
      city: 'Greater Noida',
      state: 'Uttar Pradesh',
      pincode: '201310',
      classId: 'class-13',
      className: 'Class 10',
      sectionId: 'sec-class-13-a',
      sectionName: 'A',
      academicYearId: 'ay-2026-2027',
      admissionDate: '2018-04-02',
      status: 'ACTIVE',
      attendancePercentage: 98.0,
      totalPendingFees: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.store.students.push(student1, student2, student3, student4);

    // Parent to Student mapping
    this.store.studentParents.push(
      { id: 'sp-01', studentId: 'stu-001', parentId: 'par-001', relationship: 'FATHER' },
      { id: 'sp-02', studentId: 'stu-002', parentId: 'par-001', relationship: 'FATHER' }
    );

    // 11. Admission CRM Pipeline Leads
    const admissions = [
      {
        id: 'adm-001',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1001',
        studentName: 'Vihaan Sharma',
        dateOfBirth: '2012-05-18',
        gender: 'MALE',
        parentName: 'Alok Sharma',
        phone: '9810554433',
        email: 'alok.sharma@tcs.com',
        currentSchool: 'Delhi Public School, Indirapuram',
        applyingClass: 'Class 9',
        address: 'Sector 55, Noida',
        message: 'Looking for admission for academic year 2026-27 in Class 9 CBSE curriculum with swimming facility.',
        status: 'NEW_ENQUIRY',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-06',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-002',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1002',
        studentName: 'Ishaan Aggarwal',
        dateOfBirth: '2015-09-12',
        gender: 'MALE',
        parentName: 'Manoj Aggarwal',
        phone: '9811223399',
        email: 'manoj.aggarwal@gmail.com',
        currentSchool: 'Modern School Barakhamba',
        applyingClass: 'Class 6',
        address: 'Sector 15A, Noida',
        message: 'Family relocated from Central Delhi to Noida. Need transfer admission.',
        status: 'CONTACTED',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-08',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-003',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1003',
        studentName: 'Myra Sen',
        dateOfBirth: '2020-02-14',
        gender: 'FEMALE',
        parentName: 'Subhash Sen',
        phone: '9871122334',
        email: 'subhash.sen@wipro.com',
        currentSchool: 'EuroKids Pre-school',
        applyingClass: 'Class 1',
        address: 'Sector 78, Noida',
        message: 'Enquiring for Grade 1. Interested in the Cambridge Primary Activity module.',
        status: 'FOLLOW_UP',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-05',
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-004',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1004',
        studentName: 'Samaira Rao',
        dateOfBirth: '2018-07-21',
        gender: 'FEMALE',
        parentName: 'Kishore Rao',
        phone: '9810887766',
        email: 'kishore.rao@gmail.com',
        currentSchool: 'Step by Step School',
        applyingClass: 'Class 3',
        address: 'Sector 137, Noida',
        message: 'Campus visit requested for Saturday 11 AM.',
        status: 'SCHOOL_VISIT',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-07',
        createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-005',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1005',
        studentName: 'Kabir Mehta',
        dateOfBirth: '2010-01-30',
        gender: 'MALE',
        parentName: 'Gaurav Mehta',
        phone: '9910223344',
        email: 'gaurav.mehta@hcl.com',
        currentSchool: 'Apeejay School Noida',
        applyingClass: 'Class 11 - Science',
        address: 'Sector 40, Noida',
        message: 'Application form submitted along with Class 10 Pre-board marksheet.',
        status: 'APPLICATION_SUBMITTED',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-10',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-006',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1006',
        studentName: 'Zoya Khan',
        dateOfBirth: '2011-06-15',
        gender: 'FEMALE',
        parentName: 'Tariq Khan',
        phone: '9818334455',
        email: 'tariq.khan@outlook.com',
        currentSchool: 'Somerville School',
        applyingClass: 'Class 10',
        address: 'Sector 29, Noida',
        message: 'Transfer certificate and previous marksheets under verification.',
        status: 'DOCUMENT_VERIFICATION',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-06',
        createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'adm-007',
        schoolId: DEFAULT_SCHOOL_ID,
        enquiryNumber: 'ENQ-2026-1007',
        studentName: 'Tanvi Joshi',
        dateOfBirth: '2019-12-04',
        gender: 'FEMALE',
        parentName: 'Deepak Joshi',
        phone: '9810998877',
        email: 'deepak.joshi@accenture.com',
        currentSchool: 'Amity Global',
        applyingClass: 'Class 2',
        address: 'Sector 128, Noida',
        message: 'Admission approved by Principal. Fee payment awaited.',
        status: 'APPROVED',
        assignedOfficerId: 'usr-admissions-001',
        assignedOfficerName: 'Pooja Singhania',
        followUpDate: '2026-11-08',
        createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    this.store.admissions.push(...admissions);

    // 12. Fee Categories & Structure
    const feeCategories = [
      { id: 'fcat-01', schoolId: DEFAULT_SCHOOL_ID, name: 'Tuition Fee', description: 'Regular academic classroom instruction & lab facilities' },
      { id: 'fcat-02', schoolId: DEFAULT_SCHOOL_ID, name: 'Admission Fee', description: 'One-time registration and admission processing fee' },
      { id: 'fcat-03', schoolId: DEFAULT_SCHOOL_ID, name: 'Transport Fee', description: 'School bus pick-and-drop service' },
      { id: 'fcat-04', schoolId: DEFAULT_SCHOOL_ID, name: 'Examination & Assessment', description: 'CBSE board registration, exam materials, and report generation' },
      { id: 'fcat-05', schoolId: DEFAULT_SCHOOL_ID, name: 'Annual Development Charges', description: 'Smart class infrastructure, robotics, sports facilities' },
    ];
    this.store.feeCategories.push(...feeCategories);

    const feeStructures = [
      { id: 'fstr-01', schoolId: DEFAULT_SCHOOL_ID, academicYearId: 'ay-2026-2027', classId: 'class-13', categoryId: 'fcat-01', title: 'Q1 Tuition Fee (Class 10)', amount: 24000, frequency: 'QUARTERLY', dueDate: '2026-04-15' },
      { id: 'fstr-02', schoolId: DEFAULT_SCHOOL_ID, academicYearId: 'ay-2026-2027', classId: 'class-13', categoryId: 'fcat-01', title: 'Q2 Tuition Fee (Class 10)', amount: 24000, frequency: 'QUARTERLY', dueDate: '2026-07-15' },
      { id: 'fstr-03', schoolId: DEFAULT_SCHOOL_ID, academicYearId: 'ay-2026-2027', classId: 'class-13', categoryId: 'fcat-01', title: 'Q3 Tuition Fee (Class 10)', amount: 24000, frequency: 'QUARTERLY', dueDate: '2026-10-15' },
      { id: 'fstr-04', schoolId: DEFAULT_SCHOOL_ID, academicYearId: 'ay-2026-2027', classId: 'class-13', categoryId: 'fcat-01', title: 'Q4 Tuition Fee (Class 10)', amount: 24000, frequency: 'QUARTERLY', dueDate: '2027-01-15' },
      { id: 'fstr-05', schoolId: DEFAULT_SCHOOL_ID, academicYearId: 'ay-2026-2027', classId: 'class-13', categoryId: 'fcat-03', title: 'Quarterly Transport Fee (Zone A)', amount: 7500, frequency: 'QUARTERLY', dueDate: '2026-10-15' },
    ];
    this.store.feeStructures.push(...feeStructures);

    // Invoices for Aarav Malhotra
    const invoices = [
      {
        id: 'inv-001',
        schoolId: DEFAULT_SCHOOL_ID,
        invoiceNumber: 'INV-2026-1001',
        studentId: 'stu-001',
        studentName: 'Aarav Malhotra',
        admissionNumber: 'GIA-2026-001',
        className: 'Class 10',
        sectionName: 'A',
        academicYearId: 'ay-2026-2027',
        totalAmount: 31500,
        paidAmount: 31500,
        balanceAmount: 0,
        discountAmount: 0,
        lateFee: 0,
        status: 'PAID',
        dueDate: '2026-04-15',
        issuedDate: '2026-04-01',
        items: [
          { id: 'item-01', invoiceId: 'inv-001', title: 'Q1 Tuition Fee', amount: 24000, category: 'TUITION' },
          { id: 'item-02', invoiceId: 'inv-001', title: 'Q1 Transport Fee (Zone A)', amount: 7500, category: 'TRANSPORT' },
        ],
        payments: [
          {
            id: 'pay-001',
            schoolId: DEFAULT_SCHOOL_ID,
            receiptNumber: 'RCP-2026-0081',
            invoiceId: 'inv-001',
            studentId: 'stu-001',
            amount: 31500,
            paymentMode: 'RAZORPAY',
            transactionReference: 'pay_Nq28aZbH891Jkx',
            razorpayPaymentId: 'pay_Nq28aZbH891Jkx',
            razorpayOrderId: 'order_Nq26wQmZ789abc',
            status: 'SUCCESS',
            paidAt: '2026-04-10T11:20:00Z',
          },
        ],
      },
      {
        id: 'inv-002',
        schoolId: DEFAULT_SCHOOL_ID,
        invoiceNumber: 'INV-2026-1002',
        studentId: 'stu-001',
        studentName: 'Aarav Malhotra',
        admissionNumber: 'GIA-2026-001',
        className: 'Class 10',
        sectionName: 'A',
        academicYearId: 'ay-2026-2027',
        totalAmount: 31500,
        paidAmount: 31500,
        balanceAmount: 0,
        discountAmount: 0,
        lateFee: 0,
        status: 'PAID',
        dueDate: '2026-07-15',
        issuedDate: '2026-07-01',
        items: [
          { id: 'item-03', invoiceId: 'inv-002', title: 'Q2 Tuition Fee', amount: 24000, category: 'TUITION' },
          { id: 'item-04', invoiceId: 'inv-002', title: 'Q2 Transport Fee (Zone A)', amount: 7500, category: 'TRANSPORT' },
        ],
        payments: [
          {
            id: 'pay-002',
            schoolId: DEFAULT_SCHOOL_ID,
            receiptNumber: 'RCP-2026-0154',
            invoiceId: 'inv-002',
            studentId: 'stu-001',
            amount: 31500,
            paymentMode: 'UPI',
            transactionReference: 'UPI-HDFC-99882211',
            status: 'SUCCESS',
            paidAt: '2026-07-12T14:45:00Z',
          },
        ],
      },
      {
        id: 'inv-003',
        schoolId: DEFAULT_SCHOOL_ID,
        invoiceNumber: 'INV-2026-1003',
        studentId: 'stu-001',
        studentName: 'Aarav Malhotra',
        admissionNumber: 'GIA-2026-001',
        className: 'Class 10',
        sectionName: 'A',
        academicYearId: 'ay-2026-2027',
        totalAmount: 31500,
        paidAmount: 19000,
        balanceAmount: 12500,
        discountAmount: 0,
        lateFee: 0,
        status: 'PARTIAL',
        dueDate: '2026-10-15',
        issuedDate: '2026-10-01',
        items: [
          { id: 'item-05', invoiceId: 'inv-003', title: 'Q3 Tuition Fee', amount: 24000, category: 'TUITION' },
          { id: 'item-06', invoiceId: 'inv-003', title: 'Q3 Transport Fee (Zone A)', amount: 7500, category: 'TRANSPORT' },
        ],
        payments: [
          {
            id: 'pay-003',
            schoolId: DEFAULT_SCHOOL_ID,
            receiptNumber: 'RCP-2026-0240',
            invoiceId: 'inv-003',
            studentId: 'stu-001',
            amount: 19000,
            paymentMode: 'BANK_TRANSFER',
            transactionReference: 'NEFT-ICICI-44110022',
            status: 'SUCCESS',
            paidAt: '2026-10-14T09:30:00Z',
          },
        ],
      },
    ];
    this.store.invoices.push(...invoices);

    // 13. Attendance records (30 days sample for class 10-A)
    const today = new Date();
    for (let i = 0; i < 20; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0) continue; // Skip Sunday

      const dateStr = d.toISOString().split('T')[0];
      this.store.attendanceRecords.push(
        {
          id: `att-${dateStr}-stu-001`,
          schoolId: DEFAULT_SCHOOL_ID,
          studentId: 'stu-001',
          studentName: 'Aarav Malhotra',
          rollNumber: '101',
          classId: 'class-13',
          sectionId: 'sec-class-13-a',
          date: dateStr,
          status: i === 7 ? 'LEAVE' : i === 12 ? 'LATE' : 'PRESENT',
          remarks: i === 7 ? 'Medical leave submitted' : undefined,
          recordedById: 'tch-001',
        },
        {
          id: `att-${dateStr}-stu-003`,
          schoolId: DEFAULT_SCHOOL_ID,
          studentId: 'stu-003',
          studentName: 'Rohan Gupta',
          rollNumber: '103',
          classId: 'class-13',
          sectionId: 'sec-class-13-a',
          date: dateStr,
          status: i === 3 || i === 8 ? 'ABSENT' : 'PRESENT',
          recordedById: 'tch-001',
        },
        {
          id: `att-${dateStr}-stu-004`,
          schoolId: DEFAULT_SCHOOL_ID,
          studentId: 'stu-004',
          studentName: 'Diya Kapur',
          rollNumber: '104',
          classId: 'class-13',
          sectionId: 'sec-class-13-a',
          date: dateStr,
          status: 'PRESENT',
          recordedById: 'tch-001',
        }
      );
    }

    // 14. Examination & Marks
    const examMidTerm = {
      id: 'exam-01',
      schoolId: DEFAULT_SCHOOL_ID,
      academicYearId: 'ay-2026-2027',
      name: 'Half Yearly Examination 2026',
      type: 'MID_TERM',
      startDate: '2026-09-15',
      endDate: '2026-09-28',
      isPublished: true,
      subjects: [
        { id: 'es-01', examId: 'exam-01', classId: 'class-13', className: 'Class 10', subjectId: 'subj-10-math', subjectName: 'Mathematics (Standard)', examDate: '2026-09-15', startTime: '09:00', endTime: '12:00', maxMarks: 80, passMarks: 27 },
        { id: 'es-02', examId: 'exam-01', classId: 'class-13', className: 'Class 10', subjectId: 'subj-10-sci', subjectName: 'Science', examDate: '2026-09-18', startTime: '09:00', endTime: '12:00', maxMarks: 80, passMarks: 27 },
        { id: 'es-03', examId: 'exam-01', classId: 'class-13', className: 'Class 10', subjectId: 'subj-10-eng', subjectName: 'English Language & Lit', examDate: '2026-09-21', startTime: '09:00', endTime: '12:00', maxMarks: 80, passMarks: 27 },
        { id: 'es-04', examId: 'exam-01', classId: 'class-13', className: 'Class 10', subjectId: 'subj-10-sst', subjectName: 'Social Science', examDate: '2026-09-24', startTime: '09:00', endTime: '12:00', maxMarks: 80, passMarks: 27 },
        { id: 'es-05', examId: 'exam-01', classId: 'class-13', className: 'Class 10', subjectId: 'subj-10-cs', subjectName: 'Artificial Intelligence & IT', examDate: '2026-09-27', startTime: '09:00', endTime: '11:00', maxMarks: 50, passMarks: 17 },
      ],
    };
    this.store.examinations.push(examMidTerm);

    const aaravMarks = [
      { id: 'mrk-01', schoolId: DEFAULT_SCHOOL_ID, examId: 'exam-01', studentId: 'stu-001', studentName: 'Aarav Malhotra', rollNumber: '101', subjectId: 'subj-10-math', subjectName: 'Mathematics (Standard)', marksObtained: 76, maxMarks: 80, grade: 'A1', remarks: 'Outstanding conceptual problem solving.' },
      { id: 'mrk-02', schoolId: DEFAULT_SCHOOL_ID, examId: 'exam-01', studentId: 'stu-001', studentName: 'Aarav Malhotra', rollNumber: '101', subjectId: 'subj-10-sci', subjectName: 'Science', marksObtained: 72, maxMarks: 80, grade: 'A2', remarks: 'Very thorough in Chemistry experiments.' },
      { id: 'mrk-03', schoolId: DEFAULT_SCHOOL_ID, examId: 'exam-01', studentId: 'stu-001', studentName: 'Aarav Malhotra', rollNumber: '101', subjectId: 'subj-10-eng', subjectName: 'English Language & Lit', marksObtained: 74, maxMarks: 80, grade: 'A1', remarks: 'Excellent expression and grammar.' },
      { id: 'mrk-04', schoolId: DEFAULT_SCHOOL_ID, examId: 'exam-01', studentId: 'stu-001', studentName: 'Aarav Malhotra', rollNumber: '101', subjectId: 'subj-10-sst', subjectName: 'Social Science', marksObtained: 70, maxMarks: 80, grade: 'A2', remarks: 'Good analytical map skills.' },
      { id: 'mrk-05', schoolId: DEFAULT_SCHOOL_ID, examId: 'exam-01', studentId: 'stu-001', studentName: 'Aarav Malhotra', rollNumber: '101', subjectId: 'subj-10-cs', subjectName: 'Artificial Intelligence & IT', marksObtained: 48, maxMarks: 50, grade: 'A1', remarks: 'Top score in Python coding practical.' },
    ];
    this.store.marks.push(...aaravMarks);

    // 15. Timetable for Class 10-A
    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const periods = [
      { num: 1, start: '08:30', end: '09:15', subj: 'subj-10-math', name: 'Mathematics' },
      { num: 2, start: '09:15', end: '10:00', subj: 'subj-10-sci', name: 'Science' },
      { num: 3, start: '10:15', end: '11:00', subj: 'subj-10-eng', name: 'English' },
      { num: 4, start: '11:00', end: '11:45', subj: 'subj-10-sst', name: 'Social Science' },
      { num: 5, start: '12:15', end: '01:00', subj: 'subj-10-cs', name: 'Artificial Intelligence' },
      { num: 6, start: '01:00', end: '01:45', subj: 'subj-10-math', name: 'Math Problem Solving' },
    ];

    days.forEach((day) => {
      periods.forEach((p) => {
        this.store.timetables.push({
          id: `tt-${day}-${p.num}`,
          schoolId: DEFAULT_SCHOOL_ID,
          classId: 'class-13',
          sectionId: 'sec-class-13-a',
          dayOfWeek: day,
          periodNumber: p.num,
          startTime: p.start,
          endTime: p.end,
          subjectId: p.subj,
          subjectName: p.name,
          teacherId: 'tch-001',
          teacherName: 'Dr. Rajesh Verma',
          roomNumber: 'Room 204',
        });
      });
    });

    // 16. Homework
    const homeworkList = [
      {
        id: 'hw-001',
        schoolId: DEFAULT_SCHOOL_ID,
        classId: 'class-13',
        className: 'Class 10',
        sectionId: 'sec-class-13-a',
        sectionName: 'A',
        subjectId: 'subj-10-math',
        subjectName: 'Mathematics',
        teacherId: 'tch-001',
        teacherName: 'Dr. Rajesh Verma',
        title: 'Quadratic Equations Exercise 4.3 & Word Problems',
        description: 'Complete NCERT Exercise 4.3 questions 1 to 8 in homework notebook. Show discriminant calculation and roots step by step.',
        dueDate: '2026-11-06',
        attachmentUrl: '/sample-math-worksheet.pdf',
        createdAt: '2026-11-02T10:00:00Z',
        submissionsCount: 28,
      },
      {
        id: 'hw-002',
        schoolId: DEFAULT_SCHOOL_ID,
        classId: 'class-13',
        className: 'Class 10',
        sectionId: 'sec-class-13-a',
        sectionName: 'A',
        subjectId: 'subj-10-sci',
        subjectName: 'Science',
        teacherId: 'tch-002',
        teacherName: 'Mrs. Anita Deshmukh',
        title: 'Carbon and Its Compounds: Functional Groups & Isomerism',
        description: 'Draw the structural isomers of pentane and hexane with IUPAC nomenclature.',
        dueDate: '2026-11-08',
        createdAt: '2026-11-01T14:30:00Z',
        submissionsCount: 25,
      },
      {
        id: 'hw-003',
        schoolId: DEFAULT_SCHOOL_ID,
        classId: 'class-13',
        className: 'Class 10',
        sectionId: 'sec-class-13-a',
        sectionName: 'A',
        subjectId: 'subj-10-cs',
        subjectName: 'Artificial Intelligence',
        teacherId: 'tch-005',
        teacherName: 'Mr. Sameer Sen',
        title: 'Python Numpy & Data Preprocessing Mini Project',
        description: 'Write a Python program to clean a CSV file with student test scores and compute mean, variance, and standard deviation.',
        dueDate: '2026-11-12',
        createdAt: '2026-11-02T11:15:00Z',
        submissionsCount: 19,
      },
    ];
    this.store.homeworks.push(...homeworkList);

    // Aarav's Homework submission
    this.store.homeworkSubmissions.push({
      id: 'sub-001',
      homeworkId: 'hw-001',
      studentId: 'stu-001',
      studentName: 'Aarav Malhotra',
      submittedAt: '2026-11-02T18:40:00Z',
      notes: 'Submitted all 8 questions along with rough work.',
      status: 'GRADED',
      grade: 'A+',
      feedback: 'Neat handwriting and verified root proofs.',
    });

    // 17. Library Books
    const books = [
      { id: 'bk-01', schoolId: DEFAULT_SCHOOL_ID, isbn: '978-0199535569', title: 'A Brief History of Time', author: 'Stephen Hawking', publisher: 'Bantam Books', category: 'Science', totalCopies: 8, availableCopies: 5, locationRack: 'RACK-SCI-01' },
      { id: 'bk-02', schoolId: DEFAULT_SCHOOL_ID, isbn: '978-0143428138', title: 'Wings of Fire', author: 'Dr. A.P.J. Abdul Kalam', publisher: 'Universities Press', category: 'Biography', totalCopies: 12, availableCopies: 7, locationRack: 'RACK-BIO-03' },
      { id: 'bk-03', schoolId: DEFAULT_SCHOOL_ID, isbn: '978-8173711466', title: 'The Story of My Experiments with Truth', author: 'Mahatma Gandhi', publisher: 'Navajivan', category: 'History', totalCopies: 10, availableCopies: 9, locationRack: 'RACK-HIS-02' },
      { id: 'bk-04', schoolId: DEFAULT_SCHOOL_ID, isbn: '978-0262033848', title: 'Introduction to Algorithms (CLRS)', author: 'Cormen, Leiserson, Rivest, Stein', publisher: 'MIT Press', category: 'Computer Science', totalCopies: 6, availableCopies: 3, locationRack: 'RACK-CS-04' },
      { id: 'bk-05', schoolId: DEFAULT_SCHOOL_ID, isbn: '978-9352923578', title: 'Concepts of Physics (Vol 1 & 2)', author: 'Dr. H.C. Verma', publisher: 'Bharati Bhawan', category: 'Physics', totalCopies: 25, availableCopies: 14, locationRack: 'RACK-PHY-01' },
    ];
    this.store.libraryBooks.push(...books);

    // Book Issue for Aarav
    this.store.bookIssues.push({
      id: 'bi-001',
      schoolId: DEFAULT_SCHOOL_ID,
      bookId: 'bk-01',
      bookTitle: 'A Brief History of Time',
      studentId: 'stu-001',
      studentName: 'Aarav Malhotra',
      issueDate: '2026-10-25',
      dueDate: '2026-11-09',
      fineAmount: 0,
      status: 'ISSUED',
      createdAt: '2026-10-25T11:00:00Z',
    });

    // 18. Transport Management
    const vehicles = [
      { id: 'veh-01', schoolId: DEFAULT_SCHOOL_ID, vehicleNumber: 'UP 16 BT 4401', capacity: 42, model: 'Tata Starbus Ultra 2024', insuranceExpiry: '2027-05-30', status: 'ACTIVE' },
      { id: 'veh-02', schoolId: DEFAULT_SCHOOL_ID, vehicleNumber: 'UP 16 BT 4402', capacity: 42, model: 'Ashok Leyland Sunshine 2023', insuranceExpiry: '2027-08-15', status: 'ACTIVE' },
      { id: 'veh-03', schoolId: DEFAULT_SCHOOL_ID, vehicleNumber: 'UP 16 BT 4403', capacity: 32, model: 'Eicher Starline 2024', insuranceExpiry: '2027-01-20', status: 'ACTIVE' },
    ];
    this.store.vehicles.push(...vehicles);

    const drivers = [
      { id: 'drv-01', schoolId: DEFAULT_SCHOOL_ID, name: 'Sukhwinder Singh', licenseNumber: 'DL-1420110023456', phone: '+91 9811002233', status: 'ACTIVE' },
      { id: 'drv-02', schoolId: DEFAULT_SCHOOL_ID, name: 'Mohammad Farooq', licenseNumber: 'DL-1420130098765', phone: '+91 9811003344', status: 'ACTIVE' },
    ];
    this.store.drivers.push(...drivers);

    const routes = [
      {
        id: 'rt-01',
        schoolId: DEFAULT_SCHOOL_ID,
        routeNumber: 'R-01',
        routeName: 'Noida Expressway - Sector 93 / 137 / 143',
        startPoint: 'Sector 93A ATS Village',
        endPoint: 'Greenwood Academy Campus',
        vehicleId: 'veh-01',
        vehicleNumber: 'UP 16 BT 4401',
        driverId: 'drv-01',
        driverName: 'Sukhwinder Singh',
        driverPhone: '+91 9811002233',
        fareMonthly: 2500,
        stopsJson: JSON.stringify([
          { stopName: 'ATS Greens Village Gate 1', pickupTime: '07:15 AM', dropTime: '02:45 PM', fare: 2500 },
          { stopName: 'Purvanchal Royal Park Sector 137', pickupTime: '07:30 AM', dropTime: '02:30 PM', fare: 2500 },
          { stopName: 'Gulshan Vivante Sector 137', pickupTime: '07:40 AM', dropTime: '02:20 PM', fare: 2500 },
          { stopName: 'School Campus Gate 2', pickupTime: '08:05 AM', dropTime: '02:00 PM', fare: 0 },
        ]),
      },
      {
        id: 'rt-02',
        schoolId: DEFAULT_SCHOOL_ID,
        routeNumber: 'R-02',
        routeName: 'Central Noida - Sector 50 / 61 / 76',
        startPoint: 'Sector 50 Metro Station',
        endPoint: 'Greenwood Academy Campus',
        vehicleId: 'veh-02',
        vehicleNumber: 'UP 16 BT 4402',
        driverId: 'drv-02',
        driverName: 'Mohammad Farooq',
        driverPhone: '+91 9811003344',
        fareMonthly: 2300,
        stopsJson: JSON.stringify([
          { stopName: 'Sector 50 Market', pickupTime: '07:20 AM', dropTime: '02:40 PM', fare: 2300 },
          { stopName: 'Sector 61 Prateek Fedura', pickupTime: '07:35 AM', dropTime: '02:25 PM', fare: 2300 },
          { stopName: 'Sector 76 Metro Circle', pickupTime: '07:45 AM', dropTime: '02:15 PM', fare: 2300 },
          { stopName: 'School Campus Gate 2', pickupTime: '08:10 AM', dropTime: '02:00 PM', fare: 0 },
        ]),
      },
    ];
    this.store.transportRoutes.push(...routes);

    this.store.transportAllocations.push({
      id: 'ta-01',
      schoolId: DEFAULT_SCHOOL_ID,
      studentId: 'stu-001',
      studentName: 'Aarav Malhotra',
      routeId: 'rt-01',
      routeName: 'Noida Expressway - Sector 93 / 137 / 143',
      stopName: 'ATS Greens Village Gate 1',
      status: 'ACTIVE',
      createdAt: '2026-04-01T08:00:00Z',
    });

    // 19. Notices
    const notices = [
      {
        id: 'not-01',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'CBSE Board Examination 2027 Registration Schedule',
        content: 'Registration for Class 10 and 12 CBSE Board Examinations 2027 has commenced. Parents are requested to verify the draft LOC student particulars by November 15, 2026.',
        targetRole: 'ALL',
        isImportant: true,
        publishedAt: '2026-11-01T09:00:00Z',
        authorName: 'Office of the Examination Superintendent',
      },
      {
        id: 'not-02',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Annual Sports Day 2026 - Selection Trials',
        content: 'Selection trials for inter-house track events (100m, 200m, 4x100m relay) and field games will be conducted from November 8 to November 10 at the main stadium.',
        targetRole: 'STUDENTS',
        isImportant: false,
        publishedAt: '2026-11-02T11:30:00Z',
        authorName: 'Department of Physical Education',
      },
      {
        id: 'not-03',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Parent-Teacher Meeting (PTM) for Term 1',
        content: 'The second Parent-Teacher Meeting will be held on Saturday, November 14, 2026, from 8:30 AM to 1:00 PM. Detailed time-slots have been shared via the Parent Portal.',
        targetRole: 'PARENTS',
        isImportant: true,
        publishedAt: '2026-11-02T12:00:00Z',
        authorName: 'Vice Principal Academics',
      },
    ];
    this.store.notices.push(...notices);

    // 20. Events & News
    const events = [
      {
        id: 'evt-01',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Annual Science & Robotics TechFest 2026',
        description: 'Over 40 school teams demonstrating automated rover designs, IoT water management systems, and smart healthcare AI projects.',
        startDate: '2026-11-20T09:00:00Z',
        endDate: '2026-11-21T17:00:00Z',
        location: 'Greenwood Multipurpose Auditorium & Innovation Lab',
        category: 'ACADEMIC',
        bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
        isPublicWebsite: true,
      },
      {
        id: 'evt-02',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Inter-School Debate Championship - Tarang 2026',
        description: 'Topic: "Artificial Intelligence in Classrooms: Augmentation of Human Potential or Erosion of Foundational Skills?"',
        startDate: '2026-11-28T10:00:00Z',
        endDate: '2026-11-28T16:00:00Z',
        location: 'Main Amphitheatre',
        category: 'CULTURAL',
        bannerImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600',
        isPublicWebsite: true,
      },
      {
        id: 'evt-03',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Silver Jubilee Annual Athletic Meet',
        description: 'Track and field championships across Sub-Junior, Junior, and Senior divisions with state sports dignitaries.',
        startDate: '2026-12-15T08:30:00Z',
        endDate: '2026-12-16T15:30:00Z',
        location: 'Olympic Standard 400m Athletic Track',
        category: 'SPORTS',
        bannerImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600',
        isPublicWebsite: true,
      },
    ];
    this.store.events.push(...events);

    const newsList = [
      {
        id: 'news-01',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'Greenwood Students Win Gold at National CBSE Science Olympiad',
        slug: 'greenwood-students-win-gold-cbse-science-olympiad-2026',
        excerpt: 'Our Grade 11 robotics team secured 1st position across 450 participating schools nationwide.',
        content: `Greenwood International Academy is proud to announce that our senior robotics delegation, led by Aniket Sen and Aarav Malhotra, won the coveted National Championship trophy at the CBSE Science Exhibition 2026 held in New Delhi.\n\nThe project featured an autonomous solar-powered water filtration device capable of real-time microbial testing and cellular telemetry alerts. The team was awarded a grant of ₹1,00,000 for further patent development.`,
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
        publishedDate: '2026-10-28T10:00:00Z',
        isFeatured: true,
        author: 'Faculty of Science & Innovation',
      },
      {
        id: 'news-02',
        schoolId: DEFAULT_SCHOOL_ID,
        title: 'State-of-the-Art AI & STEM Innovation Lab Inaugurated',
        slug: 'ai-stem-innovation-lab-inauguration-2026',
        excerpt: 'The 5,000 sq ft multidisciplinary facility houses 3D printers, IoT workstations, and NVIDIA AI computing rigs.',
        content: `As part of our commitment to NEP 2020 experiential learning, Greenwood International Academy officially inaugurated its next-generation AI and Innovation hub. The center provides hands-on exposure to machine learning, drone engineering, and astronomical telemetry for students from Grade 6 upwards.`,
        coverImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600',
        publishedDate: '2026-10-15T09:00:00Z',
        isFeatured: true,
        author: 'Editorial Board',
      },
    ];
    this.store.news.push(...newsList);

    // 21. Gallery
    const galleryItems = [
      { id: 'gal-01', schoolId: DEFAULT_SCHOOL_ID, title: 'Smart Interactive Classroom', category: 'CLASSROOMS', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800', caption: 'Interactive digital flat panels and ergonomic collaborative seating', isFeatured: true },
      { id: 'gal-02', schoolId: DEFAULT_SCHOOL_ID, title: 'Advanced Robotics and IoT Lab', category: 'LABS', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', caption: 'Hands-on programming and micro-controller assembly', isFeatured: true },
      { id: 'gal-03', schoolId: DEFAULT_SCHOOL_ID, title: 'Greenwood Olympic Swimming Pool', category: 'SPORTS', imageUrl: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=800', caption: 'All-weather temperature-controlled 25m competition pool', isFeatured: true },
      { id: 'gal-04', schoolId: DEFAULT_SCHOOL_ID, title: 'Central Knowledge Library', category: 'CAMPUS', imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800', caption: 'Over 20,000 titles, e-book kiosks, and silent research pods', isFeatured: true },
      { id: 'gal-05', schoolId: DEFAULT_SCHOOL_ID, title: 'Annual Cultural Festival & Orchestra', category: 'CELEBRATIONS', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', caption: 'Student symphony performing Indian classical fusion', isFeatured: true },
      { id: 'gal-06', schoolId: DEFAULT_SCHOOL_ID, title: 'FIFA Certified Football Turf', category: 'SPORTS', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800', caption: 'Floodlit artificial turf for inter-school football leagues', isFeatured: false },
    ];
    this.store.galleries.push(...galleryItems);

    // 22. Website CMS Configuration
    const websiteConfig = {
      schoolId: DEFAULT_SCHOOL_ID,
      heroHeadline: 'Empowering Young Minds to Lead, Innovate, and Excel',
      heroSubheadline:
        'A premier CBSE day and boarding school offering world-class academics, sports excellence, and character-driven leadership since 1998.',
      heroImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
      schoolIntro:
        'Greenwood International Academy stands at the forefront of quality K-12 education in India. Spread across an 8-acre lush green smart campus, we combine academic rigor with experiential STEAM learning, global ethics, and comprehensive physical development.',
      vision: 'To cultivate visionary leaders anchored in ethical values, critical inquiry, and global competence.',
      mission: 'Providing holistic education through progressive curricula, state-of-the-art facilities, and empathetic mentorship.',
      coreValues: ['Integrity & Respect', 'Academic Rigor', 'Innovation & Discovery', 'Inclusivity & Empathy', 'Environmental Stewardship'],
      principalPhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      principalName: 'Dr. Sunita Sharma',
      principalDesignation: 'Principal & Director Academics (Ph.D., M.Ed.)',
      principalMessage:
        'Education is not merely the transmission of facts; it is the ignition of wonder, curiosity, and moral fortitude. At Greenwood, every child is recognized as an extraordinary universe of possibilities. We invite you to join our vibrant learning family.',
      statsStudents: 2450,
      statsTeachers: 145,
      statsYears: 28,
      statsClassrooms: 84,
      whyChoosePoints: [
        { title: 'Experienced Faculty', description: 'Over 85% of teachers hold postgraduate degrees and average 10+ years of pedagogical expertise.', icon: 'GraduationCap' },
        { title: 'Smart Classrooms', description: 'Every classroom is equipped with interactive flat panels, acoustic soundbars, and high-speed fiber Wi-Fi.', icon: 'Laptop' },
        { title: 'Safe & Green Campus', description: '8-acre surveillance monitored secure campus with 24/7 security, infirmary, and RFID bus tracking.', icon: 'ShieldCheck' },
        { title: 'CBSE & Holistic Excellence', description: 'Consistent 100% first-division results in CBSE Class 10 and 12 Board examinations with 90+ state toppers.', icon: 'Award' },
        { title: 'Olympic Sports Ground', description: 'Dedicated coaches for cricket, football, basketball, lawn tennis, badminton, and heated swimming.', icon: 'Trophy' },
        { title: 'STEAM & AI Innovation', description: 'Hands-on robotics, drone engineering, coding from Grade 3, and patent incubation mentors.', icon: 'Cpu' },
      ],
      phone: '+91 120 4589200',
      email: 'admissions@greenwood.edu.in',
      address: 'Plot 14, Institutional Area, Sector 62, Noida, Uttar Pradesh 201309',
      timings: 'Monday – Saturday: 8:00 AM – 3:30 PM (Office hours: 8:00 AM – 4:30 PM)',
      facebookUrl: 'https://facebook.com/greenwoodacademy',
      twitterUrl: 'https://twitter.com/greenwood_edu',
      instagramUrl: 'https://instagram.com/greenwood_academy',
      youtubeUrl: 'https://youtube.com/@greenwoodacademy',
      linkedinUrl: 'https://linkedin.com/school/greenwood-international-academy',
    };

    this.store.websitePages.push({
      id: 'wp-home',
      schoolId: DEFAULT_SCHOOL_ID,
      pageKey: 'HOME',
      contentJson: JSON.stringify(websiteConfig),
      isPublished: true,
      updatedAt: new Date().toISOString(),
    });

    this.initialized = true;
    logger.info('EduManage in-memory repository successfully populated with complete Indian school dataset.');
  }
}

export const dbService = new DatabaseService();

