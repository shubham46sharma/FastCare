# FastCare - Modern Healthcare Network for India 🏥

> **Revolutionizing healthcare delivery in India through government schemes like Ayushman Bharat**

FastCare is a modern, scalable healthcare management platform that connects patients with verified hospitals and clinics supporting government healthcare schemes. Built with cutting-edge technology and designed for the Indian healthcare ecosystem.

## ✨ Key Features

### 🏥 For Hospitals & Clinics
- **Patient Network Management** - Connect with patients across your network
- **Government Scheme Integration** - Support Ayushman Bharat, CGHS, ESIC, and more
- **AI-Powered Fraud Detection** - Advanced anomaly detection for claims
- **Automated Claims Processing** - Submit claims with built-in validation
- **Multi-Location Support** - Manage multiple facilities from one platform
- **Real-time Analytics** - Comprehensive insights and reporting

### 👥 For Patients
- **Find Healthcare Providers** - Locate hospitals supporting your schemes
- **Medical Records Management** - Secure access to your health data
- **Appointment Scheduling** - Book and manage appointments easily
- **Government Scheme Status** - Track your enrollment and coverage
- **Mobile-First Design** - Access healthcare on any device

### 🤖 AI & Technology
- **Fraud Detection Engine** - Machine learning-powered claim analysis
- **Anomaly Detection** - Identify suspicious patterns in real-time
- **Smart Analytics** - Data-driven insights for better care
- **Automated Workflows** - Streamlined healthcare processes

## 🚀 Technology Stack

### Frontend
- **Next.js 15** - Latest React framework with App Router
- **React 18** - Modern React with concurrent features
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **JWT Authentication** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **jose** - JWT library for token management

### State Management
- **Zustand** - Lightweight, scalable state management
- **React Context** - Global providers and context

### UI Components
- **Headless UI** - Accessible, unstyled components
- **Lucide React** - Beautiful, consistent icons
- **Heroicons** - Additional icon set
- **Recharts** - Data visualization and charts

## 📁 Project Structure

```
FastCare/
├── app/                          # Next.js 15 App Router
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.tsx      # Login page
│   │   └── signup/page.tsx     # Signup page
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx            # Main dashboard router
│   │   └── patient/page.tsx    # Patient dashboard
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication APIs
│   │   └── patient/            # Patient data APIs
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx         # Button component
│   │   ├── DashboardCard.tsx  # Dashboard stats card
│   │   ├── AppointmentCard.tsx # Appointment display
│   │   ├── MedicalRecordCard.tsx # Medical record display
│   │   └── GovernmentSchemeCard.tsx # Scheme display
│   ├── sections/               # Page sections
│   │   ├── HeroSection.tsx     # Landing page hero
│   │   ├── FeaturesSection.tsx # Features showcase
│   │   ├── GovernmentSchemesSection.tsx # Schemes overview
│   │   ├── HowItWorksSection.tsx # Process steps
│   │   ├── TestimonialsSection.tsx # User testimonials
│   │   └── CTASection.tsx      # Call-to-action
│   ├── dashboard/               # Dashboard components
│   │   └── PatientDashboard.tsx # Patient dashboard
│   └── providers/               # Context providers
│       ├── AuthProvider.tsx     # Authentication context
│       └── ThemeProvider.tsx    # Theme management
├── lib/                         # Utility libraries
│   ├── ai/                     # AI/ML functionality
│   │   └── anomalyDetection.ts # Fraud detection engine
│   ├── schemes/                # Government schemes
│   │   └── governmentSchemesManager.ts # Schemes manager
│   └── utils.ts                # Utility functions
├── store/                       # State management
│   └── authStore.ts            # Authentication store
├── types/                       # TypeScript types
│   └── index.ts                # All type definitions
├── package.json                 # Dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
└── postcss.config.js           # PostCSS config
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FastCare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

### Demo Credentials
- **Email**: demo@fastcare.com
- **Password**: demo123

### Features
- JWT-based authentication
- Role-based access control (patient/hospital)
- Secure password hashing
- Protected routes and API endpoints

## 🏥 Government Schemes Supported

- **Ayushman Bharat (AB-PMJAY)** - ₹5 Lakhs coverage
- **Central Government Health Scheme (CGHS)** - ₹10 Lakhs coverage
- **Employees' State Insurance (ESIC)** - ₹3 Lakhs coverage
- **Pradhan Mantri Jan Dhan Yojana (PMJDY)** - ₹30,000 coverage

## 🧪 Testing

### Available Routes
- **Landing Page**: `/` - Main homepage
- **Login**: `/auth/login` - User authentication
- **Signup**: `/auth/signup` - User registration
- **Patient Dashboard**: `/dashboard/patient` - Patient interface

### API Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/validate` - Token validation
- `GET /api/patient/dashboard-stats` - Dashboard statistics
- `GET /api/patient/appointments` - Patient appointments
- `GET /api/patient/medical-records` - Medical records
- `GET /api/patient/government-schemes` - Government schemes

## 🚀 Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Type checking and safety

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Environment Variables
```env
JWT_SECRET=your-super-secret-jwt-key
DATABASE_URL=postgresql://user:password@localhost:5432/fastcare
REDIS_URL=redis://localhost:6379
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Issues**: Create an issue in the repository
- **Email**: support@fastcare.com

## 🎯 Roadmap

### Phase 1 (Current) ✅
- [x] Modern React architecture
- [x] Authentication system
- [x] Patient dashboard
- [x] Government schemes integration
- [x] AI fraud detection engine

### Phase 2 (Next)
- [ ] Database integration (PostgreSQL)
- [ ] Hospital dashboard
- [ ] Claims processing system
- [ ] Real-time notifications
- [ ] Mobile app (React Native)

### Phase 3 (Future)
- [ ] Advanced analytics
- [ ] Machine learning models
- [ ] Blockchain integration
- [ ] Telemedicine features
- [ ] Multi-language support

---

**Built with ❤️ for India's Healthcare Revolution**

*FastCare - Making quality healthcare accessible to every Indian citizen*

