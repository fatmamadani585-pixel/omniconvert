const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

    <!-- Header -->
    <header class="p-5 flex justify-between items-center border-b border-slate-800">
        <h1 class="text-2xl font-bold text-indigo-400"><i class="fa-solid fa-arrows-rotate text-indigo-500 mr-2"></i> OmniConvert</h1>
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-globe text-slate-400"></i>
            <select id="langSelect" onchange="changeLanguage(this.value)" class="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-indigo-500">
                <option value="ar" selected>العربية</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
            </select>
        </div>
    </header>

    <!-- Main Section -->
    <main class="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 id="titleText" class="text-3xl md:text-5xl font-extrabold mb-4">تحويل وتحميل الفيديو والصوت</h2>
        <p id="descText" class="text-slate-400 max-w-lg mb-8 text-sm md:text-base">أدخل رابط يوتيوب لتحويله وحفظه بصيغة MP3 أو MP4 بسهولة تامة.</p>

        <!-- صندوق الإدخال -->
        <div class="w-full max-w-2xl bg-slate-800 p-3 rounded-2xl border border-slate-700 shadow-xl flex flex-col md:flex-row gap-3">
            <input type="text" id="urlInput" placeholder="ألصق رابط يوتيوب هنا..." class="flex-grow bg-slate-900 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 text-left" dir="ltr">
            <button onclick="handleConvert()" id="btnText" class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer">
                <i class="fa-solid fa-bolt"></i> <span>تحويل</span>
            </button>
        </div>

        <!-- إطار النتائج المباشر (مطابق للمواقع الكبرى) -->
        <div id="resultContainer" class="mt-6 w-full max-w-2xl hidden">
            <div id="embedWrapper" class="w-full bg-slate-800 p-4 rounded-2xl border border-slate-700 flex justify-center">
                <!-- سيتم حقن أداة التحويل المباشر هنا -->
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="p-4 text-center text-slate-500 text-xs border-t border-slate-800">
        © 2026 OmniConvert. جميع الحقوق محفوظة.
    </footer>

    <!-- Script -->
    <script>
        const translations = {
            ar: { title: "تحويل وتحميل الفيديو والصوت", desc: "أدخل رابط يوتيوب لتحويله وحفظه بصيغة MP3 أو MP4 بسهولة تامة.", placeholder: "ألصق رابط يوتيوب هنا...", btn: "تحويل" },
            en: { title: "Convert & Download Video & Audio", desc: "Paste your YouTube link to convert and save as MP3 or MP4 easily.", placeholder: "Paste YouTube link here...", btn: "Convert" },
            fr: { title: "Convertir et Télécharger", desc: "Collez le lien YouTube pour convertir et enregistrer en MP3 ou MP4.", placeholder: "Collez le lien YouTube ici...", btn: "Convertir" },
            es: { title: "Convertir y descargar", desc: "Pega el enlace de YouTube para convertir y guardar en MP3 o MP4.", placeholder: "Pega el enlace de YouTube aquí...", btn: "Convertir" }
        };

        function changeLanguage(lang) {
            const t = translations[lang] || translations.ar;
            document.documentElement.lang = lang;
            document.getElementById('titleText').innerText = t.title;
            document.getElementById('descText').innerText = t.desc;
            document.getElementById('urlInput').placeholder = t.placeholder;
            document.querySelector('#btnText span').innerText = t.btn;
        }

        function handleConvert() {
            const url = document.getElementById('urlInput').value.trim();
            const resultContainer = document.getElementById('resultContainer');
            const embedWrapper = document.getElementById('embedWrapper');

            if (!url) {
                alert("الرجاء إدخال رابط صالح أولاً!");
                return;
            }

            resultContainer.classList.remove('hidden');

            // هذه الطريقة تستخدم مشغل التحويل المباشر تماماً مثل المواقع الكبرى وتعمل دون أخطاء
            embedWrapper.innerHTML = \`
                <iframe src="https://en.loader.to/api/button/?url=\${encodeURIComponent(url)}" style="width:100%; height:90px; border:none; overflow:hidden;" scrolling="no"></iframe>
            \`;
        }
    </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
