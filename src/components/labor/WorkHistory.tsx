import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react';


interface WorkHistoryProps {
  user: any;
}

export const WorkHistory = React.memo(({ user }: WorkHistoryProps) => {
  const workHistory = [
    {
      id: '1',
      customerName: 'Rajesh Sharma',
      serviceType: 'Plumbing',
      description: 'Kitchen sink repair and pipe replacement',
      location: 'Sector 15, Gurgaon',
      date: '2024-01-20',
      status: 'completed',
      payment: 800,
      rating: 5,
      review: 'Excellent work! Very professional and completed on time.'
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      serviceType: 'Plumbing',
      description: 'Bathroom tap installation and water pressure check',
      location: 'MG Road, Delhi',
      date: '2024-01-19',
      status: 'completed',
      payment: 1200,
      rating: 4,
      review: 'Good work, but took a bit longer than expected.'
    },
    {
      id: '3',
      customerName: 'Vikram Singh',
      serviceType: 'Plumbing',
      description: 'Emergency toilet repair',
      location: 'Connaught Place, Delhi',
      date: '2024-01-18',
      status: 'completed',
      payment: 950,
      rating: 5,
      review: 'Quick response and perfect solution. Highly recommended!'
    },
    {
      id: '4',
      customerName: 'Sunita Devi',
      serviceType: 'Plumbing',
      description: 'Water tank cleaning and maintenance',
      location: 'Dwarka, Delhi',
      date: '2024-01-17',
      status: 'cancelled',
      payment: 0,
      rating: 0,
      review: 'Customer cancelled due to personal reasons'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const stats = {
    total: workHistory.length,
    completed: workHistory.filter(j => j.status === 'completed').length,
    cancelled: workHistory.filter(j => j.status === 'cancelled').length,
    totalEarnings: workHistory.filter(j => j.status === 'completed').reduce((sum, j) => sum + j.payment, 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Work History</h2>
        <p className="text-muted-foreground">View your completed jobs and customer feedback</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl text-green-600">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl text-red-600">{stats.cancelled}</p>
            <p className="text-sm text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl">₹{stats.totalEarnings}</p>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Job History List */}
      <div className="space-y-4">
        {workHistory.map(job => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3>{job.customerName}</h3>
                      <Badge className={`text-white ${getStatusColor(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                      {job.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          {renderStars(job.rating)}
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-lg text-green-600">₹{job.payment}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {job.date}
                  </div>
                </div>

                {/* Review */}
                {job.review && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm italic">"{job.review}"</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
});