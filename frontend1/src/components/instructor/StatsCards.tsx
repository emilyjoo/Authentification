import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Users, Calendar } from 'lucide-react';

interface StatsCardsProps {
    totalCourses: number;
    activeCourses: number;
    totalStudents: number;
    upcomingCourses: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
                                                   totalCourses,
                                                   activeCourses,
                                                   totalStudents,
                                                   upcomingCourses
                                               }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                        <Book className="h-5 w-5 text-blue-600" />
                        <div>
                            <p className="text-2xl font-bold">{totalCourses}</p>
                            <p className="text-sm text-gray-600">Total Courses</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                        <Book className="h-5 w-5 text-green-600" />
                        <div>
                            <p className="text-2xl font-bold">{activeCourses}</p>
                            <p className="text-sm text-gray-600">Active Courses</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <div>
                            <p className="text-2xl font-bold">{totalStudents}</p>
                            <p className="text-sm text-gray-600">Total Students</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-orange-600" />
                        <div>
                            <p className="text-2xl font-bold">{upcomingCourses}</p>
                            <p className="text-sm text-gray-600">Upcoming</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatsCards;