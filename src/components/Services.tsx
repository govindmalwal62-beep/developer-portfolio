/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Monitor, Sparkles, AppWindow, Cpu, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';

const ICON_MAP: Record<string, any> = {
  Monitor: Monitor,
  Sparkles: Sparkles,
  AppWindow: AppWindow,
  Cpu: Cpu,
};

interface ServicesProps {
  onInquire: (serviceName: string) => void;
}

export default function Services({ onInquire }: ServicesProps) {
  return (
    <section 
      id="services" 
      className="py-24 bg-neutral-50 dark:bg-[#08080c] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background stardust flare */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-teal-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // CAPABILITIES & SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            What I Can Offer
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || Cpu;
            
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-neutral-200/50 dark:bg-[#0c0d12] border border-neutral-300/30 dark:border-white/5 transition-all duration-200 hover:border-teal-500/20 hover:shadow-lg dark:hover:shadow-teal-500/5 min-h-[285px]"
              >
                {/* Micro Ambient Glow behind card */}
                <div className="absolute -inset-[1px] bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300 -z-10 blur-[1px]" />

                <div className="space-y-4">
                  {/* Styled Icon Wrapper */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 flex items-center justify-center text-teal-500 group-hover:scale-105 transition-transform duration-250">
                    <IconComponent className="w-4.5 h-4.5 text-teal-500" />
                  </div>

                  <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-800 dark:text-white tracking-tight group-hover:text-teal-500 transition-colors">
                    {service.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Engagement Inquiry action */}
                <button
                  id={`service-btn-inquire-${service.id}`}
                  onClick={() => onInquire(service.title)}
                  className="flex items-center gap-1 text-xs font-mono font-bold text-teal-500 dark:text-teal-400 group-hover:text-teal-400 group-hover:underline pt-4 mt-6 border-t border-neutral-200/50 dark:border-white/5 text-left w-full focus:outline-none cursor-pointer"
                >
                  <span>INQUIRE_SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform ml-auto" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
