import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Headphones, 
  MessageCircle, 
  Phone, 
  Mail,
  HelpCircle,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


interface SupportSectionProps {
  user: any;
}

export const SupportSection = React.memo(({ user }: SupportSectionProps) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  const faqData = [
    {
      id: '1',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile by going to Profile Management section and clicking on Edit Profile. Make sure to save your changes after updating.'
    },
    {
      id: '2',
      question: 'When will I receive my payment?',
      answer: 'Payments are typically processed within 24-48 hours after job completion and customer confirmation. You will receive an SMS notification once the payment is credited.'
    },
    {
      id: '3',
      question: 'Why am I not receiving job notifications?',
      answer: 'Make sure your profile is complete, you are marked as available, and your location settings are updated. Also check if you have enabled notifications in your phone settings.'
    },
    {
      id: '4',
      question: 'What are the benefits of Premium subscription?',
      answer: 'Premium members get priority job notifications, higher visibility, exclusive high-value jobs, dedicated support, and detailed analytics dashboard.'
    }
  ];

  const supportTickets = [
    {
      id: 'TK001',
      subject: 'Payment not received for job #12345',
      status: 'open',
      date: '2024-01-20'
    },
    {
      id: 'TK002',
      subject: 'Unable to upload profile photo',
      status: 'resolved',
      date: '2024-01-18'
    }
  ];

  const categories = ['Account', 'Payments', 'Jobs', 'Premium', 'Technical', 'Insurance', 'SHG'];

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketDescription) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Support ticket submitted successfully! We will get back to you within 24 hours.');
    setTicketSubject('');
    setTicketCategory('');
    setTicketDescription('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Support & Issues</h2>
        <p className="text-muted-foreground">Get help and support for your account</p>
      </div>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="mb-2">Call Support</h3>
            <p className="text-sm text-muted-foreground mb-3">24/7 helpline available</p>
            <p className="text-blue-600">1800-XXX-XXXX</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-3">Chat with our team</p>
            <p className="text-green-600">+91 XXXXX XXXXX</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">Get detailed help</p>
            <p className="text-purple-600">support@worqley.com</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Headphones className="h-8 w-8 text-orange-500 mx-auto mb-3" />
            <h3 className="mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-3">Instant support</p>
            <Button size="sm">Start Chat</Button>
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
            <div className="space-y-2">
              <label className="text-sm">Subject *</label>
              <Input
                placeholder="Brief description of your issue"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Category *</label>
              <Select value={ticketCategory} onValueChange={setTicketCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Description *</label>
            <Textarea
              placeholder="Please provide detailed information about your issue..."
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
          </div>
        </CardContent>
      </Card>

      {/* My Support Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportTickets.map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3>{ticket.subject}</h3>
                  <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id} • {ticket.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={ticket.status === 'resolved' ? 'default' : 'secondary'}
                    className={ticket.status === 'resolved' ? 'bg-green-500' : 'bg-yellow-500'}
                  >
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequently Asked Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqData.map(faq => (
              <div key={faq.id} className="p-4 border rounded-lg">
                <h3 className="mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Help Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4>Getting Started</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Platform Overview Guide
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  How to Complete Your Profile
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  Finding and Accepting Jobs
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4>Contact Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Emergency: 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email: support@worqley.com</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg mt-3">
                  <p className="text-sm text-blue-800">
                    Premium members get priority support with faster response times!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});