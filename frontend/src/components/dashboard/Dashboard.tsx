// src/components/dashboard/Dashboard.tsx
import React from 'react';
import { CheckCircle, User, Shield, Settings, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <header className="bg-white shadow-sm border-bottom">
                <div className="container py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: '40px', height: '40px' }}>
                                <Shield className="text-primary" size={24} />
                            </div>
                            <div>
                                <h1 className="h5 fw-bold text-dark mb-0">Dashboard</h1>
                                <p className="text-muted mb-0">Welcome back, {user?.username}!</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-light text-muted">
                                <Bell size={20} />
                            </button>
                            <button className="btn btn-light text-muted">
                                <Settings size={20} />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn btn-danger d-flex align-items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-5">
                {/* Stats Cards */}
                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle" style={{ width: '48px', height: '48px' }}>
                                    <CheckCircle className="text-success" size={24} />
                                </div>
                                <div>
                                    <h5 className="card-title fw-bold text-dark mb-1">Authentication</h5>
                                    <p className="card-text text-muted mb-0">Successfully logged in</p>
                                    <small className="text-success">Active Session</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle" style={{ width: '48px', height: '48px' }}>
                                    <User className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h5 className="card-title fw-bold text-dark mb-1">Profile</h5>
                                    <p className="card-text text-muted mb-0">{user?.email}</p>
                                    <small className="text-primary">ID: {user?.id}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="d-flex align-items-center justify-content-center bg-purple bg-opacity-10 rounded-circle" style={{ width: '48px', height: '48px' }}>
                                    <Shield className="text-purple" size={24} />
                                </div>
                                <div>
                                    <h5 className="card-title fw-bold text-dark mb-1">Role</h5>
                                    <p className="card-text text-muted mb-0">{user?.roles?.join(', ') || 'User'}</p>
                                    <small className="text-purple">Standard Access</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="row g-4">
                    {/* Recent Activity */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="card-title fw-bold text-dark mb-0">Recent Activity</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex align-items-center gap-3">
                                        <span className="badge bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                                        <div>
                                            <p className="mb-0 fw-medium text-dark">Successful Login</p>
                                            <small className="text-muted">Just now</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex align-items-center gap-3">
                                        <span className="badge bg-primary rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                                        <div>
                                            <p className="mb-0 fw-medium text-dark">Profile Accessed</p>
                                            <small className="text-muted">2 minutes ago</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex align-items-center gap-3">
                                        <span className="badge bg-purple rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                                        <div>
                                            <p className="mb-0 fw-medium text-dark">Dashboard Loaded</p>
                                            <small className="text-muted">3 minutes ago</small>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="card-title fw-bold text-dark mb-0">Quick Actions</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <button className="btn btn-primary w-100">
                                            <User size={20} className="me-2" />
                                            Edit Profile
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-success w-100">
                                            <Settings size={20} className="me-2" />
                                            Settings
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-purple w-100">
                                            <Shield size={20} className="me-2" />
                                            Security
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-warning w-100">
                                            <Bell size={20} className="me-2" />
                                            Notifications
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info Panel */}
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-dark mb-4">User Information</h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Email</label>
                                <p className="form-control-plaintext text-dark">{user?.email}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Username</label>
                                <p className="form-control-plaintext text-dark">{user?.username}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-medium">User ID</label>
                                <p className="form-control-plaintext text-dark">{user?.id}</p>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-medium">Roles</label>
                                <p className="form-control-plaintext text-dark">{user?.roles?.join(', ') || 'No roles assigned'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;