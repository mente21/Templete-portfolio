import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MapPin, Phone, Instagram, Twitter } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const ContactSection = () => {
    const { data: contactData, loading } = useCollection('contact');

    const dynamicContact = contactData?.[0] || {
        email: "hello@mente.co",
        location: "London, United Kingdom",
        github: "#",
        linkedin: "#",
        instagram: "#",
        twitter: "#",
        desc: "I'm always open to discussing high-performance architectures, complex backend logic, or premium digital designs."
    };

    const socials = [
        { icon: <Linkedin size={22} />, link: dynamicContact.linkedin, active: !!dynamicContact.linkedin },
        { icon: <Github size={22} />, link: dynamicContact.github, active: !!dynamicContact.github },
        { icon: <Instagram size={22} />, link: dynamicContact.instagram, active: !!dynamicContact.instagram },
        { icon: <Twitter size={22} />, link: dynamicContact.twitter, active: !!dynamicContact.twitter },
        { icon: <Mail size={22} />, link: `mailto:${dynamicContact.email}`, active: true }
    ].filter(s => s.active && s.link !== '#');

    if (loading) return null;

    return (
        <section id="contact" style={{ 
            padding: '120px 10%', 
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.5s ease'
        }}>
            {/* Background Decorative Element */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, var(--accent-primary)08 0%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: 0
            }} />

            <div className="section-header-premium" style={{ marginBottom: '80px', textAlign: 'left', pointerEvents: 'none' }}>
                <span className="section-subtitle-premium" style={{ display: 'block' }}>Connect with me</span>
                <h2 className="section-title-premium" style={{ justifyContent: 'flex-start' }}>
                    <span className="section-title-accent">HAVE A</span> 
                    <span className="section-title-stroke">CONCEPT?</span>
                </h2>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', 
                gap: '80px',
                zIndex: 1,
                position: 'relative'
            }}>
                {/* Contact Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <p style={{ 
                        fontSize: '1.2rem', 
                        color: 'var(--text-secondary)', 
                        lineHeight: 1.8,
                        marginBottom: '60px',
                        maxWidth: '400px'
                    }}>
                        {dynamicContact.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                borderRadius: '15px', 
                                background: 'rgba(255, 107, 0, 0.1)',
                                border: '1px solid rgba(255, 107, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ff6b00'
                            }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                                <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dynamicContact.email}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                borderRadius: '15px', 
                                background: 'rgba(255, 107, 0, 0.1)',
                                border: '1px solid rgba(255, 107, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#ff6b00'
                            }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Location</div>
                                <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{dynamicContact.location}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginTop: '80px' }}>
                        {socials.map((social, i) => (
                            <motion.a 
                                key={i}
                                href={social.link}
                                whileHover={{ y: -5, background: 'var(--accent-primary)', color: 'black', borderColor: 'var(--accent-primary)' }}
                                style={{
                                    width: '54px',
                                    height: '54px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.3s ease',
                                    background: 'var(--card-bg)'
                                }}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '30px',
                        padding: '50px',
                        backdropFilter: 'var(--glass-blur)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                    }}
                >
                    <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Your Name</label>
                            <input 
                                type="text" 
                                placeholder="ALEX MERCER"
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'Anton',
                                    letterSpacing: '1px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Email Address</label>
                            <input 
                                type="email" 
                                placeholder="ALEX@EXAMPLE.COM"
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'Anton',
                                    letterSpacing: '1px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Your Message</label>
                            <textarea 
                                rows="6"
                                placeholder="TELL ME ABOUT YOUR VISION"
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'Anton',
                                    letterSpacing: '1px',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontFamily: 'Anton',
                                    fontSize: '1rem',
                                    letterSpacing: '4px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px'
                                }}
                            >
                                TRANSMIT MESSAGE <Send size={20} />
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>

            <div style={{ 
                marginTop: '120px', 
                paddingTop: '40px', 
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: 0.5,
                fontSize: '0.8rem',
                letterSpacing: '2px',
                color: 'var(--text-primary)'
            }}>
                <div>© 2024 PORTFOLIO • INDUSTRIAL ARCHITECT</div>
                <div>POWERED BY AI LOGIC</div>
            </div>

            <style>{`
                input::placeholder, textarea::placeholder {
                    color: var(--text-secondary) !important;
                    opacity: 0.3;
                }
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;
