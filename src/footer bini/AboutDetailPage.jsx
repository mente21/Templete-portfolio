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
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>
                        Dominique
                    </h1>
                    <p style={{
                        color: '#ef4444',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        The Artist & Visionary
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
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000"
                                alt="Dominique Portrait"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }}
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
                                <img src={thumb3} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Detailed Info */}
                    <div style={{ paddingTop: '20px' }}>
                        <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                            Creative Director
                        </h2>
                        <div style={{
                            fontSize: '1.5rem',
                            color: '#ef4444',
                            marginBottom: '40px',
                            fontFamily: "'JetBrains Mono', monospace"
                        }}>
                            $ 150/hr <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>consulting rate</span>
                        </div>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '40px'
                        }}>
                            Dominique is more than just a designer; she is a curator of digital experiences. With over a decade of experience in the intersection of art and technology, she brings a unique painterly approach to pixel perfection. Her work is characterized by bold typography, emotive imagery, and a relentless pursuit of the "sublime" in user interface design. She believes that every digital product should contain a piece of the creator's soul.
                        </p>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '40px'
                        }}>
                            "I see code as my canvas and the browser as my gallery. My mission is to dismantle the barrier between functional utility and artistic expression, creating software that feels like magic."
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
                                Book Consultation
                            </button>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ width: '56px', height: '56px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Mail size={20} /></div>
                                <div style={{ width: '56px', height: '56px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Download size={20} /></div>
                            </div>
                        </div>

                        {/* Specs */}
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Location</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>London, United Kingdom (Remote)</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Experience</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>12 Years (Senior Lead)</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Availability</span>
                                <span style={{ color: '#4ade80' }}>Open for Q3 2026</span>
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
                            The Genesis
                        </h3>

                        <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <p>
                                Born into a family of architects and musicians, Dominique found her rhythm in the silence of code. She started programming at age 12, treating the command line as a sheet of music where every function call was a note in a larger symphony.
                            </p>
                            <p>
                                This duality of structure and fluidity defines her career. She has led design teams at Fortune 500 companies and bootstrapped indie startups, always bringing the same level of intensity and care. She obsesses over the "feel" of a scroll, the "weight" of a click, and the emotional resonance of a color palette.
                            </p>
                            <p>
                                <strong>Average output:</strong> 3-4 major projects per year, ensuring focused, deep work rather than factory-line production. She believes in "slow design" — the idea that things built with patience last longer.
                            </p>
                        </div>

                        <div style={{ marginTop: '40px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
                                Favorite Tools
                            </div>
                            <p style={{ color: 'white', fontFamily: "'JetBrains Mono', monospace" }}>
                                Figma, React, WebGL, Blender, Oil Paint, Film Camera
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
                        EXPERTISE AREAS
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        {/* Card 1 */}
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', background: '#0f0f0f' }}>
                    <div style={{ padding: '80px' }}>
                        <h3 style={{ fontSize: '2.5rem', fontFamily: "'Abril Fatface', serif", marginBottom: '30px' }}>
                            Collaborate & Create
                        </h3>
                        <p style={{ opacity: 0.7, marginBottom: '40px', lineHeight: 1.7 }}>
                            The journey of a thousand miles begins with a single email. Whether you have a project in mind or just want to discuss the future of design, I'm always open to new signals.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
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

export default AboutDetailPage;
