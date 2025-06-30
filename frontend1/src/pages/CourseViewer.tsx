import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    BookOpen,
    Play,
    CheckCircle,
    Clock,
    User,
    Calendar,
    Award,
    FileText,
    ArrowLeft,
    HelpCircle,
    ChevronRight,
    Timer,
    Target
} from 'lucide-react';
import {useParams} from "react-router-dom";

// Mock auth context
import { useAuth } from '@/contexts/AuthContext';

interface Lesson {
    id: number;
    title: string;
    contentUrl: string;
    videoUrl?: string;
    duration?: number;
    orderIndex: number;
    courseId: number;
}

interface Question {
    id: number;
    content: string;
    options: string[];
    correctAnswer: string;
}

interface Quiz {
    id: number;
    title: string;
    description: string;
    courseId: number;
    questions: Question[];
}

interface Course {
    id: number;
    name: string;
    description: string;
    instructor: string;
    startDate: string;
    endDate: string;
    status: string;
}

interface LessonProgress {
    id: number;
    studentId: number;
    lessonId: number;
    completed: boolean;
    completedAt?: string;
}

const CourseViewer: React.FC<{ courseId?: string }> = ({ }) => {
    const { user, token } = useAuth();
    const { courseId } = useParams<{ courseId: string }>();

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [progress, setProgress] = useState<LessonProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);
    const [studentId, setStudentId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!courseId || !user || !user.userId || !token) return;

            try {
                setLoading(true);

                const studentResponse = await fetch(`http://localhost:8085/api/students/user/${user.userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                let currentStudentId = null;
                if (studentResponse.ok) {
                    const student = await studentResponse.json();
                    currentStudentId = student.id;
                    setStudentId(currentStudentId);

                // Fetch course data from enrollment (similar to StudentDashboard)
                const enrollmentResponse = await fetch(`http://localhost:8085/api/enrollments/student/${currentStudentId}/courses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (enrollmentResponse.ok) {
                    const enrollments = await enrollmentResponse.json();
                    const enrollment = enrollments.find((e: any) => e.id.toString() === courseId);

                    if (enrollment) {
                        setCourse({
                            id: enrollment.id,
                            name: enrollment.name,
                            description: enrollment.description,
                            instructor: enrollment.instructorName || 'Unknown Instructor',
                            startDate: enrollment.startDate,
                            endDate: enrollment.endDate,
                            status: 'active'
                        });
                    } else {
                        setError('Course not found in your enrollments');
                        return;
                    }
                } else {
                    setError('Failed to fetch course data');
                    return;
                }} else {
                    setError('Student not found');
                    return;
                }

                // Fetch lessons
                const lessonsResponse = await fetch(`http://localhost:8085/api/lessons/by-course/${courseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (lessonsResponse.ok) {
                    const lessonsData = await lessonsResponse.json();
                    setLessons(lessonsData.sort((a: Lesson, b: Lesson) => a.orderIndex - b.orderIndex));
                    if (lessonsData.length > 0) {
                        setSelectedLesson(lessonsData[0]);
                    }
                }

                // Fetch quiz
                const quizResponse = await fetch(`http://localhost:8085/api/quizzes/course/${courseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (quizResponse.ok) {
                    const quizData = await quizResponse.json();
                    setQuiz(quizData);
                }

                // Fetch progress if student ID is available
                if (currentStudentId) {
                    const progressResponse = await fetch(
                        `http://localhost:8085/api/progress/by-student-and-course?studentId=${currentStudentId}&courseId=${courseId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    );

                    if (progressResponse.ok) {
                        const progressData = await progressResponse.json();
                        setProgress(progressData);
                    }
                }

            } catch (err) {
                console.error('Error fetching course data:', err);
                setError('Failed to load course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId, user, token]);

    const markLessonComplete = async (lessonId: number) => {
        if (!studentId) return;

        try {
            await fetch(`http://localhost:8085/api/progress/complete?studentId=${studentId}&lessonId=${lessonId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Update local progress state
            setProgress(prev => [
                ...prev.filter(p => p.lessonId !== lessonId),
                {
                    id: Date.now(),
                    studentId,
                    lessonId,
                    completed: true,
                    completedAt: new Date().toISOString()
                }
            ]);
        } catch (err) {
            console.error('Error marking lesson complete:', err);
        }
    };

    const submitQuiz = async () => {
        if (!quiz) return;

        try {
            const response = await fetch(`http://localhost:8085/api/quizzes/${quiz.id}/submit`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizAnswers)
            });

            if (response.ok) {
                const result = await response.json();
                setQuizScore(result);
                setQuizSubmitted(true);
            }
        } catch (err) {
            console.error('Error submitting quiz:', err);
        }
    };

    const isLessonCompleted = (lessonId: number) => {
        return progress.some(p => p.lessonId === lessonId && p.completed);
    };

    const getCompletedLessonsCount = () => {
        return progress.filter(p => p.completed).length;
    };

    const getProgressPercentage = () => {
        if (lessons.length === 0) return 0;
        return Math.round((getCompletedLessonsCount() / lessons.length) * 100);
    };


    const handleBackToDashboard = () => {
        window.history.back(); // or use navigate(-1) if you're using useNavigate hook
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading course content...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>Retry</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button variant="ghost" className="mb-4" onClick={handleBackToDashboard}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>

                    {course && (
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h1>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                                        <span className="flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            {course.instructor}
                                        </span>
                                        <span className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(course.startDate).toLocaleDateString()} - {new Date(course.endDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                    {course.status}
                                </Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Progress</span>
                                    <span className="text-sm text-gray-500">
                                        {getCompletedLessonsCount()} of {lessons.length} lessons completed
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{getProgressPercentage()}% complete</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar - Course Content */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>Course Content</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {/* Lessons */}
                                <div className="space-y-1">
                                    <h4 className="font-medium text-gray-900 mb-3">Lessons</h4>
                                    {lessons.map((lesson, index) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setSelectedLesson(lesson);
                                                setShowQuiz(false);
                                            }}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                selectedLesson?.id === lesson.id
                                                    ? 'bg-blue-50 border-blue-200 border'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    {isLessonCompleted(lesson.id) ? (
                                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                                    ) : (
                                                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                                            <span className="text-xs font-medium text-gray-500">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {lesson.title}
                                                    </p>
                                                    {lesson.duration && (
                                                        <p className="text-xs text-gray-500">
                                                            {lesson.duration} min
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Quiz */}
                                {quiz && (
                                    <div className="pt-4 border-t">
                                        <h4 className="font-medium text-gray-900 mb-3">Assessment</h4>
                                        <button
                                            onClick={() => {
                                                setShowQuiz(true);
                                                setSelectedLesson(null);
                                            }}
                                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                showQuiz
                                                    ? 'bg-purple-50 border-purple-200 border'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <HelpCircle className="h-5 w-5 text-purple-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {quiz.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {quiz.questions?.length || 0} questions
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {selectedLesson && !showQuiz && (
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                                            <CardDescription className="flex items-center space-x-4 mt-2">
                                                {selectedLesson.duration && (
                                                    <span className="flex items-center">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        {selectedLesson.duration} minutes
                                                    </span>
                                                )}
                                                <span className="flex items-center">
                                                    <FileText className="h-4 w-4 mr-1" />
                                                    Lesson {lessons.findIndex(l => l.id === selectedLesson.id) + 1} of {lessons.length}
                                                </span>
                                            </CardDescription>
                                        </div>
                                        {!isLessonCompleted(selectedLesson.id) && (
                                            <Button
                                                onClick={() => markLessonComplete(selectedLesson.id)}
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Mark Complete
                                            </Button>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {/* Video Player */}
                                    {selectedLesson.videoUrl && (
                                        <div className="mb-6">
                                            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                                                    <p className="text-lg">Video Player</p>
                                                    <p className="text-sm opacity-70">URL: {selectedLesson.videoUrl}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Lesson Content */}
                                    <div className="prose max-w-none">
                                        <div
                                            className="text-gray-700 leading-relaxed"
                                            dangerouslySetInnerHTML={{ __html: selectedLesson.contentUrl }}
                                        />
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                                        <div>
                                            {lessons.findIndex(l => l.id === selectedLesson.id) > 0 && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
                                                        setSelectedLesson(lessons[currentIndex - 1]);
                                                    }}
                                                >
                                                    Previous Lesson
                                                </Button>
                                            )}
                                        </div>
                                        <div>
                                            {lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1 ? (
                                                <Button
                                                    onClick={() => {
                                                        const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
                                                        setSelectedLesson(lessons[currentIndex + 1]);
                                                    }}
                                                >
                                                    Next Lesson
                                                    <ChevronRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            ) : quiz ? (
                                                <Button
                                                    onClick={() => setShowQuiz(true)}
                                                    className="bg-purple-600 hover:bg-purple-700"
                                                >
                                                    Take Quiz
                                                    <Award className="h-4 w-4 ml-2" />
                                                </Button>
                                            ) : null}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {showQuiz && quiz && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <HelpCircle className="h-6 w-6 text-purple-600" />
                                        <span>{quiz.title}</span>
                                    </CardTitle>
                                    <CardDescription>
                                        {quiz.description}
                                        <div className="flex items-center space-x-4 mt-2 text-sm">
                                            <span className="flex items-center">
                                                <Target className="h-4 w-4 mr-1" />
                                                {quiz.questions?.length || 0} questions
                                            </span>
                                            <span className="flex items-center">
                                                <Timer className="h-4 w-4 mr-1" />
                                                No time limit
                                            </span>
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {!quizSubmitted ? (
                                        <div className="space-y-6">
                                            {quiz.questions?.map((question, index) => (
                                                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                                    <h3 className="font-medium text-lg text-gray-900 mb-4">
                                                        {index + 1}. {question.content}
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {question.options?.map((option, optionIndex) => (
                                                            <label
                                                                key={optionIndex}
                                                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`question-${question.id}`}
                                                                    value={option}
                                                                    onChange={(e) => setQuizAnswers(prev => ({
                                                                        ...prev,
                                                                        [question.id]: e.target.value
                                                                    }))}
                                                                    className="h-4 w-4 text-blue-600"
                                                                />
                                                                <span className="text-gray-700">{option}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="flex justify-center pt-6">
                                                <Button
                                                    onClick={submitQuiz}
                                                    disabled={Object.keys(quizAnswers).length !== (quiz.questions?.length || 0)}
                                                    className="bg-purple-600 hover:bg-purple-700 px-8"
                                                >
                                                    Submit Quiz
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Award className="h-8 w-8 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quiz Completed!</h3>
                                            {quizScore && (
                                                <div className="mb-4">
                                                    <p className="text-lg text-gray-600">
                                                        Your Score: <span className="font-bold text-green-600">
                                                            {quizScore.score} out of {quizScore.total}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {Math.round((quizScore.score / quizScore.total) * 100)}%
                                                    </p>
                                                </div>
                                            )}
                                            <Button
                                                onClick={() => {
                                                    setQuizSubmitted(false);
                                                    setQuizAnswers({});
                                                    setQuizScore(null);
                                                }}
                                                variant="outline"
                                            >
                                                Retake Quiz
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {!selectedLesson && !showQuiz && (
                            <Card>
                                <CardContent className="text-center py-12">
                                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to the Course</h3>
                                    <p className="text-gray-600 mb-6">Select a lesson from the sidebar to begin learning.</p>
                                    {lessons.length > 0 && (
                                        <Button
                                            onClick={() => setSelectedLesson(lessons[0])}
                                            className="bg-blue-600 hover:bg-blue-700"
                                        >
                                            Start First Lesson
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;