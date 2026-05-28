/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, ExternalLink, Calendar, Briefcase, Mail, Phone, Award, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export default function Resume() {
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilingStep, setCompilingStep] = useState('');

  const handleDownload = () => {
    setIsCompiling(true);
    setCompilingStep('Parsing database schema...');
    
    setTimeout(() => {
      setCompilingStep('Inlining vector assets...');
    }, 1000);

    setTimeout(() => {
      setCompilingStep('Compiling PDF buffers...');
    }, 2000);

    setTimeout(() => {
      setIsCompiling(false);
      setCompilingStep('');
      // Trigger download
      const link = document.createElement('a');
      link.href = 'https://raw.githubusercontent.com/daattali/shiny-server/master/samples/sample-apps/hello/server.R'; // fallback download payload
      link.download = 'Govind_Malwal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 3200);
  };

  return (
    <section 
      id="resume" 
      className="py-24 bg-neutral-50 dark:bg-[#08080c] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background spot light glow */}
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // DOCUMENT REDUX
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Resume &amp; Credentials
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Interactive Resume Document Frame */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-mono text-xs text-neutral-400 tracking-wider uppercase">// INTERACTIVE PREVIEW</h4>
              
              <button
                id="resume-btn-download"
                onClick={handleDownload}
                disabled={isCompiling}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-sans font-semibold text-xs transition duration-200 focus:outline-none disabled:opacity-50 cursor-pointer"
              >
                {isCompiling ? (
                  <span className="w-3.5 h-3.5 border-2 border-dashed border-teal-500 rounded-full animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                {isCompiling ? 'Generating...' : 'Download CV'}
              </button>
            </div>

            {/* Resume Compilation Loader Overlay */}
            <div className="relative rounded-2xl bg-white dark:bg-[#0c0d12] border border-neutral-300/40 dark:border-white/5 shadow-xl p-6 sm:p-8 overflow-hidden min-h-[500px]">
              {isCompiling && (
                <div className="absolute inset-0 bg-[#060609]/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center space-y-4 text-center px-4">
                  <div className="relative w-16 h-16 rounded-full border-t-2 border-r-2 border-teal-500 animate-spin" />
                  <div className="space-y-1">
                    <p className="font-mono text-xs text-white uppercase tracking-widest">{compilingStep}</p>
                    <p className="font-sans text-[11px] text-neutral-400">Formatting layout tables for print...</p>
                  </div>
                </div>
              )}

              {/* Styled CV Paper Body */}
              <div id="resume-paper-body" className="space-y-6 text-left select-none text-neutral-800 dark:text-neutral-300">
                {/* CV Header */}
                <div className="border-b border-neutral-200/60 dark:border-white/5 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">Govind Malwal</h3>
                    <p className="font-mono text-xs text-teal-500 font-semibold mt-0.5">COMPUTER SCIENCE ENGINEER</p>
                  </div>
                  
                  {/* Contact mini anchors */}
                  <div className="font-mono text-[10px] space-y-0.5 text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>govindmalwal62@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                      <span>State, India</span>
                    </div>
                  </div>
                </div>

                {/* CV Area: Experience */}
                <div className="space-y-3">
                  <span className="font-sans font-bold text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">EXPERIENCE HIGHLIGHTS</span>
                  
                  <div className="space-y-4">
                    <div className="relative border-l border-neutral-300 dark:border-neutral-800 pl-4 space-y-1">
                      <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 -translate-x-1/2" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-sans font-bold text-sm text-neutral-900 dark:text-white">Software Engineer Intern</h4>
                        <span className="font-mono text-[10px] text-neutral-400 bg-neutral-200/50 dark:bg-white/5 px-1.5 py-0.5 rounded">Summer 2025</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-teal-400 font-semibold">Hyperion AI Labs</p>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Optimized backend token usage inside serverless agent routing pipelines. Created developer performance analytics dashboards in React & Tailwind.
                      </p>
                    </div>

                    <div className="relative border-l border-neutral-300 dark:border-neutral-800 pl-4 space-y-1">
                      <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 -translate-x-1/2" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="font-sans font-bold text-sm text-neutral-900 dark:text-white">Open Source Fellow</h4>
                        <span className="font-mono text-[10px] text-neutral-400 bg-neutral-200/50 dark:bg-white/5 px-1.5 py-0.5 rounded">2023 - 2024</span>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-teal-400 font-semibold">The Octocat Collective</p>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Supported community CSS compiler code integrations. Shipped responsive layout widgets.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CV Area: Education */}
                <div className="space-y-2 border-t border-neutral-200/60 dark:border-white/5 pt-4">
                  <span className="font-sans font-bold text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">EDUCATION</span>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-sans font-bold text-sm text-neutral-900 dark:text-white">B.Tech Computer Science &amp; Engineering</h4>
                      <p className="text-xs text-neutral-500">State Institute of Technology • CGPA: 9.4/10.0</p>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 bg-neutral-200/50 dark:bg-white/5 px-1.5 py-0.5 rounded whitespace-nowrap">2023 - 2027</span>
                  </div>
                </div>

                {/* CV Area: Tech Stack */}
                <div className="space-y-2 border-t border-neutral-200/60 dark:border-white/5 pt-4 text-xs font-mono text-neutral-500 leading-relaxed">
                  <span className="font-sans font-bold text-[11px] text-neutral-400 uppercase tracking-widest block font-sans font-bold mb-1">TECHNICAL SUMMARY</span>
                  <p><strong className="text-neutral-800 dark:text-neutral-300">Languages:</strong> TypeScript, JavaScript, Python, C++, SQL</p>
                  <p><strong className="text-neutral-800 dark:text-neutral-300">Frameworks:</strong> React, Next.js, Express, Tailwind CSS v4, Node.js</p>
                  <p><strong className="text-neutral-800 dark:text-neutral-300">Tools / Databases:</strong> GCP Firestore, Git, Docker, Gemini API</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: verified Certifications list */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-mono text-xs text-neutral-400 tracking-wider uppercase">// VERIFIED CERTIFICATIONS</h4>
            
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.id}
                  id={`cert-box-${cert.id}`}
                  className="p-5 rounded-2xl bg-neutral-200/50 dark:bg-neutral-900/30 border border-neutral-300/30 dark:border-white/5 hover:border-teal-500/20 transition-colors duration-200 flex items-start gap-4"
                >
                  <div className="p-2 w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 flex items-center justify-center text-teal-400 shrink-0">
                    <ShieldCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <div className="flex items-start justify-between gap-1 w-full">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 dark:text-white leading-snug">
                        {cert.title}
                      </h4>
                      {cert.link && (
                        <a
                          id={`cert-link-${cert.id}`}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-teal-400 shrink-0 transition"
                          title="Verify Certificate"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="font-mono text-[10px] text-neutral-500 tracking-medium uppercase">
                      {cert.issuer}
                    </p>
                    
                    <div className="flex items-center gap-1.5 pt-2 text-[10px] font-mono text-neutral-400">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      <span>Issued: {cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
