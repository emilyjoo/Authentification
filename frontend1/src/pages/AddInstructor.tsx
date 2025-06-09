import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth} from '../contexts/AuthContext';
import { UserPlus, ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface InstructorFormData {
    name: string;
    email: string;
    specialization: string;
    userId: string;
}

interface AppUser {
    id: number;
    username: string;
    email: string;
    role: string;
}

const AddInstructor: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<AppUser[]>([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InstructorFormData>();
    const { token } = useAuth();
    // Fetch users with INSTRUCTOR role on component mount
    useEffect(() => {
        const fetchInstructorUsers = async () => {
            try {
                const response = await fetch('http://localhost:8085/api/users/instructors', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const userData = await response.json();
                setUsers(userData);

            } catch (error) {
                console.error('Error fetching instructor users:', error);
                alert('Failed to load instructor users. Please refresh the page.');
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchInstructorUsers();
    }, []);

    const onSubmit = async (data: InstructorFormData) => {
        if (!selectedUserId) {
            alert('Please select a user for this instructor profile.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8085/api/instructors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    specialization: data.specialization,
                    user: {
                        id: parseInt(selectedUserId)
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add instructor');
            }

            const result = await response.json();
            console.log('Instructor added successfully:', result);
            alert('Instructor added successfully!');
            reset();
            setSelectedUserId('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding instructor:', error);
            alert(`Failed to add instructor: ${error instanceof Error ? error.message : 'Please try again.'}`);
        }
    };

    const handleUserSelect = (userId: string) => {
        setSelectedUserId(userId);
        // Optionally auto-fill email from selected user
        const selectedUser = users.find(u => u.id.toString() === userId);
        if (selectedUser) {
            setValue('email', selectedUser.email);
        }
    };

    const resetForm = () => {
        reset();
        setSelectedUserId('');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link
                        to="/instructor-dashboard"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Instructor</h1>
                    <p className="text-gray-600">Create a new instructor profile for the platform.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Instructor Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* User Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="user">Select User</Label>
                                <Select
                                    value={selectedUserId}
                                    onValueChange={handleUserSelect}
                                    disabled={loadingUsers}
                                >
                                    <SelectTrigger className={!selectedUserId ? 'border-red-500' : ''}>
                                        <SelectValue
                                            placeholder={loadingUsers ? "Loading instructor users..." : "Select an instructor user"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    <span>{user.username}</span>
                                                    <span className="text-sm text-gray-500">({user.email})</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {!selectedUserId && (
                                    <p className="text-sm text-red-500">Please select a user</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Choose a user with INSTRUCTOR role to create instructor profile
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter instructor's full name"
                                    {...register('name', {
                                        required: 'Instructor name is required',
                                        minLength: { value: 3, message: 'Name must be at least 3 characters' },
                                        maxLength: { value: 100, message: 'Name must not exceed 100 characters' },
                                        pattern: {
                                            value: /^[a-zA-Z\s]*$/,
                                            message: 'Name can only contain letters and spaces'
                                        }
                                    })}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="instructor@gmail.com"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-z0-9+_.-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/,
                                            message: 'Email must be lowercase and from a valid provider (gmail.com, yahoo.com, outlook.com, hotmail.com)'
                                        }
                                    })}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Email must be from: gmail.com, yahoo.com, outlook.com, or hotmail.com
                                    {selectedUserId && " (Auto-filled from selected user)"}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialization">Specialization</Label>
                                <Input
                                    id="specialization"
                                    type="text"
                                    placeholder="e.g., Computer Science, Mathematics, Physics"
                                    {...register('specialization', {
                                        required: 'Specialization is required',
                                        minLength: { value: 2, message: 'Specialization must be at least 2 characters' },
                                        maxLength: { value: 100, message: 'Specialization must not exceed 100 characters' }
                                    })}
                                    className={errors.specialization ? 'border-red-500' : ''}
                                />
                                {errors.specialization && (
                                    <p className="text-sm text-red-500">{errors.specialization.message}</p>
                                )}
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-medium text-blue-900 mb-2">Instructor Profile</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Will be linked to the selected user account with INSTRUCTOR role</li>
                                    <li>• Will be able to create and manage courses</li>
                                    <li>• Can view and manage enrolled students</li>
                                    <li>• Access to teaching dashboard and analytics</li>
                                    <li>• Upload and manage course materials</li>
                                </ul>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1" disabled={!selectedUserId}>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add Instructor
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Reset Form
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AddInstructor;