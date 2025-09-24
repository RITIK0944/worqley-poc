import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

import { Bell, Shield, User, Globe, Smartphone, CreditCard, AlertTriangle, Crown, Star, MapPin } from 'lucide-react';
import { User as UserType } from './AppLayout';
import { useLanguage } from './LanguageContext';
import { Language } from '../utils/translations';

interface SettingsComponentProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

export const CustomerSettings: React.FC<SettingsComponentProps> = ({ user, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false,
    updates: true,
    taskUpdates: true,
    paymentNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPhoneNumber: false,
    showEmail: false,
    shareLocation: true,
    allowReviews: true,
    showBookingHistory: false
  });

  const [preferences, setPreferences] = useState({
    preferredRadius: 10,
    currency: 'INR',
    theme: 'system',
    autoBookingConfirmation: false,
    preferredPaymentMethod: 'wallet',
    emergencyContact: ''
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    deviceTracking: true,
    suspiciousActivityAlerts: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
        <Badge variant={user?.isPremium ? "default" : "secondary"}>
          {user?.isPremium ? "Premium Customer" : "Standard Customer"}
        </Badge>
      </div>

      {/* Account Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Account Status</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Active & Verified</span>
              </div>
            </div>
            <div>
              <Label>Member Since</Label>
              <p className="text-sm text-muted-foreground mt-1">January 2024</p>
            </div>
            <div>
              <Label>Total Bookings</Label>
              <p className="text-sm font-medium mt-1">15 completed</p>
            </div>
            <div>
              <Label>Average Rating Given</Label>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about important updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Get text messages for urgent updates' },
            { key: 'push', label: 'Push Notifications', desc: 'Mobile app notifications' },
            { key: 'taskUpdates', label: 'Task Updates', desc: 'Updates about your bookings and tasks' },
            { key: 'paymentNotifications', label: 'Payment Alerts', desc: 'Payment confirmations and receipts' },
            { key: 'marketing', label: 'Marketing Messages', desc: 'Promotional offers and deals' },
            { key: 'updates', label: 'Product Updates', desc: 'New features and improvements' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{label}</Label>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key as keyof typeof notifications]}
                onCheckedChange={(checked) => handleNotificationChange(key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your privacy and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { key: 'profileVisible', label: 'Profile Visibility', desc: 'Make your profile visible to workers' },
            { key: 'showPhoneNumber', label: 'Show Phone Number', desc: 'Display phone number in your profile' },
            { key: 'showEmail', label: 'Show Email Address', desc: 'Display email address in your profile' },
            { key: 'shareLocation', label: 'Location Sharing', desc: 'Share location for better service matching' },
            { key: 'allowReviews', label: 'Allow Reviews', desc: 'Let workers see your reviews and ratings' },
            { key: 'showBookingHistory', label: 'Public Booking History', desc: 'Show your booking history to workers' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{label}</Label>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={privacy[key as keyof typeof privacy]}
                onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
              />
            </div>
          ))}

          <Separator />

          {/* Security Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Security Settings</h4>
            {[
              { key: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
              { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified of new device logins' },
              { key: 'deviceTracking', label: 'Device Tracking', desc: 'Keep track of devices that access your account' },
              { key: 'suspiciousActivityAlerts', label: 'Security Alerts', desc: 'Get alerts for suspicious activities' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={security[key as keyof typeof security]}
                  onCheckedChange={(checked) => handleSecurityChange(key, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            App Preferences
          </CardTitle>
          <CardDescription>
            Customize your app experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger>
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="gu">ગુજરાતી</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                  <SelectItem value="ml">മലയാളം</SelectItem>
                  <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
                  <SelectItem value="or">ଓଡ଼ିଆ</SelectItem>
                  <SelectItem value="as">অসমীয়া</SelectItem>
                  <SelectItem value="ur">اردو</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="radius">Search Radius</Label>
              <Select 
                value={preferences.preferredRadius.toString()} 
                onValueChange={(value) => handlePreferenceChange('preferredRadius', parseInt(value))}
              >
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="15">15 km</SelectItem>
                  <SelectItem value="20">20 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={preferences.currency} 
                onValueChange={(value) => handlePreferenceChange('currency', value)}
              >
                <SelectTrigger>
                  <CreditCard className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ Indian Rupee</SelectItem>
                  <SelectItem value="USD">$ US Dollar</SelectItem>
                  <SelectItem value="EUR">€ Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Preferred Payment</Label>
              <Select 
                value={preferences.preferredPaymentMethod} 
                onValueChange={(value) => handlePreferenceChange('preferredPaymentMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet">WORQLEY Wallet</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Confirm Bookings</Label>
              <p className="text-sm text-muted-foreground">Automatically confirm bookings that match your preferences</p>
            </div>
            <Switch
              checked={preferences.autoBookingConfirmation}
              onCheckedChange={(checked) => handlePreferenceChange('autoBookingConfirmation', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              placeholder="Enter emergency contact number"
              value={preferences.emergencyContact}
              onChange={(e) => handlePreferenceChange('emergencyContact', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your account status and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Upgrade to Premium</Label>
              <p className="text-sm text-muted-foreground">Get priority support, exclusive features, and special discounts</p>
            </div>
            <Button>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Download My Data</Label>
              <p className="text-sm text-muted-foreground">Get a copy of all your account data</p>
            </div>
            <Button variant="outline">Download</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deactivate Account</Label>
              <p className="text-sm text-muted-foreground">Temporarily deactivate your account</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                if (confirm('Are you sure you want to deactivate your account? You can reactivate it anytime by logging in.')) {
                  alert('Account deactivated successfully');
                }
              }}
            >
              Deactivate
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button 
              variant="destructive"
              onClick={() => {
                if (confirm('This action cannot be undone. This will permanently delete your account and remove all your data. Are you sure?')) {
                  alert('Account deletion initiated. You will receive an email confirmation.');
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const WorkerSettings: React.FC<SettingsComponentProps> = ({ user, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    marketing: false,
    updates: true,
    jobAlerts: true,
    paymentNotifications: true,
    shgUpdates: true,
    insuranceReminders: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPhoneNumber: true,
    showEmail: false,
    shareLocation: true,
    allowCustomerContact: true,
    showWorkHistory: true,
    showRatings: true
  });

  const [workPreferences, setWorkPreferences] = useState({
    availableRadius: 15,
    preferredShifts: 'flexible',
    minimumJobValue: 200,
    transportMode: 'own-vehicle',
    emergencyContact: '',
    preferredJobTypes: ['plumbing', 'electrical'],
    maxJobsPerDay: 3
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    deviceTracking: true,
    suspiciousActivityAlerts: true,
    locationTracking: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleWorkPreferenceChange = (key: string, value: any) => {
    setWorkPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('settings')}</h1>
          <p className="text-muted-foreground">Manage your worker profile and preferences</p>
        </div>
        <Badge variant={user?.isPremium ? "default" : "secondary"}>
          {user?.isPremium ? "Premium Worker" : "Standard Worker"}
        </Badge>
      </div>

      {/* Worker Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Worker Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Worker Status</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Active & Available</span>
              </div>
            </div>
            <div>
              <Label>Worker Since</Label>
              <p className="text-sm text-muted-foreground mt-1">March 2023</p>
            </div>
            <div>
              <Label>Jobs Completed</Label>
              <p className="text-sm font-medium mt-1">127 jobs</p>
            </div>
            <div>
              <Label>Average Rating</Label>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.6</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Manage how you receive job alerts and updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Get text messages for urgent updates' },
            { key: 'push', label: 'Push Notifications', desc: 'Mobile app notifications' },
            { key: 'jobAlerts', label: 'Job Alerts', desc: 'Notifications about new job opportunities' },
            { key: 'paymentNotifications', label: 'Payment Updates', desc: 'Payment confirmations and receipts' },
            { key: 'shgUpdates', label: 'SHG Updates', desc: 'Self Help Group notifications' },
            { key: 'insuranceReminders', label: 'Insurance Reminders', desc: 'Premium due dates and policy updates' },
            { key: 'marketing', label: 'Promotional Messages', desc: 'Special offers and platform updates' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{label}</Label>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={notifications[key as keyof typeof notifications]}
                onCheckedChange={(checked) => handleNotificationChange(key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Work Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Work Preferences
          </CardTitle>
          <CardDescription>
            Set your availability and job preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger>
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="gu">ગુજરાતી</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                  <SelectItem value="ml">മലയാളം</SelectItem>
                  <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
                  <SelectItem value="or">ଓଡ଼ିଆ</SelectItem>
                  <SelectItem value="as">অসমীয়া</SelectItem>
                  <SelectItem value="ur">اردو</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="radius">Work Radius</Label>
              <Select 
                value={workPreferences.availableRadius.toString()} 
                onValueChange={(value) => handleWorkPreferenceChange('availableRadius', parseInt(value))}
              >
                <SelectTrigger>
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="15">15 km</SelectItem>
                  <SelectItem value="20">20 km</SelectItem>
                  <SelectItem value="30">30 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minJobValue">Minimum Job Value</Label>
              <Select 
                value={workPreferences.minimumJobValue.toString()} 
                onValueChange={(value) => handleWorkPreferenceChange('minimumJobValue', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">₹100</SelectItem>
                  <SelectItem value="200">₹200</SelectItem>
                  <SelectItem value="300">₹300</SelectItem>
                  <SelectItem value="500">₹500</SelectItem>
                  <SelectItem value="1000">₹1000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxJobs">Max Jobs Per Day</Label>
              <Select 
                value={workPreferences.maxJobsPerDay.toString()} 
                onValueChange={(value) => handleWorkPreferenceChange('maxJobsPerDay', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 job</SelectItem>
                  <SelectItem value="2">2 jobs</SelectItem>
                  <SelectItem value="3">3 jobs</SelectItem>
                  <SelectItem value="4">4 jobs</SelectItem>
                  <SelectItem value="5">5 jobs</SelectItem>
                  <SelectItem value="10">No limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              placeholder="Enter emergency contact number"
              value={workPreferences.emergencyContact}
              onChange={(e) => handleWorkPreferenceChange('emergencyContact', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your profile visibility and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            { key: 'profileVisible', label: 'Profile Visibility', desc: 'Make your profile visible to customers' },
            { key: 'showPhoneNumber', label: 'Show Phone Number', desc: 'Display phone number in your profile' },
            { key: 'showEmail', label: 'Show Email Address', desc: 'Display email address in your profile' },
            { key: 'shareLocation', label: 'Location Sharing', desc: 'Share location for better job matching' },
            { key: 'allowCustomerContact', label: 'Direct Customer Contact', desc: 'Allow customers to contact you directly' },
            { key: 'showWorkHistory', label: 'Show Work History', desc: 'Display your job history to customers' },
            { key: 'showRatings', label: 'Show Ratings', desc: 'Display your ratings and reviews' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{label}</Label>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
              <Switch
                checked={privacy[key as keyof typeof privacy]}
                onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
              />
            </div>
          ))}

          <Separator />

          {/* Security Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Security Settings</h4>
            {[
              { key: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Add extra security to your account' },
              { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified of new device logins' },
              { key: 'deviceTracking', label: 'Device Tracking', desc: 'Keep track of devices that access your account' },
              { key: 'locationTracking', label: 'Location Tracking', desc: 'Track your location during active jobs' },
              { key: 'suspiciousActivityAlerts', label: 'Security Alerts', desc: 'Get alerts for suspicious activities' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={security[key as keyof typeof security]}
                  onCheckedChange={(checked) => handleSecurityChange(key, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Account Actions
          </CardTitle>
          <CardDescription>
            Manage your worker account status and data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Upgrade to Premium</Label>
              <p className="text-sm text-muted-foreground">Get priority jobs, higher visibility, and advanced features</p>
            </div>
            <Button>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Download My Data</Label>
              <p className="text-sm text-muted-foreground">Get a copy of all your account data</p>
            </div>
            <Button variant="outline">Download</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deactivate Account</Label>
              <p className="text-sm text-muted-foreground">Temporarily deactivate your worker account</p>
            </div>
            <Button variant="outline">Deactivate</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-destructive">Delete Account</Label>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Settings component that chooses between customer and worker settings
function SettingsComponents({ user, onNavigate }: SettingsComponentProps) {
  if (!user) return null;

  if (user.type === 'customer') {
    return <CustomerSettings user={user} onNavigate={onNavigate} />;
  } else {
    return <WorkerSettings user={user} onNavigate={onNavigate} />;
  }
}

export default SettingsComponents;