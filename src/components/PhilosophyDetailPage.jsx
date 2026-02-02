import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Scale, Moon, Sun, Wind, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mainImg from '../assets/philosophy_images/main.jpg';
import thumb1 from '../assets/philosophy_images/thumb1.jpg';
import thumb2 from '../assets/philosophy_images/thumb2.jpg';
import detailImg from '../assets/philosophy_images/detail.jpg';
import footerImg from '../assets/philosophy_images/footer_new.jpg';

const PhilosophyDetailPage = () => {
    const navigate = useNavigate();

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
                    PHILOSOPHY / ESSENCE
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
                        letterSpacing: '2px'
                    }}>
                        Philosophy
                    </h1>
                    <p style={{
                        color: '#10b981',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        The Art of Essentialism
                    </p>
                </div>

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

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
                            <button style={{
                                flex: 1,
                                padding: '18px',
                                background: 'white',
                                color: 'black',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>
                                Read Manifesto
                            </button>
                            <button style={{
                                padding: '18px 40px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                cursor: 'pointer'
                            }}>
                                Share
                            </button>
                        </div>

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

                {/* SECTION 3: "You May Also Like" Grid (Passions) */}
                <div style={{ marginBottom: '150px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '60px',
                        fontSize: '1.5rem'
                    }}>
                        VALUES
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        {/* Card 1 */}
                        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Moon size={64} color="#10b981" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Silence</span>
                                <span style={{ opacity: 0.5 }}>clarity</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Reducing visual and cognitive noise.</div>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>Meditate</button>
                        </div>

                        {/* Card 2 */}
                        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Scale size={64} color="#06b6d4" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Balance</span>
                                <span style={{ opacity: 0.5 }}>structure</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Harmony between form and function.</div>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>Weigh</button>
                        </div>

                        {/* Card 3 */}
                        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Wind size={64} color="#8b5cf6" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Flow</span>
                                <span style={{ opacity: 0.5 }}>motion</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Designing for fluid user states.</div>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: 'none',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>Flow</button>
                        </div>
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
        @media (max-width: 1024px) {
           div[style*="grid-template-columns: 1fr 1fr"] {
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
