import React from 'react';
import { motion } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { 
  FaReact, FaMobileAlt, FaGlobe, FaCode, FaDatabase, FaCloud, 
  FaPaintBrush, FaBrain, FaShieldAlt, FaServer, FaDesktop, 
  FaRocket, FaTools, FaShoppingCart, FaChartLine, FaUsers, 
  FaPython, FaNodeJs, FaGamepad, FaRobot, FaCamera, FaMicrophone, FaHeart, FaPlane, FaStar, FaLightbulb
} from 'react-icons/fa';

// Icon Map for dynamic rendering
const iconMap = {
  FaReact: <FaReact size={32} />,
  FaMobileAlt: <FaMobileAlt size={32} />,
  FaGlobe: <FaGlobe size={32} />,
  FaCode: <FaCode size={32} />,
  FaDatabase: <FaDatabase size={32} />,
  FaCloud: <FaCloud size={32} />,
  FaPaintBrush: <FaPaintBrush size={32} />,
  FaBrain: <FaBrain size={32} />,
  FaShieldAlt: <FaShieldAlt size={32} />,
  FaServer: <FaServer size={32} />,
  FaDesktop: <FaDesktop size={32} />,
  FaRocket: <FaRocket size={32} />,
  FaTools: <FaTools size={32} />,
  FaShoppingCart: <FaShoppingCart size={32} />,
  FaChartLine: <FaChartLine size={32} />,
  FaUsers: <FaUsers size={32} />,
  FaPython: <FaPython size={32} />,
  FaNodeJs: <FaNodeJs size={32} />,
  FaGamepad: <FaGamepad size={32} />,
  FaRobot: <FaRobot size={32} />,
  FaCamera: <FaCamera size={32} />,
  FaMicrophone: <FaMicrophone size={32} />,
  FaHeart: <FaHeart size={32} />,
  FaPlane: <FaPlane size={32} />,
  FaStar: <FaStar size={32} />,
  FaLightbulb: <FaLightbulb size={32} />,
  // Studio Mode mappings
  mic: <FaMicrophone size={32} />,
  camera: <FaCamera size={32} />,
  palette: <FaPaintBrush size={32} />,
  users: <FaUsers size={32} />,
  lightbulb: <FaLightbulb size={32} />,
  star: <FaStar size={32} />
};

const ServicesSection = () => {
    const { data: services, loading } = useCollection('services');

    if (loading) return null;
    if (!services || services.length === 0) return null;

    return (
        <section id="services" style={{ padding: '80px 10%', background: 'var(--bg-color)' }}>
            <div className="section-header-premium" style={{ marginBottom: '60px' }}>

                <h2 className="section-title-premium">
                    <span className="section-title-accent">CLIENT</span> 
                    <span className="section-title-stroke">SERVICES</span>
                </h2>
            </div>

            <div className="services-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '30px' 
            }}>
                {services.map((service, idx) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
                        style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '24px',
                            padding: '30px',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Icon / Image */}
                        <div style={{ marginBottom: '24px', color: 'var(--accent-primary)' }}>
                            {service.icon && iconMap[service.icon] ? (
                                <div style={{ 
                                    width: '56px', height: '56px', 
                                    background: 'rgba(255,107,0,0.1)', 
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {iconMap[service.icon]}
                                </div>
                            ) : service.imageUrl ? (
                                <img src={service.imageUrl} alt={service.title} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                            ) : (
                                <div style={{ 
                                    width: '56px', height: '56px', 
                                    background: 'var(--accent-primary)', 
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>{service.title?.[0]}</span>
                                </div>
                            )}
                        </div>

                        <h3 style={{ 
                            fontFamily: "'Abril Fatface', serif", 
                            fontSize: '1.5rem', 
                            color: 'var(--text-primary)', 
                            margin: '0 0 16px 0',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>{service.title}</h3>

                        <p style={{ 
                            fontSize: '0.95rem', 
                            color: 'var(--text-secondary)', 
                            lineHeight: 1.6, 
                            marginBottom: '30px',
                            fontFamily: "'Inter', sans-serif, sans-serif"
                        }}>{service.desc}</p>

                        {service.features && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                                {service.features.split(',').map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.8 }}>
                                        <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
                                        <span>{feature.trim()}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ 
                            marginTop: 'auto', 
                            paddingTop: '30px', 
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center' 
                        }}>
                            {service.price && (
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif, sans-serif", letterSpacing: '1px' }}>STARTING AT</span>
                                    <div style={{ fontSize: '1.25rem', fontFamily: "'Abril Fatface', serif", color: 'white' }}>{service.price}</div>
                                </div>
                            )}
                            <a href="#contact" style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,107,0,0.1)', 
                                border: '1px solid var(--accent-primary)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'var(--accent-primary)',
                                transition: 'all 0.3s ease'
                            }}>
                                <ArrowUpRight size={20} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style>{`
                @media (max-width: 1200px) {
                    #services { padding-left: 120px !important; }
                }
                @media (max-width: 768px) {
                    #services { padding: 80px 5% !important; }
                    .services-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                }
                @media (max-width: 480px) {
                    #services { padding: 60px 20px !important; }
                    div[style*="padding: 30px"] { padding: 20px !important; }
                    h3 { font-size: 1.3rem !important; }
                }
            `}</style>
        </section>
    );
};

export default ServicesSection;
