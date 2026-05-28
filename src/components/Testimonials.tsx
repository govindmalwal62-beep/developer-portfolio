/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto cyclic slider hook
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section 
      id="testimonials" 
      className="py-24 bg-neutral-100/30 dark:bg-[#060609] transition-colors duration-300 relative overflow-hidden border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background spot light glow */}
      <div className="absolute bottom-1/2 right-1/3 w-[400px] h-[400px] bg-emerald-500/5 blur-[155px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // CLIENT ADVOCATES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Endorsements
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[340px] flex items-center justify-center">
          
          {/* Quote Mark Icon background */}
          <div className="absolute top-0 left-6 opacity-5 dark:opacity-[0.03] pointer-events-none text-teal-400">
            <Quote className="w-40 h-40" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              id={`testimonial-slide-${current.id}`}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full p-6 sm:p-10 rounded-3xl bg-neutral-200/50 dark:bg-[#0b0c10] border border-neutral-300/30 dark:border-white/5 shadow-sm relative z-10 flex flex-col items-center text-center space-y-6"
            >
              <div className="flex gap-1 justify-center">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <p className="text-sm sm:text-base md:text-lg italic font-sans font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
                "{current.text}"
              </p>

              {/* Endorser Badge metadata */}
              <div className="flex items-center gap-3.5 pt-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-teal-500/30"
                />
                
                <div className="text-left space-y-0.5">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 dark:text-white leading-none">
                    {current.name}
                  </h4>
                  <p className="font-mono text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                    {current.role} • <strong className="font-semibold text-teal-500 dark:text-teal-400">{current.company}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left/Right controls indicators */}
          <div className="absolute inset-y-0 -left-4 sm:-left-12 lg:-left-20 flex items-center z-20">
            <button
              id="testimonial-control-prev"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-neutral-200/60 dark:bg-[#0b0c10]/40 border border-neutral-300 dark:border-white/5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-300 dark:hover:bg-neutral-900/60 transition focus:outline-none cursor-pointer"
              aria-label="Previous Endorsement"
            >
              <ChevronLeft className="w-5.5 h-5.5" />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-4 sm:-right-12 lg:-right-20 flex items-center z-20">
            <button
              id="testimonial-control-next"
              onClick={handleNext}
              className="p-2 rounded-xl bg-neutral-200/60 dark:bg-[#0b0c10]/40 border border-neutral-300 dark:border-white/5 text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-300 dark:hover:bg-neutral-900/60 transition focus:outline-none cursor-pointer"
              aria-label="Next Endorsement"
            >
              <ChevronRight className="w-5.5 h-5.5" />
            </button>
          </div>
        </div>

        {/* Dots indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {TESTIMONIALS.map((col, idx) => (
            <button
              key={col.id}
              id={`testimonial-dot-${idx}`}
              onClick={() => setIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                index === idx ? 'w-6 bg-teal-500' : 'w-2.5 bg-neutral-350 dark:bg-neutral-800'
              }`}
              style={{ padding: 0 }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
