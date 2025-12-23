import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const staticCertificates = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Meta / Coursera",
    date: "Dec 2023",
    color: "#ff6b00",
    imageUrl: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800",
    description: "Specialization in React, Node.js, and modern cloud deployment architectures."
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    issuer: "Google Cloud",
    date: "Oct 2023",
    color: "#8b5cf6",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    description: "In-depth study of neural networks, TensorFlow, and large scale data processing."
  },
  {
    id: 3,
    title: "Cloud Architecture Professional",
    issuer: "AWS",
    date: "Aug 2023",
    color: "#0ea5e9",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    description: "Designing resilient, high-availability systems using AWS global infrastructure."
  }
];

const CertificatesSection = () => {
  const { data: dbCertificates, loading } = useCollection('certificates');
  const [index, setIndex] = useState(0);

  const certificatesData = dbCertificates.length > 0 ? dbCertificates.map(c => ({
      ...c,
      color: c.color || ['#ff6b00', '#8b5cf6', '#0ea5e9', '#10b981'][Math.floor(Math.random() * 4)]
  })) : staticCertificates;

  useEffect(() => {
    if (certificatesData.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % certificatesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [certificatesData.length]);

  if (loading) return null;

  const next = () => setIndex((prev) => (prev + 1) % certificatesData.length);
  const prev = () => setIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);

  return (
    <section id="certificates" className="certificates-section" style={{
      position: 'relative',
      padding: '100px 0',
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
        width: '1000px',
        height: '1000px',
        background: `radial-gradient(circle, ${certificatesData[index].color}08 0%, transparent 70%)`,
        zIndex: 0,
        transition: 'background 1s ease'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '80px', zIndex: 2 }}
      >
        <h2 className="section-title-premium" style={{ marginBottom: '15px' }}>
          <span className="section-title-accent">CERTIFIED</span> 
          <span className="section-title-stroke">EXCELLENCE</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase' }}>
          Validating the boundaries of technology
        </p>
      </motion.div>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px',
        zIndex: 2
      }}>
        {certificatesData.map((cert, i) => {
          let position = i - index;
          if (position < -1) position += certificatesData.length;
          if (position > 1) position -= certificatesData.length;

          const isFront = position === 0;
          const isLeft = position === -1;
          const isRight = position === 1;
          const isHidden = !isFront && !isLeft && !isRight;

          return (
            <motion.div
              key={cert.id}
              initial={false}
              animate={{
                x: isFront ? 0 : isLeft ? -450 : isRight ? 450 : 0,
                scale: isFront ? 1.1 : 0.75,
                opacity: isHidden ? 0 : isFront ? 1 : 0.5,
                zIndex: isFront ? 10 : 5,
                rotateY: isLeft ? 45 : isRight ? -45 : 0,
                filter: isFront ? 'blur(0px)' : 'blur(4px)'
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24
              }}
              style={{
                position: 'absolute',
                width: '400px',
                height: '550px',
                pointerEvents: isFront ? 'auto' : 'none'
              }}
            >
              <div 
                className="certificate-card"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--card-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  borderRadius: '30px',
                  border: `2px solid ${isFront ? cert.color : 'var(--border-color)'}`,
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: isFront ? `0 25px 50px rgba(0,0,0,0.1), 0 0 30px ${cert.color}22` : 'none',
                  transition: 'all 0.5s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '150px',
                  height: '150px',
                  background: `radial-gradient(circle, ${cert.color}22 0%, transparent 70%)`,
                  borderRadius: '50%'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    background: `${cert.color}22`, 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: cert.color
                  }}>
                    <Award size={28} />
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '2px' }}>VERIFIED</span>
                </div>

                {/* Certificate Image Preview */}
                <div style={{ 
                    width: '100%', 
                    height: '180px', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-color)',
                    position: 'relative'
                }}>
                    <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={cert.imageUrl} 
                        alt={cert.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to top, rgba(0,0,0,0.4), transparent)`,
                        pointerEvents: 'none'
                    }} />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '8px', fontFamily: 'Anton' }}>{cert.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: cert.color, fontWeight: 700, fontSize: '0.85rem' }}>
                    <span>{cert.issuer}</span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {cert.description}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      background: 'var(--text-primary)',
                      color: 'var(--bg-color)',
                      border: 'none',
                      padding: '15px',
                      borderRadius: '15px',
                      fontWeight: 900,
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    VIEW CREDENTIAL <ExternalLink size={16} />
                  </motion.button>
                </div>

                <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                     <div style={{ width: '40px', height: '1px', background: cert.color, opacity: 0.3 }} />
                     <div style={{ width: '1px', height: '40px', background: cert.color, opacity: 0.3, position: 'absolute', bottom: 0, right: 0 }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '30px', marginTop: '60px', zIndex: 3 }}>
        <motion.button 
          whileHover={{ scale: 1.1, background: 'var(--card-bg)' }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease'
          }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, background: 'var(--card-bg)' }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease'
          }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        {certificatesData.map((_, i) => (
          <div 
            key={i}
            style={{
              width: i === index ? '30px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === index ? 'var(--accent-primary)' : 'var(--border-color)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
