import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Users,
  Shield,
  Crown,
  Calendar,
  Star,
  Bell,
  Briefcase,
  Target,
  Award,
  Settings,
  User,
  BookOpen,
  CreditCard,
  MapPin,
  Zap,
  ArrowRight,
  Wallet,
  MessageCircle,
  ThumbsUp,
  Timer,
  Activity
} from 'lucide-react';
import { User as UserType } from './AppLayout';
import { useLanguage } from './LanguageContext';
import worqleyLogo from 'figma:asset/a19477eeef09f3707555b759c8e43e30beb2f943.png';

// Lazy load worker components
const AvailableTasks = lazy(() => import('./labor/AvailableTasks'));

interface WorkerDashboardProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

function WorkerDashboard({ user, onLogout, onNavigate }: WorkerDashboardProps) {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greetingMessage, setGreetingMessage] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState(user?.availability || 'available');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreetingMessage('Good Morning');
    else if (hour < 17) setGreetingMessage('Good Afternoon');
    else setGreetingMessage('Good Evening');
  }, [currentTime]);

  if (!user) return null;

  // Enhanced mock data
  const dashboardStats = {
    todayEarnings: 850,
    weeklyEarnings: 4200,
    monthlyEarnings: 18500,
    completedTasksToday: 3,
    totalJobs: user.completedJobs || 127,
    pendingTasks: 2,
    rating: user.rating || 4.8,
    totalReviews: 89,
    responseTime: '5 min',
    completionRate: 96,
    repeatCustomers: 34,
    thisMonthJobs: 18,
    monthlyGoal: 25
  };

  const todaySchedule = [
    { id: 1, title: 'Electrical Repair', time: '10:30 AM', status: 'completed', earnings: 450, customer: 'Rajesh K.' },
    { id: 2, title: 'Plumbing Installation', time: '2:00 PM', status: 'in-progress', earnings: 650, customer: 'Priya S.' },
    { id: 3, title: 'Home Cleaning', time: '4:00 PM', status: 'upcoming', earnings: 300, customer: 'Amit M.' }
  ];

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const toggleAvailability = () => {
    const newStatus = availabilityStatus === 'available' ? 'offline' : 'available';
    setAvailabilityStatus(newStatus);
    // Here you would typically update this in the backend
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl text-white p-8">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                <img 
                  src={worqleyLogo} 
                  alt="WORQLEY Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  {greetingMessage}, {user.fullName.split(' ')[0]}!
                </h1>
                <p className="text-white/90 text-lg">
                  {user.workCategory} • Ready to take on new challenges today?
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white/80 text-sm">Local Time</p>
                <p className="font-mono font-medium">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  availabilityStatus === 'available' ? 'bg-green-400' : 
                  availabilityStatus === 'busy' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <span className="text-sm capitalize">{availabilityStatus}</span>
              </div>
            </div>
          </div>

          {/* Quick Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Today's Earnings: ₹{dashboardStats.todayEarnings}</p>
                  <p className="text-white/80 text-sm">
                    {dashboardStats.completedTasksToday} jobs completed • {dashboardStats.pendingTasks} pending
                  </p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={toggleAvailability}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {availabilityStatus === 'available' ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                <div className="text-3xl font-bold text-green-600 mt-1">₹{dashboardStats.todayEarnings}</div>
                <p className="text-sm text-green-600 mt-1">+12% from yesterday</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <div className="text-3xl font-bold text-blue-600 mt-1">{dashboardStats.totalJobs}</div>
                <p className="text-sm text-blue-600 mt-1">+{dashboardStats.thisMonthJobs} this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                <div className="text-3xl font-bold text-yellow-600 mt-1">{dashboardStats.rating}</div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({dashboardStats.totalReviews})</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                <div className="text-3xl font-bold text-purple-600 mt-1">₹{dashboardStats.monthlyEarnings}</div>
                <p className="text-sm text-purple-600 mt-1">This month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Today's Schedule</span>
              <Button variant="ghost" size="sm" onClick={() => handleNavigate('worker-shifts')}>
                Manage Schedule <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((task) => (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    task.status === 'completed' ? 'bg-green-50 border-green-500' :
                    task.status === 'in-progress' ? 'bg-blue-50 border-blue-500' :
                    'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100' :
                        task.status === 'in-progress' ? 'bg-blue-100' :
                        'bg-yellow-100'
                      }`}>
                        {task.status === 'completed' ? 
                          <CheckCircle className="h-4 w-4 text-green-600" /> :
                          task.status === 'in-progress' ?
                          <Clock className="h-4 w-4 text-blue-600" /> :
                          <Timer className="h-4 w-4 text-yellow-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {task.customer} • {task.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">₹{task.earnings}</p>
                      <Badge 
                        variant={task.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }
                      >
                        {task.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Monthly Goal</span>
                <span>{dashboardStats.thisMonthJobs}/{dashboardStats.monthlyGoal}</span>
              </div>
              <Progress value={(dashboardStats.thisMonthJobs / dashboardStats.monthlyGoal) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Rate</span>
                <span>{dashboardStats.completionRate}%</span>
              </div>
              <Progress value={dashboardStats.completionRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Repeat Customers</span>
                <span>{dashboardStats.repeatCustomers}</span>
              </div>
              <Progress value={(dashboardStats.repeatCustomers / 50) * 100} className="h-2" />
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>Avg Response Time</span>
                </span>
                <span className="font-medium text-green-600">{dashboardStats.responseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your tasks and appointments</CardDescription>
              </div>
              <Badge variant={dashboardStats.pendingTasks > 0 ? "default" : "secondary"}>
                {dashboardStats.pendingTasks} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">Electrical Repair</p>
                    <p className="text-xs text-muted-foreground">Completed at 10:30 AM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">₹450</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Plumbing Installation</p>
                    <p className="text-xs text-muted-foreground">In progress - 2:00 PM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">₹650</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm">Home Cleaning</p>
                    <p className="text-xs text-muted-foreground">Scheduled - 4:00 PM</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-yellow-600">₹300</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Your progress this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Monthly Goal</span>
                </div>
                <span className="text-sm font-medium">18/25 jobs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Customer Satisfaction</span>
                </div>
                <span className="text-sm font-medium">96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">On-time Completion</span>
                </div>
                <span className="text-sm font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Tasks Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>New Tasks Available</span>
              </CardTitle>
              <CardDescription>Fresh opportunities matching your skills</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              🔄 Live Updates
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-muted rounded-lg"></div>
              <div className="h-20 bg-muted rounded-lg"></div>
              <div className="h-20 bg-muted rounded-lg"></div>
            </div>
          }>
            <AvailableTasks user={user} displayMode="dashboard" limit={3} />
          </Suspense>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Action Cards Row 1 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('worker-tasks')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Browse Tasks</CardTitle>
                <CardDescription>Find work opportunities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore available tasks in your area and apply to ones that match your skills.
            </p>
            <Button className="w-full" onClick={() => handleNavigate('worker-tasks')}>
              View Available Tasks
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('worker-earnings')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Track Earnings</CardTitle>
                <CardDescription>Monitor your income</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View detailed reports of your earnings, completed jobs, and financial trends.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('worker-earnings')}>
              View Earnings Report
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('premium')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Go Premium</CardTitle>
                <CardDescription>Unlock more features</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get premium features like priority task access and higher earning potential.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('premium')}>
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>

        {/* Additional Action Cards Row 2 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('profile')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Profile</CardTitle>
                <CardDescription>Manage your profile</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update your skills, photos, and professional information.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('profile')}>
              Manage Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('worker-history')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Work History</CardTitle>
                <CardDescription>View completed jobs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Review your work history, ratings, and customer feedback.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('worker-history')}>
              View History
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('settings')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Settings className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>App preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage notifications, privacy, and account settings.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('settings')}>
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Worker Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Tips to Increase Your Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">⚡ Quick Response</h4>
              <p className="text-sm text-muted-foreground">
                Respond to task requests quickly to increase your chances of being selected.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">🏆 Maintain Quality</h4>
              <p className="text-sm text-muted-foreground">
                Deliver excellent work consistently to build your reputation and get more bookings.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-2">📸 Update Profile</h4>
              <p className="text-sm text-muted-foreground">
                Keep your profile updated with recent work photos and skill certifications.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium mb-2">🕐 Stay Available</h4>
              <p className="text-sm text-muted-foreground">
                Keep your availability status updated to receive more task notifications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WorkerDashboard;