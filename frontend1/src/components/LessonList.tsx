
import { useState } from "react";
import { Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, PlayCircle } from "lucide-react";

interface LessonListProps {
  lessons: Lesson[];
  completedLessons?: string[];
  onSelectLesson?: (lessonId: string) => void;
  currentLessonId?: string;
  isEnrolled?: boolean;
}

export const LessonList = ({
  lessons,
  completedLessons = [],
  onSelectLesson,
  currentLessonId,
  isEnrolled = false,
}: LessonListProps) => {
  const [expanded, setExpanded] = useState<string>("module-1");

  const moduleGroups: { [key: string]: Lesson[] } = lessons.reduce((acc, lesson) => {
    // Group lessons by module (in this example, we don't have module info, so we'll create a dummy one)
    const moduleKey = "module-1";
    if (!acc[moduleKey]) {
      acc[moduleKey] = [];
    }
    acc[moduleKey].push(lesson);
    return acc;
  }, {} as { [key: string]: Lesson[] });

  const handleLessonClick = (lessonId: string) => {
    if (isEnrolled && onSelectLesson) {
      onSelectLesson(lessonId);
    }
  };

  const getLessonStatusIcon = (lesson: Lesson, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    
    if (lesson.type === 'video') {
      return <PlayCircle className="h-4 w-4 text-skillspark-500" />;
    }
    
    return <Circle className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Accordion
        type="single"
        collapsible
        value={expanded}
        onValueChange={setExpanded}
        className="w-full"
      >
        {Object.entries(moduleGroups).map(([moduleId, moduleLessons], index) => (
          <AccordionItem value={moduleId} key={moduleId}>
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors">
              Module {index + 1}: Course Overview
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <div className="divide-y">
                {moduleLessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = lesson.id === currentLessonId;
                  
                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "flex items-center p-3 hover:bg-muted/50 transition-colors",
                        isActive && "bg-muted",
                        !isEnrolled && "opacity-70"
                      )}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <div className="mr-3">
                        {getLessonStatusIcon(lesson, isCompleted)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className={cn(
                            "text-sm font-medium truncate",
                            isCompleted && "text-muted-foreground line-through"
                          )}>
                            {lesson.title}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2">
                            {lesson.duration}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {lesson.type}
                        </p>
                      </div>
                      {!isEnrolled && (
                        <div className="ml-2">
                          <span className="text-xs bg-muted px-2 py-1 rounded">
                            Preview
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
