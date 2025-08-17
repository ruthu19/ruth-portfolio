
import React from 'react';
import Typewriter from './Typewriter';

const Hero = () => {
  return (
    <section id="hero" className="relative container mx-auto px-4 md:px-8 py-16 overflow-hidden">
      {/* Animated Blurred Glow Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Dimmer & less saturated background glow */}
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[840px] h-[340px] md:w-[960px] md:h-[460px] bg-gradient-to-r from-[#f1e98b33] via-[#ffe97844] to-[#f6e57433] rounded-full blur-3xl opacity-40 animate-fade-glow"></div>
      </div>

      {/* Highlight animated accent */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-64 h-1.5 md:w-[380px] bg-gradient-to-r from-transparent via-brand-yellow/60 to-transparent rounded-full opacity-40 z-10 animate-glow-accent" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-block bg-white/10 border border-white/20 rounded-full p-1 animate-scale-in">
            <div className="bg-background px-6 py-2 rounded-full">
              <p className="text-xl font-bold">Hello, I'm Ruthu Parinika!</p>
            </div>
          </div>
          <h1 className="font-anton text-5xl md:text-7xl font-bold animate-fade-in-up !delay-[100ms] text-brand-yellow" style={{lineHeight: '1.1'}}>
            <Typewriter
              text="WELCOME TO MY PORTFOLIO"
              className="inline-block"
              delay={90}
              cursorClassName="border-brand-yellow"
            />
          </h1>
          <p className="text-muted-foreground max-w-md animate-fade-in-up !delay-[250ms]">
            I'm a passionate and experienced Full-Stack Developer with a strong foundation in Python, Django, full-stack development, and competitive programming. My projects include full-stack web applications, NLP-based chatbots, and image detection and recognition. I have consistently demonstrated my problem-solving abilities and technical expertise through my achievements in hackathons and competitive programming.
          </p>
        </div>
        <div className="relative flex items-center justify-center animate-scale-in z-10">
          {/* Layered avatar frame with floating and subtle scale-in */}
          <div className="absolute -inset-2 bg-brand-yellow rounded-full transform -rotate-3 blur-md opacity-60 pointer-events-none animate-float-avatar-glow"></div>
          <div className="relative w-full max-w-sm mx-auto aspect-square rounded-full overflow-hidden border-8 border-background shadow-2xl animate-fade-in-up !delay-[200ms]">
            <img 
              src="/lovable-uploads/f0c92df8-7077-44c4-9ca4-850af2a07c04.png"
              alt="Ruthu Parinika"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-brand-yellow text-brand-dark px-6 py-3 rounded-xl transform rotate-3 animate-fade-in-up !delay-[350ms]">
            <p className="font-anton text-xl">RUTHU PARINIKA</p>
            <p className="text-center font-bold">SOFTWARE ENGINEER</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
