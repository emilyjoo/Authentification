import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Book, Calendar, User, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Course {
    id: number;
    name: string;
    description: string;
    instructor: {
        id: number;
        name: string;
        specialization: string;
    };
    startDate: string;
    endDate: string;
    enrollmentCount: number;
}

const Courses: React.FC = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('all');
// Mock data - this would come from your Spring Boot API
    const courses: Course[] = [
        {
            id: 1,
            name: "Introduction to React",
            description: "Learn the fundamentals of React including components, state management, and hooks. Perfect for beginners wanting to start their frontend development journey.",
            instructor: {
                id: 1,
                name: "John Smith",
                specialization: "Frontend Development"
            },
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            enrollmentCount: 45
        },
        {
            id: 2,
            name: "Spring Boot Mastery",
            description: "Master Spring Boot framework with hands-on projects. Learn REST APIs, security, and database integration.",
            instructor: {
                id: 2,
                name: "Sarah Johnson",
                specialization: "Backend Development"
            },
            startDate: "2024-07-15",
            endDate: "2024-10-15",
            enrollmentCount: 32
        },
        {
            id: 3,
            name: "Database Design Principles",
            description: "Comprehensive course on database design, normalization, and optimization techniques for modern applications.",
            instructor: {
                id: 3,
                name: "Mike Davis",
                specialization: "Database Administration"
            },
            startDate: "2024-08-01",
            endDate: "2024-11-01",
            enrollmentCount: 28
        }
    ];
    const specializations = ['all', 'Frontend Development', 'Backend Development', 'Database Administration'];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization = selectedSpecialization === 'all' ||
            course.instructor.specialization === selectedSpecialization;
        return matchesSearch && matchesSpecialization;
    });

    const handleEnroll = (courseId: number) => {
        // This would call your Spring Boot API to enroll the user
        console.log(`Enrolling in course ${courseId}`);
        // Add toast notification here
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h1>
                    <p className="text-gray-600">Discover and enroll in courses to enhance your skills</p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <select
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {specializations.map(spec => (
                                <option key={spec} value={spec}>
                                    {spec === 'all' ? 'All Specializations' : spec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <Card key={course.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <Book className="h-8 w-8 text-blue-600 mb-2" />
                                    <Badge variant="secondary">{course.enrollmentCount} enrolled</Badge>
                                </div>
                                <CardTitle className="text-lg">{course.name}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>{course.instructor.name}</span>
                                    <Badge variant="outline" className="text-xs">
                                        {course.instructor.specialization}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}</span>
                                </div>
                                <Button
                                    onClick={() => handleEnroll(course.id)}
                                    className="w-full"
                                    disabled={!user}
                                >
                                    {user ? 'Enroll Now' : 'Login to Enroll'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;