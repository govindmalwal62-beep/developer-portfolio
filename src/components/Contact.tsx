/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Github, Linkedin, Instagram, Heart, CheckCircle2, User, HelpCircle, FileJson } from 'lucide-react';
import { portfolioService } from '../services/portfolioService';

interface ContactProps {
  prefilledSubject: string;
  setPrefilledSubject: (val: string) => void;
}

export default function Contact({ prefilledSubject, setPrefilledSubject }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorStatus, setErrorStatus] = useState('');

  // Handle subject pre-fills when parent state changes
  useEffect(() => {
    if (prefilledSubject) {
      setSubject(`Inquiry: ${prefilledSubject}`);
      // scroll contact form into view
      const target = document.querySelector('#contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefilledSubject]);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Please provide your name';
    if (!email.trim()) {
      tempErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@s]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Please enter a valid format (e.g. name@domain.com)';
    }
    if (!subject.trim()) tempErrors.subject = 'Please add a message subject';
    if (!message.trim()) {
      tempErrors.message = 'Please write your message';
    } else if (message.length < 10) {
      tempErrors.message = 'Core message must be at least 10 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorStatus('');

    try {
      await portfolioService.submitMessage({
        name,
        email,
        subject,
        message,
      });

      setSubmitSuccess(true);
      // Reset inputs
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setPrefilledSubject('');
    } catch (err: any) {
      console.error(err);
      setErrorStatus('Failed to send message securely. Check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-neutral-50 dark:bg-[#08080c] transition-colors duration-300 relative border-b border-neutral-100/10 dark:border-white/5"
    >
      {/* Background neon visual glows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[165px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-2 mb-16">
          <span className="font-mono text-xs text-teal-500 dark:text-teal-400 font-semibold tracking-widest uppercase">
            // TELEMETRIES CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Communication Details panel */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-neutral-800 dark:text-white tracking-tight">
                Let's discuss a secure project or internship.
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
                Send an inquiry via the encrypted form, or trigger direct connection channels below.
              </p>
            </div>

            {/* Quick Link Channels list */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 flex items-center gap-4">
                <div className="p-2 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 text-teal-500 border border-emerald-500/20 rounded-lg shrink-0">
                  <Mail className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-neutral-400 tracking-wider">EMAIL DIRECT</h4>
                  <a href="mailto:govindmalwal62@gmail.com" className="text-sm font-sans font-medium text-neutral-700 dark:text-neutral-300 hover:text-teal-400 transition-colors">
                    govindmalwal62@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 flex items-center gap-4">
                <div className="p-2 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 text-cyan-500 border border-cyan-500/20 rounded-lg shrink-0">
                  <FileJson className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-neutral-400 tracking-wider">NETWORK REGISTRY</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-none mt-1">State Level B.Tech CSP Sophomore</p>
                </div>
              </div>
            </div>

            {/* Social handles rows */}
            <div className="flex justify-center lg:justify-start items-center gap-4 text-neutral-500 dark:text-neutral-400">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 hover:text-teal-400 transition-colors hover:-translate-y-0.5" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 hover:text-teal-400 transition-colors hover:-translate-y-0.5" title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40 border border-neutral-300/30 dark:border-white/5 hover:text-teal-400 transition-colors hover:-translate-y-0.5" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Block: Crystal glass Contact Form panel */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-neutral-200/50 dark:bg-[#0c0d12] border border-neutral-300/30 dark:border-white/5 shadow-md relative min-h-[460px]">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <h3 className="font-sans font-bold text-lg text-neutral-900 dark:text-white">Message Transmitted Successfully!</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      Thank you for reaching out. Your transmission was successfully stored in the portfolio databases. I will follow up via email shortly.
                    </p>
                  </div>
                  
                  <button
                    id="contact-btn-restart"
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-4 py-2 font-mono text-xs font-semibold rounded-lg bg-neutral-200 dark:bg-white/5 hover:bg-neutral-350 dark:hover:bg-white/10 text-neutral-800 dark:text-white transition duration-200 cursor-pointer focus:outline-none"
                  >
                    SEND_ANOTHER_MESSAGE
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  {/* Form fields: Name and Email in grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <User className="w-3.5 h-3.5" /> Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950/60 border text-neutral-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/40 focus:border-teal-500/40 transition ${
                          errors.name ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/5'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950/60 border text-neutral-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/40 focus:border-teal-500/40 transition ${
                          errors.email ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/5'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Form fields: Subject */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <HelpCircle className="w-3.5 h-3.5" /> Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950/60 border text-neutral-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/40 focus:border-teal-500/40 transition ${
                        errors.subject ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/5'
                      }`}
                      placeholder="Inquiry or Project Proposal"
                    />
                    {errors.subject && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{errors.subject}</p>}
                  </div>

                  {/* Form fields: Core Message */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-950/60 border text-neutral-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/40 focus:border-teal-500/40 transition resize-none ${
                        errors.message ? 'border-red-500/50' : 'border-neutral-300 dark:border-white/5'
                      }`}
                      placeholder="Discuss details of the project you would like to initiate..."
                    />
                    {errors.message && <p className="text-red-500 text-[10px] sm:text-xs font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit state panel */}
                  {errorStatus && (
                    <p className="text-red-500 text-xs sm:text-sm font-semibold">{errorStatus}</p>
                  )}

                  <div className="pt-2 text-left">
                    <button
                      id="contact-btn-submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="group px-6 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-sans font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition duration-200 disabled:opacity-50 cursor-pointer w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-dashed border-teal-500 rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      )}
                      {isSubmitting ? 'Transmitting...' : 'Send Message'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
