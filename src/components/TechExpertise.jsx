import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, Globe, Wind, Palette, Terminal, Cpu, Code2, 
  Server, Database, Zap, Container, Cloud, ShieldCheck
} from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const TechExpertise = () => {
    const { data: skillsData, loading } = useCollection('skills');

    const dynamicDesc = skillsData?.find(s => s.detailedDesc)?.detailedDesc || 
        "The visual map above represents the core neural pathways of my technical stack. Each node is a specialized cluster of expertise, from high-performance React architectures to robust Node.js backends and complex architectural design. The connections illustrate the fluid synergy between different technologies, ensuring a cohesive and scalable digital environment.";

    // Standardized Grid for perfect alignment
    // Row 1: y=20, Row 2: y=50 (Trunk), Row 3: y=80
    // Group 1 has an extra row at the bottom
    const nodes = [
        // Group 1: Frontend (x=15)
        { id: 1, name: 'React', x: 15, y: 20, icon: <Atom size={26} />, color: '#61dafb' },
        { id: 2, name: 'Next.js', x: 15, y: 50, icon: <Globe size={26} />, color: '#ff6b00' }, // Hit by trunk
        { id: 3, name: 'Tailwind', x: 15, y: 75, icon: <Wind size={26} />, color: '#38bdf8' },
        { id: 4, name: 'HTML / CSS', x: 15, y: 92, icon: <Palette size={26} />, color: '#e34f26' },
        
        // Group 2: Logic (x=40)
        { id: 5, name: 'Python', x: 40, y: 20, icon: <Terminal size={26} />, color: '#3776ab' },
        { id: 6, name: 'Node.js', x: 40, y: 50, icon: <Cpu size={26} />, color: '#339933' }, // Hit by trunk
        { id: 7, name: 'Typescript', x: 40, y: 80, icon: <Code2 size={26} />, color: '#3178c6' },
        
        // Group 3: Data (x=65)
        { id: 8, name: 'MongoDB', x: 65, y: 30, icon: <Server size={26} />, color: '#47a248' },
        { id: 9, name: 'MySQL', x: 65, y: 50, icon: <Database size={26} />, color: '#4479a1' }, // Hit by trunk
        { id: 10, name: 'Firebase', x: 65, y: 70, icon: <Zap size={26} />, color: '#ffca28' },
        
        // Group 4: Cloud (x=90)
        { id: 11, name: 'Docker', x: 90, y: 20, icon: <Container size={26} />, color: '#2496ed' },
        { id: 12, name: 'Cloud Ops', x: 90, y: 50, icon: <Cloud size={26} />, color: '#0ea5e9' }, // Hit by trunk
        { id: 13, name: 'Linux Env', x: 90, y: 80, icon: <ShieldCheck size={26} />, color: '#fcc624' },
    ];

    const connections = [
        { d: 'M 15 20 L 15 92', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 40 20 L 40 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 65 30 L 65 70', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 90 20 L 90 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 15 50 L 90 50', color: 'var(--text-primary)', isTrunk: true }, // Dynamic Trunk Color
    ];

    if (loading) return null;

    return (
        <div className="tech-expertise-container" style={{
            position: 'relative',
            width: '100%',
            minHeight: '1100px',
            background: 'var(--card-bg)',
            borderRadius: '60px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            margin: '80px 0',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                zIndex: 0,
                opacity: 0.1
            }} />

            <div style={{ position: 'relative', width: '100%', height: '800px', zIndex: 1 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
                    {connections.map((conn, i) => (
                        <motion.path
                            key={i}
                            d={conn.d}
                            stroke={conn.color}
                            strokeWidth={conn.isTrunk ? "1" : "0.3"}
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    ))}

                    {/* Single Master Neural Packet */}
                    <motion.circle
                        r="1.2"
                        fill="var(--accent-primary)" // Changed to accent for better visibility
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ 
                            duration: 12, 
                            repeat: Infinity, 
                            ease: "linear"
                        }}
                        style={{ 
                            offsetPath: `path("M 15 50 L 90 50 L 90 20 L 90 80 L 90 50 L 15 50 L 15 20 L 15 92 L 15 50 Z")`,
                            filter: 'drop-shadow(0 0 15px var(--accent-primary))'
                        }}
                    />
                </svg>

                {nodes.map((node, idx) => (
                    <div
                        key={node.id}
                        style={{
                            position: 'absolute',
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 2,
                            transform: 'translate(-50%, -50%)' // This centers the whole group
                        }}
                    >
                        {/* Static Icon Box - Exact center point for the line */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.1, boxShadow: `0 0 40px ${node.color}88` }}
                            style={{
                                width: '64px',
                                height: '64px',
                                background: 'rgba(15, 15, 20, 0.9)', 
                                border: `2px solid ${node.color}`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: node.color,
                                cursor: 'pointer',
                                backdropFilter: 'blur(20px)',
                                position: 'relative',
                                marginBottom: '40px'
                            }}
                        >
                            <div style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
                                {node.icon}
                            </div>
                        </motion.div>

                        <span style={{ 
                            position: 'absolute',
                            top: '100%',
                            fontSize: '0.75rem', 
                            color: '#ffffff', 
                            fontWeight: 900, 
                            letterSpacing: '2px', 
                            textTransform: 'uppercase',
                            background: '#000000',
                            padding: '6px 14px',
                            borderRadius: '4px',
                            border: `1px solid ${node.color}44`,
                            marginTop: '-12px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
                        }}>{node.name}</span>
                    </div>
                ))}
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                padding: '60px 8%',
                zIndex: 2,
                borderTop: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                opacity: 0.95
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px', alignItems: 'start' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <h3 style={{ fontSize: '3rem', fontFamily: 'Anton', color: 'var(--text-primary)', margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
                            THE <span style={{ color: 'var(--accent-primary)' }}>INDUSTRIAL</span><br/>
                            ECOSYSTEM
                        </h3>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                            {dynamicDesc}
                        </p>
                    </motion.div>
                </div>
            </div>
            
            <style>{`
                @media (max-width: 900px) {
                    .tech-expertise-container { min-height: 1400px !important; }
                    div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; gap: 40px !important; }
                }
            `}</style>
        </div>
    );
};

export default TechExpertise;
