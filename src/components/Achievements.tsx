/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, Code, Github, Star, Sparkles, Award } from 'lucide-react';
import { ACHIEVEMENTS } from '../data';

const ICON_MAP: Record<string, any> = {
  Trophy: Trophy,
  Code: Code,
  Github: Github,
};

const MAIN_STATS = [
  { value: '750+', label: 'Algorithm Solves', icon: Code, desc: 'Across LeetCode & Codeforces platforms' },
  { value: '9.4/10', label: 'Academic GPA', icon: Award, desc: 'CSE program sophomore ranking' },
  { value: '15k+', label: 'Package Installs', icon: Github, desc: 'Open-source code downloads on npm' },
  { value: '1st', label: 'Hackathon Rank', icon: Trophy, desc: 'Smart Cities mobility award champion' }
];

export default function Achievements() {
  return (
    <section 
      id="achievements" 
      className="py-24 bg-neutral-100/50 dark:bg-[#060609] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background spot light glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // ACCLAIM & METRICS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Honors &amp; Accomplishments
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Big Counter Bento Cards Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MAIN_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.label}
                id={`stat-counter-card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-white/5 backdrop-blur-md shadow-sm hover:border-teal-500/20 transition-all text-center flex flex-col items-center justify-between space-y-4"
              >
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 border border-emerald-500/10 flex items-center justify-center text-teal-500">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                
                <div className="space-y-1">
                  <span className="text-2xl sm:text-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 font-sans font-extrabold tracking-tight block">
                    {stat.value}
                  </span>
                  <h4 className="font-sans font-bold text-neutral-800 dark:text-neutral-100 text-xs sm:text-sm tracking-tight leading-none">
                    {stat.label}
                  </h4>
                </div>

                <p className="font-sans text-[10px] sm:text-xs text-neutral-500 leading-snug">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Narrative Hackathon block with awards details */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h4 className="font-mono text-xs text-neutral-400 text-center tracking-widest uppercase">// SPOTLIGHT INVENTIONS</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((ach) => {
              const AchIcon = ICON_MAP[ach.icon] || Award;
              
              return (
                <div
                  key={ach.id}
                  id={`spotlight-badge-${ach.id}`}
                  className="p-5 sm:p-6 rounded-2xl bg-neutral-200/45 dark:bg-[#0a0c10] border border-neutral-300/40 dark:border-white/5 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[9px] font-bold uppercase tracking-wider">
                      {ach.metric}
                    </span>
                    <AchIcon className="w-5 h-5 text-teal-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-white leading-tight">
                      {ach.title}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                  
                  <div className="pt-2 flex items-center gap-1.5 font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-auto border-t border-neutral-300/30 dark:border-white/5">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>VERIFIED RECORD</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
