
import React from 'react';
import { Youtube, Instagram, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden z-10">
      {/* Animated glowing bar */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-2 h-14 md:h-20 flex items-end justify-center"
        aria-hidden="true"
      >
        <div className="w-[70vw] md:w-[52vw] h-[44%] md:h-2/3 bg-gradient-to-r from-transparent via-brand-yellow/35 to-transparent blur-3xl opacity-70 animate-footer-glow"></div>
      </div>

      {/* Animated shine sweep bar */}
      <div aria-hidden="true" className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[50vw] h-[3px] bg-gradient-to-r from-transparent via-brand-yellow/60 to-transparent rounded-full opacity-70 animate-footer-shine" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8 rounded-t-3xl backdrop-blur-[6px] bg-white/5 border-t-2 border-dashed border-brand-yellow transition-all duration-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="font-bold tracking-wide">Ruthu Parinika</p>
          <div className="flex space-x-5">
            <a href="#" className="text-brand-yellow hover:text-white transition-colors duration-300"><Youtube size={24} /></a>
            <a href="#" className="text-brand-yellow hover:text-white transition-colors duration-300"><Instagram size={24} /></a>
            <a href="#" className="text-brand-yellow hover:text-white transition-colors duration-300"><Send size={24} /></a>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm tracking-wide">&copy; 2025 Ruthu Parinika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
