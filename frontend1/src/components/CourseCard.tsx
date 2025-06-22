import { Course } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  index?: number; // Pour les animations en séquence
}

export const CourseCard = ({ course, isEnrolled = false, index = 0 }: CourseCardProps) => {
  const { id, title, instructorName, rating, studentsCount, thumbnail, price, duration, level } = course;
  
  // Références pour les animations
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  
  // Animation au chargement
  useEffect(() => {
    // Délai pour l'animation en cascade
    const delay = index * 0.1;
    
    // Animation d'entrée
    gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        delay,
        ease: "power3.out"
      }
    );
    
    // Animation de l'image
    gsap.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: delay + 0.2, ease: "power2.out" }
    );
    
    // Animation du contenu
    gsap.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: delay + 0.3, ease: "power2.out" }
    );
    
    // Animation du bouton
    gsap.fromTo(
      buttonRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, delay: delay + 0.4, ease: "back.out" }
    );
  }, [index]);
  
  // Hover animations
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -10, boxShadow: "0 22px 45px rgba(0, 0, 0, 0.1)", duration: 0.3 });
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.4 });
  };
  
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)", duration: 0.3 });
    gsap.to(imageRef.current, { scale: 1, duration: 0.4 });
  };
  
  return (
    <Card 
      ref={cardRef}
      className="overflow-hidden transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <img
          ref={imageRef}
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover transition-transform"
        />
        <div className="absolute top-2 right-2 bg-skillspark-500 text-white px-2 py-1 rounded text-xs font-medium uppercase">
          {level}
        </div>
      </div>
      
      <div ref={contentRef}>
        <CardHeader className="pt-4 pb-2">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg line-clamp-2 hover:text-skillspark-600 transition-colors">
              <Link to={`/courses/${id}`}>{title}</Link>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">By {instructorName}</p>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{rating}</span>
              <span className="text-muted-foreground ml-1">({studentsCount} students)</span>
            </div>
            <span className="text-sm">{duration}</span>
          </div>
        </CardContent>
      </div>
      
      <CardFooter ref={buttonRef} className="pt-2 flex justify-between items-center">
        {isEnrolled ? (
          <Button asChild variant="outline" className="w-full">
            <Link to={`/learn/${id}`}>Continue Learning</Link>
          </Button>
        ) : (
          <>
            <span className="font-bold text-lg">${price}</span>
            <Button asChild className="bg-skillspark-500 hover:bg-skillspark-600">
              <Link to={`/courses/${id}`}>View Course</Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};