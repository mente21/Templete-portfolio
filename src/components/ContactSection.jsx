import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MapPin, Phone, Instagram, Twitter, Youtube, Facebook, ExternalLink, Music, MessageCircle } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const ContactSection = () => {
    const { data: contactData, loading } = useCollection('contact');
    const [status, setStatus] = useState('');

    const dynamicContact = contactData?.[0] || {
        email: "hello@sarah.design",
        phone: "+1 234 567 890",
        location: "London, United Kingdom",
        github: "#",
        linkedin: "#",
        youtube: "#",
        facebook: "#",
        fiverr: "#",
        tiktok: "#",
        telegram: "#",
        instagram: "#",
        twitter: "#",
        desc: "I'm always open to discussing high-performance architectures, complex backend logic, or premium digital designs."
    };

    const TikTokIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.3-.76-.41-1.42-.92-1.98-1.57-.02 1.35-.01 2.69-.01 4.04 0 3.01-.45 6.44-3.11 8.35-2.09 1.48-5.07 1.71-7.19.46-2.5-1.42-3.66-4.59-2.73-7.22.65-1.89 2.45-3.37 4.45-3.51V10c-2.02.13-3.83 1.53-4.38 3.47-.64 2.21.36 4.88 2.45 6.01 1.63.9 3.86.84 5.23-.42 1.25-1.07 1.62-2.92 1.5-4.51V.02h-.04Z" />
        </svg>
    );

    const socials = [
        { icon: <Linkedin size={22} />, link: dynamicContact.linkedin, active: !!dynamicContact.linkedin },
        { icon: <Github size={22} />, link: dynamicContact.github, active: !!dynamicContact.github },
        { icon: <Youtube size={22} />, link: dynamicContact.youtube, active: !!dynamicContact.youtube },
        { icon: <Facebook size={22} />, link: dynamicContact.facebook, active: !!dynamicContact.facebook },
        { icon: <ExternalLink size={22} />, link: dynamicContact.fiverr, label: 'Fiverr', active: !!dynamicContact.fiverr },
        { icon: <TikTokIcon />, link: dynamicContact.tiktok, label: 'TikTok', active: !!dynamicContact.tiktok },
        { icon: <Send size={22} />, link: dynamicContact.telegram, label: 'Telegram', active: !!dynamicContact.telegram },
        { icon: <Instagram size={22} />, link: dynamicContact.instagram, active: !!dynamicContact.instagram },
        { icon: <Twitter size={22} />, link: dynamicContact.twitter, active: !!dynamicContact.twitter },
        { icon: <Mail size={22} />, link: `mailto:${dynamicContact.email}`, active: true }
    ].filter(s => s.active && s.link !== '#' && s.link !== '');

    const handleEmailTransmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        const subject = `Portfolio Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        window.location.href = `mailto:${dynamicContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('Message prepared in your email client!');
    };

    if (loading) return null;

    const contactItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '12px',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        cursor: 'default'
    };

    const iconBoxStyle = {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'rgba(255, 107, 0, 0.05)',
        border: '1px solid rgba(255, 107, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-primary)',
        flexShrink: 0
    };

    const labelStyle = {
        fontSize: '0.7rem',
        color: 'var(--text-secondary)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '6px',
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif, sans-serif",
        opacity: 0.6
    };

    const infoStyle = {
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
        fontWeight: 400, // Natural weight
        letterSpacing: '0.5px',
        wordBreak: 'break-all',
        fontFamily: "'Inter', sans-serif, sans-serif"
    };

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

                <h2 className="section-title-premium" style={{ justifyContent: 'flex-start' }}>
                    <span className="section-title-accent">HAVE A</span>
                    <span className="section-title-stroke">PROJECT?</span>
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
                        maxWidth: '400px',
                        fontWeight: 400,
                        fontFamily: "'Inter', sans-serif, sans-serif"
                    }}>
                        {dynamicContact.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={contactItemStyle}>
                            <div style={iconBoxStyle}><Mail size={22} /></div>
                            <div>
                                <div style={labelStyle}>Email Protocol</div>
                                <div style={infoStyle}>{dynamicContact.email}</div>
                            </div>
                        </div>

                        <div style={contactItemStyle}>
                            <div style={iconBoxStyle}><Phone size={22} /></div>
                            <div>
                                <div style={labelStyle}>Comm-Link</div>
                                <div style={infoStyle}>{dynamicContact.phone}</div>
                            </div>
                        </div>

                        <div style={contactItemStyle}>
                            <div style={iconBoxStyle}><MapPin size={22} /></div>
                            <div>
                                <div style={labelStyle}>Station / Location</div>
                                <div style={infoStyle}>{dynamicContact.location}</div>
                            </div>
                        </div>
                    </div>

                    {/* Social Hub */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '60px', paddingLeft: '12px' }}>
                        {socials.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5, background: 'var(--accent-primary)', color: 'black', borderColor: 'var(--accent-primary)' }}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.3s ease',
                                    background: 'var(--card-bg)',
                                    position: 'relative'
                                }}
                                title={social.label || ''}
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
                    className="contact-form-card"
                    style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '30px',
                        padding: '50px',
                        backdropFilter: 'var(--glass-blur)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                    }}
                >
                    <form onSubmit={handleEmailTransmit} className="contact-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontFamily: "'Inter', sans-serif, sans-serif", fontWeight: 600 }}>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="ALEX MERCER"
                                required
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: "'Inter', sans-serif, sans-serif",
                                    letterSpacing: '1px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontFamily: "'Inter', sans-serif, sans-serif", fontWeight: 600 }}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="ALEX@EXAMPLE.COM"
                                required
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: "'Inter', sans-serif, sans-serif",
                                    letterSpacing: '1px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', fontFamily: "'Inter', sans-serif, sans-serif", fontWeight: 600 }}>Your Message</label>
                            <textarea
                                name="message"
                                rows="6"
                                placeholder="TELL ME ABOUT YOUR VISION"
                                required
                                style={{
                                    width: '100%',
                                    background: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    padding: '16px 20px',
                                    borderRadius: '12px',
                                    color: 'var(--text-primary)',
                                    fontFamily: "'Inter', sans-serif, sans-serif",
                                    letterSpacing: '1px',
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    background: 'var(--accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontFamily: "'Inter', sans-serif, sans-serif",
                                    fontSize: '1rem',
                                    letterSpacing: '4px',
                                    fontWeight: 600,
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
                            {status && <p style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', marginTop: '15px', textAlign: 'center', letterSpacing: '1px' }}>{status}</p>}
                        </div>
                    </form>
                </motion.div>
            </div>

            <div style={{
                marginTop: '100px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '60px',
                paddingBottom: '20px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '40px',
                    marginBottom: '40px'
                }}>
                    {/* Brand & Identity */}
                    <div style={{ maxWidth: '300px' }}>
                        <h4 style={{
                            fontSize: '1.5rem',
                            fontFamily: "'Abril Fatface', serif",
                            color: 'var(--text-primary)',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            margin: '0 0 15px 0'
                        }}>
                            Sarah Jenkins
                        </h4>
                        <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-secondary)',
                            fontFamily: "'Inter', sans-serif, sans-serif",
                            lineHeight: 1.6,
                            opacity: 0.7
                        }}>
                            Crafting advanced digital experiences with industrial precision and creative logic.
                        </p>
                    </div>


                </div>

                {/* Footer Bottom Bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '1px',
                    flexWrap: 'wrap',
                    gap: '20px',
                    fontFamily: "'Inter', sans-serif, sans-serif",
                    opacity: 0.6
                }}>
                    <div>
                        © {new Date().getFullYear()} SARAH JENKINS • CREATIVE DIRECTOR
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span>DESIGNED BY SARAH JENKINS</span>
                    </div>
                </div>
            </div>

            <style>{`
                input::placeholder, textarea::placeholder {
                    color: var(--text-secondary) !important;
                    opacity: 0.3;
                }
                
                /* Tablets */
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                        gap: 30px !important;
                    }
                }
                
                /* Mobile */
                @media (max-width: 768px) {
                    section {
                        padding: 60px 5% !important;
                    }
                    
                    div[style*="grid-template-columns"] {
                        gap: 25px !important;
                    }
                    
                    /* Contact info cards */
                    div[style*="padding: 30px"] {
                        padding: 20px !important;
                    }
                    
                    /* Form inputs */
                    input, textarea {
                        font-size: 0.9rem !important;
                        padding: 14px !important;
                    }

                    .contact-form {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }

                    .contact-form div {
                        grid-column: span 1 !important;
                    }
                    
                    /* Button */
                    button[type="submit"] {
                        padding: 16px !important;
                        font-size: 0.9rem !important;
                    }
                    
                    /* Footer */
                    div[style*="border-top"] {
                        flex-direction: column !important;
                        gap: 20px !important;
                        text-align: center !important;
                    }
                    
                    div[style*="border-top"] > div {
                        justify-content: center !important;
                    }
                }
                
                /* Small Mobile */
                @media (max-width: 480px) {
                    section {
                        padding: 40px 4% !important;
                    }
                    
                    h2 {
                        font-size: 2rem !important;
                    }
                    
                    p {
                        font-size: 0.9rem !important;
                    }
                    
                    div[style*="padding: 30px"], div[style*="padding: 20px"] {
                        padding: 15px !important;
                    }
                    
                    input, textarea {
                        font-size: 0.85rem !important;
                        padding: 12px !important;
                    }
                    
                    button[type="submit"] {
                        padding: 14px !important;
                        font-size: 0.85rem !important;
                    }
                    
                    /* Social icons */
                    div[style*="gap: 20px"] a {
                        width: 40px !important;
                        height: 40px !important;
                    }
                    
                    /* Footer text */
                    div[style*="border-top"] span {
                        font-size: 0.75rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default ContactSection;

