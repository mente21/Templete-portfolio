import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const staticTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Product Manager",
    company: "Google",
    text: "Working with this developer was a game-changer for our project. Their ability to bridge the gap between complex backend logic and stunning UI is rare.",
    avatarColor: "#ff6b00"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "CTO",
    company: "Fintech Solutions",
    text: "The architectural depth and attention to detail provided exceeded our expectations. A highly professional engineer who delivers real value.",
    avatarColor: "#ff9e00"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Lead UI/UX Designer",
    company: "Creative Pulse",
    text: "Rarely do I see a developer implement my designs with such precision. The micro-interactions and animations are absolutely world-class.",
    avatarColor: "#8b5cf6"
  }
];

const TestimonialsSection = () => {
  const { data: dbTestimonials, loading } = useCollection('testimonials');
  const [index, setIndex] = useState(0);

  const testimonialsData = dbTestimonials.length > 0 ? dbTestimonials.map(t => ({
      ...t,
      text: t.quote || t.text,
      avatarColor: t.avatarColor || ['#ff6b00', '#ff9e00', '#8b5cf6', '#ffcc00'][Math.floor(Math.random() * 4)]
  })) : staticTestimonials;

  useEffect(() => {
    if (testimonialsData.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  if (loading) return null;

  const next = () => setIndex((prev) => (prev + 1) % testimonialsData.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <section id="testimonials" className="testimonials-section" style={{
      position: 'relative',
      padding: '120px 0',
      background: 'var(--bg-color)',
      overflow: 'hidden',
      minHeight: '800px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.5s ease'
    }}>
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, var(--accent-primary)08 0%, transparent 60%)',
          zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', marginBottom: '100px', zIndex: 2 }}
      >
        <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '15px', 
            padding: '10px 25px', 
            background: 'var(--card-bg)', 
            borderRadius: '100px', 
            border: '1px solid var(--border-color)', 
            marginBottom: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
            <MessageSquare size={18} className="gradient-text" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Voice of Clients</span>
        </div>
        <h2 className="section-title-premium">
          <span className="section-title-accent">ECHOES</span> OF <span className="section-title-stroke">TRUST</span>
        </h2>
      </motion.div>

      <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          height: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '2000px',
          zIndex: 2
      }}>
        {testimonialsData.map((test, i) => {
          let position = i - index;
          if (position < -1) position += testimonialsData.length;
          if (position > 1) position -= testimonialsData.length;

          const isActive = position === 0;
          const isLeft = position === -1;
          const isRight = position === 1;
          const isFar = !isActive && !isLeft && !isRight;

          return (
            <motion.div
              key={test.id}
              animate={{
                x: isActive ? 0 : isLeft ? -480 : isRight ? 480 : 0,
                y: isActive ? 0 : 40,
                z: isActive ? 0 : -300,
                rotateY: isLeft ? 35 : isRight ? -35 : 0,
                scale: isActive ? 1.15 : 0.8,
                opacity: isFar ? 0 : isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 5,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 20
              }}
              style={{
                position: 'absolute',
                width: '550px',
                height: '350px',
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--card-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  borderRadius: '40px',
                  border: `1.5px solid ${isActive ? 'var(--accent-primary)33' : 'var(--border-color)'}`,
                  padding: '50px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.1)' : 'none',
                  transition: 'background 0.5s ease, border 0.5s ease'
              }}>
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    left: '50px',
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${test.avatarColor}, var(--accent-secondary))`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 10px 30px ${test.avatarColor}44`,
                    zIndex: 2
                }}>
                    <Quote size={35} color="var(--bg-color)" fill="var(--bg-color)" />
                </div>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '25px', color: test.avatarColor }}>
                    {[...Array(5)].map((_, it) => <Star key={it} size={14} fill={test.avatarColor} />)}
                </div>

                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    fontWeight: 400,
                    opacity: 0.9,
                    marginBottom: '40px'
                }}>
                    "{test.text}"
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: `conic-gradient(from 0deg, ${test.avatarColor}, transparent)`,
                        padding: '2px'
                    }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: test.avatarColor }}>
                            {test.name.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{test.name}</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{test.role} @ <span style={{ color: test.avatarColor }}>{test.company}</span></p>
                    </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginTop: '80px', zIndex: 3 }}>
        <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-primary)', 
                cursor: 'pointer',
                opacity: 0.5
            }}
        >
            <ChevronLeft size={40} />
        </motion.button>

        <div style={{ display: 'flex', gap: '15px' }}>
            {testimonialsData.map((_, i) => (
                <div 
                    key={i}
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: i === index ? 'var(--accent-primary)' : 'var(--border-color)',
                        transform: i === index ? 'scale(1.4)' : 'scale(1)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        boxShadow: i === index ? `0 0 15px var(--accent-primary)` : 'none'
                    }}
                />
            ))}
        </div>

        <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-primary)', 
                cursor: 'pointer',
                opacity: 0.5
            }}
        >
            <ChevronRight size={40} />
        </motion.button>
      </div>

    </section>
  );
};

export default TestimonialsSection;
