
export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  rating: number;
  studentsCount: number;
  thumbnail: string;
  duration: string;
  lessons: Lesson[];
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment';
  isCompleted?: boolean;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  progress: number;
  completedLessons: string[];
  enrollmentDate: string;
}
