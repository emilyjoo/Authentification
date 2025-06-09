
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import NotFound from "./pages/NotFound";
import AddInstructor from "./pages/AddInstructor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
              <Navigation />
              <Routes>
                  <Route path="/" element={<Index />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
