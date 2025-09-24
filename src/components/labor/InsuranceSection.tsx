import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Shield, 
  Heart, 
  Car,
  FileText,
  Phone,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';


interface InsuranceSectionProps {
  user: any;
}

export const InsuranceSection = React.memo(({ user }: InsuranceSectionProps) => {
  const insurancePlans = [
    {
      id: 'health',
      name: 'Health Insurance',
      icon: Heart,
      premium: 2400,
      coverage: '₹5,00,000',
      status: 'active',
      expiryDate: '2024-12-31',
      color: 'bg-red-500'
    },
    {
      id: 'life',
      name: 'Life Insurance',
      icon: Shield,
      premium: 3600,
      coverage: '₹10,00,000',
      status: 'active',
      expiryDate: '2024-11-15',
      color: 'bg-blue-500'
    },
    {
      id: 'tool',
      name: 'Tool Insurance',
      icon: Car,
      premium: 1200,
      coverage: '₹50,000',
      status: 'expired',
      expiryDate: '2023-12-01',
      color: 'bg-orange-500'
    },
    {
      id: 'accident',
      name: 'Personal Accident',
      icon: AlertTriangle,
      premium: 800,
      coverage: '₹2,00,000',
      status: 'pending',
      expiryDate: '2024-06-30',
      color: 'bg-purple-500'
    }
  ];

  const recentClaims = [
    {
      id: '1',
      type: 'Health Insurance',
      amount: '₹15,000',
      date: '2024-01-10',
      status: 'approved',
      description: 'Fever treatment at City Hospital'
    },
    {
      id: '2',
      type: 'Tool Insurance',
      amount: '₹8,500',
      date: '2023-12-15',
      status: 'processing',
      description: 'Drill machine replacement'
    }
  ];

  const activePlans = insurancePlans.filter(plan => plan.status === 'active').length;
  const totalCoverage = 17.5; // in lakhs

  return (
    <div className="space-y-6">
      <div>
        <h2>Insurance</h2>
        <p className="text-muted-foreground">Manage your insurance policies and claims</p>
      </div>

      {/* Insurance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl">{activePlans}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-2xl">₹{totalCoverage}L</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Claims</p>
                <p className="text-2xl">{recentClaims.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Insurance Plans */}
      <Card>
        <CardHeader>
          <CardTitle>My Insurance Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insurancePlans.map(plan => {
              const IconComponent = plan.icon;
              return (
                <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${plan.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3>{plan.name}</h3>
                        <Badge 
                          variant={plan.status === 'active' ? 'default' : 
                                 plan.status === 'expired' ? 'destructive' : 'secondary'}
                          className={plan.status === 'active' ? 'bg-green-500' : ''}
                        >
                          {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Coverage</p>
                          <p>{plan.coverage}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Premium</p>
                          <p>₹{plan.premium}/year</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p>{plan.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {plan.status === 'active' && (
                      <Button size="sm" variant="outline">
                        View Policy
                      </Button>
                    )}
                    {plan.status === 'expired' && (
                      <Button size="sm">
                        Renew Now
                      </Button>
                    )}
                    {plan.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Claims */}
      <Card>
        <CardHeader>
          <CardTitle>Claims History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentClaims.map(claim => (
              <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    claim.status === 'approved' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <FileText className={`h-4 w-4 ${
                      claim.status === 'approved' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <p>{claim.type}</p>
                    <p className="text-sm text-muted-foreground">{claim.description}</p>
                    <p className="text-xs text-muted-foreground">{claim.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p>{claim.amount}</p>
                  <Badge 
                    variant={claim.status === 'approved' ? 'default' : 'secondary'}
                    className={claim.status === 'approved' ? 'bg-green-500' : ''}
                  >
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">24/7 Claim Helpline</span>
              </div>
              <p className="text-blue-600">1800-XXX-XXXX</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full">File New Claim</Button>
              <Button variant="outline" className="w-full">View All Policies</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});