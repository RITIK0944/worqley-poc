import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Clock, 
  MapPin, 
  User, 
  Star,
  Filter,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HistoryPageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const HistoryPage = React.memo(({ user }: HistoryPageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const workHistory = [
    {
      id: 'WH001',
      customer: 'Arjun Patel',
      customerPhone: '+91 98765 43210',
      service: 'Plumbing Repair',
      description: 'Fixed leaking pipes in kitchen and bathroom',
      date: '2024-01-20',
      startTime: '09:00 AM',
      endTime: '12:30 PM',
      duration: '3h 30m',
      location: 'Sector 15, Noida',
      amount: 1200,
      status: 'Completed',
      rating: 4.8,
      feedback: 'Excellent work! Very professional and quick.',
      images: ['before.jpg', 'after.jpg'],
      category: 'Plumbing'
    },
    {
      id: 'WH002',
      customer: 'Kavita Sharma',
      customerPhone: '+91 87654 32109',
      service: 'Electrical Installation',
      description: 'Installed new ceiling fans and switches',
      date: '2024-01-19',
      startTime: '02:00 PM',
      endTime: '06:00 PM',
      duration: '4h 00m',
      location: 'Rajouri Garden, Delhi',
      amount: 1800,
      status: 'Completed',
      rating: 5.0,
      feedback: 'Perfect installation. Highly recommended!',
      images: ['installation.jpg'],
      category: 'Electrical'
    },
    {
      id: 'WH003',
      customer: 'Rohit Kumar',
      customerPhone: '+91 76543 21098',
      service: 'House Cleaning',
      description: 'Deep cleaning of 3BHK apartment',
      date: '2024-01-18',
      startTime: '10:00 AM',
      endTime: '02:00 PM',
      duration: '4h 00m',
      location: 'Dwarka, Delhi',
      amount: 1500,
      status: 'Payment Pending',
      rating: 4.5,
      feedback: 'Good cleaning service, but took a bit longer than expected.',
      images: ['cleaning1.jpg', 'cleaning2.jpg'],
      category: 'Cleaning'
    },
    {
      id: 'WH004',
      customer: 'Sneha Singh',
      customerPhone: '+91 65432 10987',
      service: 'Wall Painting',
      description: 'Painted living room and bedroom walls',
      date: '2024-01-17',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      duration: '9h 00m',
      location: 'Gurgaon, Haryana',
      amount: 2500,
      status: 'Cancelled',
      rating: null,
      feedback: null,
      images: [],
      category: 'Painting'
    },
    {
      id: 'WH005',
      customer: 'Manoj Gupta',
      customerPhone: '+91 54321 09876',
      service: 'Furniture Assembly',
      description: 'Assembled wardrobe and study table',
      date: '2024-01-16',
      startTime: '11:00 AM',
      endTime: '04:00 PM',
      duration: '5h 00m',
      location: 'Lajpat Nagar, Delhi',
      amount: 1000,
      status: 'Completed',
      rating: 4.2,
      feedback: 'Good work but could be faster.',
      images: ['furniture1.jpg'],
      category: 'Carpentry'
    }
  ];

  const statusStats = {
    all: workHistory.length,
    completed: workHistory.filter(job => job.status === 'Completed').length,
    pending: workHistory.filter(job => job.status === 'Payment Pending').length,
    cancelled: workHistory.filter(job => job.status === 'Cancelled').length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Payment Pending':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'Cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'Payment Pending':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'Cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const filteredHistory = workHistory
    .filter(job => {
      if (selectedTab !== 'all' && job.status.toLowerCase().replace(' ', '') !== selectedTab.replace('pending', 'paymentpending')) {
        return false;
      }
      if (statusFilter !== 'all' && job.status !== statusFilter) {
        return false;
      }
      if (searchTerm && !job.customer.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !job.service.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const totalEarnings = workHistory
    .filter(job => job.status === 'Completed')
    .reduce((sum, job) => sum + job.amount, 0);

  const averageRating = workHistory
    .filter(job => job.rating)
    .reduce((sum, job, _, arr) => sum + (job.rating || 0) / arr.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2>Enhanced Work History</h2>
        <p className="text-muted-foreground">Comprehensive history of all your work assignments and customer interactions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl">{workHistory.length}</p>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl text-green-600">{statusStats.completed}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl">₹{totalEarnings}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <p className="text-2xl">{averageRating.toFixed(1)}</p>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer name or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Payment Pending">Payment Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusStats.all})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({statusStats.completed})</TabsTrigger>
          <TabsTrigger value="paymentpending">Pending ({statusStats.pending})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({statusStats.cancelled})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg">No work history found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {job.service}
                            {getStatusIcon(job.status)}
                          </h3>
                          <p className="text-sm text-muted-foreground">Job ID: {job.id}</p>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{job.customer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{job.date} • {job.startTime} - {job.endTime}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Duration: {job.duration}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-medium text-green-600">₹{job.amount}</span>
                          </div>
                          {job.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span>{job.rating}/5.0</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Description: </span>
                          {job.description}
                        </p>
                        {job.feedback && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Customer Feedback: </span>
                            <span className="italic">"{job.feedback}"</span>
                          </p>
                        )}
                      </div>

                      {job.images.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{job.images.length} image(s) uploaded</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 md:w-32">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {job.status === 'Completed' && (
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
});

HistoryPage.displayName = 'HistoryPage';
export default HistoryPage;