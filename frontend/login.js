const API_URL = 'http://localhost:5000/api/auth';

// 1. Handle Standard Email/Password Login
const loginForm = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageEl.innerText = ''; // Clear previous errors

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            handleLoginSuccess(data.token, data.name);
        } else {
            messageEl.innerText = data.message || 'Login failed';
        }
    } catch (error) {
        console.error('Error:', error);
        messageEl.innerText = 'Server error. Please try again later.';
    }
});



// 2. Handle Google Login Response
// This function is called automatically by the Google script when the popup closes
async function handleGoogleCredentialResponse(response) {
    try {
        const res = await fetch(`${API_URL}/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential })
        });

        const data = await res.json();

        if (res.ok) {
            handleLoginSuccess(data.token, data.name);
        } else {
            messageEl.innerText = 'Google login failed';
        }
    } catch (error) {
        console.error('Google Auth Error:', error);
        messageEl.innerText = 'Could not connect to Google login.';
    }
}

// 3. Common Success Handler
function handleLoginSuccess(token, name) {
    // Save token to LocalStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userName', name);

    // Redirect to Dashboard
    // Ensure you have a dashboard.html file to go to
    window.location.href = 'dashboard.html';
}