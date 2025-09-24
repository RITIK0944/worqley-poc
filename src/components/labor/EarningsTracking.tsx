import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar
} from 'lucide-react';

interface EarningsTrackingProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const EarningsTracking = React.memo(({ user }: EarningsTrackingProps) => {
  const earningsData = {
    today: 1500,
    thisWeek: 8500,
    thisMonth: 32000,
    totalEarnings: 125000,
    totalJobs: 157,
    avgPerJob: 800
  };

  const recentJobs = [
    { id: '1', date: '2024-01-20', customer: 'Arjun Patel', amount: 800, status: 'Paid' },
    { id: '2', date: '2024-01-19', customer: 'Kavita Sharma', amount: 1200, status: 'Paid' },
    { id: '3', date: '2024-01-18', customer: 'Rohit Kumar', amount: 650, status: 'Pending' },
    { id: '4', date: '2024-01-17', customer: 'Sneha Singh', amount: 950, status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Earnings Tracking</h2>
        <p className="text-muted-foreground">Track your daily, weekly and monthly earnings</p>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl">₹{earningsData.today}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl">₹{earningsData.thisWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl">₹{earningsData.thisMonth}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl">₹{earningsData.totalEarnings}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl">{earningsData.totalJobs}</p>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl">₹{earningsData.avgPerJob}</p>
              <p className="text-sm text-muted-foreground">Average per Job</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p>{job.customer}</p>
                  <p className="text-sm text-muted-foreground">{job.date}</p>
                </div>
                <div className="text-right">
                  <p>₹{job.amount}</p>
                  <Badge 
                    variant={job.status === 'Paid' ? 'default' : 'secondary'}
                    className={job.status === 'Paid' ? 'bg-green-500' : ''}
                  >
                    {job.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});