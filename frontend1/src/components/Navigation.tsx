import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Book, Users, User, BookOpen, Plus, UserPlus } from 'lucide-react';

const Navigation: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();


    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            LearnHub
                        </Link>
<div className="hidden md:flex space-x-6">
    <Link
        to="/courses"
        className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive('/courses')
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }`}
    >
        <Book className="h-4 w-4" />
        <span>Courses</span>
    </Link>

    {user && (
        <>
            <Link
                to="/student-dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/student-dashboard')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
                <BookOpen className="h-4 w-4" />
                <span>My Learning</span>
            </Link>

            <Link
                to="/instructor-dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/instructor-dashboard')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
                <Users className="h-4 w-4" />
                <span>Teaching</span>
            </Link>

            <Link
                to="/add-course"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-course')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
            </Link>
            <Link
                to="/add-instructor"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/add-instructor')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
                <UserPlus className="h-4 w-4" />
                <span>Add Instructor</span>
            </Link>
        </>
    )}
</div>
</div>

<div className="flex items-center space-x-4">
    {user ? (
        <>
            <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.username}
                </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
            </Button>
        </>
    ) : (
        <Link to="/auth">
            <Button>Sign In</Button>
        </Link>
    )}
</div>
</div>
</div>
</nav>
);
};

export default Navigation;