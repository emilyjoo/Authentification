import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, Users, DollarSign } from 'lucide-react';

interface CourseFormData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    maxStudents: number;
    price: number;
    category: string;
}

const AddCourse: React.FC = () => {
    const { user, token } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<CourseFormData>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        maxStudents: 0,
        price: 0,
        category: ''
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'maxStudents' || name === 'price' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast({
                title: "Authentication Required",
                description: "Please log in to create a course.",
                variant: "destructive"
            });
            return;
        }

        // Basic form validation
        if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            return;
        }
        // Validate dates
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        if (endDate <= startDate) {
            toast({
                title: "Invalid Dates",
                description: "End date must be after start date.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8082/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    instructorId: user?.userId
                })
            });
            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Course Created Successfully",
                    description: `${formData.name} has been added to your courses.`
                });

                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    maxStudents: 0,
                    price: 0,
                    category: ''
                });

                // Navigate to instructor dashboard
                navigate('/instructor-dashboard');
            } else {
                toast({
                    title: "Failed to Create Course",
                    description: data.message || "An error occurred while creating the course.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Course creation error:', error);
            toast({
                title: "Network Error",
                description: "Unable to connect to the server. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
                    <p className="text-gray-600">Add a new course to your teaching portfolio</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Book className="h-5 w-5 text-blue-600" />
                            <span>Course Information</span>
                        </CardTitle>
                        <CardDescription>
                            Fill in the details for your new course
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Course Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Course Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Introduction to React"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe what students will learn in this course..."
                                    rows={4}
                                    required
                                />
                            </div>
                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Programming, Design, Business"
                                />
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate" className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Start Date *</span>
                                    </Label>
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate" className="flex items-center space-x-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>End Date *</span>
                                    </Label>
                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            {/* Max Students and Price */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="maxStudents" className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>Max Students</span>
                                    </Label>
                                    <Input
                                        id="maxStudents"
                                        name="maxStudents"
                                        type="number"
                                        min="1"
                                        value={formData.maxStudents || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="flex items-center space-x-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span>Price ($)</span>
                                    </Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price || ''}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 99.99"
                                    />
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex space-x-4 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1"
                                >
                                    {isLoading ? 'Creating Course...' : 'Create Course'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate('/instructor-dashboard')}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddCourse;