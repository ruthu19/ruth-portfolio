
import React from 'react';

const Header = () => {
  return (
    <header className="py-6 px-4 md:px-8">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="#" className="font-anton text-2xl tracking-wider">RUTHU PARINIKA</a>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#portfolio" className="bg-brand-yellow text-brand-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors">PORTFOLIO</a>
          <a href="#experience" className="font-bold hover:text-brand-yellow transition-colors">EXPERIENCE</a>
          <a href="#contact" className="font-bold hover:text-brand-yellow transition-colors">CONTACT</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
