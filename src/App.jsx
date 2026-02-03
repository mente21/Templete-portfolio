import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// Personal Portfolio Components
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PortfolioGallery from './components/PortfolioGallery';
import SkillsInterests from './components/SkillsInterests';
import JourneyTimeline from './components/JourneyTimeline';
import AchievementsSection from './components/AchievementsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import SidebarNav from './components/SidebarNav';
import LifeOSSection from './components/LifeOSSection';

// State Management
import { useAdminAuth } from './context/AuthContext';

// Pages
import ArtGalleryPage from './components/ArtGalleryPage';
import DesignGalleryPage from './components/DesignGalleryPage';
import MemoriesGalleryPage from './components/MemoriesGalleryPage';
import DiaryPage from './components/DiaryPage';
import ExperimentalMe from './components/ExperimentalMe';
import MovieDatabase from './components/MovieDatabase';
import RecipeBook from './components/RecipeBook';
import CourseList from './components/CourseList';
import ImportantDocuments from './components/ImportantDocuments';
import TravelPlanner from './components/TravelPlanner';
import StrategicThinking from './components/StrategicThinking';
import DiaryNewEntry from './components/DiaryNewEntry';
import ExperimentalNewEntry from './components/ExperimentalNewEntry';
import MovieNewEntry from './components/MovieNewEntry';
import RecipeNewEntry from './components/RecipeNewEntry';
import CourseNewEntry from './components/CourseNewEntry';
import DocumentNewEntry from './components/DocumentNewEntry';
import TravelNewEntry from './components/TravelNewEntry';
import StrategyNewEntry from './components/StrategyNewEntry';
import Library from './components/Library';
import LibraryNewEntry from './components/LibraryNewEntry';
import Bin from './components/Bin';
import PlanPage from './components/PlanPage';
import SettingsPage from './components/SettingsPage';
import AdminLoginPage from './components/AdminLoginPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import AboutDetailPage from './footer bini/AboutDetailPage';
import PhilosophyDetailPage from './footer bini/PhilosophyDetailPage';
import ServicesDetailPage from './footer bini/ServicesDetailPage';
import LifeOSDetailPage from './footer bini/LifeOSDetailPage';
import JourneyDetailPage from './footer bini/JourneyDetailPage';

// Hooks
import { useCollection } from './hooks/useCollection';

// Static Data
import { portfolioData } from './data/portfolioData';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoaded } = useAdminAuth();
  if (!isLoaded) return null;
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

const PortfolioHome = () => {
  const { data: skills, loading: skillsLoading } = useCollection('skills');
  const { data: journey, loading: journeyLoading } = useCollection('journey');
  
  // Use static achievements data instead of database
  const achievements = React.useMemo(() => {
    return [
      {
        id: 'cert-1',
        title: 'GOOGLE UX CERT',
        description: 'Professional Certificate in UX Design.',
        detailedDescription: `This comprehensive program covers the entire UX design process from start to finish. 

Key Learning Outcomes:
• Conducted user research using various methodologies including interviews, surveys, and usability studies
• Created user personas, journey maps, and empathy maps to understand user needs
• Developed wireframes and low-fidelity prototypes using industry-standard tools
• Designed high-fidelity mockups and interactive prototypes
• Conducted usability testing and iterated based on feedback
• Applied accessibility principles to create inclusive designs
• Built a professional UX portfolio showcasing real-world projects

The certificate demonstrates proficiency in foundational UX design skills and readiness for entry-level positions in the field.`,
        issuer: 'Google',
        date: 'Jan 2024',
        type: 'award',
        color: '#4285f4',
        skills: ['UX Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Figma', 'User-Centered Design'],
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800'
      },
      {
        id: 'cert-2',
        title: 'AWS CERTIFIED SOLUTIONS ARCHITECT',
        description: 'Associate level certification for cloud architecture.',
        detailedDescription: `This certification validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.

Core Competencies:
• Designed resilient architectures using AWS services
• Implemented cost-optimized solutions following AWS best practices
• Configured secure applications and architectures
• Deployed and managed applications on AWS infrastructure
• Worked with compute, storage, database, and networking services
• Implemented disaster recovery and backup strategies
• Optimized performance and scalability of cloud solutions

This credential demonstrates the ability to architect and deploy secure and robust applications on AWS technologies.`,
        issuer: 'Amazon Web Services',
        date: 'Mar 2024',
        type: 'medal',
        color: '#ff9900',
        skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'RDS', 'VPC', 'Lambda', 'CloudFormation'],
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800'
      },
      {
        id: 'cert-3',
        title: 'REACT ADVANCED PATTERNS',
        description: 'Advanced React development certification.',
        detailedDescription: `An advanced certification focusing on modern React patterns, performance optimization, and scalable application architecture.

Advanced Topics Covered:
• Implemented advanced hooks patterns (useReducer, useContext, custom hooks)
• Built compound components and render props patterns
• Optimized performance using React.memo, useMemo, and useCallback
• Managed complex state with Context API and state management libraries
• Implemented code splitting and lazy loading strategies
• Created accessible components following WCAG guidelines
• Tested React applications using Jest and React Testing Library
• Built production-ready applications with TypeScript

This certification demonstrates mastery of advanced React concepts and ability to build enterprise-level applications.`,
        issuer: 'Frontend Masters',
        date: 'May 2024',
        type: 'star',
        color: '#61dafb',
        skills: ['React', 'TypeScript', 'Performance Optimization', 'Testing', 'State Management', 'Accessibility'],
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800'
      },
      {
        id: 'cert-4',
        title: 'CERTIFIED SCRUM MASTER',
        description: 'Professional Scrum Master certification.',
        detailedDescription: `This certification validates understanding of Scrum framework and ability to facilitate Scrum teams effectively.

Key Responsibilities & Skills:
• Facilitated daily stand-ups, sprint planning, and retrospectives
• Coached teams on Agile principles and Scrum practices
• Removed impediments and fostered team collaboration
• Worked with Product Owners to manage product backlogs
• Promoted continuous improvement and team self-organization
• Tracked team metrics and velocity
• Ensured adherence to Scrum values and principles

This credential demonstrates the ability to lead Agile teams and drive successful project delivery using Scrum methodology.`,
        issuer: 'Scrum Alliance',
        date: 'Feb 2024',
        type: 'trophy',
        color: '#009fda',
        skills: ['Scrum', 'Agile Methodologies', 'Team Facilitation', 'Sprint Planning', 'Backlog Management'],
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800'
      },
      {
        id: 'cert-5',
        title: 'FIGMA DESIGN SYSTEMS',
        description: 'Advanced design systems certification.',
        detailedDescription: `Specialized certification in creating and maintaining scalable design systems using Figma.

Design System Expertise:
• Built comprehensive component libraries with variants
• Established design tokens for colors, typography, and spacing
• Created auto-layout components for responsive designs
• Implemented design system documentation
• Collaborated with developers using Figma's developer handoff
• Maintained consistency across multiple products
• Conducted design system audits and improvements
• Trained teams on design system usage

This certification showcases expertise in creating enterprise-level design systems that bridge design and development.`,
        issuer: 'Figma',
        date: 'Apr 2024',
        type: 'crown',
        color: '#a259ff',
        skills: ['Figma', 'Design Systems', 'Component Libraries', 'Design Tokens', 'UI/UX Design'],
        imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800'
      },
      {
        id: 'cert-6',
        title: 'CYBERSECURITY FUNDAMENTALS',
        description: 'Foundation certification in cybersecurity.',
        detailedDescription: `Comprehensive certification covering essential cybersecurity principles and practices.

Security Fundamentals:
• Identified and mitigated common security vulnerabilities
• Implemented secure coding practices
• Understood encryption, hashing, and authentication mechanisms
• Conducted security risk assessments
• Applied network security principles
• Implemented access control and authorization
• Responded to security incidents
• Maintained compliance with security standards

This credential demonstrates foundational knowledge in protecting systems and data from cyber threats.`,
        issuer: 'CompTIA',
        date: 'Jun 2024',
        type: 'target',
        color: '#e74c3c',
        skills: ['Cybersecurity', 'Network Security', 'Encryption', 'Risk Assessment', 'Incident Response'],
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
      }
    ];
  }, []);

  // Use static portfolio data instead of database
  const portfolio = React.useMemo(() => {
    return portfolioData;
  }, []);

  // Debug logging
  React.useEffect(() => {
    console.log('[PortfolioHome] Skills data:', skills);
  }, [skills]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleOpenDetail = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setGalleryIndex(0);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
    setSelectedType(null);
    setGalleryIndex(0);
  };

  const getImages = () => {
    if (!selectedItem) return [];
    if (selectedType === 'portfolio') {
      return [selectedItem.imageUrl || selectedItem.image, ...(selectedItem.gallery || [])].filter(Boolean);
    }
    if (selectedType === 'journey') {
      return [selectedItem.image, ...(selectedItem.gallery || [])].filter(Boolean);
    }
    if (selectedType === 'achievement') {
      return [selectedItem.imageUrl, ...(selectedItem.gallery || [])].filter(Boolean);
    }
    return [];
  };

  const images = getImages();

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <div className="bg-mesh"></div>
      <SidebarNav />

      <motion.div
        animate={{
          filter: selectedItem ? 'blur(10px) brightness(0.7)' : 'blur(0px) brightness(1)',
          scale: selectedItem ? 0.98 : 1
        }}
        transition={{ duration: 0.5 }}
        style={{ pointerEvents: selectedItem ? 'none' : 'auto' }}
      >
        <HeroSection />
        <AboutSection />
        <PortfolioGallery
          items={portfolio}
          onItemClick={(item) => handleOpenDetail(item, 'portfolio')}
        />
        <LifeOSSection />
        <SkillsInterests skills={skills} />
        <JourneyTimeline
          milestones={journey}
          onOpenDetail={(item) => handleOpenDetail(item, 'journey')}
        />
        <AchievementsSection
          achievements={achievements}
          onOpenDetail={(item) => handleOpenDetail(item, 'achievement')}
        />
        <TestimonialsSection />
        <ServicesSection />
        <ContactSection />
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)', zIndex: 2000, cursor: 'zoom-out'
              }}
            />
            <div style={{
              position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 2001, pointerEvents: 'none', padding: '40px'
            }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                style={{
                  width: 'min(1000px, 95vw)', height: 'min(750px, 85vh)',
                  background: 'var(--card-bg)', borderRadius: '40px',
                  border: `1.5px solid ${selectedItem.color || 'var(--accent-primary)'}`,
                  pointerEvents: 'auto', position: 'relative',
                  padding: 'clamp(15px, 4vw, 40px)'
                }}
              >
                <button
                  onClick={handleCloseDetail}
                  style={{
                    position: 'absolute', top: '25px', right: '25px',
                    background: 'var(--bg-color)', border: '1px solid var(--border-color)',
                    borderRadius: '50%', width: '50px', height: '50px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10
                  }}
                  className="modal-close-trigger"
                >
                  <X size={24} />
                </button>

                <div className="modal-content-grid" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                  gap: 'clamp(20px, 5vw, 50px)', height: '100%', overflowY: 'auto', paddingRight: '10px'
                }}>
                  {images.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div className="modal-image-wrapper" style={{
                        width: '100%', height: 'clamp(200px, 40vh, 450px)', borderRadius: '24px',
                        overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                        position: 'relative'
                      }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }}>
                          <div className="custom-slider" style={{
                            display: 'flex', width: '100%', height: '100%',
                            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            transform: `translateX(-${galleryIndex * 100}%)`
                          }}>
                            {images.map((img, i) => (
                              <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                                <img src={img} alt={`${selectedItem.title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              </div>
                            ))}
                          </div>
                          {images.length > 1 && (
                            <>
                              <button onClick={() => setGalleryIndex(prev => Math.max(0, prev - 1))} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5, opacity: galleryIndex === 0 ? 0.3 : 1 }}><ChevronLeft size={24} /></button>
                              <button onClick={() => setGalleryIndex(prev => Math.min(images.length - 1, prev + 1))} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5, opacity: galleryIndex === images.length - 1 ? 0.3 : 1 }}><ChevronRight size={24} /></button>
                            </>
                          )}
                        </div>
                      </div>
                      {images.length > 1 && (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          {images.map((_, i) => (
                            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === galleryIndex ? (selectedItem.color || 'var(--accent-primary)') : 'var(--border-color)', cursor: 'pointer' }} onClick={() => setGalleryIndex(i)} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
                    <h2 style={{ 
                      fontSize: 'clamp(1.5rem, 6vw, 3.5rem)', 
                      color: 'var(--text-primary)', 
                      marginBottom: '20px', 
                      textTransform: 'uppercase',
                      overflowWrap: 'break-word',
                      lineHeight: 1.1
                    }}>{selectedItem.title}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '10px' }}>
                        {selectedItem.description || selectedItem.desc}
                      </p>
                      
                      {selectedItem.detailedDescription && (
                        <div style={{ 
                          marginTop: '5px', 
                          padding: '30px', 
                          background: 'rgba(255,255,255,0.03)', 
                          borderRadius: '20px', 
                          border: '1px solid rgba(255,255,255,0.05)' 
                        }}>
                          <h3 style={{ 
                            fontSize: '1.05rem', 
                            color: selectedItem.color || 'var(--accent-primary)', 
                            textTransform: 'uppercase', 
                            letterSpacing: '2px', 
                            marginBottom: '20px',
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px',
                            fontFamily: "'Cinzel', serif"
                          }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedItem.color || 'var(--accent-primary)' }}></span>
                            {selectedType === 'achievement' ? 'About this Credential' : 'Project Details'}
                          </h3>
                          <p style={{ 
                            color: 'rgba(255,255,255,0.85)', 
                            lineHeight: 2, 
                            whiteSpace: 'pre-line',
                            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                            fontFamily: "'Inter', sans-serif"
                          }}>
                            {selectedItem.detailedDescription}
                          </p>
                        </div>
                      )}

                      {/* Technologies/Tools Section */}
                      {(selectedItem.technologies || selectedItem.tools) && (
                         <div style={{ marginTop: '5px' }}>
                            <h4 style={{ 
                              fontSize: '0.95rem', 
                              color: 'var(--text-secondary)', 
                              textTransform: 'uppercase', 
                              marginBottom: '15px', 
                              letterSpacing: '1.5px',
                              fontFamily: "'Cinzel', serif"
                            }}>Technologies & Tools</h4>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {(selectedItem.technologies || selectedItem.tools || []).map((tech, idx) => (
                                    <span key={idx} style={{ 
                                        padding: '10px 18px', 
                                        borderRadius: '100px', 
                                        background: 'rgba(255,255,255,0.05)', 
                                        color: selectedItem.color || 'var(--accent-primary)', 
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontFamily: "'JetBrains Mono', monospace"
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                         </div>
                      )}

                      {/* Skills Section */}
                      {selectedItem.skills && (
                         <div style={{ marginTop: '5px' }}>
                            <h4 style={{ 
                              fontSize: '0.95rem', 
                              color: 'var(--text-secondary)', 
                              textTransform: 'uppercase', 
                              marginBottom: '15px', 
                              letterSpacing: '1.5px',
                              fontFamily: "'Cinzel', serif"
                            }}>Skills Verified</h4>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                {Array.isArray(selectedItem.skills) ? selectedItem.skills.map((skill, idx) => (
                                    <span key={idx} style={{ 
                                        padding: '10px 18px', 
                                        borderRadius: '100px', 
                                        background: 'rgba(255,255,255,0.05)', 
                                        color: selectedItem.color || 'var(--accent-primary)', 
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontFamily: "'JetBrains Mono', monospace"
                                    }}>
                                        {skill}
                                    </span>
                                )) : selectedItem.skills.split(',').map((skill, idx) => (
                                    <span key={idx} style={{ 
                                        padding: '10px 18px', 
                                        borderRadius: '100px', 
                                        background: 'rgba(255,255,255,0.05)', 
                                        color: selectedItem.color || 'var(--accent-primary)', 
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontFamily: "'JetBrains Mono', monospace"
                                    }}>
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                         </div>
                      )}

                      {/* Additional Info Section */}
                      {(selectedItem.category || selectedItem.date || selectedItem.issuer) && (
                        <div style={{ 
                          marginTop: '10px',
                          padding: '20px',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255,255,255,0.05)',
                          display: 'flex',
                          gap: '30px',
                          flexWrap: 'wrap'
                        }}>
                          {selectedItem.category && (
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Category</div>
                              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedItem.category}</div>
                            </div>
                          )}
                          {selectedItem.date && (
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Date</div>
                              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedItem.date}</div>
                            </div>
                          )}
                          {selectedItem.issuer && (
                            <div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Issued By</div>
                              <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{selectedItem.issuer}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        
        {/* NEW DETAIL PAGES */}
        <Route path="/about" element={<AboutDetailPage />} />
        <Route path="/philosophy" element={<PhilosophyDetailPage />} />
        <Route path="/philosophy/:id" element={<PhilosophyDetailPage />} />
        <Route path="/services" element={<ServicesDetailPage />} />
        <Route path="/life-os" element={<LifeOSDetailPage />} />
        <Route path="/journey" element={<JourneyDetailPage />} />
        
        {/* Protected Admin Routes */}
        <Route path="/art-gallery" element={<ArtGalleryPage />} />
        <Route path="/design-gallery" element={<DesignGalleryPage />} />
        <Route path="/memories-gallery" element={<MemoriesGalleryPage />} />
        
        <Route path="/diary" element={<ProtectedRoute><DiaryPage /></ProtectedRoute>} />
        <Route path="/diary/new" element={<ProtectedRoute><DiaryNewEntry /></ProtectedRoute>} />
        <Route path="/plan" element={<ProtectedRoute><PlanPage /></ProtectedRoute>} />
        
        <Route path="/experimental-me" element={<ProtectedRoute><ExperimentalMe /></ProtectedRoute>} />
        <Route path="/experimental-me/new" element={<ProtectedRoute><ExperimentalNewEntry /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><MovieDatabase /></ProtectedRoute>} />
        <Route path="/movies/new" element={<ProtectedRoute><MovieNewEntry /></ProtectedRoute>} />
        <Route path="/recipes" element={<ProtectedRoute><RecipeBook /></ProtectedRoute>} />
        <Route path="/recipes/new" element={<ProtectedRoute><RecipeNewEntry /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
        <Route path="/courses/new" element={<ProtectedRoute><CourseNewEntry /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute><ImportantDocuments /></ProtectedRoute>} />
        <Route path="/documents/new" element={<ProtectedRoute><DocumentNewEntry /></ProtectedRoute>} />
        <Route path="/travel" element={<ProtectedRoute><TravelPlanner /></ProtectedRoute>} />
        <Route path="/travel/new" element={<ProtectedRoute><TravelNewEntry /></ProtectedRoute>} />
        <Route path="/strategy" element={<ProtectedRoute><StrategicThinking /></ProtectedRoute>} />
        <Route path="/strategy/new" element={<ProtectedRoute><StrategyNewEntry /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/library/new" element={<ProtectedRoute><LibraryNewEntry /></ProtectedRoute>} />
        <Route path="/bin" element={<ProtectedRoute><Bin /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
