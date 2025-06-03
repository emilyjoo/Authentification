import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:8085/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, id, email: userEmail, username, roles } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id,
                email: userEmail,
                username,
                roles
            }));

            return { success: true, data: response.data };
        } catch (error: unknown) {
            const errorMessage = (error as any)?.response?.data?.message || 'Invalid credentials';
            return {
                success: false,
                error: errorMessage
            };
        }
    },

    register: async (email: string, username: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
        try {
            const response = await api.post('/auth/register', {
                email,
                username,
                password
            });

            const { token, id, email: userEmail, username: userUsername, roles } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({
                id,
                email: userEmail,
                username: userUsername,
                roles
            }));

            return { success: true, data: response.data };
        } catch (error: unknown) {
            const errorMessage = (error as any)?.response?.data?.message || 'Registration failed';
            return {
                success: false,
                error: errorMessage
            };
        }
    },

    logout: (): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): any | null => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    }
};