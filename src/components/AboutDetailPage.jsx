import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../hooks/useCollection';
import { ArrowLeft, Sparkles, Target, Compass, Feather, Award, Users, Briefcase } from 'lucide-react';

const AboutDetailPage = () => {
    const navigate = useNavigate();
    const { data: aboutData, loading } = useCollection('about');
    const [about, setAbout] = useState(null);

    useEffect(() => {
        if (!loading && aboutData?.[0]) {
            setAbout(aboutData[0]);
        }
        window.scrollTo(0, 0);
    }, [aboutData, loading]);

    if (loading || !about) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', color: 'white' }}>
                <div className="skeleton" style={{ width: '200px', height: '40px', borderRadius: '8px' }}></div>
            </div>
        );
    }

    const statItems = about.stats.split(',').map(s => {
        const parts = s.trim().split(' ');
        return { value: parts[0], label: parts.slice(1).join(' ') };
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}>
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '500px', height: '500px', background: 'rgba(255, 107, 0, 0.05)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(217, 70, 239, 0.05)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />

            {/* Navigation */}
            <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border-color)', padding: '20px 5%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
                    <motion.button
                        whileHover={{ x: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}
                    >
                        <ArrowLeft size={24} />
                        BACK TO PORTFOLIO
                    </motion.button>
                </div>
            </nav>

            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 5%', position: 'relative', zIndex: 1 }}>
                
                {/* Hero Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{ borderRadius: '40px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative', padding: '15px', background: 'var(--card-bg)' }}>
                            <img src={about.imageUrl} alt="Dominique" style={{ width: '100%', borderRadius: '25px', display: 'block' }} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '4px', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>The Full Story</span>
                        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 800, marginBottom: '30px', color: 'white', lineHeight: 1.1, fontFamily: "'Inter', sans-serif" }}>
                            BEYOND THE <br />
                            <span style={{ color: 'var(--accent-primary)' }}>INTERFACE</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '40px', maxWidth: '500px' }}>
                            A deep dive into the methodology, mission, and mind behind the craft. 
                        </p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            {statItems.map((stat, i) => (
                                <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'white' }}>{stat.value}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase' }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Detailed Bio & Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '80px', marginBottom: '120px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', color: 'white' }}>MY MISSION</h2>
                        <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            <p style={{ marginBottom: '30px', color: 'white', fontWeight: 500, borderLeft: '4px solid var(--accent-primary)', paddingLeft: '25px', fontSize: '1.4rem' }}>
                                "{about.mission}"
                            </p>
                            {about.detailedBio.split('\n\n').map((p, i) => (
                                <p key={i} style={{ marginBottom: '25px', opacity: 0.9 }}>{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{ alignSelf: 'start', position: 'sticky', top: '150px' }}
                    >
                        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '40px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
                            <Sparkles size={40} color="var(--accent-primary)" style={{ marginBottom: '30px' }} />
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '25px', color: 'white' }}>CORE VALUES</h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {['Innovation', 'User Centricity', 'Precision', 'Storytelling'].map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                        <div style={{ width: '6px', height: '6px', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Philosophy Grid */}
                <div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '60px', textAlign: 'center', color: 'white' }}>MY PHILOSOPHY</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                        {about.philosophy?.map((philo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '30px', padding: '50px', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', fontWeight: 900, color: 'rgba(255,107,0,0.03)', zIndex: 0 }}>0{i+1}</div>
                                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
                                    {i === 0 ? <Users size={24} color="var(--accent-primary)" /> : i === 1 ? <Sparkles size={24} color="var(--accent-primary)" /> : <Compass size={24} color="var(--accent-primary)" />}
                                    {philo.title}
                                </h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, position: 'relative', zIndex: 1 }}>{philo.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Style */}
            <footer style={{ padding: '80px 5%', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginBottom: '40px' }}>WANT TO WORK TOGETHER?</h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '20px 60px', borderRadius: '100px', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                >
                    LET'S CONNECT
                </motion.button>
            </footer>

            <style>{`
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns: 1fr 1.5fr"],
                    div[style*="grid-template-columns: 1.5fr 1fr"] {
                        grid-template-columns: 1fr !important;
                        gap: 50px !important;
                    }
                    div[style*="position: sticky"] {
                        position: relative !important;
                        top: 0 !important;
                    }
                }
                @media (max-width: 768px) {
                    main {
                        padding: 40px 20px !important;
                    }
                    div[style*="grid-column: span 8"],
                    div[style*="grid-column: span 4"] {
                        grid-column: span 12 !important;
                        grid-row: span 1 !important;
                    }
                    h1 {
                        font-size: 3.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default AboutDetailPage;
