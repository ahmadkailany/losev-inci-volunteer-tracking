# LÖSEV İncİ Volunteer Tracking System

A modern, production-ready full-stack web application for tracking and validating social responsibility/volunteer activities for LÖSEV İncİ students (middle/high school). Generate digital certificates, badges, and national statistics.

## 🎯 Overview

- **Students**: Log volunteer activities, track hours, earn badges, download certificates
- **Teachers**: Approve/reject activities, view school reports and analytics
- **Admins**: National statistics, rankings, comprehensive reports

## 🚀 Tech Stack (Latest as of March 2026)

### Frontend
- **Next.js 16** (LTS) with App Router & Turbopack
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS v4.0** with @theme directive
- **shadcn/ui v3.5+** (React 19 & Tailwind v4 compatible)
- **React Hook Form** + **Zod** for validation
- **TanStack Query v5** for data fetching
- **Lucide React** for icons
- **Recharts** for visualizations

### Backend
- **Node.js 24 LTS** (Krypton)
- **NestJS** with TypeScript
- **PostgreSQL** for data persistence
- **Prisma ORM** (latest) for database management
- **JWT + bcrypt** for authentication
- **Cloudinary SDK** for file uploads
- **Zod** for validation

### DevOps & Deployment
- **Turbo** for monorepo management
- **Docker** for containerization
- **Vercel** for frontend deployment
- **Render/Railway** for backend deployment
- **GitHub Actions** for CI/CD

## 📁 Project Structure

```
losev-inci-volunteer-tracking/
├── README.md
├── package.json (workspace root)
├── turbo.json
├── .github/workflows/
├── docker-compose.yml
├── apps/
│   ├── frontend/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   ├── dashboard/
│   │   │   │   ├── student/
│   │   │   │   ├── teacher/
│   │   │   │   └── admin/
│   │   │   └── (marketing)/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── backend/
│       ├── src/
│       │   ├── modules/
│       │   ├── common/
│       │   ├── config/
│       │   ├── prisma/
│       │   └── main.ts
│       ├── nest-cli.json
│       └── package.json
├── packages/
│   ├── db/
│   └── config/
└── .env.example
```

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js 24+** (download from nodejs.org)
- **PostgreSQL 16+** (local or cloud)
- **npm 11+** (comes with Node.js)

### Step 1: Clone Repository
```bash
git clone https://github.com/ahmadkailany/losev-inci-volunteer-tracking.git
cd losev-inci-volunteer-tracking
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
cp .env.example .env.local
```

Update `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/losev_inci"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRATION="7d"

# Backend
BACKEND_PORT=3001
NODE_ENV=development

# Cloudinary (optional for file uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_APP_NAME="LÖSEV İncİ"
```

### Step 4: Setup Database
```bash
cd apps/backend
npx prisma migrate dev --name init
npm run seed
```

### Step 5: Run Development Servers

**Terminal 1 - Backend**
```bash
cd apps/backend
npm run start:dev
# Server runs at http://localhost:3001
```

**Terminal 2 - Frontend**
```bash
cd apps/frontend
npm run dev
# App runs at http://localhost:3000
```

## 🔐 Demo Accounts

### Student
- **Email**: student@example.com
- **Password**: Student@123456
- **School**: Galatasaray Lisesi
- **City**: İstanbul

### Teacher
- **Email**: teacher@example.com
- **Password**: Teacher@123456
- **School**: Galatasaray Lisesi

### Admin
- **Email**: admin@example.com
- **Password**: Admin@123456
- **Access**: National statistics & reports

## 📊 Key Features

### Student Dashboard
- ✅ Volunteer activity logging (date, type, hours, description, photos/documents)
- ✅ Real-time hour tracking (total, monthly, yearly vs. 30-40h target)
- ✅ Automatic badge earning (Bronze/Silver/Gold/Platinum)
- ✅ Digital certificate generation & download
- ✅ Activity history with status tracking
- ✅ Profile management with optional TC ID (encrypted)

### Teacher Dashboard
- ✅ Activity approval/rejection workflow
- ✅ School-level analytics and reports
- ✅ Student hour summaries and rankings
- ✅ Batch operations for activities
- ✅ Custom notes and feedback on submissions
- ✅ Export data to CSV/PDF

### Admin Dashboard
- ✅ National statistics and trends
- ✅ Top students & schools rankings
- ✅ Province-level breakdown
- ✅ Activity type distribution charts
- ✅ Monthly activity trends
- ✅ System-wide performance metrics
- ✅ User management interface

## 🎨 UI/UX Features

- **Modern Design**: Built with shadcn/ui components and Tailwind CSS v4
- **Responsive**: Mobile-first approach, works on all devices
- **Dark/Light Mode**: System preference detection with toggle
- **Interactive Charts**: Powered by Recharts for beautiful visualizations
- **Smooth Animations**: Subtle transitions and interactions
- **Accessibility**: WCAG 2.1 AA compliant
- **Turkish Language**: Default UI in Turkish (ready for localization)

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

### Backend (Render/Railway)
```bash
# Push to GitHub
git push origin main

# Connect to Render/Railway dashboard
# Set environment variables
# Deploy
```

### Database (PostgreSQL Cloud)
- **Neon**: https://neon.tech (free tier)
- **Supabase**: https://supabase.com (free tier)
- **ElephantSQL**: https://www.elephantsql.com

## 📚 API Documentation

See `apps/backend/API.md` for complete API reference.

## 🔒 Security

- JWT-based authentication with secure token refresh
- Bcrypt password hashing (salt rounds: 12)
- Encrypted sensitive data (TC ID, phone)
- CORS and rate limiting configured
- SQL injection protection via Prisma ORM
- File upload validation and scanning
- Parent consent tracking for minors
- KVKK (Turkish GDPR) compliant

## 📝 Environment Variables

See `.env.example` for all required variables.

## 🤝 Contributing

Contributions welcome! Please follow our commit conventions and submit PRs to `develop` branch.

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues, questions, or suggestions:
- Open GitHub Issues
- Contact: support@losev-inci.org
- Documentation: https://docs.losev-inci.org

---

**Built with ❤️ for LÖSEV İncİ - Turkish Youth Volunteer Program**