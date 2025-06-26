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
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Import your AuthContext

export const Navbar = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    // Use your AuthContext instead of localStorage
    const { user, logout } = useAuth();

    const handleSignOut = () => {
        console.log("Déconnexion...");
        logout(); // Use your AuthContext logout function
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold text-xl md:text-2xl text-blue-600">
                            StepByStep
                        </span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="text-sm font-medium transition-colors hover:text-blue-500">
                            Home
                        </Link>
                        <Link to="/courses" className="text-sm font-medium transition-colors hover:text-blue-500">
                            Courses
                        </Link>
                        <Link to="/about" className="text-sm font-medium transition-colors hover:text-blue-500">
                            About
                        </Link>
                        <Link to="/contact" className="text-sm font-medium transition-colors hover:text-blue-500">
                            Contact
                        </Link>

                            <>

                            </>

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
                                            alt={user.username || user.email}
                                        />
                                        <AvatarFallback>
                                            {(user.username || user.email).charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user.username || user.email}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={() => navigate('/instructor-dashboard')}>
                                    <Book className="h-4 w-4 mr-2" />
                                    Instructor Dashboard
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate('/student-dashboard')}>
                                    <Book className="h-4 w-4 mr-2" />
                                    My Learning
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                    <User className="h-4 w-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate('/add-instructor')}>
                                    <User className="h-4 w-4 mr-2" />
                                    Add Instructor
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
                                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                                onClick={() => navigate('/auth')}
                            >
                                Login
                            </Button>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={() => navigate('/auth')}
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