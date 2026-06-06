// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config (기존 설정 유지)
const firebaseConfig = {
  apiKey: "AIzaSyCJ_K0-xUwAuUOu7hifSZDGn89RDENOx8M",
  authDomain: "ranking-3a229.firebaseapp.com",
  projectId: "ranking-3a229",
  storageBucket: "ranking-3a229.firebasestorage.app",
  messagingSenderId: "568691075515",
  appId: "1:568691075515:web:54351361c6bb05ee8fbc9e",
  measurementId: "G-5QPQDNX6SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const scoresCollection = collection(db, "scores");

// Word Data (중1 필수 영단어 50개)
const words = [
    { en: "always", ko: "항상" }, { en: "beautiful", ko: "아름다운" }, { en: "breakfast", ko: "아침식사" },
    { en: "careful", ko: "주의 깊은" }, { en: "different", ko: "다른" }, { en: "difficult", ko: "어려운" },
    { en: "exciting", ko: "흥분되는" }, { en: "favorite", ko: "가장 좋아하는" }, { en: "friend", ko: "친구" },
    { en: "healthy", ko: "건강한" }, { en: "important", ko: "중요한" }, { en: "interesting", ko: "흥미로운" },
    { en: "language", ko: "언어" }, { en: "library", ko: "도서관" }, { en: "mountain", ko: "산" },
    { en: "neighbor", ko: "이웃" }, { en: "practice", ko: "연습하다" }, { en: "remember", ko: "기억하다" },
    { en: "science", ko: "과학" }, { en: "strange", ko: "이상한" }, { en: "together", ko: "함께" },
    { en: "understand", ko: "이해하다" }, { en: "village", ko: "마을" }, { en: "weather", ko: "날씨" },
    { en: "wonderful", ko: "멋진" }, { en: "accident", ko: "사고" }, { en: "believe", ko: "믿다" },
    { en: "calendar", ko: "달력" }, { en: "daughter", ko: "딸" }, { en: "experience", ko: "경험" },
    { en: "famous", ko: "유명한" }, { en: "garden", ko: "정원" }, { en: "happen", ko: "일어나다" },
    { en: "island", ko: "섬" }, { en: "journey", ko: "여행" }, { en: "kitchen", ko: "부엌" },
    { en: "lesson", ko: "수업" }, { en: "message", ko: "메시지" }, { en: "nature", ko: "자연" },
    { en: "ocean", ko: "대양" }, { en: "perfect", ko: "완벽한" }, { en: "question", ko: "질문" },
    { en: "respect", ko: "존경하다" }, { en: "special", ko: "특별한" }, { en: "treasure", ko: "보물" },
    { en: "umbrella", ko: "우산" }, { en: "vacation", ko: "휴가" }, { en: "welcome", ko: "환영하다" },
    { en: "yesterday", ko: "어제" }, { en: "zoo", ko: "동물원" }
];

// Game State
let score = 0;
let timeLeft = 60;
let timerId = null;
let currentPlayerName = "";
let currentWord = null;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const wordDisplay = document.getElementById('word-display');
const optionsGrid = document.getElementById('options-grid');
const finalScoreDisplay = document.getElementById('final-score-val');
const leaderboardList = document.getElementById('leaderboard-list');
const container = document.querySelector('.container');

// Real-time Leaderboard
const q = query(scoresCollection, orderBy("score", "desc"), limit(10));
onSnapshot(q, (snapshot) => {
    leaderboardList.innerHTML = "";
    if (snapshot.empty) {
        leaderboardList.innerHTML = "<li>기록이 없습니다. 첫 주인공이 되세요!</li>";
        return;
    }
    let rank = 1;
    snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.className = "leaderboard-item";
        li.innerHTML = `<span><span class="rank">${rank}위</span> ${data.name}</span><span><strong>${data.score}점</strong></span>`;
        leaderboardList.appendChild(li);
        rank++;
    });
});

// Event Listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

// Functions
function startGame() {
    const name = playerNameInput.value.trim();
    if (!name) { alert("이름을 입력해주세요!"); return; }
    currentPlayerName = name;
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    nextQuestion();
    
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function nextQuestion() {
    // Pick a random word
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordDisplay.textContent = currentWord.en;
    
    // Create options (1 correct, 3 wrong)
    let options = [currentWord.ko];
    while (options.length < 4) {
        const randomWord = words[Math.floor(Math.random() * words.length)].ko;
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Render buttons
    optionsGrid.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === currentWord.ko) {
        score += 10;
        scoreDisplay.textContent = score;
        container.classList.add('correct');
        setTimeout(() => container.classList.remove('correct'), 300);
    } else {
        timeLeft -= 3; // Penalty
        if (timeLeft < 0) timeLeft = 0;
        timerDisplay.textContent = timeLeft;
        container.classList.add('wrong');
        setTimeout(() => container.classList.remove('wrong'), 300);
    }
    nextQuestion();
}

async function endGame() {
    clearInterval(timerId);
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = score;
    
    try {
        await addDoc(scoresCollection, {
            name: currentPlayerName,
            score: score,
            createdAt: serverTimestamp()
        });
    } catch (e) { console.error(e); }
}

function resetGame() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    playerNameInput.value = "";
}