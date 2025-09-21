import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User as UserType } from '../../App';

interface AvailableTasksProps {
  user: UserType | null;
}

// Mock data for work requests
const mockWorkRequests = [
  {
    id: '1',
    customerName: 'John Doe',
    customerMobile: '9876543210',
    serviceType: 'Plumbing',
    description: 'Kitchen sink leakage repair needed urgently',
    location: 'Sector 15, Gurgaon',
    distance: '2.5 km',
    requestTime: '2 hours ago',
    estimatedPayment: '₹800',
    urgency: 'High',
    estimatedDuration: '2-3 hours'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerMobile: '9876543211',
    serviceType: 'Plumbing',
    description: 'Bathroom tap installation',
    location: 'MG Road, Delhi',
    distance: '5.2 km',
    requestTime: '4 hours ago',
    estimatedPayment: '₹1200',
    urgency: 'Medium',
    estimatedDuration: '1-2 hours'
  },
  {
    id: '3',
    customerName: 'Amit Kumar',
    customerMobile: '9876543212',
    serviceType: 'Plumbing',
    description: 'Water tank overflow issue',
    location: 'Connaught Place, Delhi',
    distance: '8.1 km',
    requestTime: '6 hours ago',
    estimatedPayment: '₹600',
    urgency: 'Low',
    estimatedDuration: '3-4 hours'
  }
];

export function AvailableTasks({ user }: AvailableTasksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('all');

  const handleAcceptRequest = (requestId: string) => {
    alert(`Request ${requestId} accepted! Customer will be notified.`);
  };

  const handleRejectRequest = (requestId: string) => {
    alert(`Request ${requestId} rejected.`);
  };

  const handleCallCustomer = (request: any) => {
    alert(`Calling ${request.customerName} at ${request.customerMobile}`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredRequests = mockWorkRequests.filter(request => {
    const matchesSearch = request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUrgency = urgencyFilter === 'all' || request.urgency.toLowerCase() === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Available Tasks</span>
            <Badge variant="secondary">{filteredRequests.length} Tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks by description, customer, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task list */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg">{request.customerName}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getUrgencyColor(request.urgency)}`}
                      >
                        {request.urgency} Priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{request.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {request.location} ({request.distance})
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration: {request.estimatedDuration}
                      </div>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span className="font-medium">{request.estimatedPayment}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Posted {request.requestTime}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleAcceptRequest(request.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Task
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleCallCustomer(request)}
                    className="flex-1 sm:flex-none"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectRequest(request.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No tasks available</h3>
            <p className="text-muted-foreground">
              {searchTerm || urgencyFilter !== 'all' 
                ? 'No tasks match your current filters. Try adjusting your search criteria.'
                : 'No new tasks are available right now. Check back later for new opportunities.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}