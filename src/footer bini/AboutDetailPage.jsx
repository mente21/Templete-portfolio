import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Download, Mail, MapPin, Calendar, Globe, Heart, Palette, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import thumb1 from './assets/footer assets/about_images/thumb1.jpg';
import thumb2 from './assets/footer assets/about_images/thumb2.jpg';
import thumb3 from './assets/footer assets/about_images/thumb3.jpg';
import detailImg from './assets/footer assets/about_images/detail.jpg';
import collabImg from './assets/footer assets/about_images/collab.jpg';
import gallery1 from './assets/footer assets/about_images/gallery1.jpg';
import gallery2 from './assets/footer assets/about_images/gallery2_new.jpg';
import gallery3 from './assets/footer assets/about_images/gallery3.jpg';

const AboutDetailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                padding: 'clamp(15px, 3vw, 30px) clamp(20px, 5vw, 50px)',
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
                    ABOUT / DOMINIQUE
                </div>
                <div style={{ width: '80px' }}></div> {/* Spacer */}
            </nav>

            {/* Main Container */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>

                {/* Page Title */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h1 style={{
                        fontFamily: "'Abril Fatface', serif",
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        lineHeight: 1
                    }}>
                        Dominique
                    </h1>
                    <p style={{
                        color: 'var(--accent-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        Livable, Not Just Workable
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
                                src="/dominique/coffee_2.png"
                                alt="Dominique Portrait"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Detailed Info */}
                    <div style={{ paddingTop: '20px' }}>
                        <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '20px' }}>
                            Advocate & Student
                        </h2>
                        
                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '40px'
                        }}>
                            Dominique is an Ethiopian-born advocate and psychology student dedicated to a "Livable" life. Rather than focusing on professional 'workability', she centers her existence on the beauty of the everyday—from the aroma of coffee to the depth of human connection. Her journey is defined by raw honesty and a mission to turn a personal health battle into a source of public hope.
                        </p>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '40px'
                        }}>
                            "My content isn't a project; it's a life. It's about knowing ourselves, food, movement, rest, and peace. It's the music we hear, the fashion we wear, and the coffee we drink together."
                        </p>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
                            <button onClick={() => navigate('/')} style={{
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
                                Join the Story
                            </button>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ width: '56px', height: '56px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Mail size={20} /></div>
                                <div style={{ width: '56px', height: '56px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Heart size={20} /></div>
                            </div>
                        </div>

                        {/* Specs */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Roots</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Ethiopian-born</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Education</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Psychology (New Zealand)</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Focus</span>
                                <span style={{ color: 'var(--accent-primary)' }}>Advocacy & Living Fully</span>
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
                            The Livable Philosophy
                        </h3>

                        <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <p>
                                Life isn't about finding a "workable" balance; it's about making every element "livable." For Dominique, this means integrating the small joys into the big battles. It's the ritual of coffee, the expression through fashion, and the pursuit of knowledge in psychology.
                            </p>
                            <p>
                                Born in Ethiopia, her culture taught her that community and heritage are the foundation of resilience. This duality — of traditional roots and modern advocacy — defines her voice on TikTok and beyond.
                            </p>
                            <p>
                                <strong>Everyday Pillars:</strong> Food, movement, rest, peace, music, fashion, coffee, and friendship. These are not distractions; they are the heart of her story.
                            </p>
                        </div>
                    </div>

                    <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden' }}>
                        <img src="/dominique/abstract_art.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                        EXPERTISE AREAS
                    </h3>

                    <div className="modal-content-grid" style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))',
                  gap: 'clamp(20px, 5vw, 50px)', height: '100%', overflowY: 'auto', paddingRight: '10px'
                }}>
        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden' }}>
                                <img src={gallery1} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Generative Art</span>
                                <span style={{ opacity: 0.5 }}>code</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Creating visual systems that grow.</div>
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
                            }}>Explore</button>
                        </div>

                        {/* Card 2 */}
                        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden' }}>
                                <img src={gallery2} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Hardware</span>
                                <span style={{ opacity: 0.5 }}>build</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Tactile interfaces and synth equipment.</div>
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
                            }}>Explore</button>
                        </div>

                        {/* Card 3 */}
                        <div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden' }}>
                                <img src={gallery3} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Mentorship</span>
                                <span style={{ opacity: 0.5 }}>lead</span>
                            </div>
                            <div style={{ marginBottom: '20px', opacity: 0.7 }}>Guiding the next generation of designers.</div>
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
                            }}>Explore</button>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Subscribe/Connect */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '80px', background: '#0f0f0f' }} className="collab-section">
                    <div style={{ padding: 'clamp(30px, 8vw, 80px)' }}>
                        <h3 style={{ 
                            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                            fontFamily: "'Abril Fatface', serif", 
                            color: 'white',
                            marginBottom: '30px',
                            textTransform: 'uppercase',
                            overflowWrap: 'break-word',
                            lineHeight: 1.1
                        }}>
                            Collaborate & Create
                        </h3>
                        <p style={{ opacity: 0.7, marginBottom: '40px', lineHeight: 1.7, fontSize: 'clamp(0.9rem, 2vw, 1.05rem)' }}>
                            The journey of a thousand miles begins with a single email. Whether you have a project in mind or just want to discuss the future of design, I'm always open to new signals.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="Your email address"
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
                                background: '#ef4444',
                                border: 'none',
                                color: 'white',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}>
                                Join
                            </button>
                        </div>
                    </div>

                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src={collabImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>

            </div>

            <style>{`
        .hover-scale:hover { transform: scale(1.05); }
        @media (min-width: 1024px) {
           .collab-section {
             grid-template-columns: 1fr 1fr !important;
           }
        }
        @media (max-width: 1024px) {
           div[style*="grid-template-columns: 1fr 1fr"] {
             grid-template-columns: 1fr !important;
             gap: 60px !important;
           }
           .collab-section {
             grid-template-columns: 1fr !important;
           }
           .collab-section div[style*="position: relative"] {
             height: 300px;
           }
        }
        @media (max-width: 768px) {
          .thumbnails-grid {
             display: none !important;
          }
          nav {
            padding: 20px !important;
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

export default AboutDetailPage;
