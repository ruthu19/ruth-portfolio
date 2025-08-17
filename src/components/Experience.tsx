import React, { useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { gsap } from 'gsap';
import { ExternalLink, Github } from 'lucide-react';

const featuredProjects = [
  {
    title: "MINDME",
    description: "Designed and implemented a webapp to address and improve mental health in younger generation. A comprehensive platform focusing on mental wellness through interactive features and personalized support systems.",
    tags: ["React", "Node.js", "Mental Health", "UI/UX"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Firmware Smart AR Glasses",
    description: "Project aims to provide a transformative solution for visually impaired individuals, enabling them to navigate complex indoor environments independently and safely through advanced AR technology.",
    tags: ["AR/VR", "Firmware", "Accessibility", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2944&auto=format&fit=crop",
    featured: true
  },
  {
    title: "AI-Driven Campus Automation",
    description: "AI-powered College Management System designed to automate academic, administrative, and security functions. It leverages AI for facial recognition, NLP-based certificate evaluation, and surveillance anomaly detection.",
    tags: ["AI/ML", "Automation", "Facial Recognition", "NLP"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop",
    featured: true
  },
];

const Experience = () => {
  const [sectionRef, inView] = useInView();

  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        ".featured-project",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        }
      );
    }
  }, [inView]);

  return (
    <section
      id="experience"
      className="container mx-auto px-4 md:px-8 py-20"
      ref={sectionRef}
    >
      <div className="text-center mb-16">
        <h2 className="font-anton text-5xl md:text-6xl mb-4 motion-showcase-pop">
          FEATURED <span className="text-brand-yellow">PROJECTS</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Innovative solutions that make a difference
        </p>
      </div>

      <div className="space-y-20">
        {featuredProjects.map((project, index) => (
          <div
            key={project.title}
            className={`featured-project opacity-0 grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-cols-2' : ''
            }`}
          >
            {/* Project Image */}
            <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative group overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-brand-yellow text-black rounded-full hover:bg-brand-yellow/90 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                  <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                    <Github size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="space-y-4">
                <h3 className="font-anton text-3xl md:text-4xl text-brand-yellow">
                  {project.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-brand-yellow/10 text-brand-yellow rounded-full text-sm font-medium border border-brand-yellow/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex space-x-4 pt-4">
                <button className="px-6 py-3 bg-brand-yellow text-black rounded-lg font-semibold hover:bg-brand-yellow/90 transition-colors">
                  View Project
                </button>
                <button className="px-6 py-3 border border-brand-yellow/30 text-brand-yellow rounded-lg font-semibold hover:bg-brand-yellow/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
