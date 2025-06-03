export type User = {
    id: string;
    email: string;
    username: string;
    roles: string[];
} | null;

export type AuthResult = {
    success: boolean;
    data?: any;
    error?: string;
};

export type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<AuthResult>;
    register: (email: string, username: string, password: string) => Promise<AuthResult>;
    logout: () => void;
    loading: boolean;
};