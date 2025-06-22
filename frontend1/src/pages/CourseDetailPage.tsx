import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LessonList } from "@/components/LessonList";
import { mockCourses } from "@/data/mockData";
import { Heart, Share2, Award, Clock, Users, BarChart } from "lucide-react";

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === courseId);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Course not found</h1>
        <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-skillspark-500 hover:bg-skillspark-600 transition-all duration-300 transform hover:scale-105 shadow-md">
          <Link to="/courses">Browse Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-r from-skillspark-500 to-skillspark-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <span className="flex items-center bg-yellow-500/20 px-3 py-1 rounded-full">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{course.rating}</span>
                </span>
                <span className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{course.studentsCount} students</span>
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </span>
                <span className="capitalize flex items-center">
                  <BarChart size={16} className="mr-1" />
                  <span>{course.level}</span>
                </span>
              </div>
              
              <p className="text-white/90 mb-6 flex items-center">
                <img 
                  src="https://i.pravatar.cc/150?img=48" 
                  alt={course.instructorName}
                  className="w-8 h-8 rounded-full mr-2 border-2 border-white/50"
                />
                Created by <span className="font-medium ml-1">{course.instructorName}</span>
              </p>
              
              <p className="text-white/80 text-sm">
                Last updated {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl border shadow-sm p-8 mb-8 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">About This Course</h2>
              <p className="mb-8 text-gray-700 leading-relaxed">{course.description}</p>
              
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <Award className="text-skillspark-500 mr-2" size={20} />
                What You'll Learn
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  "Build professional websites from scratch",
                  "Create responsive designs for all devices",
                  "Understand modern web development practices",
                  "Apply best practices for performance",
                  "Deploy your projects to production",
                  "Work with real-world examples and projects"
                ].map((item, index) => (
                  <li key={index} className="flex items-start bg-skillspark-50 p-3 rounded-lg">
                    <span className="text-skillspark-500 mr-2 font-bold text-lg">✓</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <Clock className="text-skillspark-500 mr-2" size={20} />
                Requirements
              </h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Basic computer skills",
                  "No prior programming experience needed",
                  "A computer with internet access"
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="inline-block w-2 h-2 bg-skillspark-500 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-5 flex items-center">
                <Users className="text-skillspark-500 mr-2" size={20} />
                Who This Course is For
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {[
                  "Beginners interested in web development",
                  "Students looking to build practical skills",
                  "Professionals wanting to expand their skillset",
                  "Anyone curious about creating websites"
                ].map((item, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-skillspark-100 text-skillspark-600 flex items-center justify-center mr-3 text-xs font-bold">{index + 1}</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl border shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4">Meet Your Instructor</h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=48"
                    alt={course.instructorName}
                    className="w-24 h-24 rounded-full object-cover border-4 border-skillspark-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-skillspark-500 text-white rounded-full p-1">
                    <Award size={16} />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-skillspark-700">{course.instructorName}</h3>
                  <p className="text-skillspark-500 font-medium mb-2">{course.category} Expert</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-medium">4.8</span>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      <span className="font-medium">24</span> Courses
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
                      <span className="font-medium">12,540</span> Students
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Jane Smith is an experienced web developer with over 10 years of industry experience.
                    She has worked with major tech companies and specializes in frontend development and
                    teaching beginners how to code. Her teaching approach focuses on practical, real-world
                    examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Course Card */}
              <div className="bg-white rounded-xl border shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-white/90 text-skillspark-700 px-2 py-1 rounded text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl font-bold text-skillspark-700">${course.price}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                      >
                        <Heart className={isWishlisted ? "fill-red-500 text-red-500" : ""} size={18} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="rounded-full"
                      >
                        <Share2 size={18} />
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-skillspark-500 hover:bg-skillspark-600 mb-3 py-6 text-lg font-medium shadow-lg shadow-skillspark-200 hover:shadow-skillspark-300 transition-all duration-300 transform hover:scale-105">
                    Enroll Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mb-6 border-skillspark-200 text-skillspark-700 hover:bg-skillspark-50"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                  
                  <div className="space-y-4 text-sm border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lessons</span>
                      <span className="font-medium">{course.lessons.length} lessons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Access</span>
                      <span className="font-medium">Lifetime</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Guarantee</span>
                      <span className="font-medium text-green-600">30-day money-back</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Lessons Card */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="text-skillspark-500 mr-2" size={18} />
                  Course Content
                </h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-4 pb-4 border-b">
                    <span className="bg-skillspark-100 text-skillspark-700 px-2 py-1 rounded-md">
                      {course.lessons.length} lessons
                    </span>
                    <span className="bg-skillspark-100 text-skillspark-700 px-2 py-1 rounded-md">
                      {course.duration} total
                    </span>
                  </div>
                </div>
                <LessonList lessons={course.lessons} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};