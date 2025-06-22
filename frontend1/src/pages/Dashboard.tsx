import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Mail, RefreshCw, AlertCircle, Settings, UserCircle, Users, Award } from 'lucide-react';

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
      console.log('Fetching instructors from:', 'http://localhost:8085/api/users/instructors');
      console.log('Using token:', token ? 'Token present' : 'No token');

      const response = await fetch('http://localhost:8085/api/users/instructors', {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Profile Dashboard</h1>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="text-center">
                    {/* Profile Avatar */}
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <UserCircle className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {user?.username || 'User'}
                    </h2>
                    <p className="text-gray-600 mb-4">{user?.email}</p>

                    {/* Roles */}
                    {user?.roles && user.roles.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">Roles</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {user.roles.map((role, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  <Award className="h-3 w-3 mr-1" />
                                  {role.roleName || 'User'}
                                </Badge>
                            ))}
                          </div>
                        </div>
                    )}

                    {/* User Details */}
                    <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                          <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">User ID</p>
                          <p className="text-sm font-medium text-gray-900">{user?.userId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6 bg-white shadow-lg border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Instructors</span>
                    <span className="text-2xl font-bold text-blue-600">{instructors.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Sessions</span>
                    <span className="text-2xl font-bold text-green-600">1</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Section */}
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Welcome back, {user?.username}!
                      </h3>
                      <p className="text-blue-100">
                        Here's what's happening with your account today.
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <UserCircle className="h-16 w-16 text-blue-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructors Section */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="border-b bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center text-xl">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        Instructors Directory
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Manage and view all platform instructors
                      </CardDescription>
                    </div>
                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        size="sm"
                        disabled={loading}
                        className="bg-white"
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <RefreshCw className="h-8 w-8 animate-spin mr-3 text-blue-600" />
                        <span className="text-gray-600">Loading instructors...</span>
                      </div>
                  ) : error ? (
                      <div className="flex items-center justify-center py-12 text-red-600 bg-red-50 rounded-lg">
                        <AlertCircle className="h-6 w-6 mr-3" />
                        <span>{error}</span>
                      </div>
                  ) : instructors.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No instructors yet</h3>
                        <p className="text-gray-500 mb-4">
                          Start by adding some instructors to see them here.
                        </p>
                        <Button variant="default" size="sm">
                          <User className="h-4 w-4 mr-2" />
                          Add Instructor
                        </Button>
                      </div>
                  ) : (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {instructors.map((inst) => (
                              <div
                                  key={inst.id}
                                  className="group p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md hover:border-blue-200 transition-all duration-200"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <User className="h-5 w-5 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-semibold text-gray-900 truncate">
                                        {inst.name}
                                      </h4>
                                      <Badge variant="secondary" className="text-xs">
                                        #{inst.id}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                                      <Mail className="h-3 w-3" />
                                      <span className="truncate">{inst.email}</span>
                                    </div>
                                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      <Award className="h-3 w-3 mr-1" />
                                      {inst.specialization}
                                    </div>
                                    {inst.user && (
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                          <p className="text-xs text-gray-500">
                                            Linked to: <span className="font-medium">{inst.user.username}</span>
                                          </p>
                                        </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">
                          Showing {instructors.length} instructor{instructors.length !== 1 ? 's' : ''}
                        </span>
                            <Button variant="ghost" size="sm">
                              View All
                            </Button>
                          </div>
                        </div>
                      </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;