import React, { useEffect, useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { useCollection } from '../hooks/useCollection';

/**
 * Enhanced Chatbase AI Assistant with Dynamic Firebase Data
 * 
 * This component combines:
 * - Chatbase for reliable chat UI (no quota issues)
 * - Firebase for real-time project data
 * - Dynamic context injection so AI always knows latest projects
 * 
 * How it works:
 * 1. Fetches latest projects from Firebase
 * 2. Injects them into Chatbase conversations
 * 3. AI always has up-to-date information
 */

const ChatbaseAssistant = () => {
  const { projects, loading: pLoading } = useProjects();
  const { data: skills, loading: sLoading } = useCollection('skills');
  const { data: experience, loading: eLoading } = useCollection('experience');
  const [chatbaseReady, setChatbaseReady] = useState(false);

  useEffect(() => {
    // Chatbase configuration
    window.embeddedChatbotConfig = {
      chatbotId: "iewClPvy5zF7KuKHOcrUR",
      domain: "www.chatbase.co"
    };

    // Load Chatbase embed script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', 'iewClPvy5zF7KuKHOcrUR');
    script.defer = true;
    
    script.onload = () => {
      setChatbaseReady(true);
    };
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Inject dynamic project data into Chatbase when ready
  useEffect(() => {
    const loading = pLoading || sLoading || eLoading;

    if (chatbaseReady && !loading) {
      // 1. Build project context
      const projectContext = projects.map((p, idx) => 
        `- ${p.title}: ${p.desc} (Tech: ${Array.isArray(p.tech) ? p.tech.join(', ') : p.tech})`
      ).join('\n');

      // 2. Build Skills context
      const skillsContext = skills.map(s => 
        `- ${s.name}: ${s.level}% proficient (${s.category})`
      ).join('\n');

      // 3. Build Experience context
      const expContext = experience.map(e => 
        `- ${e.title} at ${e.company} (${e.period}): ${e.desc}`
      ).join('\n');

      // 4. Build Identity Summary (From Landing Page)
      const identitySummary = `
Mente is a Full-Stack Developer & AI Engineer.
Specialization: Building performant web ecosystems that merge cutting-edge AI logic with premium, minimal design aesthetics.
Tagline: "Engineering Beautiful Intelligence"
Email: hello@mente.co
Availability: Available for freelance projects and team collaborations.
Status: Current Portfolio Status is LIVE with dynamic data.
      `;

      // Inject EVERYTHING into Chatbase
      // This works even on localhost!
      if (window.chatbase) {
        window.chatbase('setCustomData', {
          identitySummary: identitySummary,
          fullEcosystem: `
PROJECTS ARCHIVE:
${projectContext}

TECHNICAL SKILLS:
${skillsContext}

PROFESSIONAL EXPERIENCE:
${expContext}
          `,
          projectCount: projects.length,
          lastUpdated: new Date().toLocaleTimeString()
        });

        // Set dynamic welcome
        window.chatbase('setInitialMessages', [
          {
            role: 'assistant',
            content: `Hi! I'm Mente's AI. I currently track ${projects.length} projects and ${skills.length} core technical skills. How can I assist you today?`
          }
        ]);
      }
    }
  }, [chatbaseReady, pLoading, sLoading, eLoading, projects, skills, experience]);

  // Chatbase handles the UI automatically
  return null;
};

export default ChatbaseAssistant;
