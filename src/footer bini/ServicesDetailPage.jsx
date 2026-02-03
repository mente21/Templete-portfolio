import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, PenTool, Image, Layers, Aperture, Feather } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import mainImg from './assets/footer assets/service_images/main.jpg';
import thumb1 from './assets/footer assets/service_images/thumb1.png';
import thumb2 from './assets/footer assets/service_images/thumb2.jpg';
import thumb3 from './assets/footer assets/service_images/thumb3_new.jpg';

const ServicesDetailPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      paddingBottom: '100px'
    }}>
      {/* Navigation */}
      <nav style={{
        padding: '30px 50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          <ArrowLeft size={18} /> Home
        </button>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.5)'
        }}>
          SERVICES / CREATIVE
        </div>
        <div style={{ width: '80px' }}></div> {/* Spacer */}
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>

        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: "'Abril Fatface', serif",
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Services
          </h1>
          <p style={{
            color: '#8b5cf6',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginTop: '20px',
            fontWeight: 600
          }}>
            Art Direction & Design
          </p>
        </div>

        {/* SECTION 1: Bio & Gallery (Split Layout) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          marginBottom: '120px'
        }}>
          {/* LEFT: Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              backgroundColor: '#1a1a1a',
              marginBottom: '20px',
              overflow: 'hidden'
            }}>
              <img
                src={mainImg}
                alt="Artistic Direction"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Thumbnails */}
            <div className="thumbnails-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                <img src={thumb1} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              </div>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                <img src={thumb2} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              </div>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
                <img src={thumb3} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Info */}
          <div style={{ paddingTop: '20px' }}>
            <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2.5rem', marginBottom: '20px' }}>
              Visual Storytelling
            </h2>
            <div style={{
              fontSize: '1.5rem',
              color: '#8b5cf6',
              marginBottom: '40px',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              Custom Commissions <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>curated pricing</span>
            </div>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '40px'
            }}>
              Design is not just about how things look; it's about how they feel. I help brands and individuals find their visual voice through a blend of classical artistic principles and modern digital aesthetics. From bespoke brand identities to immersive digital art, my work bridges the gap between the canvas and the screen.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
              <button style={{
                flex: 1,
                padding: '18px',
                background: 'white',
                color: 'black',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>
                Start Collaboration
              </button>
              <button style={{
                padding: '18px 40px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}>
                Portfolio
              </button>
            </div>

            {/* Specs */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                <span style={{ fontWeight: 600 }}>Mediums</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Digital, Print, Mixed Media, Motion</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                <span style={{ fontWeight: 600 }}>Approach</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Minimalist, Surreal, Vibrant</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '15px' }}>
                <span style={{ fontWeight: 600 }}>Deliverables</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>Brand Kits, Artworks, UI Concepts</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Deep Dive (Text Left / Image Right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          marginBottom: '150px',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: "'Abril Fatface', serif" }}>
              The Creative Process
            </h3>

            <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>
                Every project begins with chaos—splashes of color, rough sketches, and abstract concepts. My process is about taming this chaos into a coherent visual narrative. I don't just design; I explore, experiment, and refine.
              </p>
              <p>
                <strong>Phase 1: Immersion.</strong> Moodboarding, texture exploration, and color theory. Finding the emotional core of the project.
              </p>
              <p>
                <strong>Phase 2: Composition.</strong> drafting visuals, balancing positive and negative space, and ensuring typographic harmony.
              </p>
              <p>
                <strong>Phase 3: Vitality.</strong> Breathing life into static designs through movement, depth, and interaction.
              </p>
            </div>
          </div>

          <div style={{ aspectRatio: '4/5', background: '#1a1a1a', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* SECTION 3: "You May Also Like" Grid (Passions) */}
        <div style={{ marginBottom: '150px' }}>
          <h3 style={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '60px',
            fontSize: '1.5rem'
          }}>
            OFFERINGS
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
            {/* Card 1 */}
            <div>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Aperture size={64} color="#8b5cf6" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Brand Identity</span>
                <span style={{ opacity: 0.5 }}>logos & systems</span>
              </div>
              <div style={{ marginBottom: '20px', opacity: 0.7 }}>Crafting memorable, timeless visual brands.</div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>View Work</button>
            </div>

            {/* Card 2 */}
            <div>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={64} color="#06b6d4" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Digital Art</span>
                <span style={{ opacity: 0.5 }}>creative</span>
              </div>
              <div style={{ marginBottom: '20px', opacity: 0.7 }}>Bespoke illustrations and 3D visuals.</div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>View Work</button>
            </div>

            {/* Card 3 */}
            <div>
              <div style={{ aspectRatio: '1/1', background: '#1a1a1a', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Feather size={64} color="#ef4444" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Editorial Design</span>
                <span style={{ opacity: 0.5 }}>layout</span>
              </div>
              <div style={{ marginBottom: '20px', opacity: 0.7 }}>Magazines, covers, and typography.</div>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>View Work</button>
            </div>
          </div>
        </div>

        {/* SECTION 4: Subscribe/Connect */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', background: '#0f0f0f' }}>
          <div style={{ padding: '80px' }}>
            <h3 style={{ fontSize: '2.5rem', fontFamily: "'Abril Fatface', serif", marginBottom: '30px' }}>
              Commission a Masterpiece
            </h3>
            <p style={{ opacity: 0.7, marginBottom: '40px', lineHeight: 1.7 }}>
              Interested in commissioning a unique piece of art or discussing a design project? Let's create something beautiful together.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input
                type="email"
                placeholder="art.lover@example.com"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '15px',
                  color: 'white',
                  fontFamily: "'Inter', sans-serif"
                }}
              />
              <button style={{
                padding: '0 30px',
                background: 'white',
                border: 'none',
                color: 'black',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                Inquire
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

      </div>

      <style>{`
        .hover-scale:hover { transform: scale(1.05); }
        @media (max-width: 1024px) {
           div[style*="grid-template-columns: 1fr 1fr"] {
             grid-template-columns: 1fr !important;
             gap: 60px !important;
           }
        }
        @media (max-width: 768px) {
          .thumbnails-grid {
             display: none !important;
          }
           /* Ensure main image takes full width but respects padding */
           div[style*="padding: 60px 40px"] {
             padding: 40px 20px !important;
           }
        }
      `}</style>
    </div>
  );
};

export default ServicesDetailPage;
