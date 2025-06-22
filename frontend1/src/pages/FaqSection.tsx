import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Star, Users, Clock, BookOpen, Heart, ArrowRight } from 'lucide-react';
import {Link} from "react-router-dom";

const faqs = [
  {
    id: 1,
    question: "What is the Topic Listing exactly?",
    answer: "The Topic Listing is a Bootstrap 5 template that allows you to create web portals with topic-based navigation. Its reusable components are designed for easy customization and implementation.",
    category: "General",
    popularity: 95,
    lastUpdated: "2024-01-15",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    question: "How can I customize the design?",
    answer: "To customize your template, you can modify CSS variables and Bootstrap classes. Check the customization documentation for detailed instructions on colors, fonts, and component styling.",
    category: "Design",
    popularity: 87,
    lastUpdated: "2024-01-10",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    question: "Are there any hidden costs or restrictions?",
    answer: "No! The basic version is completely free to use. We offer optional premium features for advanced users, but they are not necessary for basic functionality.",
    category: "Pricing",
    popularity: 92,
    lastUpdated: "2024-01-12",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
  },
  {
    id: 4,
    question: "Is the template mobile responsive?",
    answer: "Yes! The template is built with responsive design principles. It works perfectly on desktop computers, tablets, and mobile devices with flexible grid layouts.",
    category: "Technical",
    popularity: 89,
    lastUpdated: "2024-01-08",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
  },
  {
    id: 5,
    question: "Can I get help and support?",
    answer: "Certainly! We offer free community support through our forum and Discord channel. For complex professional projects, premium support is available.",
    category: "Support",
    popularity: 78,
    lastUpdated: "2024-01-14",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop"
  },
  {
    id: 6,
    question: "How do I get started with web development?",
    answer: "Start with the basics: HTML is your foundation, CSS for styling, and JavaScript for interactivity. Practice regularly, as even the most experienced developers started with simple projects.",
    category: "Learning",
    popularity: 96,
    lastUpdated: "2024-01-16",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
  }
];

const categories = ["All", "General", "Technical", "Design", "Pricing", "Support", "Learning"];

const difficultyColors = {
  "Beginner": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Intermediate": "bg-blue-100 text-blue-700 border-blue-200",
  "Advanced": "bg-purple-100 text-purple-700 border-purple-200"
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedQuestions, setLikedQuestions] = useState(new Set());
  const faqRefs = useRef([]);
  const headerRef = useRef(null);
  const searchRef = useRef(null);

  // Simulated GSAP-like animations using CSS transitions and transforms
  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      headerRef.current.style.opacity = '0';
      headerRef.current.style.transform = 'translateY(-30px)';
      setTimeout(() => {
        headerRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // Search animation
    if (searchRef.current) {
      searchRef.current.style.opacity = '0';
      searchRef.current.style.transform = 'translateY(20px)';
      setTimeout(() => {
        searchRef.current.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
        searchRef.current.style.opacity = '1';
        searchRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    // FAQ items animation
    faqRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = '0';
        ref.style.transform = 'translateX(-50px)';
        setTimeout(() => {
          ref.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 * index}s`;
          ref.style.opacity = '1';
          ref.style.transform = 'translateX(0)';
        }, 100);
      }
    });
  }, []);

  const handleLike = (faqId, e) => {
    e.stopPropagation();
    const newLiked = new Set(likedQuestions);
    if (newLiked.has(faqId)) {
      newLiked.delete(faqId);
    } else {
      newLiked.add(faqId);
    }
    setLikedQuestions(newLiked);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-600 mb-6 border border-white/20">
              <BookOpen className="w-4 h-4" />
              FAQ Section
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Questions & Answers
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover everything you need to know about our topic listing template and web development journey.
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Users, value: "2.5k+", label: "Users Helped", color: "from-blue-500 to-cyan-500" },
                { icon: BookOpen, value: faqs.length.toString(), label: "Questions Answered", color: "from-purple-500 to-pink-500" },
                { icon: Clock, value: "<2min", label: "Average Response", color: "from-green-500 to-emerald-500" }
              ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/80 transition-all duration-500 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div ref={searchRef} className="mb-12 max-w-4xl mx-auto">
            <div className="relative mb-8">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                  type="text"
                  placeholder="Search through our knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-900 placeholder-gray-500 text-lg"
              />
              {searchQuery && (
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
                    </span>
                  </div>
              )}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                  <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                          selectedCategory === category
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-200'
                              : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-white/20'
                      }`}
                  >
                    {category}
                  </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-8">
            {filteredFaqs.length === 0 ? (
                <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/20">
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No results found</h3>
                  <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or browse different categories</p>
                  <button
                      onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg"
                  >
                    Clear filters
                  </button>
                </div>
            ) : (
                filteredFaqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        ref={el => faqRefs.current[index] = el}
                        className={`group bg-white/60 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:bg-white/80 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-100 ${
                            index % 2 === 0 ? '' : 'md:flex-row-reverse'
                        }`}
                    >
                      <div className="md:flex md:min-h-[400px]">
                        {/* Image Section */}
                        <div className="md:w-1/2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10"></div>
                          <img
                              src={faq.image}
                              alt={faq.question}
                              className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-6 left-6 z-20">
                            <span className={`px-4 py-2 text-sm rounded-xl font-bold border backdrop-blur-sm ${difficultyColors[faq.difficulty]}`}>
                              {faq.difficulty}
                            </span>
                          </div>
                          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-bold text-gray-700">{faq.popularity}%</span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 font-medium">
                              {faq.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              Updated {new Date(faq.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="space-y-6">
                            <div>
                              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Question</h3>
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                                {faq.question}
                              </h2>
                            </div>

                            <div>
                              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Answer</h3>
                              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                                {faq.answer}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <button
                                onClick={(e) => handleLike(faq.id, e)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                                    likedQuestions.has(faq.id)
                                        ? 'bg-red-100 text-red-600 border border-red-200'
                                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-500'
                                }`}
                            >
                              <Heart className={`w-4 h-4 ${likedQuestions.has(faq.id) ? 'fill-current' : ''}`} />
                              <span className="font-medium">Helpful</span>
                            </button>

                            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg group-hover:shadow-xl">
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>

          {/* Enhanced Footer */}
          <div className="text-center mt-20 p-12 bg-gradient-to-r from-white/60 to-blue-50/60 backdrop-blur-sm rounded-3xl border border-white/20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our support team is here to help you succeed. Get personalized assistance for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg">
                  <Link to="/contact">Contact Us</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FaqSection;