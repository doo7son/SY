// Firebase SDK imports (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- [여기에 Firebase 설정을 복사해서 붙여넣으세요] ---
const firebaseConfig = {
  apiKey: "AIzaSyCJ_K0-xUwAuUOu7hifSZDGn89RDENOx8M",
  authDomain: "ranking-3a229.firebaseapp.com",
  projectId: "ranking-3a229",
  storageBucket: "ranking-3a229.firebasestorage.app",
  messagingSenderId: "568691075515",
  appId: "1:568691075515:web:54351361c6bb05ee8fbc9e",
  measurementId: "G-5QPQDNX6SD"
};
// --------------------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const scoresCollection = collection(db, "scores");

// Game State
let score = 0;
let timeLeft = 10;
let timerId = null;
let currentPlayerName = "";

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');

const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const clickBtn = document.getElementById('click-btn');
const restartBtn = document.getElementById('restart-btn');

const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score-val');
const leaderboardList = document.getElementById('leaderboard-list');

// Listen for Real-time Leaderboard Updates
const q = query(scoresCollection, orderBy("score", "desc"), limit(10));
onSnapshot(q, (snapshot) => {
    leaderboardList.innerHTML = "";
    if (snapshot.empty) {
        leaderboardList.innerHTML = "<li>아직 기록이 없습니다. 전 세계 1위가 되어보세요!</li>";
        return;
    }
    
    snapshot.forEach((doc, index) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.className = "leaderboard-item";
        li.innerHTML = `
            <span><span class="rank">${index + 1}위</span> ${data.name}</span>
            <span><strong>${data.score}점</strong></span>
        `;
        leaderboardList.appendChild(li);
    });
});

// Event Listeners
startBtn.addEventListener('click', startGame);
clickBtn.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    scoreDisplay.style.transform = "scale(1.2)";
    setTimeout(() => scoreDisplay.style.transform = "scale(1)", 50);
});
restartBtn.addEventListener('click', resetGame);

// Functions
function startGame() {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert("이름을 입력해주세요!");
        return;
    }
    currentPlayerName = name;
    
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

async function endGame() {
    clearInterval(timerId);
    gameScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = score;
    
    // Save to Firebase
    try {
        await addDoc(scoresCollection, {
            name: currentPlayerName,
            score: score,
            createdAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

function resetGame() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    playerNameInput.value = "";
}