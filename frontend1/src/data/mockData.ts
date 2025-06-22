
import { Course, Enrollment, User } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'student',
  avatar: 'https://i.pravatar.cc/150?img=68'
};

export const adminUser: User = {
  id: 'admin-1',
  name: 'Admin User',
  email: 'admin@skillspark.com',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?img=69'
};

export const instructorUser: User = {
  id: 'instructor-1',
  name: 'Jane Smith',
  email: 'jane@skillspark.com',
  role: 'instructor',
  avatar: 'https://i.pravatar.cc/150?img=48'
};

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course covers all the fundamentals you need to know to start your web development journey.',
    instructorId: 'instructor-1',
    instructorName: 'Jane Smith',
    category: 'Web Development',
    level: 'beginner',
    price: 49.99,
    rating: 4.7,
    studentsCount: 1245,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '10h 30m',
    lessons: [
      { id: 'lesson-1-1', title: 'Introduction to HTML', duration: '45m', type: 'video' },
      { id: 'lesson-1-2', title: 'CSS Basics', duration: '1h', type: 'video' },
      { id: 'lesson-1-3', title: 'JavaScript Fundamentals', duration: '2h', type: 'video' },
      { id: 'lesson-1-4', title: 'Building Your First Website', duration: '3h', type: 'video' },
      { id: 'lesson-1-5', title: 'Web Development Quiz', duration: '30m', type: 'quiz' }
    ],
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: 'course-2',
    title: 'Data Science with Python',
    description: 'Master data analysis, visualization, and machine learning with Python. This course provides in-depth knowledge of data science concepts and practical applications.',
    instructorId: 'instructor-2',
    instructorName: 'Michael Chen',
    category: 'Data Science',
    level: 'intermediate',
    price: 69.99,
    rating: 4.8,
    studentsCount: 985,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '14h 15m',
    lessons: [
      { id: 'lesson-2-1', title: 'Python for Data Analysis', duration: '2h', type: 'video' },
      { id: 'lesson-2-2', title: 'Data Visualization', duration: '2h 30m', type: 'video' },
      { id: 'lesson-2-3', title: 'Machine Learning Basics', duration: '3h', type: 'video' },
      { id: 'lesson-2-4', title: 'Advanced ML Techniques', duration: '4h', type: 'video' },
      { id: 'lesson-2-5', title: 'Final Project', duration: '2h', type: 'assignment' }
    ],
    createdAt: '2023-02-22T00:00:00Z'
  },
  {
    id: 'course-3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native framework. Learn how to develop for iOS and Android simultaneously.',
    instructorId: 'instructor-3',
    instructorName: 'Sarah Johnson',
    category: 'Mobile Development',
    level: 'intermediate',
    price: 59.99,
    rating: 4.6,
    studentsCount: 730,
    thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '12h 45m',
    lessons: [
      { id: 'lesson-3-1', title: 'React Native Basics', duration: '1h 30m', type: 'video' },
      { id: 'lesson-3-2', title: 'Building UI Components', duration: '2h', type: 'video' },
      { id: 'lesson-3-3', title: 'Navigation', duration: '2h', type: 'video' },
      { id: 'lesson-3-4', title: 'State Management', duration: '3h', type: 'video' },
      { id: 'lesson-3-5', title: 'Publishing Your App', duration: '1h 30m', type: 'video' }
    ],
    createdAt: '2023-03-10T00:00:00Z'
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design to create engaging digital products that users will love.',
    instructorId: 'instructor-4',
    instructorName: 'Emily Wright',
    category: 'Design',
    level: 'beginner',
    price: 54.99,
    rating: 4.9,
    studentsCount: 1540,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '8h 20m',
    lessons: [
      { id: 'lesson-4-1', title: 'Design Principles', duration: '1h', type: 'video' },
      { id: 'lesson-4-2', title: 'User Research', duration: '1h 30m', type: 'video' },
      { id: 'lesson-4-3', title: 'Wireframing', duration: '2h', type: 'video' },
      { id: 'lesson-4-4', title: 'Prototyping', duration: '2h 30m', type: 'video' },
      { id: 'lesson-4-5', title: 'Design Evaluation', duration: '1h', type: 'quiz' }
    ],
    createdAt: '2023-04-05T00:00:00Z'
  },
  {
    id: 'course-5',
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services and learn to design scalable and reliable applications in the cloud.',
    instructorId: 'instructor-5',
    instructorName: 'David Wilson',
    category: 'Cloud Computing',
    level: 'advanced',
    price: 79.99,
    rating: 4.7,
    studentsCount: 620,
    thumbnail: 'https://images.unsplash.com/photo-1603322327571-943141525737?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '16h 30m',
    lessons: [
      { id: 'lesson-5-1', title: 'AWS Essentials', duration: '2h', type: 'video' },
      { id: 'lesson-5-2', title: 'EC2 and Virtual Servers', duration: '3h', type: 'video' },
      { id: 'lesson-5-3', title: 'S3 and Storage Solutions', duration: '2h', type: 'video' },
      { id: 'lesson-5-4', title: 'Database Services', duration: '3h', type: 'video' },
      { id: 'lesson-5-5', title: 'CloudFormation', duration: '2h 30m', type: 'video' },
      { id: 'lesson-5-6', title: 'AWS Certification Prep', duration: '3h', type: 'quiz' }
    ],
    createdAt: '2023-05-20T00:00:00Z'
  },
  {
    id: 'course-6',
    title: 'Digital Marketing Mastery',
    description: 'Learn how to create effective digital marketing campaigns across various platforms to grow your business.',
    instructorId: 'instructor-6',
    instructorName: 'Lisa Brown',
    category: 'Marketing',
    level: 'beginner',
    price: 44.99,
    rating: 4.5,
    studentsCount: 1825,
    thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    duration: '9h 45m',
    lessons: [
      { id: 'lesson-6-1', title: 'Digital Marketing Overview', duration: '45m', type: 'video' },
      { id: 'lesson-6-2', title: 'SEO Fundamentals', duration: '2h', type: 'video' },
      { id: 'lesson-6-3', title: 'Social Media Marketing', duration: '2h 30m', type: 'video' },
      { id: 'lesson-6-4', title: 'Email Marketing', duration: '1h 30m', type: 'video' },
      { id: 'lesson-6-5', title: 'PPC Advertising', duration: '2h', type: 'video' },
      { id: 'lesson-6-6', title: 'Marketing Analytics', duration: '1h', type: 'quiz' }
    ],
    createdAt: '2023-06-12T00:00:00Z'
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enrollment-1',
    courseId: 'course-1',
    userId: 'user-1',
    progress: 60,
    completedLessons: ['lesson-1-1', 'lesson-1-2', 'lesson-1-3'],
    enrollmentDate: '2023-03-01T00:00:00Z'
  },
  {
    id: 'enrollment-2',
    courseId: 'course-3',
    userId: 'user-1',
    progress: 40,
    completedLessons: ['lesson-3-1', 'lesson-3-2'],
    enrollmentDate: '2023-04-15T00:00:00Z'
  },
  {
    id: 'enrollment-3',
    courseId: 'course-4',
    userId: 'user-1',
    progress: 20,
    completedLessons: ['lesson-4-1'],
    enrollmentDate: '2023-05-20T00:00:00Z'
  }
];
