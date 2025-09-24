import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  Calendar,
  Plus,
  Handshake,
  PiggyBank
} from 'lucide-react';


interface SHGSectionProps {
  user: any;
}

export const SHGSection = React.memo(({ user }: SHGSectionProps) => {
  const shgData = {
    groupName: "Delhi Workers United",
    members: 12,
    totalFund: 45000,
    userContribution: 3500,
    monthlyContribution: 500,
    nextMeeting: "2024-01-25",
    isActive: true
  };

  const groupMembers = [
    { id: '1', name: 'Rajesh Kumar', role: 'Leader', contribution: 4200 },
    { id: '2', name: 'Priya Sharma', role: 'Secretary', contribution: 3800 },
    { id: '3', name: 'Amit Singh', role: 'Treasurer', contribution: 4500 },
    { id: '4', name: 'Sunita Devi', role: 'Member', contribution: 3200 },
    { id: '5', name: 'Vikram Patel', role: 'Member', contribution: 3900 }
  ];

  const recentActivities = [
    { id: '1', type: 'contribution', amount: 500, date: '2024-01-20', member: 'You' },
    { id: '2', type: 'loan', amount: 5000, date: '2024-01-18', member: 'Rajesh Kumar' },
    { id: '3', type: 'contribution', amount: 500, date: '2024-01-15', member: 'Priya Sharma' },
    { id: '4', type: 'meeting', amount: 0, date: '2024-01-15', member: 'Group Meeting' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Self Help Group (SHG)</h2>
        <p className="text-muted-foreground">Manage your SHG contributions and group activities</p>
      </div>

      {/* SHG Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Group Information</span>
            </div>
            <Badge className={shgData.isActive ? 'bg-green-500' : 'bg-red-500'}>
              {shgData.isActive ? 'Active Member' : 'Inactive'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-fit mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl">{shgData.groupName}</p>
              <p className="text-sm text-muted-foreground">{shgData.members} members</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-fit mx-auto mb-2">
                <PiggyBank className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl">₹{shgData.totalFund}</p>
              <p className="text-sm text-muted-foreground">Total Fund</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-fit mx-auto mb-2">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl">₹{shgData.userContribution}</p>
              <p className="text-sm text-muted-foreground">Your Contribution</p>
            </div>
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
            <Button className="flex items-center justify-center space-x-2 h-16">
              <Plus className="h-5 w-5" />
              <span>Make Contribution</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
              <Handshake className="h-5 w-5" />
              <span>Request Loan</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-center space-x-2 h-16">
              <Calendar className="h-5 w-5" />
              <span>Next Meeting: {shgData.nextMeeting}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Group Members */}
      <Card>
        <CardHeader>
          <CardTitle>Group Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {groupMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center space-x-2">
                    <p>{member.name}</p>
                    {member.role !== 'Member' && (
                      <Badge variant="secondary">{member.role}</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p>₹{member.contribution}</p>
                  <p className="text-sm text-muted-foreground">Contribution</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'contribution' ? 'bg-green-100' :
                    activity.type === 'loan' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'contribution' && <Plus className="h-4 w-4 text-green-600" />}
                    {activity.type === 'loan' && <Handshake className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'meeting' && <Users className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div>
                    <p>
                      {activity.type === 'contribution' && 'Contribution Made'}
                      {activity.type === 'loan' && 'Loan Taken'}
                      {activity.type === 'meeting' && 'Group Meeting'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.member} • {activity.date}
                    </p>
                  </div>
                </div>
                {activity.amount > 0 && (
                  <div className="text-right">
                    <p className={`${
                      activity.type === 'contribution' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {activity.type === 'contribution' ? '+' : '-'}₹{activity.amount}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});