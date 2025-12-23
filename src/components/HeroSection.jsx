import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Twitter, ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const GlowingLines = () => {
  // Generate a tight bunch of parallel "snake" paths with multi-segment curves
  const paths = Array.from({ length: 15 }).map((_, i) => {
    const offset = i * 22; // Tight spacing
    // Wavy snake shape using a multi-segment path
    return `M ${-450 + offset} 1200 Q ${-100 + offset} 600, ${300 + offset} 900 T ${800 + offset} 300 T ${1300 + offset} -100`;
  });

  return (
    <div className="glowing-lines-container" style={{ 
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: -1,
      opacity: 0.8,
      transform: 'scale(1.4)'
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--accent-primary)"
            strokeWidth="7" // Even bolder
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              x: [0, 80, 0], // More flex
              y: [0, -50, 0], // More flex
              rotate: [-3, 3, -3],
              skewX: [-4, 4, -4]
            }}
            transition={{ 
              duration: 22 + (i * 0.8), // Much slower
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.15 // Staggered
            }}
            style={{ 
              filter: 'drop-shadow(0 0 15px var(--accent-primary))'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const HeroSection = () => {
  const { data: homeData, loading } = useCollection('home');
  const [roleIndex, setRoleIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic Data Extraction
  const dynamicHome = homeData?.[0] || {
    title: "CREATIVE ENGINEER",
    roles: "FRONTEND ARCHITECT, BACKEND NINJA, UI/UX DESIGNER, AI LOGIC ENGINEER",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80"
  };

  const roles = dynamicHome.roles.split(',').map(r => r.trim());

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);
  const imageX = useTransform(mouseXSpring, [-0.5, 0.5], ["2%", "-2%"]);
  const imageY = useTransform(mouseYSpring, [-0.5, 0.5], ["2%", "-2%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (loading) return null; // Or a subtle loader

  return (
    <section 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-color)',
        overflow: 'hidden',
        padding: '0 5% 0 120px',
        gap: '40px',
        perspective: '2000px'
      }}
    >
      <GlowingLines />
      
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ 
          zIndex: 3, 
          flex: '0 1 600px',
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div style={{
            position: 'absolute',
            left: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
        }}>
            <div style={{ width: '1px', height: '60px', background: 'var(--border-color)', opacity: 0.5 }}></div>
            {[
                { icon: <Github size={20} />, link: '#' },
                { icon: <Linkedin size={20} />, link: '#' },
                { icon: <Instagram size={20} />, link: '#' },
                { icon: <Twitter size={20} />, link: '#' }
            ].map((social, i) => (
                <motion.a
                    key={i}
                    href={social.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    whileHover={{ scale: 1.2, color: 'var(--accent-primary)', x: 5 }}
                    style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease', cursor: 'pointer' }}
                >
                    {social.icon}
                </motion.a>
            ))}
            <div style={{ width: '1px', height: '60px', background: 'var(--border-color)', opacity: 0.5 }}></div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <div style={{ width: '35px', height: '1.5px', background: 'var(--accent-primary)' }}></div>
          <span style={{ color: 'var(--accent-primary)', letterSpacing: '8px', fontSize: '0.75rem', fontWeight: 900 }}>INDUSTRIAL DESIGN</span>
        </div>

        <h1 style={{ fontSize: 'clamp(3.5rem, 5vw, 5rem)', margin: 0, color: 'var(--text-primary)' }}>
          {dynamicHome.title.split(' ')[0]}<br/>
          {dynamicHome.title.split(' ').slice(1).join(' ')}
        </h1>

        <div style={{ margin: '20px 0' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={roles[roleIndex]}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ 
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
                  color: 'var(--accent-primary)',
                  margin: 0,
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shine 4s linear infinite',
                  letterSpacing: '2px'
              }}>
                {roles[roleIndex]}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <p style={{ 
          color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '420px',
          fontWeight: 300, marginTop: '10px'
        }}>
          Specializing in premium high-performance digital architectures and high-impact industrial aesthetics for global brands.
        </p>

        <motion.div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
             <a href="#work" className="btn" style={{
                 padding: '14px 40px', border: '1.5px solid var(--text-primary)', color: 'var(--text-primary)',
                 textTransform: 'uppercase', fontFamily: 'Anton', fontSize: '0.85rem', borderRadius: '4px',
                 letterSpacing: '3px', display: 'inline-flex', alignItems: 'center', gap: '12px',
                 transition: 'all 0.3s ease', background: 'transparent', textDecoration: 'none'
             }}>
                 VIEW ARCHIVE <ArrowRight size={16} />
             </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ zIndex: 2, flex: '0 1 450px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1500px' }}
      >
        <motion.div
           style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
           animate={{ y: [0, -30, 0], rotateZ: [0, 2, 0, -2, 0] }}
           transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotateZ: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div style={{
            position: 'relative', width: 'min(420px, 100%)', height: 'min(550px, 70vh)',
            padding: '12px', background: 'var(--card-bg)', border: '1px solid var(--border-color)',
            borderRadius: '24px', backdropFilter: 'blur(40px)',
            boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 107, 0, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d'
          }}>
            <motion.div style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', transform: 'translateZ(50px)', position: 'relative' }}>
              <motion.img 
                src={dynamicHome.imageUrl} 
                alt="Portrait"
                style={{ width: '110%', height: '110%', objectFit: 'cover', opacity: 0.95, x: imageX, y: imageY, position: 'absolute', top: '-5%', left: '-5%' }}
              />
              <motion.div 
                animate={{ y: [-600, 600] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)', boxShadow: '0 0 20px var(--accent-primary)', zIndex: 2, opacity: 0.6 }}
              />
            </motion.div>
            <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(60px)', transform: 'translateZ(-40px)', zIndex: -1 }} />
            <motion.div style={{ position: 'absolute', bottom: '30px', fontFamily: 'Anton', color: 'var(--bg-color)', fontSize: '0.8rem', letterSpacing: '6px', padding: '10px 30px', background: 'var(--text-primary)', border: '1px solid var(--accent-primary)', borderRadius: '100px', zIndex: 10, transform: 'translateZ(100px)', textTransform: 'uppercase', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              PRIME HUB
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes shine { to { background-position: 200% center; } }
        @media (max-width: 1100px) {
          section { flex-direction: column !important; padding: 140px 5% 60px !important; gap: 80px !important; }
          div[style*="flex"] { width: 100% !important; flex: 1 1 auto !important; text-align: center !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
