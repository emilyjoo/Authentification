import React, { useEffect, useRef } from 'react';

export default function GSAPAboutPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    // Load GSAP
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      script2.onload = () => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        initAnimations();
      };
      document.head.appendChild(script2);
    };
    document.head.appendChild(script);

    const initAnimations = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      // Hero animations
      const heroTl = gsap.timeline();
      heroTl
          .from('.hero-title', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
          })
          .from('.hero-subtitle', {
            duration: 1,
            y: 80,
            opacity: 0,
            ease: 'power3.out'
          }, '-=0.8')
          .from('.cta-buttons', {
            duration: 1,
            y: 60,
            opacity: 0,
            ease: 'power3.out'
          }, '-=0.6')
          .from('.cta-button', {
            duration: 0.8,
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)'
          }, '-=0.4');

      // About section animations
      gsap.from(aboutRef.current.querySelectorAll('.section-title, .section-subtitle'), {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
      });

      gsap.from(aboutRef.current.querySelectorAll('.about-text'), {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
        },
        duration: 1.2,
        y: 60,
        opacity: 0,
        stagger: 0.4,
        ease: 'power3.out'
      });

      // Stats animation with counter effect
      const statNumbers = aboutRef.current.querySelectorAll('.stat-number');
      statNumbers.forEach((stat, index) => {
        const endValue = stat.textContent;
        const numericValue = parseInt(endValue.replace(/[^\d]/g, ''));

        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          },
          duration: 2,
          scale: 0.5,
          opacity: 0,
          ease: 'back.out(1.7)',
          delay: index * 0.2
        });

        if (numericValue && numericValue < 1000) {
          gsap.to({ val: 0 }, {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            duration: 2,
            val: numericValue,
            ease: 'power2.out',
            delay: index * 0.2,
            onUpdate: function() {
              const suffix = endValue.includes('%') ? '%' : endValue.includes('+') ? '+' : endValue.includes('/') ? '/7' : '';
              stat.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          });
        }
      });

      // Services animations
      gsap.from(servicesRef.current.querySelectorAll('.section-title, .section-subtitle'), {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        },
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
        },
        duration: 1.2,
        y: 100,
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
      });

      // Team animations
      gsap.from(teamRef.current.querySelectorAll('.section-title, .section-subtitle'), {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%',
        },
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.team-card', {
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 70%',
        },
        duration: 1.5,
        y: 120,
        opacity: 0,
        scale: 0.7,
        rotation: 5,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      });

      // Hover animations for cards
      document.querySelectorAll('.service-card, .team-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            duration: 0.3,
            y: -15,
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            duration: 0.3,
            y: 0,
            scale: 1,
            boxShadow: '0 4px 25px rgba(0, 0, 0, 0.08)',
            ease: 'power2.out'
          });
        });
      });

      // CTA buttons hover animations
      document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            duration: 0.3,
            y: -5,
            scale: 1.05,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            duration: 0.3,
            y: 0,
            scale: 1,
            ease: 'power2.out'
          });
        });
      });

      // Floating animation for hero section
      gsap.to('.hero-content', {
        duration: 6,
        y: -20,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });

      // Parallax effect for hero background
      gsap.to('.hero-section::before', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: -100,
        ease: 'none'
      });
    };

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const services = [
    {
      title: "Web Development",
      description: "Creating modern and high-performance websites with the latest React, Vue.js and Node.js technologies for an exceptional user experience."
    },
    {
      title: "Interface Design",
      description: "Designing intuitive and aesthetic user interfaces that combine visual beauty with optimal functionality for your users."
    },
    {
      title: "Digital Strategy",
      description: "Strategic guidance in your digital transformation with a personalized approach and tailored solutions."
    },

  ];

  const team = [
    {
      name: "Alexandra Martin",
      role: "Creative Director",
      description: "User experience design specialist with over 8 years of experience creating innovative digital solutions."
    },
    {
      name: "Thomas Dubois",
      role: "Full-Stack Developer",
      description: "Expert in modern web technologies, passionate about developing high-performance and scalable applications."
    },
    {
      name: "Sarah Chen",
      role: "Project Manager",
      description: "Managing complex projects with an agile approach, ensuring delivery on time and according to specifications."
    },
  ];

  return (
      <div className="min-h-screen bg-white" ref={containerRef}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
          }

          .hero-section {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
          }

          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%);
            z-index: 1;
          }

          .hero-content {
            position: relative;
            z-index: 2;
            max-width: 900px;
            padding: 0 30px;
          }

          .hero-title {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 2rem;
            line-height: 1.1;
            letter-spacing: -0.02em;
          }

          .hero-subtitle {
            font-size: 1.4rem;
            font-weight: 300;
            opacity: 0.9;
            margin-bottom: 3rem;
            line-height: 1.6;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }

          .cta-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
          }

          .cta-button {
            padding: 18px 35px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            border: none;
            cursor: pointer;
            font-size: 1rem;
          }

          .cta-primary {
            background: white;
            color: #1a1a2e;
          }

          .cta-secondary {
            background: transparent;
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
          }

          .section {
            padding: 100px 0;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 30px;
          }

          .section-title {
            font-size: 3rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 1.5rem;
            color: #1a1a2e;
            letter-spacing: -0.02em;
          }

          .section-subtitle {
            font-size: 1.2rem;
            text-align: center;
            color: #6b7280;
            margin-bottom: 4rem;
            max-width: 650px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
          }

          .about-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }

          .about-text {
            font-size: 1.2rem;
            line-height: 1.8;
            color: #4b5563;
            margin-bottom: 2rem;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
          }

          .stat-item {
            text-align: center;
          }

          .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: #1a1a2e;
            margin-bottom: 0.5rem;
          }

          .stat-label {
            font-size: 1rem;
            color: #6b7280;
            font-weight: 500;
          }

          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
          }

          .service-card {
            background: white;
            padding: 3rem 2.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid #f3f4f6;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            transform: scaleX(0);
            transition: transform 0.4s ease;
          }

          .service-card:hover::before {
            transform: scaleX(1);
          }

          .service-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: #1a1a2e;
          }

          .service-description {
            color: #6b7280;
            line-height: 1.7;
            font-size: 1rem;
          }

          .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2.5rem;
          }

          .team-card {
            background: white;
            padding: 3rem 2.5rem;
            border-radius: 16px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid #f3f4f6;
            text-align: center;
            position: relative;
            overflow: hidden;
            cursor: pointer;
          }

          .team-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            transform: scaleX(0);
            transition: transform 0.4s ease;
          }

          .team-card:hover::before {
            transform: scaleX(1);
          }

          .team-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: white;
            font-weight: 600;
            font-size: 2rem;
            border: 4px solid #f8fafc;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .team-name {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #1a1a2e;
          }

          .team-role {
            color: #0f3460;
            font-weight: 500;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }

          .team-description {
            color: #6b7280;
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .bg-gray {
            background-color: #f8fafc;
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.8rem;
            }
            
            .hero-subtitle {
              font-size: 1.2rem;
            }
            
            .section-title {
              font-size: 2.2rem;
            }
            
            .section {
              padding: 70px 0;
            }

            .cta-buttons {
              flex-direction: column;
              align-items: center;
            }

            .cta-button {
              width: 100%;
              max-width: 280px;
            }
          }
        `
        }} />

        {/* Hero Section */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-content">
            <h1 className="hero-title">Digital Experience Creators</h1>
            <p className="hero-subtitle">
              We transform your ideas into exceptional web solutions through our technical expertise and passion for innovation.
            </p>
            <div className="cta-buttons">
              <a href="#about" className="cta-button cta-primary">
                Discover Our Approach
              </a>
              <a href="#services" className="cta-button cta-secondary">
                Our Services
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section" ref={aboutRef} id="about">
          <div className="container">
            <h2 className="section-title">Our Vision</h2>
            <p className="section-subtitle">
              A modern and personalized approach for every project
            </p>
            <div className="about-content">
              <p className="about-text">
                Since our inception, we have been committed to pushing the boundaries of web development by combining creativity, technical innovation, and excellence in execution.
              </p>
              <p className="about-text">
                Our philosophy is based on close collaboration with our clients, attention to detail, and delivering solutions that generate real impact on their business.
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Satisfied Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Client Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section bg-gray" ref={servicesRef} id="services">
          <div className="container">
            <h2 className="section-title">Our Expertise</h2>
            <p className="section-subtitle">
              Complete solutions adapted to your specific needs
            </p>
            <div className="services-grid">
              {services.map((service, index) => (
                  <div key={index} className="service-card">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section" ref={teamRef}>
          <div className="container">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Passionate professionals united by excellence
            </p>
            <div className="team-grid">
              {team.map((member, index) => (
                  <div key={index} className="team-card">
                    <div className="team-avatar">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-description">{member.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}