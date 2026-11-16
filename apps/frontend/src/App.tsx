import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { Academics } from './pages/public/Academics';
import { Admissions } from './pages/public/Admissions';
import { Facilities } from './pages/public/Facilities';
import { Gallery } from './pages/public/Gallery';
import { Events } from './pages/public/Events';
import { News } from './pages/public/News';
import { Contact } from './pages/public/Contact';
import { OnlineEnquiry } from './pages/public/OnlineEnquiry';
import { PrincipalMessage } from './pages/public/PrincipalMessage';
import { FacultyStaff } from './pages/public/FacultyStaff';

// Auth Page
import { Login } from './pages/auth/Login';

// Admin CRM Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdmissionCRM } from './pages/admin/AdmissionCRM';
import { StudentsList } from './pages/admin/StudentsList';
import { StudentProfile } from './pages/admin/StudentProfile';
import { TeachersList } from './pages/admin/TeachersList';
import { AcademicClasses } from './pages/admin/AcademicClasses';
import { AttendanceManager } from './pages/admin/AttendanceManager';
import { FeesManager } from './pages/admin/FeesManager';
import { ExaminationsManager } from './pages/admin/ExaminationsManager';
import { TimetableManager } from './pages/admin/TimetableManager';
import { HomeworkManager } from './pages/admin/HomeworkManager';
import { LibraryManager } from './pages/admin/LibraryManager';
import { TransportManager } from './pages/admin/TransportManager';
import { NoticesManager } from './pages/admin/NoticesManager';
import { WebsiteCMSManager } from './pages/admin/WebsiteCMSManager';
import { SettingsManager } from './pages/admin/SettingsManager';

// Portals
import { ParentPortal } from './pages/portal/ParentPortal';
import { StudentPortal } from './pages/portal/StudentPortal';
import { TeacherPortal } from './pages/portal/TeacherPortal';
import { AccountantPortal } from './pages/portal/AccountantPortal';
import { SmoothScrollProvider } from './components/common/SmoothScrollProvider';

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <Routes>
      {/* 1. Public Multi-Page Website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/principal-message" element={<PrincipalMessage />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/faculty" element={<FacultyStaff />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/online-enquiry" element={<OnlineEnquiry />} />
      </Route>

      {/* 2. Authentication */}
      <Route path="/login" element={<Login />} />

      {/* 3. Dedicated User Portals */}
      <Route path="/parent/dashboard" element={<ParentPortal />} />
      <Route path="/student/dashboard" element={<StudentPortal />} />
      <Route path="/teacher/dashboard" element={<TeacherPortal />} />
      <Route path="/accountant/dashboard" element={<AccountantPortal />} />

      {/* 4. Complete Admin Management CRM */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="admissions" element={<AdmissionCRM />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="teachers" element={<TeachersList />} />
        <Route path="classes" element={<AcademicClasses />} />
        <Route path="attendance" element={<AttendanceManager />} />
        <Route path="fees" element={<FeesManager />} />
        <Route path="examinations" element={<ExaminationsManager />} />
        <Route path="timetable" element={<TimetableManager />} />
        <Route path="homework" element={<HomeworkManager />} />
        <Route path="library" element={<LibraryManager />} />
        <Route path="transport" element={<TransportManager />} />
        <Route path="notices" element={<NoticesManager />} />
        <Route path="website-cms" element={<WebsiteCMSManager />} />
        <Route path="settings" element={<SettingsManager />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </SmoothScrollProvider>
  );
};

export default App;

