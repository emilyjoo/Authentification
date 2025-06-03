// src/components/auth/AuthPage.tsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                {isLogin ? (
                    <LoginForm onToggleForm={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onToggleForm={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;