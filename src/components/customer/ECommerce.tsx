import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  ShoppingCart,
  Search,
  Filter,
  Star,
  Plus,
  Minus,
  Heart,
  Truck,
  Shield
} from 'lucide-react';
import { User as UserType } from '../../App';

interface ECommerceProps {
  user: UserType;
}

// Mock product data
const mockProducts = [
  {
    id: 'P001',
    name: 'Premium Paint Brush Set',
    category: 'Painting',
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 234,
    image: '🖌️',
    inStock: true,
    description: 'Professional quality paint brushes for all types of painting work',
    features: ['Different sizes included', 'Durable bristles', '2 year warranty']
  },
  {
    id: 'P002',
    name: 'Work Safety Gloves',
    category: 'Safety',
    price: 149,
    originalPrice: 199,
    rating: 4.3,
    reviews: 189,
    image: '🧤',
    inStock: true,
    description: 'Heavy-duty work gloves for construction and repair work',
    features: ['Cut resistant', 'Non-slip grip', 'Comfortable fit']
  },
  {
    id: 'P003',
    name: 'Measuring Tape - 5M',
    category: 'Tools',
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviews: 456,
    image: '📏',
    inStock: true,
    description: 'Accurate 5-meter measuring tape for precise measurements',
    features: ['Auto-lock feature', 'Durable case', 'Clear markings']
  },
  {
    id: 'P004',
    name: 'Electric Drill Set',
    category: 'Tools',
    price: 1299,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 123,
    image: '🔧',
    inStock: false,
    description: 'Complete electric drill set with multiple bits',
    features: ['Variable speed', '20 drill bits included', '1 year warranty']
  },
  {
    id: 'P005',
    name: 'Tile Adhesive - 20kg',
    category: 'Construction',
    price: 450,
    originalPrice: 500,
    rating: 4.4,
    reviews: 89,
    image: '🏗️',
    inStock: true,
    description: 'High-quality tile adhesive for ceramic and stone tiles',
    features: ['Weather resistant', 'Quick setting', 'Professional grade']
  },
  {
    id: 'P006',
    name: 'LED Work Light',
    category: 'Lighting',
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 167,
    image: '💡',
    inStock: true,
    description: 'Bright LED work light for construction and repair work',
    features: ['Rechargeable battery', 'Adjustable stand', 'IP65 waterproof']
  }
];

const categories = ['All', 'Tools', 'Painting', 'Safety', 'Construction', 'Lighting', 'Plumbing', 'Electrical'];

export function ECommerce({ user }: ECommerceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = mockProducts.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>E-Commerce Store</CardTitle>
              <CardDescription>Shop for tools and materials for your projects</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              {getCartItemCount() > 0 && (
                <Button variant="outline">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getCartItemCount()}) - ₹{getCartTotal()}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Product Image */}
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{product.image}</div>
                <Badge className={product.category === 'Tools' ? 'bg-blue-500' : 
                                product.category === 'Safety' ? 'bg-red-500' : 'bg-green-500'}>
                  {product.category}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <ul className="text-xs text-muted-foreground space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  {product.inStock ? (
                    <Badge className="bg-green-500">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Truck className="h-3 w-3 mr-1" />
                    Free Delivery
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  {cart[product.id] ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">{cart[product.id]}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => addToCart(product.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleWishlist(product.id)}
                    className={wishlist.includes(product.id) ? 'text-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">On orders above ₹500</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">All products are genuine</p>
            </div>
            <div className="flex flex-col items-center">
              <ShoppingCart className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-medium">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">7-day return policy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}