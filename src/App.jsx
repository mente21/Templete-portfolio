import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Linkedin, Sparkles, X, ExternalLink } from 'lucide-react';

// Modules
import ProjectCard from './components/ProjectCard';
import ChatbaseAssistant from './components/ChatbaseAssistant';
import StudioMode from './pages/StudioMode';
import HeroSection from './components/HeroSection';
import TechExpertise from './components/TechExpertise';
import AboutSection from './components/AboutSection';
import EducationTimeline from './components/EducationTimeline';
import CertificatesSection from './components/CertificatesSection';
import TestimonialsSection from './components/TestimonialsSection';
import SidebarNav from './components/SidebarNav';
import ContactSection from './components/ContactSection';

// Hooks
import { useProjects } from './hooks/useProjects';
import { useCollection } from './hooks/useCollection';

const PortfolioHome = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { data: skills, loading: skillsLoading } = useCollection('skills');
  const { data: experience, loading: expLoading } = useCollection('experience');
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div className="bg-mesh"></div>
      <SidebarNav />

      {/* Background Blur Overlay when project is active */}
      <motion.div 
        animate={{ 
          filter: selectedProject ? 'blur(10px) brightness(0.7)' : 'blur(0px) brightness(1)',
          scale: selectedProject ? 0.98 : 1
        }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: selectedProject ? 'none' : 'auto' }}
      >

      <HeroSection />

      <AboutSection />

      <section id="work" className="constellation-wrapper" style={{ borderTop: '1px solid var(--border-color)', padding: '120px 10%' }}>
        {/* Constellation Background SVG */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="var(--accent-primary)" className="network-dot" />
                <path d="M 2 2 L 100 100" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.3" />
                <path d="M 2 100 L 100 2" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="section-header-premium">
          <span className="section-subtitle-premium">Technical Portfolio</span>
          <h2 className="section-title-premium">
            <span className="section-title-accent">PROJECTS</span> 
            <span className="section-title-stroke">VIEW</span>
          </h2>
        </div>

        {projectsLoading ? (
          <div style={{ padding: '100px 0', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ display: 'inline-block' }}>
              <Sparkles size={40} className="gradient-text" />
            </motion.div>
          </div>
        ) : (
          <div className="grid-premium">
            {projects.map((project, idx) => (
              <ProjectCard 
                key={project.id || idx} 
                project={project} 
                index={idx} 
                onExpand={(p) => setSelectedProject(p)} 
              />
            ))}
          </div>
        )}
      </section>

      {/* Technical Ecosystem */}
      <section id="skills" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)', padding: '120px 10%', transition: 'background 0.5s ease' }}>
        <div className="section-header-premium" style={{ marginBottom: '40px' }}>
          <span className="section-subtitle-premium">System Capabilities</span>
          <h2 className="section-title-premium">
            <span className="section-title-accent">TECH</span> 
            <span className="section-title-stroke">ECOSYSTEM</span>
          </h2>
        </div>
        <TechExpertise />
      </section>

      <EducationTimeline />

      <CertificatesSection />

      <TestimonialsSection />

      <ContactSection />

      </motion.div>

      <ChatbaseAssistant />

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 2000,
                cursor: 'zoom-out'
              }}
            />
            
            <div style={{
               position: 'fixed',
               inset: 0,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 2001,
               pointerEvents: 'none',
               padding: '40px'
            }}>
              <motion.div
                layoutId={`card-${selectedProject.id || projects.indexOf(selectedProject)}`}
                style={{
                  width: 'min(1000px, 95vw)',
                  height: 'min(750px, 85vh)',
                  background: 'var(--card-bg)',
                  borderRadius: '40px',
                  border: '1.5px solid var(--accent-primary)',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                  pointerEvents: 'auto',
                  position: 'relative'
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '25px',
                    right: '25px',
                    background: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <X size={24} />
                </button>

                <div className="modal-content-grid" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '40px', 
                  height: '100%',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  <motion.div 
                    layoutId={`image-${selectedProject.id || projects.indexOf(selectedProject)}`}
                    style={{
                       width: '100%',
                       height: 'max(300px, 40vh)',
                       borderRadius: '24px',
                       overflow: 'hidden',
                       boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                  >
                    <img 
                      src={selectedProject.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200"} 
                      alt={selectedProject.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </motion.div>

                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0 30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                       <div style={{ padding: '6px 16px', borderRadius: '100px', background: 'var(--accent-primary)', color: 'white', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>Case Study</div>
                    </div>
                    
                    <motion.h2 
                      layoutId={`title-${selectedProject.id || projects.indexOf(selectedProject)}`}
                      style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}
                    >
                      {selectedProject.title}
                    </motion.h2>

                    <motion.p 
                      layoutId={`desc-${selectedProject.id || projects.indexOf(selectedProject)}`}
                      style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '30px', fontWeight: 300 }}
                    >
                      {selectedProject.desc}
                    </motion.p>

                    <div style={{ marginTop: 'auto' }}>
                       <div style={{ marginBottom: '32px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 800 }}>Engineered With</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                             {selectedProject.tags?.map((tag, it) => (
                               <span key={it} style={{ padding: '6px 14px', background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>{tag}</span>
                             ))}
                          </div>
                       </div>

                       <motion.a 
                         href={selectedProject.link}
                         target="_blank"
                         whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-primary)', color: 'white' }}
                         whileTap={{ scale: 0.98 }}
                         style={{
                           width: '100%',
                           padding: '18px',
                           background: 'var(--text-primary)',
                           color: 'var(--bg-color)',
                           borderRadius: '14px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           gap: '12px',
                           textDecoration: 'none',
                           fontSize: '0.9rem',
                           fontWeight: 900,
                           fontFamily: 'Anton',
                           letterSpacing: '2px',
                           transition: 'all 0.3s ease'
                         }}
                       >
                         LAUNCH PROJECT <ExternalLink size={18} />
                       </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .modal-content-grid::-webkit-scrollbar {
          width: 4px;
        }
        .modal-content-grid::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/studio" element={<StudioMode />} />
      </Routes>
    </Router>
  );
}

export default App;
