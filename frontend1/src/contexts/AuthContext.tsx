import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Role {
  id: number;
  roleName: string;
}

interface User {
  userId: number;
  email: string;
  username: string;
  roles?: Role[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, email: string, password: string, roleId?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isLoading: boolean;
  fetchRoles: () => Promise<Role[]>;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = () => {
    return user?.roles?.some(role => role.roleName === 'ADMIN') || false;
  };

  const isInstructor = () => {
    return user?.roles?.some(role => role.roleName === 'INSTRUCTOR') || false;
  };

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          // Clear corrupted data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);

      const response = await fetch('http://localhost:8085/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Get the raw response text first
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      console.log('Response text length:', responseText.length);

      if (!response.ok) {
        console.error('Request failed with status:', response.status);
        console.error('Response text:', responseText);

        let errorMessage = 'Login failed';

        // Try to parse as JSON only if it looks like JSON
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse error response as JSON:', parseError);
            errorMessage = responseText || errorMessage;
          }
        } else {
          errorMessage = responseText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed response data:", data);
      } catch (parseError) {
        console.error('Failed to parse successful response as JSON:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error('Server returned invalid JSON response');
      }

      if (data.success) {
        const userData: User = {
          userId: data.userId,
          email: data.email,
          username: data.username,
          roles: data.roles,
        };

        console.log('User data to store:', userData);

        setToken(data.token);
        setUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Network error. Please try again.';
      return { success: false, message };
    }
  };

  const register = async (username: string, email: string, password: string, roleId?: string) => {
    try {
      const requestBody: any = { username, email, password,  roleId: roleId ? parseInt(roleId) : null };

      // Add roleId if provided
      if (roleId) {
        requestBody.roleId = parseInt(roleId);
        console.log('Registering with roleId:', requestBody.roleId);
      }

      console.log('Registration request body:', requestBody);

      const response = await fetch('http://localhost:8085/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      console.log('Register response text:', responseText);
      console.log('Register response status:', response.status);

      if (!response.ok) {
        let errorMessage = 'Registration failed';

        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          try {
            const errorData = JSON.parse(responseText);
            errorMessage = errorData.message || errorMessage;
          } catch {
            errorMessage = responseText || errorMessage;
          }
        } else {
          errorMessage = responseText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed register response:', data);
      } catch (parseError) {
        console.error('Failed to parse register response as JSON:', parseError);
        throw new Error('Server returned invalid JSON response');
      }

      if (data.success) {
        const userData: User = {
          userId: data.userId,
          email: data.email,
          username: data.username,
          roles: data.roles,
        };

        console.log('Registration successful, user data:', userData);

        setToken(data.token);
        setUser(userData);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message = error instanceof Error ? error.message : 'Network error. Please try again.';
      return { success: false, message };
    }
  };

  const fetchRoles = async (): Promise<Role[]> => {
    try {
      const response = await fetch("http://localhost:8085/api/roles", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch roles');
      }

      const roles = await response.json();
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Return default roles as fallback
      return [
        { id: 1, roleName: 'USER' },
        { id: 2, roleName: 'ADMIN' }
      ];
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    fetchRoles,
    isAdmin,
    isInstructor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};