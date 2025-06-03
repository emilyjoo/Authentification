// `frontend/src/components/auth/LoginForm.tsx`
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
    onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error || 'An unknown error occurred');
        }

        setIsLoading(false);
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow border-0" style={{ maxWidth: '400px' }}>
                <div className="card-body p-4">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <div className="d-flex justify-content-center align-items-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                            <Shield className="text-primary" size={32} />
                        </div>
                        <h2 className="h4 fw-bold text-dark">Welcome Back</h2>
                        <p className="text-muted">Sign in to your account</p>
                    </div>

                    {/* Demo credentials */}
                    <div className="alert alert-info d-flex align-items-center mb-4">
                        <Mail className="me-2 text-info" size={16} />
                        <p className="mb-0">Demo: demo@gmail.com / Demo123!</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Mail size={16} />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-outline-secondary"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center">
                                <AlertCircle className="me-2 text-danger" size={16} />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="me-2 spinner-border-sm" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            Don't have an account?{' '}
                            <button
                                onClick={onToggleForm}
                                className="btn btn-link text-primary fw-medium"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;