import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Mic, Palette, Heart, Globe, Book, 
  Music, Coffee, Plane, Users, Award, Star,
  Dumbbell, Briefcase, Lightbulb, Target, X, ArrowRight
} from 'lucide-react';

const iconMap = {
  camera: Camera,
  photography: Camera,
  mic: Mic,
  speaking: Mic,
  palette: Palette,
  art: Palette,
  creative: Palette,
  heart: Heart,
  volunteer: Heart,
  globe: Globe,
  travel: Globe,
  book: Book,
  reading: Book,
  music: Music,
  coffee: Coffee,
  cooking: Coffee,
  plane: Plane,
  adventure: Plane,
  users: Users,
  networking: Users,
  social: Users,
  award: Award,
  achievement: Award,
  star: Star,
  fitness: Dumbbell,
  sports: Dumbbell,
  business: Briefcase,
  professional: Briefcase,
  lightbulb: Lightbulb,
  innovation: Lightbulb,
  target: Target,
  goals: Target
};

const SkillsInterests = ({ skills = [] }) => {
  const categories = ['All', ...new Set(skills.map(s => s.category).filter(Boolean))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName?.toLowerCase()] || Star;
    return Icon;
  };

  return (
    <>
      <section id="skills" style={{ 
        borderTop: '1px solid var(--border-color)', 
        background: 'var(--bg-color)', 
        padding: '120px 10%', 
        transition: 'background 0.5s ease',
        position: 'relative'
      }}>
        <div className="section-header-premium" style={{ marginBottom: '60px' }}>

          <h2 className="section-title-premium">
            <span className="section-title-accent">SKILLS</span> 
            <span className="section-title-stroke">& INTERESTS</span>
          </h2>
          <p style={{
            maxWidth: '700px',
            margin: '20px auto 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.6,
            fontFamily: "'Manrope', sans-serif"
          }}>
            A curated set of technical proficiencies and creative passions that drive my work. Constantly evolving, always learning.
          </p>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center', 
            marginBottom: '60px',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1
          }}>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 30px',
                  background: activeCategory === category 
                    ? 'var(--accent-primary)' 
                    : 'rgba(255,255,255,0.03)',
                  color: activeCategory === category 
                    ? 'black' 
                    : 'var(--text-primary)',
                  border: `1px solid ${activeCategory === category ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  borderRadius: '100px',
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        )}

        {/* Skills Grid - Clean Minimal Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          position: 'relative',
          zIndex: 1
        }}>
          {filteredSkills.map((skill, idx) => {
            const Icon = getIcon(skill.icon);
            const iconColor = skill.color || '#8B5CF6';
            
            return (
              <motion.div
                key={skill.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                onClick={() => setSelectedSkill(skill)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                {/* Icon with gradient background */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '18px',
                  background: `linear-gradient(135deg, ${iconColor}, ${iconColor}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '25px',
                  boxShadow: `0 10px 30px ${iconColor}33`
                }}>
                  <Icon size={32} color="white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.3rem',
                  fontFamily: "'Anton', sans-serif",
                  color: '#1a1a1a',
                  marginBottom: '15px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  {skill.name || skill.title}
                </h3>

                {/* Proficiency */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px',
                  width: '100%',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: iconColor,
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase'
                  }}>
                    PROFICIENCY
                  </span>
                  <span style={{
                    fontSize: '1.1rem',
                    color: '#1a1a1a',
                    fontFamily: "'Anton', sans-serif",
                    fontWeight: 700
                  }}>
                    {skill.level || 85}%
                  </span>
                </div>

                {/* Click for details */}
                <div style={{
                  fontSize: '0.8rem',
                  color: iconColor,
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: 'auto'
                }}>
                  CLICK FOR DETAILS <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '100px 20px',
            color: 'var(--text-secondary)',
            position: 'relative',
            zIndex: 1
          }}>
            <p style={{ fontSize: '1.2rem', fontFamily: "'Manrope', sans-serif" }}>
              No skills in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                zIndex: 2000,
                cursor: 'zoom-out'
              }}
            />
            
            <div style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2001,
              pointerEvents: 'none',
              padding: '40px'
            }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                style={{
                  width: 'min(700px, 95vw)',
                  maxHeight: '85vh',
                  background: 'white',
                  borderRadius: '40px',
                  padding: '50px',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.3)',
                  overflow: 'auto',
                  pointerEvents: 'auto',
                  position: 'relative'
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedSkill(null)}
                  style={{
                    position: 'absolute',
                    top: '25px',
                    right: '25px',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a1a',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#e5e5e5'}
                  onMouseLeave={(e) => e.target.style.background = '#f5f5f5'}
                >
                  <X size={24} />
                </button>

                {/* Icon */}
                {(() => {
                  const Icon = getIcon(selectedSkill.icon);
                  return (
                    <div style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '22px',
                      background: `linear-gradient(135deg, ${selectedSkill.color || '#8B5CF6'}, ${selectedSkill.color || '#8B5CF6'}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '30px',
                      boxShadow: `0 15px 40px ${selectedSkill.color || '#8B5CF6'}33`
                    }}>
                      <Icon size={45} color="white" strokeWidth={2} />
                    </div>
                  );
                })()}

                {/* Category Badge */}
                {selectedSkill.category && (
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    background: `${selectedSkill.color || '#8B5CF6'}15`,
                    color: selectedSkill.color || '#8B5CF6',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    fontFamily: "'Oswald', sans-serif",
                    marginBottom: '20px'
                  }}>
                    {selectedSkill.category}
                  </div>
                )}

                {/* Title */}
                <h2 style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3rem)', 
                  fontFamily: 'Anton', 
                  color: '#1a1a1a', 
                  lineHeight: 1.1, 
                  marginBottom: '20px', 
                  letterSpacing: '1px', 
                  textTransform: 'uppercase' 
                }}>
                  {selectedSkill.name || selectedSkill.title}
                </h2>

                <div style={{ width: '60px', height: '4px', background: selectedSkill.color || '#8B5CF6', marginBottom: '30px' }}></div>

                {/* Full Description */}
                <p style={{ 
                  fontSize: '1.05rem', 
                  color: '#666', 
                  lineHeight: 1.8, 
                  marginBottom: '30px', 
                  fontFamily: "'Manrope', sans-serif", 
                  fontWeight: 400,
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedSkill.description || selectedSkill.desc}
                </p>

                {/* Proficiency Level */}
                {selectedSkill.level && (
                  <div style={{ 
                    padding: '25px', 
                    background: '#f8f8f8', 
                    borderRadius: '20px',
                    marginBottom: '20px'
                  }}>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: selectedSkill.color || '#8B5CF6', 
                      fontFamily: "'Oswald', sans-serif", 
                      fontWeight: 700, 
                      letterSpacing: '2px', 
                      marginBottom: '12px', 
                      textTransform: 'uppercase' 
                    }}>
                      PROFICIENCY LEVEL
                    </div>
                    <div style={{ 
                      fontSize: '2.5rem', 
                      color: '#1a1a1a', 
                      fontWeight: 700,
                      fontFamily: "'Anton', sans-serif",
                      marginBottom: '15px'
                    }}>
                      {selectedSkill.level}%
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      background: '#e5e5e5',
                      borderRadius: '100px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${selectedSkill.level}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${selectedSkill.color || '#8B5CF6'}, ${selectedSkill.color || '#8B5CF6'}dd)`,
                        borderRadius: '100px',
                        transition: 'width 1s ease'
                      }} />
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedSkill.tags && selectedSkill.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginTop: '30px'
                  }}>
                    {selectedSkill.tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '10px 20px',
                          background: '#f5f5f5',
                          borderRadius: '100px',
                          fontSize: '0.85rem',
                          color: '#666',
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          #skills {
            padding: 80px 5% !important;
          }
        }
      `}</style>
    </>
  );
};

export default SkillsInterests;
