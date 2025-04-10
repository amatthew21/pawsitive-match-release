document.addEventListener('DOMContentLoaded', async function () {
    async function checkLogin() {
        try {
            const response = await fetch('http://localhost:5000/me', { credentials: 'include' });
            const data = await response.json();

            const userStatus = document.getElementById('user-status');
            const logoutButton = document.getElementById('logout');

            if (data.user) {
                userStatus.textContent = `Logged in as ${data.user.username}`;
                logoutButton.style.display = "block"; // Show logout button
            } else {
                userStatus.textContent = "Not logged in";
                logoutButton.style.display = "none"; // Hide logout button
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }
    }

    document.getElementById('logout').addEventListener('click', async () => {
        await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        document.getElementById('user-status').textContent = "Logged out";
        document.getElementById('logout').style.display = "none"; // Hide logout button
    });

    await checkLogin();
});
