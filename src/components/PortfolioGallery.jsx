import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Eye, ArrowRight, Sparkles, Code, Palette, Zap, Layout, PenTool, Image, Smartphone, Globe, Cpu, Music, Camera, Layers, Hash, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PortfolioGallery = ({ items = [], onItemClick }) => {
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = React.useState('All');
  const navigate = useNavigate();

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="constellation-wrapper" style={{
      borderTop: '1px solid var(--border-color)',
      padding: '120px 10%',
      position: 'relative'
    }}>
      {/* Decorative Background Icons */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.04,
        pointerEvents: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '60px',
        justifyContent: 'center',
        alignContent: 'flex-start',
        padding: '20px',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}>
        {Array.from({ length: 120 }).map((_, i) => {
          const Icon = [Code, Palette, Zap, Layout, PenTool, Image, Smartphone, Globe, Cpu, Music, Camera, Layers, Hash, Command][i % 14];
          return (
            <Icon
              key={i}
              size={24}
              style={{
                transform: `rotate(${i * 45}deg)`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          );
        })}
      </div>

      <div className="section-header-premium">
        <h2 className="section-title-premium" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="section-title-accent">VISUAL</span>
          <span style={{ color: 'gray' }}>STORIES</span>
        </h2>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="filter-container" style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center', // Center the buttons
          marginBottom: '40px',
          flexWrap: 'wrap', // Wrap them nicely
          padding: '0 5%',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                if (category === 'My Art Collection') {
                  navigate('/art-gallery');
                } else if (category === 'My Designs') {
                  navigate('/design-gallery');
                } else if (category === 'My Memories') {
                  navigate('/memories-gallery');
                } else {
                  setActiveCategory(category);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 20px', // Slightly smaller padding
                background: activeCategory === category
                  ? 'var(--accent-primary)'
                  : 'rgba(255,255,255,0.05)',
                color: activeCategory === category
                  ? 'black'
                  : 'var(--text-primary)',
                border: `1px solid ${activeCategory === category ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: '100px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem', // Slightly smaller font
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div
        className="grid-premium"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {filteredItems.map((item, idx) => (
          <PortfolioCard
            key={item.id || idx}
            item={item}
            index={idx}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '100px 20px',
          color: 'var(--text-secondary)',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{ fontSize: '1.2rem', fontFamily: "'Inter', sans-serif" }}>
            No items in this category yet.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          #portfolio {
            padding: 80px 20px !important;
          }
          .grid-premium {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            position: relative !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 10 !important;
          }
          .portfolio-card-container {
             height: 420px !important; 
             visibility: visible !important;
             opacity: 1 !important;
             display: block !important;
          }
          .section-title-premium {
             font-size: 2.5rem !important; 
             text-align: center !important;
             width: 100% !important;
             margin-bottom: 30px !important;
          }
          .filter-container {
             display: flex !important;
             overflow-x: auto !important;
             justify-content: flex-start !important;
             padding: 10px 0 !important;
             margin-bottom: 30px !important;
             -webkit-overflow-scrolling: touch;
             scrollbar-width: none;
             -ms-overflow-style: none;
          }
          .filter-container::-webkit-scrollbar {
             display: none;
          }
        }

        .fade-in-up {
           animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        @keyframes fadeInUp {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
        }

        @media (max-width: 480px) {
          #portfolio {
            padding: 60px 15px !important;
          }
        }
        
        .portfolio-card-container {
             height: 480px;
        }

        @media (max-width: 768px) {
             .portfolio-card-title {
                  font-size: 1.5rem !important; 
             }
             p {
                font-size: 0.9rem !important;
                line-height: 1.5 !important;
                color: rgba(255, 255, 255, 0.7) !important;
             }
        }
      `}</style>
    </section>
  );
};

const PortfolioCard = ({ item, index, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    // Prevent default and stop propagation just in case
    e.stopPropagation();
    
    // Navigate to project detail page
    if (item.id) {
       navigate(`/project/${item.id}`);
    } else if (onClick) {
       onClick(item);
    }
  };
  
  return (
    <motion.div
      whileHover="hover"
      initial={{ opacity: 1 }} // Explicitly visible by default
      className="premium-card portfolio-card-container fade-in-up"
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        isolation: 'isolate',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0a0a', // Solid black fallback
        zIndex: 5
      }}
    >
      {/* Dynamic Background Image */}
      <motion.div
        className="premium-bg-image-wrapper"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
        variants={{
          hover: { scale: 1.08 }
        }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
      >
        <img
          src={item.imageUrl || item.image || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000'}
          alt={item.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7) contrast(1.1)'
          }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)'
        }} />
      </motion.div>

      {/* Category Tag */}
      <div style={{
        position: 'absolute',
        top: '25px',
        left: '25px',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.15)'
      }}>
        <Sparkles size={14} color="var(--accent-primary)" fill="var(--accent-primary)" />
        <span style={{
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          {item.category || 'FEATURED'}
        </span>
      </div>

      {/* Content Overlay */}
      <motion.div
        variants={{
          hover: { y: -10 }
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '40px 30px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h3
          className="portfolio-card-title"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            marginBottom: '12px'
          }}
        >
          {item.title}
        </h3>

        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.5,
          fontFamily: "'Inter', sans-serif",
          marginBottom: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.description || item.desc}
        </p>

        {/* PROMINENT CTA BUTTON */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <motion.div
            variants={{
              hover: {
                scale: 1.05,
                backgroundColor: 'var(--accent-primary)',
                color: 'black'
              }
            }}
            style={{
              background: 'white',
              color: 'black',
              padding: '14px 24px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            VIEW STORY
            <ArrowRight size={18} />
          </motion.div>

          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)'
          }}>
            <Eye size={18} color="rgba(255,255,255,0.7)" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioGallery;
