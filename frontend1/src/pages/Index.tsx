import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Book, Users, BookOpen, Calendar } from "lucide-react";
import { useEffect, useRef } from "react";

// Icônes personnalisées
const CodeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const DesignIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

const DataIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const FigmaIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" />
      <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 5 0v-5A2.5 2.5 0 0 0 12 2z" />
      <path d="M12 12a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0v-5A2.5 2.5 0 0 1 12 12z" />
      <path d="M7 7a2.5 2.5 0 0 1 5 0v5a2.5 2.5 0 0 1-5 0V7z" />
      <path d="M7 14.5a2.5 2.5 0 0 1 5 0v5a2.5 2.5 0 0 1-5 0v-5z" />
    </svg>
);

const Index = () => {
  const { user } = useAuth();
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bookRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        bookRef.current.style.setProperty('--mouse-x', x.toString());
        bookRef.current.style.setProperty('--mouse-y', y.toString());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with 3D Book */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-100/50 opacity-70" />
            <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1440 700"
            >
              <g mask='url("#SvgjsMask1006")' fill="none">
                <path
                    d="M-165.12 518.54L-82.62 518.54L-82.62 601.04L-165.12 601.04z"
                    fill="rgba(142, 124, 245, 0.1)"
                ></path>
                <path
                    d="M1337.31 325.7L1409.18 325.7L1409.18 397.57L1337.31 397.57z"
                    fill="rgba(142, 124, 245, 0.1)"
                ></path>
                <path
                    d="M123.86 305.86L222.98 305.86L222.98 338.37L123.86 338.37z"
                    fill="rgba(142, 124, 245, 0.1)"
                ></path>
                <path
                    d="M456.52 186.53L527.26 186.53L527.26 254.31L456.52 254.31z"
                    fill="rgba(142, 124, 245, 0.1)"
                ></path>
                <path
                    d="M839.92 560.63L959.01 560.63L959.01 657.3L839.92 657.3z"
                    fill="rgba(142, 124, 245, 0.1)"
                ></path>
              </g>
              <defs>
                <mask id="SvgjsMask1006">
                  <rect width="1440" height="700" fill="#ffffff"></rect>
                </mask>
              </defs>
            </svg>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="py-20 md:py-28 flex flex-col lg:flex-row items-center">
              <div className="max-w-3xl lg:max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">LearnHub</span> E-Learning Platform
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Discover, learn, and grow with our comprehensive e-learning platform.
                  Connect with expert instructors and fellow learners in an interactive environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {!user ? (
                      <>
                        <Button asChild className="text-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white">
                          <Link to="/auth">Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" className="text-lg border-blue-500 text-blue-600 hover:bg-blue-50">
                          <Link to="/courses">Browse Courses</Link>
                        </Button>
                      </>
                  ) : (
                      <>
                        <Button asChild className="text-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white">
                          <Link to="/student-dashboard">
                            <BookOpen className="h-5 w-5 mr-2" />
                            My Learning
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="text-lg border-blue-500 text-blue-600 hover:bg-blue-50">
                          <Link to="/courses">
                            <Book className="h-5 w-5 mr-2" />
                            Browse Courses
                          </Link>
                        </Button>
                      </>
                  )}
                </div>
                <div className="mt-8 flex items-center text-gray-600">
                  <div className="flex mr-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                          <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                    ))}
                  </div>
                  <span>
                  <span className="font-bold">50,000+</span> students worldwide
                </span>
                </div>
              </div>

              {/* Magical 3D Book - Only on large screens */}
              <div
                  ref={bookRef}
                  className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 z-10 w-[400px] h-[300px] perspective-1000"
              >
                <div className="relative w-full h-full transform-style-preserve-3d">
                  {/* Book Cover */}
                  <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-400 rounded-lg shadow-2xl animate-book-float transform-style-preserve-3d">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl rotate-90 origin-left tracking-wider glow-text">LEARNING HUB</span>
                      <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Pages with Tech Content */}
                  <div className="absolute w-[95%] h-[95%] left-[5%] top-[2.5%] transform-style-preserve-3d">
                    {/* Page Développement */}
                    <div className="absolute w-full h-full bg-white rounded-r-lg shadow-md animate-page-turn-1 transform-style-preserve-3d">
                      <div className="absolute inset-0 p-6 bg-gradient-to-br from-white to-blue-50">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <CodeIcon className="text-white w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-blue-600">Full-Stack Development</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="p-2 bg-blue-100 rounded-md">
                            <div className="text-xs font-mono text-blue-800 mb-1">React.js</div>
                            <div className="h-1 w-full bg-blue-300 rounded-full">
                              <div className="h-1 bg-blue-500 rounded-full w-3/4"></div>
                            </div>
                          </div>
                          <div className="p-2 bg-green-100 rounded-md">
                            <div className="text-xs font-mono text-green-800 mb-1">Node.js</div>
                            <div className="h-1 w-full bg-green-300 rounded-full">
                              <div className="h-1 bg-green-500 rounded-full w-2/3"></div>
                            </div>
                          </div>
                          <div className="p-2 bg-purple-100 rounded-md">
                            <div className="text-xs font-mono text-purple-800 mb-1">TypeScript</div>
                            <div className="h-1 w-full bg-purple-300 rounded-full">
                              <div className="h-1 bg-purple-500 rounded-full w-4/5"></div>
                            </div>
                          </div>
                          <div className="p-2 bg-yellow-100 rounded-md">
                            <div className="text-xs font-mono text-yellow-800 mb-1">Python</div>
                            <div className="h-1 w-full bg-yellow-300 rounded-full">
                              <div className="h-1 bg-yellow-500 rounded-full w-3/5"></div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-md">
                          <div className="text-xs font-mono text-gray-800">
                            <span className="text-blue-500">const</span> developer = {'{'}<br />
                            <span className="ml-4">skills: [<span className="text-green-600">'React'</span>, <span className="text-green-600">'Node'</span>],</span><br />
                            <span className="ml-4">level: <span className="text-purple-500">'Senior'</span></span><br />
                            {'}'};
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Page Design */}
                    <div className="absolute w-full h-full bg-white rounded-r-lg shadow-md animate-page-turn-2 transform-style-preserve-3d">
                      <div className="absolute inset-0 p-6 bg-gradient-to-br from-white to-pink-50">
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                            <DesignIcon className="text-white w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold text-pink-600">UI/UX Design</h3>
                        </div>

                        <div className="relative h-32 mb-4">
                          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg"></div>
                          <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg opacity-80">
                            <div className="absolute top-2 left-2 right-2 bottom-2 border border-white/20 rounded"></div>
                          </div>
                          <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-r from-blue-400 to-teal-400 rounded-lg opacity-60">
                            <div className="absolute top-3 left-3 right-3 bottom-3 rounded-full border-2 border-white/30"></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-2 bg-pink-300 rounded-full"></div>
                          <div className="h-2 bg-purple-300 rounded-full"></div>
                          <div className="h-2 bg-blue-300 rounded-full"></div>
                          <div className="h-2 bg-rose-300 rounded-full"></div>
                          <div className="h-2 bg-indigo-300 rounded-full"></div>
                          <div className="h-2 bg-teal-300 rounded-full"></div>
                        </div>

                        <div className="mt-4 text-xs text-gray-500 flex items-center">
                          <FigmaIcon className="w-4 h-4 mr-1" />
                          <span>Figma • Adobe XD • Prototyping • Wireframing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of your original content */}
        <div className="container mx-auto px-4 py-12">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Book className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-2">50+ Courses</h3>
                <p className="text-gray-600">From beginner to advanced levels</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from industry professionals</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-2">Interactive Learning</h3>
                <p className="text-gray-600">Hands-on projects and assessments</p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader>
                <Book className="h-8 w-8 text-blue-600 mb-2"/>
                <CardTitle>Comprehensive Courses</CardTitle>
                <CardDescription>
                  Wide range of courses across multiple disciplines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Frontend & Backend Development</li>
                  <li>• Database Design & Management</li>
                  <li>• Full-stack Technologies</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2"/>
                <CardTitle>Expert Instructors</CardTitle>
                <CardDescription>
                  Learn from experienced industry professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verified industry experience</li>
                  <li>• Personalized learning paths</li>
                  <li>• Direct instructor feedback</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-8 w-8 text-purple-600 mb-2"/>
                <CardTitle>Flexible Learning</CardTitle>
                <CardDescription>
                  Learn at your own pace with flexible schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Self-paced learning modules</li>
                  <li>• Progress tracking</li>
                  <li>• Mobile-friendly platform</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
              {!user ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to start learning?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Join thousands of learners and start your educational journey today.
                      Create an account to access courses and track your progress.
                    </p>
                    <div className="space-x-4">
                      <Link to="/auth">
                        <Button size="lg">
                          Get Started
                        </Button>
                      </Link>
                      <Link to="/courses">
                        <Button variant="outline" size="lg">
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  </>
              ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Welcome back, {user.username}!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Continue your learning journey or explore new courses to expand your skills.
                    </p>
                    <div className="space-x-4">
                      <Link to="/student-dashboard">
                        <Button size="lg">
                          <BookOpen className="h-5 w-5 mr-2" />
                          My Learning
                        </Button>
                      </Link>
                      <Link to="/courses">
                        <Button variant="outline" size="lg">
                          <Book className="h-5 w-5 mr-2" />
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  </>
              )}
            </div>
          </div>
        </div>

        {/* Global Styles */}
        <style>{`
        :root {
          --mouse-x: 0.5;
          --mouse-y: 0.5;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotateY(-5deg) rotateX(5deg);
          }
          50% {
            transform: translateY(-20px) rotateY(5deg) rotateX(-5deg);
          }
        }

        @keyframes pageTurn1 {
          0%, 100% {
            transform: rotateY(0deg);
          }
          25% {
            transform: rotateY(-160deg);
          }
        }

        @keyframes pageTurn2 {
          0%, 30% {
            transform: rotateY(0deg);
          }
          5%, 25% {
            transform: rotateY(-160deg);
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }

        .animate-book-float {
          animation: float 8s ease-in-out infinite;
          transform-origin: center;
          transform: 
            rotateY(calc(-5deg + (var(--mouse-x) * 10deg)))
            rotateX(calc(5deg + (var(--mouse-y) * -10deg)));
          box-shadow: 0 20px 50px -10px rgba(59, 130, 246, 0.4);
        }

        .animate-page-turn-1 {
          animation: pageTurn1 16s ease-in-out infinite;
          transform-origin: left center;
          box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
        }

        .animate-page-turn-2 {
          animation: pageTurn2 16s ease-in-out infinite;
          transform-origin: left center;
          box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
        }

        .glow-text {
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }
      `}</style>
      </div>
  );
};

export default Index;