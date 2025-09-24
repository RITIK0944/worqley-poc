import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  CreditCard,
  Wallet,
  Plus,
  Star,
  Gift,
  History,
  Smartphone,
  University,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Download,
  Filter,
  Search,
  Calendar,
  PieChart,
  BarChart3,
  Shield,
  Award,
  Zap,
  RefreshCw,
  Eye,
  EyeOff,
  Settings,
  Lock,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Percent,
  Coins,
  QrCode,
  Phone
} from 'lucide-react';
import { User as UserType } from '../AppLayout';

interface PaymentSectionProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

// Enhanced mock data
const mockWalletBalance = 2450;
const mockCashback = 125;
const mockRewardPoints = 1280;

const mockTransactions = [
  { 
    id: 'T001', 
    type: 'Payment', 
    description: 'Plumber service - Rajesh Kumar', 
    amount: -800, 
    date: '2024-01-15', 
    time: '2:30 PM',
    status: 'Completed',
    category: 'Service',
    method: 'Wallet',
    cashback: 40
  },
  { 
    id: 'T002', 
    type: 'Refund', 
    description: 'Cancelled booking refund', 
    amount: 600, 
    date: '2024-01-12', 
    time: '11:45 AM',
    status: 'Completed',
    category: 'Refund',
    method: 'Wallet',
    cashback: 0
  },
  { 
    id: 'T003', 
    type: 'Add Money', 
    description: 'Wallet top-up via UPI', 
    amount: 1000, 
    date: '2024-01-10', 
    time: '9:15 AM',
    status: 'Completed',
    category: 'Top-up',
    method: 'UPI',
    cashback: 25
  },
  { 
    id: 'T004', 
    type: 'Payment', 
    description: 'Electrician service - Suresh Patel', 
    amount: -1200, 
    date: '2024-01-08', 
    time: '4:20 PM',
    status: 'Completed',
    category: 'Service',
    method: 'Card',
    cashback: 60
  },
  { 
    id: 'T005', 
    type: 'Tip', 
    description: 'Tip for excellent service - Amit Singh', 
    amount: -50, 
    date: '2024-01-05', 
    time: '6:45 PM',
    status: 'Completed',
    category: 'Tip',
    method: 'Wallet',
    cashback: 2
  },
  { 
    id: 'T006', 
    type: 'Cashback', 
    description: 'Service payment cashback', 
    amount: 40, 
    date: '2024-01-16', 
    time: '10:00 AM',
    status: 'Completed',
    category: 'Cashback',
    method: 'Auto',
    cashback: 0
  }
];

const paymentMethods = [
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: Smartphone, 
    description: 'Pay using UPI apps like GPay, PhonePe',
    cashback: '1%',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    id: 'card', 
    name: 'Credit/Debit Card', 
    icon: CreditCard, 
    description: 'Visa, Mastercard, RuPay',
    cashback: '0.5%',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    id: 'netbanking', 
    name: 'Net Banking', 
    icon: University, 
    description: 'All major banks supported',
    cashback: '0.25%',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    id: 'wallet', 
    name: 'WORQLEY Wallet', 
    icon: Wallet, 
    description: 'Fastest and most rewarding',
    cashback: '2%',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  { 
    id: 'cash', 
    name: 'Cash on Service', 
    icon: DollarSign, 
    description: 'Pay directly to the worker',
    cashback: '0%',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  }
];

const savedCards = [
  { id: 'card1', type: 'Visa', last4: '4532', name: 'HDFC Bank', expiry: '12/25', isDefault: true },
  { id: 'card2', type: 'Mastercard', last4: '8901', name: 'SBI Card', expiry: '08/26', isDefault: false },
  { id: 'card3', type: 'RuPay', last4: '2234', name: 'Axis Bank', expiry: '03/27', isDefault: false }
];

const offers = [
  {
    id: 'offer1',
    title: 'First Service 20% Off',
    description: 'Get 20% cashback on your first service booking',
    code: 'FIRST20',
    discount: 20,
    maxDiscount: 200,
    validTill: '2024-02-28',
    type: 'Cashback'
  },
  {
    id: 'offer2',
    title: 'Weekend Special',
    description: 'Extra 10% off on weekend bookings',
    code: 'WEEKEND10',
    discount: 10,
    maxDiscount: 150,
    validTill: '2024-01-31',
    type: 'Discount'
  },
  {
    id: 'offer3',
    title: 'UPI Cashback',
    description: 'Pay via UPI and get instant cashback',
    code: 'UPI5',
    discount: 5,
    maxDiscount: 50,
    validTill: '2024-03-15',
    type: 'Cashback'
  }
];

function PaymentSection({ user, onNavigate }: PaymentSectionProps) {
  
  if (!user) return null;
  
  const [activeTab, setActiveTab] = useState('wallet');
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [selectedWorker, setSelectedWorker] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isAddMoneyDialogOpen, setIsAddMoneyDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isOfferApplied, setIsOfferApplied] = useState<string>('');

  const handleAddMoney = () => {
    if (!addMoneyAmount || parseFloat(addMoneyAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    toast.success(`₹${addMoneyAmount} added to wallet successfully!`);
    setAddMoneyAmount('');
    setIsAddMoneyDialogOpen(false);
  };

  const handleSendTip = () => {
    if (!tipAmount || !selectedWorker) {
      toast.error('Please select worker and enter tip amount');
      return;
    }
    toast.success(`Tip of ₹${tipAmount} sent to ${selectedWorker}!`);
    setTipAmount('');
    setSelectedWorker('');
  };

  const handleCopyTransactionId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Transaction ID copied to clipboard');
  };

  const handleApplyOffer = (offerCode: string) => {
    setIsOfferApplied(offerCode);
    toast.success(`Offer ${offerCode} applied successfully!`);
  };

  const handleDownloadStatement = () => {
    toast.success('Statement download initiated');
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  const monthlySpending = [
    { month: 'Jan', amount: 2800 },
    { month: 'Feb', amount: 1500 },
    { month: 'Mar', amount: 3200 },
    { month: 'Apr', amount: 800 },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Payment': return ArrowUpRight;
      case 'Refund': return ArrowDownLeft;
      case 'Add Money': return Plus;
      case 'Tip': return Gift;
      case 'Cashback': return Coins;
      default: return DollarSign;
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Wallet className="h-6 w-6" />
                <span className="font-medium">Wallet Balance</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20"
              >
                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">
                {showBalance ? `₹${mockWalletBalance.toLocaleString()}` : '₹****'}
              </p>
              <p className="text-blue-100 text-sm">Available for instant payments</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Coins className="h-6 w-6" />
              <span className="font-medium">Cashback Earned</span>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">₹{mockCashback}</p>
              <p className="text-green-100 text-sm">This month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="h-6 w-6" />
              <span className="font-medium">Reward Points</span>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold">{mockRewardPoints}</p>
              <p className="text-purple-100 text-sm">≈ ₹{Math.round(mockRewardPoints * 0.1)} value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 flex-col gap-2"
                  onClick={() => setIsAddMoneyDialogOpen(true)}
                >
                  <Plus className="h-6 w-6" />
                  Add Money
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <ArrowUpRight className="h-6 w-6" />
                  Send Money
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <QrCode className="h-6 w-6" />
                  Pay via QR
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Send Tip Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5" />
                <span>Send Tip to Worker</span>
              </CardTitle>
              <CardDescription>Appreciate good service with a tip</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Select Worker</Label>
                  <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose worker" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rajesh">Rajesh Kumar (Plumber)</SelectItem>
                      <SelectItem value="suresh">Suresh Patel (Electrician)</SelectItem>
                      <SelectItem value="amit">Amit Singh (Carpenter)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tip Amount</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setTipAmount('50')}>₹50</Button>
                <Button variant="outline" onClick={() => setTipAmount('100')}>₹100</Button>
                <Button variant="outline" onClick={() => setTipAmount('200')}>₹200</Button>
              </div>
              <Button onClick={handleSendTip} disabled={!tipAmount || !selectedWorker}>
                <Gift className="h-4 w-4 mr-2" />
                Send Tip
              </Button>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('transactions')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.slice(0, 5).map((transaction) => {
                  const Icon = getTransactionIcon(transaction.type);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date} • {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getTransactionColor(transaction.amount)}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="payment">Payments</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                    <SelectItem value="add money">Add Money</SelectItem>
                    <SelectItem value="tip">Tips</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleDownloadStatement}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              return (
                <Card key={transaction.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <Icon className={`h-6 w-6 ${getTransactionColor(transaction.amount)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{transaction.description}</h4>
                            <Badge variant="outline">
                              {transaction.id}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{transaction.date} • {transaction.time}</span>
                            <span>via {transaction.method}</span>
                            {transaction.cashback > 0 && (
                              <Badge className="bg-green-500 text-white">
                                +₹{transaction.cashback} cashback
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-bold ${getTransactionColor(transaction.amount)}`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={
                            transaction.status === 'Completed' ? 'bg-green-500' : 
                            transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }>
                            {transaction.status}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCopyTransactionId(transaction.id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          {/* Available Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Available Payment Methods</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <Card key={method.id} className={`cursor-pointer transition-colors hover:bg-gray-50 ${method.bgColor}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.bgColor}`}>
                            <Icon className={`h-6 w-6 ${method.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{method.name}</h4>
                              <Badge className="bg-green-500 text-white">
                                {method.cashback} cashback
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Saved Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Cards</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Card
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{card.type} •••• {card.last4}</p>
                        <p className="text-sm text-muted-foreground">{card.name} • Expires {card.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {card.isDefault && (
                        <Badge className="bg-blue-500 text-white">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security & Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">256-bit SSL Encryption</p>
                    <p className="text-sm text-muted-foreground">Your data is secure</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">PCI DSS Compliant</p>
                    <p className="text-sm text-muted-foreground">Industry standard security</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Percent className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Discount:</span>
                      <span className="font-medium">{offer.discount}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Discount:</span>
                      <span className="font-medium">₹{offer.maxDiscount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Valid Till:</span>
                      <span className="font-medium">{offer.validTill}</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Promo Code:</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(offer.code);
                            toast.success('Promo code copied!');
                          }}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {offer.code}
                        </Button>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handleApplyOffer(offer.code)}
                        disabled={isOfferApplied === offer.code}
                      >
                        {isOfferApplied === offer.code ? 'Applied' : 'Apply Offer'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Spending Analytics */}
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
                  {monthlySpending.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(month.amount / 3500) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-16">₹{month.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Spending by Category</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Services</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <span className="text-sm w-12">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tips</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }} />
                      </div>
                      <span className="text-sm w-12">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Other</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '10%' }} />
                      </div>
                      <span className="text-sm w-12">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₹7,500</p>
                  <p className="text-sm text-blue-700">Total Spent</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₹{mockCashback}</p>
                  <p className="text-sm text-green-700">Cashback Earned</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{mockRewardPoints}</p>
                  <p className="text-sm text-purple-700">Reward Points</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">₹{mockWalletBalance}</p>
                  <p className="text-sm text-orange-700">Wallet Balance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Money Dialog */}
      <Dialog open={isAddMoneyDialogOpen} onOpenChange={setIsAddMoneyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
            <DialogDescription>
              Choose an amount to add to your WORQLEY wallet
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={addMoneyAmount}
                onChange={(e) => setAddMoneyAmount(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" onClick={() => setAddMoneyAmount('500')}>₹500</Button>
              <Button variant="outline" onClick={() => setAddMoneyAmount('1000')}>₹1000</Button>
              <Button variant="outline" onClick={() => setAddMoneyAmount('2000')}>₹2000</Button>
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upi">UPI (Instant)</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddMoneyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMoney}>
                Add ₹{addMoneyAmount || '0'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PaymentSection;