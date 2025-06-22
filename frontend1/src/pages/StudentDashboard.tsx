import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Calendar, User, BookOpen, AlertCircle } from 'lucide-react';
import {Link} from "react-router-dom";

interface EnrolledCourse {
    id: number;
    name: string;
    description: string;
    instructor: string;
    enrollmentDate: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'upcoming';
    category?: string;
    maxStudents?: number;
    price?: number;
}

// Mock auth context for demo
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard: React.FC = () => {
    const { user, token } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!user?.userId) {
                setError('User not found');
                setLoading(false);
                return;
            }

            try {
                let enrollments = [];
                let studentId = null;

                try {
                    // First, get the student by user ID
                    console.log(`Fetching student for user ID: ${user.userId}`);
                    const studentResponse = await fetch(`http://localhost:8085/api/students/user/${user.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(`Student response status: ${studentResponse.status}`);

                    if (studentResponse.ok) {
                        const student = await studentResponse.json();
                        console.log('Student data:', student);
                        studentId = student.id;
                        setStudentData(student); // Store student data

                        // Then, get enrollments for this student
                        console.log(`Fetching courses for student ID: ${student.id}`);
                        const enrollmentsResponse = await fetch(`http://localhost:8085/api/enrollments/student/${student.id}/courses`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        console.log(`Enrollments response status: ${enrollmentsResponse.status}`);

                        if (enrollmentsResponse.ok) {
                            enrollments = await enrollmentsResponse.json();
                            console.log('Enrollments data:', enrollments);
                        } else {
                            const errorText = await enrollmentsResponse.text();
                            console.error('Enrollments error:', errorText);
                            throw new Error(`Failed to fetch enrollments: ${errorText}`);
                        }
                    } else if (studentResponse.status === 403) {
                        throw new Error('Access denied. Please check your authentication.');
                    } else if (studentResponse.status === 404) {
                        // Student might not exist, create empty state
                        console.log('Student not found, showing empty state');
                        setEnrolledCourses([]);
                        setLoading(false);
                        return;
                    } else if (studentResponse.status === 500) {
                        const errorText = await studentResponse.text();
                        console.error('Server error:', errorText);
                        throw new Error(`Server error: ${errorText}`);
                    } else {
                        const errorText = await studentResponse.text();
                        console.error('Student fetch error:', errorText);
                        throw new Error(`Failed to fetch student data: ${errorText}`);
                    }
                } catch (authError) {
                    // If authentication fails, show mock data for demo
                    console.error('Authentication error:', authError);

                    const mockCourses: EnrolledCourse[] = [
                        {
                            id: 1,
                            name: "Introduction to React",
                            description: "Learn the fundamentals of React development including components, state, and props.",
                            instructor: "John Smith",
                            enrollmentDate: "2024-01-15",
                            startDate: "2024-02-01",
                            endDate: "2024-03-01",
                            status: "completed",
                            category: "Programming",
                            maxStudents: 30,
                            price: 199.99
                        },
                        {
                            id: 2,
                            name: "Advanced JavaScript",
                            description: "Deep dive into JavaScript concepts including closures, promises, and async programming.",
                            instructor: "Sarah Johnson",
                            enrollmentDate: "2024-02-01",
                            startDate: "2024-06-01",
                            endDate: "2024-07-15",
                            status: "active",
                            category: "Programming",
                            maxStudents: 25,
                            price: 249.99
                        },
                        {
                            id: 3,
                            name: "Web Design Principles",
                            description: "Master the art of creating beautiful and functional web designs.",
                            instructor: "Mike Davis",
                            enrollmentDate: "2024-05-10",
                            startDate: "2024-07-01",
                            endDate: "2024-08-15",
                            status: "upcoming",
                            category: "Design",
                            maxStudents: 20,
                            price: 179.99
                        }
                    ];

                    setEnrolledCourses(mockCourses);
                    setError("Demo mode: Using sample data due to authentication issues");
                    setLoading(false);
                    return;
                }

                // Transform enrollments to match your backend structure with proper null checks
                console.log('Processing enrollments:', enrollments);
                const coursesData: EnrolledCourse[] = enrollments.map((enrollment: any) => {
                    console.log('Processing enrollment:', enrollment);

                    // Based on your console output, course data is directly in the enrollment object
                    const startDateStr = enrollment.startDate;
                    const endDateStr = enrollment.endDate;
                    const enrollmentDateStr = enrollment.enrollmentDate;

                    let status: 'active' | 'completed' | 'upcoming' = 'active';

                    // Calculate status based on dates
                    if (startDateStr && endDateStr) {
                        try {
                            const startDate = new Date(startDateStr);
                            const endDate = new Date(endDateStr);
                            const today = new Date();

                            if (today < startDate) {
                                status = 'upcoming';
                            } else if (today > endDate) {
                                status = 'completed';
                            }
                        } catch (dateError) {
                            console.warn('Error parsing dates:', dateError);
                        }
                    }

                    const courseData = {
                        id: enrollment.id || Math.random(),
                        name: enrollment.name || 'Unknown Course',
                        description: enrollment.description || 'No description available',
                        // Handle instructor name directly from enrollment
                        instructor: enrollment.instructorName || 'Unknown Instructor',
                        enrollmentDate: enrollmentDateStr || new Date().toISOString(),
                        startDate: startDateStr || new Date().toISOString(),
                        endDate: endDateStr || new Date().toISOString(),
                        status: status,
                        category: enrollment.category,
                        maxStudents: enrollment.maxStudents,
                        price: enrollment.price
                    };

                    console.log('Mapped course data:', courseData);
                    return courseData;
                });

                setEnrolledCourses(coursesData);
            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [user?.userId, token]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
            case 'completed':
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
            case 'upcoming':
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Upcoming</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const stats = {
        totalCourses: enrolledCourses.length,
        activeCourses: enrolledCourses.filter(c => c.status === 'active').length,
        completedCourses: enrolledCourses.filter(c => c.status === 'completed').length,
        upcomingCourses: enrolledCourses.filter(c => c.status === 'upcoming').length
    };

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch {
            return 'Invalid Date';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading your courses...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {studentData?.name || user?.username}! Track your learning journey.</p>
                </div>

                {/* Show error message if there's an issue */}
                {error && (
                    <div className="mb-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <div className="flex">
                                <AlertCircle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium text-yellow-800">Notice</h3>
                                    <p className="text-sm text-yellow-700 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Book className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                                    <p className="text-sm text-gray-600">Total Courses</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
                                    <p className="text-sm text-gray-600">Active</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.completedCourses}</p>
                                    <p className="text-sm text-gray-600">Completed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <User className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{stats.upcomingCourses}</p>
                                    <p className="text-sm text-gray-600">Upcoming</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Enrolled Courses */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5" />
                            <span>My Courses</span>
                        </CardTitle>
                        <CardDescription>Your enrolled courses and their details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {enrolledCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled</h3>
                                <p className="text-gray-500 mb-6">Start your learning journey by enrolling in a course!</p>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Browse Courses
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {enrolledCourses.map(course => (
                                    <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-xl text-gray-900 mb-2">{course.name}</h3>
                                                {course.description && (
                                                    <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                                                )}
                                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                    <span className="flex items-center">
                                                        <User className="h-4 w-4 mr-1" />
                                                        {course.instructor}
                                                    </span>
                                                    {course.category && (
                                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                                                            {course.category}
                                                        </span>
                                                    )}
                                                    {course.price && (
                                                        <span className="text-green-600 font-medium">
                                                            ${course.price}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {getStatusBadge(course.status)}
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center space-x-6 text-gray-600">
                                                <span className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-1" />
                                                    {formatDate(course.startDate)} - {formatDate(course.endDate)}
                                                </span>
                                                <span>
                                                    Enrolled: {formatDate(course.enrollmentDate)}
                                                </span>
                                            </div>
                                            <Link to="/course-viewer">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="hover:bg-blue-50 hover:border-blue-200"
                                                >
                                                    {course.status === 'upcoming' ? 'View Details' :
                                                        course.status === 'completed' ? 'View Certificate' :
                                                            'Start Learning'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;