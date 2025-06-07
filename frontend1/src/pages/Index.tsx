
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Book, Users, BookOpen, Calendar } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Book className="h-16 w-16 mx-auto mb-6 text-blue-600"/>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            LearnHub E-Learning Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, learn, and grow with our comprehensive e-learning platform.
            Connect with expert instructors and fellow learners in an interactive environment.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Book className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold mb-2">50+ Courses</h3>
              <p className="text-gray-600">From beginner to advanced levels</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-bold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Hands-on projects and assessments</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Book className="h-8 w-8 text-blue-600 mb-2"/>
              <CardTitle>Comprehensive Courses</CardTitle>
              <CardDescription>
                Wide range of courses across multiple disciplines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Frontend & Backend Development</li>
                <li>• Database Design & Management</li>
                <li>• Full-stack Technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-green-600 mb-2"/>
              <CardTitle>Expert Instructors</CardTitle>
              <CardDescription>
                Learn from experienced industry professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Verified industry experience</li>
                <li>• Personalized learning paths</li>
                <li>• Direct instructor feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-purple-600 mb-2"/>
              <CardTitle>Flexible Learning</CardTitle>
              <CardDescription>
                Learn at your own pace with flexible schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Self-paced learning modules</li>
                <li>• Progress tracking</li>
                <li>• Mobile-friendly platform</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            {!user ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to start learning?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Join thousands of learners and start your educational journey today.
                    Create an account to access courses and track your progress.
                  </p>
                  <div className="space-x-4">
                    <Link to="/auth">
                      <Button size="lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/courses">
                      <Button variant="outline" size="lg">
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                </>
            ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome back, {user.username}!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Continue your learning journey or explore new courses to expand your skills.
                  </p>
                  <div className="space-x-4">
                    <Link to="/student-dashboard">
                      <Button size="lg">
                        <BookOpen className="h-5 w-5 mr-2" />
                        My Learning
                      </Button>
                    </Link>
                    <Link to="/courses">
                      <Button variant="outline" size="lg">
                        <Book className="h-5 w-5 mr-2" />
                        Browse Courses
                      </Button>
                    </Link>
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
