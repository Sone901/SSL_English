// frontend/register.js
const API_URL = 'http://localhost:5000/api/auth';

const registerForm = document.getElementById('registerForm');
const messageEl = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageEl.innerText = '';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // Success: Auto-login logic
            localStorage.setItem('token', data.token);
            localStorage.setItem('userName', data.name);
            alert('Đăng ký thành công!');
            window.location.href = 'dashboard.html';
        } else {
            messageEl.innerText = data.message || 'Đăng ký thất bại';
        }
    } catch (error) {
        console.error('Error:', error);
        messageEl.innerText = 'Lỗi máy chủ. Vui lòng thử lại sau.';
    }
});