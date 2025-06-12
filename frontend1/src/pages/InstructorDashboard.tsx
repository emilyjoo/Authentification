import React, {useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatsCards from '../components/instructor/StatsCards';
import CoursesList from '../components/instructor/CoursesList';
import StudentsTable from '../components/instructor/StudentsTable';
import EditCourseModal from '../components/instructor/EditCourseModal';
import { useToast } from '@/hooks/use-toast';

interface InstructorCourse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentCount: number;
    status: 'active' | 'completed' | 'upcoming';
}


const InstructorDashboard: React.FC = () => {
    const { user, token } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [editingCourse, setEditingCourse] = useState<InstructorCourse | null>(null);

    // Fetch courses from backend
    const { data: instructorCourses = [], isLoading: coursesLoading, error: coursesError } = useQuery({
        queryKey: ['instructor-courses'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8085/api/courses/instructor', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            return response.json();
        },
        enabled: !!token,
    });
    // Fetch enrolled students for selected course
    const { data: enrolledStudents = [] } = useQuery({
        queryKey: ['course-students', selectedCourse],
        queryFn: async () => {
            if (!selectedCourse) return [];

            const response = await fetch(`http://localhost:8085/api/courses/${selectedCourse}/students`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }

            return response.json();
        },
        enabled: !!selectedCourse && !!token,
    });
    // Update course mutation
    const updateCourseMutation = useMutation({
        mutationFn: async (course: InstructorCourse) => {
            const response = await fetch(`http://localhost:8085/api/courses/${course.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course),
            });

            if (!response.ok) {
                throw new Error('Failed to update course');
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
                throw new Error('Failed to delete course');
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
        if (window.confirm('Are you sure you want to delete this course?')) {
            deleteCourseMutation.mutate(courseId);
        }
    };

    const handleUpdateCourse = (updatedCourse: InstructorCourse) => {
        updateCourseMutation.mutate(updatedCourse);
    };

    if (coursesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (coursesError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Courses</h2>
                    <p className="text-gray-600">Failed to load your courses. Please try again later.</p>
                </div>
            </div>
        );
    }
        const stats = {
            totalCourses: instructorCourses.length,
            activeCourses: instructorCourses.filter((c: InstructorCourse) => c.status === 'active').length,
            totalStudents: instructorCourses.reduce((acc: number, course: InstructorCourse) => acc + course.enrollmentCount, 0),
            upcomingCourses: instructorCourses.filter((c: InstructorCourse) => c.status === 'upcoming').length
        };
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user?.username}! Manage your courses and students.</p>
                    </div>

                    <StatsCards
                        totalCourses={stats.totalCourses}
                        activeCourses={stats.activeCourses}
                        totalStudents={stats.totalStudents}
                        upcomingCourses={stats.upcomingCourses}
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <CoursesList
                            courses={instructorCourses}
                            selectedCourse={selectedCourse}
                            onCourseSelect={setSelectedCourse}
                            onEditCourse={handleEditCourse}
                            onDeleteCourse={handleDeleteCourse}
                            isDeleting={deleteCourseMutation.isPending}
                        />
                        <StudentsTable
                            students={enrolledStudents}
                            selectedCourse={selectedCourse}
                        />
                    </div>

                    {editingCourse && (
                        <EditCourseModal
                            course={editingCourse}
                            onSave={handleUpdateCourse}
                            onCancel={() => setEditingCourse(null)}
                            isLoading={updateCourseMutation.isPending}
                        />
                    )}
                </div>
            </div>
        );
    };
    export default InstructorDashboard;