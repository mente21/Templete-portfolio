import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';
import { X, ExternalLink } from 'lucide-react';

const EducationTimeline = ({ onOpenDetail }) => {
  const { data: dbEducation, loading } = useCollection('education');

  const staticEducation = [
    {
      degree: "High School Diploma",
      school: "Scientific Excellence School",
      year: "2018 - 2020",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400"
    },
    {
      degree: "B.Sc. Computer Science",
      school: "Technical University",
      year: "2020 - 2024",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400"
    },
    {
      degree: "Cert. AI Architecture",
      school: "Advanced Learning Inst.",
      year: "2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400"
    },
    {
      degree: "M.Sc. Computer Science",
      school: "Global Tech University",
      year: "Present",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400"
    }
  ];

  const rawData = dbEducation.length > 0 ? dbEducation : staticEducation;
  
  const getProgressColor = (index, total) => {
    if (total <= 1) return '#ff4d4d'; // Industrial Red
    if (total === 2) return index === 0 ? '#ff4d4d' : '#00ff88'; // Red to Green
    if (total === 3) {
      if (index === 0) return '#ff4d4d';
      if (index === 1) return '#ffcc00'; // Yellow
      return '#00ff88';
    }
    
    // For 4+ items, create a smooth transition from Red (0) to Green (130)
    const hue = (index / (total - 1)) * 135;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const educationData = rawData.map((item, idx) => ({
      ...item,
      position: idx % 2 === 0 ? 'top' : 'bottom',
      color: getProgressColor(idx, rawData.length)
  }));

  if (loading) return null;

  return (
    <>
    <section id="education" style={{ 
      padding: '120px 10% 120px 240px',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.5s ease'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '100px', marginLeft: '-100px' }}>
        <h2 className="section-title-premium">
          <span className="section-title-accent">EDUCATION</span> 
          <span className="section-title-stroke">VIEW</span>
        </h2>
      </div>

      <div style={{ position: 'relative', height: '550px', display: 'flex', alignItems: 'center' }}>
        {/* Timeline SVG Container */}
        <svg 
          width="100%" 
          height="150" 
          viewBox="0 0 1000 100" 
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', overflow: 'visible', zIndex: 1 }}
        >
          <defs>
            <filter id="timeline-glow-massive" x="-20%" y="-500%" width="140%" height="1100%">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {educationData.length <= 1 ? (
                <>
                  <stop offset="0%" stopColor="#ff4d4d" />
                  <stop offset="100%" stopColor="#ff4d4d" />
                </>
              ) : (
                educationData.map((item, idx) => (
                  <stop 
                    key={idx} 
                    offset={`${(idx / (educationData.length - 1)) * 100}%`} 
                    stopColor={item.color} 
                  />
                ))
              )}
            </linearGradient>
          </defs>

          {/* Static Background Rail (Always Visible) */}
          <line x1="0" y1="50" x2="1000" y2="50" stroke="var(--timeline-rail)" strokeWidth="2" strokeDasharray="10, 5" />

          {/* Deep Aura Glow */}
          <motion.path
            d="M 0 50 L 1000 50"
            stroke="url(#progress-gradient)"
            strokeWidth="35"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            style={{ opacity: 0.2 }}
            filter="url(#timeline-glow-massive)"
          />

          {/* Main Thick Glowing Line */}
          <motion.path
            d="M 0 50 L 1000 50"
            stroke="url(#progress-gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            filter="url(#timeline-glow-massive)"
            style={{ opacity: 0.95 }}
          />

          {/* High Contrast Core Wire */}
          <motion.path
            d="M 0 50 L 1000 50"
            stroke="var(--text-primary)"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            style={{ opacity: 0.4 }}
          />
        </svg>

        {/* Timeline Nodes */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          position: 'relative',
          zIndex: 2 
        }}>
          {educationData.map((item, idx) => {
            return (
              <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '0' }}>
                {/* Node Circle */}
                <motion.div
                  initial={{ scale: 0, backgroundColor: 'var(--bg-color)' }}
                  whileInView={{ scale: 1, backgroundColor: item.color }}
                  transition={{ type: 'spring', damping: 10, delay: idx * 1.25 }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    boxShadow: `0 0 30px ${item.color}, 0 0 60px ${item.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 5,
                    border: '4px solid var(--bg-color)'
                  }}
                  onClick={() => onOpenDetail(item)}
                >
                    <div style={{ width: '10px', height: '10px', background: 'white', borderRadius: '50%' }} />
                </motion.div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: item.position === 'top' ? -40 : 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 1.25 + 0.5, type: 'spring', damping: 15 }}
                  style={{
                    position: 'absolute',
                    [item.position === 'top' ? 'bottom' : 'top']: '80px',
                    width: '280px',
                    background: 'var(--card-bg)',
                    backdropFilter: 'var(--glass-blur)',
                    borderRadius: '24px',
                    border: `1.5px solid ${item.color}44`,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                    transform: 'translateX(-50%)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'background 0.5s ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => onOpenDetail(item)}
                >
                  {item.position === 'bottom' && (
                    <div style={{ width: '100%', height: '140px', overflow: 'hidden', background: 'rgba(0,0,0,0.1)' }}>
                      <img src={item.image} alt={item.degree} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9 }} />
                    </div>
                  )}

                  <div style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: item.color, fontWeight: 900, letterSpacing: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
                      {item.year}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'Anton' }}>
                      {item.degree}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '1px' }}>
                      {item.school}
                    </div>
                  </div>

                  {item.position === 'top' && (
                    <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderTop: `1px solid ${item.color}22`, background: 'rgba(0,0,0,0.1)' }}>
                      <img src={item.image} alt={item.degree} style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.9 }} />
                    </div>
                  )}
                </motion.div>
                
                {/* Vertical Connection */}
                <motion.div
                   initial={{ height: 0 }}
                   whileInView={{ height: '80px' }}
                   transition={{ delay: idx * 1.25 + 0.2 }}
                   style={{
                     width: '2px',
                     background: `linear-gradient(to ${item.position === 'top' ? 'top' : 'bottom'}, ${item.color}, transparent)`,
                     position: 'absolute',
                     [item.position === 'top' ? 'bottom' : 'top']: '18px',
                     zIndex: 1,
                     opacity: 0.6
                   }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
};

export default EducationTimeline;
