const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (!file.endsWith('.jsx')) return;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Force replace any lingering Inter on subtitles or small text that should be prominent
    content = content.replace(/fontFamily: "'Inter', sans-serif"/g, (match, offset, string) => {
        // If it looks like a subtitle or small loud header, switch it back
        const context = string.substring(Math.max(0, offset - 100), Math.min(string.length, offset + 100));
        if (context.includes('section-subtitle-premium') || context.includes('My Work') || context.includes('My Story')) {
            return `fontFamily: "'Abril Fatface', serif"`;
        }
        return match;
    });
    content = content.replace(/fontFamily: 'Inter', sans-serif/g, `fontFamily: "'Inter', sans-serif"`);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

// Also update App.jsx
const appPath = path.join(__dirname, 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/'Anton'/g, "'Playfair Display', serif");
appContent = appContent.replace(/'Oswald'/g, "'Inter', sans-serif");
appContent = appContent.replace(/'Manrope'/g, "'Inter', sans-serif");
fs.writeFileSync(appPath, appContent);
console.log('Updated App.jsx');
