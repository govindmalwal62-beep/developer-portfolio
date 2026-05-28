/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Database, Shield, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ darkMode, setDarkMode, onAdminToggle, isAdminMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = NAV_LINKS.map(link => {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            label: link.label,
            top: rect.top + window.scrollY - 100,
            bottom: rect.bottom + window.scrollY - 100,
          };
        }
        return null;
      }).filter(Boolean);

      const scrollPos = window.scrollY;
      const current = sections.find(
        (sec) => sec && scrollPos >= sec.top && scrollPos < sec.bottom
      );
      if (current) {
        setActiveLink(current.label);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveLink(label);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-neutral-950/70 dark:bg-neutral-950/80 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'Home')}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-mono font-bold text-lg shadow-emerald-500/20 shadow-md group-hover:rotate-6 transition-all duration-350">
              GM
            </span>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base tracking-tight text-neutral-950 dark:text-white leading-none">
                Govind Malwal
              </span>
              <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                CREATIVE DEVELOPER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-neutral-900/5 dark:bg-neutral-900/40 p-1 rounded-full border border-neutral-200/40 dark:border-white/5 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
              const active = activeLink === link.label;
              return (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium tracking-tight transition-colors duration-200 ${
                    active
                      ? 'text-neutral-50 dark:text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-100'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navItemActive"
                      className="absolute inset-0 bg-neutral-950 dark:bg-white/10 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Admin toggle button */}
            <button
              id="admin-panel-toggle"
              onClick={onAdminToggle}
              title="Admin Dashboard Portal"
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-mono transition-all duration-205 focus:outline-none ${
                isAdminMode
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-500/30'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200/80 dark:border-white/5 hover:border-cyan-500/40 dark:hover:border-cyan-400/40'
              }`}
            >
              {isAdminMode ? (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin On</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Console</span>
                </>
              )}
            </button>

            {/* Dark & Light Switch */}
            <button
              id="theme-switcher"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-teal-500/20"
              aria-label="Toggle visual theme"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-nav-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/5 text-neutral-600 dark:text-neutral-400 focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-neutral-950 dark:bg-neutral-950 border-b border-white/5 shadow-2xl relative"
          >
            <div className="px-4 py-4 space-y-2 max-w-7xl mx-auto">
              {NAV_LINKS.map((link) => {
                const active = activeLink === link.label;
                return (
                  <a
                    key={link.label}
                    id={`mobile-nav-${link.label.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      active
                        ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-l-2 border-teal-500 text-teal-400 font-semibold'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
