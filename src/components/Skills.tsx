/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Database, Cpu, Code2, CheckCircle2 } from 'lucide-react';
import { SKILL_GROUPS } from '../data';

const ICON_MAP: Record<string, any> = {
  Layout: Layout,
  Database: Database,
  Cpu: Cpu,
  Code2: Code2,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(SKILL_GROUPS[0].category);

  const activeGroup = SKILL_GROUPS.find((g) => g.category === activeCategory) || SKILL_GROUPS[0];
  const ActiveIcon = ICON_MAP[activeGroup.icon] || Code2;

  return (
    <section 
      id="skills" 
      className="py-24 bg-neutral-50 dark:bg-[#08080c] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background stardust glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // TECHNICAL MATRIX
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Skills &amp; Expertise
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SKILL_GROUPS.map((group) => {
            const isSelected = activeCategory === group.category;
            const GroupIcon = ICON_MAP[group.icon] || Code2;
            
            return (
              <button
                key={group.category}
                id={`skill-tab-${group.category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveCategory(group.category)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium border transition-all duration-200 focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white shadow-md'
                    : 'bg-neutral-100/80 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 border-neutral-200/50 dark:border-white/5 hover:border-teal-500/20 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/40'
                }`}
              >
                <GroupIcon className="w-4 h-4" />
                {group.category}
              </button>
            );
          })}
        </div>

        {/* Skill Board Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Block: Description card of the selection */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-200/40 dark:bg-neutral-900/20 border border-neutral-300/30 dark:border-white/5 backdrop-blur-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 flex items-center justify-center text-teal-500 border border-teal-500/10">
                <ActiveIcon className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-bold text-neutral-800 dark:text-white tracking-tight">
                {activeGroup.category}
              </h3>
              
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                Core technologies I deploy when drafting robust {activeGroup.category.toLowerCase()} modules. Focused on production-ready structures, code cleanability, and optimized response frameworks.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-200/50 dark:border-white/5 mt-6 space-y-2.5">
              <span className="font-mono text-[10px] text-neutral-400 tracking-wider block uppercase">SYSTEM PRINCIPLES //</span>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                <span>Responsive, Fluid Render Layouts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                <span>Modern Clean-Code Architectures</span>
              </div>
            </div>
          </div>

          {/* Right Block: Dynamic Progress list */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-200/50 dark:bg-[#0b0c10] border border-neutral-300/30 dark:border-white/5 shadow-sm block relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                id="active-skills-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex flex-col justify-center h-full"
              >
                {activeGroup.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-neutral-800 dark:text-white font-sans font-semibold">
                        {skill.name}
                      </span>
                      <span className="font-mono text-teal-500 dark:text-teal-400 font-bold">
                        {skill.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2.5 w-full bg-neutral-300 dark:bg-neutral-850 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full relative"
                      >
                        {/* Glow tip node */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-40 shadow-[0_0_8px_white]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
