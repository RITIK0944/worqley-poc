import React from 'react';
import { Menu, X, User, Globe, LogOut, Home, Users, Settings, History, CreditCard, Star, Gift, HelpCircle, Crown, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from './LanguageContext';
import { Language } from '../utils/translations';
import worqleyLogo from 'figma:asset/a19477eeef09f3707555b759c8e43e30beb2f943.png';

export type UserType = "customer" | "worker" | "admin";
export type Page = 
  | "splash"
  | "login-selection"
  | "customer-login"
  | "customer-signup"
  | "worker-login"
  | "worker-signup"
  | "admin-login"
  | "customer-dashboard"
  | "worker-dashboard"
  | "admin-panel"
  | "profile"
  | "history"
  | "payments"
  | "ratings"
  | "refer"
  | "issues"
  | "premium"
  | "ecommerce"
  | "settings"
  | "customer-services"
  | "customer-bookings"
  | "worker-tasks"
  | "worker-shifts"
  | "worker-earnings"
  | "worker-history"
  | "worker-shg"
  | "worker-insurance";

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
  signupMethod?: "self" | "cyber-cafe";
  workCategory?: string;
  experience?: string;
  shiftType?: "full-time" | "half-time" | "part-time" | "task-based";
  isPremium?: boolean;
  premiumExpiry?: string;
  totalEarnings?: number;
  rating?: number;
  completedJobs?: number;
  availability?: "available" | "busy" | "offline";
  hourlyRate?: number;
  skills?: string[];
  isOnline?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

interface AppSidebarProps {
  currentUser: User | null;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  currentUser, 
  currentPage, 
  onNavigate, 
  onLogout, 
  isOpen, 
  setIsOpen 
}) => {
  const { language, setLanguage, t } = useLanguage();

  const getNavigationItems = () => {
    if (!currentUser) return [];

    const baseItems = [
      { key: 'dashboard', icon: Home, label: t('dashboard'), page: `${currentUser.type}-dashboard` as Page },
      { key: 'profile', icon: User, label: t('profile'), page: 'profile' as Page },
    ];

    if (currentUser.type === 'customer') {
      return [
        ...baseItems,
        { key: 'service', icon: Users, label: 'Services', page: 'customer-services' as Page },
        { key: 'bookings', icon: History, label: 'Bookings', page: 'customer-bookings' as Page },
        { key: 'payments', icon: CreditCard, label: t('payments'), page: 'payments' as Page },
        { key: 'ratings', icon: Star, label: t('ratings'), page: 'ratings' as Page },
        { key: 'refer', icon: Gift, label: t('refer'), page: 'refer' as Page },
        { key: 'premium', icon: Crown, label: t('premium'), page: 'premium' as Page },
        { key: 'ecommerce', icon: ShoppingCart, label: t('ecommerce'), page: 'ecommerce' as Page },
        { key: 'issues', icon: HelpCircle, label: t('issues'), page: 'issues' as Page },
        { key: 'settings', icon: Settings, label: t('settings'), page: 'settings' as Page },
      ];
    } else if (currentUser.type === 'worker') {
      return [
        ...baseItems,
        { key: 'tasks', icon: Users, label: 'Tasks', page: 'worker-tasks' as Page },
        { key: 'shifts', icon: History, label: 'Shifts', page: 'worker-shifts' as Page },
        { key: 'earnings', icon: CreditCard, label: 'Earnings', page: 'worker-earnings' as Page },
        { key: 'history', icon: Star, label: t('history'), page: 'worker-history' as Page },
        { key: 'shg', icon: Users, label: 'SHG', page: 'worker-shg' as Page },
        { key: 'insurance', icon: Gift, label: 'Insurance', page: 'worker-insurance' as Page },
        { key: 'premium', icon: Crown, label: t('premium'), page: 'premium' as Page },
        { key: 'ecommerce', icon: ShoppingCart, label: t('ecommerce'), page: 'ecommerce' as Page },
        { key: 'issues', icon: HelpCircle, label: t('issues'), page: 'issues' as Page },
        { key: 'settings', icon: Settings, label: t('settings'), page: 'settings' as Page },
      ];
    }

    if (currentUser.type === 'admin') {
      return [
        { key: 'admin', icon: Users, label: t('admin'), page: 'admin-panel' as Page },
        { key: 'settings', icon: Settings, label: t('settings'), page: 'settings' as Page },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const getLanguageLabel = (lang: Language) => {
    const languageLabels: Record<Language, string> = {
      en: t('english'),
      hi: t('hindi'),
      bn: t('bengali'),
      te: t('telugu'),
      mr: t('marathi'),
      ta: t('tamil'),
      gu: t('gujarati'),
      kn: t('kannada'),
      ml: t('malayalam'),
      pa: t('punjabi'),
      or: t('odia'),
      as: t('assamese'),
      ur: t('urdu')
    };
    return languageLabels[lang] || lang;
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header with branding and mobile menu */}
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1">
            <img 
              src={worqleyLogo} 
              alt="WORQLEY Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-semibold">WORQLEY</span>
        </div>
        
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* User Profile Section */}
      {currentUser && (
        <div className="border-b p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.profilePhoto} alt={currentUser.fullName} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.fullName}</p>
              <p className="text-xs text-muted-foreground">{t(currentUser.type)}</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="mb-3">
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-full">
                <Globe className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{getLanguageLabel('en')}</SelectItem>
                <SelectItem value="hi">{getLanguageLabel('hi')}</SelectItem>
                <SelectItem value="bn">{getLanguageLabel('bn')}</SelectItem>
                <SelectItem value="te">{getLanguageLabel('te')}</SelectItem>
                <SelectItem value="mr">{getLanguageLabel('mr')}</SelectItem>
                <SelectItem value="ta">{getLanguageLabel('ta')}</SelectItem>
                <SelectItem value="gu">{getLanguageLabel('gu')}</SelectItem>
                <SelectItem value="kn">{getLanguageLabel('kn')}</SelectItem>
                <SelectItem value="ml">{getLanguageLabel('ml')}</SelectItem>
                <SelectItem value="pa">{getLanguageLabel('pa')}</SelectItem>
                <SelectItem value="or">{getLanguageLabel('or')}</SelectItem>
                <SelectItem value="as">{getLanguageLabel('as')}</SelectItem>
                <SelectItem value="ur">{getLanguageLabel('ur')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => (
          <Button
            key={item.key}
            variant={
              item.page && currentPage === item.page ? 'secondary' : 'ghost'
            }
            className="w-full justify-start"
            onClick={() => {
              if (item.page) {
                onNavigate(item.page);
              }
              setIsOpen(false);
            }}
          >
            <item.icon className="mr-3 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Logout Button */}
      {currentUser && (
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
          >
            <LogOut className="mr-3 h-4 w-4" />
            {t('logout')}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};