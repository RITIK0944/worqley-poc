import React, { useState, Suspense, lazy } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Users,
  Shield,
  Crown,
  Calendar,
  Headphones,
  Star,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import { User as UserType, useLanguage } from '../App';

// Lazy load labor components
const AvailableTasks = lazy(() => import('./labor/AvailableTasks').then(module => ({ default: module.AvailableTasks })));
const TaskBoard = lazy(() => import('./labor/TaskBoard').then(module => ({ default: module.TaskBoard })));
const ProfileManagement = lazy(() => import('./labor/ProfileManagement').then(module => ({ default: module.ProfileManagement })));
const ShiftSelection = lazy(() => import('./labor/ShiftSelection').then(module => ({ default: module.ShiftSelection })));
const EarningsTracking = lazy(() => import('./labor/EarningsTracking').then(module => ({ default: module.EarningsTracking })));
const SHGSection = lazy(() => import('./labor/SHGSection').then(module => ({ default: module.SHGSection })));
const InsuranceSection = lazy(() => import('./labor/InsuranceSection').then(module => ({ default: module.InsuranceSection })));
const PremiumSubscription = lazy(() => import('./labor/PremiumSubscription').then(module => ({ default: module.PremiumSubscription })));
const WorkHistory = lazy(() => import('./labor/WorkHistory').then(module => ({ default: module.WorkHistory })));
const SupportSection = lazy(() => import('./labor/SupportSection').then(module => ({ default: module.SupportSection })));

interface LaborDashboardProps {
  user: UserType | null;
  onLogout: () => void;
}

export function LaborDashboard({ user, onLogout }: LaborDashboardProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('tasks');

  if (!user) return null;

  const handleApplyToTask = (taskId: string) => {
    alert(`Applied to task ${taskId}. Customer will be notified of your interest!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profilePhoto} />
                <AvatarFallback>
                  {user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-medium">Welcome, {user.fullName}</h1>
                <p className="text-sm text-muted-foreground">Labor Dashboard • {user.workCategory}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="tasks" className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="shifts" className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Shifts</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Earnings</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="shg" className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">SHG</span>
            </TabsTrigger>
            <TabsTrigger value="insurance" className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center space-x-1">
              <Crown className="h-4 w-4" />
              <span className="hidden sm:inline">Premium</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-1">
              <Headphones className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <TaskBoard user={user} onApplyToTask={handleApplyToTask} />
            </Suspense>
          </TabsContent>

          <TabsContent value="profile">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ProfileManagement user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="shifts">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <ShiftSelection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="earnings">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <EarningsTracking user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="history">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <WorkHistory user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="shg">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <SHGSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="insurance">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <InsuranceSection user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="premium">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <PremiumSubscription user={user} />
            </Suspense>
          </TabsContent>

          <TabsContent value="support">
            <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div></div>}>
              <SupportSection user={user} />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Floating Profile Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            className="rounded-full h-14 w-14 shadow-lg"
            onClick={() => setActiveTab('profile')}
          >
            <Star className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}