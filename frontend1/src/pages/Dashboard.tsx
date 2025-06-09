import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Mail, RefreshCw, AlertCircle } from 'lucide-react';

interface Instructor {
  id: number;
  name: string;
  email: string;
  specialization: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, logout, token } = useAuth();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructors = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching instructors from:', 'http://localhost:8085/api/instructors');
      console.log('Using token:', token ? 'Token present' : 'No token');

      const response = await fetch('http://localhost:8085/api/instructors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.text();
          console.log('Error response body:', errorData);
          errorMessage += ` - ${errorData}`;
        } catch (e) {
          console.log('Could not read error response body');
        }

        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (response.status === 403) {
          throw new Error('You do not have permission to view instructors.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please check your backend logs and database connection.');
        } else {
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();
      console.log('Received data:', data);
      setInstructors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInstructors();
    } else {
      setLoading(false);
      setError('No authentication token found. Please login again.');
    }
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  const handleRefresh = () => {
    fetchInstructors();
  };

  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Welcome back, {user?.username}!
                </CardTitle>
                <CardDescription>Here's your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">User ID:</span>
                  <span className="font-medium">{user?.userId}</span>
                </div>
                {user?.roles && user.roles.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Roles:</span>
                      <div className="flex space-x-1">
                        {user.roles.map((role, index) => (
                            <Badge key={index} variant="secondary">
                              {role.roleName || 'User'}
                            </Badge>
                        ))}
                      </div>
                    </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Instructors</CardTitle>
                    <CardDescription>List of all instructors in the platform.</CardDescription>
                  </div>
                  <Button
                      onClick={handleRefresh}
                      variant="outline"
                      size="sm"
                      disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <RefreshCw className="h-6 w-6 animate-spin mr-2" />
                      <span className="text-sm text-gray-500">Loading instructors...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-8 text-red-600">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span className="text-sm">{error}</span>
                    </div>
                ) : instructors.length === 0 ? (
                    <div className="text-center py-8">
                      <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500">No instructors found.</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Add some instructors to see them here.
                      </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                      {instructors.map((inst) => (
                          <div
                              key={inst.id}
                              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium text-gray-800">{inst.name}</p>
                                  <Badge variant="outline" className="text-xs">
                                    ID: {inst.id}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                  <Mail className="h-3 w-3" />
                                  <span>{inst.email}</span>
                                </div>
                                <p className="text-sm text-blue-600 font-medium">
                                  {inst.specialization}
                                </p>
                                {inst.user && (
                                    <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
                                      <span>Linked to user: {inst.user.username} (ID: {inst.user.id})</span>
                                    </div>
                                )}
                              </div>
                            </div>
                          </div>
                      ))}
                      <div className="text-center pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          Total instructors: {instructors.length}
                        </p>
                      </div>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;