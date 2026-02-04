import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb, PenTool, Zap, RefreshCw, Heart, Layers, ArrowUpRight, Scale, Anchor, Target, Palette, Feather, Coffee, Sparkles, Utensils
} from 'lucide-react';

const philosophies = [
  {
    id: "ph1",
    title: "LIVABLE",
    subtitle: "Simplicity in Ritual",
    icon: Coffee,
    color: "#D4A373",
    description: "Life isn't meant to be 'worked' through; it's meant to be lived. Finding peace in the daily ritual of coffee.",
    tags: ["Peace", "Simplicity", "Ritual"],
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000"
  },
  {
    id: "ph2",
    title: "ROOTS",
    subtitle: "The Ethiopian Soul",
    icon: Heart,
    color: "#E9967A",
    description: "Honoring my heritage across borders. Bringing the warmth of my roots to everything I share.",
    tags: ["Heritage", "Identity", "Connection"],
    imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2000"
  },
  {
    id: "ph3",
    title: "JOY",
    subtitle: "Strength in Beauty",
    icon: Sparkles,
    color: "#a855f7",
    description: "Choosing joy isn't a denial of struggle; it's the ultimate act of defiance against a diagnosis.",
    tags: ["Resilience", "Hope", "Beauty"],
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000"
  },
  {
    id: "ph4",
    title: "STILLNESS",
    subtitle: "Movement & Rest",
    icon: Feather,
    color: "#10b981",
    description: "Listening to the body's rhythm. Balancing the rush of the world with the quiet of the inner self.",
    tags: ["Mindfulness", "Rest", "Psychology"],
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000"
  },
  {
    id: "ph5",
    title: "FEAST",
    subtitle: "Food for the Spirit",
    icon: Utensils,
    color: "#ef4444",
    description: "Food is more than fuel; it's a celebration of life, family, and the abundance of the Earth.",
    tags: ["Food", "Nourishment", "Celebration"],
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000"
  },
  {
    id: "ph6",
    title: "LEGACY",
    subtitle: "The Advocate's Heart",
    icon: PenTool,
    color: "#3b82f6",
    description: "Turning a personal journey into public awareness. Building a seat at the table for survivors.",
    tags: ["Advocacy", "Storytelling", "Legacy"],
    imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000"
  }
];

const SkillsInterests = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="philosophy" style={{
      padding: '120px 5%',
      background: 'var(--bg-color)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03) 0%, transparent 40%)',
        zIndex: 0
      }} />

      <div className="section-header-premium" style={{ marginBottom: '100px', position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '1000px', margin: '0 auto 80px' }}>

        {/* Decorative Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '15rem',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.02)',
          fontFamily: "'Playfair Display', serif", // More elegant font
          zIndex: -1,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          06
        </div>

        {/* Left Decorative Group */}
        <div style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '20px', opacity: 0.4, paddingLeft: '40px' }} className="header-decor-left">
          <div style={{ width: '60px', height: '1px', background: 'var(--accent-primary)' }}></div>
          <Palette size={24} color="var(--accent-primary)" />
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', color: 'var(--accent-primary)', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px' }}>ARTISTRY</div>
        </div>

        {/* Right Decorative Group */}
        <div style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '20px', opacity: 0.4, paddingRight: '40px' }} className="header-decor-right">
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', color: 'var(--accent-secondary)', writingMode: 'vertical-rl', letterSpacing: '2px' }}>DESIGN</div>
          <Feather size={24} color="var(--accent-secondary)" />
          <div style={{ width: '60px', height: '1px', background: 'var(--accent-secondary)' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'inline-block', padding: '8px 24px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '25px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(5px)' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
            The Code
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-secondary)' }}></span>
          </span>
        </motion.div>

        <h2 className="section-title-premium" style={{ position: 'relative', display: 'inline-block' }}>
          <span className="section-title-accent">MY</span>
          <span className="section-title-stroke"> PHILOSOPHY</span>
          {/* Subtle glow behind title */}
          <div style={{ position: 'absolute', inset: '-20px', background: 'var(--accent-primary)', filter: 'blur(50px)', zIndex: -1, opacity: 0.15 }}></div>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {philosophies.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`/philosophy/${item.id}`);
              }}
              style={{
                position: 'relative',
                background: '#0a0a0a',
                border: `1px solid ${isHovered ? item.color : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '24px',
                padding: '40px',
                height: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                boxShadow: isHovered ? `0 30px 60px -15px ${item.color}33` : 'none'
              }}
            >
              {/* Card Image Background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                opacity: isHovered ? 0.4 : 0.2,
                transition: 'opacity 0.4s ease'
              }}>
                <img 
                  src={philosophies[idx].imageUrl || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000"} 
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(50%)' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, #0a0a0a 20%, transparent 100%)`
                }} />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '30px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: isHovered ? item.color : 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    color: isHovered ? '#000' : item.color
                  }}>
                    <Icon size={24} />
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.3)',
                    fontWeight: 700
                  }}>
                    0{idx + 1}
                  </div>
                </div>

                <h3 style={{
                  fontSize: '2rem',
                  fontFamily: "'Cinzel', serif",
                  color: 'white',
                  marginBottom: '10px'
                }}>
                  {item.title}
                </h3>

                <div style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: item.color,
                  fontWeight: 700,
                  marginBottom: '20px',
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {item.subtitle}
                </div>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: '20px',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}>
                  {item.description}
                </p>

                <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '0.75rem',
                      color: isHovered ? '#fff' : 'rgba(255,255,255,0.4)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                      transition: 'color 0.3s ease'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
            #philosophy {
                padding: 80px 5% !important;
            }
            .section-title-premium {
                font-size: 2rem !important;
            }
            .header-decor-left, .header-decor-right {
                display: none !important;
            }
        }
      `}</style>
    </section>
  );
};

export default SkillsInterests;
