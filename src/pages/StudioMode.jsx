import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Github, Mail, Linkedin, Plus, Edit3, Trash2, Save, X, 
  Eye, LogOut, Database, Table, Image as ImageIcon, Upload, Loader2, CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { db, storage } from '../lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// CLOUDINARY CONFIGURATION (Fetched from .env)
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const StudioMode = () => {
  const navigate = useNavigate();
  const { projects, loading: projectsLoading } = useProjects();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Dynamic collections
  const [collections] = useState(['projects', 'skills', 'certificates', 'experience']);
  const [selectedCollection, setSelectedCollection] = useState('projects');
  const [collectionData, setCollectionData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef(null);

  // Check auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('studioAuth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Set page title for SEO/Chatbase
  useEffect(() => {
    document.title = "Mente's Portfolio Studio - Experience & Projects";
  }, []);

  // Load data for the selected collection
  useEffect(() => {
    loadCollectionData(selectedCollection);
  }, [selectedCollection]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('studioAuth', 'authenticated');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('studioAuth');
  };

  const loadCollectionData = async (collectionName) => {
    console.log(`Fetching collection: ${collectionName}...`);
    setLoading(true);
    try {
      const colRef = collection(db, collectionName);
      const querySnapshot = await getDocs(colRef);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`Fetched ${data.length} items from ${collectionName}`);
      setCollectionData(data);
    } catch (error) {
      console.error(`Error loading ${collectionName}:`, error);
      alert(`Firestore Error: ${error.message}. Please check your database rules.`);
      setCollectionData([]);
    }
    setLoading(false);
  };

  const openForm = (item = null) => {
    if (!isAuthenticated) return;
    if (item) {
      setFormData(item);
      setEditingId(item.id);
    } else {
      setFormData({});
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeForm = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingId(null);
    setUploadProgress(0);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    
    console.log("Starting Cloudinary upload for:", file.name);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Upload failed');
      }

      const data = await response.json();
      console.log("Cloudinary Upload Success:", data.secure_url);
      
      handleInputChange('imageUrl', data.secure_url);
      setUploadProgress(100);
      setUploading(false);
    } catch (err) {
      console.error("Cloudinary Error:", err);
      alert("Cloudinary Upload Failed: " + err.message + "\n\nTip: Ensure your Cloudinary Preset is set to 'Unsigned' in settings.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        const { id, ...dataToUpdate } = formData;
        const docRef = doc(db, selectedCollection, editingId);
        await updateDoc(docRef, dataToUpdate);
      } else {
        await addDoc(collection(db, selectedCollection), formData);
      }
      
      closeForm();
      loadCollectionData(selectedCollection);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) return;
    if (window.confirm('Delete this item permanently?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, selectedCollection, id));
        loadCollectionData(selectedCollection);
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error: ' + error.message);
      }
      setLoading(false);
    }
  };

  // Helper to render form fields based on collection
  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="form-group">
          <label>Title</label>
          <input 
            className="studio-input" 
            value={formData.title || ''} 
            onChange={e => handleInputChange('title', e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            className="studio-input" 
            value={formData.desc || ''} 
            onChange={e => handleInputChange('desc', e.target.value)}
            placeholder="Enter description"
            style={{ minHeight: '100px' }}
            required
          />
        </div>
      </>
    );

    if (selectedCollection === 'projects') {
      return (
        <>
          {commonFields}
          <div className="form-group">
            <label>Technologies (Comma separated)</label>
            <input 
              className="studio-input" 
              value={Array.isArray(formData.tech) ? formData.tech.join(', ') : formData.tech || ''} 
              onChange={e => handleInputChange('tech', e.target.value.split(',').map(s => s.trim()))}
              placeholder="React, Firebase, etc."
            />
          </div>
          <div className="form-group">
            <label>Live Link</label>
            <input 
              className="studio-input" 
              value={formData.link || ''} 
              onChange={e => handleInputChange('link', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label>GitHub Link</label>
            <input 
              className="studio-input" 
              value={formData.github || ''} 
              onChange={e => handleInputChange('github', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>
          {renderImageUpload()}
        </>
      );
    }

    if (selectedCollection === 'certificates') {
      return (
        <>
          {commonFields}
          <div className="form-group">
            <label>Issuer</label>
            <input 
              className="studio-input" 
              value={formData.issuer || ''} 
              onChange={e => handleInputChange('issuer', e.target.value)}
              placeholder="e.g. Google, Udemy"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input 
              className="studio-input" 
              type="date"
              value={formData.date || ''} 
              onChange={e => handleInputChange('date', e.target.value)}
            />
          </div>
          {renderImageUpload()}
        </>
      );
    }

    if (selectedCollection === 'experience') {
      return (
        <>
          {commonFields}
          <div className="form-group">
            <label>Company/Organization</label>
            <input 
              className="studio-input" 
              value={formData.company || ''} 
              onChange={e => handleInputChange('company', e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          </div>
          <div className="form-group">
            <label>Period</label>
            <input 
              className="studio-input" 
              value={formData.period || ''} 
              onChange={e => handleInputChange('period', e.target.value)}
              placeholder="e.g. 2021 - Present"
            />
          </div>
        </>
      );
    }

    if (selectedCollection === 'skills') {
      return (
        <>
          <div className="form-group">
            <label>Skill Name</label>
            <input 
              className="studio-input" 
              value={formData.name || ''} 
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder="e.g. React"
              required
            />
          </div>
          <div className="form-group">
            <label>Level (0-100)</label>
            <input 
              className="studio-input" 
              type="number"
              value={formData.level || ''} 
              onChange={e => handleInputChange('level', e.target.value)}
              placeholder="e.g. 90"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              className="studio-input"
              value={formData.category || ''}
              onChange={e => handleInputChange('category', e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools</option>
              <option value="ai">AI</option>
            </select>
          </div>
        </>
      );
    }

    return commonFields;
  };

  const renderImageUpload = () => (
    <div className="form-group">
      <label>Project / Certificate Image</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Option A: Manual URL Input (Works without Paid Plan) */}
        <input 
          className="studio-input" 
          placeholder="Paste Image URL (e.g. https://...)" 
          value={formData.imageUrl || ''} 
          onChange={e => handleInputChange('imageUrl', e.target.value)}
        />
        
        <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>— OR —</div>

        {/* Option B: Upload (Requires Firebase Storage Setup) */}
        <div 
          style={{
            border: '2px dashed rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*"
            onChange={handleFileUpload}
          />
          
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <Loader2 className="animate-spin" size={32} color="#6366f1" />
              <p>Uploading... {Math.round(uploadProgress)}%</p>
            </div>
          ) : formData.imageUrl && formData.imageUrl.startsWith('http') ? (
            <div style={{ position: 'relative' }}>
              <img 
                src={formData.imageUrl} 
                alt="Preview" 
                style={{ width: '100%', maxHeight: '120px', objectFit: 'contain', borderRadius: '8px' }} 
              />
              <p style={{ marginTop: '10px', fontSize: '0.8rem', color: '#6366f1' }}>Current visual preview</p>
            </div>
          ) : (
            <div>
              <Upload size={32} style={{ opacity: 0.3, marginBottom: '10px' }} />
              <p style={{ opacity: 0.6 }}>Click to upload file (Cloudinary Free)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      
      {/* Navigation */}
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
          <span style={{ 
            marginLeft: '12px',
            fontSize: '0.7rem',
            padding: '4px 12px',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            borderRadius: '100px',
            color: 'var(--accent-primary)'
          }}>
            STUDIO
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn"
                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                <LogOut size={18} /> Logout
              </motion.button>
            </>
          ) : (
            <button onClick={() => navigate('/')} className="btn"><Eye size={18} /> Exit Studio</button>
          )}
        </div>
      </nav>

      {/* Main Content Area - Always Loaded for Chatbase (but controls hidden if !auth) */}
      <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
        
        {/* Header Section */}
        <section style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Experience & <span className="gradient-text">Ecosystem</span></h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7 }}>
            Complete archive of technical ventures, professional milestones, and digital architecture. 
            This data powers the Mente AI assistant.
          </p>
        </section>

        {/* Auth Barrier Overlay for Controls */}
        {!isAuthenticated && (
          <div style={{
            maxWidth: '500px', margin: '40px auto', padding: '40px',
            background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '24px',
            textAlign: 'center'
          }}>
            <Database size={40} className="gradient-text" style={{ marginBottom: '20px' }} />
            <h3 style={{ marginBottom: '10px' }}>Admin Login</h3>
            <p style={{ opacity: 0.6, marginBottom: '30px', fontSize: '0.9rem' }}>Enter security key to enable management controls.</p>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="password" 
                className="studio-input" 
                style={{ textAlign: 'center' }}
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ height: '50px' }}>Access Dashboard</button>
            </form>
          </div>
        )}

        {/* Collection Selector & Add Button */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '20px', marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
            {collections.map(col => (
              <button
                key={col}
                onClick={() => setSelectedCollection(col)}
                style={{
                  padding: '10px 20px',
                  background: selectedCollection === col ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255, 255, 255, 0.05)',
                  border: selectedCollection === col ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: '0.3s'
                }}
              >
                <Table size={16} /> {col}
              </button>
            ))}
          </div>

          {isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openForm()}
              className="btn btn-primary"
              style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={20} /> Add New {selectedCollection.slice(0, -1)}
            </motion.button>
          )}
        </div>

        {/* Data Grid / List */}
        <div style={{ position: 'relative' }}>
          {(loading || projectsLoading) && (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <Loader2 className="animate-spin" size={40} color="#6366f1" />
            </div>
          )}

          {!(loading || projectsLoading) && (selectedCollection === 'projects' ? projects : collectionData).length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px', opacity: 0.4 }}>
              <Database size={60} style={{ marginBottom: '20px' }} />
              <p>No data found in {selectedCollection}</p>
            </div>
          )}

          <div className="grid">
            {(selectedCollection === 'projects' ? projects : collectionData).map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card"
                style={{ 
                  position: 'relative', overflow: 'hidden', padding: '30px',
                  display: 'flex', flexDirection: 'column', gap: '15px'
                }}
              >
                {/* Management Controls Overlay */}
                {isAuthenticated && (
                  <div style={{
                    position: 'absolute', top: '20px', right: '20px', zIndex: 10,
                    display: 'flex', gap: '10px'
                  }}>
                    <button 
                      onClick={() => openForm(item)}
                      style={{ 
                        background: 'rgba(99, 102, 241, 0.2)', border: 'none', 
                        borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#6366f1'
                      }}
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      style={{ 
                        background: 'rgba(239, 68, 68, 0.2)', border: 'none', 
                        borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#ef4444'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                {/* Content Rendering for AI Crawling */}
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-primary)', marginBottom: '10px' }}>
                    {item.title || item.name || "Untitled Entry"}
                  </h3>
                  
                  {item.company && <p style={{ fontWeight: 600, opacity: 0.9 }}>{item.company}</p>}
                  {item.issuer && <p style={{ fontWeight: 600, opacity: 0.9 }}>{item.issuer}</p>}
                  {item.period && <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{item.period}</p>}
                  {item.date && <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{item.date}</p>}

                  <p style={{ marginTop: '15px', lineHeight: '1.6', opacity: 0.8 }}>{item.desc}</p>
                  
                  {item.tech && item.tech.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '15px' }}>
                      {item.tech.map((t, i) => (
                        <span key={i} style={{ 
                          fontSize: '0.75rem', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', 
                          borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.imageUrl && (
                    <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', height: '150px' }}>
                      <img src={item.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Centered Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 9999, padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeForm}
              style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                width: '100%', maxWidth: '600px', background: 'rgba(15, 15, 25, 0.95)',
                border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '24px',
                padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
              }}
            >
              <button 
                onClick={closeForm}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <h2 className="gradient-text" style={{ marginBottom: '30px', fontSize: '1.8rem' }}>
                {editingId ? 'Edit Entry' : `Add to ${selectedCollection}`}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {renderFormFields()}

                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ flex: 2, height: '50px' }}
                    disabled={loading || uploading}
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> {editingId ? 'Update Entry' : 'Create Entry'}</>}
                  </button>
                  <button type="button" onClick={closeForm} className="btn" style={{ flex: 1 }}>Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .form-group { display: flex; flexDirection: column; gap: 8px; }
        .form-group label { font-size: 0.9rem; font-weight: 600; opacity: 0.7; color: #6366f1; }
        .studio-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 1rem;
          transition: 0.3s;
          width: 100%;
        }
        .studio-input:focus { border-color: #6366f1; outline: none; background: rgba(255, 255, 255, 0.08); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default StudioMode;
