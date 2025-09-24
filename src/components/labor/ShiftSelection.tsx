import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Sun, 
  Moon, 
  Sunset,
  Settings,
  Save,
  MapPin,
  DollarSign,
  Target,
  Zap,
  Activity,
  Timer,
  TrendingUp,
  Users,
  AlertCircle,
  Info
} from 'lucide-react';
import { User as UserType } from '../AppLayout';

interface ShiftSelectionProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
}

const shiftTypes = [
  {
    id: 'full-time',
    name: 'Full Time',
    description: '8-10 hours daily',
    hours: 'Full day availability',
    icon: Sun,
    color: 'bg-blue-500'
  },
  {
    id: 'half-time',
    name: 'Half Time',
    description: '4-5 hours daily',
    hours: 'Half day availability',
    icon: Sunset,
    color: 'bg-orange-500'
  },
  {
    id: 'part-time',
    name: 'Part Time',
    description: '2-3 hours daily',
    hours: 'Flexible timing',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    id: 'task-based',
    name: 'Task Based',
    description: 'Per job basis',
    hours: 'As per requirement',
    icon: CheckCircle,
    color: 'bg-purple-500'
  }
];

const timeSlots = [
  { id: 'morning', label: 'Morning', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', icon: Sunset },
  { id: 'evening', label: 'Evening', icon: Moon }
];

function ShiftSelection({ user, onNavigate }: ShiftSelectionProps) {
  
  if (!user) return null;
  const [selectedShift, setSelectedShift] = useState(user?.shiftType || 'full-time');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(['morning', 'afternoon']);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);
  const [isAvailable, setIsAvailable] = useState(true);
  const [autoAcceptJobs, setAutoAcceptJobs] = useState(false);
  const [maxDailyJobs, setMaxDailyJobs] = useState(3);
  const [preferredRadius, setPreferredRadius] = useState(10);

  // Enhanced shift analytics
  const shiftAnalytics = {
    weeklyHours: 42,
    avgEarningsPerShift: 850,
    totalShiftsThisMonth: 18,
    upcomingShifts: 5,
    cancelledShifts: 2,
    shiftCompletionRate: 96,
    peakHours: ['10:00 AM - 2:00 PM', '6:00 PM - 9:00 PM'],
    busyDays: ['Friday', 'Saturday', 'Sunday']
  };

  const handleShiftChange = (shiftId: string) => {
    setSelectedShift(shiftId);
  };

  const handleTimeSlotToggle = (slotId: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleSavePreferences = () => {
    alert('Shift preferences saved successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Enhanced Header with Status */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl text-white p-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shift Management</h1>
              <p className="text-white/90">Manage your availability and work preferences</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium">{isAvailable ? 'Available' : 'Offline'}</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Quick Schedule
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Weekly Hours</span>
              </div>
              <div className="font-bold text-lg">{shiftAnalytics.weeklyHours}h</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Avg. Per Shift</span>
              </div>
              <div className="font-bold text-lg">₹{shiftAnalytics.avgEarningsPerShift}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="h-4 w-4" />
                <span className="text-sm">This Month</span>
              </div>
              <div className="font-bold text-lg">{shiftAnalytics.totalShiftsThisMonth}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Completion</span>
              </div>
              <div className="font-bold text-lg">{shiftAnalytics.shiftCompletionRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Shift Analytics & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Shift Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Progress</span>
                    <span>{shiftAnalytics.totalShiftsThisMonth}/25 shifts</span>
                  </div>
                  <Progress value={(shiftAnalytics.totalShiftsThisMonth / 25) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion Rate</span>
                    <span>{shiftAnalytics.shiftCompletionRate}%</span>
                  </div>
                  <Progress value={shiftAnalytics.shiftCompletionRate} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">Peak Hours</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {shiftAnalytics.peakHours.join(', ')}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">Busy Days</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {shiftAnalytics.busyDays.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Quick Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Auto Accept Jobs</p>
                <p className="text-xs text-muted-foreground">Automatically accept suitable jobs</p>
              </div>
              <Switch checked={autoAcceptJobs} onCheckedChange={setAutoAcceptJobs} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Daily Jobs</label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setMaxDailyJobs(Math.max(1, maxDailyJobs - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 bg-muted rounded text-center min-w-[3rem]">{maxDailyJobs}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setMaxDailyJobs(Math.min(10, maxDailyJobs + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Radius (km)</label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPreferredRadius(Math.max(1, preferredRadius - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 bg-muted rounded text-center min-w-[3rem]">{preferredRadius}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPreferredRadius(Math.min(50, preferredRadius + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Shift Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shiftTypes.map(shift => {
              const IconComponent = shift.icon;
              const isSelected = selectedShift === shift.id;
              
              return (
                <Card 
                  key={shift.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary shadow-md' : ''
                  }`}
                  onClick={() => handleShiftChange(shift.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${shift.color} text-white`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{shift.name}</h3>
                          {isSelected && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{shift.description}</p>
                        <p className="text-xs text-muted-foreground">{shift.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slot Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>Preferred Time Slots</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeSlots.map(slot => {
              const IconComponent = slot.icon;
              const isSelected = selectedTimeSlots.includes(slot.id);
              
              return (
                <div 
                  key={slot.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleTimeSlotToggle(slot.id)}
                >
                  <div className={`p-2 rounded ${isSelected ? 'bg-primary text-white' : 'bg-muted'}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{slot.label}</p>
                  </div>
                  {isSelected && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[
              { day: 'Mon', key: 'monday' },
              { day: 'Tue', key: 'tuesday' },
              { day: 'Wed', key: 'wednesday' },
              { day: 'Thu', key: 'thursday' },
              { day: 'Fri', key: 'friday' },
              { day: 'Sat', key: 'saturday' },
              { day: 'Sun', key: 'sunday' }
            ].map(({ day, key }) => {
              const isAvailableDay = availableDays.includes(key);
              return (
                <div key={day} className="text-center">
                  <p className="text-sm font-medium mb-2">{day}</p>
                  <div 
                    className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                      isAvailableDay ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                    onClick={() => {
                      setAvailableDays(prev => 
                        prev.includes(key) 
                          ? prev.filter(d => d !== key)
                          : [...prev, key]
                      );
                    }}
                  >
                    {isAvailableDay ? 'Available' : 'Off'}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Click on any day to toggle your availability. Use the calendar below to mark specific dates as unavailable.
          </p>
        </CardContent>
      </Card>

      {/* Calendar for specific dates */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Unavailable Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={unavailableDates}
            onSelect={(dates) => setUnavailableDates(dates || [])}
            className="rounded-md border"
            disabled={(date) => date < new Date()}
          />
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Select specific dates when you won't be available for work. This will help us not assign tasks on those days.
            </p>
            {unavailableDates.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Unavailable dates:</p>
                <div className="flex flex-wrap gap-2">
                  {unavailableDates.map((date, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {date.toLocaleDateString()}
                      <button
                        onClick={() => setUnavailableDates(prev => prev.filter((_, i) => i !== index))}
                        className="ml-1 text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>Changes will be applied immediately and affect future job assignments</span>
            </div>
            <Button onClick={handleSavePreferences} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save All Preferences</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShiftSelection;