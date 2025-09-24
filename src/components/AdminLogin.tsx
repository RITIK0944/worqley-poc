import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from './AppLayout';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from './LanguageContext';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
  onLogin: (user: UserType) => void;
}

// Mock admin data for demonstration
const mockAdmins = [
  {
    id: 'admin1',
    fullName: 'Admin User',
    email: 'admin@worqley.com',
    password: 'admin123',
    mobile: '9999999999',
    type: 'admin' as const
  },
  {
    id: 'admin2', 
    fullName: 'Super Admin',
    email: 'superadmin@worqley.com',
    password: 'superadmin123',
    mobile: '9999999998',
    type: 'admin' as const
  }
];

function AdminLogin({ onNavigate, onLogin }: AdminLoginProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call with enhanced security check
    setTimeout(() => {
      const admin = mockAdmins.find(
        a => a.email === formData.email && a.password === formData.password
      );

      if (admin) {
        const { password, ...userWithoutPassword } = admin;
        onLogin(userWithoutPassword);
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setLoading(false);
    }, 1500); // Slightly longer for security feel
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('login-selection')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
          <LanguageSelector variant="compact" />
        </div>

        <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <Shield className="h-8 w-8 text-red-400" />
            </div>
            <CardTitle className="text-white">Administrator Access</CardTitle>
            <CardDescription className="text-gray-300">
              Authorized personnel only. All access is monitored and logged.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter admin email"
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter admin password"
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded border border-red-500/20">
                  {error}
                </p>
              )}

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white" 
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Admin Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 mb-2">
                ⚠️ Unauthorized access is prohibited and will be prosecuted
              </p>
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300 mb-2">Demo Admin Credentials:</p>
              <p className="text-xs text-gray-400">Email: admin@worqley.com</p>
              <p className="text-xs text-gray-400">Password: admin123</p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            WORQLEY Admin Portal - Secure Access Required
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;