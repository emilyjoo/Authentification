import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Book,
    Calendar,
    User,
    BookOpen,
    AlertCircle,
    Play,
    FileText,
    Download,
    CheckCircle,
    Clock,
    ArrowLeft,
    Lock,
    PlayCircle
} from 'lucide-react';

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

interface CourseModule {
    id: number;
    title: string;
    description: string;
    type: 'video' | 'pdf' | 'text' | 'quiz';
    duration?: string;
    completed: boolean;
    locked: boolean;
    content?: string;
    videoUrl?: string;
    pdfUrl?: string;
}

interface CourseContent {
    id: number;
    modules: CourseModule[];
    progress: number;
}

// Mock course content data
const mockCourseContent: { [key: number]: CourseContent } = {
    1: {
        id: 1,
        progress: 75,
        modules: [
            {
                id: 1,
                title: "Introduction to React Components",
                description: "Learn the basics of React components and JSX",
                type: "video",
                duration: "15 min",
                completed: true,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
                id: 2,
                title: "Component Props and State",
                description: "Understanding props and state management in React",
                type: "video",
                duration: "20 min",
                completed: true,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
                id: 3,
                title: "React Hooks Guide",
                description: "Complete guide to using React hooks",
                type: "pdf",
                completed: true,
                locked: false,
                pdfUrl: "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwKL0xlbmd0aCAzMDg2Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCj4+CnN0cmVhbQ=="
            },
            {
                id: 4,
                title: "Building Your First App",
                description: "Hands-on project to build a React application",
                type: "text",
                completed: false,
                locked: false,
                content: `# Building Your First React App

## Getting Started

In this module, you'll build your first React application from scratch. We'll cover:

1. **Setting up the project structure**
   - Creating components
   - Organizing files
   - Managing dependencies

2. **Core functionality**
   - State management
   - Event handling
   - Component communication

3. **Styling and UI**
   - CSS modules
   - Responsive design
   - User experience

## Step 1: Project Setup

First, let's create the basic structure of our React app:

\`\`\`bash
npx create-react-app my-first-app
cd my-first-app
npm start
\`\`\`

## Step 2: Creating Components

We'll start by creating a simple component:

\`\`\`jsx
import React, { useState } from 'react';

function Welcome({ name }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>You've clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Welcome;
\`\`\`

## Next Steps

Continue practicing by building more components and exploring React's ecosystem!`
            },
            {
                id: 5,
                title: "Advanced React Patterns",
                description: "Learn advanced patterns and best practices",
                type: "video",
                duration: "30 min",
                completed: false,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
                id: 6,
                title: "Final Assessment",
                description: "Test your knowledge with a comprehensive quiz",
                type: "quiz",
                completed: false,
                locked: true
            }
        ]
    },
    2: {
        id: 2,
        progress: 40,
        modules: [
            {
                id: 1,
                title: "JavaScript Fundamentals Review",
                description: "Quick review of JavaScript basics",
                type: "video",
                duration: "25 min",
                completed: true,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
                id: 2,
                title: "Closures and Scope",
                description: "Deep dive into JavaScript closures",
                type: "video",
                duration: "35 min",
                completed: true,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            },
            {
                id: 3,
                title: "Promises and Async/Await",
                description: "Mastering asynchronous JavaScript",
                type: "text",
                completed: false,
                locked: false,
                content: `# Promises and Async/Await in JavaScript

## Understanding Promises

Promises are a fundamental concept in JavaScript for handling asynchronous operations.

### What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

myPromise.then(result => {
  console.log(result); // "Success!"
});
\`\`\`

## Async/Await Syntax

Async/await makes working with promises more readable:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## Common Patterns

### Error Handling
Always handle errors in your async functions:

\`\`\`javascript
async function safeAsyncOperation() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    return null;
  }
}
\`\`\`

Continue practicing with these concepts!`
            },
            {
                id: 4,
                title: "Advanced Array Methods",
                description: "Map, filter, reduce and more",
                type: "video",
                duration: "40 min",
                completed: false,
                locked: false,
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
            }
        ]
    }
};

// Mock auth context for demo
const useAuth = () => ({
    user: { userId: 25, username: 'john_doe' },
    token: 'mock-token'
});

const CourseViewer: React.FC = () => {
    const { user, token } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
    const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
    const [courseContent, setCourseContent] = useState<CourseContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<'dashboard' | 'course' | 'module'>('dashboard');

    useEffect(() => {
        // Mock data for demo - in real app this would come from your backend
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
        setLoading(false);
    }, []);

    const handleCourseSelect = (course: EnrolledCourse) => {
        setSelectedCourse(course);
        const content = mockCourseContent[course.id];
        setCourseContent(content);
        setView('course');
    };

    const handleModuleSelect = (module: CourseModule) => {
        if (module.locked) return;
        setSelectedModule(module);
        setView('module');
    };

    const handleBackToDashboard = () => {
        setView('dashboard');
        setSelectedCourse(null);
        setCourseContent(null);
    };

    const handleBackToCourse = () => {
        setView('course');
        setSelectedModule(null);
    };

    const markModuleComplete = (moduleId: number) => {
        if (courseContent) {
            const updatedModules = courseContent.modules.map(module =>
                module.id === moduleId ? { ...module, completed: true } : module
            );
            setCourseContent({ ...courseContent, modules: updatedModules });
        }
    };

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

    const formatDate = (dateStr: string) => {
        try {
            return new Date(dateStr).toLocaleDateString();
        } catch {
            return 'Invalid Date';
        }
    };

    const renderModuleContent = () => {
        if (!selectedModule) return null;

        switch (selectedModule.type) {
            case 'video':
                return (
                    <div className="space-y-4">
                        <div className="bg-black rounded-lg overflow-hidden">
                            <video
                                controls
                                className="w-full h-96"
                                poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvdXJzZSBWaWRlbzwvdGV4dD4KICA8Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjMwIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMykiLz4KICA8cG9seWdvbiBwb2ludHM9IjM5MCwyMTAgNDEwLDIyNSAzOTAsMjQwIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg=="
                            >
                                <source src={selectedModule.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{selectedModule.title}</h3>
                                <p className="text-gray-600">{selectedModule.description}</p>
                                {selectedModule.duration && (
                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {selectedModule.duration}
                                    </p>
                                )}
                            </div>
                            {!selectedModule.completed && (
                                <Button
                                    onClick={() => markModuleComplete(selectedModule.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Mark Complete
                                </Button>
                            )}
                        </div>
                    </div>
                );

            case 'pdf':
                return (
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">{selectedModule.title}</h3>
                            <p className="text-gray-600 mb-4">{selectedModule.description}</p>
                            <div className="flex gap-2 justify-center">
                                <Button variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View PDF
                                </Button>
                                <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Note: This is a demo. In a real application, the PDF would be displayed here.
                            </p>
                        </div>
                        {!selectedModule.completed && (
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => markModuleComplete(selectedModule.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Mark Complete
                                </Button>
                            </div>
                        )}
                    </div>
                );

            case 'text':
                return (
                    <div className="space-y-4">
                        <div className="prose max-w-none">
                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                {selectedModule.content}
                            </pre>
                        </div>
                        {!selectedModule.completed && (
                            <div className="flex justify-end">
                                <Button
                                    onClick={() => markModuleComplete(selectedModule.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Mark Complete
                                </Button>
                            </div>
                        )}
                    </div>
                );

            case 'quiz':
                return (
                    <div className="text-center py-8">
                        <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Quiz Module</h3>
                        <p className="text-gray-600 mb-4">Complete previous modules to unlock this quiz.</p>
                    </div>
                );

            default:
                return <div>Unknown module type</div>;
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
                {/* Dashboard View */}
                {view === 'dashboard' && (
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
                            <p className="text-gray-600">Welcome back! Track your learning journey.</p>
                        </div>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>My Courses</span>
                                </CardTitle>
                                <CardDescription>Your enrolled courses and their details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {enrolledCourses.map(course => (
                                        <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-xl text-gray-900 mb-2">{course.name}</h3>
                                                    <p className="text-gray-600 mb-3">{course.description}</p>
                                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                                        <span className="flex items-center">
                                                            <User className="h-4 w-4 mr-1" />
                                                            {course.instructor}
                                                        </span>
                                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                                                            {course.category}
                                                        </span>
                                                        <span className="text-green-600 font-medium">
                                                            ${course.price}
                                                        </span>
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
                                                </div>
                                                <Button
                                                    onClick={() => handleCourseSelect(course)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="hover:bg-blue-50 hover:border-blue-200"
                                                >
                                                    {course.status === 'upcoming' ? 'View Details' :
                                                        course.status === 'completed' ? 'Review Course' :
                                                            'Continue Learning'}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Course Content View */}
                {view === 'course' && selectedCourse && courseContent && (
                    <>
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                onClick={handleBackToDashboard}
                                className="mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dashboard
                            </Button>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.name}</h1>
                            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    {selectedCourse.instructor}
                                </span>
                                {getStatusBadge(selectedCourse.status)}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <Card className="mb-6">
                            <CardContent className="p-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Course Progress</span>
                                    <span>{courseContent.progress}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${courseContent.progress}%` }}
                                    ></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Content</CardTitle>
                                <CardDescription>Click on any module to start learning</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {courseContent.modules.map((module, index) => (
                                        <div
                                            key={module.id}
                                            className={`border rounded-lg p-4 transition-colors ${
                                                module.locked
                                                    ? 'bg-gray-50 cursor-not-allowed'
                                                    : 'hover:bg-gray-50 cursor-pointer'
                                            }`}
                                            onClick={() => handleModuleSelect(module)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-lg ${
                                                        module.completed
                                                            ? 'bg-green-100'
                                                            : module.locked
                                                                ? 'bg-gray-100'
                                                                : 'bg-blue-100'
                                                    }`}>
                                                        {module.locked ? (
                                                            <Lock className="h-4 w-4 text-gray-500" />
                                                        ) : module.completed ? (
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        ) : module.type === 'video' ? (
                                                            <PlayCircle className="h-4 w-4 text-blue-600" />
                                                        ) : (
                                                            <FileText className="h-4 w-4 text-blue-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {index + 1}. {module.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">{module.description}</p>
                                                        {module.duration && (
                                                            <p className="text-xs text-gray-500 flex items-center mt-1">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {module.duration}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        {module.type}
                                                    </Badge>
                                                    {module.completed && (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Module Content View */}
                {view === 'module' && selectedModule && (
                    <>
                        <div className="mb-6">
                            <Button
                                variant="ghost"
                                onClick={handleBackToCourse}
                                className="mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Course
                            </Button>
                        </div>

                        <Card>
                            <CardContent className="p-6">
                                {renderModuleContent()}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default CourseViewer;