// =========================================================
// BIẾN TOÀN CỤC (GLOBAL VARIABLES)
// =========================================================
let words = [];
let currentIndex = 0;
let isFlipped = false;

// Biến cho phần Trắc nghiệm (Quiz)
let quizQuestions = [];
let quizIndex = 0;
let score = 0;
let wrongCount = 0; // Đếm số lần sai để trừ tim

// Biến cho phần Nối từ (Matching)
let selectedEng = null;
let selectedVi = null;
let matchesFound = 0;

// =========================================================
// 1. KHỞI TẠO (INITIALIZATION)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy dữ liệu từ LocalStorage
    const storedData = localStorage.getItem('learningQueue');
    
    if (!storedData) {
        alert('Không tìm thấy dữ liệu học tập! Vui lòng quay lại Dashboard.');
        window.location.href = 'dashboard.html';
        return;
    }

    words = JSON.parse(storedData);
    
    if (!words || words.length === 0) {
        alert('Danh sách từ vựng trống!');
        window.location.href = 'dashboard.html';
        return;
    }

    // 2. Bắt đầu màn hình đầu tiên: Flashcard
    renderFlashcard();
    setupEvents();
});

// =========================================================
// 2. PHẦN HỌC FLASHCARD
// =========================================================
function renderFlashcard() {
    // Hiển thị Flashcard, ẩn các phần khác
    toggleSection('flashcard');

    const currentWord = words[currentIndex];
    
    // Reset trạng thái thẻ
    isFlipped = false;
    document.getElementById('cardInner').classList.remove('rotate-y-180');
    
    // Điền dữ liệu vào thẻ
    document.getElementById('cardWord').innerText = currentWord.word;
    document.getElementById('cardPronun').innerText = currentWord.pronunciation || '';
    document.getElementById('cardMeaning').innerText = currentWord.definitionVi;
    document.getElementById('cardPos').innerText = currentWord.pos || '';
    document.getElementById('cardExample').innerText = currentWord.example ? `"${currentWord.example}"` : '';

    // Cập nhật thanh tiến độ
    updateProgressBar(currentIndex + 1, words.length);
    document.getElementById('progressText').innerText = `${currentIndex + 1}/${words.length}`;

    // Cập nhật trạng thái nút bấm
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    
    // Nếu là từ cuối cùng -> Đổi nút Next thành "Ôn tập"
    if (currentIndex === words.length - 1) {
        document.getElementById('nextBtn').innerHTML = 'Ôn tập ngay <i class="fas fa-brain ml-2"></i>';
    } else {
        document.getElementById('nextBtn').innerHTML = 'Tiếp theo <i class="fas fa-arrow-right ml-2"></i>';
    }
}

// =========================================================
// 3. PHẦN TRẮC NGHIỆM (QUIZ)
// =========================================================
function startQuiz() {
    console.log("--- START QUIZ ---");
    toggleSection('quiz');

    // Reset các chỉ số Quiz
    score = 0;
    wrongCount = 0; 
    quizIndex = 0;
    
    renderLives(); // Vẽ 3 trái tim đỏ
    generateQuizQuestions(); // Tạo bộ câu hỏi
    renderQuizQuestion(); // Hiển thị câu đầu tiên
}

function renderLives() {
    const container = document.getElementById('livesContainer');
    if (!container) return;

    const maxLives = 3;
    const currentLives = maxLives - wrongCount;
    
    let html = '';
    for (let i = 0; i < maxLives; i++) {
        if (i < currentLives) {
            // Còn mạng: Tim đỏ
            html += '<i class="fas fa-heart text-red-500 text-xl mx-1 drop-shadow-sm"></i>';
        } else {
            // Mất mạng: Tim xám
            html += '<i class="fas fa-heart text-gray-300 text-xl mx-1"></i>';
        }
    }
    container.innerHTML = html;
}

function generateQuizQuestions() {
    quizQuestions = [];
    const shuffledWords = [...words].sort(() => 0.5 - Math.random());

    shuffledWords.forEach((word, index) => {
        // 5 câu đầu (index 0-4): Hỏi tiếng Anh (Type 1)
        // 5 câu sau (index 5-9): Hỏi tiếng Việt (Type 2)
        const type = index < 5 ? 1 : 2; 
        
        // Tạo 3 đáp án sai
        const distractors = words
            .filter(w => w.word !== word.word)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        // Trộn đáp án đúng vào
        const options = [...distractors, word].sort(() => 0.5 - Math.random());

        quizQuestions.push({ target: word, type: type, options: options });
    });
}

function renderQuizQuestion() {
    const q = quizQuestions[quizIndex];
    
    // Update Header Quiz
    document.getElementById('quizProgressText').innerText = `Câu ${quizIndex + 1}/10`;
    updateProgressBar(quizIndex + 1, 10);

    const questionEl = document.getElementById('quizQuestion');
    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = '';

    // Hiển thị câu hỏi
    if (q.type === 1) {
        questionEl.innerHTML = `Nghĩa tiếng Anh của: <br><span class="text-indigo-600 text-2xl">"${q.target.definitionVi}"</span>`;
    } else {
        questionEl.innerHTML = `Nghĩa tiếng Việt của: <br><span class="text-indigo-600 text-2xl">"${q.target.word}"</span>`;
    }

    // Tạo các nút đáp án
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "w-full p-4 text-left border rounded-xl hover:bg-indigo-50 transition font-medium text-gray-700 mb-2 relative";
        btn.innerText = q.type === 1 ? opt.word : opt.definitionVi;
        
        // Gắn sự kiện click
        btn.onclick = () => checkQuizAnswer(opt.word === q.target.word, btn, q.target);
        optionsEl.appendChild(btn);
    });
}

function checkQuizAnswer(isCorrect, btnElement, correctWord) {
    // 1. Khóa tất cả các nút
    const allBtns = document.getElementById('quizOptions').children;
    for (let btn of allBtns) {
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
    }
    btnElement.classList.remove('opacity-70'); // Nút được chọn vẫn sáng

    if (isCorrect) {
        // --- ĐÚNG ---
        score++;
        btnElement.classList.add('bg-green-100', 'border-green-500', 'text-green-700', 'font-bold');
        btnElement.innerHTML += ' <i class="fas fa-check-circle absolute right-4 top-4 text-xl"></i>';
        
        setTimeout(nextQuizStep, 1000);
    } else {
        // --- SAI ---
        wrongCount++;
        renderLives(); // Cập nhật tim ngay lập tức

        btnElement.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
        
        // Hiện đáp án đúng
        for (let btn of allBtns) {
            if (btn.innerText.includes(correctWord.word) || btn.innerText.includes(correctWord.definitionVi)) {
                btn.classList.remove('opacity-70');
                btn.classList.add('bg-green-50', 'border-green-500', 'text-green-700', 'font-bold');
            }
        }

        // Kiểm tra Game Over
        if (wrongCount >= 3) {
            setTimeout(() => {
                alert('💔 GAME OVER!\nBạn đã sai quá 3 lần. Hãy học lại từ đầu nhé!');
                resetToFlashcard();
            }, 1000);
        } else {
            setTimeout(nextQuizStep, 1500); // Chờ lâu hơn xíu để xem đáp án đúng
        }
    }
}

function nextQuizStep() {
    quizIndex++;
    if (quizIndex < 10) {
        renderQuizQuestion();
    } else {
        // Kết thúc 10 câu -> Kiểm tra điểm
        if (score === 10) {
            // Thắng Quiz -> Qua Matching
            startMatchingGame();
        } else {
            // Không đạt điểm tuyệt đối
            alert(`Kết thúc: ${score}/10 điểm.\nBạn cần đúng tuyệt đối 10/10 câu để qua màn!`);
            resetToFlashcard();
        }
    }
}

function resetToFlashcard() {
    currentIndex = 0;
    renderFlashcard();
}

// =========================================================
// 4. PHẦN NỐI TỪ (MATCHING GAME)
// =========================================================
function startMatchingGame() {
    console.log("--- START MATCHING ---");
    toggleSection('match');
    updateProgressBar(10, 10); // Full cây

    matchesFound = 0;
    document.getElementById('matchCount').innerText = '0';

    const colEng = document.getElementById('colEnglish');
    const colVi = document.getElementById('colVietnamese');
    colEng.innerHTML = ''; 
    colVi.innerHTML = '';

    // Tạo danh sách ngẫu nhiên
    const listEng = [...words].sort(() => 0.5 - Math.random());
    const listVi = [...words].sort(() => 0.5 - Math.random());

    listEng.forEach(w => colEng.appendChild(createMatchBtn(w.word, 'eng', w._id || w.word)));
    listVi.forEach(w => colVi.appendChild(createMatchBtn(w.definitionVi, 'vi', w._id || w.word)));
}

function createMatchBtn(text, type, id) {
    const btn = document.createElement('div');
    const borderClass = type === 'eng' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-orange-500';
    
    btn.className = `relative w-full p-4 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all font-medium text-gray-700 min-h-[60px] flex items-center justify-center text-center select-none ${borderClass}`;
    btn.innerHTML = `<span>${text}</span>`;
    
    btn.dataset.id = id;
    btn.dataset.type = type;
    
    btn.onclick = () => handleMatchClick(btn);
    return btn;
}

function handleMatchClick(btn) {
    // Nếu nút đã ẩn (đã đúng) thì không làm gì
    if (btn.classList.contains('opacity-0')) return;

    // Xử lý chọn (Highlight)
    if (btn.dataset.type === 'eng') {
        if (selectedEng) selectedEng.classList.remove('bg-blue-100', 'ring-2', 'ring-blue-500');
        selectedEng = btn;
        selectedEng.classList.add('bg-blue-100', 'ring-2', 'ring-blue-500');
    } else {
        if (selectedVi) selectedVi.classList.remove('bg-orange-100', 'ring-2', 'ring-orange-500');
        selectedVi = btn;
        selectedVi.classList.add('bg-orange-100', 'ring-2', 'ring-orange-500');
    }

    // Kiểm tra khớp
    if (selectedEng && selectedVi) {
        // Tạm khóa click
        const board = document.getElementById('matchGameBoard');
        board.style.pointerEvents = 'none';

        if (selectedEng.dataset.id === selectedVi.dataset.id) {
            // --- ĐÚNG ---
            matchesFound++;
            document.getElementById('matchCount').innerText = matchesFound;
            
            // Hiệu ứng biến mất
            selectedEng.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            selectedVi.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            
            selectedEng = null; selectedVi = null;
            board.style.pointerEvents = 'auto'; // Mở lại click

            // Win Game
            if (matchesFound === 10) {
                setTimeout(finishLesson, 1000);
            }
        } else {
            // --- SAI ---
            selectedEng.classList.add('bg-red-100', 'animate-pulse');
            selectedVi.classList.add('bg-red-100', 'animate-pulse');
            
            setTimeout(() => {
                selectedEng.classList.remove('bg-red-100', 'bg-blue-100', 'ring-2', 'ring-blue-500', 'animate-pulse');
                selectedVi.classList.remove('bg-red-100', 'bg-orange-100', 'ring-2', 'ring-orange-500', 'animate-pulse');
                selectedEng = null; selectedVi = null;
                board.style.pointerEvents = 'auto'; // Mở lại click
            }, 600);
        }
    }
}

// =========================================================
// 5. KẾT THÚC & API & UTILS
// =========================================================
function finishLesson() {
    saveStudyProgress();
    alert('🎉 CHÚC MỪNG! Bạn đã hoàn thành xuất sắc bài học hôm nay.');
    window.location.href = 'dashboard.html';
}

async function saveStudyProgress() {
    const token = localStorage.getItem('token');
    try {
        await fetch('http://localhost:5000/api/study/complete', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wordsLearned: words.length,
                score: 10 // Luôn là 10 vì phải đúng hết mới qua được
            })
        });
    } catch (e) {
        console.error("Lỗi lưu tiến độ:", e);
    }
}

// Hàm tiện ích: Ẩn hiện các khu vực
function toggleSection(sectionName) {
    const flashcard = document.getElementById('flashcard');
    const quiz = document.getElementById('quizContainer');
    const match = document.getElementById('matchContainer');
    const controls = document.getElementById('controls');

    flashcard.classList.add('hidden');
    quiz.classList.add('hidden');
    match.classList.add('hidden');
    controls.classList.add('hidden');

    if (sectionName === 'flashcard') {
        flashcard.classList.remove('hidden');
        controls.classList.remove('hidden');
    } else if (sectionName === 'quiz') {
        quiz.classList.remove('hidden');
    } else if (sectionName === 'match') {
        match.classList.remove('hidden');
    }
}

function updateProgressBar(val, max) {
    const percent = (val / max) * 100;
    document.getElementById('progressBar').style.width = `${percent}%`;
}

// =========================================================
// 6. XỬ LÝ SỰ KIỆN (EVENTS & AUDIO FIX)
// =========================================================
function setupEvents() {
    // 1. Sự kiện Lật thẻ (Flashcard)
    document.getElementById('flashcard').addEventListener('click', (e) => {
        // Nếu bấm vào nút loa thì KHÔNG lật thẻ
        if (e.target.closest('#speakBtn')) return;
        
        isFlipped = !isFlipped;
        document.getElementById('cardInner').classList.toggle('rotate-y-180', isFlipped);
    });

    // 2. Nút Next / Prev
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            renderFlashcard();
        } else {
            // Hết thẻ -> Vào Quiz
            startQuiz();
        }
    });

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderFlashcard();
        }
    });

    // 3. SỰ KIỆN ÂM THANH (FIXED)
    const speakBtn = document.getElementById('speakBtn');
    
    // Clone nút để xóa các event cũ (tránh bị chồng chéo sự kiện khi reload)
    const newSpeakBtn = speakBtn.cloneNode(true);
    speakBtn.parentNode.replaceChild(newSpeakBtn, speakBtn);

    newSpeakBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện nổi lên (không lật thẻ)

        const wordToSpeak = words[currentIndex].word;

        // Kiểm tra hỗ trợ trình duyệt
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;

            // QUAN TRỌNG: Hủy lệnh đọc cũ đang bị kẹt
            if (synthesis.speaking) {
                synthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(wordToSpeak);
            utterance.lang = 'en-US'; 
            utterance.rate = 0.9;
            
            // Xử lý lỗi nếu có
            utterance.onerror = (evt) => console.error("Speech Error:", evt);

            synthesis.speak(utterance);
        } else {
            alert("Trình duyệt không hỗ trợ phát âm!");
        }
    });
}