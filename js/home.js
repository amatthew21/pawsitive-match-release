document.addEventListener('DOMContentLoaded', async function () {
    // Check if the user is logged in by checking sessionStorage
    const loggedIn = sessionStorage.getItem('loggedIn');
    const userStatusElement = document.getElementById('user-status');
    const loginButton = document.querySelector('.nav-item.nav-link[href="login.html"]');
    const logoutButton = document.getElementById('logout');

    if (loggedIn === 'true') {
        const username = sessionStorage.getItem('username');
        
        // Show the user status
        userStatusElement.textContent = `Logged in as ${username}`;
        
        // Hide the login button and show the logout button
        loginButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
    } else {
        userStatusElement.textContent = 'Not logged in';
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
    }

    // Logout functionality
    logoutButton.addEventListener('click', async () => {
        await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        
        userStatusElement.textContent = "Logged out";
        loginButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        
        window.location.href = '../html/home.html';
    });
});
