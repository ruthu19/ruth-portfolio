
import React from "react";
import { ArrowRight } from "lucide-react";
import GsapInfiniteCards from "./GsapInfiniteCards";

const Work = () => {
  return (
    <section id="portfolio" className="container mx-auto px-4 md:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-anton text-5xl">MY DESIGN WORK</h3>
        <a href="#" className="flex items-center space-x-2 font-bold hover:text-brand-yellow">
          <span>See All</span>
          <ArrowRight size={20} />
        </a>
      </div>
      <GsapInfiniteCards />
    </section>
  );
};

export default Work;
