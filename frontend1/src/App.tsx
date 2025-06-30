import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import CourseManagement from "./pages/CourseManagement";
import ContentBrowser from "./pages/ContentBrowser";
// Import your Navbar component instead of Navigation
import { Navbar } from "./pages/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import NotFound from "./pages/NotFound";
import AddInstructor from "./pages/AddInstructor";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { StudentSatisfactionHero } from "./pages/StudentSatisfactionHero";
import FaqSection from "./pages/FaqSection";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import SatisfactionPage from "@/pages/SatisfactionPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";
import Contact from "@/pages/Contact.tsx";
import CourseViewer from "@/pages/CourseViewer.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    {/* Use your Navbar component here */}

                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route path="/course-viewer/:courseId" element={<CourseViewer />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                            <Route
                                path="/course-management"
                                element={
                                    <ProtectedRoute>
                                        <RoleProtectedRoute requiredRole="ADMIN" fallbackPath="/student-dashboard">
                                        <CourseManagement />
                                        </RoleProtectedRoute>
                                    </ProtectedRoute>
                            }
                        />
                            <Route
                                path="/content-browser"
                                element={
                                    <ProtectedRoute>
                                        <ContentBrowser />
                                    </ProtectedRoute>
                                }
                            />

                            <Route index element={<HomePage />} />
                            <Route path="StudentSatisfactionHero" element={<StudentSatisfactionHero />} />
                            <Route path="faqsection" element={<FaqSection/>} />
                            <Route path="courses/create" element={<CourseDetailPage />} />
                            <Route path="courses/:courseId" element={<CourseDetailPage />} />
                            <Route path="satisfaction" element={<SatisfactionPage/>} />
                            <Route path="about" element={<AboutPage/>} />
                            <Route path="contact" element={<Contact/>} />
                            <Route path="/course-viewer" element={<CourseViewer />} />
                        </Route>
                        <Route path="/" element={<Layout />}>
                        <Route
                            path="/student-dashboard"
                            element={
                                <ProtectedRoute>
                                    <StudentDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/instructor-dashboard"
                            element={
                                <ProtectedRoute>
                                    <RoleProtectedRoute requiredRole="ADMIN" fallbackPath="/student-dashboard">
                                        <InstructorDashboard />
                                    </RoleProtectedRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-course"
                            element={
                                <ProtectedRoute>
                                    <RoleProtectedRoute requiredRole="ADMIN" fallbackPath="/student-dashboard">
                                        <AddCourse />
                                    </RoleProtectedRoute>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-instructor"
                            element={
                                <ProtectedRoute>
                                    <RoleProtectedRoute requiredRole="ADMIN" fallbackPath="/student-dashboard">
                                        <AddInstructor />
                                    </RoleProtectedRoute>
                                </ProtectedRoute>
                            }
                        />
                        </Route>
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;