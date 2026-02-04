import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink, Calendar, Tag, Layers, Eye, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (portfolioData && id) {
      const foundProject = portfolioData.find(p => p.id === id);
      setProject(foundProject);
    }
  }, [id]);

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-color)',
        color: 'var(--text-primary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Loading...</h2>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 24px',
              background: 'var(--accent-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const allImages = [project.imageUrl || project.image, ...(project.gallery || [])].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Gradient */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 50%, ${project.color || 'var(--accent-primary)'}15 0%, transparent 50%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Header Navigation */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 5%'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              padding: '12px 24px',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s ease'
            }}
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </motion.button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: project.color || 'var(--accent-primary)'
            }} />
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)'
            }}>
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 5%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Project Title & Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '60px' }}
        >
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            marginBottom: '30px',
            lineHeight: 1.1,
            background: `linear-gradient(135deg, white, ${project.color || 'var(--accent-primary)'})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Inter', sans-serif"
          }}>
            {project.title}
          </h1>

          <p style={{
            fontSize: '1.4rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '800px',
            marginBottom: '40px',
            fontFamily: "'Inter', sans-serif"
          }}>
            {project.description || project.desc}
          </p>

          {/* Project Meta Info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '40px'
          }}>
            {project.year && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Calendar size={18} color={project.color || 'var(--accent-primary)'} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{project.year}</span>
              </div>
            )}

            {project.tags && project.tags.map((tag, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Tag size={18} color={project.color || 'var(--accent-primary)'} />
                <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{tag}</span>
              </div>
            ))}

            {project.link && project.link !== '#' && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  background: project.color || 'var(--accent-primary)',
                  color: 'white',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                <ExternalLink size={18} />
                View Live Project
              </motion.a>
            )}
          </div>
        </motion.div>

        {/* Additional Project Details */}
        {project.details && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              marginBottom: '80px',
              padding: '50px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '30px',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif"
            }}>
              Project Details
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif"
            }}>
              {project.details}
            </p>
          </motion.div>
        )}

        {/* Quote Section */}
        {project.quote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              padding: '100px 10%',
              textAlign: 'center',
              position: 'relative',
              marginBottom: '100px'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '20rem',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.03)',
              zIndex: 0,
              pointerEvents: 'none'
            }}>"</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'white',
              lineHeight: 1.4,
              fontFamily: "'Inter', sans-serif",
              position: 'relative',
              zIndex: 1,
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {project.quote}
            </h2>
          </motion.div>
        )}

        {/* Story Phases */}
        {project.phases && (
          <div style={{ marginBottom: '120px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 800, 
              marginBottom: '60px', 
              textAlign: 'center',
              color: 'white',
              fontFamily: "'Inter', sans-serif" 
            }}>
              PHASES OF THE JOURNEY
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '40px' 
            }}>
              {project.phases.map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    padding: '50px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                   <div style={{
                     fontSize: '0.8rem',
                     fontWeight: 800,
                     color: project.color || 'var(--accent-primary)',
                     letterSpacing: '3px',
                     marginBottom: '20px'
                   }}>PHASE 0{idx + 1}</div>
                   <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '20px', color: 'white' }}>{phase.title}</h3>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>{phase.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            marginBottom: '40px', 
            color: 'white',
            fontFamily: "'Inter', sans-serif" 
          }}>
            VISUAL GLIMPSES
          </h2>
          {/* Main Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '30px',
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: `0 40px 80px rgba(0,0,0,0.5)`
          }}>
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              src={allImages[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              onClick={() => setIsFullscreen(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'zoom-in'
              }}
            />

            {/* Image Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                  }}
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                  }}
                >
                  <ChevronRight size={28} />
                </button>

                {/* Image Counter */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  right: '30px',
                  padding: '12px 24px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '20px',
              overflowX: 'auto',
              paddingBottom: '20px',
              scrollbarWidth: 'none'
            }}>
              {allImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{
                    minWidth: '200px',
                    height: '130px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: idx === currentImageIndex
                      ? `2px solid ${project.color || 'var(--accent-primary)'}`
                      : '2px solid rgba(255,255,255,0.05)',
                    opacity: idx === currentImageIndex ? 1 : 0.5,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Legacy & Reflection Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '150px',
            padding: '80px 40px',
            textAlign: 'center',
            background: `linear-gradient(to bottom, transparent, ${project.color || 'var(--accent-primary)'}10, transparent)`,
            borderRadius: '40px',
            border: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: project.color || 'var(--accent-primary)',
            filter: 'blur(100px)',
            opacity: 0.2,
            zIndex: 0
          }} />

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${project.color || 'var(--accent-primary)'}40`
            }}
          >
            <Sparkles size={32} color={project.color || 'var(--accent-primary)'} />
          </motion.div>

          <h2 style={{
            fontSize: '3rem',
            fontWeight: 800,
            marginBottom: '30px',
            color: 'white',
            fontFamily: "'Inter', sans-serif"
          }}>
            Reflection & Legacy
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '800px',
            margin: '0 auto 40px',
            fontFamily: "'Inter', sans-serif"
          }}>
            This story is more than a memory—it is a testament to the life Dominique builds every day. It is a reminder that beauty isn't found in the absence of struggle, but in the courage to live fully alongside it. Her legacy is one of joy, raw honesty, and a spirit that refuses to be dimmed.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            <span>Livable</span>
            <div style={{ width: '30px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
            <span>Not Workable</span>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(20px)',
                zIndex: 9998,
                cursor: 'zoom-out'
              }}
            />
            <div style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={allImages[currentImageIndex]}
                alt={project.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }}
              />
              <button
                onClick={() => setIsFullscreen(false)}
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={24} />
              </button>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          
          div[style*="height: 600px"] {
            height: 400px !important;
          }
          
          div[style*="padding: 50px"] {
            padding: 30px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetailPage;
