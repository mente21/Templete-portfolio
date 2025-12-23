import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layout, Smartphone, Database, Code2, Plus } from 'lucide-react';

const ProjectCard = ({ project, index, onExpand }) => {
  const getIcon = (iconName) => {
    const icons = { Layout, Smartphone, Database, Code2 };
    const IconComp = icons[iconName] || Code2;
    return <IconComp size={20} />;
  };

  // Color themes for the cards - using more subtle professional colors
  const themes = [
    { color: '#ff6b00', glow: 'rgba(255, 107, 0, 0.2)' }, 
    { color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.2)' },
    { color: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.2)' },
  ];
  const theme = themes[index % themes.length];

  return (
    <motion.div 
      layoutId={`card-${project.id || index}`}
      onClick={() => onExpand(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      viewport={{ once: true }}
      style={{ 
        background: 'var(--card-bg)',
        backdropFilter: 'var(--glass-blur)',
        borderRadius: '32px',
        padding: '24px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Hover Glow - Top Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
            position: 'absolute',
            top: '-20%',
            right: '-20%',
            width: '60%',
            height: '60%',
            background: `radial-gradient(circle, ${theme.color}15 0%, transparent 70%)`,
            zIndex: 0,
            pointerEvents: 'none'
        }}
      />

      {/* Image Container with Zoom Effect */}
      <div style={{ 
        width: '100%', 
        height: '220px', 
        borderRadius: '24px', 
        marginBottom: '24px',
        overflow: 'hidden',
        background: 'var(--input-bg)',
        position: 'relative',
        border: '1px solid var(--border-color)',
        zIndex: 1
      }}>
        <motion.img 
          layoutId={`image-${project.id || index}`}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
          src={project.imageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600"} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        
        {/* Overlay buttons that show on hover */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.3s ease'
          }}
        >
          <div style={{ 
            background: 'white', 
            color: 'black', 
            padding: '12px 24px', 
            borderRadius: '100px', 
            fontSize: '0.8rem', 
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            VIEW DETAILS <Plus size={16} />
          </div>
        </motion.div>
      </div>

      <div style={{ flex: 1, padding: '0 8px', position: 'relative', zIndex: 1 }}>
        <motion.h3 
          layoutId={`title-${project.id || index}`}
          style={{ 
            fontSize: '1.6rem', 
            marginBottom: '12px', 
            fontWeight: 800, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            fontFamily: 'Anton'
          }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
            layoutId={`desc-${project.id || index}`}
            style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-secondary)', 
              lineHeight: '1.6',
              marginBottom: '24px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
        >
          {project.desc}
        </motion.p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingBottom: '8px', position: 'relative', zIndex: 1 }}>
         {project.tags?.slice(0, 3).map((tag, i) => (
           <span key={i} style={{ 
               fontSize: '0.65rem', 
               padding: '4px 12px', 
               background: 'var(--border-color)', 
               borderRadius: '100px',
               color: 'var(--text-secondary)',
               fontWeight: 800,
               letterSpacing: '1px',
               textTransform: 'uppercase'
           }}>
             {tag}
           </span>
         ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
