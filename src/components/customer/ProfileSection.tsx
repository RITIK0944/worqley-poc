import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';
import { 
  User, 
  Camera, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard,
  Save,
  Edit,
  Shield,
  Star,
  Calendar,
  Award,
  CheckCircle,
  Bell,
  Lock,
  Settings,
  Wallet,
  Gift,
  Heart
} from 'lucide-react';
import { User as UserType, Address } from '../AppLayout';

interface ProfileSectionProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

function ProfileSection({ user, onNavigate }: ProfileSectionProps) {
  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">User information not available</p>
      </div>
    );
  }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email || '',
    mobile: user.mobile,
    aadhaarNumber: user.aadhaarNumber,
    profilePhoto: user.profilePhoto,
    address: user.address || {
      street: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    } as Address
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddressSelectChange = (field: keyof Address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profilePhoto: photoUrl
      }));
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 8) {
      return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`;
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return digits;
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setFormData(prev => ({
      ...prev,
      aadhaarNumber: formatted
    }));
  };

  // Mock data for enhanced profile
  const profileStats = {
    totalBookings: 12,
    avgRating: 4.8,
    moneySaved: 2450,
    memberSince: new Date().getFullYear(),
    favoriteWorkers: 8,
    completedThisMonth: 5,
    loyaltyPoints: 340,
    profileCompletion: 85
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        <CardContent className="relative p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={formData.profilePhoto} />
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {formData.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
                  <p className="text-muted-foreground mb-1">Customer Account</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {profileStats.memberSince}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{profileStats.avgRating} rating</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Badge className="bg-green-100 text-green-800">Verified Customer</Badge>
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
                  <span>{profileStats.profileCompletion}%</span>
                </div>
                <Progress value={profileStats.profileCompletion} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{profileStats.totalBookings}</div>
            <p className="text-sm text-muted-foreground">Total Bookings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">₹{profileStats.moneySaved}</div>
            <p className="text-sm text-muted-foreground">Money Saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{profileStats.loyaltyPoints}</div>
            <p className="text-sm text-muted-foreground">Loyalty Points</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{profileStats.favoriteWorkers}</div>
            <p className="text-sm text-muted-foreground">Favorite Workers</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                {isEditing ? (
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg">{formData.fullName}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.email || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile Number</label>
                {isEditing ? (
                  <Input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    maxLength={10}
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {formData.mobile}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Aadhaar Number</label>
                {isEditing ? (
                  <Input
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleAadhaarChange}
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                ) : (
                  <div className="p-3 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      {formData.aadhaarNumber}
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Street Address</label>
                  {isEditing ? (
                    <Textarea
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  ) : (
                    <div className="p-3 bg-muted rounded-lg min-h-[60px]">
                      {formData.address.street || 'Not provided'}
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    {isEditing ? (
                      <Input
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        {formData.address.city || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">State</label>
                    {isEditing ? (
                      <Select 
                        value={formData.address.state}
                        onValueChange={(value) => handleAddressSelectChange('state', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map(state => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        {formData.address.state || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Pincode</label>
                    {isEditing ? (
                      <Input
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        maxLength={6}
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-lg">
                        {formData.address.pincode || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security & Preferences</span>
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

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Verify your email address</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Verify</Button>
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
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Update your account password</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Extra security layer</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">Get alerts for new logins</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Configure</Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Preferences */}
            <div className="space-y-4">
              <h4 className="font-medium">Account Preferences</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <Wallet className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Wallet Settings</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Manage payment methods and wallet</p>
                </div>

                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <Gift className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Loyalty Program</span>
                  </div>
                  <p className="text-sm text-muted-foreground">View points and rewards</p>
                </div>

                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="font-medium">Favorite Workers</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Manage your preferred workers</p>
                </div>

                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">App Settings</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Notifications and privacy</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleSave} className="flex-1">
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ProfileSection;