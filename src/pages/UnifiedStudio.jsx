import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Edit3, ArrowLeft, Save, X, Sparkles, Code, 
  Briefcase, Mail, Globe, Zap, Database, Palette, Eye, Lock, LayoutDashboard, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

/**
 * Unified Studio Dashboard
 * 
 * Two modes:
 * 1. Public View - Beautiful AI training data page (for Chatbase)
 * 2. Admin Mode - Full CRUD dashboard for managing projects
 */

const UnifiedStudio = () => {
  const navigate = useNavigate();
  const { projects, loading, addProject, editProject, removeProject } = useProjects();
  
  // Mode toggle: 'public' or 'admin'
  const [mode, setMode] = useState('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Admin form state
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', desc: '', tech: '', imageUrl: '', link: '', icon: 'Layout'
  });

  useEffect(() => {
    document.title = mode === 'public' ? "Mente's Portfolio - AI Training Data" : "Studio Dashboard";
  }, [mode]);

  const handleAdminAccess = () => {
    const pass = prompt("Enter Security Key:");
    if (pass === 'admin123') {
      setIsAuthenticated(true);
      setMode('admin');
    } else if (pass !== null) {
      alert("Unauthorized");
    }
  };

  const resetForm = () => {
    setFormData({ title: '', desc: '', tech: '', imageUrl: '', link: '', icon: 'Layout' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEditClick = (project) => {
    setFormData({
      title: project.title,
      desc: project.desc,
      tech: project.tech?.join(', ') || '',
      imageUrl: project.imageUrl || '',
      link: project.link || '',
      icon: project.icon || 'Layout'
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (editingId) {
      res = await editProject(editingId, formData);
    } else {
      res = await addProject(formData);
    }
    
    if (res.success) {
      resetForm();
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this project?")) {
      await removeProject(id);
    }
  };

  // Loading state
  if (loading && projects.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        color: 'white'
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Sparkles size={48} className="gradient-text" />
        </motion.div>
      </div>
    );
  }

  // PUBLIC VIEW - Beautiful AI Training Data Page
  if (mode === 'public') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
        color: 'white',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-mesh" style={{ opacity: 0.3 }}></div>

        {/* Floating Action Buttons */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, display: 'flex', gap: '12px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={18} /> Portfolio
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdminAccess}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}
          >
            <Lock size={18} /> Admin Mode
          </motion.button>
        </div>

        {/* Content Container */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '80px 40px',
          position: 'relative',
          zIndex: 1
        }}>
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 28px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '100px',
              marginBottom: '32px'
            }}>
              <Sparkles size={20} style={{ color: '#6366f1' }} />
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: 700, 
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                AI Training Data • Auto-Updated from Firebase
              </span>
            </div>

            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: 800, 
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-2px'
            }}>
              Mente's <span className="gradient-text">Portfolio</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.3rem', 
              opacity: 0.7,
              maxWidth: '700px',
              margin: '0 auto 32px'
            }}>
              Complete portfolio data for AI training and analysis
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '32px', 
              justifyContent: 'center',
              fontSize: '0.95rem',
              opacity: 0.6,
              flexWrap: 'wrap'
            }}>
              <div>
                <strong style={{ color: '#6366f1' }}>{projects.length}</strong> Projects
              </div>
              <div>•</div>
              <div>Last Updated: {new Date().toLocaleDateString()}</div>
              <div>•</div>
              <div>{new Date().toLocaleTimeString()}</div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '48px',
              marginBottom: '48px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <Briefcase size={32} style={{ color: '#6366f1' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>About Mente</h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              fontSize: '1.1rem',
              lineHeight: 1.8
            }}>
              <div>
                <strong style={{ color: '#6366f1' }}>Role:</strong> Full-Stack Developer & AI Engineer
              </div>
              <div>
                <strong style={{ color: '#6366f1' }}>Specialization:</strong> Beautiful Intelligence
              </div>
              <div>
                <strong style={{ color: '#6366f1' }}>Status:</strong> Available for Projects
              </div>
            </div>

            <p style={{ 
              marginTop: '32px', 
              fontSize: '1.2rem', 
              lineHeight: 1.8,
              opacity: 0.9,
              fontStyle: 'italic'
            }}>
              "Engineering Beautiful Intelligence" - Building performant web ecosystems that merge cutting-edge AI logic with premium, minimal design aesthetics.
            </p>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <Code size={32} style={{ color: '#6366f1' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>Technical Skills</h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {[
                { 
                  icon: <Palette size={24} />,
                  title: 'Frontend Development',
                  skills: ['React.js', 'Next.js', 'JavaScript/ES6+', 'HTML5 & CSS3', 'Framer Motion', 'Responsive Design']
                },
                {
                  icon: <Database size={24} />,
                  title: 'Backend Development',
                  skills: ['Node.js', 'Python', 'Firebase', 'MongoDB', 'API Development']
                },
                {
                  icon: <Zap size={24} />,
                  title: 'AI & Machine Learning',
                  skills: ['Google Gemini API', 'Chatbase', 'OpenAI', 'Prompt Engineering']
                },
                {
                  icon: <Globe size={24} />,
                  title: 'DevOps & Tools',
                  skills: ['Git & GitHub', 'Vercel', 'Firebase Hosting', 'npm/yarn']
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '32px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '20px',
                    color: '#6366f1'
                  }}>
                    {category.icon}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, margin: 0 }}>
                      {category.title}
                    </h3>
                  </div>
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {category.skills.map((skill, i) => (
                      <li key={i} style={{ 
                        padding: '8px 16px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '8px',
                        fontSize: '0.95rem'
                      }}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Sparkles size={32} style={{ color: '#6366f1' }} />
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
                  Portfolio Projects
                </h2>
              </div>
              <div style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 700
              }}>
                {projects.length} Total Projects
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gap: '32px'
            }}>
              {projects.map((project, index) => (
                <motion.article
                  key={project.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '40px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 700
                  }}>
                    {index + 1}
                  </div>

                  <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: 700,
                    marginBottom: '16px',
                    paddingRight: '60px'
                  }}>
                    {project.title}
                  </h3>

                  <p style={{ 
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    opacity: 0.9,
                    marginBottom: '24px'
                  }}>
                    {project.desc}
                  </p>

                  {project.tech && project.tech.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <strong style={{ 
                        color: '#6366f1',
                        fontSize: '1rem',
                        display: 'block',
                        marginBottom: '12px'
                      }}>
                        Technologies:
                      </strong>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '8px'
                      }}>
                        {project.tech.map((tech, i) => (
                          <span key={i} style={{
                            padding: '8px 16px',
                            background: 'rgba(99, 102, 241, 0.15)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(project.link || project.github) && (
                    <div style={{ 
                      display: 'flex', 
                      gap: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '10px 20px',
                            background: 'rgba(99, 102, 241, 0.2)',
                            border: '1px solid rgba(99, 102, 241, 0.4)',
                            borderRadius: '8px',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          View Project →
                        </a>
                      )}
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '10px 20px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '24px',
              padding: '48px',
              textAlign: 'center'
            }}
          >
            <Mail size={48} style={{ color: '#6366f1', marginBottom: '24px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '32px' }}>
              Available for freelance projects and team collaborations
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              fontSize: '1.1rem'
            }}>
              <div style={{ 
                padding: '12px 24px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: '12px'
              }}>
                📧 hello@mente.co
              </div>
              <div style={{ 
                padding: '12px 24px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: '12px'
              }}>
                ⚡ Response within 24h
              </div>
              <div style={{ 
                padding: '12px 24px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: '12px'
              }}>
                🌍 Remote Worldwide
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <footer style={{ 
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
            opacity: 0.6,
            fontSize: '0.95rem'
          }}>
            <p>This page is automatically generated from Firebase data</p>
            <p>For AI training purposes • Updates in real-time when projects are modified</p>
            <p style={{ marginTop: '16px' }}>
              © 2024 MENTE STUDIO • POWERED BY AI LOGIC • DESIGNED IN GLASS
            </p>
          </footer>
        </div>
      </div>
    );
  }

  // ADMIN MODE - Full CRUD Dashboard
  return (
    <div className="studio-container" style={{ minHeight: '100vh', background: '#050505', color: 'white' }}>
      {/* Studio Header */}
      <div style={{ 
        padding: '20px 5%', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setMode('public')} 
            className="btn icon-only" 
            style={{ padding: '10px' }}
            title="Switch to Public View"
          >
            <Eye size={20} />
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            STUDIO <span className="gradient-text">DASHBOARD</span>
          </h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="btn btn-primary">
          <Plus size={18} /> New Project
        </button>
      </div>

      <div style={{ padding: '40px 5%', display: 'grid', gridTemplateColumns: isAdding ? '1fr 400px' : '1fr', gap: '30px' }}>
        
        {/* Main Content: Project List */}
        <section>
          <div style={{ marginBottom: '30px', display: 'flex', gap: '20px' }}>
            <div className="card" style={{ padding: '20px', flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <LayoutDashboard className="gradient-text" />
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Active Projects</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{projects.length}</div>
              </div>
            </div>
            <div className="card" style={{ padding: '20px', flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Trophy className="gradient-text" />
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>With Images</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{projects.filter(p => p.imageUrl).length}</div>
              </div>
            </div>
          </div>

          <div className="grid">
            {loading ? <p>Syncing Studio...</p> : projects.map((project) => (
              <div key={project.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                {project.imageUrl && (
                  <div style={{ height: '120px', width: '100%', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={project.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={project.title} />
                  </div>
                )}
                <h3 style={{ marginBottom: '10px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.desc}
                </p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={() => handleEditClick(project)} className="btn icon-only" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="btn icon-only" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Sidebar */}
        {isAdding && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="card" 
            style={{ position: 'sticky', top: '100px', height: 'fit-content', border: '1px solid var(--accent-primary)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 className="gradient-text">{editingId ? 'Edit Project' : 'New Project'}</h3>
              <X size={20} style={{ cursor: 'pointer' }} onClick={resetForm} />
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                className="studio-input" placeholder="Title" value={formData.title} required
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <textarea 
                className="studio-input" placeholder="Description" value={formData.desc} required
                style={{ minHeight: '100px' }}
                onChange={e => setFormData({...formData, desc: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Tech (React, Node...)" value={formData.tech}
                onChange={e => setFormData({...formData, tech: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Image URL" value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Live Link" value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
              <button type="submit" className="btn btn-primary">
                <Save size={18} /> {editingId ? 'Update' : 'Publish'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UnifiedStudio;
