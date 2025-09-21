import React, { useState, createContext, useContext, Suspense, lazy } from 'react';

// Lazy load components to prevent initial load timeout
const Homepage = lazy(() => import('./components/Homepage').then(module => ({ default: module.Homepage })));
const CustomerLogin = lazy(() => import('./components/CustomerLogin').then(module => ({ default: module.CustomerLogin })));
const CustomerSignup = lazy(() => import('./components/CustomerSignup').then(module => ({ default: module.CustomerSignup })));
const LaborLogin = lazy(() => import('./components/LaborLogin').then(module => ({ default: module.LaborLogin })));
const LaborSignup = lazy(() => import('./components/LaborSignup').then(module => ({ default: module.LaborSignup })));
const CustomerDashboard = lazy(() => import('./components/CustomerDashboard').then(module => ({ default: module.CustomerDashboard })));
const LaborDashboard = lazy(() => import('./components/LaborDashboard').then(module => ({ default: module.LaborDashboard })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));

export type UserType = 'customer' | 'labor' | 'admin';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface User {
  id: string;
  fullName: string;
  email?: string;
  mobile: string;
  type: UserType;
  aadhaarNumber: string;
  profilePhoto?: string;
  address?: Address;
  dateOfBirth?: string;
  signupMethod?: 'self' | 'cyber-cafe';
  
  // Labor specific fields
  workCategory?: string;
  experience?: string;
  shiftType?: 'full-time' | 'half-time' | 'part-time' | 'task-based';
  isPremium?: boolean;
  premiumExpiry?: string;
  totalEarnings?: number;
  rating?: number;
  completedJobs?: number;
  availability?: 'available' | 'busy' | 'offline';
  hourlyRate?: number;
  skills?: string[];
  isOnline?: boolean;
}

export interface Task {
  id: string;
  customerId: string;
  customerName: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: number;
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
  deadline?: string;
  status: 'posted' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  assignedWorkerId?: string;
  requirements?: string[];
  contactInfo?: {
    phone: string;
    email?: string;
  };
}

export type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simplified language translations for better performance
const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome',
    customer: 'Customer', 
    labor: 'Labor',
    login: 'Login',
    signup: 'Sign Up'
  },
  hi: {
    welcome: 'स्वागत',
    customer: 'ग्राहक',
    labor: 'श्रमिक', 
    login: 'लॉगिन',
    signup: 'साइन अप'
  },
  bn: {
    welcome: 'স্বাগতম',
    customer: 'গ্রাহক',
    labor: 'শ্রমিক',
    login: 'লগইন', 
    signup: 'সাইন আপ'
  },
  te: {
    welcome: 'స్వాగతం',
    customer: 'కస్టర్',
    labor: 'కార్మికుడు',
    login: 'లాగిన్',
    signup: 'సైన్ అప్'
  },
  mr: {
    welcome: 'स्वागत',
    customer: 'ग्राहक',
    labor: 'कामगार',
    login: 'लॉगिन',
    signup: 'साइन अप'
  },
  ta: {
    welcome: 'வரவேற்கிறோம்',
    customer: 'வாடிக்கையாளர்',
    labor: 'தொழிலாளி',
    login: 'உள்நுழை',
    signup: 'பதிவுசெய்'
  },
  gu: {
    welcome: 'સ્વાગત',
    customer: 'ગ્રાહક', 
    labor: 'મજૂર',
    login: 'લોગિન',
    signup: 'સાઇન અપ'
  },
  kn: {
    welcome: 'ಸ್ವಾಗತ',
    customer: 'ಗ್ರಾಹಕ',
    labor: 'ಕಾರ್ಮಿಕ',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್'
  },
  ml: {
    welcome: 'സ്വാഗതം',
    customer: 'ഉപഭോക്താവ്',
    labor: 'തൊഴിലാളി',
    login: 'ലോഗിൻ',
    signup: 'സൈൻ അപ്പ്'
  },
  pa: {
    welcome: 'ਸੁਆਗਤ',
    customer: 'ਗਾਹਕ',
    labor: 'ਮਜ਼ਦੂਰ',
    login: 'ਲਾਗਿਨ',
    signup: 'ਸਾਇਨ ਅੱਪ'
  },
  or: {
    welcome: 'ସ୍ୱାଗତ',
    customer: 'ଗ୍ରାହକ',
    labor: 'ଶ୍ରମିକ',
    login: 'ଲଗଇନ୍',
    signup: 'ସାଇନ ଅପ'
  },
  as: {
    welcome: 'স্বাগতম',
    customer: 'গ্ৰাহক',
    labor: 'শ্ৰমিক',
    login: 'লগিন',
    signup: 'চাইন আপ'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

type Page = 'home' | 'customer-login' | 'customer-signup' | 'labor-login' | 'labor-signup' | 
           'customer-dashboard' | 'labor-dashboard' | 'admin-panel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.type === 'customer') {
      navigateTo('customer-dashboard');
    } else if (user.type === 'labor') {
      navigateTo('labor-dashboard');
    } else if (user.type === 'admin') {
      navigateTo('admin-panel');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo('home');
  };

  const renderCurrentPage = () => {
    const LoadingFallback = () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );

    return (
      <Suspense fallback={<LoadingFallback />}>
        {(() => {
          switch (currentPage) {
            case 'home':
              return <Homepage onNavigate={navigateTo} />;
            case 'customer-login':
              return <CustomerLogin onNavigate={navigateTo} onLogin={handleLogin} />;
            case 'customer-signup':
              return <CustomerSignup onNavigate={navigateTo} onLogin={handleLogin} />;
            case 'labor-login':
              return <LaborLogin onNavigate={navigateTo} onLogin={handleLogin} />;
            case 'labor-signup':
              return <LaborSignup onNavigate={navigateTo} onLogin={handleLogin} />;
            case 'customer-dashboard':
              return <CustomerDashboard user={currentUser} onLogout={handleLogout} />;
            case 'labor-dashboard':
              return <LaborDashboard user={currentUser} onLogout={handleLogout} />;
            case 'admin-panel':
              return <AdminPanel user={currentUser} onLogout={handleLogout} />;
            default:
              return <Homepage onNavigate={navigateTo} />;
          }
        })()}
      </Suspense>
    );
  };

  const languageContextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <div className="min-h-screen bg-background">
        {renderCurrentPage()}
      </div>
    </LanguageContext.Provider>
  );
}