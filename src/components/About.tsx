/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Calendar, Award, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { TIMELINE } from '../data';

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 bg-neutral-100/50 dark:bg-[#060609] transition-colors duration-300 overflow-hidden relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background soft lighting blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // JOURNEY & ROADMAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Narrative Prose */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-neutral-800 dark:text-white tracking-tight">
              A computer science student designing creative state-of-the-art web systems.
            </h3>
            
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              I am Govind Malwal, a Computer Science & Engineering student driven by a deep fascination with automation, full-stack systems, and artificial intelligence. 
              Currently exploring modern rendering practices in React coupled with serverless cloud architectures.
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
              My engineering process lies at the intersection of logical schema architecture and responsive interface performance. I believe complex products deserve responsive, elegant, and humble design solutions that focus purely on user outcomes.
            </p>

            {/* Quick stats mini cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 backdrop-blur-sm">
                <BookOpen className="w-5 h-5 text-teal-500 mb-2" />
                <h4 className="font-sans font-bold text-neutral-800 dark:text-white text-sm">9.4 Cumulative GPA</h4>
                <p className="font-mono text-[10px] text-neutral-500 mt-1">TOP OF CLASS SECT</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 backdrop-blur-sm">
                <Award className="w-5 h-5 text-cyan-500 mb-2" />
                <h4 className="font-sans font-bold text-neutral-800 dark:text-white text-sm">30+ Open Source PRs</h4>
                <p className="font-mono text-[10px] text-neutral-500 mt-1">GLOBAL CONTRIBUTOR</p>
              </div>
            </div>
          </div>

          {/* Education Details Column */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-mono text-xs text-neutral-400 tracking-wider uppercase">// EDUCATION PROFILE</h4>
            
            <div className="relative p-5 sm:p-6 rounded-2xl bg-neutral-200/45 dark:bg-[#0b0c10] border border-neutral-300/40 dark:border-white/5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-teal-500 border border-emerald-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[11px] text-teal-500 font-semibold tracking-wider uppercase">2023 - 2027 (EXPECTED)</span>
                  <h4 className="text-lg font-sans font-bold text-neutral-800 dark:text-white leading-snug">Bachelor of Technology</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Computer Science & Engineering</p>
                  <p className="text-xs text-neutral-500 mt-2">
                    Core Modules: Artificial Intelligence, Data Structures & Algorithms, Database Management Engine, Computer Networking, Operating Systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Timeline Roadmap */}
        <div>
          <h4 className="font-mono text-xs text-neutral-400 text-center tracking-widest uppercase mb-10">// TIMELINE & MILESTONES</h4>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Center spine */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-neutral-300 dark:bg-neutral-800 -translate-x-1/2" />

            {/* Timeline Blocks */}
            <div className="space-y-12">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={item.id} className="relative flex flex-col md:flex-row items-start md:justify-between md:odd:flex-row-reverse">
                    
                    {/* Year Marker in Center */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-50 dark:bg-[#08080c] border border-neutral-300 dark:border-neutral-700 z-10">
                      <Calendar className="w-3.5 h-3.5 text-teal-500" />
                    </div>

                    {/* Timeline Glass Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      className={`ml-14 md:ml-0 md:w-[45%] p-5 sm:p-6 rounded-2xl bg-neutral-200/50 dark:bg-neutral-900/30 border border-neutral-300/30 dark:border-white/5 backdrop-blur-md shadow-sm`}
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="font-mono text-[10px] text-teal-500 font-semibold uppercase tracking-wide">
                          {item.year}
                        </span>
                        <h4 className="text-base sm:text-lg font-sans font-bold text-neutral-800 dark:text-white leading-tight">
                          {item.role}
                        </h4>
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                          {item.institution}
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                    
                    {/* Empty block to balance grid on desktop */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
