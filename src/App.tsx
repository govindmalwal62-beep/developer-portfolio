/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Eye, Heart, Terminal } from 'lucide-react';
import { portfolioService } from './services/portfolioService';
import { Project } from './types';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Achievements from './components/Achievements';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Theme & layout states
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing portfolios...');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [prefilledSubject, setPrefilledSubject] = useState('');

  // Mouse coordinate state for the subtle cursor spotlight shader glow
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Projects dynamic state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync Tailwind dark class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Loading animation simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const progressInterval = setInterval(() => {
      setLoadPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          return 100;
        }
        
        // Micro-texts during specific percentages
        if (prev === 20) setLoadingText('Synthesizing motion animations...');
        if (prev === 50) setLoadingText('Assembling database layers...');
        if (prev === 80) setLoadingText('Resolving assets matrices...');
        
        return prev + 5;
      });
    }, 70);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Fetch projects on boot
  useEffect(() => {
    loadProjectsData();
  }, []);

  const loadProjectsData = async () => {
    try {
      const projs = await portfolioService.getProjects();
      setProjects(projs);
    } catch (err) {
      console.error("Could not fetch projects list:", err);
    }
  };

  // Tracking mouse movement and scroll for back-to-top
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInquire = (serviceName: string) => {
    setPrefilledSubject(serviceName);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-300 ${
      darkMode ? 'bg-[#08080c] text-neutral-200' : 'bg-neutral-50 text-neutral-800'
    }`}>
      
      {/* 1. INITIAL FULL PAGE SYSTEM LOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="app-loader"
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-neutral-950 z-[999] flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <div className="relative space-y-6 max-w-sm w-full">
              {/* Spinning core */}
              <div className="relative w-16 h-16 rounded-full border border-teal-500/15 flex items-center justify-center mx-auto scale-110">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                <span className="font-mono text-teal-400 font-bold text-lg leading-none">GM</span>
              </div>

              {/* Progress counter typography */}
              <div className="space-y-2">
                <h3 className="font-mono text-4xl font-extrabold tracking-tight text-white">{loadPercentage}%</h3>
                <p className="font-mono text-[10px] text-teal-500 uppercase tracking-widest">{loadingText}</p>
              </div>

              {/* Loader strip line indicator */}
              <div className="h-1 bg-neutral-900 rounded-full overflow-hidden w-40 mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                  style={{ width: `${loadPercentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMIC CURSOR GLOW SPOTLIGHT OVERLAY */}
      <div
        id="cursor-glowing-shade"
        className="pointer-events-none fixed inset-0 z-30 opacity-40 dark:opacity-60 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${
            darkMode ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.02)'
          }, transparent 80%)`,
        }}
      />

      {/* 3. CORE WEB COMPONENTS ASSEMBLY */}
      {!isLoading && (
        <>
          {/* Custom Navigation */}
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
            isAdminMode={isAdminOpen}
          />

          <main id="app-main-content">
            {/* Sections components list */}
            <Hero
              onContactClick={() => scrollToSection('#contact')}
              onProjectsClick={() => scrollToSection('#projects')}
            />
            
            <About />
            
            <Skills />
            
            <Projects projects={projects} />
            
            <Services onInquire={handleInquire} />
            
            <Resume />
            
            <Achievements />
            
            <Testimonials />
            
            <Contact
              prefilledSubject={prefilledSubject}
              setPrefilledSubject={setPrefilledSubject}
            />
          </main>

          {/* FOOTER */}
          <footer
            id="app-footer"
            className="py-12 bg-neutral-100 dark:bg-neutral-950 text-neutral-500 border-t border-neutral-200 dark:border-white/5 font-sans"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 font-mono font-bold text-sm">
                  GM
                </span>
                <p className="text-xs font-mono font-bold tracking-tight text-neutral-700 dark:text-neutral-400">
                  Govind Malwal &copy; 2026 // ALL RULES APPLIED
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <Heart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Crafted with modular design</span>
              </div>

              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[9px] font-bold uppercase tracking-widest">
                Deployments: Live
              </span>
            </div>
          </footer>

          {/* BACK TO TOP FLOATING BUTTON */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                id="back-to-top"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleScrollToTop}
                title="Slick Scroll To Top"
                className="fixed bottom-6 right-6 p-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xl border border-white/10 dark:border-white/5 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer z-40 focus:outline-none"
              >
                <ChevronUp className="w-4.5 h-4.5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* ADMIN PORTAL PANEL MODAL */}
          <AnimatePresence>
            {isAdminOpen && (
              <AdminPanel
                onClose={() => setIsAdminOpen(false)}
                projects={projects}
                refreshProjects={loadProjectsData}
              />
            )}
          </AnimatePresence>
        </>
      )}

    </div>
  );
}
