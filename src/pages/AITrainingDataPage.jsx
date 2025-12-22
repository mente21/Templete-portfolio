import React, { useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import { motion } from 'framer-motion';
import { Sparkles, Code, Briefcase, Mail, Globe, Zap, Database, Palette } from 'lucide-react';

/**
 * AI Training Data Page - Premium Design
 * 
 * A beautiful, professional page that displays portfolio data
 * for Chatbase to crawl while looking stunning for human visitors.
 */

const AITrainingDataPage = () => {
  const { projects, loading } = useProjects();

  useEffect(() => {
    document.title = "Mente's Portfolio - AI Training Data";
  }, []);

  if (loading) {
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Mesh */}
      <div className="bg-mesh" style={{ opacity: 0.3 }}></div>

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
              AI Training Data
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
            opacity: 0.6
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
                {/* Project Number Badge */}
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
};

export default AITrainingDataPage;
