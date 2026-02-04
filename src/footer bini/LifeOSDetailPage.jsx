import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Database, Layout, Command, Terminal, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mainImg from './assets/footer assets/about_images/gallery2_new.jpg'; // Reusing as placeholder
import thumb1 from './assets/footer assets/service_images/thumb1.png';
import thumb2 from './assets/footer assets/philosophy_images/thumb2.jpg';

const LifeOSDetailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-color)',
            color: 'var(--text-primary)',
            fontFamily: "'Inter', sans-serif",
            paddingBottom: '100px'
        }}>
            {/* Navigation */}
            <nav style={{
                padding: '30px 50px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-color)'
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
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
                    color: 'var(--text-secondary)'
                }}>
                    SYSTEM / OPTIMIZATION
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
                        Livable Life
                    </h1>
                    <p style={{
                        color: 'var(--accent-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        Philosophy for Meaningful Living
                    </p>
                </div>

                {/* SECTION 1: Intro & Visuals */}
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
                            backgroundColor: 'var(--card-bg)',
                            marginBottom: '20px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src="/dominique/breakfast_flowers_1.png"
                                alt="Dominique's Morning"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div style={{ paddingTop: '20px' }}>
                        <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                            The Heart of Routine
                        </h2>
                        <div style={{
                            fontSize: '1.5rem',
                            color: 'var(--accent-primary)',
                            marginBottom: '40px',
                            fontFamily: "'JetBrains Mono', monospace"
                        }}>
                            Livable, Not Workable <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>— her mantra</span>
                        </div>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'var(--text-secondary)',
                            marginBottom: '40px'
                        }}>
                            Chaos is part of the journey, but meaning is something we manufacture. Dominique's "Livable Life" is a comprehensive system of rituals, peace, and reflection designed to maximize joy while minimizing fear. It is the architecture upon which she builds her legacy.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
                            <button onClick={() => navigate('/')} style={{
                                flex: 1,
                                padding: '18px',
                                background: 'var(--text-primary)',
                                color: 'var(--bg-color)',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer'
                            }}>
                                Explore the Plan
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Mind</span>
                                <span style={{ color: 'var(--text-secondary)' }}>Psychology, Reflection, Peace</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Soul</span>
                                <span style={{ color: 'var(--text-secondary)' }}>Coffee Rituals, Music, Fashion</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Body</span>
                                <span style={{ color: 'var(--text-secondary)' }}>Movement, Rest, Nourishment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: The Stack */}
                <div style={{ marginBottom: '150px' }}>
                    <h3 style={{
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '4px',
                        marginBottom: '60px',
                        fontSize: '1.5rem'
                    }}>
                        LIFE MODULES
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        <div>
                             <div style={{ aspectRatio: '1/1', background: 'var(--card-bg)', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img src="/dominique/traditional_coffee_cup.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Coffee & Connection</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>The traditional ceremony as a foundation for friendship.</div>
                        </div>
                         <div>
                             <div style={{ aspectRatio: '1/1', background: 'var(--card-bg)', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img src="/dominique/desk_office.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Education & Growth</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>Psychology as a tool for understanding our own spirit.</div>
                        </div>
                         <div>
                             <div style={{ aspectRatio: '1/1', background: 'var(--card-bg)', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img src="/dominique/pancakes.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Nourishment & Joy</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>Finding peace in the simple ritual of food.</div>
                        </div>
                    </div>
                </div>

                 {/* SECTION 3: Deep Dive */}
                 <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    marginBottom: '150px',
                    alignItems: 'center'
                }}>
                    <div>
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Abril Fatface', serif" }}>
                            The Spirit of Living
                        </h3>
                        <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                             <p>
                                Order is not about being neat; it's about being ready — ready to experience every drop of life that we are given.
                            </p>
                            <p>
                                Dominique believes in "Just Enough Process." Too much structure stifles the heart; too little leads to lost moments. Her system is fluid, designed to bend and hold the weight of both the hard days and the good days.
                            </p>
                        </div>
                    </div>
                    <div style={{ aspectRatio: '4/5', background: 'var(--card-bg)', overflow: 'hidden' }}>
                         <img src="/dominique/interior_flowers.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

export default LifeOSDetailPage;
