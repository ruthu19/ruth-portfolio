
import React, { useEffect } from 'react';
import { Palette, PenTool, Smartphone, Monitor } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { gsap } from 'gsap';

const skills = [
  "JavaScript",
  "Tailwind css",
  "React.js",
  "Git",
  "HTML5",
  "System Design",
  "ui/ux design",
  "Agile methodologies",
  "Django",
  "Node.js",
  "Express.js",
  "SQL",
  "MongoDB",
  "AWS"
];

// Glitter dots for pop-up effect on hover
const Glitter = () => (
  <span className="pointer-events-none absolute inset-0 flex justify-center items-center z-10 opacity-0 group-hover:opacity-100 transition duration-300">
    <span className="glitter-dot glitter-dot1"></span>
    <span className="glitter-dot glitter-dot2"></span>
    <span className="glitter-dot glitter-dot3"></span>
    <span className="glitter-dot glitter-dot4"></span>
    <span className="glitter-dot glitter-dot5"></span>
  </span>
);

const SkillBadge = ({ children }: { children: React.ReactNode }) => (
  <div
    className="skill-badge opacity-0 relative group font-bold px-4 py-2 rounded-full text-sm overflow-visible
      bg-black border border-yellow-400 shadow
      transition-all duration-300
      hover:bg-black hover:border-yellow-500"
  >
    <Glitter />
    <span className="relative z-20 text-brand-yellow">{children}</span>
  </div>
);

const Skills = () => {
  const [sectionRef, inView] = useInView();

  useEffect(() => {
    if (inView) {
      gsap.fromTo(".skill-badge", {
          opacity: 0,
          y: 24,
          scale: 0.8,
      }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
      });
    }
  }, [inView]);

  return (
    <section id="skills" className="container mx-auto px-4 md:px-8 py-16" ref={sectionRef}>
      <div className="bg-black border-2 border-dashed border-brand-yellow rounded-3xl p-8 flex flex-col md:flex-row gap-8 overflow-hidden">
        <div className="flex justify-center items-center md:border-r-2 md:border-dashed border-brand-yellow md:pr-8">
          <h3 className="font-anton text-5xl md:-rotate-90 md:whitespace-nowrap">TECHNICAL SKILLS</h3>
        </div>
        <div className="flex-grow space-y-6">
          <div className="flex space-x-4 items-center">
            <Palette size={28} className="text-brand-yellow" />
            <PenTool size={28} className="text-brand-yellow" />
            <Smartphone size={28} className="text-brand-yellow" />
            <Monitor size={28} className="text-brand-yellow" />
          </div>
          <p className="font-bold text-lg bg-gray-800 inline-block px-4 py-1">THE SOFTWARE MASTERY</p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <SkillBadge key={skill}>
                {skill}
              </SkillBadge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

