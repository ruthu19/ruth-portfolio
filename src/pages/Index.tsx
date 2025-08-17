
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import GooeyOverlay from '@/components/GooeyOverlay';

const Index = () => {
  return (
    <div className="bg-black min-h-screen">
      <GooeyOverlay />
      {/* Main Content */}
      <Header />
      <main>
        <Hero />
        <Skills />
        <div className="container mx-auto px-4 md:px-8">
          <Experience />
        </div>
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
};

export default Index;

