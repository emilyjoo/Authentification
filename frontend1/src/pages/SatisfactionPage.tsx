import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Fullstack Developer",
    company: "TechCorp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial: "Thanks to ByteBoostCampus, I was able to acquire the skills needed to land my first job as a fullstack developer. The quality of the courses and the support from instructors were exceptional.",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Dubois",
    role: "Cybersecurity Expert",
    company: "SecureNet",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial: "The cybersecurity training allowed me to obtain the certifications I needed to advance in my career. The content was up-to-date with the latest industry trends.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Data Scientist",
    company: "DataViz",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    testimonial: "The hands-on data science projects were exactly what I needed to build a solid portfolio. I landed a Data Scientist position just one month after completing my training.",
    rating: 4
  },
  {
    id: 4,
    name: "Lucas Petit",
    role: "Mobile Developer",
    company: "AppWorks",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    testimonial: "The mobile development courses were very well structured. I was able to create several applications during my training and add them directly to my resume. An excellent springboard for my career.",
    rating: 5
  },
  {
    id: 5,
    name: "Chloé Lefebvre",
    role: "UX Designer",
    company: "DesignLab",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    testimonial: "The UX/UI design training opened the doors to a new career for me. The instructors were industry professionals and their feedback was invaluable for developing my portfolio.",
    rating: 5
  },
  {
    id: 6,
    name: "Nicolas Bernard",
    role: "Cloud Engineer",
    company: "CloudSys",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    testimonial: "The Cloud Computing skills I acquired are directly applicable to my daily work. The training was well balanced between theory and practice.",
    rating: 4
  }
];

const SatisfactionPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      gsap.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      });
    }

    // Stats animation
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 75%",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }

    // Testimonials animation
    if (testimonialsRef.current) {
      gsap.from(testimonialsRef.current.children, {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array(5)
        .fill(0)
        .map((_, i) => (
            <svg
                key={i}
                className={`h-5 w-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
  };

  const satisfactionStats = [
    { value: "96%", label: "Satisfaction" },
    { value: "92%", label: "Recommendation" },
    { value: "85%", label: "Employment after training" },
    { value: "4.8/5", label: "Average rating" }
  ];

  return (
      <>

        <main className="pt-24">
          <section className="py-12 md:py-20 bg-gradient-to-br from-bytepurple-50 to-byteblue-50" id="satisfaction">
            <div className="container mx-auto px-4">
              <div ref={headerRef} className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  What our students say about us
                </h1>
                <p className="text-xl text-gray-700">
                  Discover the experiences of our former students who successfully transformed their careers thanks to ByteBoostCampus
                </p>
                <div className="flex justify-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                          <svg
                              key={index}
                              className="h-8 w-8 text-yellow-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-xl font-semibold text-gray-900">4.8 out of 5</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {satisfactionStats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 text-center shadow-md">
                      <div className="text-3xl md:text-4xl font-bold text-bytepurple-600">{stat.value}</div>
                      <div className="text-gray-600 mt-2">{stat.label}</div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Student testimonials
              </h2>
              <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-12 w-12 rounded-full mr-4"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                            <p className="text-sm text-gray-600">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                        <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-gradient-to-br from-bytepurple-600 to-byteblue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to start your journey?
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Join our learning community and transform your career today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-white text-bytepurple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    Sign up now
                  </button>
                  <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                    Discover training programs
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

      </>
  );
};

export default SatisfactionPage;