// `frontend/src/components/auth/RegisterForm.tsx`
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface RegisterFormProps {
    onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters long');
            setIsLoading(false);
            return;
        }

        const result = await register(formData.email, formData.username, formData.password);

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
                        <div className="d-flex justify-content-center align-items-center bg-success bg-opacity-10 rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
                            <User className="text-success" size={32} />
                        </div>
                        <h2 className="h4 fw-bold text-dark">Create Account</h2>
                        <p className="text-muted">Join us today</p>
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Username</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <User size={16} />
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Choose username"
                                    required
                                    minLength={3}
                                />
                            </div>
                            <small className="text-muted">At least 3 characters</small>
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Create password"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-outline-secondary"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <small className="text-muted">At least 6 characters</small>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Confirm Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Confirm password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center">
                                <AlertCircle className="me-2" size={16} />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="me-2 spinner-border-sm" />
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            Already have an account?{' '}
                            <button
                                onClick={onToggleForm}
                                className="btn btn-link text-success fw-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;