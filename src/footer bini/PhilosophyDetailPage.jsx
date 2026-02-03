import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Scale, Moon, Sun, Wind, Circle, Lightbulb, PenTool, Zap, RefreshCw, Heart, Layers } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import mainImg from './assets/footer assets/philosophy_images/main.jpg';
import thumb1 from './assets/footer assets/philosophy_images/thumb1.jpg';
import thumb2 from './assets/footer assets/philosophy_images/thumb2.jpg';
import detailImg from './assets/footer assets/philosophy_images/detail.jpg';
import footerImg from './assets/footer assets/philosophy_images/footer_new.jpg';

const philosophies = [
  {
    id: "ph1",
    title: "VISION",
    subtitle: "The North Star",
    icon: Lightbulb,
    color: "#facc15", // Yellow
    description: "Seeing beyond the immediate horizon. It's not just about what we build today, but how it shapes the future. Vision is the art of seeing the invisible.",
    tags: ["Foresight", "Innovation", "Clarity"],
    longDesc: "Vision is not just about having an idea; it's about having a clear mental picture of the destination before the journey begins. In product design, this means anticipating user needs before they are articulated and understanding the ripple effects of every design decision. true vision requires the courage to pursue paths that others might not yet see."
  },
  {
    id: "ph2",
    title: "CRAFT",
    subtitle: "The Foundation",
    icon: PenTool,
    color: "#a855f7", // Purple
    description: "Merging logic with aesthetics. Every line of code and every pixel is placed with intentionality and precision. Craft is the visible manifestation of care.",
    tags: ["Precision", "Artistry", "Quality"],
    longDesc: "Craftsmanship is the bridge between the utility of engineering and the beauty of art. It's about refusing to compromise on the details that 'no one will notice' because you know that collectively, those details create the soul of the product. It is the relentless pursuit of excellence in both the visible UI and the invisible code structure."
  },
  {
    id: "ph3",
    title: "VELOCITY",
    subtitle: "The Momentum",
    icon: Zap,
    color: "#ef4444", // Red
    description: "Speed matters, but direction matters more. Moving fast without breaking things by building on solid architecture.",
    tags: ["Speed", "Efficiency", "Agility"],
    longDesc: "Velocity is often mistaken for speed, but velocity is a vector: it has both speed and direction. In startup culture, 'move fast and break things' has become a cliché. My philosophy is 'move fast and build things that last.' This requires a robust architectural foundation that allows for rapid iteration without the accumulation of crushing technical debt."
  },
  {
    id: "ph4",
    title: "ADAPTABILITY",
    subtitle: "The Flow",
    icon: RefreshCw,
    color: "#3b82f6", // Blue
    description: "The only constant is change. Thriving in ambiguity and pivoting strategies as technology evolves.",
    tags: ["Flexibility", "Growth", "Evolution"],
    longDesc: "Darwin said it's not the strongest who survive, but the most adaptable. In the digital landscape, tools, frameworks, and user behaviors change overnight. Adaptability is about building systems—both mental and digital—that are loosely coupled and highly cohesive, ready to reconfigure themselves when the environment shifts."
  },
  {
    id: "ph5",
    title: "IMPACT",
    subtitle: "The Purpose",
    icon: Heart,
    color: "#ec4899", // Pink
    description: "Building for people, not just screens. Creating solutions that solve real problems and elevate the human experience.",
    tags: ["Empathy", "User-Centric", "Value"],
    longDesc: "Technology is a tool, not a master. The ultimate measure of any digital product is the impact it has on the human on the other side of the screen. Does it save them time? Does it bring them joy? Does it solve a painful problem? Impact-driven design starts with empathy and ends with measurable value."
  },
  {
    id: "ph6",
    title: "STRUCTURE",
    subtitle: "The Framework",
    icon: Layers,
    color: "#10b981", // Emerald
    description: "Scalable systems are beautiful systems. Writing clean, maintainable code that stands the test of time.",
    tags: ["Scalability", "Order", "Logic"],
    longDesc: "Entropy is the natural state of the universe; structure is our defiance of it. Good code structure is not just for computers; it's for the humans who will read, maintain, and extend it in the future. A well-structured codebase is like a well-organized library—everything has a place, and finding what you need feels intuitive."
  }
];

const PhilosophyDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activePhilosophy, setActivePhilosophy] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            const found = philosophies.find(p => p.id === id);
            setActivePhilosophy(found || null);
        } else {
            setActivePhilosophy(null);
        }
    }, [id]);

    const isDefaultView = !activePhilosophy;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            paddingBottom: '100px'
        }}>
            {/* Navigation */}
            <nav style={{
                padding: '30px 50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    <ArrowLeft size={18} /> Home
                </button>
                <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.5)'
                }}>
                    PHILOSOPHY / {activePhilosophy ? activePhilosophy.title : 'ESSENCE'}
                </div>
                <div style={{ width: '80px' }}></div> {/* Spacer */}
            </nav>

            {/* Main Container */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>

                {/* Page Title */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{
                        fontFamily: "'Abril Fatface', serif",
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        color: activePhilosophy ? activePhilosophy.color : 'white'
                    }}>
                        {activePhilosophy ? activePhilosophy.title : 'Philosophy'}
                    </h1>
                    <p style={{
                        color: activePhilosophy ? 'rgba(255,255,255,0.8)' : '#10b981',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600,
                        fontSize: '1.2rem'
                    }}>
                        {activePhilosophy ? activePhilosophy.subtitle : 'The Art of Essentialism'}
                    </p>
                </div>

                {isDefaultView ? (
                    // DEFAULT VIEW (Digital Stoicism)
                    <>
                        {/* SECTION 1: Bio & Gallery (Split Layout) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '60px',
                            marginBottom: '120px'
                        }}>
                            {/* LEFT: Image Gallery */}
                            <div>
                                {/* Main Image */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    backgroundColor: '#1a1a1a',
                                    marginBottom: '20px',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={mainImg}
                                        alt="Zen Stone"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                {/* Thumbnails */}
                                <div className="thumbnails-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                        <img src={thumb1} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                        <img src={thumb2} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                        <img src={thumb1} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Detailed Info */}
                            <div style={{ paddingTop: '20px' }}>
                                <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                                    Digital Stoicism
                                </h2>
                                <div style={{
                                    fontSize: '1.5rem',
                                    color: '#10b981',
                                    marginBottom: '40px',
                                    fontFamily: "'JetBrains Mono', monospace"
                                }}>
                                    Less, But Better <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>dieter rams</span>
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '40px'
                                }}>
                                    In an age of infinite noise, clarity is an act of rebellion. My philosophy is rooted in subtraction. I believe that good design is not about what you add, but what you take away. Every pixel, every line of code, and every interaction must fight for its right to exist. If it doesn't serve a purpose, it is clutter.
                                </p>

                                {/* Specs */}
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Influences</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Bauhaus, Wabi-Sabi, Minimalism</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Core Value</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Sustainability & Timelessness</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Practices</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Meditation, Deep Work, Journaling</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: Deep Dive (Text Left / Image Right) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '80px',
                            marginBottom: '150px',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Abril Fatface', serif" }}>
                                    The Void
                                </h3>

                                <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <p>
                                        Negative space is not empty space; it is active space. It is the breath between notes, the pause between thoughts. Without the void, there is no form.
                                    </p>
                                    <p>
                                        <strong>Principle 1: Friction.</strong> We often try to remove all friction from user experiences, but some friction is necessary. It forces us to pause and consider.
                                    </p>
                                    <p>
                                        <strong>Principle 2: Ephemerality.</strong> Digital objects do not age, but they become obsolete. I strive to create designs that age gracefully, avoiding trends that expire in a month.
                                    </p>
                                    <p>
                                        <strong>Principle 3: Humanity.</strong> Technology should serve humans, not enslave them. Dark patterns and addictive mechanics have no place in ethical design.
                                    </p>
                                </div>
                            </div>

                            <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden' }}>
                                <img src={detailImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </>
                ) : (
                    // DYNAMIC VIEW (Specific Philosophy)
                    <div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.2fr',
                            gap: '80px',
                            marginBottom: '120px',
                            alignItems: 'start'
                        }}>
                             <div style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                backgroundColor: '#1a1a1a',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                position: 'relative',
                                border: `2px solid ${activePhilosophy.color}`
                            }}>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `radial-gradient(circle at center, ${activePhilosophy.color}20 0%, transparent 70%)`
                                }}></div>
                                <div style={{
                                    height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {/* Using the Icon as a major visual element since we might not have specific images for each yet */}
                                    <activePhilosophy.icon size={200} color={activePhilosophy.color} strokeWidth={1} />
                                </div>
                            </div>
                            
                            <div style={{ paddingTop: '40px' }}>
                                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                                    {activePhilosophy.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '8px 16px',
                                            borderRadius: '100px',
                                            border: `1px solid ${activePhilosophy.color}40`,
                                            color: activePhilosophy.color,
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h2 style={{ 
                                    fontFamily: "'Inter', sans-serif", 
                                    fontSize: '2rem', 
                                    marginBottom: '30px',
                                    fontWeight: 300,
                                    lineHeight: 1.4
                                }}>
                                    "{activePhilosophy.description}"
                                </h2>

                                <div style={{
                                    width: '100px',
                                    height: '2px',
                                    background: activePhilosophy.color,
                                    marginBottom: '40px'
                                }}></div>

                                <p style={{
                                    fontSize: '1.2rem',
                                    lineHeight: 1.9,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '50px'
                                }}>
                                    {activePhilosophy.longDesc}
                                </p>
                                
                                <button
                                    onClick={() => navigate('/philosophy')} 
                                    style={{
                                    padding: '16px 32px',
                                    background: 'transparent',
                                    border: `1px solid ${activePhilosophy.color}`,
                                    color: activePhilosophy.color,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <ArrowLeft size={18} /> Back to Overview
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* SECTION 3: "You May Also Like" Grid (Passions) - Always Visible */}
                <div style={{ marginBottom: '150px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '100px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '60px',
                        fontSize: '1.5rem',
                        color: 'rgba(255,255,255,0.6)'
                    }}>
                        EXPLORE MORE VALUES
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        {philosophies.slice(0, 3).map((item) => (
                             <div key={item.id} 
                                onClick={() => {
                                    window.scrollTo(0, 0);
                                    navigate(`/philosophy/${item.id}`)
                                }}
                                style={{
                                    background: '#1a1a1a',
                                    padding: '40px',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    border: '1px solid transparent',
                                    transition: 'transform 0.3s'
                                }}
                                className="philosophy-card"
                             >
                                <item.icon size={40} color={item.color} style={{ marginBottom: '20px' }} />
                                <h4 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{item.title}</h4>
                                <p style={{ color: 'rgba(255,255,255,0.6)' }}>{item.subtitle}</p>
                             </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 4: Subscribe/Connect */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', background: '#0f0f0f' }}>
                    <div style={{ padding: '80px' }}>
                        <h3 style={{ fontSize: '2.5rem', fontFamily: "'Abril Fatface', serif", marginBottom: '30px' }}>
                            The Dialogue
                        </h3>
                        <p style={{ opacity: 0.7, marginBottom: '40px', lineHeight: 1.7 }}>
                            Philosophy is a conversation. Join the discourse on ethical design, minimalism, and the future of human-computer interaction.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input
                                type="email"
                                placeholder="thinker@example.com"
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    padding: '15px',
                                    color: 'white',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            />
                            <button style={{
                                padding: '0 30px',
                                background: 'white',
                                border: 'none',
                                color: 'black',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                Engage
                            </button>
                        </div>
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src={footerImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>

            </div>

            <style>{`
        .hover-scale:hover { transform: scale(1.05); }
        .philosophy-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2) !important; }
        @media (max-width: 1024px) {
           div[style*="grid-template-columns: 1fr 1fr"], div[style*="grid-template-columns: 1fr 1.2fr"] {
             grid-template-columns: 1fr !important;
             gap: 60px !important;
           }
        }
        @media (max-width: 768px) {
          .thumbnails-grid {
             display: none !important;
          }
           /* Ensure main image takes full width but respects padding */
           div[style*="padding: 60px 40px"] {
             padding: 40px 20px !important;
           }
        }
      `}</style>
        </div>
    );
};

export default PhilosophyDetailPage;
