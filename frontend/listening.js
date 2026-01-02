// frontend/listening.js

const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('id');

let questions = [];
let currentQIndex = 0;
let currentInputs = []; // Mảng chứa các object { inputEl, correctAnswer }

const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const timeDisplay = document.getElementById('timeDisplay');
const resultBox = document.getElementById('resultBox');
const checkBtn = document.getElementById('checkBtn');

document.addEventListener('DOMContentLoaded', async () => {
    if (!lessonId) {
        alert("Không tìm thấy bài học!");
        window.location.href = 'listening.html';
        return;
    }
    await loadLessonData();
});

async function loadLessonData() {
    try {
        const res = await fetch(`${API_URL}/listening/${lessonId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        questions = data.questions;
        renderDots();
        loadQuestion(0);
    } catch (e) { console.error(e); }
}

function loadQuestion(index) {
    currentQIndex = index;
    const q = questions[index];
    
    // Reset UI
    resultBox.classList.add('hidden');
    checkBtn.disabled = false;
    audio.src = q.audio;
    
    // Parse Sentence: "A man {is} sitting {by}..." -> HTML inputs
    const container = document.getElementById('questionContainer');
    container.innerHTML = '';
    currentInputs = []; // Reset list inputs

    // Regex để tìm các từ trong ngoặc nhọn {}
    const parts = q.sentence.split(/({.*?})/); 
    
    parts.forEach(part => {
        if (part.startsWith('{') && part.endsWith('}')) {
            // Đây là từ cần điền
            const answer = part.slice(1, -1); // Lấy từ bên trong bỏ {}
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'fill-input mx-1';
            input.style.width = `${Math.max(60, answer.length * 12)}px`; // Độ rộng động
            
            // Sự kiện phím SPACE để nhảy từ
            input.addEventListener('keydown', (e) => {
                if (e.code === 'Space') {
                    e.preventDefault(); // Không nhập dấu cách
                    focusNextInput(input);
                } else if (e.code === 'Enter') {
                    checkAnswer();
                }
            });

            container.appendChild(input);
            currentInputs.push({ el: input, answer: answer });
        } else {
            // Text bình thường
            const span = document.createElement('span');
            span.innerText = part;
            container.appendChild(span);
        }
    });

    // Focus ô đầu tiên
    if (currentInputs.length > 0) setTimeout(() => currentInputs[0].el.focus(), 100);

    // Chuẩn bị kết quả (nhưng ẩn)
    document.getElementById('correctSentence').innerText = q.sentence.replace(/{/g, '').replace(/}/g, '');
    document.getElementById('translation').innerText = q.translation;
    
    updateDots();
}

function focusNextInput(currentInput) {
    const idx = currentInputs.findIndex(item => item.el === currentInput);
    if (idx !== -1 && idx < currentInputs.length - 1) {
        currentInputs[idx + 1].el.focus();
    }
}

function checkAnswer() {
    let isAllCorrect = true;

    currentInputs.forEach(item => {
        const userVal = item.el.value.trim().toLowerCase();
        const correctVal = item.answer.toLowerCase();

        // Xóa class cũ
        item.el.classList.remove('input-correct', 'input-wrong');

        if (userVal === correctVal) {
            // ĐÚNG
            item.el.classList.add('input-correct');
            item.el.disabled = true; // Khóa lại
        } else {
            // SAI
            item.el.classList.add('input-wrong');
            isAllCorrect = false;
        }
    });

    // Hiện bảng kết quả
    resultBox.classList.remove('hidden');
    
    // Nếu đúng hết thì tự động play âm thanh chúc mừng (tùy chọn)
    if (isAllCorrect) {
        checkBtn.disabled = true;
    }
}

function resetInputs() {
    currentInputs.forEach(item => {
        item.el.value = '';
        item.el.classList.remove('input-correct', 'input-wrong');
        item.el.disabled = false;
    });
    resultBox.classList.add('hidden');
    currentInputs[0].el.focus();
}

function nextQuestion() {
    if (currentQIndex < questions.length - 1) {
        loadQuestion(currentQIndex + 1);
    } else {
        alert("Chúc mừng! Bạn đã hoàn thành bài học.");
        window.location.href = 'listening.html';
    }
}

// --- AUDIO PLAYER LOGIC ---
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play pl-1"></i>';
    }
});

document.getElementById('replayBtn').addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    
    // Format time
    const curMins = Math.floor(audio.currentTime / 60);
    const curSecs = Math.floor(audio.currentTime % 60);
    const durMins = Math.floor(audio.duration / 60) || 0;
    const durSecs = Math.floor(audio.duration % 60) || 0;
    timeDisplay.innerText = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs} / ${durMins}:${durSecs < 10 ? '0' : ''}${durSecs}`;
});

audio.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play pl-1"></i>';
});

// Speed Control
const speeds = [1, 1.25, 1.5, 0.75];
let speedIdx = 0;
document.getElementById('speedBtn').addEventListener('click', (e) => {
    speedIdx = (speedIdx + 1) % speeds.length;
    const s = speeds[speedIdx];
    audio.playbackRate = s;
    e.target.innerText = `${s}x`;
});

// --- DOTS UI ---
function renderDots() {
    const container = document.getElementById('questionDots');
    container.innerHTML = questions.map((_, i) => `
        <div class="w-2 h-2 rounded-full bg-gray-300 dot-item" id="dot-${i}"></div>
    `).join('');
}

function updateDots() {
    questions.forEach((_, i) => {
        const dot = document.getElementById(`dot-${i}`);
        if (i < currentQIndex) dot.className = "w-2 h-2 rounded-full bg-green-500"; // Đã làm
        else if (i === currentQIndex) dot.className = "w-2 h-2 rounded-full bg-blue-600 scale-125"; // Đang làm
        else dot.className = "w-2 h-2 rounded-full bg-gray-300"; // Chưa làm
    });
}