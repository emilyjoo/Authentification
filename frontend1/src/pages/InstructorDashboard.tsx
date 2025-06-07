import React, {useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatsCards from '../components/instructor/StatsCards';
import CoursesList from '../components/instructor/CoursesList';
import StudentsTable from '../components/instructor/StudentsTable';

interface InstructorCourse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentCount: number;
    status: 'active' | 'completed' | 'upcoming';
}

interface Student {
    id: number;
    name: string;
    email: string;
    enrollmentDate: string;
}

const InstructorDashboard: React.FC = () => {
    const {user} = useAuth();
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

    // Mock data - this would come from your Spring Boot API
    const instructorCourses: InstructorCourse[] = [
        {
            id: 1,
            name: "Introduction to React",
            description: "Learn the fundamentals of React including components, state management, and hooks.",
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            enrollmentCount: 45,
            status: 'active'
        },
        {
            id: 2,
            name: "Advanced React Patterns",
            description: "Deep dive into advanced React patterns and optimization techniques.",
            startDate: "2024-09-15",
            endDate: "2024-12-15",
            enrollmentCount: 23,
            status: 'upcoming'
        },
        {
            id: 3,
            name: "React Fundamentals",
            description: "Previous semester's React course.",
            startDate: "2024-03-01",
            endDate: "2024-05-01",
            enrollmentCount: 52,
            status: 'completed'
        }
    ];
    const enrolledStudents: Student[] = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@gmail.com",
            enrollmentDate: "2024-06-15"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@gmail.com",
            enrollmentDate: "2024-06-16"
        },
        {
            id: 3,
            name: "Carol Davis",
            email: "carol.davis@yahoo.com",
            enrollmentDate: "2024-06-17"
        }
    ];



    const stats = {
        totalCourses: instructorCourses.length,
        activeCourses: instructorCourses.filter(c => c.status === 'active').length,
        totalStudents: instructorCourses.reduce((acc, course) => acc + course.enrollmentCount, 0),
        upcomingCourses: instructorCourses.filter(c => c.status === 'upcoming').length
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
                    />

                    <StudentsTable
                        students={enrolledStudents}
                        selectedCourse={selectedCourse}
                    />
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;