# EduManage School ERP — World-Class School Website & Management CRM

A modern, full-stack, AI-powered School Management Platform and luxury institution website built for Indian and international educational institutions (CBSE / ICSE / Cambridge / State Boards).

---

## 🏛️ The 4-Layer Expanded Stack Architecture

```
┌──────────────────────────────────────────────────────────┐
│ 1. PLANNING & ARCHITECTURE                               │
│    • Claude & Advanced Agentic System                    │
│    • Multi-tenant schema design & business logic         │
├──────────────────────────────────────────────────────────┤
│ 2. FRONTEND & MOTION LAYER                               │
│    • Framework: React 18, Vite, TypeScript, Tailwind CSS │
│    • Smooth Scroll: Lenis (fluid weighted inertia)       │
│    • Animation: GSAP & ScrollTrigger                     │
│    • 3D & WebGL: Three.js procedural 60fps canvas        │
│    • Interactive 3D Tilt: Card3DTilt with dynamic glare  │
├──────────────────────────────────────────────────────────┤
│ 3. AI CONTENT & 3D PIPELINE                              │
│    • In-App AI Controller: Simulated & live LLM API      │
│    • AI Admissions Counselor (Chatbot with lead capture) │
│    • AI School Report & Executive Briefing Assistant     │
│    • AI Notice & Circular Generator                      │
│    • AI Student Diagnostic Insights Engine               │
│    • 3D Asset Pipeline: Tripo AI → Blender → Three.js    │
│    • Cinematic Imagery: Higgsfield AI visual workflows   │
├──────────────────────────────────────────────────────────┤
│ 4. DATA, BACKEND & SECURITY LAYER                        │
│    • Node.js & Express.js with TypeScript REST APIs      │
│    • Database: PostgreSQL with Prisma ORM (45+ entities) │
│    • Authentication: JWT access & refresh tokens, RBAC   │
│    • Payments: Razorpay payment gateway integration      │
│    • Communication: WhatsApp Cloud API & email channels  │
└──────────────────────────────────────────────────────────┘
```

---

## ✨ Key Platform Features

### 🌟 1. Luxury Public Website
- **Editorial Brand Design**: Deep Navy (`#0B132B`), Warm Ivory (`#FAF8F5`), and Muted Gold (`#C5A880`) palette with `Playfair Display` serif headlines.
- **Interactive 3D Hero Section**: 60 FPS Three.js Canvas with central physical glass knowledge core, orbiting CBSE rings, floating scholar prisms, and mouse-parallax tracking.
- **Dynamic Mega Menus**: Dropdowns for *About*, *Academics*, and *Campus Life* with embedded imagery and quick navigation.
- **Fluid Scroll Motion**: Lenis smooth-scroll provider synchronized with GSAP ScrollTrigger ticker.
- **Comprehensive Public Pages**: Home, About Us, Principal's Desk, Academics, Facilities, Faculty & Staff (85+ directory), Admissions Roadmap, Gallery, Events, News, and Contact Us.
- **Interactive Lead Capture**: Integrated floating **AI Admission Counselor** and **WhatsApp Enquiry Hotline**.

### 💼 2. Enterprise Admin CRM & Role Portals
- **Executive Analytics Dashboard**: 10 live KPI metric cards with 3D tilt + 5 Recharts visualizations.
- **AI Executive Briefing**: Daily synthesis of attendance, fee collections, and admission pipeline bottlenecks.
- **8-Stage Admission CRM**: Interactive Kanban board and Data Table view with 1-click student conversion.
- **Multi-Tab Student Profiles**: Overview, Personal, Parents, Academics, Attendance, Invoices, Examination Marks, and Documents.
- **Examination Management**: Exam schedules, marks entry, and printable CBSE-compliant Report Cards.
- **Dedicated Portals**:
  - **Super Admin & Principal Desk**
  - **Faculty & Teacher Portal**
  - **Parent Progress Portal**
  - **Student Academic Portal**
  - **Accountant Fee & Ledger Desk**
  - **Receptionist CRM**

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended, v20/v23 supported)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/school-crm.git
cd school-crm

# Install root & workspace dependencies
npm install
```

### Running Locally
```bash
# Terminal 1: Start Backend API Server (Port 5000)
npm run dev:backend

# Terminal 2: Start Frontend Application (Port 5173)
npm run dev:frontend
```

Once running:
- Open your browser to `http://localhost:5173` to explore the public website.
- Click **Portal Login** for 1-click instant demo access across all roles.

### Testing & Production Builds
```bash
# Run unit & API test suites
npm run test

# Build backend for production
npm run build:backend

# Build frontend for production
npm run build:frontend
```

---

## 📦 Pushing to GitHub (Live on Git)

To publish this project to your GitHub account:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete luxury school website, 3D hero, Lenis/GSAP stack and admin CRM"

# 4. Set default branch to main
git branch -M main

# 5. Link your remote GitHub repository
# (Create a new empty repository on github.com named 'school-crm' first)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License
This project is licensed under the MIT License.

