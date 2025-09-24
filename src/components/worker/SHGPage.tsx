import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { 
  Users, 
  IndianRupee, 
  PiggyBank, 
  TrendingUp,
  Calendar,
  FileText,
  Award,
  Target,
  Handshake,
  MessageCircle,
  BookOpen,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Star
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SHGPageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const SHGPage = React.memo(({ user }: SHGPageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');

  const shgData = {
    groupName: 'Skilled Workers Unity SHG',
    memberSince: '2023-03-15',
    membershipId: 'SHG-SW-001234',
    totalMembers: 15,
    monthlyContribution: 500,
    totalSavings: 75000,
    availableLoan: 150000,
    creditScore: 750,
    meetingDate: '2024-01-25',
    nextMeeting: '2024-02-01'
  };

  const membershipData = {
    role: 'Active Member',
    joinDate: '2023-03-15',
    contributionsMade: 11,
    totalContributed: 5500,
    loansTaken: 2,
    loansRepaid: 1,
    attendanceRate: 92,
    status: 'Good Standing'
  };

  const savingsData = [
    { month: 'Oct 2023', contribution: 500, balance: 5000, status: 'Paid' },
    { month: 'Nov 2023', contribution: 500, balance: 5500, status: 'Paid' },
    { month: 'Dec 2023', contribution: 500, balance: 6000, status: 'Paid' },
    { month: 'Jan 2024', contribution: 500, balance: 6500, status: 'Pending' }
  ];

  const loanHistory = [
    {
      id: 'L001',
      amount: 25000,
      purpose: 'Tool Purchase',
      date: '2023-06-15',
      duration: '12 months',
      interest: '8%',
      emi: 2291,
      status: 'Repaid',
      paidAmount: 25000,
      remainingAmount: 0
    },
    {
      id: 'L002',
      amount: 40000,
      purpose: 'Skill Training Course',
      date: '2023-11-20',
      duration: '18 months',
      interest: '8%',
      emi: 2545,
      status: 'Active',
      paidAmount: 7635,
      remainingAmount: 32365
    }
  ];

  const trainingPrograms = [
    {
      id: 'T001',
      title: 'Digital Marketing for Workers',
      instructor: 'Dr. Priya Sharma',
      duration: '6 weeks',
      startDate: '2024-02-10',
      fee: 0,
      status: 'Upcoming',
      spots: 20,
      registered: 12
    },
    {
      id: 'T002',
      title: 'Financial Literacy Workshop',
      instructor: 'CA Rajesh Kumar',
      duration: '3 days',
      startDate: '2024-01-28',
      fee: 0,
      status: 'Open',
      spots: 25,
      registered: 8
    },
    {
      id: 'T003',
      title: 'Advanced Electrical Skills',
      instructor: 'Eng. Amit Singh',
      duration: '4 weeks',
      startDate: '2024-03-01',
      fee: 1500,
      status: 'Upcoming',
      spots: 15,
      registered: 15
    }
  ];

  const meetings = [
    {
      id: 'M001',
      date: '2024-01-25',
      agenda: 'Monthly review, new loan applications',
      attendance: 14,
      decisions: ['Approved loan for Raj Kumar', 'Increased monthly contribution'],
      status: 'Upcoming'
    },
    {
      id: 'M002',
      date: '2023-12-28',
      agenda: 'Year-end review, dividend distribution',
      attendance: 15,
      decisions: ['Distributed ₹500 dividend per member', 'Planned training programs'],
      status: 'Completed'
    }
  ];

  const achievements = [
    { title: 'Best Savings Record', date: '2023-12-01', icon: PiggyBank },
    { title: 'Regular Attendance', date: '2023-11-15', icon: Award },
    { title: 'Loan Repayment Excellence', date: '2023-09-20', icon: Target }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Self Help Group (SHG)</h2>
        <p className="text-muted-foreground">Manage your SHG membership, savings, loans, and community activities</p>
      </div>

      {/* SHG Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl text-green-600">₹{membershipData.totalContributed}</p>
              </div>
              <PiggyBank className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Loan</p>
                <p className="text-2xl text-blue-600">₹{shgData.availableLoan}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="text-2xl text-purple-600">{shgData.creditScore}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl text-orange-600">{membershipData.attendanceRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* SHG Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  SHG Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Group Name</p>
                  <p>{shgData.groupName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Membership ID</p>
                  <p>{shgData.membershipId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                  <p>{shgData.totalMembers}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                  <p>₹{shgData.monthlyContribution}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Meeting</p>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {shgData.nextMeeting}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Membership Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge className="bg-green-500 hover:bg-green-600">{membershipData.role}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p>{membershipData.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Contributions</p>
                  <p>{membershipData.contributionsMade} payments</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-blue-500 hover:bg-blue-600">{membershipData.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex-col gap-2">
                  <Plus className="h-5 w-5" />
                  Apply for Loan
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  View Meetings
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2">
                  <BookOpen className="h-5 w-5" />
                  Browse Training
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Savings History
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savingsData.map((saving, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <PiggyBank className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p>{saving.month}</p>
                        <p className="text-sm text-muted-foreground">Monthly Contribution</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{saving.contribution}</p>
                      <p className="text-sm text-muted-foreground">Balance: ₹{saving.balance}</p>
                    </div>
                    <Badge 
                      className={saving.status === 'Paid' ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'}
                    >
                      {saving.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          {/* Loan Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Apply for New Loan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Loan Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm">Purpose</label>
                  <Input
                    placeholder="e.g., Tool purchase, Training"
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm">Detailed Description</label>
                <Textarea placeholder="Explain how you plan to use the loan..." />
              </div>
              <Button className="w-full">Submit Loan Application</Button>
            </CardContent>
          </Card>

          {/* Loan History */}
          <Card>
            <CardHeader>
              <CardTitle>Loan History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanHistory.map((loan) => (
                  <Card key={loan.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{loan.purpose}</h4>
                          <p className="text-sm text-muted-foreground">Loan ID: {loan.id}</p>
                        </div>
                        <Badge 
                          className={loan.status === 'Repaid' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}
                        >
                          {loan.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">₹{loan.amount}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Interest</p>
                          <p className="font-medium">{loan.interest}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">EMI</p>
                          <p className="font-medium">₹{loan.emi}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-medium">₹{loan.remainingAmount}</p>
                        </div>
                      </div>
                      {loan.status === 'Active' && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Repayment Progress</span>
                            <span>{Math.round((loan.paidAmount / loan.amount) * 100)}%</span>
                          </div>
                          <Progress value={(loan.paidAmount / loan.amount) * 100} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="space-y-4">
            {trainingPrograms.map((program) => (
              <Card key={program.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{program.title}</h3>
                      <p className="text-sm text-muted-foreground">by {program.instructor}</p>
                    </div>
                    <Badge 
                      className={
                        program.status === 'Open' ? 'bg-green-500 hover:bg-green-600' : 
                        'bg-blue-500 hover:bg-blue-600'
                      }
                    >
                      {program.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p>{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>{program.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fee</p>
                      <p>{program.fee === 0 ? 'Free' : `₹${program.fee}`}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Spots</p>
                      <p>{program.registered}/{program.spots}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Register Now</Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Meeting - {meeting.date}
                      </h3>
                      <p className="text-sm text-muted-foreground">{meeting.agenda}</p>
                    </div>
                    <Badge 
                      className={
                        meeting.status === 'Completed' ? 'bg-green-500 hover:bg-green-600' : 
                        'bg-blue-500 hover:bg-blue-600'
                      }
                    >
                      {meeting.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Attendance: </span>
                      {meeting.attendance}/{shgData.totalMembers} members
                    </p>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Key Decisions:</p>
                      <ul className="text-sm space-y-1">
                        {meeting.decisions.map((decision, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {decision}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="font-medium mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
});

SHGPage.displayName = 'SHGPage';
export default SHGPage;