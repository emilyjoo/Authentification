
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Shield, UserPlus, LogIn, Layout } from "lucide-react";

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Auth Spring Primer</h1>
          <div className="flex space-x-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline">
                    <Layout className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={logout} variant="secondary">
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-600" />
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Full-Stack Authentication
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete authentication system built with React and Spring Boot, 
            featuring JWT tokens, secure login/registration, and protected routes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Secure Authentication</CardTitle>
              <CardDescription>
                JWT-based authentication with Spring Security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• BCrypt password hashing</li>
                <li>• JWT token validation</li>
                <li>• Secure CORS configuration</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <UserPlus className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Complete user registration and login system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• User registration with validation</li>
                <li>• Email uniqueness checks</li>
                <li>• Role-based access control</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Layout className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Modern Frontend</CardTitle>
              <CardDescription>
                React with TypeScript and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Responsive design</li>
                <li>• Protected routes</li>
                <li>• Toast notifications</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6">
                Create an account or sign in to explore the dashboard and see the authentication system in action.
              </p>
              <Link to="/auth">
                <Button size="lg" className="mr-4">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Sign Up
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        {user && (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome back, {user.username}!
              </h3>
              <p className="text-gray-600 mb-6">
                You're successfully authenticated. Check out your dashboard to see your account details.
              </p>
              <Link to="/dashboard">
                <Button size="lg">
                  <Layout className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
