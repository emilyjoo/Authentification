
import { Code, LayoutDashboard, Layers, Database, FileText, BookOpen } from 'lucide-react';
import React from 'react';

// Categories data
export const categories = [
  {
    title: "Développement Web",
    icon: <Code size={32} className="text-white" />,
    courseCount: 230,
    color: "bg-blue-500",
    href: "/categories/web"
  },
  {
    title: "Cybersécurité",
    icon: <LayoutDashboard size={32} className="text-white" />,
    courseCount: 145,
    color: "bg-red-500",
    href: "/categories/cybersecurity"
  },
  {
    title: "Design",
    icon: <Layers size={32} className="text-white" />,
    courseCount: 120,
    color: "bg-purple-500",
    href: "/categories/design"
  },
  {
    title: "Data Science",
    icon: <Database size={32} className="text-white" />,
    courseCount: 180,
    color: "bg-green-500",
    href: "/categories/data-science"
  },
  {
    title: "Développement Mobile",
    icon: <FileText size={32} className="text-white" />,
    courseCount: 95,
    color: "bg-orange-500",
    href: "/categories/mobile"
  },
  {
    title: "DevOps",
    icon: <BookOpen size={32} className="text-white" />,
    courseCount: 75,
    color: "bg-teal-500",
    href: "/categories/devops"
  },
];
