import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { 
  Crown, 
  Star, 
  Zap,
  Shield,
  TrendingUp,
  Users,
  Gift,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Sparkles,
  Award,
  Target,
  DollarSign,
  Clock,
  RefreshCw,
  Eye,
  Download,
  Plus,
  Heart,
  Briefcase,
  BookOpen,
  MessageCircle
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface PremiumPageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const PremiumPage = React.memo(({ user }: PremiumPageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [autoRenewal, setAutoRenewal] = useState(true);

  const premiumStatus = {
    isPremium: true,
    plan: 'WORQLEY Pro',
    startDate: '2023-06-15',
    endDate: '2024-06-14',
    daysLeft: 125,
    monthlyFee: 299,
    yearlyFee: 2999,
    savings: 588,
    autoRenewal: true
  };

  const premiumFeatures = [
    {
      category: 'Job Opportunities',
      features: [
        { name: 'Priority Job Listings', included: true, description: 'Get first access to high-paying jobs' },
        { name: 'Exclusive Premium Jobs', included: true, description: 'Access to premium-only job postings' },
        { name: 'Advanced Job Matching', included: true, description: 'AI-powered job recommendations' },
        { name: 'Multiple Bid Submissions', included: true, description: 'Bid on unlimited jobs' }
      ]
    },
    {
      category: 'Profile & Visibility',
      features: [
        { name: 'Premium Badge', included: true, description: 'Stand out with premium verification' },
        { name: 'Featured Profile', included: true, description: 'Higher visibility in search results' },
        { name: 'Portfolio Showcase', included: true, description: 'Unlimited project gallery' },
        { name: 'Video Introduction', included: true, description: 'Add personal video to profile' }
      ]
    },
    {
      category: 'Support & Services',
      features: [
        { name: '24/7 Priority Support', included: true, description: 'Dedicated customer support' },
        { name: 'Account Manager', included: true, description: 'Personal account management' },
        { name: 'Skill Verification', included: true, description: 'Official skill certifications' },
        { name: 'Legal Assistance', included: true, description: 'Basic legal support for disputes' }
      ]
    },
    {
      category: 'Financial Benefits',
      features: [
        { name: 'Lower Commission Rates', included: true, description: '5% vs 8% for regular users' },
        { name: 'Instant Payments', included: true, description: 'Get paid within 24 hours' },
        { name: 'Financial Planning', included: true, description: 'Monthly financial reports' },
        { name: 'Insurance Discounts', included: true, description: '20% off on insurance premiums' }
      ]
    }
  ];

  const usageStats = {
    jobsApplied: 45,
    jobsWon: 23,
    successRate: 51,
    avgRating: 4.8,
    totalEarnings: 125000,
    savedCommission: 3750,
    premiumJobsWon: 12,
    supportTickets: 3
  };

  const planComparison = [
    {
      plan: 'Basic',
      price: 0,
      period: 'Forever',
      features: [
        'Limited job applications (5/day)',
        'Standard support',
        '8% commission rate',
        'Basic profile features',
        'Regular job listings only'
      ],
      color: 'border-gray-200',
      button: 'Current Plan',
      disabled: true
    },
    {
      plan: 'WORQLEY Pro',
      price: 299,
      period: 'month',
      popular: true,
      features: [
        'Unlimited job applications',
        'Priority 24/7 support',
        '5% commission rate',
        'Premium profile features',
        'Exclusive premium jobs',
        'Instant payments',
        'Account manager'
      ],
      color: 'border-blue-500',
      button: 'Current Plan',
      disabled: true
    },
    {
      plan: 'WORQLEY Elite',
      price: 599,
      period: 'month',
      features: [
        'Everything in Pro',
        'Personal branding support',
        '3% commission rate',
        'White-glove onboarding',
        'Custom insurance plans',
        'Business development support',
        'Tax consultation'
      ],
      color: 'border-purple-500',
      button: 'Upgrade',
      disabled: false
    }
  ];

  const benefits = [
    {
      title: 'Higher Earnings',
      description: 'Earn 15-25% more with premium jobs and lower commission rates',
      icon: TrendingUp,
      value: '+₹18,750',
      color: 'text-green-500'
    },
    {
      title: 'More Job Wins',
      description: 'Premium badge increases your job win rate by 40%',
      icon: Target,
      value: '+40%',
      color: 'text-blue-500'
    },
    {
      title: 'Faster Payments',
      description: 'Get paid instantly instead of waiting 7 days',
      icon: Zap,
      value: '24 hrs',
      color: 'text-yellow-500'
    },
    {
      title: 'Priority Support',
      description: 'Get help when you need it with dedicated support',
      icon: Shield,
      value: '24/7',
      color: 'text-purple-500'
    }
  ];

  const recentActivity = [
    {
      date: '2024-01-20',
      activity: 'Premium job application submitted',
      details: 'Applied for high-value electrical project',
      impact: '+₹2,500 potential earnings',
      type: 'job'
    },
    {
      date: '2024-01-18',
      activity: 'Commission savings',
      details: 'Saved 3% commission on completed job',
      impact: '+₹450 saved',
      type: 'savings'
    },
    {
      date: '2024-01-15',
      activity: 'Priority support used',
      details: 'Quick resolution of payment issue',
      impact: '2 hours response time',
      type: 'support'
    },
    {
      date: '2024-01-12',
      activity: 'Premium badge boost',
      details: 'Profile views increased significantly',
      impact: '+150% profile views',
      type: 'visibility'
    }
  ];

  const renewalProgress = Math.max(0, 100 - (premiumStatus.daysLeft / 365) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2>Premium Membership</h2>
        <p className="text-muted-foreground">Maximize your earning potential with WORQLEY Premium features</p>
      </div>

      {/* Premium Status Card */}
      <Card className="border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {premiumStatus.plan}
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <Star className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground">Premium member since {premiumStatus.startDate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-medium text-blue-600">₹{premiumStatus.monthlyFee}<span className="text-sm">/month</span></p>
              <p className="text-sm text-green-600">Saving ₹{premiumStatus.savings}/year</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xl font-medium">{premiumStatus.daysLeft}</p>
              <p className="text-sm text-muted-foreground">Days Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-green-600">₹{usageStats.savedCommission}</p>
              <p className="text-sm text-muted-foreground">Commission Saved</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-blue-600">{usageStats.premiumJobsWon}</p>
              <p className="text-sm text-muted-foreground">Premium Jobs Won</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-purple-600">{usageStats.successRate}%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Membership Progress</span>
              <span>{Math.round(renewalProgress)}% Complete</span>
            </div>
            <Progress value={renewalProgress} className="h-2" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
              <span className="text-sm">Auto-renewal</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Gift className="h-4 w-4 mr-2" />
                Upgrade Plan
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="usage">Usage Stats</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-medium ${benefit.color}`}>{benefit.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Premium Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === 'job' && <Briefcase className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'savings' && <DollarSign className="h-5 w-5 text-green-600" />}
                      {activity.type === 'support' && <MessageCircle className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'visibility' && <Eye className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-sm text-green-600">{activity.impact}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <div className="space-y-6">
            {premiumFeatures.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3 p-3 border rounded-lg">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          {/* Usage Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Jobs Applied</p>
                    <p className="text-2xl text-blue-600">{usageStats.jobsApplied}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Jobs Won</p>
                    <p className="text-2xl text-green-600">{usageStats.jobsWon}</p>
                  </div>
                  <Award className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl text-yellow-600">{usageStats.avgRating}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl text-purple-600">₹{usageStats.totalEarnings}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium vs Basic Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Your Premium Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-medium">Commission Savings</h3>
                  <p className="text-2xl text-green-600">₹{usageStats.savedCommission}</p>
                  <p className="text-sm text-muted-foreground">Saved this month</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-medium">Success Rate</h3>
                  <p className="text-2xl text-blue-600">{usageStats.successRate}%</p>
                  <p className="text-sm text-muted-foreground">vs 35% basic avg</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-medium">Premium Jobs</h3>
                  <p className="text-2xl text-purple-600">{usageStats.premiumJobsWon}</p>
                  <p className="text-sm text-muted-foreground">Exclusive opportunities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planComparison.map((plan, index) => (
              <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="font-medium text-lg">{plan.plan}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    disabled={plan.disabled}
                    variant={plan.disabled ? "outline" : "default"}
                  >
                    {plan.button}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Upgrade to Elite?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Additional Benefits</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      Even higher earnings with 3% commission
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      Personal branding and marketing support
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      Custom insurance and financial planning
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      Tax consultation and business advice
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Perfect For</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Experienced workers with established reputation
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      Those earning ₹50,000+ monthly
                    </li>
                    <li className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      Workers looking to scale their business
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Current Plan</p>
                  <p className="font-medium">{premiumStatus.plan}</p>
                  <p className="text-sm text-muted-foreground">₹{premiumStatus.monthlyFee}/month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Next Payment</p>
                  <p className="font-medium">{premiumStatus.endDate}</p>
                  <p className="text-sm text-green-600">Auto-renewal enabled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Payment History
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', amount: 299, status: 'Paid', invoice: 'INV-001' },
                  { date: '2023-12-15', amount: 299, status: 'Paid', invoice: 'INV-002' },
                  { date: '2023-11-15', amount: 299, status: 'Paid', invoice: 'INV-003' },
                  { date: '2023-10-15', amount: 299, status: 'Paid', invoice: 'INV-004' }
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.date}</p>
                      <p className="text-sm text-muted-foreground">Invoice: {payment.invoice}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{payment.amount}</p>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-renewal</p>
                  <p className="text-sm text-muted-foreground">Automatically renew your subscription</p>
                </div>
                <Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  Update Payment Method
                </Button>
                <Button variant="outline">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

PremiumPage.displayName = 'PremiumPage';
export default PremiumPage;