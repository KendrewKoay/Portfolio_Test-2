import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfiniteSlider } from './components/InfiniteSlider';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { TeachingSection } from './components/TeachingSection';
import { ResearchSection } from './components/ResearchSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';
import { AppProvider, useApp } from './context/AppContext';

function PortfolioMain() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { theme } = useApp();
  const isLight = theme === 'light';

  // Scroll spy to update active section in header
  useEffect(() => {
    const sections = ['home', 'work', 'teaching', 'research', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        const el = document.getElementById(secId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(secId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className={`min-h-screen font-sans pt-[80px] antialiased transition-colors duration-300 ${
      isLight ? 'bg-[#fcfbf9] text-stone-800' : 'bg-[#050505] text-stone-300'
    }`}>
      {/* Fixed Top Bar */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Container */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <Hero onExploreClick={() => scrollToSection('work')} />

        {/* Infinite Image Slider */}
        <InfiniteSlider />

        {/* Selected Projects Grid */}
        <ProjectGrid projects={PROJECTS} onSelectProject={setSelectedProject} />

        {/* Teaching & Pedagogy Section */}
        <TeachingSection />

        {/* Research & Inquiry Section */}
        <ResearchSection />

        {/* About Section */}
        <AboutSection onContactClick={() => scrollToSection('contact')} />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Project Case Study Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortfolioMain />
    </AppProvider>
  );
}

