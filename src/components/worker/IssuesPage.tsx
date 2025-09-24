import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter,
  Send,
  Paperclip,
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  MapPin,
  Shield,
  Zap,
  DollarSign,
  Users,
  BookOpen,
  Video,
  Headphones,
  Globe,
  ArrowUpRight,
  Eye,
  Download,
  RefreshCw,
  Plus,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface IssuesPageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const IssuesPage = React.memo(({ user }: IssuesPageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('support');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const supportStats = {
    totalTickets: 12,
    resolvedTickets: 10,
    pendingTickets: 2,
    avgResponseTime: '2.5 hours',
    satisfaction: 4.8
  };

  const myTickets = [
    {
      id: 'TKT001',
      subject: 'Payment not received for completed job',
      category: 'Payment',
      status: 'Resolved',
      priority: 'High',
      date: '2024-01-20',
      lastUpdate: '2024-01-21',
      agent: 'Priya Sharma',
      description: 'Customer confirmed job completion but payment not reflected in wallet',
      resolution: 'Payment processed successfully. Amount credited to wallet.',
      satisfaction: 5
    },
    {
      id: 'TKT002',
      subject: 'Unable to update profile information',
      category: 'Technical',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-01-18',
      lastUpdate: '2024-01-19',
      agent: 'Rajesh Kumar',
      description: 'Profile update form shows error when trying to save changes',
      resolution: null,
      satisfaction: null
    },
    {
      id: 'TKT003',
      subject: 'Customer dispute about work quality',
      category: 'Dispute',
      status: 'Open',
      priority: 'High',
      date: '2024-01-15',
      lastUpdate: '2024-01-16',
      agent: 'Anjali Singh',
      description: 'Customer raising concerns about electrical work quality',
      resolution: null,
      satisfaction: null
    }
  ];

  const faqCategories = [
    {
      name: 'Account & Profile',
      icon: User,
      count: 15,
      faqs: [
        {
          question: 'How do I update my profile information?',
          answer: 'Go to Profile section, click Edit, make changes and save. Ensure all mandatory fields are filled.'
        },
        {
          question: 'How do I verify my skills?',
          answer: 'Upload certificates or take skill tests in the Skills section of your profile.'
        },
        {
          question: 'Can I change my registered mobile number?',
          answer: 'Yes, you can update your mobile number through Profile settings with OTP verification.'
        }
      ]
    },
    {
      name: 'Payments & Earnings',
      icon: DollarSign,
      count: 20,
      faqs: [
        {
          question: 'When will I receive payment for completed jobs?',
          answer: 'Payments are processed within 24-48 hours after job completion and customer approval.'
        },
        {
          question: 'What are the commission charges?',
          answer: 'Standard users pay 8% commission. Premium users pay 5% commission on completed jobs.'
        },
        {
          question: 'How do I withdraw money from my wallet?',
          answer: 'Go to Wallet section, click Withdraw, enter amount and bank details for transfer.'
        }
      ]
    },
    {
      name: 'Jobs & Bookings',
      icon: Briefcase,
      count: 18,
      faqs: [
        {
          question: 'How do I apply for jobs?',
          answer: 'Browse available jobs, click on relevant ones, and submit your application with quote.'
        },
        {
          question: 'Can I cancel a job after accepting?',
          answer: 'Yes, but frequent cancellations may affect your profile rating. Valid reasons are acceptable.'
        },
        {
          question: 'How do I handle customer disputes?',
          answer: 'Contact our support team immediately. We provide mediation services for disputes.'
        }
      ]
    },
    {
      name: 'Technical Issues',
      icon: Zap,
      count: 12,
      faqs: [
        {
          question: 'App is not working properly, what should I do?',
          answer: 'Try restarting the app, check internet connection, or reinstall if the problem persists.'
        },
        {
          question: 'How do I report a bug?',
          answer: 'Use the Report Issue feature or contact support with detailed description and screenshots.'
        },
        {
          question: 'Why am I not receiving notifications?',
          answer: 'Check notification settings in your device and app. Ensure permissions are granted.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      type: 'Chat',
      title: '24/7 Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: 'Always Available',
      response: 'Immediate',
      color: 'text-blue-500'
    },
    {
      type: 'Phone',
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      icon: Phone,
      availability: '9 AM - 9 PM',
      response: 'Immediate',
      color: 'text-green-500'
    },
    {
      type: 'Email',
      title: 'Email Support',
      description: 'Send detailed queries via email',
      icon: Mail,
      availability: '24/7',
      response: '2-4 hours',
      color: 'text-purple-500'
    },
    {
      type: 'Video',
      title: 'Video Call',
      description: 'Face-to-face problem solving',
      icon: Video,
      availability: '10 AM - 6 PM',
      response: 'Scheduled',
      color: 'text-orange-500'
    }
  ];

  const supportResources = [
    {
      title: 'Worker Handbook',
      description: 'Complete guide for workers',
      icon: BookOpen,
      type: 'PDF Guide'
    },
    {
      title: 'Video Tutorials',
      description: 'Learn with step-by-step videos',
      icon: Video,
      type: 'Video Series'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other workers',
      icon: Users,
      type: 'Online Forum'
    },
    {
      title: 'Safety Guidelines',
      description: 'Important safety information',
      icon: Shield,
      type: 'Safety Manual'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-500 hover:bg-green-600';
      case 'In Progress':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Open':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-orange-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Support & Issues</h2>
        <p className="text-muted-foreground">Get help, report issues, and access support resources</p>
      </div>

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tickets</p>
                <p className="text-2xl text-blue-600">{supportStats.totalTickets}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl text-green-600">{supportStats.resolvedTickets}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl text-orange-600">{supportStats.pendingTickets}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl text-purple-600">{supportStats.avgResponseTime}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl text-yellow-600">{supportStats.satisfaction}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="support">Get Help</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="support" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-medium">Report Emergency</h3>
                <p className="text-sm text-muted-foreground">Safety or urgent issues</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Payment Issues</h3>
                <p className="text-sm text-muted-foreground">Payment related problems</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-medium">Customer Dispute</h3>
                <p className="text-sm text-muted-foreground">Resolve customer conflicts</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Technical Issue</h3>
                <p className="text-sm text-muted-foreground">App or platform problems</p>
              </CardContent>
            </Card>
          </div>

          {/* Create New Ticket */}
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Category</label>
                  <Select value={ticketCategory} onValueChange={setTicketCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payment">Payment Issues</SelectItem>
                      <SelectItem value="technical">Technical Problems</SelectItem>
                      <SelectItem value="dispute">Customer Dispute</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm">Subject</label>
                <Input
                  placeholder="Brief description of the issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm">Description</label>
                <Textarea
                  placeholder="Provide detailed description of the issue..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach Files
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-4">
            {myTickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{ticket.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{ticket.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Update</p>
                      <p className="font-medium">{ticket.lastUpdate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{ticket.agent}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Description: </span>
                      {ticket.description}
                    </p>
                    {ticket.resolution && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Resolution: </span>
                        <span className="text-green-600">{ticket.resolution}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {ticket.status !== 'Resolved' && (
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Add Comment
                        </Button>
                      )}
                    </div>
                    
                    {ticket.status === 'Resolved' && ticket.satisfaction && (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">Rated:</span>
                        {[...Array(ticket.satisfaction)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    )}
                    
                    {ticket.status === 'Resolved' && !ticket.satisfaction && (
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          {/* FAQ Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search frequently asked questions..."
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {faqCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {category.name}
                      <Badge variant="outline">
                        {category.count} questions
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {faq.question}
                          </h4>
                          <p className="text-sm text-muted-foreground pl-6">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          {/* Emergency Contact */}
          <Card className="border-2 border-red-500 bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-red-700">Emergency Support</h3>
                  <p className="text-sm text-red-600">For urgent safety or security issues</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-red-500 hover:bg-red-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Emergency: +91 1800-XXX-XXXX
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Emergency Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className={`h-6 w-6 ${option.color}`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Availability:</span>
                        <span>{option.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response:</span>
                        <span>{option.response}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Start {option.type}
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Support Team */}
          <Card>
            <CardHeader>
              <CardTitle>Meet Our Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Priya Sharma', role: 'Senior Support Manager', speciality: 'Payment Issues', rating: 4.9 },
                  { name: 'Rajesh Kumar', role: 'Technical Support Lead', speciality: 'App Issues', rating: 4.8 },
                  { name: 'Anjali Singh', role: 'Dispute Resolution Expert', speciality: 'Customer Disputes', rating: 4.9 }
                ].map((member, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-blue-600">{member.speciality}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{member.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Help Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <Badge variant="outline" className="mt-1">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-12">
                  <Download className="h-4 w-4 mr-2" />
                  Download App
                </Button>
                <Button variant="outline" className="justify-start h-12">
                  <Globe className="h-4 w-4 mr-2" />
                  Terms of Service
                </Button>
                <Button variant="outline" className="justify-start h-12">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
                <Button variant="outline" className="justify-start h-12">
                  <Users className="h-4 w-4 mr-2" />
                  Community Guidelines
                </Button>
                <Button variant="outline" className="justify-start h-12">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Worker Guidelines
                </Button>
                <Button variant="outline" className="justify-start h-12">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Feedback Form
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { service: 'WORQLEY Platform', status: 'Operational', uptime: '99.9%' },
                  { service: 'Payment System', status: 'Operational', uptime: '99.8%' },
                  { service: 'Mobile App', status: 'Operational', uptime: '99.9%' },
                  { service: 'Notification Service', status: 'Operational', uptime: '99.7%' }
                ].map((service, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{service.service}</span>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        {service.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {service.uptime} uptime
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

IssuesPage.displayName = 'IssuesPage';
export default IssuesPage;