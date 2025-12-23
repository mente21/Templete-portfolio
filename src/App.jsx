import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, Linkedin, Sparkles, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const navigate = useNavigate();

  const projectImages = selectedProject ? [selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean) : [];
  const educationImages = selectedEducation ? [selectedEducation.imageUrl, ...(selectedEducation.gallery || [])].filter(Boolean) : [];
  const certificateImages = selectedCertificate ? [selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean) : [];

  const handlePrev = (type) => {
    if (type === 'project') {
      setGalleryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : projectImages.length - 1));
    } else if (type === 'education') {
      setGalleryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : educationImages.length - 1));
    } else if (type === 'certificate') {
      setGalleryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : certificateImages.length - 1));
    }
  };

  const handleNext = (type) => {
    if (type === 'project') {
      setGalleryIndex((prevIndex) => (prevIndex < projectImages.length - 1 ? prevIndex + 1 : 0));
    } else if (type === 'education') {
      setGalleryIndex((prevIndex) => (prevIndex < educationImages.length - 1 ? prevIndex + 1 : 0));
    } else if (type === 'certificate') {
      setGalleryIndex((prevIndex) => (prevIndex < certificateImages.length - 1 ? prevIndex + 1 : 0));
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div className="bg-mesh"></div>
      <SidebarNav />

      {/* Background Blur Overlay when project is active */}
      <motion.div 
        animate={{ 
          filter: (selectedProject || selectedEducation || selectedCertificate) ? 'blur(10px) brightness(0.7)' : 'blur(0px) brightness(1)',
          scale: (selectedProject || selectedEducation || selectedCertificate) ? 0.98 : 1
        }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: (selectedProject || selectedEducation || selectedCertificate) ? 'none' : 'auto' }}
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
      
      <EducationTimeline onOpenDetail={(item) => { setSelectedEducation(item); setGalleryIndex(0); }} />

      <CertificatesSection onOpenDetail={(item) => { setSelectedCertificate(item); setGalleryIndex(0); }} />

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
                  gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '50px', 
                  height: '100%',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  {/* Left Column: Media Slider */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <motion.div 
                      layoutId={`image-${selectedProject.id || projects.indexOf(selectedProject)}`}
                      style={{
                         width: '100%',
                         height: '450px',
                         borderRadius: '24px',
                         overflow: 'hidden',
                         boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                         position: 'relative'
                      }}
                    >
                      {/* Horizontal Slider Implementation with Controls */}
                      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }}>
                        <div className="custom-slider" style={{
                          display: 'flex',
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: `translateX(-${galleryIndex * 100}%)`
                        }}>
                          {[selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean).map((img, i) => (
                            <div key={i} style={{ 
                              minWidth: '100%', 
                              height: '100%', 
                              position: 'relative'
                            }}>
                              <img 
                                src={img} 
                                alt={`${selectedProject.title} screenshot ${i + 1}`} 
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        {[selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean).length > 1 && (
                          <>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.max(0, prev - 1))}
                              style={{
                                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === 0 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.min([selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean).length - 1, prev + 1))}
                              style={{
                                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === [selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean).length - 1 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}
                      </div>
                      
                      {/* Slider Instruction Overlay */}
                      <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
                        <div style={{ padding: '8px 15px', background: 'rgba(255,107,0,0.9)', borderRadius: '100px', color: 'black', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1px' }}>DRAG OR SCROLL →</div>
                      </div>
                    </motion.div>
                    
                    {/* Visual Indicators for Gallery */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                         {[selectedProject.imageUrl, ...(selectedProject.gallery || [])].filter(Boolean).map((_, i) => (
                           <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? 'var(--accent-primary)' : 'var(--border-color)' }}></div>
                         ))}
                    </div>
                  </div>

                  {/* Right Column: Project Details & Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0 30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                       <div style={{ padding: '6px 16px', borderRadius: '100px', background: 'rgba(255,107,0,0.1)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>INDUSTRIAL CASE STUDY</div>
                    </div>
                    
                    <motion.h2 
                      layoutId={`title-${selectedProject.id || projects.indexOf(selectedProject)}`}
                      style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1, marginBottom: '24px', letterSpacing: '1px' }}
                    >
                      {selectedProject.title}
                    </motion.h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--accent-primary)', marginBottom: '30px' }}></div>

                    <motion.p 
                      layoutId={`desc-${selectedProject.id || projects.indexOf(selectedProject)}`}
                      style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300, opacity: 0.9 }}
                    >
                      {selectedProject.desc}
                    </motion.p>

                    <div style={{ marginTop: 'auto' }}>
                       <div style={{ marginBottom: '40px' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 900 }}>SYSTEM ARCHITECTURE</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                             {(selectedProject.tags || selectedProject.tech)?.map((tag, it) => (
                               <span key={it} style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, letterSpacing: '0.5px' }}>{tag}</span>
                             ))}
                          </div>
                       </div>

                       {/* Action Buttons Hub */}
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          <motion.a 
                            href={selectedProject.link}
                            target="_blank"
                            whileHover={{ scale: 1.02, backgroundColor: 'var(--accent-primary)', color: 'black' }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                              width: '100%',
                              padding: '20px',
                              background: 'var(--text-primary)',
                              color: 'var(--bg-color)',
                              borderRadius: '16px',
                              fontFamily: 'Anton',
                              fontSize: '1.1rem',
                              letterSpacing: '4px',
                              fontWeight: 900,
                              textTransform: 'uppercase',
                              textAlign: 'center',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '12px',
                              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                            }}
                          >
                            LAUNCH SYSTEM <ExternalLink size={20} />
                          </motion.a>

                          {selectedProject.github && (
                            <motion.a 
                              href={selectedProject.github}
                              target="_blank"
                              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
                              whileTap={{ scale: 0.98 }}
                              style={{
                                width: '100%',
                                padding: '18px',
                                background: 'transparent',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '16px',
                                fontFamily: 'Anton',
                                fontSize: '1rem',
                                letterSpacing: '3px',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              SOURCE REPOSITORY <Github size={20} />
                            </motion.a>
                          )}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Education Detail Modal - Lifted for proper centering */}
      <AnimatePresence>
        {selectedEducation && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEducation(null)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 3000,
                cursor: 'zoom-out'
              }}
            />
            
            <div style={{
               position: 'fixed', inset: 0,
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               zIndex: 3001, pointerEvents: 'none', padding: '40px'
            }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                style={{
                  width: 'min(1000px, 95vw)',
                  height: 'min(750px, 85vh)',
                  background: 'var(--card-bg)',
                  borderRadius: '40px',
                  border: `1.5px solid ${selectedEducation.color || 'var(--accent-primary)'}`,
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
                <button 
                  onClick={() => setSelectedEducation(null)}
                  style={{
                    position: 'absolute', top: '25px', right: '25px',
                    background: 'var(--bg-color)', border: '1px solid var(--border-color)',
                    borderRadius: '50%', width: '50px', height: '50px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10
                  }}
                >
                  <X size={24} />
                </button>

                <div className="modal-content-grid" style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '50px', height: '100%', overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                         width: '100%', height: '450px',
                         borderRadius: '24px', overflow: 'hidden',
                         boxShadow: '0 30px 60px rgba(0,0,0,0.4)', position: 'relative'
                    }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }}>
                        <div className="custom-slider" style={{
                          display: 'flex',
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: `translateX(-${galleryIndex * 100}%)`
                        }}>
                          {[selectedEducation.image, ...(selectedEducation.gallery || [])].filter(Boolean).map((img, i) => (
                            <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                              <img src={img} alt="Academic detail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        {[selectedEducation.image, ...(selectedEducation.gallery || [])].filter(Boolean).length > 1 && (
                          <>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.max(0, prev - 1))}
                              style={{
                                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === 0 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.min([selectedEducation.image, ...(selectedEducation.gallery || [])].filter(Boolean).length - 1, prev + 1))}
                              style={{
                                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === [selectedEducation.image, ...(selectedEducation.gallery || [])].filter(Boolean).length - 1 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                         {[selectedEducation.image, ...(selectedEducation.gallery || [])].filter(Boolean).map((_, i) => (
                           <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? selectedEducation.color : 'var(--border-color)' }}></div>
                         ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
                    <div style={{ fontSize: '0.65rem', color: selectedEducation.color, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 900 }}>ACADEMIC RECORD</div>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}>
                      {selectedEducation.degree}
                    </h2>
                    <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '30px', fontWeight: 500 }}>
                      {selectedEducation.school}
                    </div>
                    <div style={{ width: '60px', height: '4px', background: selectedEducation.color, marginBottom: '30px' }}></div>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', opacity: 0.9 }}>
                      {selectedEducation.desc || "Comprehensive institutional training focusing on advanced computational concepts."}
                    </p>
                    <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: `1px dashed ${selectedEducation.color}44` }}>
                      <div style={{ fontSize: '0.7rem', color: selectedEducation.color, fontWeight: 900, letterSpacing: '2px', marginBottom: '5px' }}>VALIDATION TIMESTAMP</div>
                      <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedEducation.year}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Certificate Detail Modal - Mirroring Projects/Education */}
      <AnimatePresence>
        {selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 3000,
                cursor: 'zoom-out'
              }}
            />
            
            <div style={{
               position: 'fixed', inset: 0,
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               zIndex: 3001, pointerEvents: 'none', padding: '40px'
            }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                style={{
                  width: 'min(1000px, 95vw)',
                  height: 'min(750px, 85vh)',
                  background: 'var(--card-bg)',
                  borderRadius: '40px',
                  border: `1.5px solid ${selectedCertificate.color || 'var(--accent-primary)'}`,
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
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  style={{
                    position: 'absolute', top: '25px', right: '25px',
                    background: 'var(--bg-color)', border: '1px solid var(--border-color)',
                    borderRadius: '50%', width: '50px', height: '50px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10
                  }}
                >
                  <X size={24} />
                </button>

                <div className="modal-content-grid" style={{ 
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '50px', height: '100%', overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                         width: '100%', height: '450px',
                         borderRadius: '24px', overflow: 'hidden',
                         boxShadow: '0 30px 60px rgba(0,0,0,0.4)', position: 'relative'
                    }}>
                      <div style={{ position: 'relative', width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }}>
                        <div className="custom-slider" style={{
                          display: 'flex',
                          width: '100%',
                          height: '100%',
                          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                          transform: `translateX(-${galleryIndex * 100}%)`
                        }}>
                          {[selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean).map((img, i) => (
                            <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                              <img src={img} alt="Certificate detail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                          ))}
                        </div>

                        {/* Navigation Buttons */}
                        {[selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean).length > 1 && (
                          <>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.max(0, prev - 1))}
                              style={{
                                position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(100px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === 0 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button 
                              onClick={() => setGalleryIndex(prev => Math.min([selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean).length - 1, prev + 1))}
                              style={{
                                position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
                                width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(100px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                zIndex: 5, opacity: galleryIndex === [selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean).length - 1 ? 0.3 : 1, transition: 'all 0.3s ease'
                              }}
                            >
                              <ChevronRight size={24} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                         {[selectedCertificate.imageUrl, ...(selectedCertificate.gallery || [])].filter(Boolean).map((_, i) => (
                           <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? selectedCertificate.color : 'var(--border-color)' }}></div>
                         ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
                    <div style={{ fontSize: '0.65rem', color: selectedCertificate.color, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 900 }}>PROFESSIONAL VALIDATION</div>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '20px' }}>
                      {selectedCertificate.title}
                    </h2>
                    <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '30px', fontWeight: 500 }}>
                      {selectedCertificate.issuer}
                    </div>
                    <div style={{ width: '60px', height: '4px', background: selectedCertificate.color, marginBottom: '30px' }}></div>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', opacity: 0.9 }}>
                      {selectedCertificate.desc || selectedCertificate.description || "Official certification validating professional competency in industry-standard technologies and methodologies."}
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                       {selectedCertificate.link && (
                         <motion.a 
                           href={selectedCertificate.link}
                           target="_blank"
                           whileHover={{ scale: 1.02, backgroundColor: selectedCertificate.color, color: 'white' }}
                           whileTap={{ scale: 0.98 }}
                           style={{
                             width: '100%', padding: '20px',
                             background: 'var(--text-primary)', color: 'var(--bg-color)',
                             borderRadius: '16px', fontFamily: 'Anton', fontSize: '1.1rem',
                             letterSpacing: '3px', fontWeight: 900, textTransform: 'uppercase',
                             textAlign: 'center', textDecoration: 'none', display: 'flex',
                             alignItems: 'center', justifyContent: 'center', gap: '12px'
                           }}
                         >
                           VERIFY CREDENTIAL <ExternalLink size={20} />
                         </motion.a>
                       )}
                       
                       <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: `1px dashed ${selectedCertificate.color}44` }}>
                         <div style={{ fontSize: '0.7rem', color: selectedCertificate.color, fontWeight: 900, letterSpacing: '2px', marginBottom: '5px' }}>ISSUE DATE</div>
                         <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedCertificate.date}</div>
                       </div>
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
