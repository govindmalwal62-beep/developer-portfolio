/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { 
  Lock, 
  Unlock, 
  Terminal, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Mail, 
  Database,
  Calendar, 
  LogOut, 
  X, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { auth, isFirebaseConfigured } from '../firebase';
import { portfolioService } from '../services/portfolioService';
import { Project, Message } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  projects: Project[];
  refreshProjects: () => void;
}

export default function AdminPanel({ onClose, projects, refreshProjects }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  
  // Local bypass states
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Content states
  const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  
  // Project editing forms states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Form values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Project['category']>('AI');
  const [techInput, setTechInput] = useState('');
  const [image, setImage] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  
  // Handle auth subscriber
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsub = auth.onAuthStateChanged((user: any) => {
        if (user && user.email === 'govindmalwal62@gmail.com' && user.emailVerified) {
          setIsAuthenticated(true);
          setAdminUser(user);
        } else {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      });
      return () => unsub();
    }
  }, []);

  // Fetch messages once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated]);

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const msgs = await portfolioService.getMessages();
      setMessages(msgs);
    } catch (err) {
      console.error("Messages fetch denied or failed:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured || !auth) {
      setLoginError("Firebase setup is pending. Use local bypass passcode instead.");
      return;
    }
    setLoginError('');
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      if (user.email !== 'govindmalwal62@gmail.com') {
        await signOut(auth);
        setLoginError("Unauthorized access. Only govindmalwal62@gmail.com is configured.");
      }
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handlePasscodeSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Support the local testing as requested by system rules
    if (passcode.toLowerCase() === 'admin' || passcode === 'govind62') {
      setIsAuthenticated(true);
      setAdminUser({ email: 'local_demo_admin@portfolio.local', displayName: 'Developer Admin (Offline)' });
    } else {
      setLoginError('Invalid Administrator verification code. Default code is: admin');
    }
  };

  const handleSignOut = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const handleOpenForm = (proj?: Project) => {
    setLoginError('');
    if (proj) {
      setEditingProject(proj);
      setTitle(proj.title);
      setDescription(proj.description);
      setCategory(proj.category);
      setTechInput(proj.techStack.join(', '));
      setImage(proj.image);
      setLiveUrl(proj.liveUrl || '');
      setGithubUrl(proj.githubUrl || '');
    } else {
      setEditingProject(null);
      setTitle('');
      setDescription('');
      setCategory('AI');
      setTechInput('');
      setImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');
      setLiveUrl('');
      setGithubUrl('');
    }
    setIsFormOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please provide at least a title and description.");
      return;
    }

    const techStack = techInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const projectPayload = {
      title,
      description,
      category,
      techStack,
      image: image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      liveUrl,
      githubUrl,
    };

    try {
      if (editingProject) {
        await portfolioService.updateProject(editingProject.id, projectPayload);
      } else {
        await portfolioService.createProject(projectPayload);
      }
      setIsFormOpen(false);
      refreshProjects();
    } catch (err: any) {
      alert(`Operation Failed: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project document permanently?")) return;
    try {
      await portfolioService.deleteProject(id);
      refreshProjects();
    } catch (err: any) {
      alert(`Deletion Failed: ${err.message}`);
    }
  };

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        id="admin-panel"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="w-full max-w-5xl bg-neutral-100 dark:bg-[#0b0c10] border border-neutral-300 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl min-h-[550px]"
      >
        
        {/* Header Block bar */}
        <div className="p-5 border-b border-neutral-200 dark:border-white/10 bg-neutral-200/50 dark:bg-neutral-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </span>
            <div>
              <h2 className="font-sans font-bold text-sm sm:text-base text-neutral-800 dark:text-white leading-none">Console Administration</h2>
              <p className="font-mono text-[9px] text-neutral-400 mt-1 uppercase">DYNAMIC ENGINE PANEL // ROOT</p>
            </div>
          </div>

          <button id="admin-btn-close" onClick={onClose} className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-white/5 transition focus:outline-none">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Validation View */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 max-w-sm mx-auto text-center space-y-6">
            <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full flex items-center justify-center animate-pulse">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-sans font-bold text-neutral-800 dark:text-white leading-none">Enter Administrator Code</h3>
              <p className="text-xs text-neutral-500">Sign in with authorized Google credentials, or enter the local preview testing password.</p>
            </div>

            {/* Google Authentication Trigger */}
            {isFirebaseConfigured && (
              <button
                id="admin-btn-google-sign-in"
                onClick={handleGoogleSignIn}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-sans font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
              >
                Sign In with Google SSO
              </button>
            )}

            {/* Quick Demo Login Option */}
            <form onSubmit={handlePasscodeSignIn} className="w-full space-y-3">
              <div className="relative">
                <input
                  id="admin-passcode-field"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Verification code (e.g. admin)"
                  className="w-full px-4 py-2 bg-neutral-200/50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-white/5 rounded-xl text-xs text-center focus:outline-none focus:ring-1 focus:ring-teal-500/40 text-neutral-800 dark:text-white"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-[10px] leading-tight font-medium bg-red-500/10 p-1.5 rounded">{loginError}</p>
              )}

              <button
                id="admin-btn-pass-submit"
                type="submit"
                className="w-full px-4 py-2 rounded-xl bg-neutral-200 dark:bg-white/5 border border-neutral-300 dark:border-white/5 hover:bg-neutral-300 dark:hover:bg-white/10 text-neutral-700 dark:text-white text-xs font-mono transition cursor-pointer focus:outline-none uppercase"
              >
                TEST_LOCAL_BYPASS
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row items-stretch">
            {/* Sidebar dashboard directories selectors */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-white/5 bg-neutral-200/20 dark:bg-neutral-950/20 p-4 space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">OPERATIONS CONTEXT:</span>
                <p className="text-xs font-sans font-semibold text-neutral-700 dark:text-white truncate">{adminUser?.email || adminUser?.displayName}</p>
              </div>

              <div className="flex md:flex-col gap-1 w-full">
                <button
                  id="tab-select-projects"
                  onClick={() => setActiveTab('projects')}
                  className={`flex-1 md:flex-none text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium flex items-center gap-2 transition duration-150 focus:outline-none cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/5'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  Portfolio Projects
                </button>
                <button
                  id="tab-select-messages"
                  onClick={() => {
                    setActiveTab('messages');
                    loadMessages();
                  }}
                  className={`flex-1 md:flex-none text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans font-medium flex items-center gap-2 transition duration-150 focus:outline-none cursor-pointer ${
                    activeTab === 'messages'
                      ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/5'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Visitor Inbox ({messages.length})
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-white/5 text-left flex">
                <button
                  id="admin-sign-out"
                  onClick={handleSignOut}
                  className="px-3 py-1.5 text-[10px] uppercase font-mono font-bold text-red-500 hover:text-red-400 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Principal Directory Area */}
            <div className="flex-1 p-6 overflow-y-auto max-h-[500px]">
              
              {/* Tab: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/5 pb-4">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-800 dark:text-white">Active Projects Record</h3>
                    <button
                      id="admin-btn-add-proj"
                      onClick={() => handleOpenForm()}
                      className="px-3.5 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20 font-sans font-semibold text-xs flex items-center gap-1 hover:bg-teal-500/20 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> New Record
                    </button>
                  </div>

                  {/* Form pop layout container */}
                  <AnimatePresence>
                    {isFormOpen && (
                      <motion.form
                        id="admin-project-form"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        onSubmit={handleSaveProject}
                        className="p-5 rounded-2xl bg-neutral-200/50 dark:bg-[#07080c] border border-neutral-300 dark:border-white/5 space-y-4"
                      >
                        <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-850 dark:text-neutral-100">{editingProject ? 'Edit Project File' : 'Create New Project Record'}</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs text-neutral-800 dark:text-white focus:outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs text-neutral-850 dark:text-neutral-300 focus:outline-none">
                              <option value="AI">AI</option>
                              <option value="Web Apps">Web Apps</option>
                              <option value="Games">Games</option>
                              <option value="College Projects">College Projects</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-neutral-500 uppercase">Description</label>
                          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs text-neutral-800 dark:text-white" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Tech Stack (comma separated)</label>
                            <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="React, TypeScript, CSS" className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Cover Image URL</label>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">Live Demo URL</label>
                            <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase">GitHub Repo URL</label>
                            <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full px-3 py-1.5 rounded bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-white/5 text-xs" />
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button type="button" onClick={() => setIsFormOpen(false)} className="px-3.5 py-1.5 rounded text-xs text-neutral-500 hover:text-neutral-700">Cancel</button>
                          <button type="submit" className="px-4 py-1.5 rounded bg-teal-500 text-white font-semibold text-xs transition">Save Project</button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* Projects Document list table */}
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-neutral-200/40 dark:bg-neutral-900/40 border border-neutral-250 dark:border-white/5 flex items-start sm:items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-neutral-250 dark:bg-white/5 text-neutral-500 text-[9px] font-mono whitespace-nowrap">{proj.category}</span>
                            <h4 className="font-sans font-bold text-sm text-neutral-800 dark:text-white truncate max-w-xs">{proj.title}</h4>
                          </div>
                          <p className="font-mono text-[9px] text-neutral-400 mt-1 uppercase truncate max-w-xs">ID: {proj.id}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            id={`admin-btn-edit-proj-${proj.id}`}
                            onClick={() => handleOpenForm(proj)}
                            title="Edit Project"
                            className="p-2 text-neutral-500 hover:text-teal-400 hover:bg-neutral-200 dark:hover:bg-white/5 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            id={`admin-btn-del-proj-${proj.id}`}
                            onClick={() => handleDeleteProject(proj.id)}
                            title="Delete Project"
                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/5 pb-4">
                    <h3 className="font-sans font-bold text-base sm:text-lg text-neutral-800 dark:text-white">Visitor Inbound Transmissions</h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold uppercase">{messages.length} Total</span>
                  </div>

                  {isLoadingMessages ? (
                    <div className="text-center py-12">
                      <span className="w-6 h-6 border-2 border-dashed border-teal-500 rounded-full animate-spin inline-block" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-5 rounded-2xl bg-neutral-200/50 dark:bg-neutral-900/30 border border-neutral-300 dark:border-white/5 space-y-3 font-sans text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-white/5 pb-2.5">
                            <div>
                              <h4 className="font-sans font-bold text-sm text-neutral-800 dark:text-white leading-snug">{msg.name}</h4>
                              <a href={`mailto:${msg.email}`} className="text-xs text-teal-500 hover:underline">{msg.email}</a>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{msg.createdAt instanceof Date ? msg.createdAt.toISOString().slice(0, 10) : String(msg.createdAt).slice(0, 10)}</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs">
                            <p className="text-neutral-400 font-mono">SUBJECT: <strong className="text-neutral-700 dark:text-neutral-200 uppercase">{msg.subject}</strong></p>
                            <div className="p-3 bg-neutral-100 dark:bg-neutral-950/60 rounded-xl text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed mt-2 border border-neutral-200/40 dark:border-white/5 font-sans">
                              {msg.message}
                            </div>
                          </div>
                        </div>
                      ))}

                      {messages.length === 0 && (
                        <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-white/10 rounded-2xl">
                          <p className="text-neutral-500 dark:text-neutral-400 font-mono text-xs sm:text-sm">Inbound messages database is currently vacant.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
