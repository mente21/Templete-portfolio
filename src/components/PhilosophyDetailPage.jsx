import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Coffee, PenTool, Sparkles, Heart, Feather, ChevronRight, Target } from 'lucide-react';

const philosophies = [
  {
    id: "ph1",
    title: "LIVABLE",
    subtitle: "Simplicity in Ritual",
    icon: Coffee,
    color: "#D4A373",
    description: "Life isn't meant to be 'worked' through; it's meant to be lived. Finding peace in the daily ritual of coffee and the quiet of the morning.",
    details: "The core of my philosophy is the transition from 'workable' to 'livable'. We often trap ourselves in productivity loops, forgetting that the most profound moments happen in the spaces between tasks. For me, the traditional Ethiopian coffee ceremony is a grounding ritual—a reminder that time is a gift to be enjoyed, not just spent. It's about movement, rest, and finding peace in the everyday.",
    principles: [
      "Prioritize rest over optimization",
      "Find grounding in small rituals",
      "Celebrate the art of slow living"
    ],
    tags: ["Peace", "Simplicity", "Ritual"],
    imageUrl: "/dominique/coffee_1.png"
  },
  {
    id: "ph2",
    title: "ROOTS",
    subtitle: "The Ethiopian Soul",
    icon: Heart,
    color: "#E9967A",
    description: "Honoring my heritage across borders. Bringing the warmth of my roots to everything I share.",
    details: "Heritage is the thread that connects who we were with who we are becoming. Being Ethiopian-born has shaped my perspective on hospitality, friendship, and resilience. Whether I'm sharing traditional food or reflecting on my journey in New Zealand, my culture is the heartbeat of my content. It's about bridging worlds through storytelling and authentic connection.",
    principles: [
      "Honor history and heritage",
      "Build bridges through culture",
      "Lead with hospitality and warmth"
    ],
    tags: ["Heritage", "Identity", "Connection"],
    imageUrl: "/dominique/traditional_coffee_cup.png"
  },
  {
    id: "ph3",
    title: "JOY",
    subtitle: "Strength in Beauty",
    icon: Sparkles,
    color: "#a855f7",
    description: "Choosing joy isn't a denial of struggle; it's the ultimate act of defiance against a diagnosis.",
    details: "In the face of Stage 4 cancer, joy becomes my most powerful tool. It's not about being 'happy' all the time, but about recognizing beauty even in the hardest seasons. From the flowers in my room to the music that moves me, I choose to focus on what is good. This resilience turns a battle into a legacy of hope.",
    principles: [
      "Search for beauty in the dark",
      "Choose hope as a daily practice",
      "Redefine strength through vulnerability"
    ],
    tags: ["Resilience", "Hope", "Beauty"],
    imageUrl: "/dominique/abstract_art.png"
  },
  {
    id: "ph4",
    title: "STILLNESS",
    subtitle: "Movement & Rest",
    icon: Feather,
    color: "#10b981",
    description: "Listening to the body's rhythm. Balancing the rush of the world with the quiet of the inner self.",
    details: "My studies in psychology have taught me the deep importance of the mind-body connection. Stillness isn't just about 'not moving'; it's about active rest and mental clarity. It's knowing when to pick and when to pause. In my life, this means mindful movement, deep rest, and the silence required to truly 'know ourselves'.",
    principles: [
      "Honor the body's need for rest",
      "Cultivate mental stillness",
      "Balance movement with reflection"
    ],
    tags: ["Mindfulness", "Rest", "Psychology"],
    imageUrl: "/dominique/interior_flowers.png"
  },
  {
    id: "ph5",
    title: "FEAST",
    subtitle: "Food for the Spirit",
    icon: Heart, // Placeholder
    color: "#ef4444",
    description: "Food is more than fuel; it's a celebration of life, family, and the abundance of the Earth.",
    details: "I believe that how we nourish ourselves reflects how we value our lives. From a simple breakfast to a shared feast of Tibs, food is a language of love. It brings people together, heals the spirit, and anchors us in the present moment. Cooking and eating are sacred acts of celebration.",
    principles: [
      "Celebrate life through food",
      "Nourish the body with intention",
      "Create space for shared meals"
    ],
    tags: ["Food", "Nourishment", "Celebration"],
    imageUrl: "/dominique/pancakes.png"
  },
  {
    id: "ph6",
    title: "LEGACY",
    subtitle: "The Advocate's Heart",
    icon: PenTool,
    color: "#3b82f6",
    description: "Turning a personal journey into public awareness. Building a seat at the table for survivors.",
    details: "Advocacy is about turning pain into purpose. Through my TikTok community and my public sharing, I aim to reach those who feel alone in their medical battles. My story isn't just mine—it's a tool for education, a voice for the unheard, and a testament to the power of shared human experience.",
    principles: [
      "Share the raw, honest truth",
      "Advocate for self-awareness",
      "Build a community of support"
    ],
    tags: ["Advocacy", "Storytelling", "Legacy"],
    imageUrl: "/dominique/desk_office.png"
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
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: window.innerWidth > 768 ? '1.2fr 1fr' : '1fr', 
          gap: '60px', 
          alignItems: 'center',
          marginBottom: '100px' 
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
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
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                fontFamily: "'Cinzel', serif",
                marginBottom: '20px',
                color: 'white'
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              width: '100%',
              height: '500px',
              borderRadius: '40px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: `0 40px 80px -20px rgba(0,0,0,0.6)`,
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <img 
              src={philosophy.imageUrl} 
              alt={philosophy.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to top, rgba(0,0,0,0.6), transparent)`
            }} />
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
