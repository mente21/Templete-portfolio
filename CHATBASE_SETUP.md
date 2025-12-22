# 🤖 Chatbase AI Assistant Setup Guide

## Why Chatbase?

✅ **No API Quota Issues** - Chatbase handles all backend infrastructure  
✅ **Free Tier** - Generous free plan for portfolio sites  
✅ **Easy Setup** - Just 5 minutes to integrate  
✅ **Customizable** - Match your portfolio design  
✅ **Smart Training** - Upload documents or paste text about yourself  

---

## 📋 Step-by-Step Setup

### Step 1: Create Your Chatbase Account

1. Go to **[https://www.chatbase.co/](https://www.chatbase.co/)**
2. Click **"Try for Free"** (top right)
3. Sign up with Google or Email (no credit card required)

### Step 2: Create Your AI Chatbot

1. After logging in, click **"Create Chatbot"** or **"New Chatbot"**
2. **Name your chatbot**: `Mente's Portfolio Assistant`
3. **Choose data source**:
   - Option A: **Upload files** (PDF, DOCX, TXT with your resume/portfolio)
   - Option B: **Paste text** (copy your bio, skills, projects)
   - Option C: **Website URL** (if you have an existing portfolio)

### Step 3: Train Your Chatbot

Add information about yourself. Here's a template:

```
ABOUT ME:
Name: [Your Name]
Role: Full-Stack Developer & AI Engineer
Location: [Your Location]
Availability: Available for freelance and team projects

SKILLS:
- Frontend: React, Next.js, JavaScript, HTML/CSS
- Backend: Node.js, Python, Firebase
- AI/ML: Gemini API, OpenAI, Machine Learning
- Tools: Git, Vercel, Docker

PROJECTS:
1. AI Portfolio Studio
   - Description: Modern portfolio with AI assistant and no-code CMS
   - Tech: React, Firebase, Gemini API
   - Link: [project URL]

2. [Add more projects...]

CONTACT:
Email: hello@mente.co
LinkedIn: [your LinkedIn]
GitHub: [your GitHub]

PERSONALITY:
- Professional but friendly
- Tech-forward and concise
- Helpful and informative
```

### Step 4: Customize Appearance

1. Go to **"Settings"** → **"Chatbot Appearance"**
2. Customize to match your portfolio:
   - **Theme**: Dark mode
   - **Primary Color**: `#6366f1` (your accent color)
   - **Position**: Bottom right
   - **Initial Message**: "Hello! I'm Mente's AI assistant. Ask me about skills, projects, or availability."

### Step 5: Get Your Embed Code

1. Click **"Embed on Website"** or **"Share"**
2. You'll see code like this:

```html
<script>
  window.embeddedChatbotConfig = {
    chatbotId: "abc123xyz456",
    domain: "www.chatbase.co"
  }
</script>
<script
  src="https://www.chatbase.co/embed.min.js"
  chatbotId="abc123xyz456"
  defer>
</script>
```

3. **Copy your `chatbotId`** (e.g., `abc123xyz456`)

### Step 6: Update Your Code

1. Open `src/components/ChatbaseAssistant.jsx`
2. Find this line (appears twice):
   ```javascript
   chatbotId: "YOUR_CHATBOT_ID"
   ```
3. Replace `YOUR_CHATBOT_ID` with your actual chatbot ID
4. Save the file

**Example:**
```javascript
chatbotId: "abc123xyz456"  // Your actual ID from Chatbase
```

### Step 7: Test Your Chatbot

1. Save all files
2. Your dev server should auto-reload
3. Look for the chat bubble in the bottom-right corner
4. Click it and test some questions:
   - "What skills does Mente have?"
   - "Tell me about the projects"
   - "Is Mente available for work?"

---

## 🎨 Advanced Customization (Optional)

### Custom Styling

If you want to further customize the chatbot appearance, you can add CSS:

```css
/* Add to your index.css */

/* Customize chat bubble */
#chatbase-bubble {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)) !important;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3) !important;
}

/* Customize chat window */
#chatbase-chat-window {
  border: 1px solid var(--border-color) !important;
  backdrop-filter: blur(20px) !important;
}
```

### Custom Welcome Message

In Chatbase settings, set a custom welcome message:
```
👋 Hello! I'm Mente's AI concierge. I can tell you about:

• Technical skills & expertise
• Recent projects & ventures
• Availability for freelance work
• Contact information

What would you like to know?
```

---

## 🆓 Free Tier Limits

Chatbase free tier includes:
- **30 messages/month** (usually enough for a portfolio)
- **1 chatbot**
- **400,000 characters** of training data
- **Chatbase branding** (can remove with paid plan)

For a portfolio site, this is typically sufficient!

---

## 🚀 Going Live

Once you're happy with your chatbot:

1. **Test thoroughly** - Ask various questions
2. **Update training data** - Add more info if needed
3. **Deploy** - Your chatbot will work on your live site automatically
4. **Monitor** - Check Chatbase dashboard for analytics

---

## 💡 Pro Tips

1. **Keep training data updated** - Update when you add new projects
2. **Use clear language** - Write training data as Q&A pairs
3. **Test edge cases** - Ask questions it might not know
4. **Set expectations** - Tell users what the bot can/can't do
5. **Monitor usage** - Check analytics to improve responses

---

## 🆘 Troubleshooting

**Chatbot not appearing?**
- Check that you replaced `YOUR_CHATBOT_ID` with your actual ID
- Clear browser cache and reload
- Check browser console for errors

**Chatbot giving wrong answers?**
- Update training data in Chatbase dashboard
- Add more specific information
- Use Q&A format in training data

**Quota exceeded?**
- Free tier: 30 messages/month
- Upgrade to paid plan for unlimited messages
- Or use multiple chatbots for different purposes

---

## 📊 Comparison: Chatbase vs Direct Gemini API

| Feature | Chatbase | Direct Gemini API |
|---------|----------|-------------------|
| Setup Time | 5 minutes | 30+ minutes |
| Quota Issues | ❌ None | ✅ Frequent |
| Backend Required | ❌ No | ✅ Yes |
| Customization | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cost (Free Tier) | 30 msg/month | 1500 req/day |
| Maintenance | ❌ None | ✅ Ongoing |
| Analytics | ✅ Built-in | ❌ Manual |

**Verdict**: For a portfolio site, Chatbase is the clear winner! 🏆

---

## 🎯 Next Steps

1. ✅ Create Chatbase account
2. ✅ Train your chatbot
3. ✅ Get your chatbot ID
4. ✅ Update `ChatbaseAssistant.jsx`
5. ✅ Test and deploy!

---

**Need help?** Check out:
- [Chatbase Documentation](https://docs.chatbase.co/)
- [Chatbase Community](https://discord.gg/chatbase)
- [Video Tutorials](https://www.youtube.com/c/chatbase)

---

**Created for**: Mente's AI Portfolio  
**Last Updated**: December 2024  
**Status**: Ready to deploy! 🚀
