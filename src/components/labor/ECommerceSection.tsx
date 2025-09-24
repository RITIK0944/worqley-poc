import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ShoppingCart, 
  Package, 
  Wrench, 
  ShieldCheck, 
  Coffee,
  Star,
  Plus,
  TruckIcon
} from 'lucide-react';


interface ECommerceSectionProps {
  user: any;
  onNavigate?: (page: string) => void;
}

export const ECommerceSection = React.memo(({ user, onNavigate }: ECommerceSectionProps) => {
  const [cart, setCart] = useState<any[]>([]);

  const products = [
    {
      id: 'drill-1',
      name: 'Heavy Duty Drill Machine',
      category: 'tools',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbCUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NTg2MzQyMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Professional grade drill machine suitable for construction work',
      rating: 4.5,
      reviews: 124
    },
    {
      id: 'hammer-1',
      name: 'Steel Claw Hammer',
      category: 'tools',
      price: 450,
      image: 'https://images.unsplash.com/photo-1758286714875-4a6db5b385f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb25zdHJ1Y3Rpb24lMjBoYW1tZXIlMjB0b29sfGVufDF8fHx8MTc1ODcyNTY4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Durable steel hammer for construction and repair work',
      rating: 4.7,
      reviews: 89
    },
    {
      id: 'helmet-1',
      name: 'Safety Hard Hat',
      category: 'safety',
      price: 280,
      image: 'https://images.unsplash.com/photo-1746182970559-534fb39367ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoYXJkJTIwaGF0JTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1ODcyNTcwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'ANSI approved safety helmet for construction sites',
      rating: 4.8,
      reviews: 245
    },
    {
      id: 'gloves-1',
      name: 'Work Safety Gloves',
      category: 'safety',
      price: 120,
      image: 'https://images.unsplash.com/photo-1585417238564-fcdf0b69535f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrJTIwc2FmZXR5JTIwZ2xvdmVzfGVufDF8fHx8MTc1ODcyNTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Cut-resistant work gloves for hand protection',
      rating: 4.5,
      reviews: 187
    },
    {
      id: 'water-bottle',
      name: 'Insulated Water Bottle',
      category: 'essentials',
      price: 350,
      image: 'https://images.unsplash.com/photo-1683959553163-effca29b546e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMGluc3VsYXRlZHxlbnwxfHx8fDE3NTg3MjU4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Keep water cool during long work hours',
      rating: 4.4,
      reviews: 87
    },
    {
      id: 'lunch-box',
      name: 'Stainless Steel Lunch Box',
      category: 'essentials',
      price: 450,
      image: 'https://images.unsplash.com/photo-1728034261731-b45e71059f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdGFpbmxlc3MlMjBzdGVlbCUyMGx1bmNoJTIwYm94fGVufDF8fHx8MTc1ODcyNTgwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'Durable lunch box for daily meals',
      rating: 4.6,
      reviews: 134
    }
  ];

  const categories = [
    { id: 'tools', name: 'Tools', icon: Wrench },
    { id: 'safety', name: 'Safety Gear', icon: ShieldCheck },
    { id: 'essentials', name: 'Daily Essentials', icon: Coffee }
  ];

  const [selectedCategory, setSelectedCategory] = useState('tools');

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const orderHistory = [
    {
      id: 'order-1',
      date: '2024-12-15',
      items: 3,
      total: 1250,
      status: 'delivered'
    },
    {
      id: 'order-2', 
      date: '2024-12-20',
      items: 1,
      total: 450,
      status: 'in-transit'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>E-Commerce</h2>
          <p className="text-muted-foreground">Tools, safety gear, and daily essentials for workers</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1">
        {categories.map(category => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <Card key={product.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              
              <h4 className="mb-1">{product.name}</h4>
              
              <p className="text-sm text-muted-foreground mb-2">
                {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg">₹{product.price}</span>
                <Button
                  size="sm"
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart Summary ({cart.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</span>
              <Button className="bg-green-600 hover:bg-green-700">
                <TruckIcon className="h-4 w-4 mr-2" />
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderHistory.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p>Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p>₹{order.total}</p>
                  <Badge
                    variant={order.status === 'delivered' ? 'default' : 'secondary'}
                    className={order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});