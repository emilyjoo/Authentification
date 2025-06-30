import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    description: string;
    instructor: string;
}

interface Lesson {
    id: number;
    title: string;
    contentUrl: string;
    lessonOrder: number;
    course: Course;
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
    course: Course;
    questions: Question[];
}

const ContentBrowser: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const { toast } = useToast();
    const fetchLessons = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8085/api/lessons', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLessons(data);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch lessons",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchQuizzes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8085/api/quizzes', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setQuizzes(data);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to fetch quizzes",
            });
        } finally {
            setIsLoading(false);
        }
    };
    const deleteLesson = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8085/api/lessons/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setLessons(lessons.filter(lesson => lesson.id !== id));
                toast({
                    title: "Success",
                    description: "Lesson deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete lesson",
            });
        }
    };

    const deleteQuiz = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8085/api/quizzes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setQuizzes(quizzes.filter(quiz => quiz.id !== id));
                toast({
                    title: "Success",
                    description: "Quiz deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete quiz",
            });
        }
    };
    const updateLesson = async (lesson: Lesson) => {
        try {
            const response = await fetch(`http://localhost:8085/api/lessons/${lesson.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(lesson)
            });
            if (response.ok) {
                const updatedLesson = await response.json();
                setLessons(lessons.map(l => l.id === lesson.id ? updatedLesson : l));
                setEditingLesson(null);
                toast({
                    title: "Success",
                    description: "Lesson updated successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update lesson",
            });
        }
    };

    const updateQuiz = async (quiz: Quiz) => {
        try {
            const response = await fetch(`http://localhost:8085/api/quizzes/${quiz.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(quiz)
            });
            if (response.ok) {
                const updatedQuiz = await response.json();
                setQuizzes(quizzes.map(q => q.id === quiz.id ? updatedQuiz : q));
                setEditingQuiz(null);
                toast({
                    title: "Success",
                    description: "Quiz updated successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update quiz",
            });
        }
    };

    useEffect(() => {
        fetchLessons();
        fetchQuizzes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Browser</h1>
                    <p className="text-gray-600">Browse, edit, and manage your lessons and quizzes</p>
                </div>

                <Tabs defaultValue="lessons" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lessons">Lessons</TabsTrigger>
                        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="lessons">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lessons</CardTitle>
                                <CardDescription>Manage your course lessons</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center py-4">Loading lessons...</div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Order</TableHead>
                                                <TableHead>Content URL</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {lessons.map((lesson) => (
                                                <TableRow key={lesson.id}>
                                                    <TableCell className="font-medium">{lesson.title}</TableCell>
                                                    <TableCell>{lesson.lessonOrder}</TableCell>
                                                    <TableCell className="max-w-xs truncate">{lesson.contentUrl}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm" onClick={() => setEditingLesson(lesson)}>
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Lesson</DialogTitle>
                                                                        <DialogDescription>Make changes to the lesson</DialogDescription>
                                                                    </DialogHeader>
                                                                    {editingLesson && (
                                                                        <EditLessonForm
                                                                            lesson={editingLesson}
                                                                            onSave={updateLesson}
                                                                            onCancel={() => setEditingLesson(null)}
                                                                        />
                                                                    )}
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => deleteLesson(lesson.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quizzes">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quizzes</CardTitle>
                                <CardDescription>Manage your course quizzes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="text-center py-4">Loading quizzes...</div>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Questions</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {quizzes.map((quiz) => (
                                                <TableRow key={quiz.id}>
                                                    <TableCell className="font-medium">{quiz.title}</TableCell>
                                                    <TableCell>{quiz.questions?.length || 0}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm" onClick={() => setEditingQuiz(quiz)}>
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-2xl">
                                                                    <DialogHeader>
                                                                        <DialogTitle>Edit Quiz</DialogTitle>
                                                                        <DialogDescription>Make changes to the quiz</DialogDescription>
                                                                    </DialogHeader>
                                                                    {editingQuiz && (
                                                                        <EditQuizForm
                                                                            quiz={editingQuiz}
                                                                            onSave={updateQuiz}
                                                                            onCancel={() => setEditingQuiz(null)}
                                                                        />
                                                                    )}
                                                                </DialogContent>
                                                            </Dialog>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => deleteQuiz(quiz.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

const EditLessonForm: React.FC<{
    lesson: Lesson;
    onSave: (lesson: Lesson) => void;
    onCancel: () => void;
}> = ({ lesson, onSave, onCancel }) => {
    const [formData, setFormData] = useState(lesson);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="contentUrl">Content URL</Label>
                <Input
                    id="contentUrl"
                    value={formData.contentUrl}
                    onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="lessonOrder">Lesson Order</Label>
                <Input
                    id="lessonOrder"
                    type="number"
                    value={formData.lessonOrder}
                    onChange={(e) => setFormData({ ...formData, lessonOrder: parseInt(e.target.value) })}
                    required
                />
            </div>
            <div className="flex gap-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};
const EditQuizForm: React.FC<{
    quiz: Quiz;
    onSave: (quiz: Quiz) => void;
    onCancel: () => void;
}> = ({ quiz, onSave, onCancel }) => {
    const [formData, setFormData] = useState(quiz);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            id: 0,
            content: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        };
        setFormData({
            ...formData,
            questions: [...(formData.questions || []), newQuestion]
        });
    };

    const updateQuestion = (index: number, question: Question) => {
        const updatedQuestions = [...(formData.questions || [])];
        updatedQuestions[index] = question;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = formData.questions?.filter((_, i) => i !== index) || [];
        setFormData({ ...formData, questions: updatedQuestions });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
            <div>
                <Label htmlFor="quizTitle">Quiz Title</Label>
                <Input
                    id="quizTitle"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <Label>Questions</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Question
                    </Button>
                </div>

                {formData.questions?.map((question, index) => (
                    <Card key={index} className="mb-4">
                        <CardContent className="pt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <Label>Question {index + 1}</Label>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeQuestion(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Textarea
                                    value={question.content}
                                    onChange={(e) => updateQuestion(index, { ...question, content: e.target.value })}
                                    placeholder="Enter question"
                                    required
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    {question.options.map((option, optionIndex) => (
                                        <Input
                                            key={optionIndex}
                                            value={option}
                                            onChange={(e) => {
                                                const newOptions = [...question.options];
                                                newOptions[optionIndex] = e.target.value;
                                                updateQuestion(index, { ...question, options: newOptions });
                                            }}
                                            placeholder={`Option ${optionIndex + 1}`}
                                            required
                                        />
                                    ))}
                                </div>
                                <Input
                                    value={question.correctAnswer}
                                    onChange={(e) => updateQuestion(index, { ...question, correctAnswer: e.target.value })}
                                    placeholder="Correct answer"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex gap-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};

export default ContentBrowser;