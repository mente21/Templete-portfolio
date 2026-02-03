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
                        Life OS
                    </h1>
                    <p style={{
                        color: '#3b82f6',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '20px',
                        fontWeight: 600
                    }}>
                        Operating System for High Performance
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
                            backgroundColor: '#1a1a1a',
                            marginBottom: '20px',
                            overflow: 'hidden'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"
                                alt="Digital System"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }}
                            />
                        </div>
                        <div className="thumbnails-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                            <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Content */}
                    <div style={{ paddingTop: '20px' }}>
                        <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
                            Digital Brain
                        </h2>
                        <div style={{
                            fontSize: '1.5rem',
                            color: '#3b82f6',
                            marginBottom: '40px',
                            fontFamily: "'JetBrains Mono', monospace"
                        }}>
                            v2.4.0 <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>current build</span>
                        </div>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '40px'
                        }}>
                            Chaos is the default state of the universe. Order is something we must manufacture. My "Life OS" is a comprehensive system of digital tools, workflows, and mental models designed to maximize output while minimizing cognitive load. It is the architecture upon which I build everything else.
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
                                View Template
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
                                Stack Info
                            </button>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                             <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Core</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Notion, Obsidian, Raycast</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Development</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>VS Code, Docker, Warp</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                                <span style={{ fontWeight: 600 }}>Design</span>
                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Figma, Blender, Rive</span>
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
                        SYSTEM MODULES
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                        <div>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Database size={64} color="#3b82f6" />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Knowledge Base</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>Second Brain for capturing and linking ideas.</div>
                        </div>
                         <div>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Layout size={64} color="#a855f7" />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Project Management</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>Agile workflows adapted for personal scale.</div>
                        </div>
                         <div>
                             <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Terminal size={64} color="#10b981" />
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Automation</div>
                            <div style={{ opacity: 0.7, marginBottom: '20px' }}>Scripting away repetitive tasks.</div>
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
                            The Philosophy of Org
                        </h3>
                        <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                             <p>
                                Organization is not about being neat; it's about being ready. Ready to execute, ready to pivot, ready to create.
                            </p>
                            <p>
                                I subscribe to the methodology of "Just Enough Process." Too much structure stifles creativity; too little leads to entropy. My system is fluid, designed to bend but not break under pressure.
                            </p>
                        </div>
                    </div>
                    <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden' }}>
                         <img src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
