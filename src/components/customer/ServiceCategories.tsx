import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { 
  Search,
  MapPin,
  Star,
  Phone,
  Clock,
  Filter,
  Users,
  Plus,
  Briefcase,
  X,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Calendar,
  DollarSign,
  Home,
  Building,
  TreePine,
  Hammer,
  Wrench,
  Truck,
  Heart,
  Info,
  ChevronRight,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark
} from 'lucide-react';
import { User as UserType } from '../AppLayout';
import AvailableWorkers from './AvailableWorkers';
import TaskPosting from './TaskPosting';

interface ServiceCategoriesProps {
  user: UserType | null;
  onNavigate?: (page: string) => void;
  onCategorySelected?: (category: string) => void;
}

const serviceCategories = [
  { 
    name: 'Plumber', 
    icon: Wrench, 
    color: 'bg-blue-500',
    description: 'Water pipe repairs, installations, and maintenance',
    avgPrice: '₹300-500/hr',
    demand: 'High',
    rating: 4.6,
    workers: 234
  },
  { 
    name: 'Carpenter', 
    icon: Hammer, 
    color: 'bg-yellow-500',
    description: 'Furniture making, repairs, and wooden work',
    avgPrice: '₹350-600/hr',
    demand: 'High',
    rating: 4.7,
    workers: 189
  },
  { 
    name: 'Mason', 
    icon: Building, 
    color: 'bg-gray-500',
    description: 'Construction, brickwork, and building repairs',
    avgPrice: '₹400-700/hr',
    demand: 'Medium',
    rating: 4.5,
    workers: 156
  },
  { 
    name: 'Construction Worker', 
    icon: Building, 
    color: 'bg-orange-500',
    description: 'General construction and building work',
    avgPrice: '₹250-450/hr',
    demand: 'High',
    rating: 4.4,
    workers: 312
  },
  { 
    name: 'Housekeeping', 
    icon: Home, 
    color: 'bg-pink-500',
    description: 'Cleaning, organizing, and household maintenance',
    avgPrice: '₹200-350/hr',
    demand: 'Very High',
    rating: 4.8,
    workers: 278
  },
  { 
    name: 'Cook/Chef', 
    icon: Home, 
    color: 'bg-red-500',
    description: 'Cooking services for events and daily meals',
    avgPrice: '₹300-800/hr',
    demand: 'High',
    rating: 4.6,
    workers: 145
  },
  { 
    name: 'Gardener', 
    icon: TreePine, 
    color: 'bg-green-500',
    description: 'Garden maintenance, landscaping, and plant care',
    avgPrice: '₹250-400/hr',
    demand: 'Medium',
    rating: 4.5,
    workers: 98
  },
  { 
    name: 'Security Guard', 
    icon: Shield, 
    color: 'bg-indigo-500',
    description: 'Property security and surveillance services',
    avgPrice: '₹180-300/hr',
    demand: 'Medium',
    rating: 4.3,
    workers: 167
  },
  { 
    name: 'General Worker', 
    icon: Users, 
    color: 'bg-purple-500',
    description: 'Various manual and general work tasks',
    avgPrice: '₹200-350/hr',
    demand: 'High',
    rating: 4.4,
    workers: 289
  },
  { 
    name: 'Painter', 
    icon: Home, 
    color: 'bg-teal-500',
    description: 'Interior and exterior painting services',
    avgPrice: '₹300-500/hr',
    demand: 'Medium',
    rating: 4.5,
    workers: 134
  },
  { 
    name: 'Delivery Person', 
    icon: Truck, 
    color: 'bg-cyan-500',
    description: 'Package and goods delivery services',
    avgPrice: '₹150-250/hr',
    demand: 'Very High',
    rating: 4.2,
    workers: 345
  },
  { 
    name: 'Electrician', 
    icon: Zap, 
    color: 'bg-yellow-600',
    description: 'Electrical repairs, installations, and wiring',
    avgPrice: '₹400-700/hr',
    demand: 'High',
    rating: 4.7,
    workers: 198
  },
  { 
    name: 'Welder', 
    icon: Zap, 
    color: 'bg-red-600',
    description: 'Metal welding and fabrication work',
    avgPrice: '₹450-800/hr',
    demand: 'Medium',
    rating: 4.6,
    workers: 89
  },
  { 
    name: 'Service Staff', 
    icon: Users, 
    color: 'bg-brown-500',
    description: 'Event service and hospitality staff',
    avgPrice: '₹200-400/hr',
    demand: 'Medium',
    rating: 4.3,
    workers: 167
  },
  { 
    name: 'Caretaker', 
    icon: Heart, 
    color: 'bg-emerald-500',
    description: 'Elderly care, child care, and personal assistance',
    avgPrice: '₹250-500/hr',
    demand: 'High',
    rating: 4.8,
    workers: 123
  }
];

// Mock worker data
const mockWorkers = [
  { id: '1', fullName: 'Rajesh Kumar', category: 'Plumber', rating: 4.8, jobs: 157, location: 'Within 2km', price: '₹300/hr', available: true, mobile: '9876543210' },
  { id: '2', fullName: 'Suresh Patel', category: 'Plumber', rating: 4.6, jobs: 203, location: 'Within 5km', price: '₹350/hr', available: true, mobile: '9876543211' },
  { id: '3', fullName: 'Amit Singh', category: 'Plumber', rating: 4.9, jobs: 89, location: 'Within 3km', price: '₹400/hr', available: false, mobile: '9876543212' },
  { id: '4', fullName: 'Manoj Sharma', category: 'Electrician', rating: 4.7, jobs: 134, location: 'Within 1km', price: '₹450/hr', available: true, mobile: '9876543213' },
  { id: '5', fullName: 'Ravi Yadav', category: 'Carpenter', rating: 4.5, jobs: 98, location: 'Within 4km', price: '₹380/hr', available: true, mobile: '9876543214' }
];

const ServiceCategories = React.memo(({ user, onNavigate, onCategorySelected }: ServiceCategoriesProps) => {
  
  if (!user) return null;

  // Debug logging to help identify timeout issues
  React.useEffect(() => {
    console.log('ServiceCategories component mounted/updated');
    return () => {
      console.log('ServiceCategories component cleanup');
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationRadius, setLocationRadius] = useState('10');
  const [showTaskPosting, setShowTaskPosting] = useState(false);
  const [selectedTab, setSelectedTab] = useState('categories');
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [bookmarkedCategories, setBookmarkedCategories] = useState<string[]>([]);
  const [showCategoryDetails, setShowCategoryDetails] = useState<string | null>(null);
  
  const filteredWorkers = React.useMemo(() => {
    return mockWorkers.filter(worker => {
      const matchesCategory = !selectedCategory || worker.category === selectedCategory;
      const matchesSearch = worker.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           worker.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // If onCategorySelected is provided, call it to navigate to task posting
    if (onCategorySelected) {
      onCategorySelected(category);
    }
  };

  const handleBookWorker = (worker: any) => {
    alert(`Booking ${worker.fullName} for ${worker.category} service. You will be contacted shortly!`);
  };

  const handleCallWorker = (worker: any) => {
    alert(`Calling ${worker.fullName} at ${worker.mobile}`);
  };

  const handleContactWorker = (worker: any) => {
    alert(`Contacting ${worker.fullName} at ${worker.mobile}`);
  };

  const handleAddTask = () => {
    setShowTaskPosting(true);
  };

  const handleTaskPosted = (task: any) => {
    console.log('Task posted:', task);
    toast.success('Task posted successfully! Workers will be notified.');
    setShowTaskPosting(false);
  };

  const handleBookmarkCategory = (categoryName: string) => {
    setBookmarkedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
    toast.success(bookmarkedCategories.includes(categoryName) ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredCategories = serviceCategories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = category.rating >= ratingFilter;
    return matchesSearch && matchesRating;
  });

  const popularCategories = serviceCategories
    .filter(cat => cat.demand === 'Very High' || cat.demand === 'High')
    .sort((a, b) => b.workers - a.workers)
    .slice(0, 6);

  const trendingCategories = serviceCategories
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Workers</p>
                <p className="text-xl font-semibold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Services Available</p>
                <p className="text-xl font-semibold">{serviceCategories.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-xl font-semibold">4.6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-xl font-semibold">15 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">All Services</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        {/* Search and Filters */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={locationRadius} onValueChange={setLocationRadius}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Within 1km</SelectItem>
                    <SelectItem value="5">Within 5km</SelectItem>
                    <SelectItem value="10">Within 10km</SelectItem>
                    <SelectItem value="city">Entire City</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Advanced Filters</DialogTitle>
                      <DialogDescription>Refine your search with advanced options</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Price Range (₹/hour)</Label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={1000}
                          min={100}
                          step={50}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-1">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Minimum Rating</Label>
                        <Select value={ratingFilter.toString()} onValueChange={(value) => setRatingFilter(Number(value))}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Any Rating</SelectItem>
                            <SelectItem value="3">3+ Stars</SelectItem>
                            <SelectItem value="4">4+ Stars</SelectItem>
                            <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Availability</Label>
                        <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                          <SelectTrigger className="mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Workers</SelectItem>
                            <SelectItem value="available">Available Now</SelectItem>
                            <SelectItem value="today">Available Today</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.name} className="transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{category.rating}</span>
                            <span className="text-sm text-muted-foreground">({category.workers} workers)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmarkCategory(category.name)}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarkedCategories.includes(category.name) ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowCategoryDetails(category.name)}
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium text-green-600">{category.avgPrice}</span>
                      <Badge className={getDemandColor(category.demand)}>
                        {category.demand} Demand
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleCategorySelect(category.name)}
                        className="flex-1"
                      >
                        Select Service
                      </Button>
                      <Button variant="outline" onClick={() => setShowCategoryDetails(category.name)}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Most Popular Services</span>
              </CardTitle>
              <CardDescription>Services with highest demand in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.name} className="relative overflow-hidden">
                      {index < 3 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                            #{index + 1} Popular
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-4 pt-8">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.workers} workers</p>
                          </div>
                        </div>
                        <Button onClick={() => handleCategorySelect(category.name)} className="w-full">
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Trending Services</span>
              </CardTitle>
              <CardDescription>Highest rated services this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold">
                          {index + 1}
                        </div>
                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm">{category.rating}</span>
                            <span className="text-sm text-muted-foreground">• {category.avgPrice}</span>
                          </div>
                        </div>
                      </div>
                      <Button onClick={() => handleCategorySelect(category.name)}>
                        Select
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookmarks">
          {bookmarkedCategories.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Bookmarks Yet</h3>
                <p className="text-muted-foreground mb-4">Save your favorite services for quick access</p>
                <Button onClick={() => setSelectedTab('categories')}>
                  Browse Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceCategories
                .filter(cat => bookmarkedCategories.includes(cat.name))
                .map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.name}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">{category.avgPrice}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmarkCategory(category.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button onClick={() => handleCategorySelect(category.name)} className="w-full">
                          Select Service
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search workers by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={locationRadius} onValueChange={setLocationRadius}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Within 1km</SelectItem>
                  <SelectItem value="5">Within 5km</SelectItem>
                  <SelectItem value="10">Within 10km</SelectItem>
                  <SelectItem value="city">Entire City</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Posting Option - Shows when category is selected */}
      {selectedCategory && !showTaskPosting && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Post a Task for {selectedCategory}</h3>
                  <p className="text-gray-600 text-sm">
                    Describe your specific requirements and let workers bid on your task
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleAddTask}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Posting Form */}
      {showTaskPosting && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Post Task for {selectedCategory}</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowTaskPosting(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
          <TaskPosting 
            user={user}
            onTaskPosted={handleTaskPosted}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

      {/* Available Workers - Now using the new component */}
      {selectedCategory && !showTaskPosting && (
        <AvailableWorkers 
          category={selectedCategory}
          onContactWorker={handleContactWorker}
        />
      )}

      {/* Emergency Service */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-900 mb-2">Emergency Service</h3>
              <p className="text-red-700 text-sm">Need immediate help? Get connected to available workers instantly</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ServiceCategories.displayName = 'ServiceCategories';
export default ServiceCategories;