import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Phone, Shield, CheckCircle, Star, TrendingUp, Clock, MapPin, Award, Zap, HeartHandshake, ThumbsUp } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomepageProps {
  onNavigate: (page: string) => void;
}

export function Homepage({ onNavigate }: HomepageProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ImageWithFallback 
                src="figma:asset/9e2bbd175b93fb6381c9377c8286952ef7ab87da.png" 
                alt="WORQELY Logo" 
                className="h-8 w-8 mr-3"
              />
              <h1 className="text-2xl text-primary font-bold">WORQELY</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button 
                variant="outline"
                onClick={() => onNavigate('admin-panel')}
                className="hidden sm:inline-flex"
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1622611935038-1c4caa0db5d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzU4MjE5MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080')`
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500 text-black">
                🚀 Smart Platform
              </Badge>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Connect with Skilled Workers
                <span className="block text-yellow-300">Instantly</span>
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                WORQELY revolutionizes how you find skilled workers. Our intelligent platform connects you with verified professionals across 15+ service categories in seconds, available in 12 Indian regional languages.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm">100% Verified Workers</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm">Secure & Safe</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
                  onClick={() => onNavigate('customer-signup')}
                >
                  Find Workers Now
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-3"
                  onClick={() => onNavigate('labor-signup')}
                >
                  Become a Worker
                </Button>
              </div>
            </div>
            

          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands</h3>
            <p className="text-lg text-gray-600">Join our growing community of satisfied customers and skilled workers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25,000+</div>
              <div className="text-gray-600">Verified Workers</div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100,000+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* About WORQELY Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">About WORQELY</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                WORQELY is India's leading intelligent platform that bridges the gap between customers and skilled workers. 
                We leverage cutting-edge technology to ensure instant, reliable connections while maintaining the highest 
                standards of safety and quality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Zap className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Matching</h4>
                    <p className="text-gray-600">Our smart algorithm matches you with the perfect worker in seconds</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">100% Verified</h4>
                    <p className="text-gray-600">All workers undergo thorough Aadhaar verification and background checks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <HeartHandshake className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Trust & Safety</h4>
                    <p className="text-gray-600">Built-in insurance, secure payments, and 24/7 customer support</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1628002580365-f3c0a322d577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2lsbGVkJTIwd29ya2VyJTIwY3JhZnRzbWFuJTIwdG9vbHN8ZW58MXx8fHwxNzU4MjE5MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skilled Worker"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">How WORQELY Works</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get connected with skilled workers in just 3 simple steps. Our intelligent platform makes it seamless and efficient.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-lg font-bold relative z-10">
                1
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1710993012000-f109972e3b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXBwJTIwbW9iaWxlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc1ODIyMjA1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Digital Platform Interface"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Connect Instantly</h4>
              <p className="text-gray-600">
                Simply call or use our platform to describe your service needs. Our system understands you in 12 Indian languages.
              </p>
            </div>
            
            <div className="text-center relative">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-lg font-bold relative z-10">
                2
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
              
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1622611935038-1c4caa0db5d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzU4MjE5MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Get Matched"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Get Instant Matches</h4>
              <p className="text-gray-600">
                Our system instantly matches you with verified workers in your area based on your requirements and budget.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                3
              </div>
              
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1616937507696-6d8713376109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVyJTIwaG9tZSUyMHNlcnZpY2V8ZW58MXx8fHwxNzU4MjE5MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Connect and Complete"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Connect & Complete</h4>
              <p className="text-gray-600">
                Connect directly with workers, schedule your service, and get the job done with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Service Categories</h3>
            <p className="text-lg text-gray-600">Professional services across multiple categories with verified experts</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjE5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Electrical"
                    className="w-16 h-16 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Electrical</h4>
                <p className="text-sm text-gray-600">Wiring, Repairs</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1542632867-261e4be41c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nJTIwcGlwZXMlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MTg1OTI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Plumbing"
                    className="w-16 h-16 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Plumbing</h4>
                <p className="text-sm text-gray-600">Pipes, Installation</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-1">Construction</h4>
                <p className="text-sm text-gray-600">Mason, Labor</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-green-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-1">Painting</h4>
                <p className="text-sm text-gray-600">Interior, Exterior</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-1">Cleaning</h4>
                <p className="text-sm text-gray-600">Deep Clean</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <Users className="h-16 w-16 mx-auto mb-4 text-orange-600 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-gray-900 mb-1">Cooking</h4>
                <p className="text-sm text-gray-600">Chef, Home Cook</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All 15+ Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose WORQELY?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of service booking with our intelligent platform designed for India's diverse workforce
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Smart Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Intelligent platform that understands your needs in 12 Indian languages and connects you with the right workers instantly.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">100% Verified Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  All workers undergo thorough Aadhaar verification, background checks, and skill assessments for your safety and peace of mind.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Fair Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Transparent, competitive pricing with no hidden costs. See upfront rates and choose what works for your budget.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Quick Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Get matched with available workers within minutes. Our system ensures you're connected to professionals ready to work.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  100% satisfaction guarantee with our quality assurance program. Rate workers and get refunds if not satisfied.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base leading-relaxed">
                  Round-the-clock customer support in multiple languages to help you with any queries, issues, or emergencies.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h3>
            <p className="text-lg text-gray-600">Real stories from satisfied customers and successful workers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "WORQELY's platform understood my Hindi perfectly and found me an excellent plumber within 5 minutes. The service was outstanding and the pricing was very fair!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">PS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                    <p className="text-sm text-gray-600">Mumbai, Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "As a worker, WORQELY has transformed my income. I get regular work opportunities, fair payments, and the app is so easy to use. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-semibold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rajesh Kumar</h4>
                    <p className="text-sm text-gray-600">Delhi, Electrician</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The verification process gives me complete confidence. All workers are genuine, skilled, and professional. Best platform for home services in India!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-semibold">AP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Anjali Patel</h4>
                    <p className="text-sm text-gray-600">Bangalore, Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers and skilled workers on India's most trusted service platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
              onClick={() => onNavigate('customer-signup')}
            >
              <Users className="h-5 w-5 mr-2" />
              Find Workers Now
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3"
              onClick={() => onNavigate('labor-signup')}
            >
              <ThumbsUp className="h-5 w-5 mr-2" />
              Become a Worker
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-blue-100 mb-2">Need help? Contact us:</p>
            <p className="text-xl font-semibold">📞 1800-123-WORK (9675)</p>
            <p className="text-sm text-blue-200">Available 24/7 in 12 Indian languages</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <ImageWithFallback 
                  src="figma:asset/9e2bbd175b93fb6381c9377c8286952ef7ab87da.png" 
                  alt="WORQELY Logo" 
                  className="h-8 w-8 mr-3 filter brightness-0 invert"
                />
                <span className="text-xl font-bold">WORQELY</span>
              </div>
              <p className="text-gray-400 mb-4">
                India's first AI-powered platform connecting customers with skilled workers. Safe, verified, and efficient.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  📘
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  🐦
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Workers</a></li>
                <li><a href="#" className="hover:text-white">Service Categories</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Safety Guarantee</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Workers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Join as Worker</a></li>
                <li><a href="#" className="hover:text-white">Worker Benefits</a></li>
                <li><a href="#" className="hover:text-white">Training Programs</a></li>
                <li><a href="#" className="hover:text-white">Insurance Coverage</a></li>
                <li><a href="#" className="hover:text-white">Premium Membership</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Report Issue</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 WORQELY. All rights reserved. | Made with ❤️ in India</p>
            <p className="mt-2 text-sm">Connecting India's workforce through technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}