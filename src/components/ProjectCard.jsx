import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layout, Smartphone, Database, Code2 } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const getIcon = (iconName) => {
    const icons = { Layout, Smartphone, Database, Code2 };
    const IconComp = icons[iconName] || Code2;
    return <IconComp />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="card"
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {project.imageUrl && (
        <div style={{ 
          width: '100%', 
          height: '200px', 
          borderRadius: '12px', 
          marginBottom: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}>
          <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))'
          }} />
        </div>
      )}

      <div style={{ 
        width: '44px', 
        height: '44px', 
        background: 'rgba(99, 102, 241, 0.1)', 
        borderRadius: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--accent-primary)',
        marginBottom: '20px'
      }}>
        {getIcon(project.icon)}
      </div>

      <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 600 }}>{project.title}</h3>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '20px', flex: 1, lineHeight: '1.5' }}>
        {project.desc}
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {project.tech?.map((t, i) => (
          <span key={i} style={{ 
            fontSize: '0.75rem', 
            padding: '5px 12px', 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-secondary)'
          }}>{t}</span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
        <a 
          href={project.link || "#"} 
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: 'var(--accent-primary)', 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            fontSize: '0.95rem', 
            fontWeight: 600,
            width: 'fit-content'
          }}
          className="hover-underline"
        >
          Explore Project <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
