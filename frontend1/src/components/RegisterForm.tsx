import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff } from 'lucide-react';

interface Role {
  id: number;
  roleName: string;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, fetchRoles } = useAuth();
  const { toast } = useToast();

  // Fetch available roles on component mount
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await fetchRoles();
        setAvailableRoles(roles);
        // Just set the first role as default without forcing USER
        if (roles.length > 0) {
          setSelectedRole(roles[0].id.toString());
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
        setAvailableRoles([
          { id: 1, roleName: 'USER' },
          { id: 2, roleName: 'ADMIN' }
        ]);
        setSelectedRole('1');
      }
    };

    loadRoles();
  }, []);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-z0-9+_.-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    return username.length >= 5 && username.length <= 50 && usernameRegex.test(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    console.log('Selected Role ID:', selectedRole);
    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Required",
        description: "Please select a role",
      });
      return;
    }
    // Validation checks
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Email must be lowercase and from gmail.com, yahoo.com, outlook.com, or hotmail.com",
      });
      return;
    }

    if (!validateUsername(username)) {
      toast({
        variant: "destructive",
        title: "Invalid Username",
        description: "Username must be 5-50 characters and contain only letters, numbers, dots, underscores, and hyphens",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be 6-16 characters with at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
      });
      return;
    }

    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Required",
        description: "Please select a role.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(username, email, password, selectedRole);

      if (result.success) {
        toast({
          title: "Success",
          description: "Account created successfully! You are now logged in.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.message || "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An error occurred. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a username (5-50 characters)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                  placeholder="your.email@gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id.toString()}>
                        {role.roleName}
                      </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    placeholder="6-16 chars with upper, lower, digit, special"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Button variant="link" onClick={onSwitchToLogin} className="p-0">
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
  );
};

export default RegisterForm;