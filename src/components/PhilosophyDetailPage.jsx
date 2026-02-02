import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, PenTool, Zap, RefreshCw, Heart, Layers, Sparkles, ChevronRight, Target } from 'lucide-react';

const philosophies = [
  {
    id: "ph1",
    title: "VISION",
    subtitle: "The North Star",
    icon: Lightbulb,
    color: "#facc15",
    description: "Seeing beyond the immediate horizon. It's not just about what we build today, but how it shapes the future.",
    details: "Vision is about foresight—the ability to anticipate trends and needs before they manifest. It's about seeing the 'big picture' while others are focused on the immediate tasks. In my work, this means building scalable solutions that don't just solve today's problems but are resilient enough to adapt to tomorrow's challenges. It's the clarity of purpose that guides every creative decision.",
    principles: [
      "Anticipate future technological shifts",
      "Focus on long-term sustainability over quick fixes",
      "Maintain a clear sense of purpose throughout the project lifecycle"
    ],
    tags: ["Foresight", "Innovation", "Clarity"]
  },
  {
    id: "ph2",
    title: "CRAFT",
    subtitle: "The Foundation",
    icon: PenTool,
    color: "#a855f7",
    description: "Merging logic with aesthetics. Every line of code and every pixel is placed with intentionality and precision.",
    details: "Craft is the intersection of engineering and art. It's the obsessive attention to detail that separates a good product from a great one. Whether it's the rhythm of a layout, the micro-interactions of a button, or the cleanliness of the underlying codebase, every element is an opportunity for excellence. I treat every project as a piece of digital craftsmanship.",
    principles: [
      "Attention to micro-details and pixel-perfection",
      "Writing clean, self-documenting code",
      "Balancing aesthetic elegance with technical robustness"
    ],
    tags: ["Precision", "Artistry", "Quality"]
  },
  {
    id: "ph3",
    title: "VELOCITY",
    subtitle: "The Momentum",
    icon: Zap,
    color: "#ef4444",
    description: "Speed matters, but direction matters more. moving fast without breaking things by building on solid architecture.",
    details: "Velocity isn't just about moving fast; it's about efficient progress toward a goal. It involves rapid prototyping, iterative development, and a bias toward action. However, true velocity is only possible when built on a solid foundation. You can't run fast if you're constantly tripping over technical debt. My approach balances development speed with structural integrity.",
    principles: [
      "Rapid iteration and feedback loops",
      "Efficient workflows and automation",
      "Prioritizing the most impactful features first"
    ],
    tags: ["Speed", "Efficiency", "Agility"]
  },
  {
    id: "ph4",
    title: "ADAPTABILITY",
    subtitle: "The Flow",
    icon: RefreshCw,
    color: "#3b82f6",
    description: "The only constant is change. Thriving in ambiguity and pivoting strategies as technology evolves.",
    details: "In the rapidly evolving digital landscape, the ability to pivot is essential. Adaptability means being comfortable with ambiguity and having the flexibility to change course when new information arise. It's about 'learning how to learn' and staying ahead of the curve. I build systems—and mindsets—that are designed to evolve.",
    principles: [
      "Embracing new tools and methodologies",
      "Thriving in ambiguous or changing environments",
      "Designing flexible and modular systems"
    ],
    tags: ["Flexibility", "Growth", "Evolution"]
  },
  {
    id: "ph5",
    title: "IMPACT",
    subtitle: "The Purpose",
    icon: Heart,
    color: "#ec4899",
    description: "Building for people, not just screens. Creating solutions that solve real problems and elevate the human experience.",
    details: "Design and code are just tools—Impact is the result. Every digital experience should serve a purpose and provide value to the user. I believe in empathetic design that understands user needs and emotional journeys. My goal is to create products that don't just look pretty but meaningfully improve the lives of those who use them.",
    principles: [
      "Empathetic, user-centered design processes",
      "Solving real-world problems through technology",
      "Measuring success by the value delivered to humans"
    ],
    tags: ["Empathy", "User-Centric", "Value"]
  },
  {
    id: "ph6",
    title: "STRUCTURE",
    subtitle: "The Framework",
    icon: Layers,
    color: "#10b981",
    description: "Scalable systems are beautiful systems. Writing clean, maintainable code that stands the test of time.",
    details: "Structure provides the foundation for growth. It's about creating logical frameworks, clear hierarchies, and maintainable architectures. A well-structured project is easy to understand, simple to extend, and resilient to bugs. I advocate for organized thinking and systematic approaches to complex problems, ensuring that beauty goes bone-deep.",
    principles: [
      "Designing for scalability and future growth",
      "Clear information architecture and hierarchy",
      "Implementing consistent design systems and patterns"
    ],
    tags: ["Scalability", "Order", "Logic"]
  }
];

const PhilosophyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [philosophy, setPhilosophy] = useState(null);

  useEffect(() => {
    const found = philosophies.find(p => p.id === id);
    if (found) {
      setPhilosophy(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!philosophy) return null;

  const Icon = philosophy.icon;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-color)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Glow */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 80% 20%, ${philosophy.color}10 0%, transparent 60%)`,
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '20px 5%'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.button
            whileHover={{ x: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            <ArrowLeft size={20} color={philosophy.color} />
            BACK TO HOME
          </motion.button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            padding: '8px 20px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '100px',
            border: `1px solid ${philosophy.color}33`
          }}>
            <Icon size={18} color={philosophy.color} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
              PILLAR 0{philosophy.id.slice(-1)}
            </span>
          </div>
        </div>
      </motion.nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 5%', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ marginBottom: '100px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '24px',
              background: `${philosophy.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              border: `1px solid ${philosophy.color}33`,
              boxShadow: `0 20px 40px ${philosophy.color}11`
            }}
          >
            <Icon size={48} color={philosophy.color} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              fontFamily: "'Cinzel', serif",
              marginBottom: '20px',
              color: 'white',
              position: 'relative'
            }}
          >
            {philosophy.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '8px',
              color: philosophy.color,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <div style={{ width: '40px', height: '1.5px', background: philosophy.color }}></div>
            {philosophy.subtitle}
          </motion.div>
        </div>

        {/* Content Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Detailed Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Sparkles size={28} color={philosophy.color} />
              The Mandate
            </h2>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
              {philosophy.details}
            </p>

            <div style={{ display: 'flex', gap: '15px' }}>
              {philosophy.tags.map(tag => (
                <span key={tag} style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'white'
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Core Principles Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              background: 'var(--card-bg)',
              border: `1px solid ${philosophy.color}22`,
              borderRadius: '40px',
              padding: '60px',
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
              background: philosophy.color,
              filter: 'blur(100px)',
              opacity: 0.1
            }} />

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '35px', color: 'white', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Target size={24} color={philosophy.color} />
              EXECUTIVE <br />PRINCIPLES
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {philosophy.principles.map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: philosophy.color,
                    marginTop: '10px',
                    flexShrink: 0
                  }} />
                  <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Motivational Quote Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            marginTop: '120px',
            padding: '100px 5%',
            borderRadius: '40px',
            background: `linear-gradient(135deg, rgba(255,255,255,0.02), ${philosophy.color}08)`,
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '5rem', fontWeight: 900, color: philosophy.color, opacity: 0.1, position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Cinzel', serif" }}>
            MANTRA
          </div>
          <p style={{
            fontSize: '2rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'white',
            lineHeight: 1.5,
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            "Progress is impossible without change, and those who cannot change their minds cannot change anything."
          </p>
        </motion.div>

      </main>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 1.5fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 3rem !important;
          }
          div[style*="padding: 100px 5%"] {
            padding: 60px 20px !important;
          }
          p[style*="font-size: 2rem"] {
            font-size: 1.4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhilosophyDetailPage;
