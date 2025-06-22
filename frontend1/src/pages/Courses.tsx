import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Book, Calendar, User, Search, Filter, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface Course {
    id: number;
    name: string;
    description: string;
    instructor: {
        id: number;
        name: string;
        specialization?: string; // Made optional in case it's missing
    };
    startDate: string;
    endDate: string;
    enrollmentCount?: number; // Made optional with default value
    maxStudents?: number;
    price?: number;
    category?: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    user: {
        id: number;
    };
    courseId: number;
    // Add other student properties if needed
}



const Courses: React.FC = () => {
    const { user, token } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('all');

    // Fetch student data for the logged-in user
    const { data: student } = useQuery<Student>({
        queryKey: ['student', user?.userId],
        queryFn: async () => {
            if (!user) return null;
            const response = await fetch(`http://localhost:8085/api/students/user/${user.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const studentData = await response.json();
            console.log('Student data:', studentData);  // Debug log
            return studentData;

            // const students: Student[] = await response.json();
            // return students.find(s => s.user.id === user.userId);

        },
        enabled: !!user?.userId,
    });

    // Fetch courses from Spring Boot backend
    const { data: courses = [], isLoading, error } = useQuery({
        queryKey: ['courses'],
        queryFn: async (): Promise<Course[]> => {
            const response = await fetch('http://localhost:8085/api/courses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response body:', errorText);
                console.error('Error response status:', response.status);
                console.error('Error response statusText:', response.statusText);
                throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText} - ${errorText}`);
            }

            return response.json();
        },
    });

    // Enroll in course mutation using student ID
    const enrollMutation = useMutation({
        mutationFn: async (courseId: number) => {
            if (!student?.id) {  // Check both student and student.id
                throw new Error('Student information not available');
            }
            const response = await fetch(`http://localhost:8085/api/enrollments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    studentId: student?.id,
                    courseId: courseId,
                    enrollmentDate: new Date().toISOString().split('T')[0] // Current date
                }),
            });

            const responseText = await response.text();

            if (!response.ok) {
                let errorMessage = 'Failed to enroll in course';
                try {
                    const errorData = responseText ? JSON.parse(responseText) : {};
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    console.error("Raw error response:", responseText);
                }
                throw new Error(errorMessage);
            }

            try {
                return responseText ? JSON.parse(responseText) : {};
            } catch (e) {
                return {};
            }
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Successfully enrolled in the course!",
            });
            queryClient.invalidateQueries({ queryKey: ['courses'] });
        },
        onError: (error: Error) => {
            const msg = error.message?.toLowerCase() || "";

            const isAlreadyEnrolled = msg.includes("already enrolled");

            toast({
                title: isAlreadyEnrolled ? "Enrollment Info" : "Enrollment Error",
                description: isAlreadyEnrolled
                    ? "You are already enrolled in this course."
                    : error.message || "Failed to enroll in course.",
                variant: "destructive",
            });
        },
    });

    // Extract unique specializations from courses with proper typing
    const specializations: string[] = [
        'all',
        ...Array.from(new Set(courses.map((course: Course) => course.instructor.specialization)))
    ];
    const filteredCourses = courses.filter((course: Course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization = selectedSpecialization === 'all' ||
            course.instructor.specialization === selectedSpecialization;
        return matchesSearch && matchesSpecialization;
    });

    const handleEnroll = (courseId: number) => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please login to enroll in courses",
                variant: "destructive",
            });
            return;
        }
        enrollMutation.mutate(courseId);
    };
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <span className="ml-2">Loading courses...</span>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center py-12">
                        <Book className="h-12 w-12 mx-auto text-red-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading courses</h3>
                        <p className="text-gray-600">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

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
                            {specializations.map((spec: string) => (
                                <option key={spec} value={spec}>
                                    {spec === 'all' ? 'All Specializations' : spec}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course: Course) =>  (
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
                                    disabled={!user || enrollMutation.isPending}
                                >
                                    {enrollMutation.isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Enrolling...
                                        </>
                                    ) : user ? 'Enroll Now' : 'Login to Enroll'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredCourses.length === 0 && !isLoading && (
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