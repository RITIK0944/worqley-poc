import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Search,
  Headphones,
  BookOpen,
  Video,
  HelpCircle,
  Star,
  ThumbsUp,
  Send
} from 'lucide-react';
import { User as UserType } from '../AppLayout';
import { useLanguage } from '../LanguageContext';
import worqleyLogo from 'figma:asset/a19477eeef09f3707555b759c8e43e30beb2f943.png';

interface SupportProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

function Support({ user, onNavigate }: SupportProps) {
  
  if (!user) return null;
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });

  const supportCategories = [
    {
      id: 'booking',
      title: 'Booking Issues',
      description: 'Help with service bookings, cancellations, or modifications',
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'payment',
      title: 'Payment Problems',
      description: 'Payment failures, refunds, or billing questions',
      icon: AlertCircle,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'worker',
      title: 'Worker Related',
      description: 'Issues with worker quality, behavior, or no-shows',
      icon: MessageCircle,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'app',
      title: 'App Issues',
      description: 'Technical problems, bugs, or app performance',
      icon: Phone,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'account',
      title: 'Account Help',
      description: 'Profile, settings, or account management',
      icon: Mail,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 'general',
      title: 'General Inquiry',
      description: 'Other questions or feedback',
      icon: HelpCircle,
      color: 'bg-slate-100 text-slate-600'
    }
  ];

  const faqItems = [
    {
      question: 'How do I book a service?',
      answer: 'Go to "Find Services", select your category, post your task details, and workers will apply. You can then choose the best worker for your needs.',
      category: 'booking'
    },
    {
      question: 'What if a worker doesn\'t show up?',
      answer: 'Contact our support immediately. We\'ll help reschedule or find a replacement worker. You can also report no-shows through the app.',
      category: 'worker'
    },
    {
      question: 'How do I get a refund?',
      answer: 'Refunds are processed for valid cancellations or unsatisfactory work. Contact support with your booking details for assistance.',
      category: 'payment'
    },
    {
      question: 'How are workers verified?',
      answer: 'All workers undergo Aadhaar verification, background checks, and skill assessments before joining WORQLEY.',
      category: 'worker'
    },
    {
      question: 'Can I cancel a booking?',
      answer: 'Yes, you can cancel bookings up to 2 hours before the scheduled time. Some cancellation fees may apply.',
      category: 'booking'
    },
    {
      question: 'How do I rate a worker?',
      answer: 'After service completion, you\'ll receive a rating prompt. You can also rate workers from your booking history.',
      category: 'general'
    }
  ];

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Payment not processed',
      status: 'open',
      priority: 'high',
      category: 'payment',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-15'
    },
    {
      id: 'TKT-002',
      subject: 'Worker quality concern',
      status: 'resolved',
      priority: 'medium',
      category: 'worker',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitTicket = () => {
    if (!contactForm.subject || !contactForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    alert('Support ticket submitted successfully! You will receive a confirmation email shortly.');
    setContactForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  const filteredFAQs = faqItems.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (selectedCategory && faq.category === selectedCategory)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
            <img 
              src={worqleyLogo} 
              alt="WORQLEY Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Customer Support</h1>
        <p className="text-muted-foreground text-lg">We're here to help you 24/7</p>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <CardTitle>Call Us</CardTitle>
            <CardDescription>Immediate assistance</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-semibold text-lg mb-2">8340 315 955</p>
            <p className="text-sm text-muted-foreground">Available 24/7</p>
            <Button className="w-full mt-3">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat with our team</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Online</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Avg response: 2 mins</p>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Detailed assistance</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm font-medium mb-2">worqley@gmail.com</p>
            <p className="text-sm text-muted-foreground mb-3">Response within 4 hours</p>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Headphones className="h-5 w-5 mr-2" />
            How Can We Help?
          </CardTitle>
          <CardDescription>Select a category to get specific help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportCategories.map((category) => (
              <div
                key={category.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Your Support Tickets
          </CardTitle>
          <CardDescription>Track your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          {supportTickets.length > 0 ? (
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{ticket.id}</Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created: {ticket.createdAt}
                    </div>
                  </div>
                  <h4 className="font-semibold">{ticket.subject}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {ticket.lastUpdate}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No support tickets found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Create Support Ticket
          </CardTitle>
          <CardDescription>Can't find what you're looking for? Submit a ticket</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Input
                  placeholder="Brief description of your issue"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={contactForm.category}
                  onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select a category</option>
                  {supportCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={contactForm.priority}
                onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                placeholder="Describe your issue in detail..."
                rows={5}
                value={contactForm.description}
                onChange={(e) => setContactForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                * Required fields
              </p>
              <Button onClick={handleSubmitTicket}>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Video className="h-6 w-6 mb-2" />
              <span>Video Tutorials</span>
              <span className="text-xs text-muted-foreground">Learn how to use WORQLEY</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              <span>User Guide</span>
              <span className="text-xs text-muted-foreground">Complete platform guide</span>
            </Button>

            <Button variant="outline" className="h-auto p-4 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span>Community Forum</span>
              <span className="text-xs text-muted-foreground">Connect with other users</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Rate Our Support
          </CardTitle>
          <CardDescription>Help us improve our support service</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                size="sm"
                className="p-1"
              >
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              </Button>
            ))}
          </div>
          <div className="text-center">
            <Textarea placeholder="Share your feedback..." rows={3} className="mb-4" />
            <Button>
              Submit Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Support;