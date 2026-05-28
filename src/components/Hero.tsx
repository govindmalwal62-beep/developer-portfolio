/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageSquare, Terminal, Github, Linkedin, Cpu } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

const ROLES = ["CSE Student", "AI Builder", "Web App Developer", "Problem Solver"];

export default function Hero({ onContactClick, onProjectsClick }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = ROLES[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing letters
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(90);

        if (currentText === fullText) {
          // Pause at complete text before starting delete
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting letters
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(45);

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setTypingSpeed(200); // delay before next word
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 -z-20 bg-neutral-50 dark:bg-[#08080c] transition-colors duration-300" />
      <div 
        className="absolute inset-0 -z-10 opacity-30 dark:opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(20, 184, 166, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 45%),
            linear-gradient(rgba(14, 116, 144, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 116, 144, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px'
        }}
      />

      {/* Futuristic Orbit Ring Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-teal-500/5 dark:border-teal-500/10 pointer-events-none -z-10 animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-cyan-500/5 dark:border-cyan-500/10 pointer-events-none -z-10 animate-[spin_60s_linear_infinite]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Title & Text */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          {/* Status Badge */}
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/25 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Internships & Projects
          </motion.div>

          {/* Main Title Headings */}
          <div className="space-y-3">
            <motion.h4
              id="hero-greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm sm:text-base font-semibold tracking-wide text-neutral-500 dark:text-teal-400 uppercase"
            >
              Hi there, I am
            </motion.h4>
            
            <motion.h1
              id="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-neutral-900 dark:text-white"
            >
              Govind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                Malwal
              </span>
            </motion.h1>

            {/* Typewriter text line */}
            <motion.div
              id="hero-typewriter-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="h-9 sm:h-12 flex items-center"
            >
              <p className="text-xl sm:text-2xl font-mono text-neutral-700 dark:text-neutral-300 font-medium tracking-tight">
                <span className="text-neutral-400 dark:text-neutral-500">&gt; </span>
                {currentText}
                <span className="animate-[pulse_1s_infinite] text-teal-500 font-bold">|</span>
              </p>
            </motion.div>
          </div>

          <motion.p
            id="hero-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-xl text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed"
          >
            I structure reliable, full-stack experiences, construct intelligent systems leveraging deep learning LLMs, and enjoy refining layouts with aesthetic, motion-driven engineering.
          </motion.p>

          {/* Action Button CTA row */}
          <motion.div
            id="hero-cta-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-btn-projects"
              onClick={onProjectsClick}
              className="group px-6 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-sans font-medium text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-neutral-950/10 dark:shadow-white/5 cursor-pointer"
            >
              View My Work
              <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              id="hero-btn-contact"
              onClick={onContactClick}
              className="px-6 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-white border border-neutral-200/60 dark:border-white/5 font-sans font-medium text-sm flex items-center justify-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-white/10 hover:border-teal-500/30 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-teal-500" />
              Contact Me
            </button>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            id="hero-social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-5 pt-4 text-neutral-400 dark:text-neutral-500"
          >
            <span className="text-xs font-mono tracking-widest uppercase">CONNECT //</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors" title="GitHub Profile">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500 transition-colors" title="LinkedIn Profile">
              <Linkedin className="w-5 h-5" />
            </a>
            <span className="flex items-center gap-1 text-xs font-mono text-neutral-400 dark:text-teal-500/80 bg-neutral-200/40 dark:bg-teal-500/5 px-2 py-0.5 rounded border border-neutral-300/30 dark:border-teal-500/10">
              <Terminal className="w-3 h-3" />
              <span>bash_on</span>
            </span>
          </motion.div>
        </div>

        {/* Right Column: Visual Avatar Box */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            id="hero-avatar-frame"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Ambient Back Glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-teal-500/15 to-cyan-500/20 blur-3xl rounded-full scale-95 pointer-events-none" />
            
            {/* Orbiting Tech Circle */}
            <div className="absolute inset-2 border border-dashed border-teal-500/20 rounded-3xl animate-[spin_40s_linear_infinite] pointer-events-none" />

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-500 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-500 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-500 rounded-br-2xl" />

            {/* Inner Profile Card Frame */}
            <div className="absolute inset-4 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/60 border border-neutral-300/20 dark:border-white/5 backdrop-blur-md overflow-hidden flex flex-col justify-between p-6">
              
              {/* Header telemetry of the abstract view */}
              <div className="flex items-center justify-between border-b border-neutral-200/40 dark:border-white/5 pb-4">
                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">ID: 404_AVATAR</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold">ONLINE</span>
              </div>

              {/* Graphic Icon Center representation */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-1 shadow-2xl shadow-teal-500/30">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
                    <Cpu className="w-14 h-14 text-teal-400 animate-[pulse_2s_infinite]" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-sans font-bold text-lg text-neutral-800 dark:text-white">Govind_Malwal.bin</h3>
                  <p className="font-mono text-xs text-teal-500 font-medium">B.Tech CSE Sophomore</p>
                </div>
              </div>

              {/* Footer telemetry details */}
              <div className="flex items-center justify-between border-t border-neutral-200/40 dark:border-white/5 pt-4 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  GCP_RUNNING
                </span>
                <span>V4_COMPILER</span>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
