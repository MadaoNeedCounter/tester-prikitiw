// --- NAVIGASI ANTAR HALAMAN ---
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const buttons = document.querySelectorAll('.nav-btn');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active');
    event.currentTarget.classList.add('active');
}


// --- MINI GAME LOGIC ---
const trashData = [
    { name: "Sisa Apel", category: "organik", emoji: "🍎" },
    { name: "Botol Plastik", category: "anorganik", emoji: "🍾" },
    { name: "Baterai Bekas", category: "b3", emoji: "🔋" },
    { name: "Daun Kering", category: "organik", emoji: "🍂" },
    { name: "Kaleng Minuman", category: "anorganik", emoji: "🥫" },
    { name: "Lampu Neon Pecah", category: "b3", emoji: "💡" },
    { name: "Kulit Pisang", category: "organik", emoji: "🍌" },
    { name: "Kardus Bekas", category: "anorganik", emoji: "📦" },
    { name: "Botol Obat Nyamuk", category: "b3", emoji: "🧪" }
];

let gameScore = 0;
let currentTrashIndex = 0;

function loadGameItem() {
    const item = trashData[currentTrashIndex];
    document.getElementById('trash-emoji').innerText = item.emoji;
    document.getElementById('trash-name').innerText = item.name;
    document.getElementById('game-feedback').innerText = "";
}

function checkGameAnswer(selectedCategory) {
    const currentItem = trashData[currentTrashIndex];
    const feedbackEl = document.getElementById('game-feedback');

    if (selectedCategory === currentItem.category) {
        gameScore += 10;
        feedbackEl.style.color = "#2e7d32";
        feedbackEl.innerText = "✨ Benar! Hebat sekali!";
    } else {
        feedbackEl.style.color = "#c62828";
        feedbackEl.innerText = `❌ Kurang tepat. ${currentItem.name} termasuk sampah ${currentItem.category.toUpperCase()}.`;
    }

    document.getElementById('game-score').innerText = gameScore;

    // Lanjut ke item berikutnya setelah jeda singkat
    setTimeout(() => {
        currentTrashIndex = (currentTrashIndex + 1) % trashData.length;
        loadGameItem();
    }, 1200);
}


// --- KUIS LOGIC ---
const quizQuestions = [
    {
        question: "Sampah sisa makanan dan daun kering sebaiknya dibuang ke tempat sampah warna...",
        options: ["Merah (B3)", "Kuning (Anorganik)", "Hijau (Organik)", "Biru"],
        answer: 2
    },
    {
        question: "Mengapa baterai bekas dan botol racun serangga termasuk sampah B3?",
        options: [
            "Karena mengandung bahan berbahaya & beracun",
            "Karena bisa dibuat menjadi pupuk kompos",
            "Karena harganya mahal",
            "Karena mudah terurai dalam tanah"
        ],
        answer: 0
    },
    {
        question: "Manakah di bawah ini contoh sampah Anorganik yang dapat didaur ulang?",
        options: ["Cangkang telur", "Botol plastik bekas", "Daun gugur", "Sisa sayuran"],
        answer: 1
    },
    {
        question: "Sampah organik yang diolah kembali dengan baik dapat dimanfaatkan menjadi...",
        options: ["Listrik tinggi", "Pupuk Kompos", "Mainan plastik", "Baterai baru"],
        answer: 1
    },
    {
        question: "Apa tindakan yang PALING TEPAT jika kamu menemukan lampu neon pecah?",
        options: [
            "Membuangnya ke tempat sampah Organik",
            "Membakarnya di halaman rumah",
            "Membuangnya ke tempat sampah B3 dengan hati-hati",
            "Melemparnya ke sungai"
        ],
        answer: 2
    }
];

let currentQuizIndex = 0;
let quizScore = 0;

function loadQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress').innerText = `Pertanyaan ${currentQuizIndex + 1} dari ${quizQuestions.length}`;
    document.getElementById('quiz-question').innerText = q.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = `${String.fromCharCode(65 + index)}. ${opt}`;
        btn.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex) {
    const q = quizQuestions[currentQuizIndex];
    if (selectedIndex === q.answer) {
        quizScore += 20;
    }

    currentQuizIndex++;

    if (currentQuizIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultEl = document.getElementById('quiz-result');
    resultEl.classList.remove('hidden');

    document.getElementById('final-score').innerText = quizScore;

    const msgEl = document.getElementById('result-message');
    if (quizScore >= 80) {
        msgEl.innerText = "Luar biasa! Kamu sudah siap jadi Pahlawan Pemilah Sampah! 🌟";
    } else if (quizScore >= 60) {
        msgEl.innerText = "Bagus! Teruskan belajarmu agar makin paham! 👍";
    } else {
        msgEl.innerText = "Yuk baca kembali materinya dan coba kuisnya lagi! 💪";
    }
}

function restartQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuestion();
}


// INI SCRIPT DITERAPKAN SAAT PERTAMA KALI DIBUKA
window.onload = function() {
    loadGameItem();
    loadQuestion();
};
