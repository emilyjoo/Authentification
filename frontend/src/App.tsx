// `frontend/src/App.tsx`
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/dashboard/Dashboard';
import LoadingSpinner from './components/ui/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main App Content Component
const AppContent: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
                <LoadingSpinner size="lg" text="Initializing application..." />
            </div>
        );
    }

    return user ? <Dashboard /> : <AuthPage />;
};

// Main App Component with Provider
const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;