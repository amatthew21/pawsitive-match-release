document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message;

    if (response.ok) {
        // Set a session variable to indicate login success
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem('username', data.user.username);

        // Redirect to home page after successful login
        window.location.href = '../html/home.html';
    }
});
