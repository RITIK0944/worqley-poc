import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Shield, 
  Heart, 
  Hospital,
  Car,
  Home,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Download,
  Upload,
  Plus,
  Eye,
  RefreshCw,
  Star,
  TrendingUp,
  Users,
  Zap,
  Building,
  Coins,
  GraduationCap,
  Hammer,
  Lightbulb,
  UserCheck,
  BookOpen,
  CreditCard,
  Gift,
  ArrowRight,
  Info,
  ExternalLink,
  Target,
  Wallet,
  ChevronDown,
  ChevronUp,
  Award,
  HandHeart,
  Factory,
  Truck,
  BookOpen
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface InsurancePageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const InsurancePage = React.memo(({ user }: InsurancePageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [claimAmount, setClaimAmount] = useState('');
  const [claimType, setClaimType] = useState('');

  const insurancePlans = [
    {
      id: 'INS001',
      name: 'Worker Health Plus',
      type: 'Health',
      provider: 'WORQLEY Insurance',
      premium: 1200,
      coverage: 500000,
      status: 'Active',
      startDate: '2023-04-01',
      endDate: '2024-03-31',
      features: ['Hospitalization', 'OPD Coverage', 'Medicine', 'Emergency'],
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 'INS002',
      name: 'Accident Protection',
      type: 'Accident',
      provider: 'SafeWork Insurance',
      premium: 800,
      coverage: 300000,
      status: 'Active',
      startDate: '2023-06-15',
      endDate: '2024-06-14',
      features: ['Work Injury', 'Disability', 'Emergency Transport'],
      icon: Shield,
      color: 'text-blue-500'
    },
    {
      id: 'INS003',
      name: 'Tool & Equipment Cover',
      type: 'Equipment',
      provider: 'ToolGuard Insurance',
      premium: 600,
      coverage: 100000,
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      features: ['Tool Theft', 'Equipment Damage', 'Replacement'],
      icon: Briefcase,
      color: 'text-green-500'
    }
  ];

  const claimHistory = [
    {
      id: 'CLM001',
      type: 'Health',
      description: 'Hospitalization for fever treatment',
      amount: 15000,
      claimedAmount: 15000,
      approvedAmount: 13500,
      date: '2023-11-20',
      status: 'Approved',
      documents: ['bill.pdf', 'prescription.pdf'],
      hospital: 'City General Hospital',
      processing_days: 7
    },
    {
      id: 'CLM002',
      type: 'Accident',
      description: 'Minor work injury - finger cut',
      amount: 3000,
      claimedAmount: 3000,
      approvedAmount: 0,
      date: '2023-09-15',
      status: 'Processing',
      documents: ['medical_report.pdf'],
      hospital: 'Emergency Care Center',
      processing_days: 12
    },
    {
      id: 'CLM003',
      type: 'Equipment',
      description: 'Tool theft from work site',
      amount: 8000,
      claimedAmount: 8000,
      approvedAmount: 7200,
      date: '2023-08-10',
      status: 'Approved',
      documents: ['police_report.pdf', 'tool_receipts.pdf'],
      hospital: 'N/A',
      processing_days: 14
    }
  ];

  const recommendedPlans = [
    {
      name: 'Family Health Protection',
      provider: 'SecureLife Insurance',
      premium: 2400,
      coverage: 1000000,
      type: 'Family Health',
      features: ['Family Coverage', '4 Members', 'Critical Illness'],
      rating: 4.8,
      discount: 20
    },
    {
      name: 'Business Liability Cover',
      provider: 'WorkProtect Insurance',
      premium: 1500,
      coverage: 500000,
      type: 'Liability',
      features: ['Client Property', 'Third Party', 'Legal Cover'],
      rating: 4.6,
      discount: 15
    },
    {
      name: 'Income Protection Plan',
      provider: 'StableIncome Corp',
      premium: 1800,
      coverage: 600000,
      type: 'Income',
      features: ['Disability Income', 'Job Loss', 'Medical Leave'],
      rating: 4.7,
      discount: 10
    }
  ];

  const totalPremium = insurancePlans.reduce((sum, plan) => sum + plan.premium, 0);
  const totalCoverage = insurancePlans.reduce((sum, plan) => sum + plan.coverage, 0);
  const activePlans = insurancePlans.filter(plan => plan.status === 'Active').length;
  const totalClaims = claimHistory.length;
  const approvedClaims = claimHistory.filter(claim => claim.status === 'Approved').length;

  // Government Schemes Data
  const governmentSchemes = [
    {
      id: 'PMJJBY',
      name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
      category: 'Life Insurance',
      authority: 'Government of India',
      premium: 330,
      coverage: 200000,
      ageLimit: '18-50 years',
      eligibility: 'All bank account holders',
      benefits: ['Life cover of ₹2 lakh', 'Annual renewable', 'Accident death coverage'],
      documents: ['Bank account', 'Aadhaar card', 'Mobile number'],
      icon: Heart,
      color: 'text-red-500',
      applied: true,
      status: 'Active'
    },
    {
      id: 'PMSBY',
      name: 'Pradhan Mantri Suraksha Bima Yojana',
      category: 'Accident Insurance',
      authority: 'Government of India',
      premium: 12,
      coverage: 200000,
      ageLimit: '18-70 years',
      eligibility: 'All bank account holders',
      benefits: ['Accidental death - ₹2 lakh', 'Partial disability - ₹1 lakh', 'Annual renewable'],
      documents: ['Bank account', 'Aadhaar card', 'Mobile number'],
      icon: Shield,
      color: 'text-blue-500',
      applied: true,
      status: 'Active'
    },
    {
      id: 'AYUSHMAN',
      name: 'Ayushman Bharat - PM-JAY',
      category: 'Health Insurance',
      authority: 'National Health Authority',
      premium: 0,
      coverage: 500000,
      ageLimit: 'All ages',
      eligibility: 'Bottom 40% families (SECC-2011)',
      benefits: ['₹5 lakh per family per year', 'Cashless treatment', '1,400+ procedures covered'],
      documents: ['Ration card', 'SECC verification', 'Aadhaar card'],
      icon: Hospital,
      color: 'text-green-500',
      applied: false,
      status: 'Available'
    },
    {
      id: 'ESIC',
      name: 'Employees State Insurance Scheme',
      category: 'Medical & Cash Benefits',
      authority: 'ESIC',
      premium: 325, // 3.25% of wages (employee: 0.75%, employer: 3.25%)
      coverage: 1000000,
      ageLimit: 'All ages',
      eligibility: 'Workers earning up to ₹25,000/month',
      benefits: ['Medical care for family', 'Cash benefits during sickness', 'Maternity benefits', 'Disability benefits'],
      documents: ['Employment proof', 'Salary certificate', 'Aadhaar card'],
      icon: Factory,
      color: 'text-purple-500',
      applied: false,
      status: 'Available'
    },
    {
      id: 'EPF',
      name: 'Employees Provident Fund',
      category: 'Retirement & Insurance',
      authority: 'EPFO',
      premium: 1800, // 12% of basic salary (example)
      coverage: 700000,
      ageLimit: 'Up to 58 years',
      eligibility: 'Organized sector employees',
      benefits: ['Retirement corpus', 'EPS pension', 'EDLI insurance cover'],
      documents: ['Employment certificate', 'PAN card', 'Bank details'],
      icon: Wallet,
      color: 'text-indigo-500',
      applied: true,
      status: 'Active'
    },
    {
      id: 'PMGKY',
      name: 'Pradhan Mantri Garib Kalyan Yojana',
      category: 'Welfare Scheme',
      authority: 'Government of India',
      premium: 0,
      coverage: 5000000,
      ageLimit: 'All ages',
      eligibility: 'Healthcare workers fighting COVID-19',
      benefits: ['₹50 lakh insurance cover', 'Accidental loss coverage', 'No premium payment'],
      documents: ['Healthcare worker certificate', 'Employment proof'],
      icon: HandHeart,
      color: 'text-pink-500',
      applied: false,
      status: 'Available'
    },
    {
      id: 'NREGS',
      name: 'MGNREGA Worker Benefits',
      category: 'Employment Insurance',
      authority: 'Ministry of Rural Development',
      premium: 0,
      coverage: 37500,
      ageLimit: '18+ years',
      eligibility: 'MGNREGA job card holders',
      benefits: ['Guaranteed 100 days work', 'Accident insurance', 'Medical assistance'],
      documents: ['Job card', 'Bank account', 'Aadhaar card'],
      icon: Hammer,
      color: 'text-orange-500',
      applied: false,
      status: 'Available'
    },
    {
      id: 'PMKVY',
      name: 'Pradhan Mantri Kaushal Vikas Yojana',
      category: 'Skill Development',
      authority: 'MSDE',
      premium: 0,
      coverage: 8000,
      ageLimit: '15-35 years',
      eligibility: 'Youth seeking skill training',
      benefits: ['Free skill training', 'Certification', 'Employment assistance', 'Monetary reward'],
      documents: ['Age proof', 'Educational certificates', 'Aadhaar card'],
      icon: GraduationCap,
      color: 'text-teal-500',
      applied: false,
      status: 'Available'
    }
  ];

  const ewsSchemes = [
    {
      id: 'PMAY',
      name: 'Pradhan Mantri Awas Yojana',
      category: 'Housing',
      subsidy: 267000,
      eligibility: 'EWS, LIG, MIG families',
      benefits: ['Home loan subsidy', 'Interest rate reduction', 'Direct assistance'],
      icon: Home,
      color: 'text-blue-600'
    },
    {
      id: 'UJJWALA',
      name: 'Pradhan Mantri Ujjwala Yojana',
      category: 'LPG Connection',
      subsidy: 1600,
      eligibility: 'BPL families',
      benefits: ['Free LPG connection', 'Cooking gas subsidy', 'Safety equipment'],
      icon: Lightbulb,
      color: 'text-yellow-500'
    },
    {
      id: 'PMGDISHA',
      name: 'PM Gramin Digital Saksharta Abhiyan',
      category: 'Digital Literacy',
      subsidy: 0,
      eligibility: 'Rural families',
      benefits: ['Free digital training', 'Certificate course', 'Digital payment training'],
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 'PMMVY',
      name: 'PM Matru Vandana Yojana',
      category: 'Maternity Support',
      subsidy: 5000,
      eligibility: 'Pregnant & lactating women',
      benefits: ['Cash incentive', 'Nutrition support', 'Health checkups'],
      icon: Gift,
      color: 'text-pink-600'
    }
  ];

  const [expandedScheme, setExpandedScheme] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 hover:bg-green-600';
      case 'Pending':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'Expired':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500 hover:bg-green-600';
      case 'Processing':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Rejected':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Insurance Management</h2>
        <p className="text-muted-foreground">Manage your insurance policies, claims, and explore new coverage options</p>
      </div>

      {/* Insurance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl text-green-600">{activePlans}</p>
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
                <p className="text-2xl text-blue-600">₹{(totalCoverage / 100000).toFixed(1)}L</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Annual Premium</p>
                <p className="text-2xl text-purple-600">₹{totalPremium}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Claims Success</p>
                <p className="text-2xl text-orange-600">{Math.round((approvedClaims / totalClaims) * 100)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">My Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="government">Govt. Schemes</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Policy Status Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurancePlans.map((plan) => {
                  const Icon = plan.icon;
                  const daysUntilExpiry = Math.ceil((new Date(plan.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-100`}>
                          <Icon className={`h-5 w-5 ${plan.color}`} />
                        </div>
                        <div>
                          <p className="font-medium">{plan.name}</p>
                          <p className="text-sm text-muted-foreground">{plan.provider}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
                        {plan.status === 'Active' && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {daysUntilExpiry} days left
                          </p>
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
              <CardTitle className="flex items-center justify-between">
                Recent Claims
                <Button variant="outline" size="sm" onClick={() => setSelectedTab('claims')}>
                  View All Claims
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claimHistory.slice(0, 3).map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{claim.description}</p>
                      <p className="text-sm text-muted-foreground">{claim.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{claim.claimedAmount}</p>
                      <Badge className={getClaimStatusColor(claim.status)}>
                        {claim.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex-col gap-2">
                  <Plus className="h-5 w-5" />
                  File New Claim
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Eye className="h-5 w-5" />
                  View Policies
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Renew Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="space-y-6">
            {insurancePlans.map((plan) => {
              const Icon = plan.icon;
              const daysUntilExpiry = Math.ceil((new Date(plan.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              const renewalProgress = plan.status === 'Active' ? Math.max(0, 100 - (daysUntilExpiry / 365) * 100) : 0;
              
              return (
                <Card key={plan.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100`}>
                          <Icon className={`h-6 w-6 ${plan.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.provider}</p>
                          <p className="text-sm text-muted-foreground">Policy ID: {plan.id}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(plan.status)}>
                        {plan.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage</p>
                        <p className="font-medium">₹{(plan.coverage / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Premium</p>
                        <p className="font-medium">₹{plan.premium}/year</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Start Date</p>
                        <p className="font-medium">{plan.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">End Date</p>
                        <p className="font-medium">{plan.endDate}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Features Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {plan.status === 'Active' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Time Until Renewal</span>
                          <span>{daysUntilExpiry} days</span>
                        </div>
                        <Progress value={renewalProgress} />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Policy
                      </Button>
                      {plan.status === 'Active' && daysUntilExpiry < 30 && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Renew Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          {/* File New Claim */}
          <Card>
            <CardHeader>
              <CardTitle>File New Claim</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Claim Type</label>
                  <Select value={claimType} onValueChange={setClaimType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select claim type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="accident">Accident</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm">Claim Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline">Submit Claim</Button>
              </div>
            </CardContent>
          </Card>

          {/* Claims History */}
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimHistory.map((claim) => (
                  <Card key={claim.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{claim.description}</h4>
                          <p className="text-sm text-muted-foreground">Claim ID: {claim.id}</p>
                          <p className="text-sm text-muted-foreground">{claim.date}</p>
                        </div>
                        <Badge className={getClaimStatusColor(claim.status)}>
                          {claim.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Claimed Amount</p>
                          <p className="font-medium">₹{claim.claimedAmount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Approved Amount</p>
                          <p className="font-medium">₹{claim.approvedAmount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Hospital/Location</p>
                          <p className="font-medium">{claim.hospital}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Processing Time</p>
                          <p className="font-medium">{claim.processing_days} days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Documents:</span>
                        {claim.documents.map((doc, index) => (
                          <Button key={index} variant="outline" size="sm">
                            <FileText className="h-3 w-3 mr-1" />
                            {doc}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="government" className="space-y-6">
          {/* Government Schemes Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700">Active Schemes</p>
                    <p className="text-3xl text-blue-800">{governmentSchemes.filter(s => s.applied).length}</p>
                  </div>
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700">Total Coverage</p>
                    <p className="text-3xl text-green-800">₹{(governmentSchemes.filter(s => s.applied).reduce((sum, s) => sum + s.coverage, 0) / 100000).toFixed(1)}L</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-700">Annual Savings</p>
                    <p className="text-3xl text-purple-800">₹{governmentSchemes.filter(s => s.applied).reduce((sum, s) => sum + s.premium, 0)}</p>
                  </div>
                  <Coins className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Central Government Schemes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Central Government Insurance Schemes
              </CardTitle>
              <p className="text-muted-foreground">Comprehensive insurance schemes for workers and laborers</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governmentSchemes.map((scheme) => {
                  const Icon = scheme.icon;
                  const isExpanded = expandedScheme === scheme.id;
                  
                  return (
                    <Card key={scheme.id} className={`transition-all duration-200 ${scheme.applied ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${scheme.applied ? 'bg-green-100' : 'bg-gray-100'}`}>
                              <Icon className={`h-6 w-6 ${scheme.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-medium">{scheme.name}</h4>
                                  <p className="text-sm text-muted-foreground">{scheme.authority}</p>
                                  <Badge variant="outline" className="mt-1">
                                    {scheme.category}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <Badge className={scheme.applied ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}>
                                    {scheme.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-muted-foreground">Premium</p>
                                  <p className="font-medium">₹{scheme.premium}/year</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Coverage</p>
                                  <p className="font-medium">₹{(scheme.coverage / 100000).toFixed(1)}L</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Age Limit</p>
                                  <p className="font-medium">{scheme.ageLimit}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Eligibility</p>
                                  <p className="font-medium">{scheme.eligibility}</p>
                                </div>
                              </div>

                              {isExpanded && (
                                <div className="space-y-4 mt-4 p-4 bg-white rounded-lg border">
                                  <div>
                                    <h5 className="font-medium mb-2">Benefits:</h5>
                                    <ul className="space-y-1">
                                      {scheme.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm">
                                          <CheckCircle className="h-4 w-4 text-green-500" />
                                          {benefit}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-medium mb-2">Required Documents:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {scheme.documents.map((doc, index) => (
                                        <Badge key={index} variant="outline">
                                          {doc}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setExpandedScheme(isExpanded ? null : scheme.id)}
                                >
                                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                  {isExpanded ? 'Less Details' : 'More Details'}
                                </Button>
                                {scheme.applied ? (
                                  <Button size="sm" variant="outline">
                                    <Award className="h-4 w-4 mr-2" />
                                    View Certificate
                                  </Button>
                                ) : (
                                  <Button size="sm">
                                    <ArrowRight className="h-4 w-4 mr-2" />
                                    Apply Now
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Official Website
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* EWS Special Schemes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HandHeart className="h-5 w-5 text-pink-600" />
                EWS (Economically Weaker Section) Special Schemes
              </CardTitle>
              <p className="text-muted-foreground">Additional benefits and subsidies for economically weaker sections</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ewsSchemes.map((scheme) => {
                  const Icon = scheme.icon;
                  
                  return (
                    <Card key={scheme.id} className="border-l-4 border-l-pink-500">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-50">
                            <Icon className={`h-5 w-5 ${scheme.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{scheme.name}</h4>
                            <Badge variant="outline" className="mt-1 mb-2">
                              {scheme.category}
                            </Badge>
                            <div className="space-y-2 text-sm">
                              <div>
                                <p className="text-muted-foreground">Subsidy Amount</p>
                                <p className="font-medium">₹{scheme.subsidy}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Eligibility</p>
                                <p className="font-medium">{scheme.eligibility}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Benefits:</p>
                                <ul className="space-y-1">
                                  {scheme.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                      <CheckCircle className="h-3 w-3 text-green-500" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm">
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Apply
                              </Button>
                              <Button variant="outline" size="sm">
                                <Info className="h-3 w-3 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Application Process Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                How to Apply for Government Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <UserCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-2">Step 1: Check Eligibility</h4>
                  <p className="text-sm text-muted-foreground">Verify if you meet the scheme requirements</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">Step 2: Prepare Documents</h4>
                  <p className="text-sm text-muted-foreground">Gather all required documents and certificates</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-2">Step 3: Submit Application</h4>
                  <p className="text-sm text-muted-foreground">Apply online or at designated centers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-medium mb-2">Step 4: Track Status</h4>
                  <p className="text-sm text-muted-foreground">Monitor your application progress online</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800">Important Note</h5>
                    <p className="text-sm text-yellow-700 mt-1">
                      Always apply through official government websites or authorized centers. Beware of fraudulent agents asking for money to process applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-blue-600" />
                Official Government Portals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Building className="h-5 w-5" />
                  Jan Aushadhi Portal
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Hospital className="h-5 w-5" />
                  PMJAY Portal
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Shield className="h-5 w-5" />
                  PMSBY Portal
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Heart className="h-5 w-5" />
                  PMJJBY Portal
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Factory className="h-5 w-5" />
                  ESIC Portal
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Wallet className="h-5 w-5" />
                  EPFO Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3>Recommended Insurance Plans</h3>
              <p className="text-muted-foreground">Based on your profile and work requirements</p>
            </div>
            
            {recommendedPlans.map((plan, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.provider}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{plan.rating}/5.0</span>
                      </div>
                    </div>
                    {plan.discount > 0 && (
                      <Badge className="bg-orange-500 hover:bg-orange-600">
                        {plan.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-medium">₹{(plan.coverage / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Premium</p>
                      <p className="font-medium">₹{plan.premium}/year</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">{plan.type}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button>Get Quote</Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium">Emergency Helpline</p>
                    <p className="text-sm text-muted-foreground">+91 1800-XXX-XXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Claims Support</p>
                    <p className="text-sm text-muted-foreground">claims@worqley.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Nearest Hospital</p>
                    <p className="text-sm text-muted-foreground">City General Hospital</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Policy Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Claim Forms
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Insurance Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Hospital className="h-4 w-4 mr-2" />
                  Network Hospitals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

InsurancePage.displayName = 'InsurancePage';
export default InsurancePage;