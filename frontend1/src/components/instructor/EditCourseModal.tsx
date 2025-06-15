import React, {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import { Users, DollarSign, Calendar } from 'lucide-react';

interface InstructorCourse {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    enrollmentCount: number;
    maxStudents: number;
    price: number;
    category: string;
    status: 'active' | 'completed' | 'upcoming';
}

interface EditCourseModalProps {
    course: InstructorCourse;
    onSave: (course: InstructorCourse) => void;
    onCancel: () => void;
    isLoading: boolean;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
                                                             course,
                                                             onSave,
                                                             onCancel,
                                                             isLoading
                                                         }) => {
    const [formData, setFormData] = useState({
        name: course.name,
        description: course.description,
        startDate: course.startDate,
        endDate: course.endDate,
        maxStudents: course.maxStudents || 0,
        price: course.price || 0,
        category: course.category || '',
        status: course.status
    });

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate dates
        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            return; // You might want to show an error message here
        }

        onSave({
            ...course,
            ...formData
        });
    };

    return (
        <Dialog open={true} onOpenChange={onCancel}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Course Name */}
                    <div>
                        <Label htmlFor="courseName">Course Name *</Label>
                        <Input
                            id="courseName"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="e.g., Introduction to React"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="courseDescription">Description *</Label>
                        <Textarea
                            id="courseDescription"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe what students will learn in this course..."
                            rows={3}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Input
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            placeholder="e.g., Programming, Design, Business"
                            required
                        />
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="startDate" className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>Start Date *</span>
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="endDate" className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>End Date *</span>
                            </Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Max Students and Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="maxStudents" className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>Max Students</span>
                            </Label>
                            <Input
                                id="maxStudents"
                                type="number"
                                min="1"
                                value={formData.maxStudents || ''}
                                onChange={(e) => handleInputChange('maxStudents', Number(e.target.value))}
                                placeholder="e.g., 50"
                            />
                        </div>
                        <div>
                            <Label htmlFor="price" className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>Price ($)</span>
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price || ''}
                                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                                placeholder="e.g., 99.99"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditCourseModal;