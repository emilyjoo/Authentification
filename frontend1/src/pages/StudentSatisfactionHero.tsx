import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const StudentSatisfactionHero = () => {
  // References for GSAP animations
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const secondaryTestimonialRef = useRef(null);

  useEffect(() => {
    // Section entrance animation
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate content elements sequentially
    timeline
        .from(badgeRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6
        })
        .from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8
        }, "-=0.3")
        .from(paragraphRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6
        }, "-=0.4")
        .from(buttonsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6
        }, "-=0.3")
        .from(statsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6
        }, "-=0.3");

    // Distinct animation for testimonial section
    gsap.from(testimonialRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5
    });

    // Secondary testimonial animation
    gsap.from(secondaryTestimonialRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1.2
    });

    // Decorative elements animation
    gsap.from(".decorative-element", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.8,
      stagger: 0.2
    });

  }, []);

  return (
      <section ref={sectionRef} className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Content */}
            <div className="lg:w-1/2">
              <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span className="text-indigo-600 font-medium text-sm">10,000+ students trained</span>
              </div>

              <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform your career with{" "}
                <span className="relative">
                <span className="relative z-10">our training programs</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-indigo-100/80 z-0"></span>
              </span>
              </h2>

              <p ref={paragraphRef} className="text-lg text-gray-600 mb-8 max-w-lg">
                Our students testify to their success. Join a community that propels careers through practical and targeted learning.
              </p>

              <div ref={buttonsRef} className="flex flex-wrap gap-4 mb-10">
                <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg">
                  <Link to="/satisfaction">View all testimonials</Link>
                </Button>
              </div>

              <div ref={statsRef} className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">4.8/5</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">94% success rate</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">+2,500 reviews</span>
                </div>
              </div>
            </div>

            {/* Testimonial Section */}
            <div ref={testimonialRef} className="lg:w-1/2">
              <div className="relative">
                {/* Main testimonial card */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      MD
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Marie Dupont</h3>
                      <p className="text-indigo-600">Fullstack Developer</p>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-6 pl-2 border-l-4 border-indigo-200">
                    <p className="text-lg">
                      "The training gave me the exact skills I needed to land my first job in web development."
                    </p>
                  </blockquote>

                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-sm text-gray-500">Training completed in 2023</span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="decorative-element absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-xl"></div>
                <div className="decorative-element absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-xl"></div>

                {/* Secondary testimonial (smaller) */}
                <div ref={secondaryTestimonialRef} className="absolute -bottom-8 right-8 bg-white border border-gray-200 rounded-lg p-4 shadow-sm z-20 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">
                      PL
                    </div>
                    <span className="font-medium text-sm">Pierre L.</span>
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                  </div>
                  <p className="text-sm text-gray-600">"Excellent teaching methods and personalized support."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};