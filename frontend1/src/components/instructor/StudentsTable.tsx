import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from 'lucide-react';

interface Student {
    id: number;
    name: string;
    email: string;
    enrollmentDate: string;
}

interface StudentsTableProps {
    students: Student[];
    selectedCourse: number | null;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
                                                         students,
                                                         selectedCourse
                                                     }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>
                    {selectedCourse ? 'Students in selected course' : 'Select a course to view students'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {selectedCourse ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Enrolled</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-8">
                        <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">Select a course to view enrolled students</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default StudentsTable;