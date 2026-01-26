import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Eye } from 'lucide-react';

const PortfolioGallery = ({ items = [], onItemClick }) => {
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="constellation-wrapper" style={{ 
      borderTop: '1px solid var(--border-color)', 
      padding: '120px 10%',
      position: 'relative'
    }}>
      {/* Background Pattern */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        opacity: 0.05, 
        pointerEvents: 'none', 
        zIndex: 0,
        backgroundImage: 'radial-gradient(circle, var(--accent-primary) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="section-header-premium">

        <h2 className="section-title-premium">
          <span className="section-title-accent">PORTFOLIO</span> 
          <span className="section-title-stroke">GALLERY</span>
        </h2>
      </div>

      {/* Category Filter */}
      {categories.length > 1 && (
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center', 
          marginBottom: '60px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 30px',
                background: activeCategory === category 
                  ? 'var(--accent-primary)' 
                  : 'rgba(255,255,255,0.03)',
                color: activeCategory === category 
                  ? 'black' 
                  : 'var(--text-primary)',
                border: `1px solid ${activeCategory === category ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: '100px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      )}

      {/* Gallery Grid - Controlling max-width for better balance */}
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
          <p style={{ fontSize: '1.2rem', fontFamily: "'Inter', sans-serif, sans-serif" }}>
            No items in this category yet.
          </p>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          #portfolio {
            padding: 100px 120px 100px 5% !important;
          }
        }

        @media (max-width: 768px) {
          #portfolio {
            padding: 80px 5% !important;
          }
          .grid-premium {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          #portfolio {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

const PortfolioCard = ({ item, index, onClick }) => {
  return (
    <motion.div
      layoutId={`portfolio-card-${item.id || index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Image Container */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '75%',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.1)'
      }}>
        <motion.img
          layoutId={`portfolio-image-${item.id || index}`}
          src={item.imageUrl || item.image}
          alt={item.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease'
          }}
        >
          <Eye size={40} color="white" />
        </motion.div>

        {/* Category Badge */}
        {item.category && (
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            padding: '6px 16px',
            background: 'var(--accent-primary)',
            color: 'black',
            borderRadius: '100px',
            fontSize: '0.7rem',
            fontWeight: 900,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif"
          }}>
            {item.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '25px' }}>
        <motion.h3
          layoutId={`portfolio-title-${item.id || index}`}
          style={{
            fontSize: '1.5rem',
            fontFamily: "'Abril Fatface', serif",
            color: 'var(--text-primary)',
            marginBottom: '12px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          layoutId={`portfolio-desc-${item.id || index}`}
          style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '20px',
            fontFamily: "'Inter', sans-serif",
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {item.description || item.desc}
        </motion.p>

        {/* Meta Info */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          fontFamily: "'Inter', sans-serif"
        }}>
          {item.date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14} />
              <span>{item.date}</span>
            </div>
          )}
          {item.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} />
              <span>{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioGallery;
