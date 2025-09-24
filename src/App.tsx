import React, { useState, Suspense, lazy, useEffect } from "react";
import { Menu, User, Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { AppSidebar, User as UserType, Page } from './components/AppLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import worqleyLogo from 'figma:asset/a19477eeef09f3707555b759c8e43e30beb2f943.png';

// Placeholder component for missing or loading components
const PlaceholderComponent = ({ componentName = "Component", ...props }: { componentName?: string; [key: string]: any }) => (
  <div className="min-h-[400px] bg-background flex items-center justify-center">
    <div className="text-center p-8">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <User className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{componentName}</h3>
      <p className="text-muted-foreground">This feature is coming soon!</p>
    </div>
  </div>
);

// Simple lazy loading with proper error handling and timeout
const safeLazy = (importFn: () => Promise<any>, componentName: string) => {
  return lazy(async () => {
    try {
      // Add a timeout to the import to prevent hanging
      const importWithTimeout = Promise.race([
        importFn(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error(`Import timeout for ${componentName}`)), 10000)
        )
      ]);
      
      const module = await importWithTimeout;
      if (module && module.default) {
        return { default: module.default };
      }
      throw new Error(`No default export found for ${componentName}`);
    } catch (error) {
      console.warn(`Failed to load ${componentName}:`, error);
      return { 
        default: (props: any) => <PlaceholderComponent componentName={componentName} {...props} />
      };
    }
  });
};

// Lazy loaded components
const CustomerLogin = safeLazy(() => import("./components/CustomerLogin"), "Customer Login");
const CustomerSignup = safeLazy(() => import("./components/CustomerSignup"), "Customer Signup");
const WorkerLogin = safeLazy(() => import("./components/LaborLogin"), "Worker Login");
const WorkerSignup = safeLazy(() => import("./components/LaborSignup"), "Worker Signup");
const AdminLogin = safeLazy(() => import("./components/AdminLogin"), "Admin Login");
const CustomerDashboard = safeLazy(() => import("./components/CustomerDashboard"), "Customer Dashboard");
const WorkerDashboard = safeLazy(() => import("./components/WorkerDashboard"), "Worker Dashboard");
const AdminPanel = safeLazy(() => import("./components/AdminPanel"), "Admin Panel");

// Customer components
const ServiceCategories = safeLazy(() => import("./components/customer/ServiceCategories"), "Service Categories");
const BookingHistory = safeLazy(() => import("./components/customer/BookingHistory"), "Booking History");
const CustomerProfile = safeLazy(() => import("./components/customer/ProfileSection"), "Customer Profile");
const PaymentSection = safeLazy(() => import("./components/customer/PaymentSection"), "Payments");
const RatingReview = safeLazy(() => import("./components/customer/RatingReview"), "Ratings & Reviews");
const ReferEarn = safeLazy(() => import("./components/customer/ReferEarn"), "Refer & Earn");
const CustomerSupport = safeLazy(() => import("./components/customer/Support"), "Customer Support");
const CustomerPremium = safeLazy(() => import("./components/customer/PremiumSection"), "Premium Features");
const CustomerECommerce = safeLazy(() => import("./components/customer/ECommerce"), "E-Commerce");

// Worker components
const AvailableTasks = safeLazy(() => import("./components/labor/AvailableTasks"), "Available Tasks");
const ShiftSelection = safeLazy(() => import("./components/labor/ShiftSelection"), "Shift Selection");
const EarningsPage = safeLazy(() => import("./components/worker/EarningsPage"), "Enhanced Earnings");
const HistoryPage = safeLazy(() => import("./components/worker/HistoryPage"), "Enhanced History");
const SHGPage = safeLazy(() => import("./components/worker/SHGPage"), "Self Help Group");
const InsurancePage = safeLazy(() => import("./components/worker/InsurancePage"), "Insurance");
const WorkerProfile = safeLazy(() => import("./components/labor/ProfileManagement"), "Worker Profile");
const PremiumPage = safeLazy(() => import("./components/worker/PremiumPage"), "Premium Subscription");
const ECommercePage = safeLazy(() => import("./components/worker/ECommercePage"), "E-Commerce");
const IssuesPage = safeLazy(() => import("./components/worker/IssuesPage"), "Worker Support");
const SettingsComponents = safeLazy(() => import("./components/SettingsComponents"), "Settings");

// Loading component with timeout fallback
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => {
  const [showTimeout, setShowTimeout] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, 15000); // Show timeout message after 15 seconds
    
    return () => clearTimeout(timer);
  }, []);

  if (showTimeout) {
    return (
      <div className="min-h-[400px] bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Loading taking longer than expected</h3>
          <p className="text-muted-foreground mb-4">Please refresh the page if this continues.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] bg-background flex items-center justify-center">
      <div className="text-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

// Splash Screen
const SplashScreen = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate("login-selection");
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center text-white animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-2xl p-4 shadow-2xl">
            <img 
              src={worqleyLogo} 
              alt="WORQLEY Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">WORQLEY</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">{t('smartPlatform')}</p>
          <p className="text-lg text-white/80 max-w-lg mx-auto px-4">
            {t('connectWithSkilled')} {t('worker')}s {t('instantly')}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
        </div>
        <p className="text-white/70 text-sm">{t('loading')}</p>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white/60 text-sm px-4">{t('connectingIndia')}</p>
        </div>
      </div>
    </div>
  );
};

// Login Selection Screen
const LoginSelection = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 bg-white rounded-xl p-2 shadow-lg">
              <img 
                src={worqleyLogo} 
                alt="WORQLEY Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold">WORQLEY</h1>
          <p className="text-muted-foreground mt-2">{t('smartPlatform')}</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => onNavigate("customer-login")}
            className="w-full py-6 text-lg"
            size="lg"
          >
            <User className="mr-2 h-5 w-5" />
            {t('customer')} {t('login')}
          </Button>
          
          <Button
            onClick={() => onNavigate("worker-login")}
            variant="outline"
            className="w-full py-6 text-lg"
            size="lg"
          >
            <User className="mr-2 h-5 w-5" />
            {t('worker')} {t('login')}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {t('welcome')} {t('customer')}?{' '}
              <Button
                variant="link"
                className="p-0 text-primary"
                onClick={() => onNavigate("customer-signup")}
              >
                {t('signup')}
              </Button>
            </p>
            <p className="text-sm text-muted-foreground">
              {t('welcome')} {t('worker')}?{' '}
              <Button
                variant="link"
                className="p-0 text-primary"
                onClick={() => onNavigate("worker-signup")}
              >
                {t('signup')}
              </Button>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>{t('contact')}</p>
          <p>{t('email')}</p>
          
          {/* Discrete admin access */}
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("admin-login")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Administrator Access
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-6xl mx-auto p-4">
    {children}
  </div>
);

// Main App Component
function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("splash");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    switch (user.type) {
      case "customer":
        navigateTo("customer-dashboard");
        break;
      case "worker":
        navigateTo("worker-dashboard");
        break;
      case "admin":
        navigateTo("admin-panel");
        break;
      default:
        navigateTo("login-selection");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigateTo("login-selection");
  };

  const isAuthPage = ['splash', 'login-selection', 'customer-login', 'customer-signup', 'worker-login', 'worker-signup', 'admin-login'].includes(currentPage);

  const LoadingFallback = () => <LoadingSpinner message={t('loading')} />;

  const renderCurrentPage = () => {
    const pageProps = {
      user: currentUser,
      onNavigate: navigateTo,
      onLogin: handleLogin,
      onLogout: handleLogout
    };

    switch (currentPage) {
      // Auth pages
      case "splash":
        return <SplashScreen onNavigate={navigateTo} />;
      case "login-selection":
        return <LoginSelection onNavigate={navigateTo} />;
      case "customer-login":
        return <CustomerLogin {...pageProps} />;
      case "customer-signup":
        return <CustomerSignup {...pageProps} />;
      case "worker-login":
        return <WorkerLogin {...pageProps} />;
      case "worker-signup":
        return <WorkerSignup {...pageProps} />;
      case "admin-login":
        return <AdminLogin {...pageProps} />;

      // Dashboards
      case "customer-dashboard":
        return <CustomerDashboard {...pageProps} />;
      case "worker-dashboard":
        return <WorkerDashboard {...pageProps} />;
      case "admin-panel":
        return <AdminPanel {...pageProps} />;

      // Customer pages
      case "customer-services":
        return <PageWrapper><ServiceCategories {...pageProps} /></PageWrapper>;
      case "customer-bookings":
        return <PageWrapper><BookingHistory {...pageProps} /></PageWrapper>;

      // Worker pages
      case "worker-tasks":
        return <PageWrapper><AvailableTasks {...pageProps} /></PageWrapper>;
      case "worker-shifts":
        return <PageWrapper><ShiftSelection {...pageProps} /></PageWrapper>;
      case "worker-earnings":
        return <PageWrapper><EarningsPage {...pageProps} /></PageWrapper>;
      case "worker-history":
        return <PageWrapper><HistoryPage {...pageProps} /></PageWrapper>;
      case "worker-shg":
        return <PageWrapper><SHGPage {...pageProps} /></PageWrapper>;
      case "worker-insurance":
        return <PageWrapper><InsurancePage {...pageProps} /></PageWrapper>;

      // Shared pages
      case "profile":
        return (
          <PageWrapper>
            {currentUser?.type === "customer" ? 
              <CustomerProfile {...pageProps} /> : 
              <WorkerProfile {...pageProps} />}
          </PageWrapper>
        );
      case "payments":
        return <PageWrapper><PaymentSection {...pageProps} /></PageWrapper>;
      case "ratings":
        return <PageWrapper><RatingReview {...pageProps} /></PageWrapper>;
      case "refer":
        return <PageWrapper><ReferEarn {...pageProps} /></PageWrapper>;

      case "premium":
        return (
          <PageWrapper>
            {currentUser?.type === "customer" ? 
              <CustomerPremium {...pageProps} /> : 
              <PremiumPage {...pageProps} />}
          </PageWrapper>
        );
      case "ecommerce":
        return (
          <PageWrapper>
            {currentUser?.type === "customer" ? 
              <CustomerECommerce {...pageProps} /> : 
              <ECommercePage {...pageProps} />}
          </PageWrapper>
        );
      case "issues":
        return (
          <PageWrapper>
            {currentUser?.type === "customer" ? 
              <CustomerSupport {...pageProps} /> : 
              <IssuesPage {...pageProps} />}
          </PageWrapper>
        );
      case "settings":
        return <PageWrapper><SettingsComponents {...pageProps} /></PageWrapper>;

      default:
        return <LoginSelection onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!isAuthPage && (
        <>
          <AppSidebar
            currentUser={currentUser}
            currentPage={currentPage}
            onNavigate={navigateTo}
            onLogout={handleLogout}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          
          <div className="lg:pl-64">
            <div className="sticky top-0 z-40 flex h-14 items-center gap-x-4 border-b bg-background px-4 shadow-sm lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('menu')}</span>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-white rounded p-0.5">
                  <img 
                    src={worqleyLogo} 
                    alt="WORQLEY Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold">WORQLEY</span>
              </div>
            </div>
            
            <main className="py-6">
              <div className="px-4 sm:px-6 lg:px-8">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingFallback />}>
                    {renderCurrentPage()}
                  </Suspense>
                </ErrorBoundary>
              </div>
            </main>
          </div>
        </>
      )}
      
      {isAuthPage && (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            {renderCurrentPage()}
          </Suspense>
        </ErrorBoundary>
      )}
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

// Root App with providers
export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}