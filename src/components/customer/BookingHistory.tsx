import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  Download,
  RefreshCw,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  CreditCard,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Edit,
  Trash2,
  Copy,
  Calendar as CalendarIcon,
  PlusCircle,
  Target,
  Wallet,
  Award,
  Users,
  Timer,
  Shield
} from 'lucide-react';
import { User as UserType } from '../AppLayout';

interface BookingHistoryProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

// Mock booking data
const mockCurrentBookings = [
  {
    id: 'BK001',
    workerName: 'Rajesh Kumar',
    workerPhone: '9876543210',
    service: 'Plumber',
    date: '2024-01-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Sector 15, Gurgaon',
    amount: '₹800',
    status: 'Confirmed',
    description: 'Kitchen sink leakage repair'
  },
  {
    id: 'BK002',
    workerName: 'Suresh Patel',
    workerPhone: '9876543211',
    service: 'Electrician',
    date: '2024-01-22',
    time: '10:00 AM - 12:00 PM',
    location: 'MG Road, Delhi',
    amount: '₹1200',
    status: 'In Progress',
    description: 'Electrical wiring installation'
  }
];

const mockPreviousBookings = [
  {
    id: 'BK003',
    workerName: 'Amit Singh',
    workerPhone: '9876543212',
    service: 'Carpenter',
    date: '2024-01-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Connaught Place, Delhi',
    amount: '₹2500',
    status: 'Completed',
    description: 'Kitchen cabinet installation',
    rating: 5,
    review: 'Excellent work, very professional'
  },
  {
    id: 'BK004',
    workerName: 'Manoj Sharma',
    workerPhone: '9876543213',
    service: 'Painter',
    date: '2024-01-10',
    time: '8:00 AM - 5:00 PM',
    location: 'Saket, Delhi',
    amount: '₹3200',
    status: 'Completed',
    description: 'Living room painting',
    rating: 4,
    review: 'Good work, completed on time'
  },
  {
    id: 'BK005',
    workerName: 'Ravi Yadav',
    workerPhone: '9876543214',
    service: 'Plumber',
    date: '2024-01-08',
    time: '3:00 PM - 5:00 PM',
    location: 'Lajpat Nagar, Delhi',
    amount: '₹600',
    status: 'Cancelled',
    description: 'Bathroom tap repair',
    cancelReason: 'Worker unavailable'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Confirmed': return 'bg-blue-500';
    case 'In Progress': return 'bg-yellow-500';
    case 'Completed': return 'bg-green-500';
    case 'Cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

function BookingHistory({ user, onNavigate }: BookingHistoryProps) {
  
  if (!user) return null;
  const [activeTab, setActiveTab] = useState('current');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showStats, setShowStats] = useState(false);

  const handleCallWorker = (phone: string, name: string) => {
    alert(`Calling ${name} at ${phone}`);
  };

  const handleChatWorker = (workerId: string, name: string) => {
    alert(`Opening chat with ${name}`);
  };

  const handleRebookService = (booking: any) => {
    alert(`Rebooking ${booking.service} service with ${booking.workerName}`);
  };

  const handleDownloadReceipt = (bookingId: string) => {
    toast.success(`Downloading receipt for booking ${bookingId}`);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    toast.success('Review submitted successfully!');
    setIsReviewDialogOpen(false);
    setReviewRating(0);
    setReviewText('');
    setSelectedBooking(null);
  };

  const handleRateWorker = (booking: any) => {
    setSelectedBooking(booking);
    setIsReviewDialogOpen(true);
  };

  const handleTrackBooking = (booking: any) => {
    toast.info(`Tracking booking ${booking.id}`);
  };

  const handleCancelBooking = (booking: any) => {
    toast.success(`Booking ${booking.id} has been cancelled`);
  };

  const handleShareBooking = (booking: any) => {
    toast.success('Booking details copied to clipboard');
  };

  const handleDispute = (booking: any) => {
    toast.info(`Dispute raised for booking ${booking.id}`);
  };

  const filteredCurrentBookings = mockCurrentBookings.filter(booking => {
    const matchesSearch = booking.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service.toLowerCase() === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const filteredPreviousBookings = mockPreviousBookings.filter(booking => {
    const matchesSearch = booking.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service.toLowerCase() === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const allBookings = [...mockCurrentBookings, ...mockPreviousBookings];
  const completedBookings = allBookings.filter(b => b.status === 'Completed');
  const totalSpent = completedBookings.reduce((sum, b) => sum + parseInt(b.amount.replace('₹', '').replace(',', '')), 0);
  const avgRating = completedBookings.filter(b => b.rating).length > 0 ? 
    (completedBookings.filter(b => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0) / completedBookings.filter(b => b.rating).length) : 0;

  const serviceTypes = [...new Set(allBookings.map(b => b.service))];
  const monthlyStats = [
    { month: 'Jan', amount: 2800, bookings: 3 },
    { month: 'Feb', amount: 1500, bookings: 2 },
    { month: 'Mar', amount: 3200, bookings: 4 },
    { month: 'Apr', amount: 0, bookings: 0 },
  ];

  const renderBookingCard = (booking: any, isCurrent = true) => (
    <Card key={booking.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 rounded-full p-3">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold">{booking.workerName}</h3>
                <Badge variant="outline" className="text-xs">
                  ID: {booking.id}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{booking.service} Service</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {booking.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {booking.time}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${getStatusColor(booking.status)} text-white mb-2`}>
              {booking.status}
            </Badge>
            <p className="text-xl font-bold text-green-600">{booking.amount}</p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">Service Location</p>
              <p className="text-sm text-muted-foreground">{booking.location}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Service Description</p>
          <p className="text-sm text-muted-foreground">{booking.description}</p>
        </div>

        {booking.rating && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < booking.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">Your Rating: {booking.rating}/5</span>
              </div>
              <Badge className="bg-green-500 text-white">Reviewed</Badge>
            </div>
            {booking.review && (
              <p className="text-sm text-green-700 italic">"{booking.review}"</p>
            )}
          </div>
        )}

        {booking.cancelReason && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-700">Booking Cancelled</span>
            </div>
            <p className="text-sm text-red-600">{booking.cancelReason}</p>
          </div>
        )}

        {booking.status === 'In Progress' && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Service in Progress</span>
              <Timer className="h-4 w-4 text-blue-500" />
            </div>
            <Progress value={65} className="mb-2" />
            <p className="text-xs text-blue-600">Estimated completion: 1.5 hours</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {isCurrent && (
            <>
              {booking.status === 'Confirmed' && (
                <Button size="sm" onClick={() => handleTrackBooking(booking)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Track
                </Button>
              )}
              <Button size="sm" onClick={() => handleCallWorker(booking.workerPhone, booking.workerName)}>
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleChatWorker(booking.id, booking.workerName)}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Chat
              </Button>
              {booking.status === 'Confirmed' && (
                <Button size="sm" variant="destructive" onClick={() => handleCancelBooking(booking)}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </>
          )}
          
          {!isCurrent && (
            <>
              <Button size="sm" variant="outline" onClick={() => handleRebookService(booking)}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Book Again
              </Button>
              {booking.status === 'Completed' && !booking.rating && (
                <Button size="sm" onClick={() => handleRateWorker(booking)}>
                  <Star className="h-4 w-4 mr-1" />
                  Rate Service
                </Button>
              )}
              {booking.status === 'Completed' && (
                <Button size="sm" variant="outline" onClick={() => handleDispute(booking)}>
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Dispute
                </Button>
              )}
            </>
          )}
          
          <Button size="sm" variant="outline" onClick={() => handleDownloadReceipt(booking.id)}>
            <Download className="h-4 w-4 mr-1" />
            Receipt
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleShareBooking(booking)}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-semibold">{completedBookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-semibold">₹{totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-xl font-semibold">{avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Services Used</p>
                <p className="text-xl font-semibold">{serviceTypes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="current">
              Current ({filteredCurrentBookings.length})
            </TabsTrigger>
            <TabsTrigger value="previous">
              Previous ({filteredPreviousBookings.length})
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" onClick={() => setShowStats(!showStats)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            {showStats ? 'Hide' : 'Show'} Stats
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {serviceTypes.map(service => (
                    <SelectItem key={service} value={service.toLowerCase()}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="service">Service Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="current" className="space-y-4">
          {filteredCurrentBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Current Bookings</h3>
                <p className="text-muted-foreground">You don't have any active bookings right now.</p>
                <Button className="mt-4" onClick={() => onNavigate?.('customer-services')}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Book a Service
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredCurrentBookings.map(booking => renderBookingCard(booking, true))
          )}
        </TabsContent>

        <TabsContent value="previous" className="space-y-4">
          {filteredPreviousBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Previous Bookings</h3>
                <p className="text-muted-foreground">Your completed bookings will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            filteredPreviousBookings.map(booking => renderBookingCard(booking, false))
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Monthly Spending</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-primary/10 rounded flex items-center justify-center">
                          <span className="text-xs font-medium">{month.month}</span>
                        </div>
                        <div>
                          <p className="font-medium">₹{month.amount}</p>
                          <p className="text-sm text-muted-foreground">{month.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(month.amount / 3500) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Service Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceTypes.map((service) => {
                    const serviceBookings = allBookings.filter(b => b.service === service);
                    const percentage = (serviceBookings.length / allBookings.length) * 100;
                    return (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{service}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">
                            {serviceBookings.length}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Your Activity Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{allBookings.length}</p>
                    <p className="text-sm text-blue-700">Total Bookings</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{completedBookings.length}</p>
                    <p className="text-sm text-green-700">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {Math.round((completedBookings.length / allBookings.length) * 100)}%
                    </p>
                    <p className="text-sm text-yellow-700">Success Rate</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      ₹{Math.round(totalSpent / completedBookings.length) || 0}
                    </p>
                    <p className="text-sm text-purple-700">Avg Booking Cost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Your Service Experience</DialogTitle>
            <DialogDescription>
              How was your experience with {selectedBooking?.workerName}?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant="ghost"
                    size="sm"
                    onClick={() => setReviewRating(star)}
                  >
                    <Star 
                      className={`h-6 w-6 ${star <= reviewRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                    />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Review (Optional)</Label>
              <Textarea
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReview}>
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingHistory;