import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';

const AboutSection = () => {
  const { data: aboutData, loading } = useCollection('about');
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Dynamic Data Extraction
  const dynamicAbout = aboutData?.[0] || {
    desc: "I am a digital architect specializing in high-performance web systems and AI-driven logic. My approach blends cinematic aesthetics with rigorous engineering to create interfaces that don't just work—they inspire.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
    stats: "5+ YEARS, 40+ BUILDS, 99% UPTIME"
  };

  const statItems = dynamicAbout.stats.split(',').map(s => {
      const parts = s.trim().split(' ');
      return { 
          value: parts[0], 
          label: parts.slice(1).join(' ') 
      };
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (loading) return null;

  return (
    <section id="about" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ 
      position: 'relative', 
      padding: '120px 10%', 
      display: 'grid', 
      gridTemplateColumns: '1fr 1.2fr', 
      alignItems: 'center', 
      gap: '80px',
      overflow: 'hidden',
      background: 'var(--bg-color)',
      transition: 'background 0.5s ease' 
    }}>
      {/* 3D Frame Container */}
      <div style={{ perspective: '1000px', display: 'flex', justifyContent: 'center' }}>
        <motion.div
           style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           viewport={{ once: true }}
        >
          {/* Main Floating Frame */}
          <div style={{
            width: '380px', height: '480px', background: 'var(--card-bg)', backdropFilter: 'var(--glass-blur)',
            borderRadius: '40px', border: '1px solid var(--border-color)', padding: '24px',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: '12px', border: '1px solid rgba(255, 107, 0, 0.3)', borderRadius: '32px', pointerEvents: 'none', zIndex: 1 }}></div>
            <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
              <img src={dynamicAbout.imageUrl} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%)' }}></div>
            </div>
            <div style={{ position: 'absolute', top: 35, left: 35, width: 20, height: 2, background: 'rgba(255,255,255,0.4)', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', top: 35, left: 35, width: 2, height: 20, background: 'rgba(255,255,255,0.4)', zIndex: 2 }}></div>
          </div>
          <motion.div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', background: 'var(--accent-primary)', filter: 'blur(100px)', opacity: 0.1, zIndex: -1, borderRadius: '40px' }} />
        </motion.div>
      </div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '16px' }}>Discovery</span>
        <h2 className="section-title-premium" style={{ justifyContent: 'flex-start', marginBottom: '32px' }}>
          <span className="section-title-accent">ABOUT</span> 
          <span className="section-title-stroke">ME</span>
        </h2>
        
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '600px' }}>
          {dynamicAbout.desc.split('\n\n').map((p, i) => (
            <p key={i} style={{ marginBottom: i === 0 ? '24px' : '0px' }}>{p}</p>
          ))}
        </div>

        {/* Stats or Highlights */}
        <div style={{ display: 'flex', gap: '40px', marginTop: '48px' }}>
           {statItems.map((item, idx) => (
             <div key={idx}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'Anton' }}>{item.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 800 }}>{item.label}</div>
             </div>
           ))}
        </div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '-100px', left: '50%', transform: 'translateX(-50%)', width: '50%', height: '200px', background: 'rgba(255, 107, 0, 0.1)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }} />
    </section>
  );
};

export default AboutSection;
