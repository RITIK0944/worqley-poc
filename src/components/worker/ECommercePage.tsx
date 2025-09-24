import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ShoppingCart, 
  Package, 
  Wrench,
  HardHat,
  Zap,
  Paintbrush,
  Hammer,
  Star,
  Heart,
  Search,
  Filter,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  Eye,
  Download,
  RefreshCw,
  MapPin,
  Phone,
  Award,
  Users,
  ThumbsUp,
  Calendar,
  RotateCcw,
  AlertTriangle,
  Info,
  CreditCard,
  FileText,
  Settings
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ECommercePageProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const ECommercePage = React.memo(({ user }: ECommercePageProps) => {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: Package, count: 150 },
    { id: 'tools', name: 'Hand Tools', icon: Hammer, count: 45 },
    { id: 'electrical', name: 'Electrical', icon: Zap, count: 32 },
    { id: 'safety', name: 'Safety Gear', icon: HardHat, count: 28 },
    { id: 'plumbing', name: 'Plumbing', icon: Wrench, count: 25 },
    { id: 'painting', name: 'Painting', icon: Paintbrush, count: 20 }
  ];

  const featuredProducts = [
    {
      id: 'P001',
      name: 'Professional Drill Set',
      brand: 'PowerTech',
      price: 2499,
      originalPrice: 2999,
      discount: 17,
      rating: 4.8,
      reviews: 234,
      image: 'drill-set.jpg',
      category: 'tools',
      inStock: true,
      fastDelivery: true,
      workerPrice: true,
      description: 'High-quality drill set with multiple bits'
    },
    {
      id: 'P002',
      name: 'Safety Helmet with LED',
      brand: 'SafeGuard',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 4.6,
      reviews: 156,
      image: 'helmet.jpg',
      category: 'safety',
      inStock: true,
      fastDelivery: true,
      workerPrice: true,
      description: 'ANSI certified safety helmet with LED light'
    },
    {
      id: 'P003',
      name: 'Electrical Multimeter',
      brand: 'VoltagePro',
      price: 1599,
      originalPrice: 1999,
      discount: 20,
      rating: 4.9,
      reviews: 89,
      image: 'multimeter.jpg',
      category: 'electrical',
      inStock: false,
      fastDelivery: false,
      workerPrice: true,
      description: 'Digital multimeter for electrical testing'
    },
    {
      id: 'P004',
      name: 'Pipe Wrench Set',
      brand: 'FlowMaster',
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      rating: 4.7,
      reviews: 67,
      image: 'pipe-wrench.jpg',
      category: 'plumbing',
      inStock: true,
      fastDelivery: true,
      workerPrice: true,
      description: 'Heavy-duty pipe wrench set for plumbing'
    }
  ];

  const myOrders = [
    {
      id: 'ORD001',
      date: '2024-01-18',
      items: [
        { name: 'Screwdriver Set', quantity: 1, price: 599 },
        { name: 'Safety Gloves', quantity: 2, price: 299 }
      ],
      total: 1197,
      status: 'Delivered',
      estimatedDelivery: '2024-01-20',
      actualDelivery: '2024-01-19',
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD002',
      date: '2024-01-15',
      items: [
        { name: 'LED Work Light', quantity: 1, price: 899 }
      ],
      total: 899,
      status: 'In Transit',
      estimatedDelivery: '2024-01-22',
      tracking: 'TRK987654321'
    },
    {
      id: 'ORD003',
      date: '2024-01-10',
      items: [
        { name: 'Tool Belt', quantity: 1, price: 1299 },
        { name: 'Measuring Tape', quantity: 1, price: 199 }
      ],
      total: 1498,
      status: 'Processing',
      estimatedDelivery: '2024-01-25'
    }
  ];

  const recommendations = [
    {
      id: 'R001',
      name: 'Based on your electrical work',
      products: ['Wire Strippers', 'Voltage Tester', 'Cable Ties'],
      reason: 'Popular among electrical workers'
    },
    {
      id: 'R002',
      name: 'Trending in your area',
      products: ['Digital Level', 'Impact Driver', 'Work Boots'],
      reason: 'High demand in Delhi NCR'
    },
    {
      id: 'R003',
      name: 'Complete your tool set',
      products: ['Socket Set', 'Adjustable Wrench', 'Utility Knife'],
      reason: 'Frequently bought together'
    }
  ];

  const suppliers = [
    {
      id: 'S001',
      name: 'TechTools India',
      rating: 4.8,
      location: 'Mumbai',
      speciality: 'Power Tools',
      verified: true,
      deliveryTime: '2-3 days',
      minOrder: 500
    },
    {
      id: 'S002',
      name: 'SafetyFirst Corp',
      rating: 4.6,
      location: 'Delhi',
      speciality: 'Safety Equipment',
      verified: true,
      deliveryTime: '1-2 days',
      minOrder: 300
    },
    {
      id: 'S003',
      name: 'ProPlumber Supply',
      rating: 4.7,
      location: 'Chennai',
      speciality: 'Plumbing Tools',
      verified: true,
      deliveryTime: '3-4 days',
      minOrder: 750
    }
  ];

  const workerBenefits = [
    {
      title: 'Special Worker Pricing',
      description: 'Get up to 30% discount on professional tools',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Fast Delivery',
      description: 'Same-day delivery for urgent tool needs',
      icon: Truck,
      color: 'text-blue-500'
    },
    {
      title: 'Quality Guarantee',
      description: '1-year warranty on all professional tools',
      icon: Shield,
      color: 'text-purple-500'
    },
    {
      title: 'Bulk Ordering',
      description: 'Special rates for bulk purchases',
      icon: Package,
      color: 'text-orange-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 hover:bg-green-600';
      case 'In Transit':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Processing':
        return 'bg-orange-500 hover:bg-orange-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Rental Equipment Data
  const rentalEquipment = [
    {
      id: 'R001',
      name: 'Professional Excavator',
      category: 'Heavy Machinery',
      brand: 'CAT 320D',
      dailyRate: 2500,
      weeklyRate: 15000,
      monthlyRate: 50000,
      hourlyRate: 350,
      rating: 4.8,
      reviews: 156,
      availability: 'Available',
      location: 'Delhi NCR',
      fuel: 'Included',
      operator: 'Optional',
      image: 'excavator.jpg',
      description: 'High-performance excavator for construction work',
      specs: ['20-ton capacity', 'GPS enabled', 'Fuel efficient'],
      insuranceIncluded: true,
      deliveryAvailable: true,
      minRentalPeriod: '4 hours'
    },
    {
      id: 'R002',
      name: 'Concrete Mixer',
      category: 'Construction Equipment',
      brand: 'Schwing Stetter',
      dailyRate: 800,
      weeklyRate: 4500,
      monthlyRate: 15000,
      hourlyRate: 120,
      rating: 4.6,
      reviews: 89,
      availability: 'Available',
      location: 'Mumbai',
      fuel: 'Extra',
      operator: 'Not Required',
      image: 'concrete-mixer.jpg',
      description: 'Mobile concrete mixer for on-site mixing',
      specs: ['500L capacity', 'Electric/Diesel', 'Easy transport'],
      insuranceIncluded: true,
      deliveryAvailable: true,
      minRentalPeriod: '1 day'
    },
    {
      id: 'R003',
      name: 'Scaffolding System',
      category: 'Safety Equipment',
      brand: 'PERI UP',
      dailyRate: 150,
      weeklyRate: 900,
      monthlyRate: 3200,
      hourlyRate: 25,
      rating: 4.7,
      reviews: 234,
      availability: 'Available',
      location: 'Bangalore',
      fuel: 'N/A',
      operator: 'Not Required',
      image: 'scaffolding.jpg',
      description: 'Modular scaffolding system for height work',
      specs: ['Modular design', 'Easy assembly', 'Safety certified'],
      insuranceIncluded: true,
      deliveryAvailable: true,
      minRentalPeriod: '1 week'
    },
    {
      id: 'R004',
      name: 'Welding Machine',
      category: 'Power Tools',
      brand: 'ESAB Buddy Arc',
      dailyRate: 300,
      weeklyRate: 1800,
      monthlyRate: 6500,
      hourlyRate: 50,
      rating: 4.9,
      reviews: 67,
      availability: 'Rented',
      location: 'Chennai',
      fuel: 'Electric',
      operator: 'Not Required',
      image: 'welding-machine.jpg',
      description: 'Professional welding machine for metal work',
      specs: ['AC/DC capability', 'Digital display', 'Portable'],
      insuranceIncluded: true,
      deliveryAvailable: false,
      minRentalPeriod: '4 hours'
    },
    {
      id: 'R005',
      name: 'Mobile Crane',
      category: 'Heavy Machinery',
      brand: 'Tadano GR-600XL',
      dailyRate: 5000,
      weeklyRate: 30000,
      monthlyRate: 120000,
      hourlyRate: 750,
      rating: 4.8,
      reviews: 45,
      availability: 'Available',
      location: 'Pune',
      fuel: 'Included',
      operator: 'Required',
      image: 'mobile-crane.jpg',
      description: 'Mobile crane for lifting heavy materials',
      specs: ['60-ton capacity', 'Telescopic boom', 'All-terrain'],
      insuranceIncluded: true,
      deliveryAvailable: true,
      minRentalPeriod: '1 day'
    },
    {
      id: 'R006',
      name: 'Generator Set',
      category: 'Power Equipment',
      brand: 'Kirloskar 125 KVA',
      dailyRate: 1200,
      weeklyRate: 7000,
      monthlyRate: 25000,
      hourlyRate: 180,
      rating: 4.5,
      reviews: 123,
      availability: 'Available',
      location: 'Hyderabad',
      fuel: 'Extra',
      operator: 'Not Required',
      image: 'generator.jpg',
      description: 'Diesel generator for power backup',
      specs: ['125 KVA output', 'Automatic start', 'Sound proof'],
      insuranceIncluded: true,
      deliveryAvailable: true,
      minRentalPeriod: '1 day'
    }
  ];

  const myRentals = [
    {
      id: 'MR001',
      equipmentName: 'Concrete Mixer',
      rentalPeriod: '5 days',
      startDate: '2024-01-18',
      endDate: '2024-01-23',
      totalCost: 4000,
      status: 'Active',
      location: 'Site A - Sector 15',
      dailyRate: 800,
      securityDeposit: 5000,
      returnCondition: 'Good'
    },
    {
      id: 'MR002',
      equipmentName: 'Scaffolding System',
      rentalPeriod: '2 weeks',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      totalCost: 1800,
      status: 'Completed',
      location: 'Site B - MG Road',
      dailyRate: 150,
      securityDeposit: 2000,
      returnCondition: 'Excellent'
    },
    {
      id: 'MR003',
      equipmentName: 'Welding Machine',
      rentalPeriod: '3 days',
      startDate: '2024-01-25',
      endDate: '2024-01-28',
      totalCost: 900,
      status: 'Upcoming',
      location: 'Site C - Connaught Place',
      dailyRate: 300,
      securityDeposit: 1500,
      returnCondition: 'Pending'
    }
  ];

  const rentalCategories = [
    { id: 'heavy', name: 'Heavy Machinery', icon: Truck, count: 25, color: 'text-red-600' },
    { id: 'construction', name: 'Construction Equipment', icon: HardHat, count: 45, color: 'text-orange-600' },
    { id: 'power', name: 'Power Tools', icon: Zap, count: 67, color: 'text-yellow-600' },
    { id: 'safety', name: 'Safety Equipment', icon: Shield, count: 34, color: 'text-green-600' },
    { id: 'electrical', name: 'Electrical Equipment', icon: Zap, count: 23, color: 'text-blue-600' },
    { id: 'measuring', name: 'Measuring Tools', icon: Settings, count: 18, color: 'text-purple-600' }
  ];

  const addToCart = (product: any) => {
    // Cart functionality placeholder
    console.log('Added to cart:', product);
  };

  const rentEquipment = (equipment: any, duration: string) => {
    console.log('Renting equipment:', equipment, 'for', duration);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-500 hover:bg-green-600';
      case 'Rented':
        return 'bg-red-500 hover:bg-red-600';
      case 'Maintenance':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getRentalStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 hover:bg-green-600';
      case 'Completed':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Upcoming':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'Cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Worker E-Commerce</h2>
        <p className="text-muted-foreground">Professional tools and equipment at special worker prices</p>
      </div>

      {/* Worker Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {workerBenefits.map((benefit, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="recommendations">For You</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for tools, equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.slice(1).map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.count} items</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="font-medium mb-4">Featured Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                      {product.workerPrice && (
                        <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                          Worker Price
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute bottom-2 right-2"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          disabled={!product.inStock}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {product.fastDelivery && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          Fast delivery available
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-6">
          {/* Rental Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Rentals</p>
                    <p className="text-2xl font-semibold text-green-600">
                      {myRentals.filter(r => r.status === 'Active').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      ₹{myRentals.reduce((sum, r) => sum + r.totalCost, 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Equipment Types</p>
                    <p className="text-2xl font-semibold text-purple-600">
                      {new Set(myRentals.map(r => r.equipmentName)).size}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-semibold text-orange-600">
                      {myRentals.filter(r => r.status === 'Upcoming').length}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rental Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Categories</CardTitle>
              <p className="text-sm text-muted-foreground">Browse equipment by category</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {rentalCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Card key={cat.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Icon className={`h-6 w-6 ${cat.color}`} />
                        </div>
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{cat.count} items</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters for Rentals */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search rental equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {rentalCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Equipment for Rent */}
          <div>
            <h3 className="font-medium mb-4">Available Equipment for Rent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentalEquipment.map((equipment) => (
                <Card key={equipment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                      <Badge className={`absolute top-2 left-2 ${getAvailabilityColor(equipment.availability)}`}>
                        {equipment.availability}
                      </Badge>
                      {equipment.insuranceIncluded && (
                        <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600">
                          <Shield className="h-3 w-3 mr-1" />
                          Insured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">{equipment.name}</h4>
                        <p className="text-sm text-muted-foreground">{equipment.brand} • {equipment.category}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{equipment.rating}</span>
                        <span className="text-xs text-muted-foreground">({equipment.reviews} reviews)</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Hourly:</span>
                          <span className="font-medium">₹{equipment.hourlyRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Daily:</span>
                          <span className="font-medium">₹{equipment.dailyRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Weekly:</span>
                          <span className="font-medium">₹{equipment.weeklyRate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Monthly:</span>
                          <span className="font-medium text-green-600">₹{equipment.monthlyRate}</span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3 space-y-2 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>{equipment.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Min Period:</span>
                          <span>{equipment.minRentalPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel:</span>
                          <span>{equipment.fuel}</span>
                        </div>
                        {equipment.operator === 'Required' && (
                          <div className="flex justify-between">
                            <span>Operator:</span>
                            <span className="text-orange-600">Required</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          disabled={equipment.availability !== 'Available'}
                          onClick={() => rentEquipment(equipment, 'daily')}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {equipment.availability === 'Available' ? 'Rent Now' : 'Not Available'}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {equipment.deliveryAvailable && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Truck className="h-3 w-3" />
                          Free delivery available
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* My Rental History */}
          <Card>
            <CardHeader>
              <CardTitle>My Rental History</CardTitle>
              <p className="text-sm text-muted-foreground">Track your current and past equipment rentals</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myRentals.map((rental) => (
                  <Card key={rental.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium">{rental.equipmentName}</h4>
                          <p className="text-sm text-muted-foreground">Rental ID: {rental.id}</p>
                        </div>
                        <Badge className={getRentalStatusColor(rental.status)}>
                          {rental.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Duration</p>
                          <p className="font-medium">{rental.rentalPeriod}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p className="font-medium">{rental.startDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">End Date</p>
                          <p className="font-medium">{rental.endDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Cost</p>
                          <p className="font-medium text-green-600">₹{rental.totalCost}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{rental.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Daily Rate</p>
                          <p className="font-medium">₹{rental.dailyRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Security Deposit</p>
                          <p className="font-medium">₹{rental.securityDeposit}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm">
                          {rental.status === 'Active' && (
                            <span className="text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Currently in use
                            </span>
                          )}
                          {rental.status === 'Completed' && (
                            <span className="text-blue-600 flex items-center gap-1">
                              <RotateCcw className="h-4 w-4" />
                              Returned - {rental.returnCondition} condition
                            </span>
                          )}
                          {rental.status === 'Upcoming' && (
                            <span className="text-orange-600 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Starts in 3 days
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {rental.status === 'Active' && (
                            <>
                              <Button variant="outline" size="sm">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Report Issue
                              </Button>
                              <Button variant="outline" size="sm">
                                <Clock className="h-4 w-4 mr-2" />
                                Extend Rental
                              </Button>
                            </>
                          )}
                          {rental.status === 'Upcoming' && (
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4 mr-2" />
                              Modify Booking
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Rent Again
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rental Benefits & Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Rental Benefits for Workers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <Shield className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Insurance Covered</h4>
                    <p className="text-sm text-muted-foreground">All equipment comes with comprehensive insurance coverage</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <Truck className="h-6 w-6 text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-muted-foreground">Equipment delivered to your work site at no extra cost</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <Clock className="h-6 w-6 text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">Round-the-clock technical support and maintenance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="space-y-4">
            {myOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium mb-2">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div>
                        {order.status === 'Delivered' ? (
                          <span className="text-green-600">
                            Delivered on {order.actualDelivery}
                          </span>
                        ) : (
                          <span>
                            Expected delivery: {order.estimatedDelivery}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {order.tracking && (
                          <Button variant="outline" size="sm">
                            Track Order
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-6">
            {recommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    {rec.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rec.products.map((product, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h4 className="font-medium">{product}</h4>
                        <div className="flex items-center gap-1 my-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">4.5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">₹{Math.floor(Math.random() * 1000) + 500}</span>
                          <Button size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          {supplier.name}
                          {supplier.verified && (
                            <Badge className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{supplier.speciality}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{supplier.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{supplier.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Delivery Time</p>
                      <p className="font-medium">{supplier.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min Order</p>
                      <p className="font-medium">₹{supplier.minOrder}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {supplier.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">View Catalog</Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          {/* Special Deals */}
          <Card className="border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Worker Special - Limited Time</h3>
                  <p className="text-sm text-muted-foreground">Exclusive deals for verified workers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-white">
                  <h4 className="font-medium">Tool Bundle</h4>
                  <p className="text-2xl font-bold text-orange-600">₹2,999</p>
                  <p className="text-sm text-muted-foreground line-through">₹4,499</p>
                  <Badge className="mt-2 bg-orange-500 hover:bg-orange-600">33% OFF</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg bg-white">
                  <h4 className="font-medium">Safety Kit</h4>
                  <p className="text-2xl font-bold text-orange-600">₹1,499</p>
                  <p className="text-sm text-muted-foreground line-through">₹2,299</p>
                  <Badge className="mt-2 bg-orange-500 hover:bg-orange-600">35% OFF</Badge>
                </div>
                
                <div className="text-center p-4 border rounded-lg bg-white">
                  <h4 className="font-medium">Power Tools</h4>
                  <p className="text-2xl font-bold text-orange-600">₹5,999</p>
                  <p className="text-sm text-muted-foreground line-through">₹8,999</p>
                  <Badge className="mt-2 bg-orange-500 hover:bg-orange-600">33% OFF</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flash Sale */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-red-500" />
                Flash Sale - Ends in 2 hours!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: 'Cordless Drill', price: 1799, original: 2599, discount: 31 },
                  { name: 'Safety Boots', price: 999, original: 1499, discount: 33 },
                  { name: 'LED Work Light', price: 599, original: 899, discount: 33 },
                  { name: 'Tool Box', price: 799, original: 1199, discount: 33 }
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-lg font-bold text-red-600">₹{item.price}</p>
                    <p className="text-xs text-muted-foreground line-through">₹{item.original}</p>
                    <Badge className="mt-2 bg-red-500 hover:bg-red-600">
                      {item.discount}% OFF
                    </Badge>
                    <Button size="sm" className="w-full mt-2">
                      Buy Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bulk Purchase Discounts */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Purchase Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Order ₹5,000+</h4>
                  <p className="text-sm text-muted-foreground">Get 5% extra discount</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Truck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Order ₹10,000+</h4>
                  <p className="text-sm text-muted-foreground">Free shipping + 8% discount</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-medium">Order ₹25,000+</h4>
                  <p className="text-sm text-muted-foreground">12% discount + priority support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
});

ECommercePage.displayName = 'ECommercePage';
export default ECommercePage;