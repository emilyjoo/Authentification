import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Certificate from './Certificate';

interface CertificateDialogProps {
    isOpen: boolean;
    onClose: () => void;
    courseName: string;
    studentName: string;
    completionDate: string;
    instructor: string;
}

const CertificateDialog: React.FC<CertificateDialogProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 courseName,
                                                                 studentName,
                                                                 completionDate,
                                                                 instructor
                                                             }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Your Certificate</DialogTitle>
                </DialogHeader>
                <Certificate
                    courseName={courseName}
                    studentName={studentName}
                    completionDate={completionDate}
                    instructor={instructor}
                    onDownload={() => {
                        // Optional: Close dialog after download
                        // onClose();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CertificateDialog;