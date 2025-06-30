import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Award } from 'lucide-react';

interface CertificateProps {
    courseName: string;
    studentName: string;
    completionDate: string;
    instructor: string;
    onDownload?: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
                                                     courseName,
                                                     studentName,
                                                     completionDate,
                                                     instructor,
                                                     onDownload
                                                 }) => {
    const handleDownload = () => {
        // Create a canvas to generate the certificate image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Inner border
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Title
        ctx.fillStyle = '#1e40af';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Completion', canvas.width / 2, 120);

        // Decorative line
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(200, 140);
        ctx.lineTo(600, 140);
        ctx.stroke();

        // Student name
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('This certifies that', canvas.width / 2, 200);

        ctx.fillStyle = '#059669';
        ctx.font = 'bold 40px Arial';
        ctx.fillText(studentName, canvas.width / 2, 260);

        // Course completion text
        ctx.fillStyle = '#374151';
        ctx.font = '24px Arial';
        ctx.fillText('has successfully completed the course', canvas.width / 2, 320);

        // Course name
        ctx.fillStyle = '#1e40af';
        ctx.font = 'bold 32px Arial';
        ctx.fillText(`"${courseName}"`, canvas.width / 2, 370);

        // Date and instructor
        ctx.fillStyle = '#6b7280';
        ctx.font = '20px Arial';
        ctx.fillText(`Completed on: ${new Date(completionDate).toLocaleDateString()}`, canvas.width / 2, 440);
        ctx.fillText(`Instructor: ${instructor}`, canvas.width / 2, 470);

        // Download the certificate
        const link = document.createElement('a');
        link.download = `${studentName}_${courseName}_Certificate.png`;
        link.href = canvas.toDataURL();
        link.click();

        if (onDownload) onDownload();
    };

    return (
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <div className="text-center space-y-6">
                <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                        <Award className="h-12 w-12 text-blue-600" />
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-blue-900 mb-2">Certificate of Completion</h2>
                    <div className="w-24 h-1 bg-blue-300 mx-auto"></div>
                </div>

                <div className="space-y-4">
                    <p className="text-lg text-gray-700">This certifies that</p>
                    <p className="text-2xl font-bold text-green-700">{studentName}</p>
                    <p className="text-lg text-gray-700">has successfully completed the course</p>
                    <p className="text-xl font-semibold text-blue-800">"{courseName}"</p>
                </div>

                <div className="space-y-2 text-gray-600">
                    <p>Completed on: {new Date(completionDate).toLocaleDateString()}</p>
                    <p>Instructor: {instructor}</p>
                </div>

                <Button
                    onClick={handleDownload}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                </Button>
            </div>
        </Card>
    );
};

export default Certificate;