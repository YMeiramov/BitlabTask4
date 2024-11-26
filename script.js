
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const country = document.getElementById('country').value;
    const birthdate = document.getElementById('birthdate').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ email, password, fullName, country, birthdate });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please log in.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'profile.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});


if (window.location.pathname.includes('profile.html')) {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        alert('Please log in first.');
        window.location.href = 'login.html';
    } else {
        document.body.innerHTML = `
            <header>
                <div class="navbar">
                    <span>TWITTER</span>
                    <span>${user.fullName}</span>
                    <a href="#" onclick="logout()">Logout</a>
                </div>
            </header>
            <main>
                <h1>Welcome ${user.fullName}</h1>
                <p>Email: ${user.email}</p>
                <p>Full Name: ${user.fullName}</p>
                <p>Country: ${user.country}</p>
                <p>Birthdate: ${user.birthdate}</p>
            </main>
        `;
    }
}


function logout() {
    sessionStorage.removeItem('loggedInUser');
    alert('You have logged out.');
    window.location.href = 'login.html';
}
