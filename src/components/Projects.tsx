/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, FolderOpen, Filter } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const CATEGORIES = ['All', 'AI', 'Web Apps', 'Games', 'College Projects'];

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section 
      id="projects" 
      className="py-24 bg-neutral-100/30 dark:bg-[#060609] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background spot light glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // RECENT BUILDS
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mb-16">
          <Filter className="w-4 h-4 text-neutral-400 mr-1.5 hidden sm:inline" />
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-sans font-medium border transition-all duration-200 focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 border-neutral-200/50 dark:border-white/5 hover:border-teal-500/20 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Cards Bento Grid layout */}
        <motion.div
          id="projects-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-neutral-200/55 dark:bg-neutral-900/30 border border-neutral-300/40 dark:border-white/5 transition-all duration-300 hover:border-teal-500/30 hover:shadow-xl dark:hover:shadow-teal-500/5"
              >
                {/* Project Image Panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-200 dark:bg-neutral-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent z-10 opacity-70" />
                  
                  {/* Category Pill Tag overlaid */}
                  <span className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-md bg-neutral-950/80 dark:bg-[#060609]/90 border border-white/10 dark:border-white/5 font-mono text-[10px] text-teal-400 font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>

                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Card Context Body */}
                <div className="flex-1 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-sans font-bold text-neutral-800 dark:text-white leading-tight group-hover:text-teal-500 transition-colors">
                        {project.title}
                      </h3>
                      <FolderOpen className="min-w-4 h-4 text-neutral-400 dark:text-neutral-500 mt-1" />
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-neutral-300/40 dark:bg-teal-500/5 border border-neutral-400/20 dark:border-teal-500/10 font-mono text-[9px] sm:text-[10px] text-neutral-700 dark:text-teal-400 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons footer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-200/50 dark:border-white/5">
                      {project.liveUrl && (
                        <a
                          id={`project-live-${project.id}`}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-sans font-medium text-neutral-800 dark:text-teal-400 hover:text-neutral-950 dark:hover:text-teal-300 transition-colors"
                        >
                          Live Demo
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      
                      {project.githubUrl && (
                        <a
                          id={`project-git-${project.id}`}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-sans font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-200 transition-colors ml-auto"
                        >
                          <Github className="w-4 h-4" />
                          Code Repo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 px-4 border border-dashed border-neutral-300 dark:border-white/10 rounded-2xl">
            <p className="text-neutral-500 dark:text-neutral-400 font-mono text-sm">No builds found in category "{selectedCategory}"</p>
          </div>
        )}

      </div>
    </section>
  );
}
