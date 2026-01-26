import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Medal, Star, Crown, Target } from 'lucide-react';

const AchievementsSection = ({ achievements = [], onOpenDetail }) => {
  return (
    <section id="achievements" style={{
      borderTop: '1px solid var(--border-color)',
      padding: '120px 10%',
      background: 'linear-gradient(180deg, var(--bg-color) 0%, rgba(255,107,0,0.02) 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, var(--accent-primary) 2px, transparent 2px)',
        backgroundSize: '80px 80px',
        animation: 'float 20s ease-in-out infinite'
      }} />

      <div className="section-header-premium" style={{ marginBottom: '80px' }}>

        <h2 className="section-title-premium">
          <span className="section-title-accent">ACHIEVEMENTS</span> 
          <span className="section-title-stroke">& AWARDS</span>
        </h2>
      </div>

      {/* Achievements Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '40px',
        position: 'relative',
        zIndex: 1
      }}>
        {achievements.map((achievement, idx) => (
          <AchievementCard
            key={achievement.id || idx}
            achievement={achievement}
            index={idx}
            onClick={() => onOpenDetail && onOpenDetail(achievement)}
          />
        ))}
      </div>

      {achievements.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '100px 20px',
          color: 'var(--text-secondary)',
          position: 'relative',
          zIndex: 1
        }}>
          <Trophy size={60} style={{ opacity: 0.2, marginBottom: '20px' }} />
          <p style={{ fontSize: '1.2rem', fontFamily: "'Inter', sans-serif, sans-serif" }}>
            No achievements added yet.
          </p>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1024px) {
          #achievements {
            padding: 100px 120px 100px 5% !important;
          }
        }

        @media (max-width: 768px) {
          #achievements {
            padding: 80px 5% !important;
          }
          #achievements > div:nth-child(3) {
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
        }

        @media (max-width: 480px) {
          #achievements {
            padding: 60px 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

const AchievementCard = ({ achievement, index, onClick }) => {
  const getIcon = () => {
    switch(achievement.type?.toLowerCase()) {
      case 'trophy': return Trophy;
      case 'medal': return Medal;
      case 'crown': return Crown;
      case 'target': return Target;
      case 'star': return Star;
      default: return Award;
    }
  };

  const Icon = getIcon();
  const color = achievement.color || 'var(--accent-primary)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      style={{
        background: 'var(--card-bg)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: `1px solid ${color}44`,
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: `0 10px 40px ${color}11`
      }}
    >
      {/* Top Accent Bar */}
      <div style={{
        height: '6px',
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        width: '100%'
      }} />

      {/* Content */}
      <div style={{ padding: '35px' }}>
        {/* Icon Circle */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `${color}15`,
          border: `3px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '25px',
          position: 'relative'
        }}>
          <Icon size={36} color={color} />
          
          {/* Glow Effect */}
          <div style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite',
            zIndex: -1
          }} />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.8rem',
          fontFamily: "'Abril Fatface', serif, sans-serif",
          color: 'var(--text-primary)',
          marginBottom: '12px',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          lineHeight: 1.2
        }}>
          {achievement.title}
        </h3>

        {/* Issuer/Organization */}
        {achievement.issuer && (
          <div style={{
            fontSize: '1.1rem',
            color: color,
            fontFamily: "'Inter', sans-serif, sans-serif",
            fontWeight: 600,
            letterSpacing: '0.5px',
            marginBottom: '20px'
          }}>
            {achievement.issuer}
          </div>
        )}

        {/* Description */}
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '25px',
          fontFamily: "'Inter', sans-serif, sans-serif",
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {achievement.description || achievement.desc}
        </p>

        {/* Date Badge */}
        {achievement.date && (
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            borderRadius: '100px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            fontFamily: "'Inter', sans-serif, sans-serif",
            fontWeight: 600
          }}>
            {achievement.date}
          </div>
        )}

        {/* View Details Indicator */}
        {achievement.imageUrl && (
          <div style={{
            marginTop: '20px',
            fontSize: '0.75rem',
            color: color,
            fontFamily: "'Inter', sans-serif, sans-serif",
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>Click to view certificate</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        )}
      </div>

      {/* Bottom Decoration */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle at bottom right, ${color}08 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </motion.div>
  );
};

export default AchievementsSection;
