import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Crown, 
  Star, 
  Shield,
  CheckCircle,
  X,
  TrendingUp,
  Zap,
  Users
} from 'lucide-react';


interface PremiumSubscriptionProps {
  user: any;
}

export const PremiumSubscription = React.memo(({ user }: PremiumSubscriptionProps) => {
  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'Free',
      description: 'Get started with essential features',
      icon: Shield,
      features: [
        { name: 'Basic job listings', included: true },
        { name: 'Profile creation', included: true },
        { name: 'Customer ratings', included: true },
        { name: 'Payment tracking', included: true },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Premium job access', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199,
      period: 'per month',
      description: 'Unlock advanced features for better earnings',
      icon: Star,
      popular: true,
      features: [
        { name: 'All Basic features', included: true },
        { name: 'Priority job listings', included: true },
        { name: 'Advanced profile showcase', included: true },
        { name: 'Customer preference matching', included: true },
        { name: 'Priority support', included: true },
        { name: 'Earnings analytics', included: true },
        { name: 'Premium job access', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 399,
      period: 'per month',
      description: 'Maximum visibility and exclusive opportunities',
      icon: Crown,
      features: [
        { name: 'All Premium features', included: true },
        { name: 'Exclusive high-value jobs', included: true },
        { name: 'Professional portfolio', included: true },
        { name: 'Advanced analytics dashboard', included: true }
      ]
    }
  ];

  const currentSubscription = {
    plan: 'premium',
    endDate: '2024-12-31',
    daysLeft: 345
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: '+40% Higher Earnings',
      description: 'Premium members earn more through exclusive opportunities'
    },
    {
      icon: Zap,
      title: '3x Faster Job Access',
      description: 'Get priority notifications for new jobs'
    },
    {
      icon: Users,
      title: 'Premium Customers',
      description: 'Access to customers willing to pay higher rates'
    },
    {
      icon: Star,
      title: '24/7 Priority Support',
      description: 'Dedicated support line for premium members'
    }
  ];

  const currentPlan = subscriptionPlans.find(plan => plan.id === currentSubscription.plan);
  const isCurrentlyPremium = currentSubscription.plan !== 'basic';

  return (
    <div className="space-y-6">
      <div>
        <h2>Premium Subscription</h2>
        <p className="text-muted-foreground">Upgrade your account for better earning opportunities</p>
      </div>

      {/* Current Subscription Status */}
      {isCurrentlyPremium && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Crown className="h-5 w-5" />
              <span>Premium Active</span>
              <Badge className="bg-blue-500">Current Plan</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-blue-600 mb-1">Current Plan</p>
                <p className="text-xl text-blue-800">{currentPlan?.name}</p>
              </div>
              <div>
                <p className="text-sm text-blue-600 mb-1">Days Remaining</p>
                <p className="text-xl text-blue-800">{currentSubscription.daysLeft} days</p>
              </div>
              <div>
                <p className="text-sm text-blue-600 mb-1">Expires On</p>
                <p className="text-xl text-blue-800">{currentSubscription.endDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => {
          const IconComponent = plan.icon;
          
          return (
            <Card 
              key={plan.id}
              className={`relative transition-all hover:shadow-lg ${
                plan.popular ? 'border-blue-500 shadow-md scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-500 rounded-full p-3 w-fit mx-auto mb-4 text-white">
                  <IconComponent className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-3xl">₹{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${
                        feature.included ? '' : 'text-muted-foreground line-through'
                      }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  variant={plan.id === currentSubscription.plan ? 'outline' : 'default'}
                  disabled={plan.id === currentSubscription.plan}
                >
                  {plan.id === currentSubscription.plan ? 'Current Plan' : 
                   plan.id === 'basic' ? 'Downgrade' : 'Upgrade Now'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Customer Testimonials */}
      <Card>
        <CardHeader>
          <CardTitle>What Premium Members Say</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-500 rounded-full p-2 text-white">
                  <Star className="h-4 w-4" />
                </div>
                <div>
                  <p>Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">Plumber, 3 years premium</p>
                </div>
              </div>
              <p className="text-sm">
                "Since upgrading to premium, my monthly earnings have increased by 60%. 
                The priority job notifications really make a difference!"
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-500 rounded-full p-2 text-white">
                  <Crown className="h-4 w-4" />
                </div>
                <div>
                  <p>Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">Electrician, 2 years premium</p>
                </div>
              </div>
              <p className="text-sm">
                "The professional portfolio feature helped me showcase my work better. 
                Now I get repeat customers and referrals regularly."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});