import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink, Calendar, Tag, Layers, Eye } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: portfolio } = useCollection('portfolio');
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (portfolio && id) {
      const foundProject = portfolio.find(p => p.id === id);
      setProject(foundProject);
    }
  }, [portfolio, id]);

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

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Main Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            borderRadius: '24px',
            overflow: 'hidden',
            marginBottom: '30px',
            border: `2px solid ${project.color || 'var(--accent-primary)'}`,
            boxShadow: `0 20px 60px ${project.color || 'var(--accent-primary)'}40`
          }}>
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
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
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '10px 20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '15px'
            }}>
              {allImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{
                    height: '120px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: idx === currentImageIndex
                      ? `3px solid ${project.color || 'var(--accent-primary)'}`
                      : '3px solid transparent',
                    opacity: idx === currentImageIndex ? 1 : 0.6,
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
