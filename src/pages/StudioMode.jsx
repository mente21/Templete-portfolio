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
  const [collections] = useState(['projects', 'skills', 'certificates', 'education', 'testimonials', 'home', 'about', 'contact']);
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
    const adminPass = import.meta.env.VITE_STUDIO_ADMIN_PASSWORD || 'admin123';
    if (password === adminPass) {
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

  const handleFileUpload = async (e, field = 'imageUrl') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    
    // Check if Cloudinary is configured
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
        console.log(`Starting Cloudinary upload for ${field}:`, file.name);
        const fData = new FormData();
        fData.append('file', file);
        fData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: 'POST', body: fData }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Upload failed');
            }

            const data = await response.json();
            console.log("Cloudinary Upload Success:", data.secure_url);
            
            if (field === 'gallery') {
              const currentGallery = Array.isArray(formData.gallery) ? formData.gallery : [];
              handleInputChange('gallery', [...currentGallery, data.secure_url]);
            } else {
              handleInputChange(field, data.secure_url);
            }
            
            setUploadProgress(100);
            setUploading(false);
            return;
        } catch (err) {
            console.error("Cloudinary Error, falling back to Firebase:", err);
        }
    }

    // FALLBACK: Use Firebase Storage
    console.log(`Starting Firebase Storage upload for ${field}:`, file.name);
    try {
        const storageRef = ref(storage, `studio/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            }, 
            (error) => {
                console.error("Firebase Storage Upload Error:", error);
                alert("Upload failed: " + error.message);
                setUploading(false);
            }, 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                if (field === 'gallery') {
                  const currentGallery = Array.isArray(formData.gallery) ? formData.gallery : [];
                  handleInputChange('gallery', [...currentGallery, downloadURL]);
                } else {
                  handleInputChange(field, downloadURL);
                }
                setUploading(false);
            }
        );
    } catch (error) {
        console.error("Upload initialization error:", error);
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Left Column: Basic Info */}
          <div>
            {commonFields}
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Technologies (Comma separated)</label>
              <input 
                className="studio-input" 
                value={Array.isArray(formData.tech) ? formData.tech.join(', ') : formData.tech || ''} 
                onChange={e => handleInputChange('tech', e.target.value.split(',').map(s => s.trim()))}
                placeholder="React, Firebase, Tailwind..."
              />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Live Production Link</label>
              <input 
                className="studio-input" 
                value={formData.link || ''} 
                onChange={e => handleInputChange('link', e.target.value)}
                placeholder="https://your-app.com"
              />
            </div>
            <div className="form-group">
              <label>GitHub Repository Link</label>
              <input 
                className="studio-input" 
                value={formData.github || ''} 
                onChange={e => handleInputChange('github', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          {/* Right Column: Asset Management */}
          <div>
            <div style={{ 
              padding: '30px', 
              background: 'rgba(255,107,0,0.03)', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,107,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '4px' }}>INDUSTRIAL ASSET HUB</label>
              
              {renderImageUpload('imageUrl', 'System Thumbnail (Main View)')}
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '10px 0' }}></div>
              
              {renderGalleryManager()}
            </div>
          </div>
        </div>
      );
    }

    if (selectedCollection === 'certificates') {
      return (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <div className="form-group">
                <label>Certificate Title</label>
                <input 
                  className="studio-input" 
                  value={formData.title || ''} 
                  onChange={e => handleInputChange('title', e.target.value)}
                  placeholder="e.g. AWS Solutions Architect"
                />
              </div>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Issuing Organization</label>
                <input 
                  className="studio-input" 
                  value={formData.issuer || ''} 
                  onChange={e => handleInputChange('issuer', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Verification / Credential Link</label>
                <input 
                  className="studio-input" 
                  value={formData.link || ''} 
                  onChange={e => handleInputChange('link', e.target.value)}
                  placeholder="https://bcert.me/..."
                />
              </div>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Issue Date</label>
                <input 
                  className="studio-input" 
                  type="date"
                  value={formData.date || ''} 
                  onChange={e => handleInputChange('date', e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Description / Learning Objectives</label>
                <textarea 
                  className="studio-input" 
                  value={formData.desc || ''} 
                  onChange={e => handleInputChange('desc', e.target.value)}
                  style={{ minHeight: '120px' }}
                />
              </div>
            </div>

            <div>
               <div style={{ 
                padding: '30px', 
                background: 'rgba(99, 102, 241, 0.03)', 
                borderRadius: '24px', 
                border: '1px solid rgba(99, 102, 241, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <label style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 900, letterSpacing: '4px' }}>CERTIFICATE ASSETS</label>
                {renderImageUpload('imageUrl', 'Certificate Badge (Main)')}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '10px 0' }}></div>
                {renderGalleryManager()}
              </div>
            </div>
          </div>
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
          <div className="form-group" style={{ border: '1px solid rgba(99, 102, 241, 0.2)', padding: '15px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)' }}>
            <label style={{ color: 'var(--accent-primary)', fontSize: '0.7rem' }}>DYNAMIC ECOSYSTEM DISPLAY</label>
            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '10px' }}>Only the first skill with these fields will determine the footer layout.</p>
            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>System Title</label>
              <input 
                className="studio-input" 
                value={formData.systemTitle || ''} 
                onChange={e => handleInputChange('systemTitle', e.target.value)}
                placeholder="e.g. THE INDUSTRIAL ECOSYSTEM"
              />
            </div>
            <div className="form-group">
              <label>Detailed Description</label>
              <textarea 
                className="studio-input" 
                value={formData.detailedDesc || ''} 
                onChange={e => handleInputChange('detailedDesc', e.target.value)}
                placeholder="The visual map above represents..."
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Seniority Status</label>
            <select 
              className="studio-input"
              value={formData.level || '65'} 
              onChange={e => handleInputChange('level', e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="95">ARCHITECT (Mastery)</option>
              <option value="85">SENIOR (Advanced)</option>
              <option value="65">EXPERT (Competent)</option>
            </select>
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

    if (selectedCollection === 'home') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <div className="form-group">
              <label>Main Title</label>
              <input className="studio-input" value={formData.title || ''} onChange={e => handleInputChange('title', e.target.value)} placeholder="CREATIVE ENGINEER" />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Name / Roles (Comma separated)</label>
              <input className="studio-input" value={formData.roles || ''} onChange={e => handleInputChange('roles', e.target.value)} placeholder="FRONTEND ARCHITECT, UI/UX DESIGNER" />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Description / Mission Statement</label>
              <textarea className="studio-input" value={formData.desc || ''} onChange={e => handleInputChange('desc', e.target.value)} placeholder="Specializing in premium high-performance digital architectures..." style={{ minHeight: '120px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'rgba(255,b,0,0.02)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              {renderImageUpload('imageUrl', 'Hero Main Image')}
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,b,0,0.02)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              {renderImageUpload('sidebarImage', 'Sidebar Profile Image')}
            </div>
          </div>
        </div>
      );
    }

    if (selectedCollection === 'about') {
      return (
        <>
          <div className="form-group">
            <label>Description</label>
            <textarea className="studio-input" value={formData.desc || ''} onChange={e => handleInputChange('desc', e.target.value)} style={{ minHeight: '150px' }} />
          </div>
          <div className="form-group">
            <label>Stats (e.g. 5+ YEARS, 99% UPTIME - Comma separated)</label>
            <input className="studio-input" value={formData.stats || ''} onChange={e => handleInputChange('stats', e.target.value)} placeholder="5+ YEARS, 40+ BUILDS" />
          </div>
          {renderImageUpload()}
        </>
      );
    }

    if (selectedCollection === 'education') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Left Column: Academic Info */}
          <div>
            <div className="form-group">
              <label>School / University Name</label>
              <input 
                className="studio-input" 
                value={formData.school || ''} 
                onChange={e => handleInputChange('school', e.target.value)}
                placeholder="e.g. Stanford University"
              />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Degree / Qualification Title</label>
              <input 
                className="studio-input" 
                value={formData.degree || ''} 
                onChange={e => handleInputChange('degree', e.target.value)}
                placeholder="e.g. B.Sc. in Computer Science"
              />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Academic Period</label>
              <input 
                className="studio-input" 
                value={formData.year || ''} 
                onChange={e => handleInputChange('year', e.target.value)}
                placeholder="e.g. 2020 - 2024"
              />
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label>Academic Description / Highlights</label>
              <textarea 
                className="studio-input" 
                value={formData.desc || ''} 
                onChange={e => handleInputChange('desc', e.target.value)}
                placeholder="Focus on AI, High-Performance Systems..."
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>

          {/* Right Column: Asset Management */}
          <div>
            <div style={{ 
              padding: '30px', 
              background: 'rgba(255,107,0,0.03)', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,107,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <label style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '4px' }}>INDUSTRIAL ASSET HUB</label>
              
              {renderImageUpload('image', 'Academic Badge / Main Photo')}
              
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '10px 0' }}></div>
              
              {renderGalleryManager()}
            </div>
          </div>
        </div>
      );
    }

    if (selectedCollection === 'testimonials') {
      return (
        <>
          <div className="form-group">
            <label>Full Name</label>
            <input className="studio-input" value={formData.name || ''} onChange={e => handleInputChange('name', e.target.value)} placeholder="e.g. Meles Tesfaye" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Social Handle (e.g. @meles)</label>
              <input className="studio-input" value={formData.handle || ''} onChange={e => handleInputChange('handle', e.target.value)} placeholder="@username" />
            </div>
            <div className="form-group">
              <label>Social Profile Link</label>
              <input className="studio-input" value={formData.socialLink || ''} onChange={e => handleInputChange('socialLink', e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="form-group">
            <label>Testimonial Quote</label>
            <textarea className="studio-input" value={formData.quote || ''} onChange={e => handleInputChange('quote', e.target.value)} placeholder="Their work was exceptional..." style={{ minHeight: '120px' }} />
          </div>
        </>
      );
    }

    if (selectedCollection === 'contact') {
      return (
        <>
          <div className="form-group">
            <label>Email Address</label>
            <input className="studio-input" value={formData.email || ''} onChange={e => handleInputChange('email', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input className="studio-input" value={formData.phone || ''} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+1 234 567 890" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="studio-input" value={formData.location || ''} onChange={e => handleInputChange('location', e.target.value)} placeholder="London, UK" />
          </div>
          <div className="form-group">
            <label>Github URL</label>
            <input className="studio-input" value={formData.github || ''} onChange={e => handleInputChange('github', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Linkedin URL</label>
            <input className="studio-input" value={formData.linkedin || ''} onChange={e => handleInputChange('linkedin', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Youtube URL</label>
            <input className="studio-input" value={formData.youtube || ''} onChange={e => handleInputChange('youtube', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Facebook URL</label>
            <input className="studio-input" value={formData.facebook || ''} onChange={e => handleInputChange('facebook', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Fiverr URL</label>
            <input className="studio-input" value={formData.fiverr || ''} onChange={e => handleInputChange('fiverr', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Instagram URL</label>
            <input className="studio-input" value={formData.instagram || ''} onChange={e => handleInputChange('instagram', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Twitter URL</label>
            <input className="studio-input" value={formData.twitter || ''} onChange={e => handleInputChange('twitter', e.target.value)} />
          </div>
          <div className="form-group">
            <label>TikTok URL</label>
            <input className="studio-input" value={formData.tiktok || ''} onChange={e => handleInputChange('tiktok', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Telegram URL</label>
            <input className="studio-input" value={formData.telegram || ''} onChange={e => handleInputChange('telegram', e.target.value)} />
          </div>
        </>
      );
    }

    return commonFields;
  };

  const renderImageUpload = (field = 'imageUrl', label = 'Project / Certificate Image') => (
    <div className="form-group">
      <label>{label}</label>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        background: 'rgba(255,255,255,0.02)', 
        padding: '20px', 
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Preview Thumbnail */}
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '12px', 
          background: 'rgba(0,0,0,0.3)', 
          overflow: 'hidden', 
          flexShrink: 0,
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {formData[field] ? (
            <img src={formData[field]} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <ImageIcon size={30} style={{ opacity: 0.2 }} />
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            className="studio-input" 
            placeholder="Paste Image URL..." 
            value={formData[field] || ''} 
            onChange={e => handleInputChange(field, e.target.value)}
          />
          <div 
            className="upload-btn"
            style={{
              padding: '10px',
              textAlign: 'center',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px dashed #6366f1',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              color: '#6366f1'
            }}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleFileUpload(e, field);
              input.click();
            }}
          >
            {uploading ? <Loader2 className="animate-spin" size={16} /> : <>UPLOAD NEW FILE</>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGalleryManager = () => (
    <div className="form-group" style={{ marginTop: '20px' }}>
      <label>Project Gallery (Multiple Screenshots)</label>
      <div style={{ 
        background: 'rgba(255,107,0,0.03)', 
        border: '1px solid rgba(255,107,0,0.1)', 
        borderRadius: '20px', 
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
           {Array.isArray(formData.gallery) && formData.gallery.map((img, i) => (
             <div key={i} style={{ position: 'relative', height: '90px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
               <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
               <button 
                 onClick={() => {
                   const newGallery = formData.gallery.filter((_, idx) => idx !== i);
                   handleInputChange('gallery', newGallery);
                 }}
                 style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
               >
                 <X size={14} />
               </button>
             </div>
           ))}
           <div 
             onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => handleFileUpload(e, 'gallery');
                input.click();
             }}
             style={{ height: '90px', borderRadius: '10px', border: '2px dashed rgba(255,107,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--accent-primary)', gap: '5px', background: 'rgba(255,107,0,0.05)' }}
           >
             <Plus size={20} />
             <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>ADD IMAGE</span>
           </div>
        </div>
        
        <div className="form-group">
          <label style={{ fontSize: '0.7rem' }}>Bulk Add (URLs separated by comma)</label>
          <textarea 
            className="studio-input"
            value={Array.isArray(formData.gallery) ? formData.gallery.join(', ') : formData.gallery || ''}
            onChange={e => handleInputChange('gallery', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="https://image1.jpg, https://image2.jpg"
            style={{ fontSize: '0.8rem', minHeight: '60px' }}
          />
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

      {/* Main Content Area - Contents hidden until authenticated to protect studio data */}
      <main style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
        
        {!isAuthenticated ? (
          /* Auth Barrier Overlay for Controls - Now the only visible part when not logged in */
          <div style={{
            maxWidth: '500px', margin: '100px auto', padding: '40px',
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
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '0 10%' }}
          >
            {/* Header Section */}
            <section style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Experience & <span className="gradient-text">Ecosystem</span></h1>
              <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7 }}>
                Complete archive of technical ventures, professional milestones, and digital architecture. 
                This data powers the Mente AI assistant.
              </p>
            </section>

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
                      background: selectedCollection === col ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'var(--card-bg)',
                      border: selectedCollection === col ? 'none' : '1px solid var(--border-color)',
                      borderRadius: '12px',
                      color: selectedCollection === col ? 'white' : 'var(--text-primary)',
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openForm()}
                className="btn btn-primary"
                style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={20} /> Add New {selectedCollection.slice(0, -1)}
              </motion.button>
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

                    {/* Content Rendering */}
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
          </motion.div>
        )}
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
                width: '100%', maxWidth: '1000px', background: 'rgba(15, 15, 25, 0.98)',
                border: '1px solid rgba(255,107,0,0.2)', borderRadius: '30px',
                padding: '50px', position: 'relative', maxHeight: '90vh', overflowY: 'auto',
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
