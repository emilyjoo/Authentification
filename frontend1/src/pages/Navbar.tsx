import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Book, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    avatar?: string;
    role: 'student' | 'instructor' | 'admin';
}

export const Navbar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté au chargement
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erreur lors de la lecture des données utilisateur:", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleSignOut = () => {
        console.log("Déconnexion...");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold text-xl md:text-2xl text-skillspark-600">
                            StepByStep
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                            Home
                        </Link>
                        <Link to="/courses" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                            Courses
                        </Link>
                        <Link to="/instructors" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                            Instructors
                        </Link>
                        <Link to="/about" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                            About
                        </Link>
                        {user?.role === 'instructor' && (
                            <Link to="/instructor/courses" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                                My Courses
                            </Link>
                        )}
                        {user?.role === 'admin' && (
                            <Link to="/admin" className="text-sm font-medium transition-colors hover:text-skillspark-500">
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <div className={`hidden md:block ${searchOpen ? 'w-72' : 'w-48'} transition-all duration-300`}>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search courses..."
                                className="pl-8"
                                onFocus={() => setSearchOpen(true)}
                                onBlur={() => setSearchOpen(false)}
                            />
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => navigate('/dashboard')}
                    >
                        <Book className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                    <Book className="h-4 w-4 mr-2" />
                                    Dashboard
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate('/profile')}>
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate('/settings')}>
                                    <Settings className="h-4 w-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="hover:bg-skillspark-50 hover:text-skillspark-600 hover:border-skillspark-300"
                                onClick={() => navigate('/auth/login')}
                            >
                                Login
                            </Button>
                            <Button
                                className="bg-skillspark-500 hover:bg-skillspark-600 text-white"
                                onClick={() => navigate('/auth/signup')}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};