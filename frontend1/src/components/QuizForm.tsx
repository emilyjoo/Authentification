import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/components/ui/use-toast';
import {Plus, X} from 'lucide-react';

interface Course {
    id: number;
    title: string;
}

interface Question {
    content: string;
    options: string[];
    correctAnswer: string;
}

interface Quiz {
    title: string;
    courseId: number;
    questions: Question[];
}

const QuizForm: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz>({
        title: '',
        courseId: 0,
        questions: []
    });
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        content: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const {toast} = useToast();

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

            console.log('Fetching courses for quiz with token:', token); // Debug log

            const response = await fetch('http://localhost:8085/api/courses', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Courses response status:', response.status); // Debug log

            if (response.ok) {
                const data = await response.json();
                console.log('Courses data for quiz:', data); // Debug log
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

    const handleAddQuestion = () => {
        if (!currentQuestion.content.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please enter a question",
            });
            return;
        }

        if (currentQuestion.options.some(opt => !opt.trim())) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please fill in all answer options",
            });
            return;
        }

        if (!currentQuestion.correctAnswer) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please select the correct answer",
            });
            return;
        }

        setQuiz(prev => ({
            ...prev,
            questions: [...prev.questions, currentQuestion]
        }));

        setCurrentQuestion({
            content: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        });

        toast({
            title: "Success",
            description: "Question added to quiz!",
        });
    };

    const handleRemoveQuestion = (index: number) => {
        setQuiz(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));

        toast({
            title: "Question Removed",
            description: `Question ${index + 1} has been removed from the quiz.`,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (quiz.courseId === 0) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please select a course",
            });
            return;
        }

        if (!quiz.title.trim()) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please enter a quiz title",
            });
            return;
        }

        if (quiz.questions.length === 0) {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please add at least one question",
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

            // Create quiz data with proper structure
            const quizData = {
                title: quiz.title.trim(),
                courseId: Number(quiz.courseId),
                questions: quiz.questions.map(q => ({
                    content: q.content.trim(),
                    options: q.options.map(opt => opt.trim()),
                    correctAnswer: q.correctAnswer.trim()
                    // Don't include quizId here - let the backend handle the relationship
                })),
                // Alternative: if your backend expects a course object instead of courseId
                course: {
                    id: Number(quiz.courseId)
                }
            };

            console.log('Submitting quiz data:', quizData); // Debug log
            console.log('CourseId type:', typeof quizData.courseId, 'Value:', quizData.courseId);

            const response = await fetch('http://localhost:8085/api/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData)
            });

            console.log('Quiz submit response status:', response.status); // Debug log

            if (response.ok) {
                const createdQuiz = await response.json();
                console.log('Created quiz response:', createdQuiz); // Debug log

                toast({
                    title: "Success",
                    description: "Quiz created successfully!",
                });

                // Reset form
                setQuiz({title: '', courseId: 0, questions: []});
                setCurrentQuestion({
                    content: '',
                    options: ['', '', '', ''],
                    correctAnswer: ''
                });
            } else {
                const errorText = await response.text();
                console.error('Failed to create quiz. Status:', response.status, 'Error:', errorText);
                console.error('Request body was:', JSON.stringify(quizData));

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `Failed to create quiz: ${response.status} - ${errorText}`,
                });
            }
        } catch (error) {
            console.error('Network error while creating quiz:', error);
            toast({
                variant: "destructive",
                title: "Network Error",
                description: "Failed to create quiz. Please check your connection and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuestionOption = (index: number, value: string) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion(prev => ({...prev, options: newOptions}));
    };

    const handleCourseSelect = (value: string) => {
        const courseId = parseInt(value);
        console.log('Selected course ID for quiz:', courseId); // Debug log
        setQuiz(prev => ({...prev, courseId}));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="course">Select Course</Label>
                    {isLoadingCourses ? (
                        <div className="text-sm text-gray-500">Loading courses...</div>
                    ) : (
                        <Select
                            onValueChange={handleCourseSelect}
                            value={quiz.courseId > 0 ? quiz.courseId.toString() : ''}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a course"/>
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
                    <Label htmlFor="quizTitle">Quiz Title</Label>
                    <Input
                        id="quizTitle"
                        value={quiz.title}
                        onChange={(e) => setQuiz(prev => ({...prev, title: e.target.value}))}
                        placeholder="Enter quiz title"
                        required
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Add Question</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="questionContent">Question</Label>
                            <Textarea
                                id="questionContent"
                                value={currentQuestion.content}
                                onChange={(e) => setCurrentQuestion(prev => ({...prev, content: e.target.value}))}
                                placeholder="Enter your question"
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Answer Options</Label>
                            {currentQuestion.options.map((option, index) => (
                                <Input
                                    key={index}
                                    value={option}
                                    onChange={(e) => updateQuestionOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="correctAnswer">Correct Answer</Label>
                            <Select
                                onValueChange={(value) => setCurrentQuestion(prev => ({
                                    ...prev,
                                    correctAnswer: value
                                }))}
                                value={currentQuestion.correctAnswer}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select correct answer"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {currentQuestion.options.map((option, index) => (
                                        option.trim() && (
                                            <SelectItem key={index} value={option}>
                                                Option {index + 1}: {option}
                                            </SelectItem>
                                        )
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="button" onClick={handleAddQuestion} className="w-full">
                            <Plus className="h-4 w-4 mr-2"/>
                            Add Question
                        </Button>
                    </CardContent>
                </Card>

                {quiz.questions.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Quiz Questions ({quiz.questions.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {quiz.questions.map((question, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium">Question {index + 1}</h4>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleRemoveQuestion(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{question.content}</p>
                                        <div className="text-xs text-gray-500 mb-1">
                                            <strong>Options:</strong>
                                            <ol className="list-decimal list-inside ml-2">
                                                {question.options.map((opt, i) => (
                                                    <li key={i} className={opt === question.correctAnswer ? 'text-green-600 font-medium' : ''}>
                                                        {opt} {opt === question.correctAnswer && '✓'}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                <Button type="submit" disabled={isLoading || isLoadingCourses} className="w-full">
                    {isLoading ? 'Creating Quiz...' : 'Create Quiz'}
                </Button>
            </form>

            {/* Debug info - remove in production */}
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <div><strong>Debug Info:</strong></div>
                <div>Selected Course ID: {quiz.courseId}</div>
                <div>Available Courses: {courses.length}</div>
                <div>Questions Added: {quiz.questions.length}</div>
                <div>Token Available: {localStorage.getItem('token') ? 'Yes' : 'No'}</div>
                <div>Current Question Valid: {currentQuestion.content && currentQuestion.options.every(opt => opt) && currentQuestion.correctAnswer ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
};

export default QuizForm;