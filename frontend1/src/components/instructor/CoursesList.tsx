import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InstructorCourse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentCount: number;
    status: 'active' | 'completed' | 'upcoming';
}

interface CoursesListProps {
    courses: InstructorCourse[];
    selectedCourse: number | null;
    onCourseSelect: (courseId: number) => void;
    onEditCourse: (course: InstructorCourse) => void;
    onDeleteCourse: (courseId: number) => void;
    isDeleting: boolean;
}

const CoursesList: React.FC<CoursesListProps> = ({
                                                     courses,
                                                     selectedCourse,
                                                     onCourseSelect,
                                                     onEditCourse,
                                                     onDeleteCourse,
                                                     isDeleting
                                                 }) => {
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
    return (
        <Card>
            <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Courses you're teaching</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {courses.map(course => (
                        <div
                            key={course.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                selectedCourse === course.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => onCourseSelect(course.id)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold">{course.name}</h3>
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(course.status)}
                                    <div className="flex gap-1">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEditCourse(course);
                                            }}
                                        >
                                            <Edit className="h-4 w-4"/>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteCourse(course.id);
                                            }}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                            <div className="flex justify-between items-center text-sm">
                <span className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1"/>
                    {course.enrollmentCount} students
                </span>
                                <span className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1"/>
                                    {new Date(course.startDate).toLocaleDateString()}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/add-course">
                    <Button className="w-full mt-4">Create New Course</Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default CoursesList;