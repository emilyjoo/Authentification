import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: "Success",
          description: "You have been logged in successfully!",
        });

        // Get the updated user data from localStorage after successful login
        const userDataString = localStorage.getItem('user');
        console.log('Stored user data string:', userDataString);

        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString);
            console.log('Parsed user data:', userData);
            console.log('User roles:', userData.roles);

            // Check user role and redirect accordingly
            // Note: Your backend uses 'roleName' field, not 'name'
            const isAdmin = userData.roles?.some((role: any) => {
              console.log('Checking role:', role);
              // Check for different possible role name formats
              return role.roleName === 'ADMIN' ||
                  role.roleName === 'admin' ||
                  role.name === 'ADMIN' ||
                  role.name === 'admin';
            });

            console.log('Is admin:', isAdmin);

            if (isAdmin) {
              console.log('Redirecting to instructor dashboard');
              navigate('/instructor-dashboard');
            } else {
              console.log('Redirecting to student dashboard');
              navigate('/student-dashboard');
            }
          } catch (parseError) {
            console.error('Error parsing user data from localStorage:', parseError);
            // Fallback - redirect to student dashboard if we can't parse the data
            navigate('/student-dashboard');
          }
        } else {
          console.warn('No user data found in localStorage');
          // Fallback - redirect to student dashboard
          navigate('/student-dashboard');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.message || "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      console.error('Login form error:', error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Button variant="link" onClick={onSwitchToRegister} className="p-0">
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
  );
};

export default LoginForm;