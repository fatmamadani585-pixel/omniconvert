const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en" dir="ltr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OmniConvert - Universal Media Downloader</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', 'Cairo', sans-serif; }
        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .lang-btn { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .lang-btn.active {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            border-color: transparent;
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
        }
    </style>
</head>
<body class="bg-[#0f172a] text-slate-100 min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white">

    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[120px] pointer-events-none -z-10"></div>

    <header class="w-full max-w-6xl mx-auto px-6 pt-8 pb-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 glass-card p-4 rounded-3xl">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <i class="fa-solid fa-bolt text-2xl text-white"></i>
                </div>
                <span class="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    OmniConvert
                </span>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
                <button onclick="setLanguage('en')" id="btn-en" class="lang-btn active flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white"><span>🇺🇸</span> EN</button>
                <button onclick="setLanguage('ar')" id="btn-ar" class="lang-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"><span>🇸🇦</span> العربية</button>
                <button onclick="setLanguage('fr')" id="btn-fr" class="lang-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"><span>🇫🇷</span> FR</button>
                <button onclick="setLanguage('de')" id="btn-de" class="lang-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"><span>🇩🇪</span> DE</button>
                <button onclick="setLanguage('es')" id="btn-es" class="lang-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white"><span>🇪🇸</span> ES</button>
            </div>
        </div>
    </header>

    <main class="w-full max-w-4xl mx-auto px-6 py-12 flex-grow flex flex-col justify-center">
        <div class="text-center mb-10 space-y-4">
            <h1 id="hero-title" class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Download Media From <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Any Platform</span>
            </h1>
            <p id="hero-subtitle" class="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                Fast, free, and seamless conversion for YouTube, TikTok, Facebook, and Instagram into high-quality MP3 & MP4.
            </p>
        </div>

        <div class="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-700/50">
            <div class="space-y-6">
                <div>
                    <label id="label-input" for="videoUrl" class="block text-sm font-semibold text-slate-300 mb-2">Paste Video or Audio URL:</label>
                    <div class="relative">
                        <input type="url" id="videoUrl" placeholder="https://www.youtube.com/watch?v=..." 
                            class="w-full px-5 py-4 bg-slate-900/80 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 text-base shadow-inner">
                        <i class="fa-solid fa-link absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 text-slate-500"></i>
                    </div>
                </div>

                <div class="flex items-center gap-6 pt-2">
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="format" value="mp4" checked class="w-5 h-5 text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700">
                        <span id="opt-mp4" class="text-slate-300 group-hover:text-white font-medium">Video (MP4)</span>
                    </label>
                    <label class="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="format" value="mp3" class="w-5 h-5 text-purple-600 focus:ring-purple-500 bg-slate-900 border-slate-700">
                        <span id="opt-mp3" class="text-slate-300 group-hover:text-white font-medium">Audio (MP3)</span>
                    </label>
                </div>

                <button onclick="processMedia()" id="btn-convert" 
                    class="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold py-4 rounded-2xl transition duration-300 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 text-lg">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <span id="txt-btn">Start Conversion</span>
                </button>
            </div>

            <div id="loader" class="hidden my-6 text-center">
                <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                <p id="txt-loading" class="text-slate-400 mt-3 text-sm font-medium">Processing media...</p>
            </div>

            <div id="resultBox" class="hidden mt-6 p-6 rounded-2xl bg-slate-900/90 border border-slate-700 text-center space-y-4">
                <h3 id="resTitle" class="text-lg font-bold text-emerald-400">Your download is ready!</h3>
                <div id="downloadLinks" class="flex flex-col gap-3"></div>
            </div>
        </div>
    </main>

    <footer class="py-6 text-center text-slate-500 text-xs border-t border-slate-800/60">
        <p>&copy; 2026 OmniConvert. All rights reserved.</p>
    </footer>

    <script>
        const translations = {
            en: { title: "OmniConvert", labelInput: "Paste Video or Audio URL:", optMp4: "Video (MP4)", optMp3: "Audio (MP3)", btnConvert: "Start Conversion", txtLoading: "Processing...", resReady: "Your download is ready!", txtDownload: "Download File Now" },
            ar: { title: "OmniConvert", labelInput: "ضع رابط الفيديو أو الصوت هنا:", optMp4: "فيديو (MP4)", optMp3: "صوت (MP3)", btnConvert: "بدء التحويل", txtLoading: "جاري المعالجة...", resReady: "ملفك جاهز للتحميل!", txtDownload: "تحميل الملف الآن" }
        };

        let currentLang = 'en';

        function setLanguage(lang) {
            currentLang = lang;
            const data = translations[lang] || translations.en;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.getElementById('label-input').textContent = data.labelInput;
            document.getElementById('opt-mp4').textContent = data.optMp4;
            document.getElementById('opt-mp3').textContent = data.optMp3;
            document.getElementById('txt-btn').textContent = data.btnConvert;
            document.getElementById('txt-loading').textContent = data.txtLoading;
            document.getElementById('resTitle').textContent = data.resReady;

            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active', 'text-white'));
            document.getElementById('btn-' + lang).classList.add('active', 'text-white');
        }

        function processMedia() {
            const url = document.getElementById('videoUrl').value.trim();
            const format = document.querySelector('input[name="format"]:checked').value;
            const loader = document.getElementById('loader');
            const resultBox = document.getElementById('resultBox');
            const downloadLinks = document.getElementById('downloadLinks');
            const data = translations[currentLang] || translations.en;

            if (!url) {
                alert(currentLang === 'ar' ? 'الرجاء إدخال الرابط أولاً!' : 'Please enter a valid URL!');
                return;
            }

            loader.classList.remove('hidden');
            resultBox.classList.add('hidden');
            downloadLinks.innerHTML = '';

            setTimeout(() => {
                loader.classList.add('hidden');
                resultBox.classList.remove('hidden');

                const directUrl = \`https://en.savefrom.net/19wr/#url=\${encodeURIComponent(url)}\`;

                const btn = document.createElement('a');
                btn.href = directUrl;
                btn.target = '_blank';
                btn.className = 'inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl transition duration-300 shadow-lg text-lg w-full';
                btn.innerHTML = \`<i class="fa-solid fa-cloud-arrow-down"></i> <span>\${data.txtDownload}</span>\`;
                downloadLinks.appendChild(btn);
            }, 500);
        }
    </script>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
