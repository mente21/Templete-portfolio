import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize2, X, Share2, Info, Heart, MessageCircle, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Enhanced Mock Data for a Full Gallery Experience
const initialArtCollection = [
    {
        id: 1,
        title: "Neon Horizons",
        description: "A cyberpunk vision of future Tokyo, blending traditional neon aesthetics with abstract glitch art forms.",
        medium: "Digital Composition",
        year: "2024",
        dimensions: "3400 x 2400px",
        src: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop",
        aspect: "landscape",
        likes: 124,
        comments: [
            { user: "AlexD", text: "The lighting here is just surreal." },
            { user: "SarahArt", text: "Love the cyberpunk vibes!" }
        ]
    },
    {
        id: 2,
        title: "Ethereal Dreams",
        description: "An AI-assisted exploration of subconscious dreamscapes, focusing on soft focus and pastel gradients.",
        medium: "AI & Photoshop",
        year: "2023",
        dimensions: "2000 x 3000px",
        src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000",
        aspect: "portrait",
        likes: 89,
        comments: []
    },
    {
        id: 3,
        title: "Cyber Solitude",
        description: "A minimalist 3D render depicting isolation in a hyper-connected world.",
        medium: "3D Render (Blender)",
        year: "2024",
        dimensions: "3840 x 2160px",
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
        aspect: "landscape",
        likes: 215,
        comments: [{ user: "RenderGod", text: "Clean topology?" }]
    },
    {
        id: 4,
        title: "Chromatic Flow",
        description: "Generative art piece created using custom algorithms to simulate liquid color dynamics.",
        medium: "Generative Art",
        year: "2023",
        dimensions: "2400 x 2400px",
        src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000",
        aspect: "square",
        likes: 67,
        comments: []
    },
    {
        id: 5,
        title: "Midnight Tokyo",
        description: "Street photography captured in Shinjuku, processed to emphasize the contrast between shadow and artificial light.",
        medium: "Photography",
        year: "2022",
        dimensions: "2000 x 3000px",
        src: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1000",
        aspect: "portrait",
        likes: 342,
        comments: [{ user: "PhotoFan", text: "Classic composition." }, { user: "Traveler", text: "Miss this place." }]
    },
    {
        id: 6,
        title: "Abstract Thoughts",
        description: "Digital painting reflecting the chaos of creative block and the breakthrough of ideas.",
        medium: "Digital Painting",
        year: "2023",
        dimensions: "3000 x 2000px",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000",
        aspect: "landscape",
        likes: 156,
        comments: []
    },
    {
        id: 7,
        title: "Silence in Noise",
        description: "Mixed media collage combining vintage magazines and digital overlays.",
        medium: "Mixed Media",
        year: "2024",
        dimensions: "2160 x 3840px",
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000",
        aspect: "portrait",
        likes: 98,
        comments: []
    }
];

const ArtGalleryPage = () => {
    const navigate = useNavigate();
    const [galleryItems, setGalleryItems] = useState(initialArtCollection);
    const [selectedArt, setSelectedArt] = useState(null);
    const [commentInput, setCommentInput] = useState("");

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedArt) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedArt]);

    const handleLike = (e, id) => {
        e.stopPropagation();
        setGalleryItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, likes: item.likes + 1, isLiked: true };
            }
            return item;
        }));
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!commentInput.trim() || !selectedArt) return;

        const newComment = { user: "You", text: commentInput };

        // Update local state for immediate UI feedback
        const updatedArt = { ...selectedArt, comments: [...selectedArt.comments, newComment] };
        setSelectedArt(updatedArt);

        // Update global list state
        setGalleryItems(prev => prev.map(item =>
            item.id === selectedArt.id ? updatedArt : item
        ));

        setCommentInput("");
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-primary)',
            fontFamily: "'Inter', sans-serif"
        }}>

            {/* --- Minimalist Navigation --- */}
            <nav style={{
                padding: '30px 5%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 50,
                background: 'var(--sidebar-bg)',
                backdropFilter: 'blur(2px)'
            }}>
                <motion.button
                    onClick={() => navigate('/')}
                    whileHover={{ x: -4, color: '#d946ef' }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    <ArrowLeft size={20} /> Back to Hub
                </motion.button>
                <div style={{
                    fontFamily: "'Abril Fatface', serif",
                    fontSize: '1.2rem',
                    letterSpacing: '1px',
                    opacity: 0.8
                }}>
                    D. ART
                </div>
            </nav>

            {/* --- Immersive Hero Section --- */}
            {/* --- Immersive Hero Section --- */}
            <header style={{
                padding: '160px 5% 120px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Glows */}
                <div style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '800px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, rgba(0,0,0,0) 60%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    filter: 'blur(40px)'
                }} />

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-title"
                    style={{
                        fontFamily: "'Abril Fatface', serif",
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)', // Reduced size
                        marginBottom: '30px',
                        lineHeight: 1.1,
                        position: 'relative',
                        zIndex: 1,
                        color: 'var(--text-primary)',
                        letterSpacing: '-1px', // Adjusted letter spacing for new text
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                >
                    <span style={{
                        background: 'linear-gradient(to bottom, #ffffff 0%, #a1a1aa 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>
                        Ideas, made visible
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{
                        width: '60px',
                        height: '2px',
                        background: 'var(--accent-primary)', // Uses theme color
                        margin: '0 auto 30px',
                        position: 'relative',
                        zIndex: 1
                    }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{
                        color: 'var(--text-secondary)',
                        maxWidth: '550px',
                        margin: '0 auto',
                        fontSize: '1.2rem',
                        lineHeight: 1.7,
                        position: 'relative',
                        zIndex: 1,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        letterSpacing: '0.5px'
                    }}
                >
                    <span style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>"Where light meets shadow."</span> <br />
                    An exploration of digital realms, abstract emotions, and the silent beauty of the future.
                </motion.p>
            </header>

            {/* --- Masonry-style Grid --- */}
            <main style={{
                padding: '0 5% 100px',
                columnCount: 3,
                columnGap: '20px',
                maxWidth: '1800px',
                margin: '0 auto'
            }}>
                <style>{`
          @media (max-width: 1024px) { main { column-count: 2 !important; } }
          @media (max-width: 600px) { main { column-count: 1 !important; } }
        `}</style>

                {galleryItems.map((art, index) => (
                    <motion.div
                        key={art.id}
                        layoutId={`art-piece-${art.id}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => setSelectedArt(art)}
                        className="art-item-container"
                        style={{
                            marginBottom: '20px',
                            breakInside: 'avoid',
                            position: 'relative',
                            borderRadius: '2px', // Sharper edges for "Museum" feel
                            overflow: 'hidden',
                            cursor: 'zoom-in'
                        }}
                    >
                        {/* Image Wrapper */}
                        <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
                            <motion.img
                                src={art.src}
                                alt={art.title}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    width: '100%',
                                    display: 'block',
                                }}
                            />
                        </div>

                        {/* Content Below Image (Outside) */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <h3 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.4rem', margin: 0, color: 'var(--text-primary)' }}>
                                    {art.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <button
                                        onClick={(e) => handleLike(e, art.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: art.isLiked ? '#ef4444' : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            transition: 'color 0.2s'
                                        }}
                                    >
                                        <Heart size={18} fill={art.isLiked ? "#ef4444" : "none"} /> {art.likes}
                                    </button>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <MessageCircle size={18} /> {art.comments.length}
                                    </div>
                                </div>
                            </div>

                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                margin: 0,
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {art.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* --- Lightbox / Detail View --- */}
            <AnimatePresence>
                {selectedArt && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 100,
                            background: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setSelectedArt(null)}
                    >
                        {/* Controls */}
                        <div style={{
                            position: 'absolute',
                            top: '30px',
                            right: '30px',
                            display: 'flex',
                            gap: '20px',
                            zIndex: 101,
                            pointerEvents: 'auto'
                        }}>
                            <button
                                onClick={(e) => { e.stopPropagation(); /* Add share logic */ }}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', opacity: 0.7 }}
                            >
                                <Share2 size={24} />
                            </button>
                            <button
                                onClick={() => setSelectedArt(null)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                            >
                                <X size={32} />
                            </button>
                        </div>

                        {/* Content Container - Split View for Desktop */}
                        <motion.div
                            layoutId={`art-piece-${selectedArt.id}`}
                            style={{
                                display: 'flex',
                                background: 'var(--card-bg)',
                                maxWidth: '1200px',
                                width: '95vw',
                                height: '85vh',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <style>{`
                  @media (max-width: 900px) {
                    .lightbox-content { flex-direction: column; overflow-y: auto !important; }
                    .lightbox-image { height: 50% !important; width: 100% !important; }
                    .lightbox-details { width: 100% !important; padding: 20px !important; }
                  }
                `}</style>

                            {/* Left: Image */}
                            <div className="lightbox-image" style={{ width: '65%', height: '100%', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={selectedArt.src}
                                    alt={selectedArt.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>

                            {/* Right: Interaction Panel */}
                            <div className="lightbox-details" style={{ width: '35%', display: 'flex', flexDirection: 'column', padding: '40px', background: 'var(--card-bg)', borderLeft: '1px solid var(--border-color)' }}>

                                {/* Metadata */}
                                <div style={{ marginBottom: '30px' }}>
                                    <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', margin: '0 0 10px 0', lineHeight: 1.1 }}>
                                        {selectedArt.title}
                                    </h2>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                                        {selectedArt.year} — {selectedArt.medium}
                                    </p>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                                    <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginTop: 0 }}>
                                        {selectedArt.description}
                                    </p>

                                    <div style={{ margin: '30px 0', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <button
                                                onClick={(e) => handleLike(e, selectedArt.id)}
                                                style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 16px', color: selectedArt.isLiked ? '#ef4444' : 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                            >
                                                <Heart size={18} fill={selectedArt.isLiked ? "#ef4444" : "none"} /> Like ({selectedArt.likes})
                                            </button>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedArt.comments.length} comments</span>
                                        </div>
                                    </div>

                                    {/* Comments List */}
                                    <div style={{ marginTop: '20px' }}>
                                        <h4 style={{ margin: '0 0 15px 0', fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Recent Comments</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {selectedArt.comments.length > 0 ? (
                                                selectedArt.comments.map((c, i) => (
                                                    <div key={i} style={{ fontSize: '0.9rem' }}>
                                                        <span style={{ fontWeight: 'bold', color: '#d946ef' }}>{c.user}</span>
                                                        <p style={{ margin: '2px 0 0 0', color: 'var(--text-secondary)' }}>{c.text}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p style={{ color: '#444', fontStyle: 'italic' }}>No comments yet. Be the first!</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Add Comment */}
                                <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                                    <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={commentInput}
                                            onChange={(e) => setCommentInput(e.target.value)}
                                            style={{
                                                flex: 1,
                                                background: 'var(--bg-color)',
                                                border: '1px solid var(--border-color)',
                                                borderRadius: '4px',
                                                padding: '12px',
                                                color: 'var(--text-primary)',
                                                fontFamily: "'Inter', sans-serif"
                                            }}
                                        />
                                        <button
                                            type="submit"
                                            style={{
                                                background: '#d946ef',
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '0 15px',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <Send size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="gallery-footer" style={{
                textAlign: 'center',
                padding: '50px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: '#444',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '2px'
            }}>
                © 2024 Visual Stories Collection
            </footer>
            <style>{`
                @media (max-width: 768px) {
                    .gallery-footer { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default ArtGalleryPage;
