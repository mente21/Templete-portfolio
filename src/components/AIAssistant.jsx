import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiModel } from '../lib/firebase';

const AIAssistant = ({ contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your AI concierge. Ask me anything about my creator's skills, projects, or availability." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Retry logic with exponential backoff
    const maxRetries = 3;
    let retryCount = 0;
    let delay = 1000; // Start with 1 second

    const attemptRequest = async () => {
      try {
        const projectList = contextData?.projects?.map(p => 
          `- ${p.title}: ${p.desc} (Tech: ${p.tech?.join(', ')})`
        ).join('\n') || "Currently no projects listed.";

        const systemInstructions = `You are "Mente's" Professional Portfolio AI Assistant.
        
        PORTFOLIO DATA:
        ${projectList}
        
        INSTRUCTIONS:
        1. Use the data above to answer questions.
        2. If asked about something not list, say you'll check with Mente.
        3. Be concise and tech-forward.
        4. Avoid mentioning you are an AI unless asked.`;

        // Vertex AI for Firebase uses a slightly different format for the prompt
        const result = await aiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: `${systemInstructions}\n\nVisitor Question: ${input}` }] }]
        });
        
        const response = await result.response;
        const text = response.text();

        setMessages(prev => [...prev, { role: 'ai', content: text }]);
      } catch (error) {
        console.error("AI ERROR:", error);
        
        // Check if it's a quota error (429)
        const isQuotaError = error.message?.includes('429') || error.message?.includes('quota');
        
        if (isQuotaError && retryCount < maxRetries) {
          retryCount++;
          setMessages(prev => [...prev, { 
            role: 'ai', 
            content: `⏳ Rate limit reached. Retrying in ${delay/1000} seconds... (Attempt ${retryCount}/${maxRetries})` 
          }]);
          
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
          return attemptRequest(); // Retry
        } else if (isQuotaError) {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            content: `🚫 **API Quota Exceeded**\n\nThe free tier limit has been reached. Please try again later or consider:\n\n1. Waiting 24 hours for quota reset\n2. Upgrading to a paid plan in Google Cloud Console\n3. Using a different API key\n\nProject: my-ai-portfolio-96c91` 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            content: `⚠️ Connection issue: ${error.message}\n\nPlease ensure the Gemini API is properly configured.` 
          }]);
        }
      } finally {
        setIsTyping(false);
      }
    };

    await attemptRequest();
  };

  return (
    <>
      <motion.div 
        className="ai-bubble"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X color="white" /> : <Bot color="white" />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="chat-window"
          >
            <div className="chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={18} className="gradient-text" />
                <span style={{ fontWeight: 600 }}>AI Concierge</span>
              </div>
              <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </div>

            <div className="chat-messages" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isTyping && <div className="message ai">Analyzing...</div>}
            </div>

            <div className="chat-input" style={{ padding: '15px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Message the assistant..." 
                value={input}
                style={{ flex: 1, background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px', color: 'white' }}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                className="btn btn-primary" 
                style={{ padding: '10px' }}
                onClick={handleSend}
                disabled={isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
