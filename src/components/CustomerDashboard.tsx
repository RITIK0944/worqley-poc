import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Search, 
  Calendar, 
  ShoppingCart,
  Crown,
  Headphones,
  Star,
  Gift,
  CreditCard,
  User,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Bell,
  Wallet,
  ArrowRight,
  DollarSign,
  Award,
  MessageCircle,
  Settings,
  Shield,
  Target,
  Zap
} from 'lucide-react';
import { User as UserType } from './AppLayout';
import { useLanguage } from './LanguageContext';
import worqleyLogo from 'figma:asset/a19477eeef09f3707555b759c8e43e30beb2f943.png';

interface CustomerDashboardProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

function CustomerDashboard({ user, onLogout, onNavigate }: CustomerDashboardProps) {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greetingMessage, setGreetingMessage] = useState('');

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

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Mock data for enhanced dashboard
  const dashboardStats = {
    totalBookings: 12,
    avgRating: 4.8,
    moneySaved: 2450,
    activeBookings: 2,
    completedThisMonth: 5,
    favoriteWorkers: 8,
    walletBalance: 1250,
    loyaltyPoints: 340
  };

  const upcomingBooking = {
    service: 'Electrical Work',
    worker: 'Ravi Kumar',
    date: 'Tomorrow',
    time: '10:00 AM',
    status: 'confirmed'
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
                <p className="text-white/90 text-lg">Ready to find skilled workers for your next project?</p>
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
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Quick Status */}
          {upcomingBooking && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Next Booking: {upcomingBooking.service}</p>
                    <p className="text-white/80 text-sm">
                      with {upcomingBooking.worker} • {upcomingBooking.date} at {upcomingBooking.time}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-100 border-green-500/30">
                  Confirmed
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                <div className="text-3xl font-bold text-primary mt-1">{dashboardStats.totalBookings}</div>
                <p className="text-sm text-green-600 mt-1">+{dashboardStats.completedThisMonth} this month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <div className="text-3xl font-bold text-yellow-600 mt-1">{dashboardStats.avgRating}</div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
                  ))}
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
                <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
                <div className="text-3xl font-bold text-green-600 mt-1">₹{dashboardStats.walletBalance}</div>
                <p className="text-sm text-muted-foreground mt-1">+₹{dashboardStats.moneySaved} saved</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Loyalty Points</p>
                <div className="text-3xl font-bold text-purple-600 mt-1">{dashboardStats.loyaltyPoints}</div>
                <p className="text-sm text-purple-600 mt-1">Redeem rewards</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Service Activity</span>
              <Button variant="ghost" size="sm" onClick={() => handleNavigate('customer-bookings')}>
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Electrical work completed</p>
                    <p className="text-sm text-muted-foreground">Rated Ravi Kumar - 5 stars</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Plumbing service scheduled</p>
                    <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
                <Badge className="bg-blue-500">Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Referral bonus earned</p>
                    <p className="text-sm text-muted-foreground">₹100 credited to wallet</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Services Used</span>
                <span>{dashboardStats.completedThisMonth}/10</span>
              </div>
              <Progress value={(dashboardStats.completedThisMonth / 10) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Money Saved Goal</span>
                <span>₹{dashboardStats.moneySaved}/₹5000</span>
              </div>
              <Progress value={(dashboardStats.moneySaved / 5000) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Favorite Workers</span>
                <span>{dashboardStats.favoriteWorkers}/15</span>
              </div>
              <Progress value={(dashboardStats.favoriteWorkers / 15) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Action Cards Row 1 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('customer-services')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Find Services</CardTitle>
                <CardDescription>Book skilled workers instantly</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Browse 15+ service categories and connect with verified workers in your area.
            </p>
            <Button className="w-full" onClick={() => handleNavigate('customer-services')}>
              Browse Services
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('customer-bookings')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Bookings</CardTitle>
                <CardDescription>Track your service history</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View past bookings, track ongoing services, and manage your appointments.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('customer-bookings')}>
              View Bookings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('premium')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Go Premium</CardTitle>
                <CardDescription>Unlock exclusive benefits</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Get priority booking, special discounts, and premium customer support.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('premium')}>
              Upgrade Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('ecommerce')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">E-Commerce</CardTitle>
                <CardDescription>Shop for tools & supplies</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Buy quality tools and materials needed for your projects.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('ecommerce')}>
              Shop Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('refer')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Refer & Earn</CardTitle>
                <CardDescription>Invite friends and earn rewards</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Earn ₹100 for every friend who books their first service.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('refer')}>
              Start Referring
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('issues')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Headphones className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">24/7 Support</CardTitle>
                <CardDescription>Get help anytime</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our support team is available round the clock to assist you.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('issues')}>
              Contact Support
            </Button>
          </CardContent>
        </Card>

        {/* Additional Action Cards Row 2 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('ratings')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Ratings</CardTitle>
                <CardDescription>View your service ratings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Check ratings you've given and received from workers.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('ratings')}>
              View Ratings
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('payments')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Payments</CardTitle>
                <CardDescription>Manage your payments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View payment history, add payment methods, and manage billing.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('payments')}>
              Manage Payments
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('profile')}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-100 rounded-lg">
                <User className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <CardTitle className="text-lg">My Profile</CardTitle>
                <CardDescription>Update your information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Edit your profile, contact information, and preferences.
            </p>
            <Button variant="outline" className="w-full" onClick={() => handleNavigate('profile')}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest bookings and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Star className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Electrical work completed</p>
                  <p className="text-sm text-muted-foreground">Rated Ravi Kumar - 5 stars</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Plumbing service booked</p>
                  <p className="text-sm text-muted-foreground">Scheduled for tomorrow 10 AM</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Gift className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Referral bonus earned</p>
                  <p className="text-sm text-muted-foreground">₹100 credited to your wallet</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Better Service Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">📋 Be Specific</h4>
              <p className="text-sm text-muted-foreground">
                Provide detailed descriptions of your requirements to get accurate quotes and better service.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">💬 Communicate Clearly</h4>
              <p className="text-sm text-muted-foreground">
                Stay in touch with workers through our in-app chat for updates and clarifications.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-2">⭐ Rate & Review</h4>
              <p className="text-sm text-muted-foreground">
                Help other customers by rating workers and sharing your experience.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium mb-2">🔄 Book in Advance</h4>
              <p className="text-sm text-muted-foreground">
                Schedule services ahead of time to ensure availability and better planning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerDashboard;