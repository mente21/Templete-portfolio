import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Compass, Flag, Navigation, Globe, Mountain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mainImg from './assets/footer assets/philosophy_images/main.jpg'; // Placeholder
import thumb1 from './assets/footer assets/about_images/thumb1.jpg'; // Placeholder
import thumb2 from './assets/footer assets/about_images/thumb2.jpg'; // Placeholder

const JourneyDetailPage = () => {
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
                    JOURNEY / TIMELINE
                </div>
                <div style={{ width: '80px' }}></div>
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
                        The Path
                    </h1>
                    <p style={{
                        color: '#f59e0b',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        A Chronicle of Evolution
                    </p>
                </div>

                {/* SECTION 1: Intro */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    marginBottom: '120px'
                }}>
                    {/* LEFT: Image Gallery */}
                    <div>
                        <div style={{
                            width: '100%',
                            aspectRatio: '1/1',
                            backgroundColor: '#1a1a1a',
                            marginBottom: '20px',
                            overflow: 'hidden',
                            borderRadius: '24px'
                        }}>
                             <img
                                src="https://images.unsplash.com/photo-1547149666-453e344b005e?q=80&w=2000"
                                alt="Ethiopian Highlands"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                         <div className="thumbnails-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                <img src="https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden', borderRadius: '12px' }}>
                                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div style={{ paddingTop: '20px' }}>
                                <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                                    A Journey of Resilience
                                </h2>
                                <div style={{
                                    fontSize: '1.5rem',
                                    color: '#E9967A',
                                    marginBottom: '40px',
                                    fontFamily: "'JetBrains Mono', monospace"
                                }}>
                                    From Addis to Advocacy <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>livable not workable</span>
                                </div>

                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    color: 'rgba(255,255,255,0.8)',
                                    marginBottom: '40px'
                                }}>
                                    Every life is a series of milestones that shape the soul. My journey began in Ethiopia, moved across the world to New Zealand, and took a profound turn with a terminal diagnosis at 20. But instead of an end, it became a beginning—a mission to share, to educate, and to live fully.
                                </p>

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
                                View Full CV
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Roots</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Ethiopian-born Advocate</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Education</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Psychology & Social Impact</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Current</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Health Storyteller & Marriage</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Timeline items */}
                <div style={{ marginBottom: '150px', position: 'relative', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '40px', marginLeft: '20px' }}>
                     <div style={{ marginBottom: '60px' }}>
                        <div style={{ position: 'absolute', left: '-6px', width: '11px', height: '11px', background: '#E9967A', borderRadius: '50%' }}></div>
                         <h3 style={{ fontSize: '1.8rem', fontFamily: "'Abril Fatface', serif", marginBottom: '10px' }}>The Core - Ethiopian Beginnings</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            Learning the depth of community and the warmth of a culture that celebrates life through simple rituals.
                        </p>
                     </div>
                     <div style={{ marginBottom: '60px' }}>
                        <div style={{ position: 'absolute', left: '-6px', width: '11px', height: '11px', background: '#557C7C', borderRadius: '50%' }}></div>
                         <h3 style={{ fontSize: '1.8rem', fontFamily: "'Abril Fatface', serif", marginBottom: '10px' }}>The Pursuit - Psychology & Mind</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            Studying the human spirit to understand resilience—a journey that became deeply personal in April 2024.
                        </p>
                     </div>
                     <div style={{ marginBottom: '60px' }}>
                        <div style={{ position: 'absolute', left: '-6px', width: '11px', height: '11px', background: '#ef4444', borderRadius: '50%' }}></div>
                         <h3 style={{ fontSize: '1.8rem', fontFamily: "'Abril Fatface', serif", marginBottom: '10px' }}>The Mission - Advocacy & Love</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: 1.7 }}>
                            Turning a personal battle into a public voice for millions, while building a life of joy with Sean.
                        </p>
                     </div>
                </div>

                {/* SECTION 3: Locations */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '100px' }}>
                    <div style={{ padding: '30px', background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Globe size={40} color="#f59e0b" style={{ marginBottom: '20px' }} />
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Global Mindset</h4>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Remote work has allowed me to collaborate with teams from Tokyo to San Francisco.</p>
                    </div>
                     <div style={{ padding: '30px', background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Mountain size={40} color="#f59e0b" style={{ marginBottom: '20px' }} />
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Base Camps</h4>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>London, Berlin, and the Cloud. My setup is portable, my code is deployed everywhere.</p>
                    </div>
                </div>

            </div>
             <style>{`
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
                   div[style*="padding: 60px 40px"] {
                     padding: 40px 20px !important;
                   }
                }
            `}</style>
        </div>
    );
};

export default JourneyDetailPage;
