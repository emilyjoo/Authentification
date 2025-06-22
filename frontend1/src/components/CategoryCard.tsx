import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import gsap from 'gsap';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  courseCount: number;
  color: string;
  href: string;
  index?: number; // For staggered animation
}

const CategoryCard = ({
  title,
  icon,
  courseCount,
  color,
  href,
  index = 0
}: CategoryCardProps) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    // Initial state - off screen to the left
    gsap.set(cardRef.current, { 
      x: -100, 
      opacity: 0 
    });
    
    // Animate the card from left to right
    gsap.to(cardRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      delay: index * 0.2, // Staggered animation based on index
      ease: "power3.out"
    });
  }, [index]);

  return (
    <Link to={href}>
      <Card 
        ref={cardRef} 
        className="overflow-hidden transition-all duration-200 hover:shadow-md border-gray-100 h-full"
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div 
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${color}`}
          >
            {icon}
          </div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-learning-text-light text-sm">{courseCount} cours</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;