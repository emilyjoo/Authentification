// `frontend/src/components/ui/LoadingSpinner.tsx`
import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
                                                           size = 'md',
                                                           text = 'Loading...',
                                                           className = ''
                                                       }) => {
    const sizeClasses = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    };

    const textSizeClasses = {
        sm: 'fs-6',
        md: 'fs-5',
        lg: 'fs-4'
    };

    return (
        <div className={`d-flex align-items-center justify-content-center gap-2 ${className}`}>
            <div className={`spinner-border text-primary ${sizeClasses[size]}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            {text && (
                <p className={`text-muted mb-0 ${textSizeClasses[size]}`}>
                    {text}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;