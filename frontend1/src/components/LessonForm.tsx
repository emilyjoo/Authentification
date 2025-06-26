import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Course {
    id: number;
    title: string;
}

interface Lesson {
    id?: number;
    title: string;
    contentUrl: string;
    lessonOrder: number;
    courseId: number;
}

const LessonForm: React.FC = () => {
    const [lesson, setLesson] = useState<Lesson>({
        title: '',
        contentUrl: '',
        lessonOrder: 1,
        courseId: 0
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setIsLoadingCourses(true);
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: "No authentication token found. Please log in again.",
                });
                return;
            }

            console.log('Fetching courses with token:', token); // Debug log

            const response = await fetch('http://localhost:8085/api/courses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status); // Debug log

            if (response.ok) {
                const data = await response.json();
                console.log('Courses data:', data); // Debug log
                setCourses(data);

                if (data.length === 0) {
                    toast({
                        title: "No Courses Found",
                        description: "No courses found for this instructor. Please create a course first.",
                    });
                }
            } else {
                const errorText = await response.text();
                console.error('Failed to fetch courses. Status:', response.status, 'Error:', errorText);

                if (response.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Authentication Error",
                        description: "Your session has expired. Please log in again.",
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: `Failed to fetch courses: ${response.status}`,
                    });
                }
            }
        } catch (error) {
            console.error('Network error while fetching courses:', error);
            toast({
                variant: "destructive",
                title: "Network Error",
                description: "Failed to connect to server. Please check your connection.",
            });
        } finally {
            setIsLoadingCourses(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (lesson.courseId === 0) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please select a course",
            });
            return;
        }

        if (!lesson.title.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please enter a lesson title",
            });
            return;
        }

        if (!lesson.contentUrl.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please enter a content URL",
            });
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast({
                    variant: "destructive",
                    title: "Authentication Error",
                    description: "No authentication token found. Please log in again.",
                });
                return;
            }

            // Ensure courseId is properly set as a number
            // Create lesson data with proper structure
            const lessonData = {
                title: lesson.title.trim(),
                contentUrl: lesson.contentUrl.trim(),
                lessonOrder: Number(lesson.lessonOrder),
                courseId: Number(lesson.courseId),
                // Alternative: if your backend expects a course object instead of courseId
                course: {
                    id: Number(lesson.courseId)
                }
            };

            console.log('Submitting lesson data:', lessonData); // Debug log
            console.log('CourseId type:', typeof lessonData.courseId, 'Value:', lessonData.courseId);

            const response = await fetch('http://localhost:8085/api/lessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(lessonData)
            });

            console.log('Submit response status:', response.status); // Debug log

            if (response.ok) {
                const createdLesson = await response.json();
                console.log('Created lesson response:', createdLesson); // Debug log

                toast({
                    title: "Success",
                    description: "Lesson created successfully!",
                });

                // Reset form
                setLesson({
                    title: '',
                    contentUrl: '',
                    lessonOrder: 1,
                    courseId: 0
                });
            } else {
                const errorText = await response.text();
                console.error('Failed to create lesson. Status:', response.status, 'Error:', errorText);
                console.error('Request body was:', JSON.stringify(lessonData));

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `Failed to create lesson: ${response.status} - ${errorText}`,
                });
            }
        } catch (error) {
            console.error('Network error while creating lesson:', error);
            toast({
                variant: "destructive",
                title: "Network Error",
                description: "Failed to create lesson. Please check your connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof Lesson, value: string | number) => {
        setLesson(prev => ({ ...prev, [field]: value }));
    };

    const handleCourseSelect = (value: string) => {
        const courseId = parseInt(value);
        console.log('Selected course ID:', courseId); // Debug log
        handleInputChange('courseId', courseId);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Create New Lesson</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="course">Select Course</Label>
                    {isLoadingCourses ? (
                        <div className="text-sm text-gray-500">Loading courses...</div>
                    ) : (
                        <Select
                            onValueChange={handleCourseSelect}
                            value={lesson.courseId > 0 ? lesson.courseId.toString() : ''}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.length > 0 ? (
                                    courses.map(course => (
                                        <SelectItem key={course.id} value={course.id.toString()}>
                                            {course.id}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="" disabled>
                                        No courses available
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">Lesson Title</Label>
                    <Input
                        id="title"
                        value={lesson.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter lesson title"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="contentUrl">Content URL</Label>
                    <Input
                        id="contentUrl"
                        value={lesson.contentUrl}
                        onChange={(e) => handleInputChange('contentUrl', e.target.value)}
                        placeholder="Enter video link, PDF link, etc."
                        type="url"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lessonOrder">Lesson Order</Label>
                    <Input
                        id="lessonOrder"
                        type="number"
                        value={lesson.lessonOrder}
                        onChange={(e) => handleInputChange('lessonOrder', parseInt(e.target.value) || 1)}
                        placeholder="Enter lesson order"
                        min="1"
                        required
                    />
                </div>

                <Button type="submit" disabled={isLoading || isLoadingCourses} className="w-full">
                    {isLoading ? 'Creating Lesson...' : 'Create Lesson'}
                </Button>
            </form>

            {/* Debug info - remove in production */}
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <div>Selected Course ID: {lesson.courseId}</div>
                <div>Available Courses: {courses.length}</div>
                <div>Token Available: {localStorage.getItem('token') ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
};

export default LessonForm;