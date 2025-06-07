import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Calendar, User, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface EnrolledCourse {
    id: number;
    name: string;
    instructor: string;
    progress: number;
    enrollmentDate: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'upcoming';
}

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    // Mock data - this would come from your Spring Boot API
    const enrolledCourses: EnrolledCourse[] = [
        {
            id: 1,
            name: "Introduction to React",
            instructor: "John Smith",
            progress: 75,
            enrollmentDate: "2024-06-15",
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            status: 'active'
        },
        {
            id: 2,
            name: "Database Design Principles",
            instructor: "Mike Davis",
            progress: 100,
            enrollmentDate: "2024-05-01",
            startDate: "2024-05-15",
            endDate: "2024-07-15",
            status: 'completed'
        },
        {
            id: 3,
            name: "Spring Boot Mastery",
            instructor: "Sarah Johnson",
            progress: 0,
            enrollmentDate: "2024-06-20",
            startDate: "2024-07-15",
            endDate: "2024-10-15",
            status: 'upcoming'
        }
    ];
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800">Active</Badge>;
            case 'completed':
                return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
            case 'upcoming':
                return <Badge className="bg-yellow-100 text-yellow-800">Upcoming</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const stats = {
        totalCourses: enrolledCourses.length,
        activeCourses: enrolledCourses.filter(c => c.status === 'active').length,
        completedCourses: enrolledCourses.filter(c => c.status === 'completed').length,
        averageProgress: Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.username}! Track your learning progress.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <Book className="h-5 w-5 text-blue-600" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.totalCourses}</p>
                                    <p className="text-sm text-gray-600">Total Courses</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.activeCourses}</p>
                                    <p className="text-sm text-gray-600">Active</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.completedCourses}</p>
                                    <p className="text-sm text-gray-600">Completed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5 text-orange-600" />
                                <div>
                                    <p className="text-2xl font-bold">{stats.averageProgress}%</p>
                                    <p className="text-sm text-gray-600">Avg Progress</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Enrolled Courses */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>Your enrolled courses and progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {enrolledCourses.map(course => (
                                <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{course.name}</h3>
                                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                                <User className="h-4 w-4 mr-1" />
                                                Instructor: {course.instructor}
                                            </p>
                                        </div>
                                        {getStatusBadge(course.status)}
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-gray-600">Progress</span>
                                            <span className="text-sm font-medium">{course.progress}%</span>
                                        </div>
                                        <Progress value={course.progress} className="h-2" />
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                        {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                    </span>
                                        <Button variant="outline" size="sm">
                                            {course.status === 'upcoming' ? 'View Details' : 'Continue Learning'}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;