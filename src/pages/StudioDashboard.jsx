import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  ArrowLeft, 
  LayoutDashboard, 
  ExternalLink,
  Save,
  X,
  Sparkles,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

const StudioDashboard = () => {
  const navigate = useNavigate();
  const { projects, loading, addProject, editProject, removeProject } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', desc: '', tech: '', imageUrl: '', link: '', icon: 'Layout'
  });

  const resetForm = () => {
    setFormData({ title: '', desc: '', tech: '', imageUrl: '', link: '', icon: 'Layout' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEditClick = (project) => {
    setFormData({
      title: project.title,
      desc: project.desc,
      tech: project.tech?.join(', ') || '',
      imageUrl: project.imageUrl || '',
      link: project.link || '',
      icon: project.icon || 'Layout'
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    if (editingId) {
      res = await editProject(editingId, formData);
    } else {
      res = await addProject(formData);
    }
    
    if (res.success) {
      resetForm();
    } else {
      alert("Error: " + res.error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this project from your portfolio?")) {
      await removeProject(id);
    }
  };

  return (
    <div className="studio-container" style={{ minHeight: '100vh', background: '#050505', color: 'white' }}>
      {/* Studio Header */}
      <div style={{ 
        padding: '20px 5%', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => navigate('/')} className="btn icon-only" style={{ padding: '10px' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            STUDIO <span className="gradient-text">DASHBOARD</span>
          </h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="btn btn-primary">
          <Plus size={18} /> New Adventure
        </button>
      </div>

      <div style={{ padding: '40px 5%', display: 'grid', gridTemplateColumns: isAdding ? '1fr 400px' : '1fr', gap: '30px' }}>
        
        {/* Main Content: Project List */}
        <section>
          <div style={{ marginBottom: '30px', display: 'flex', gap: '20px' }}>
            <div className="card" style={{ padding: '20px', flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <LayoutDashboard className="gradient-text" />
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Active Projects</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{projects.length}</div>
              </div>
            </div>
            <div className="card" style={{ padding: '20px', flex: 1, display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Trophy className="gradient-text" />
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Certificates</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{projects.filter(p => p.imageUrl).length}</div>
              </div>
            </div>
          </div>

          <div className="grid">
            {loading ? <p>Syncing Studio...</p> : projects.map((project) => (
              <div key={project.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                {project.imageUrl && (
                  <div style={{ height: '120px', width: '100%', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                    <img src={project.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <h3 style={{ marginBottom: '10px' }}>{project.title}</h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.desc}
                </p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button onClick={() => handleEditClick(project)} className="btn icon-only" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="btn icon-only" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editor Sidebar */}
        {isAdding && (
          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            className="card" 
            style={{ position: 'sticky', top: '100px', height: 'fit-content', border: '1px solid var(--accent-primary)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 className="gradient-text">{editingId ? 'Modify Build' : 'New Build'}</h3>
              <X size={20} style={{ cursor: 'pointer' }} onClick={resetForm} />
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                className="studio-input" placeholder="Title" value={formData.title} required
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
              <textarea 
                className="studio-input" placeholder="Detailed Description" value={formData.desc} required
                style={{ minHeight: '100px' }}
                onChange={e => setFormData({...formData, desc: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Tech (React, Node...)" value={formData.tech}
                onChange={e => setFormData({...formData, tech: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Image URL (Storage link)" value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
              <input 
                className="studio-input" placeholder="Live Link" value={formData.link}
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
              <button type="submit" className="btn btn-primary">
                <Save size={18} /> {editingId ? 'Update Live' : 'Publish Live'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudioDashboard;
