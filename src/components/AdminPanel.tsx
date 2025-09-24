import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Users, 
  LogOut, 
  Search,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Activity,
  BarChart3,
  Clock,
  MapPin,
  IndianRupee,
  Smartphone,
  Monitor
} from 'lucide-react';
import { User as UserType } from './AppLayout';

interface AdminPanelProps {
  user: UserType | null;
  onLogout: () => void;
}

// Mock admin user for demo
const mockAdminUser = {
  id: 'admin',
  fullName: 'Admin User',
  email: 'admin@workconnect.com',
  mobile: '9999999999',
  type: 'admin' as const
};

// Mock data for customers
const mockCustomers = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    mobile: '9876543210',
    joinDate: '2024-01-01',
    totalBookings: 12,
    status: 'Active'
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    mobile: '9876543211',
    joinDate: '2024-01-05',
    totalBookings: 8,
    status: 'Active'
  },
  {
    id: '3',
    fullName: 'Robert Johnson',
    email: 'robert@example.com',
    mobile: '9876543212',
    joinDate: '2024-01-10',
    totalBookings: 0,
    status: 'Inactive'
  }
];

// Mock data for laborers
const mockLaborers = [
  {
    id: '1',
    fullName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    mobile: '9876543212',
    workCategory: 'Plumber',
    aadhaarNumber: '1234-5678-9012',
    joinDate: '2024-01-01',
    completedJobs: 157,
    rating: 4.8,
    status: 'Verified',
    earnings: 32000
  },
  {
    id: '2',
    fullName: 'Suresh Patel',
    email: 'suresh@example.com',
    mobile: '9876543213',
    workCategory: 'Electrician',
    aadhaarNumber: '2345-6789-0123',
    joinDate: '2024-01-02',
    completedJobs: 203,
    rating: 4.6,
    status: 'Verified',
    earnings: 45500
  },
  {
    id: '3',
    fullName: 'Amit Singh',
    email: 'amit@example.com',
    mobile: '9876543214',
    workCategory: 'Carpenter',
    aadhaarNumber: '3456-7890-1234',
    joinDate: '2024-01-15',
    completedJobs: 89,
    rating: 4.9,
    status: 'Pending',
    earnings: 28900
  }
];

// Mock booking data
const mockBookings = [
  {
    id: '1',
    customerName: 'John Doe',
    workerName: 'Rajesh Kumar',
    service: 'Plumbing',
    date: '2024-01-15',
    amount: '₹800',
    status: 'Completed'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    workerName: 'Suresh Patel',
    service: 'Electrical',
    date: '2024-01-14',
    amount: '₹1200',
    status: 'Completed'
  },
  {
    id: '3',
    customerName: 'Robert Johnson',
    workerName: 'Amit Singh',
    service: 'Carpentry',
    date: '2024-01-12',
    amount: '₹2500',
    status: 'Cancelled'
  }
];

// Mock platform statistics
const mockStats = {
  totalCustomers: 1248,
  totalLaborers: 356,
  totalBookings: 5679,
  totalRevenue: 2845000,
  averageRating: 4.7,
  completionRate: 94.2,
  activeUsers: 142,
  dailySignups: 23,
  platformCommission: 284500,
  mobileUsers: 89.2,
  webUsers: 10.8
};

// Mock recent activity logs
const mockActivityLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    type: 'user_signup',
    details: 'New customer registration: Priya Sharma',
    severity: 'info',
    device: 'mobile'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:28:12',
    type: 'booking_created',
    details: 'Booking created: Cleaning service by Ravi Kumar',
    severity: 'success',
    device: 'web'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:25:33',
    type: 'payment_completed',
    details: 'Payment received: ₹1,200 from John Doe',
    severity: 'success',
    device: 'mobile'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:22:45',
    type: 'worker_verification',
    details: 'Worker verification completed: Amit Singh (Carpenter)',
    severity: 'info',
    device: 'web'
  },
  {
    id: '5',
    timestamp: '2024-01-15 14:18:07',
    type: 'complaint_raised',
    details: 'Customer complaint: Late arrival issue reported',
    severity: 'warning',
    device: 'mobile'
  },
  {
    id: '6',
    timestamp: '2024-01-15 14:15:22',
    type: 'system_alert',
    details: 'High server load detected - auto-scaling initiated',
    severity: 'error',
    device: 'system'
  }
];

// Mock geographical data
const mockGeographyData = [
  { state: 'Maharashtra', users: 342, bookings: 1247 },
  { state: 'Karnataka', users: 298, bookings: 1089 },
  { state: 'Tamil Nadu', users: 267, bookings: 967 },
  { state: 'Gujarat', users: 198, bookings: 723 },
  { state: 'Delhi', users: 143, bookings: 534 }
];

function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Use mock admin user for demo if not provided
  const currentUser = user || mockAdminUser;

  const handleVerifyLaborer = (laborerId: string) => {
    alert(`Laborer ${laborerId} has been verified.`);
  };

  const handleRejectLaborer = (laborerId: string) => {
    alert(`Laborer ${laborerId} verification has been rejected.`);
  };

  const handleViewDetails = (type: string, id: string) => {
    alert(`Viewing detailed information for ${type} ID: ${id}`);
  };

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLaborers = mockLaborers.filter(laborer =>
    laborer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    laborer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    laborer.workCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-xl text-primary">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {currentUser.fullName}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'customers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('customers')}
          >
            Customers ({mockStats.totalCustomers})
          </Button>
          <Button 
            variant={activeTab === 'laborers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('laborers')}
          >
            Workers ({mockStats.totalLaborers})
          </Button>
          <Button 
            variant={activeTab === 'bookings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings ({mockStats.totalBookings})
          </Button>
          <Button 
            variant={activeTab === 'analytics' ? 'default' : 'outline'}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </Button>
          <Button 
            variant={activeTab === 'activity' ? 'default' : 'outline'}
            onClick={() => setActiveTab('activity')}
          >
            Live Activity
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalCustomers}</p>
                    <p className="text-sm text-muted-foreground">Customers</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalLaborers}</p>
                    <p className="text-sm text-muted-foreground">Workers</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.totalBookings}</p>
                    <p className="text-sm text-muted-foreground">Bookings</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-lg">₹{(mockStats.totalRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.averageRating}⭐</p>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                    <p className="text-2xl">{mockStats.completionRate}%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">New worker registration</p>
                      <p className="text-sm text-muted-foreground">Amit Singh (Carpenter) pending verification</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Booking completed</p>
                      <p className="text-sm text-muted-foreground">John Doe → Rajesh Kumar (Plumbing) - ₹800</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Customer complaint</p>
                      <p className="text-sm text-muted-foreground">Service quality concern reported - needs review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage customer accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search customers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredCustomers.map(customer => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{customer.fullName}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.mobile}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                            {customer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {customer.totalBookings} bookings • Joined {customer.joinDate}
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails('customer', customer.id)}
                          className="mt-2"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Laborers Tab */}
        {activeTab === 'laborers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Worker Management</CardTitle>
                <CardDescription>Verify and manage worker accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Search workers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <div className="space-y-4">
                  {filteredLaborers.map(laborer => (
                    <div key={laborer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 rounded-full p-2">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{laborer.fullName}</p>
                          <p className="text-sm text-muted-foreground">{laborer.email}</p>
                          <p className="text-sm text-muted-foreground">{laborer.mobile}</p>
                          <p className="text-sm text-muted-foreground">Aadhaar: {laborer.aadhaarNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{laborer.workCategory}</Badge>
                          <Badge 
                            variant={laborer.status === 'Verified' ? 'default' : 'destructive'}
                            className={laborer.status === 'Verified' ? 'bg-green-500' : ''}
                          >
                            {laborer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {laborer.completedJobs} jobs • {laborer.rating}⭐ • ₹{laborer.earnings}
                        </p>
                        <div className="flex space-x-2">
                          {laborer.status === 'Pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleVerifyLaborer(laborer.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleRejectLaborer(laborer.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewDetails('laborer', laborer.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Monitor all platform bookings and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 rounded-full p-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.customerName} → {booking.workerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.service} service</p>
                        <p className="text-sm text-muted-foreground">Date: {booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge 
                          variant={booking.status === 'Completed' ? 'default' : 'destructive'}
                          className={booking.status === 'Completed' ? 'bg-green-500' : ''}
                        >
                          {booking.status}
                        </Badge>
                        <span className="font-medium">{booking.amount}</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails('booking', booking.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.activeUsers}</p>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.dailySignups}</p>
                      <p className="text-sm text-muted-foreground">Daily Signups</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">₹{(mockStats.platformCommission / 1000).toFixed(0)}K</p>
                      <p className="text-sm text-muted-foreground">Commission Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Device Usage</CardTitle>
                  <CardDescription>How users access the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-blue-500" />
                        <span>Mobile App</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{width: `${mockStats.mobileUsers}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{mockStats.mobileUsers}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4 text-green-500" />
                        <span>Web Browser</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{width: `${mockStats.webUsers}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{mockStats.webUsers}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Users and bookings by state</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockGeographyData.map((state, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span className="font-medium">{state.state}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{state.users} users</p>
                          <p className="text-xs text-muted-foreground">{state.bookings} bookings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Live Activity Tab */}
        {activeTab === 'activity' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span>Live Activity Monitor</span>
              </CardTitle>
              <CardDescription>Real-time platform activities and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivityLogs.map(log => (
                  <div 
                    key={log.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                      log.severity === 'success' ? 'bg-green-50 border-green-500' :
                      log.severity === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      log.severity === 'error' ? 'bg-red-50 border-red-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-1 rounded-full ${
                        log.severity === 'success' ? 'bg-green-100' :
                        log.severity === 'warning' ? 'bg-yellow-100' :
                        log.severity === 'error' ? 'bg-red-100' :
                        'bg-blue-100'
                      }`}>
                        {log.severity === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {log.severity === 'warning' && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                        {log.severity === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                        {log.severity === 'info' && <Activity className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{log.details}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{log.timestamp}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            {log.device === 'mobile' && <Smartphone className="h-3 w-3" />}
                            {log.device === 'web' && <Monitor className="h-3 w-3" />}
                            {log.device === 'system' && <Activity className="h-3 w-3" />}
                            <span>{log.device}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        log.severity === 'success' ? 'default' :
                        log.severity === 'warning' ? 'secondary' :
                        log.severity === 'error' ? 'destructive' :
                        'outline'
                      }
                      className={
                        log.severity === 'success' ? 'bg-green-500' :
                        log.severity === 'warning' ? 'bg-yellow-500' :
                        ''
                      }
                    >
                      {log.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  Load More Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;