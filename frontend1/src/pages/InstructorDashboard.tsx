import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import EditCourseModal from "@/components/instructor/EditCourseModal.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

interface InstructorCourse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentCount: number;
    status: 'active' | 'completed' | 'upcoming';
    category: string;
    price: number;
    maxStudents: number;
}

interface Student {
    id: number;
    name: string;
    email: string;
    enrollmentDate: string;
}

interface StatsData {
    totalCourses: number;
    activeCourses: number;
    totalStudents: number;
    upcomingCourses: number;
}

const InstructorDashboard: React.FC = () => {
    const { user, token } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [editingCourse, setEditingCourse] = useState<InstructorCourse | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Fetch instructor courses
    const { data: instructorCourses = [], isLoading: coursesLoading, error: coursesError } = useQuery({
        queryKey: ['instructor-courses'],
        queryFn: async () => {
            if (!user?.userId) throw new Error("Instructor ID is missing");

            try {
                console.log("Fetching instructor for user ID:", user.userId);

                // Get instructor data first
                const instructorResponse = await fetch(`http://localhost:8085/api/instructors/by-user/${user.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!instructorResponse.ok) {
                    const errorText = await instructorResponse.text();
                    console.error("Instructor fetch error:", errorText);
                    throw new Error(`Failed to fetch instructor: ${instructorResponse.status} - ${errorText}`);
                }

                const instructor = await instructorResponse.json();
                console.log("Instructor data received:", instructor);

                if (!instructor?.id) {
                    throw new Error("Instructor data is invalid or missing ID");
                }

                // Fetch courses using instructor's database ID
                console.log("Fetching courses for instructor ID:", instructor.id);
                const coursesResponse = await fetch(`http://localhost:8085/api/courses/instructor/${instructor.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!coursesResponse.ok) {
                    const errorText = await coursesResponse.text();
                    console.error("Courses fetch error:", errorText);
                    throw new Error(`Failed to fetch courses: ${coursesResponse.status} - ${errorText}`);
                }

                // Get the raw response text first to check for JSON syntax issues
                const responseText = await coursesResponse.text();
                console.log("Raw courses response:", responseText);

                try {
                    const coursesData = JSON.parse(responseText);
                    console.log("Parsed courses data:", coursesData);
                    return coursesData;
                } catch (jsonError) {
                    console.error("JSON parse error:", jsonError);
                    console.error("Response text that failed to parse:", responseText);
                    throw new Error(`Invalid JSON response from server: ${jsonError.message}`);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                throw error;
            }
        },
        enabled: !!token && !!user?.userId,
    });

    // Fetch students for selected course
    const { data: enrolledStudents = [], isLoading: studentsLoading } = useQuery({
        queryKey: ['course-students', selectedCourse],
        queryFn: async () => {
            if (!selectedCourse) return [];

            try {
                console.log("Fetching students for course ID:", selectedCourse);

                const response = await fetch(`http://localhost:8085/api/courses/${selectedCourse}/students`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Students fetch error:", errorText);
                    throw new Error(`Failed to fetch students: ${response.status} - ${errorText}`);
                }

                // Get raw response text first to check for JSON issues
                const responseText = await response.text();
                console.log("Raw students response:", responseText);

                try {
                    const studentsData = JSON.parse(responseText);
                    console.log("Parsed students data:", studentsData);
                    return studentsData;
                } catch (jsonError) {
                    console.error("JSON parse error for students:", jsonError);
                    console.error("Students response text that failed to parse:", responseText);
                    throw new Error(`Invalid JSON response for students: ${jsonError.message}`);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
                throw error;
            }
        },
        enabled: !!selectedCourse && !!token,
    });

    // Update course mutation
    const updateCourseMutation = useMutation({
        mutationFn: async (course: InstructorCourse) => {
            // Prepare the course data with all attributes
            const courseData = {
                id: course.id,
                name: course.name,
                description: course.description,
                startDate: course.startDate,
                endDate: course.endDate,
                category: course.category,
                price: course.price,
                maxStudents: course.maxStudents,
                status: course.status
            };

            console.log("Updating course with data:", courseData);

            const response = await fetch(`http://localhost:8085/api/courses/${course.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Course update error:", errorText);
                throw new Error(`Failed to update course: ${response.status} - ${errorText}`);
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
            toast({
                title: "Success",
                description: "Course updated successfully",
            });
            setEditingCourse(null);
        },
        onError: (error: Error) => {
            console.error("Update course mutation error:", error);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    // Delete course mutation
    const deleteCourseMutation = useMutation({
        mutationFn: async (courseId: number) => {
            const response = await fetch(`http://localhost:8085/api/courses/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Course delete error:", errorText);
                throw new Error(`Failed to delete course: ${response.status} - ${errorText}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['instructor-courses'] });
            toast({
                title: "Success",
                description: "Course deleted successfully",
            });
            setSelectedCourse(null);
        },
        onError: (error: Error) => {
            console.error("Delete course mutation error:", error);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleEditCourse = (course: InstructorCourse) => {
        setEditingCourse(course);
    };

    const handleDeleteCourse = (courseId: number) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            deleteCourseMutation.mutate(courseId);
        }
    };

    const handleUpdateCourse = (updatedCourse: InstructorCourse) => {
        updateCourseMutation.mutate(updatedCourse);
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800',
            upcoming: 'bg-blue-100 text-blue-800'
        };

        return `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status as keyof typeof statusClasses]}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    // Calculate stats
    const stats: StatsData = {
        totalCourses: instructorCourses.length,
        activeCourses: instructorCourses.filter((c: InstructorCourse) => c.status === 'active').length,
        totalStudents: instructorCourses.reduce((acc: number, course: InstructorCourse) => acc + course.enrollmentCount, 0),
        upcomingCourses: instructorCourses.filter((c: InstructorCourse) => c.status === 'upcoming').length
    };

    if (coursesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (coursesError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                        <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Dashboard</h2>
                        <p className="text-red-600">Failed to load your courses. Please try again later.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
                            <p className="mt-1 text-gray-600">Welcome back, {user?.username}!</p>
                        </div>
                        <Link to="/add-course">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create New Course
                        </button>
                    </Link>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.activeCourses}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Students</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingCourses}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Courses List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
                            </div>
                            <div className="p-6">
                                {instructorCourses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                                        <p className="text-gray-500 mb-4">Get started by creating your first course</p>
                                        <button
                                            onClick={() => setShowCreateModal(true)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Create Course
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {instructorCourses.map((course: InstructorCourse) => (
                                            <div
                                                key={course.id}
                                                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                                    selectedCourse === course.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                                onClick={() => setSelectedCourse(course.id)}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                                            <span className={getStatusBadge(course.status)}>
                                                                {course.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500 mb-2">
                                                            <span>📅 {formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
                                                            <span>👥 {course.enrollmentCount}/{course.maxStudents || 'Unlimited'} students</span>
                                                            <span>🏷️ {course.category || 'Uncategorized'}</span>
                                                            <span>💰 {formatPrice(course.price || 0)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditCourse(course);
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteCourse(course.id);
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                            disabled={deleteCourseMutation.isPending}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Students Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {selectedCourse ? 'Enrolled Students' : 'Students'}
                                </h2>
                                {selectedCourse && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        {instructorCourses.find(c => c.id === selectedCourse)?.name}
                                    </p>
                                )}
                            </div>
                            <div className="p-6">
                                {!selectedCourse ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-sm">Select a course to view enrolled students</p>
                                    </div>
                                ) : studentsLoading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                        <p className="mt-2 text-sm text-gray-500">Loading students...</p>
                                    </div>
                                ) : enrolledStudents.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 text-sm">No students enrolled yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {enrolledStudents.map((student: Student) => (
                                            <div key={student.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-blue-600 font-semibold text-sm">
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900 truncate">{student.name}</p>
                                                    <p className="text-sm text-gray-500 truncate">{student.email}</p>
                                                    <p className="text-xs text-gray-400">
                                                        Enrolled: {formatDate(student.enrollmentDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Course Modal */}
            {editingCourse && (
                <EditCourseModal
                    course={editingCourse}
                    onSave={handleUpdateCourse}
                    onCancel={() => setEditingCourse(null)}
                    isLoading={updateCourseMutation.isPending}
                />
            )}
        </div>
    );
};

export default InstructorDashboard;