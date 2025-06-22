import { useState } from "react";
    import { Link } from "react-router-dom";
    import { CourseCard } from "@/components/CourseCard";
    import { CategoryFilter } from "@/components/CategoryFilter";
    import  Index  from "@/pages/Index";
    import { mockCourses } from "@/data/mockData";
    import { Button } from "@/components/ui/button";
    import { StudentSatisfactionHero } from "@/pages/StudentSatisfactionHero";

    import FaqSection from "./FaqSection";
    import AboutPage from "./AboutPage";

    export const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(
    new Set(mockCourses.map((course) => course.category))
    );

    const filteredCourses = selectedCategory
    ? mockCourses.filter((course) => course.category === selectedCategory)
    : mockCourses;

    const featuredCourses = filteredCourses.slice(0, 3);
    const popularCourses = [...filteredCourses]
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, 3);

    return (
        <div>
            <Index/>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Explore our handpicked selection of top-rated courses to boost your skills
                        </p>
                    </div>

                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map((course) => (
                            <CourseCard key={course.id} course={course}/>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button asChild className="bg-skillspark-500 hover:bg-skillspark-600">
                            <Link to="/courses">View All Courses</Link>
                        </Button>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-skillspark-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
                                alt="Teach on SkillSpark"
                                className="rounded-lg shadow-lg object-cover w-full"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Share your expertise with our global community. Create engaging courses,
                                build your audience, and earn revenue while making a difference in students' lives.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <span className="text-skillspark-500 mr-2">&#10003;</span>
                                    <span>Reach students around the world</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-skillspark-500 mr-2">&#10003;</span>
                                    <span>Earn revenue from course sales</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-skillspark-500 mr-2">&#10003;</span>
                                    <span>Get support with course creation</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-skillspark-500 mr-2">&#10003;</span>
                                    <span>Join our community of expert instructors</span>
                                </li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button asChild className="bg-skillspark-500 hover:bg-skillspark-600 text-white">
                                    <Link to="/become-instructor">Start Teaching Today</Link>
                                </Button>
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                >
                                    <Link to="/auth">Join Now</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <FaqSection/>
            </section>
            <section>
                <StudentSatisfactionHero/>
            </section>


        </div>
    );
    };