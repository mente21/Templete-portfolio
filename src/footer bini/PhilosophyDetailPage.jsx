import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, Heart, Sparkles, Feather, Utensils, PenTool, BookOpen, Scale, Moon, Sun, Wind, Circle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import mainImg from './assets/footer assets/philosophy_images/main.jpg';
import thumb1 from './assets/footer assets/philosophy_images/thumb1.jpg';
import thumb2 from './assets/footer assets/philosophy_images/thumb2.jpg';
import detailImg from './assets/footer assets/philosophy_images/detail.jpg';
import footerImg from './assets/footer assets/philosophy_images/footer_new.jpg';

const philosophies = [
  {
    id: "ph1",
    title: "LIVABLE",
    subtitle: "Simplicity in Ritual",
    icon: Coffee,
    color: "#D4A373",
    description: "Life isn't meant to be 'worked' through; it's meant to be lived. Finding peace in the daily ritual of coffee and the quiet of the morning.",
    tags: ["Peace", "Simplicity", "Ritual"],
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000",
    longDesc: "The core of my philosophy is the transition from 'workable' to 'livable'. We often trap ourselves in productivity loops, forgetting that the most profound moments happen in the spaces between tasks. For me, the traditional Ethiopian coffee ceremony is a grounding ritual—a reminder that time is a gift to be enjoyed, not just spent. It's about movement, rest, and finding peace in the everyday."
  },
  {
    id: "ph2",
    title: "ROOTS",
    subtitle: "The Ethiopian Soul",
    icon: Heart,
    color: "#E9967A",
    description: "Honoring my heritage across borders. Bringing the warmth of my roots to everything I share.",
    tags: ["Heritage", "Identity", "Connection"],
    imageUrl: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2000",
    longDesc: "Heritage is the thread that connects who we were with who we are becoming. Being Ethiopian-born has shaped my perspective on hospitality, friendship, and resilience. Whether I'm sharing traditional food or reflecting on my journey in New Zealand, my culture is the heartbeat of my content. It's about bridging worlds through storytelling and authentic connection."
  },
  {
    id: "ph3",
    title: "JOY",
    subtitle: "Strength in Beauty",
    icon: Sparkles,
    color: "#a855f7",
    description: "Choosing joy isn't a denial of struggle; it's the ultimate act of defiance against a diagnosis.",
    tags: ["Resilience", "Hope", "Beauty"],
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000",
    longDesc: "In the face of Stage 4 cancer, joy becomes my most powerful tool. It's not about being 'happy' all the time, but about recognizing beauty even in the hardest seasons. From the flowers in my room to the music that moves me, I choose to focus on what is good. This resilience turns a battle into a legacy of hope."
  },
  {
    id: "ph4",
    title: "STILLNESS",
    subtitle: "Movement & Rest",
    icon: Feather,
    color: "#10b981",
    description: "Listening to the body's rhythm. Balancing the rush of the world with the quiet of the inner self.",
    tags: ["Mindfulness", "Rest", "Psychology"],
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000",
    longDesc: "My studies in psychology have taught me the deep importance of the mind-body connection. Stillness isn't just about 'not moving'; it's about active rest and mental clarity. It's knowing when to pick and when to pause. In my life, this means mindful movement, deep rest, and the silence required to truly 'know ourselves'."
  },
  {
    id: "ph5",
    title: "FEAST",
    subtitle: "Food for the Spirit",
    icon: Utensils,
    color: "#ef4444",
    description: "Food is more than fuel; it's a celebration of life, family, and the abundance of the Earth.",
    tags: ["Food", "Nourishment", "Celebration"],
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000",
    longDesc: "I believe that how we nourish ourselves reflects how we value our lives. From a simple breakfast to a shared feast of Tibs, food is a language of love. It brings people together, heals the spirit, and anchors us in the present moment. Cooking and eating are sacred acts of celebration."
  },
  {
    id: "ph6",
    title: "LEGACY",
    subtitle: "The Advocate's Heart",
    icon: PenTool,
    color: "#3b82f6",
    description: "Turning a personal journey into public awareness. Building a seat at the table for survivors.",
    tags: ["Advocacy", "Storytelling", "Legacy"],
    imageUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2000",
    longDesc: "Advocacy is about turning pain into purpose. Through my TikTok community and my public sharing, I aim to reach those who feel alone in their medical battles. My story isn't just mine—it's a tool for education, a voice for the unheard, and a testament to the power of shared human experience."
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
                                    overflow: 'hidden',
                                    borderRadius: '24px'
                                }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000"
                                        alt="Traditional Coffee"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                {/* Thumbnails */}
                                <div className="thumbnails-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                        <img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                        <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: Detailed Info */}
                            <div style={{ paddingTop: '20px' }}>
                                <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                                    The Livable Life
                                </h2>
                                <div style={{
                                    fontSize: '1.5rem',
                                    color: '#D4A373',
                                    marginBottom: '40px',
                                    fontFamily: "'JetBrains Mono', monospace"
                                }}>
                                    Livable, Not Workable <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>dominique mcshain</span>
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '40px'
                                }}>
                                    My content isn't a project; it's a life. It's about 'knowing ourselves', food, movement, rest, and peace. It's the music we hear, the fashion we wear, the coffee we drink, and the goals we chase. It's knowledge, beauty, and friendship—woven into a story that is raw and real.
                                </p>

                                {/* Specs */}
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Roots</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Ethiopian-born, Psychology Student</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Philosophy</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Livable Life, Resilience, Joy</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                        <span style={{ fontWeight: 600 }}>Advocacy</span>
                                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Colorectal Cancer Patient & Storyteller</span>
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
                                border: `1px solid rgba(255,255,255,0.1)`
                            }}>
                                <img 
                                    src={activePhilosophy.imageUrl} 
                                    alt={activePhilosophy.title} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `linear-gradient(to top, rgba(0,0,0,0.6), transparent)`
                                }}></div>
                                <div style={{
                                    position: 'absolute', top: '30px', right: '30px',
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${activePhilosophy.color}40`
                                }}>
                                    <activePhilosophy.icon size={30} color={activePhilosophy.color} />
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
