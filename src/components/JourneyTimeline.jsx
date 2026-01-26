import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, Heart, Star, Zap } from 'lucide-react';

const JourneyTimeline = ({ milestones = [], onOpenDetail }) => {
  return (
    <section id="journey" style={{
      borderTop: '1px solid var(--border-color)',
      padding: '120px 10%',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, var(--accent-primary)08 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="section-header-premium" style={{ marginBottom: '80px' }}>

        <h2 className="section-title-premium">
          <span className="section-title-accent">LIFE</span> 
          <span className="section-title-stroke">JOURNEY</span>
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ 
        position: 'relative', 
        maxWidth: '1200px', 
        margin: '0 auto',
        zIndex: 1
      }}>
        {/* Center Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--border-color), transparent)',
          transform: 'translateX(-50%)',
          zIndex: 0
        }} />

        {milestones.map((milestone, idx) => {
          const isLeft = idx % 2 === 0;
          const Icon = milestone.icon === 'award' ? Award 
                     : milestone.icon === 'heart' ? Heart
                     : milestone.icon === 'star' ? Star
                     : milestone.icon === 'zap' ? Zap
                     : Star;

          return (
            <motion.div
              key={milestone.id || idx}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{
                position: 'relative',
                marginBottom: '80px',
                display: 'grid',
                gridTemplateColumns: isLeft ? '1fr 80px 1fr' : '1fr 80px 1fr',
                gap: '0',
                alignItems: 'center'
              }}
            >
              {/* Left Content */}
              <div style={{ 
                gridColumn: isLeft ? '1' : '3',
                textAlign: isLeft ? 'right' : 'left',
                paddingRight: isLeft ? '40px' : '0',
                paddingLeft: isLeft ? '0' : '40px'
              }}>
                <MilestoneCard 
                  milestone={milestone} 
                  isLeft={isLeft}
                  onClick={() => onOpenDetail && onOpenDetail(milestone)}
                />
              </div>

              {/* Center Icon */}
              <div style={{
                gridColumn: '2',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2
              }}>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: milestone.color || 'var(--accent-primary)',
                    border: '4px solid var(--bg-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 30px ${milestone.color || 'var(--accent-primary)'}44`,
                    cursor: 'pointer'
                  }}
                  onClick={() => onOpenDetail && onOpenDetail(milestone)}
                >
                  <Icon size={24} color="white" />
                </motion.div>
              </div>

              {/* Right Content (empty for spacing) */}
              <div style={{ gridColumn: isLeft ? '3' : '1' }} />
            </motion.div>
          );
        })}
      </div>

      {milestones.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px',
          color: 'var(--text-secondary)',
          position: 'relative',
          zIndex: 1
        }}>
          <p style={{ fontSize: '1.2rem', fontFamily: "'Inter', sans-serif, sans-serif" }}>
            No milestones added yet.
          </p>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          #journey > div > div {
            grid-template-columns: 60px 1fr !important;
          }
          #journey > div > div > div:first-child {
            grid-column: 2 !important;
            text-align: left !important;
            padding-left: 20px !important;
            padding-right: 0 !important;
          }
          #journey > div > div > div:nth-child(2) {
            grid-column: 1 !important;
          }
          #journey > div > div > div:last-child {
            display: none !important;
          }
          #journey > div > div:first-child {
            left: 30px !important;
          }
        }
      `}</style>
    </section>
  );
};

const MilestoneCard = ({ milestone, isLeft, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        border: `1px solid ${milestone.color || 'var(--border-color)'}`,
        borderRadius: '20px',
        padding: '30px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Accent Corner */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: isLeft ? 0 : 'auto',
        left: isLeft ? 'auto' : 0,
        width: '100px',
        height: '100px',
        background: `linear-gradient(135deg, ${milestone.color || 'var(--accent-primary)'}22 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      {/* Category Badge */}
      {milestone.category && (
        <div style={{
          display: 'inline-block',
          padding: '4px 14px',
          background: `${milestone.color || 'var(--accent-primary)'}22`,
          border: `1px solid ${milestone.color || 'var(--accent-primary)'}`,
          borderRadius: '100px',
          fontSize: '0.7rem',
          fontWeight: 900,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
          color: milestone.color || 'var(--accent-primary)',
          marginBottom: '15px'
        }}>
          {milestone.category}
        </div>
      )}

      {/* Title */}
      <h3 style={{
        fontSize: '1.6rem',
        fontFamily: "'Abril Fatface', serif",
        color: 'var(--text-primary)',
        marginBottom: '12px',
        letterSpacing: '0px',
        lineHeight: 1.2
      }}>
        {milestone.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        marginBottom: '20px',
        fontFamily: "'Inter', sans-serif",
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {milestone.description || milestone.desc}
      </p>

      {/* Meta Info */}
      <div style={{
        display: 'flex',
        gap: '20px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        fontFamily: "'Inter', sans-serif",
        flexWrap: 'wrap'
      }}>
        {milestone.date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color={milestone.color || 'var(--accent-primary)'} />
            <span>{milestone.date}</span>
          </div>
        )}
        {milestone.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color={milestone.color || 'var(--accent-primary)'} />
            <span>{milestone.location}</span>
          </div>
        )}
      </div>

      {/* Click Indicator */}
      {milestone.image && (
        <div style={{
          marginTop: '15px',
          fontSize: '0.75rem',
          color: milestone.color || 'var(--accent-primary)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Click to view details →
        </div>
      )}
    </motion.div>
  );
};

export default JourneyTimeline;
