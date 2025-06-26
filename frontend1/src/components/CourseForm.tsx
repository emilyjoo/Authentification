import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Course {
    id?: number;
    title: string;
    description: string;
    instructor: string;
}

const CourseForm: React.FC = () => {
    const [course, setCourse] = useState<Course>({
        title: '',
        description: '',
        instructor: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8085/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(course)
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Course created successfully!",
                });
                setCourse({ title: '', description: '', instructor: '' });
            } else {
                throw new Error('Failed to create course');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create course. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof Course, value: string) => {
        setCourse(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter course title"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter course description"
                    rows={4}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                    id="instructor"
                    value={course.instructor}
                    onChange={(e) => handleInputChange('instructor', e.target.value)}
                    placeholder="Enter instructor name"
                    required
                />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Creating Course...' : 'Create Course'}
            </Button>
        </form>
    );
};

export default CourseForm;