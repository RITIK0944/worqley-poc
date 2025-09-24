import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { Progress } from '../ui/progress';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Star,
  Shield,
  Award,
  Settings,
  CheckCircle,
  Edit,
  Save,
  Bell,
  Lock,
  CreditCard,
  Briefcase,
  Clock,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  ThumbsUp
} from 'lucide-react';
import { User as UserType } from '../AppLayout';

interface ProfileManagementProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

function ProfileManagement({ user, onNavigate }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">User information not available</p>
      </div>
    );
  }

  // Enhanced mock data for worker profile
  const workerStats = {
    totalJobs: user.completedJobs || 127,
    rating: user.rating || 4.8,
    totalReviews: 89,
    monthlyEarnings: 18500,
    responseTime: '5 min',
    completionRate: 96,
    repeatCustomers: 34,
    profileCompletion: 92,
    experienceYears: 3,
    memberSince: 2021
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <CardContent className="relative p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={user?.profilePhoto} />
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {user?.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user?.fullName}</h1>
                  <p className="text-muted-foreground mb-1">{user?.workCategory} Worker</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {workerStats.memberSince}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{workerStats.rating} rating ({workerStats.totalReviews} reviews)</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm font-medium">{isAvailable ? 'Available' : 'Offline'}</span>
                    <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified Worker</Badge>
                  {!isEditing ? (
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                  ) : null}
                </div>
              </div>
              
              {/* Profile Completion */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span>{workerStats.profileCompletion}%</span>
                </div>
                <Progress value={workerStats.profileCompletion} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Worker Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{workerStats.totalJobs}</div>
            <p className="text-sm text-muted-foreground">Total Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">₹{workerStats.monthlyEarnings}</div>
            <p className="text-sm text-muted-foreground">Monthly Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{workerStats.rating}</div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{workerStats.completionRate}%</div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Personal & Professional Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Professional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                {isEditing ? (
                  <Input defaultValue={user?.fullName} />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">{user?.fullName}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Work Category</label>
                <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <span>{user?.workCategory}</span>
                  <Badge className="bg-blue-100 text-blue-800">Primary</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience Level</label>
                {isEditing ? (
                  <Input defaultValue={user?.experience || `${workerStats.experienceYears} years`} />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">{user?.experience || `${workerStats.experienceYears} years`}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Shift Preference</label>
                {isEditing ? (
                  <Input defaultValue={user?.shiftType || "full-time"} />
                ) : (
                  <div className="p-3 bg-muted rounded-lg capitalize">{user?.shiftType || "full-time"}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile Number</label>
                {isEditing ? (
                  <Input defaultValue={user?.mobile} />
                ) : (
                  <div className="p-3 bg-muted rounded-lg flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user?.mobile}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                {isEditing ? (
                  <Input defaultValue={user?.email || "worker@example.com"} />
                ) : (
                  <div className="p-3 bg-muted rounded-lg flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user?.email || "worker@example.com"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Aadhaar Number</label>
                <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user?.aadhaarNumber}
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Response Time</label>
                <div className="p-3 bg-green-50 rounded-lg flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium text-green-800">Avg. {workerStats.responseTime}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills & Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Skills & Specialization
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Description</label>
                {isEditing ? (
                  <Textarea 
                    placeholder="Describe your skills, specializations, and experience..."
                    rows={4}
                    defaultValue="Experienced plumber with 3+ years in residential and commercial plumbing. Specializes in pipe repairs, installations, and maintenance. Expert in modern plumbing systems and eco-friendly solutions."
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">
                    Experienced plumber with 3+ years in residential and commercial plumbing. Specializes in pipe repairs, installations, and maintenance. Expert in modern plumbing systems and eco-friendly solutions.
                  </div>
                )}
              </div>

              {user?.address && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Address</label>
                  {isEditing ? (
                    <Textarea 
                      defaultValue={`${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}`}
                      rows={3}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      {`${user.address.street}, ${user.address.city}, ${user.address.state} - ${user.address.pincode}`}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verification & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Verification & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Verification Status */}
            <div className="space-y-3">
              <h4 className="font-medium">Verification Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Aadhaar Verified</p>
                      <p className="text-sm text-muted-foreground">Identity confirmed</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Verified</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Mobile Verified</p>
                      <p className="text-sm text-muted-foreground">Phone number confirmed</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Profile Approved</p>
                      <p className="text-sm text-muted-foreground">Reviewed and verified</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Verified</Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h4 className="font-medium">Performance Metrics</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Job Completion Rate</span>
                  <span className="font-medium text-green-600">{workerStats.completionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Response Time</span>
                  <span className="font-medium text-blue-600">{workerStats.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Repeat Customers</span>
                  <span className="font-medium text-purple-600">{workerStats.repeatCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Customer Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{workerStats.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Security Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">Security Settings</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Change Password</p>
                      <p className="text-xs text-muted-foreground">Update your account password</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">Notifications</p>
                      <p className="text-xs text-muted-foreground">Job alerts and updates</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={() => setIsEditing(false)} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileManagement;