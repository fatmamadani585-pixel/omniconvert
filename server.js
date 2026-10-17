const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serving the main Frontend UI
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OmniConvert - محول ومحمل الوسائط الشامل</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-900 text-white min-h-screen flex flex-col justify-between font-sans">

    <!-- Header & Language Selector -->
    <header class="p-5 flex justify-between items-center border-b border-slate-800">
        <h1 class="text-2xl font-bold text-indigo-400"><i class="fa-solid-arrows-rotate text-indigo-500 mr-2"></i> OmniConvert</h1>
        <div class="flex items-center gap-2">
            <i class="fa-solid font-globe text-slate-400"></i>
            <select id="langSelect" onchange="changeLanguage(this.value)" class="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-indigo-500">
                <option value="ar" selected>العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
            </select>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 id="titleText" class="text-3xl md:text-5xl font-extrabold mb-4">حمل الفيديو والصوت بضغطة واحدة</h2>
        <p id="descText" class="text-slate-400 max-w-lg mb-8 text-sm md:text-base">قم بوضع رابط الفيديو من أي منصة لتحميله مباشرة بجودة عالية مجاناً وبدون إعلانات مزعجة.</p>

        <div class="w-full max-w-2xl bg-slate-800 p-3 rounded-2xl border border-slate-700 shadow-xl flex flex-col md:flex-row gap-3">
            <input type="text" id="urlInput" placeholder="أدخل رابط الفيديو أو الصوت هنا..." class="flex-grow bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-right">
            <button onclick="handleDownload()" id="btnText" class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2">
                <i class="fa-solid fa-download"></i> <span>تحميل الآن</span>
            </button>
        </div>

        <div id="statusMessage" class="mt-4 text-sm font-medium hidden"></div>
    </main>

    <!-- Footer -->
    <footer class="p-4 text-center text-slate-500 text-xs border-t border-slate-800">
        © 2026 OmniConvert. جميع الحقوق محفوظة.
    </footer>

    <!-- Translations & Script -->
    <script>
        const translations = {
            ar: {
                title: "حمل الفيديو والصوت بضغطة واحدة",
                desc: "قم بوضع رابط الفيديو من أي منصة لتحميله مباشرة بجودة عالية مجاناً وبدون إعلانات مزعجة.",
                placeholder: "أدخل رابط الفيديو أو الصوت هنا...",
                btn: "تحميل الآن",
                dir: "rtl"
            },
            en: {
                title: "Download Video & Audio in One Click",
                desc: "Paste your video URL from any platform to download directly in high quality for free with no ads.",
                placeholder: "Enter video or audio URL here...",
                btn: "Download Now",
                dir: "ltr"
            },
            fr: {
                title: "Téléchargez Vidéo & Audio en un Clic",
                desc: "Collez l'URL de votre vidéo depuis n'importe quelle plateforme pour la télécharger gratuitement.",
                placeholder: "Entrez l'URL de la vidéo ici...",
                btn: "Télécharger",
                dir: "ltr"
            },
            es: {
                title: "Descarga Video y Audio en Un Clic",
                desc: "Pega la URL de tu video desde cualquier plataforma para descargarlo directamente gratis.",
                placeholder: "Ingrese la URL del video aquí...",
                btn: "Descargar",
                dir: "ltr"
            }
        };

        function changeLanguage(lang) {
            const t = translations[lang] || translations.ar;
            document.documentElement.lang = lang;
            document.documentElement.dir = t.dir;
            document.getElementById('titleText').innerText = t.title;
            document.getElementById('descText').innerText = t.desc;
            document.getElementById('urlInput').placeholder = t.placeholder;
            document.getElementById('urlInput').className = \`flex-grow bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 \${t.dir === 'rtl' ? 'text-right' : 'text-left'}\`;
            document.querySelector('#btnText span').innerText = t.btn;
        }

        function handleDownload() {
            const url = document.getElementById('urlInput').value.trim();
            const status = document.getElementById('statusMessage');
            if(!url) {
                status.innerText = "يرجى إدخال رابط صحيح أولاً!";
                status.className = "mt-4 text-sm font-medium text-red-400";
                return;
            }
            status.innerText = "جاري معالجة الرابط، يرجى الانتظار...";
            status.className = "mt-4 text-sm font-medium text-indigo-400";
        }
    </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
