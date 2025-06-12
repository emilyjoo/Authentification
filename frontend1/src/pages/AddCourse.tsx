import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Book, Calendar, Users, DollarSign, User } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CourseFormData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    maxStudents: number;
    price: number;
    category: string;
    instructorId: string;
}

interface Instructor {
    id: string;
    name: string;
}

const AddCourse: React.FC = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [isFetchingInstructors, setIsFetchingInstructors] = useState(false);
    const { user, token, isAdmin, isInstructor } = useAuth();

    const [formData, setFormData] = useState<CourseFormData>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        maxStudents: 0,
        price: 0,
        category: '',
        instructorId: ''
    });

    // Set instructorId automatically for instructors
    useEffect(() => {
        if (isInstructor() && user?.userId) {
            setFormData(prev => ({
                ...prev,
                instructorId: user.userId.toString()
            }));
        }
    }, [user, isInstructor]);

    // Fetch instructors only if user is admin
    useEffect(() => {
        if (isAdmin()) {
            fetchInstructors();
        }
    }, [isAdmin]);

    const fetchInstructors = async () => {
        setIsFetchingInstructors(true);
        try {
            const response = await fetch('http://localhost:8085/api/users/instructors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch instructors');
            }

            const data = await response.json();
            setInstructors(data);
        } catch (error) {
            console.error('Error fetching instructors:', error);
            toast({
                title: "Error loading instructors",
                description: "Please refresh the page or try again later.",
                variant: "destructive"
            });
        } finally {
            setIsFetchingInstructors(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['maxStudents', 'price'].includes(name) ? Number(value) : value
        }));
    };

    const handleInstructorChange = (value: string) => {
        setFormData(prev => ({ ...prev, instructorId: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast({ title: "Unauthorized", description: "Please log in", variant: "destructive" });
            return;
        }

        const { name, description, startDate, endDate, instructorId, category } = formData;
        if (!name || !description || !startDate || !endDate || !instructorId || !category) {
            toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" });
            return;
        }

        if (new Date(endDate) <= new Date(startDate)) {
            toast({ title: "Invalid dates", description: "End date must be after start date", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        try {
            // Ensure proper data types and handle potential undefined/null values
            const courseData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                startDate: formData.startDate,
                endDate: formData.endDate,
                maxStudents: formData.maxStudents || 0,
                price: formData.price || 0,
                category: formData.category.trim(),
                instructorId: parseInt(formData.instructorId, 10)
            };

            // Validate instructorId is a valid number
            if (isNaN(courseData.instructorId)) {
                throw new Error("Invalid instructor ID");
            }

            console.log('Sending course data:', courseData);

            const response = await fetch('http://localhost:8085/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courseData)
            });

            // If response is successful (2xx), assume course was created
            if (response.ok) {
                toast({
                    title: "Success",
                    description: `Course "${formData.name}" created successfully`,
                });

                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    maxStudents: 0,
                    price: 0,
                    category: '',
                    instructorId: isInstructor() ? (user?.userId?.toString() || '') : ''
                });

                // Navigate based on user role
                navigate(isAdmin() ? '/instructor-dashboard' : '/instructor-dashboard');
                return; // Exit early on success
            }

            // Only try to parse JSON if response is not ok
            let data;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                try {
                    data = await response.json();
                } catch (jsonError) {
                    console.error('JSON parse error:', jsonError);
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
            } else {
                const textResponse = await response.text();
                console.error('Non-JSON response:', textResponse);
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            throw new Error(data?.message || `Server error: ${response.status}`);
        } catch (error: any) {
            console.error("Error creating course:", error);

            // Handle different types of errors
            let errorMessage = "Could not create course";
            if (error.name === 'SyntaxError') {
                errorMessage = "Server response format error. Please try again.";
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast({
                title: "Error",
                description: errorMessage,
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
                    <p className="text-gray-600">Add a new course to the platform</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Book className="h-5 w-5 text-blue-600" />
                            <span>Course Information</span>
                        </CardTitle>
                        <CardDescription>
                            Fill in the details for the new course
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Instructor Selection (only for admins) */}
                            {isAdmin() && (
                                <div className="space-y-2">
                                    <Label htmlFor="instructor" className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>Instructor *</span>
                                    </Label>
                                    <Select
                                        value={formData.instructorId}
                                        onValueChange={handleInstructorChange}
                                        disabled={isFetchingInstructors}
                                    >
                                        <SelectTrigger className={!formData.instructorId ? 'border-red-500' : ''}>
                                            <SelectValue
                                                placeholder={isFetchingInstructors ? "Loading instructors..." : "Select an instructor"}
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="z-50">
                                            {instructors.map((instructor) => (
                                                <SelectItem key={instructor.id} value={instructor.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span>{instructor.id}</span>
                                                        {/* Optional: Add email or other info if available in `instructor` */}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {isFetchingInstructors && (
                                        <p className="text-sm text-gray-500">Loading instructors...</p>
                                    )}
                                </div>
                            )}

                            {/* Show instructor info for logged-in instructors */}
                            {isInstructor() && (
                                <div className="space-y-2">
                                    <Label className="flex items-center space-x-1">
                                        <User className="h-4 w-4" />
                                        <span>Instructor</span>
                                    </Label>
                                    <div className="p-3 bg-blue-50 rounded-md border">
                                        <p className="text-sm text-blue-800">
                                            This course will be assigned to: <strong>{user?.username}</strong>
                                        </p>
                                    </div>
                                </div>
                            )}

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
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Programming, Design, Business"
                                    required
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
                                    onClick={() => navigate(isAdmin() ? '/instructor-dashboard' : '/instructor-dashboard')}
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