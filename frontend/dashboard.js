const API_URL = 'http://localhost:5000/api';
let allWords = [];
let currentDailyChallenge = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check Auth
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    document.getElementById('navUserName').innerText = `Xin chào, ${userName || 'User'}!`;

    // 2. Load Home Data
    await loadDashboardData(token);
    
    // 3. Setup Events
    setupNavigation();
    setupSearch(token);
    
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'login.html';
    });
});

// --- NAVIGATION LOGIC ---
function setupNavigation() {
    // Nút "Học 10 từ hôm nay" ở Navbar & Gợi ý
    const startLearning = () => {
        if (currentDailyChallenge.length > 0) {
            localStorage.setItem('learningQueue', JSON.stringify(currentDailyChallenge));
            window.location.href = 'learn.html';
        } else {
            alert('Đang tải dữ liệu, vui lòng thử lại sau giây lát!');
        }
    };

    document.getElementById('navDailyWord').addEventListener('click', startLearning);
    document.getElementById('bannerStartBtn').addEventListener('click', startLearning);
    document.getElementById('suggestDailyBtn').addEventListener('click', startLearning);
}

function showHome() {
    document.getElementById('homeSection').classList.remove('hidden');
    document.getElementById('vocabSection').classList.add('hidden');
    window.scrollTo(0,0);
}

async function showVocabulary() {
    document.getElementById('homeSection').classList.add('hidden');
    document.getElementById('vocabSection').classList.remove('hidden');
    
    // Load từ vựng nếu chưa có
    if (allWords.length === 0) {
        const token = localStorage.getItem('token');
        await fetchAllWords(token);
    }
}

// --- DATA FETCHING ---

// frontend/dashboard.js

// ... (Các phần code cũ giữ nguyên) ...

// Thay thế hàm loadDashboardData cũ để lấy dữ liệu attendance
// frontend/dashboard.js

async function loadDashboardData(token) {
    try {
        const res = await fetch(`${API_URL}/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        // 1. Hiển thị Từ của ngày (Giữ nguyên)
        if (data.wordOfTheDay) {
            document.getElementById('wotdWord').innerText = data.wordOfTheDay.word;
            document.getElementById('wotdPronun').innerText = data.wordOfTheDay.pronunciation || '';
            document.getElementById('wotdMeaning').innerText = data.wordOfTheDay.definitionVi;
        }

        // 2. Lưu Daily Challenge (Giữ nguyên)
        currentDailyChallenge = data.dailyChallenge || [];

        // 3. Render Lịch điểm danh (Giữ nguyên)
        const attendanceDates = data.user.attendance || [];
        renderRealCalendar(attendanceDates);

        // --- 4. RENDER BIỂU ĐỒ ACTIVITY (SỬA LẠI: DÙNG DỮ LIỆU THẬT 100%) ---
        // Xóa hết đoạn "if (!data.weeklyActivity)... const mockData..." cũ đi
        
        // Chỉ cần dòng này thôi:
        renderActivityChart(data.weeklyActivity || []); 

    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}
// frontend/dashboard.js

// frontend/dashboard.js

function renderActivityChart(weeklyData) {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // 1. XỬ LÝ DỮ LIỆU
    const safeData = weeklyData || [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Lấy số phút thực tế từng ngày
    const dataActual = days.map(dayLabel => {
        const found = safeData.find(d => d.day === dayLabel);
        return found ? found.minutes : 0; 
    });

    // Cột nền màu xám (Mục tiêu):
    // Mặc định là 60 phút. Nhưng nếu bạn học vượt quá 60 phút (ví dụ 90p), 
    // cột nền sẽ tự cao lên bằng số phút thực tế để không bị tràn.
    const maxVal = Math.max(60, ...dataActual); 
    const dataBackground = days.map(() => maxVal);

    // Tô màu cột hôm nay (Xanh đậm)
    const todayIndex = new Date().getDay(); 
    const chartTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1;
    const barColors = days.map((_, i) => i === chartTodayIndex ? '#3b82f6' : '#93c5fd');

    if (window.myActivityChart) {
        window.myActivityChart.destroy();
    }

    // 2. VẼ BIỂU ĐỒ
    window.myActivityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [
                // Dataset 0: Cột Xanh (Dữ liệu thực tế từng phút)
                {
                    data: dataActual,
                    backgroundColor: barColors,
                    borderRadius: 50,
                    borderSkipped: false,
                    barPercentage: 0.5,
                    categoryPercentage: 0.8,
                    grouped: false,
                    order: 1,
                    label: 'Thực tế'
                },
                // Dataset 1: Cột Xám (Nền mục tiêu)
                {
                    data: dataBackground,
                    backgroundColor: '#f3f4f6', // Xám nhạt hơn chút cho đẹp
                    hoverBackgroundColor: '#f3f4f6',
                    borderRadius: 50,
                    borderSkipped: false,
                    barPercentage: 0.5,
                    categoryPercentage: 0.8,
                    grouped: false,
                    order: 2,
                    label: 'Mục tiêu'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1e293b',
                    titleFont: { size: 13, family: "'Nunito', sans-serif" },
                    bodyFont: { size: 13, family: "'Nunito', sans-serif", weight: 'bold' },
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        // Chỉ hiện thông số của cột Xanh (Thực tế)
                        filter: function(tooltipItem) {
                            return tooltipItem.datasetIndex === 0;
                        },
                        title: function(context) {
                            const map = {
                                'Mon': 'Thứ Hai', 'Tue': 'Thứ Ba', 'Wed': 'Thứ Tư', 
                                'Thu': 'Thứ Năm', 'Fri': 'Thứ Sáu', 'Sat': 'Thứ Bảy', 'Sun': 'Chủ Nhật'
                            };
                            return map[context[0].label] || context[0].label;
                        },
                      
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: maxVal, // Chiều cao tối đa linh hoạt
                    border: { display: false },
                    grid: { 
                        display: true, // Hiện lưới ngang mờ để dễ nhìn mức độ
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        // --- THAY ĐỔI QUAN TRỌNG TẠI ĐÂY ---
                        // Bỏ stepSize: 15 để Chart tự chia vạch (0, 10, 20...)
                        // stepSize: 15, <--- ĐÃ XÓA
                        maxTicksLimit: 6, // Giới hạn số lượng vạch để không bị rối
                        font: { size: 10, weight: 'bold', family: "'Nunito', sans-serif" },
                        color: '#94a3b8',
                        padding: 10
                    }
                },
                x: {
                    border: { display: false },
                    grid: { display: false },
                    ticks: {
                        font: { size: 11, family: "'Nunito', sans-serif" },
                        color: '#64748b'
                    }
                }
            },
            animation: { duration: 0 }
        }
    });
}
// --- HÀM VẼ LỊCH THỰC TẾ ---
function renderRealCalendar(attendedDates) {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = ''; // Xóa nội dung cũ

    const now = new Date();
    const currentMonth = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();
    const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD của hôm nay

    // 1. Vẽ Header Thứ (S M T W T F S)


    // 2. Tính toán lịch
    // Ngày đầu tiên của tháng là thứ mấy? (0 = Sunday, 1 = Monday...)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    // Tháng này có bao nhiêu ngày?
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // 3. Vẽ các ô trống trước ngày mùng 1
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    // 4. Vẽ các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
        // Tạo chuỗi YYYY-MM-DD cho ngày đang vẽ để so sánh
        // Lưu ý: Tháng trong JS bắt đầu từ 0 nên phải +1, và thêm số 0 đằng trước nếu < 10
        const monthStr = String(currentMonth + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateString = `${currentYear}-${monthStr}-${dayStr}`;

        let dotClass = '';
        
        if (dateString === todayStr) {
            // HÔM NAY -> MÀU ĐỎ (Dù đã học hay chưa thì hôm nay vẫn nổi bật)
            dotClass = 'text-red-500 scale-125'; 
        } else if (attendedDates.includes(dateString)) {
            // QUÁ KHỨ ĐÃ HỌC -> MÀU XANH
            dotClass = 'text-green-500';
        } else {
            // CHƯA HỌC -> MÀU XÁM
            dotClass = 'text-gray-200';
        }

        // Render HTML
        grid.innerHTML += `
            <div class="flex flex-col items-center justify-center h-8">
                <div class="${dotClass} text-[10px] transition-all duration-300">
                    <i class="fas fa-circle"></i>
                </div>
                <span class="text-[10px] text-gray-500 mt-1">${day}</span>
            </div>
        `;
    }
}

async function fetchAllWords(token) {
    const tbody = document.getElementById('vocabTableBody');
    tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center"><i class="fas fa-spinner fa-spin"></i> Đang tải...</td></tr>';

    try {
        const res = await fetch(`${API_URL}/words`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        allWords = await res.json();
        renderVocabTable(allWords);
    } catch (error) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-red-500">Lỗi tải dữ liệu</td></tr>';
    }
}

// --- RENDERING ---

function renderCalendarMockup() {
    const grid = document.getElementById('calendarGrid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = '';

    // Render Header
    days.forEach(d => html += `<div class="font-bold text-gray-400">${d}</div>`);

    // Render Dots (Giả lập 1 tháng 4 tuần)
    for (let i = 0; i < 28; i++) {
        // Random trạng thái xanh (đã học) hoặc xám
        const isStudied = Math.random() > 0.6; 
        const colorClass = isStudied ? 'text-green-500' : 'text-gray-200';
        html += `<div class="${colorClass}"><i class="fas fa-circle"></i></div>`;
    }
    grid.innerHTML = html;
}

function renderVocabTable(words) {
    const tbody = document.getElementById('vocabTableBody');
    if (words.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center">Không tìm thấy từ vựng</td></tr>';
        return;
    }

    tbody.innerHTML = words.map(w => `
        <tr class="hover:bg-red-50 transition">
            <td class="p-4 font-bold text-indigo-700">${w.word}</td>
            <td class="p-4 text-sm text-gray-500">${w.pronunciation || ''}</td>
            <td class="p-4 text-sm italic">${w.pos || ''}</td>
            <td class="p-4 font-medium">${w.definitionVi}</td>
            <td class="p-4 text-sm text-gray-500 hidden md:table-cell truncate max-w-xs">${w.example || ''}</td>
        </tr>
    `).join('');
}

// --- SEARCH & TRANSLATE ---

function setupSearch(token) {
    const input = document.getElementById('searchWordInput');
    input.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = allWords.filter(w => 
            w.word.toLowerCase().includes(keyword) || 
            w.definitionVi.toLowerCase().includes(keyword)
        );
        renderVocabTable(filtered);
    });
}

function mockTranslate() {
    // Đây là hàm giả lập vì chưa có API dịch
    const input = document.getElementById('translateInput').value.toLowerCase().trim();
    const resultEl = document.getElementById('translateResult');
    
    if (!input) return;

    // Tìm trong từ điển nội bộ trước
    const found = allWords.find(w => w.word.toLowerCase() === input);
    if (found) {
        resultEl.innerText = `Nghĩa: ${found.definitionVi}`;
    } else {
        resultEl.innerText = "Hệ thống đang cập nhật API Google Translate...";
    }
}