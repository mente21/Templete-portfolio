import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Mail, Linkedin, Sparkles } from 'lucide-react';

// Modules
import ProjectCard from './components/ProjectCard';
import ChatbaseAssistant from './components/ChatbaseAssistant';
import StudioMode from './pages/StudioMode';

// Hooks
import { useProjects } from './hooks/useProjects';
import { useCollection } from './hooks/useCollection';

const PortfolioHome = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { data: skills, loading: skillsLoading } = useCollection('skills');
  const { data: experience, loading: expLoading } = useCollection('experience');
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      
      <nav style={{ 
        padding: '24px 10%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-1.5px' }}>
          MENTE<span className="gradient-text">.CO</span>
        </div>
        <div style={{ display: 'flex', gap: '32px', fontWeight: 600, alignItems: 'center' }}>
          <a href="#work" className="nav-link">Portfolio</a>
          <button 
            onClick={() => navigate('/studio')}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--border-color)', 
              color: 'white', 
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Access Studio
          </button>
          <a href="#contact" className="btn btn-primary" style={{ padding: '10px 24px' }}>Let's Build</a>
        </div>
      </nav>

      <section style={{ paddingTop: '180px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', 
            background: 'rgba(99, 102, 241, 0.1)', borderRadius: '100px', marginBottom: '32px', 
            border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--accent-primary)' 
          }}>
            <Sparkles size={18} />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Available for Freelance & Teams
            </span>
          </div>
          <h1>Engineering <br /><span className="gradient-text">Beautiful Intelligence</span></h1>
          <p style={{ maxWidth: '650px', marginBottom: '48px', fontSize: '1.3rem', opacity: 0.8 }}>
            I build performant web ecosystems that merge cutting-edge AI logic with premium, minimal design aesthetics.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#work" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>View Ecosystem</a>
            <a href="https://github.com" className="btn" style={{ padding: '16px 32px' }}><Github size={22} /> Explore Code</a>
          </div>
        </motion.div>
      </section>

      <section id="work" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>Recent <span className="gradient-text">Ventures</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>A selection of my latest technical explorations.</p>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
            {projects.length} Total Builds
          </div>
        </div>

        {projectsLoading ? (
          <div style={{ padding: '100px 0', textAlign: 'center' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ display: 'inline-block' }}>
              <Sparkles size={40} className="gradient-text" />
            </motion.div>
          </div>
        ) : (
          <div className="grid">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>Technical <span className="gradient-text">Ecosystem</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Tools and paradigms I master to build digital products.</p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {skills.map((skill, idx) => (
            <motion.div 
              key={skill.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
              style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{skill.name}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase' }}>{skill.category}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ height: '100%', background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))' }}
                />
              </div>
              <div style={{ marginTop: '8px', fontSize: '0.85rem', textAlign: 'right', opacity: 0.5 }}>{skill.level}% Proficiency</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '10px' }}>Professional <span className="gradient-text">Arc</span></h2>
          <p style={{ color: 'var(--text-secondary)' }}>Timeline of my technical contributions and growth.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}
            >
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{exp.title}</h3>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '16px' }}>{exp.company}</div>
                <p style={{ fontSize: '1rem', opacity: 0.8 }}>{exp.desc}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontWeight: 700, fontSize: '0.9rem' }}>
                  {exp.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer id="contact" style={{ padding: '120px 10% 60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '32px' }}>Have a <span className="gradient-text">Concept?</span></h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '80px' }}>
          <a href="mailto:hello@mente.co" className="btn btn-primary" style={{ padding: '16px 32px' }}><Mail size={22} /> Send Email</a>
          <a href="#" className="btn icon-only" style={{ padding: '16px' }}><Linkedin size={24} /></a>
          <a href="#" className="btn icon-only" style={{ padding: '16px' }}><Github size={24} /></a>
        </div>
        <div style={{ opacity: 0.5, fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '40px' }}>
          © 2024 MENTE STUDIO • POWERED BY AI LOGIC • DESIGNED IN GLASS
        </div>
      </footer>

      <ChatbaseAssistant />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/studio" element={<StudioMode />} />
      </Routes>
    </Router>
  );
}

export default App;
