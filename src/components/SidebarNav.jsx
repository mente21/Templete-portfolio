import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Layout, 
  Cpu, 
  GraduationCap, 
  Award, 
  MessageSquare, 
  Mail,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'hero', label: 'Home', icon: <Home size={22} />, href: '#' },
  { id: 'about', label: 'About', icon: <User size={22} />, href: '#about' },
  { id: 'work', label: 'Portfolio', icon: <Layout size={22} />, href: '#work' },
  { id: 'skills', label: 'Skills', icon: <Cpu size={22} />, href: '#skills' },
  { id: 'education', label: 'Education', icon: <GraduationCap size={22} />, href: '#education' },
  { id: 'certificates', label: 'Certificates', icon: <Award size={22} />, href: '#certificates' },
  { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={22} />, href: '#testimonials' },
  { id: 'contact', label: 'Contact', icon: <Mail size={22} />, href: '#contact' },
];

const SidebarNav = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        position: 'fixed',
        left: '24px',
        top: '24px',
        width: '74px',
        height: 'auto',
        maxHeight: '94vh',
        background: 'var(--sidebar-bg)',
        backdropFilter: 'blur(25px)',
        borderRadius: '40px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px 0',
        zIndex: 1000,
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        gap: '12px'
      }}
    >
      {/* Profile Picture Logo */}
      <motion.div 
        whileHover={{ scale: 1.1 }}
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          border: '2px solid var(--accent-primary)',
          overflow: 'hidden',
          marginBottom: '10px',
          cursor: 'pointer',
          padding: '3px',
          flexShrink: 0
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80" 
          alt="Profile" 
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
        />
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
        {navItems.map((item) => (
          <div 
            key={item.id} 
            style={{ position: 'relative' }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.a
              href={item.href}
              whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: hoveredItem === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
            >
              {item.icon}
            </motion.a>

            {/* Hover Tooltip Label */}
            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 74, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    transform: 'translateY(-50%)',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-color)',
                    padding: '8px 20px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 1001
                  }}
                >
                  {item.label}
                  <div style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    width: '12px',
                    height: '12px',
                    background: 'var(--text-primary)',
                    zIndex: -1
                  }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Theme Toggle & Settings at Bottom */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '15px' }}>
         <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, background: 'rgba(255,b,0,0.1)' }}
            style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                border: 'none',
                background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
            }}
         >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
         </motion.button>

         <motion.button
            onClick={() => navigate('/studio')}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.08)' }}
            style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                border: 'none',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
            }}
         >
            <Settings size={20} />
         </motion.button>
      </div>
    </motion.div>
  );
};

export default SidebarNav;
