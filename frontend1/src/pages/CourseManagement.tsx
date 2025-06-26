import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LessonForm from '../components/LessonForm';
import QuizForm from '../components/QuizForm';
import { BookPlus, PenLine, Plus } from 'lucide-react';

const CourseManagement: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
                    <p className="text-gray-600">Create and manage lessons, and quizzes</p>
                </div>

                <Tabs defaultValue="courses" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lessons" className="flex items-center gap-2">
                            <PenLine className="h-4 w-4" />
                            Lessons
                        </TabsTrigger>
                        <TabsTrigger value="quizzes" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Quizzes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lessons">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lesson Management</CardTitle>
                                <CardDescription>
                                    Add lessons to your courses with video links, PDFs, and other content
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <LessonForm />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quizzes">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz Management</CardTitle>
                                <CardDescription>
                                    Create quizzes and questions to test student knowledge
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QuizForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default CourseManagement;