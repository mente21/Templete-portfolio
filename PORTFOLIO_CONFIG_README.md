# 🎨 Portfolio Configuration System

This project now supports **multiple portfolio configurations** - easily switch between your **Developer Portfolio** and **Personal Portfolio** while preserving the beautiful UI you love!

---

## 📁 Configuration Files

### Environment Files
- **`.env`** - Active configuration (currently using developer portfolio as fallback)
- **`.env.developer`** - Developer portfolio configuration (backup)
- **`.env.personal`** - Personal portfolio configuration (template - fill in after creating Firebase project)

### Utility Scripts
- **`switch-portfolio.bat`** - Windows script to switch configurations
- **`switch-portfolio.sh`** - Bash script to switch configurations (Git Bash/WSL)

### Documentation
- **`QUICK_START_GUIDE.md`** - Step-by-step setup instructions
- **`PERSONAL_PORTFOLIO_MIGRATION_GUIDE.md`** - Detailed migration guide

---

## 🚀 Quick Start

### 1. Create Your Personal Portfolio Firebase Project

Follow the instructions in `QUICK_START_GUIDE.md` to:
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Storage
4. Get your Firebase configuration

### 2. Update Configuration

Edit `.env.personal` and fill in your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
# ... etc
```

### 3. Switch to Personal Portfolio

**On Windows:**
```bash
# Double-click switch-portfolio.bat
# OR run in terminal:
switch-portfolio.bat
```

**On Mac/Linux/Git Bash:**
```bash
chmod +x switch-portfolio.sh
./switch-portfolio.sh
```

### 4. Start Development

```bash
npm run dev
```

---

## 🔄 Switching Between Portfolios

### Using the Script (Recommended)

**Windows:**
```bash
switch-portfolio.bat
```

**Mac/Linux/Git Bash:**
```bash
./switch-portfolio.sh
```

### Manual Method

**Switch to Developer Portfolio:**
```bash
copy .env.developer .env
```

**Switch to Personal Portfolio:**
```bash
copy .env.personal .env
```

**Then restart your dev server!**

---

## 🎨 What's Configured

### ✅ Cloudinary (Ready to Use)
- **Cloud Name**: `dyiykxbs8`
- **Upload Preset**: `portfolio`
- **API Key**: Configured
- **Status**: ✅ Ready for image uploads

### ✅ Firebase (Flexible)
- **Developer Portfolio**: `my-ai-portfolio-96c91` (current/fallback)
- **Personal Portfolio**: Create your own project
- **Status**: ⏳ Waiting for your Firebase project

---

## 📂 Project Structure

```
AI-Portfolio/
├── Ai-test/
│   ├── .env                    # Active configuration
│   ├── .env.developer          # Developer portfolio backup
│   ├── .env.personal           # Personal portfolio template
│   ├── switch-portfolio.bat    # Windows switcher
│   ├── switch-portfolio.sh     # Bash switcher
│   └── src/
│       └── lib/
│           ├── firebase.js     # Firebase config (uses env vars)
│           └── cloudinary.js   # Cloudinary utilities
├── QUICK_START_GUIDE.md        # Setup instructions
└── PERSONAL_PORTFOLIO_MIGRATION_GUIDE.md  # Detailed guide
```

---

## 🔒 Security

- ✅ `.env` files are in `.gitignore`
- ✅ Credentials never committed to Git
- ✅ Environment variables used for sensitive data
- ✅ Cloudinary preset set to "unsigned" for client uploads

---

## 🎯 Next Steps

1. **Create Firebase Project** - Follow `QUICK_START_GUIDE.md`
2. **Update `.env.personal`** - Add your Firebase credentials
3. **Switch Configuration** - Use `switch-portfolio.bat`
4. **Add Content** - Use Studio Mode to add your personal data
5. **Deploy** - Push to Vercel/Netlify with environment variables

---

## 📞 Need Help?

- **Setup Issues**: Check `QUICK_START_GUIDE.md`
- **Migration Questions**: See `PERSONAL_PORTFOLIO_MIGRATION_GUIDE.md`
- **Firebase Errors**: Verify credentials in `.env.personal`
- **Cloudinary Issues**: Ensure upload preset is "unsigned"

---

## 🎨 Features Preserved

✅ Beautiful UI (unchanged)  
✅ All animations and interactions  
✅ Studio Mode for content management  
✅ AI Assistant integration  
✅ Responsive design  
✅ Dark/Light mode  
✅ Project showcase  
✅ Skills visualization  

**Everything you love about the UI stays the same - just with your personal data!**

---

## 📝 Important Notes

1. **Current Status**: Using developer portfolio as fallback (safe)
2. **No Data Loss**: Developer portfolio is preserved in `.env.developer`
3. **Easy Switching**: Use scripts to switch between portfolios
4. **Cloudinary Ready**: Image uploads configured and ready
5. **Waiting For**: Your new Firebase project credentials

---

**Ready to create your personal portfolio? Follow the `QUICK_START_GUIDE.md`! 🚀**
