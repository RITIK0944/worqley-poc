import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Download,
  Filter,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface EarningsPageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const EarningsPage = React.memo(({ user }: EarningsPageProps) => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const earningsData = {
    today: 1500,
    thisWeek: 8500,
    thisMonth: 32000,
    totalEarnings: 125000,
    totalJobs: 157,
    avgPerJob: 800,
    pendingAmount: 2500,
    availableBalance: 4500,
    monthlyGoal: 40000,
    weeklyGoal: 10000
  };

  const monthlyEarnings = [
    { month: 'Jan', amount: 28000, growth: 12 },
    { month: 'Feb', amount: 31000, growth: 10.7 },
    { month: 'Mar', amount: 29500, growth: -4.8 },
    { month: 'Apr', amount: 34500, growth: 16.9 },
    { month: 'May', amount: 32000, growth: -7.2 },
    { month: 'Jun', amount: 38500, growth: 20.3 }
  ];

  const recentTransactions = [
    { id: '1', date: '2024-01-20', customer: 'Arjun Patel', amount: 800, status: 'Paid', type: 'Plumbing Work', duration: '3h' },
    { id: '2', date: '2024-01-19', customer: 'Kavita Sharma', amount: 1200, status: 'Paid', type: 'Electrical Work', duration: '4h' },
    { id: '3', date: '2024-01-18', customer: 'Rohit Kumar', amount: 650, status: 'Pending', type: 'Cleaning', duration: '2h' },
    { id: '4', date: '2024-01-17', customer: 'Sneha Singh', amount: 950, status: 'Paid', type: 'Painting', duration: '5h' },
    { id: '5', date: '2024-01-16', customer: 'Manoj Gupta', amount: 1100, status: 'Processing', type: 'Carpentry', duration: '6h' },
  ];



  return (
    <div className="space-y-6">
      <div>
        <h2>Enhanced Earnings Dashboard</h2>
        <p className="text-muted-foreground">Track your comprehensive earnings, goals, and financial insights</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl text-green-600">₹{earningsData.availableBalance}</p>
              </div>
              <Wallet className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl text-orange-600">₹{earningsData.pendingAmount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl">₹{earningsData.today}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
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
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>



      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="week" className="space-y-6">
          {/* Weekly Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl">₹{earningsData.thisWeek}</p>
                  <p className="text-sm text-muted-foreground">Weekly Earnings</p>
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm">+15.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl">12</p>
                  <p className="text-sm text-muted-foreground">Jobs Completed</p>
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm">+3 jobs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-2xl">₹{Math.round(earningsData.thisWeek / 12)}</p>
                  <p className="text-sm text-muted-foreground">Avg per Job</p>
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm">+₹50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEarnings.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm">{item.month}</span>
                      </div>
                      <div>
                        <p>₹{item.amount}</p>
                        <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                      </div>
                    </div>
                    <div className={`flex items-center ${item.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.growth > 0 ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm">{Math.abs(item.growth)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year" className="space-y-6">
          {/* Yearly Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl">₹{earningsData.totalEarnings}</p>
                  <p className="text-sm text-muted-foreground">Total Yearly Earnings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl">{earningsData.totalJobs}</p>
                  <p className="text-sm text-muted-foreground">Total Jobs Completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>



      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p>{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.type} • {transaction.duration}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>₹{transaction.amount}</p>
                  <Badge 
                    variant={
                      transaction.status === 'Paid' ? 'default' : 
                      transaction.status === 'Pending' ? 'destructive' : 'secondary'
                    }
                    className={
                      transaction.status === 'Paid' ? 'bg-green-500 hover:bg-green-600' : 
                      transaction.status === 'Pending' ? 'bg-orange-500 hover:bg-orange-600' : ''
                    }
                  >
                    {transaction.status === 'Paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {transaction.status === 'Pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {transaction.status}
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

EarningsPage.displayName = 'EarningsPage';
export default EarningsPage;