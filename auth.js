import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth();

// Update header based on authentication state
onAuthStateChanged(auth, (user) => {
    const signOutButton = document.getElementById('signOutButton');
    const navLinks = document.querySelectorAll('.nav-link');

    if (user) {
        // User is signed in
        signOutButton.style.display = 'block'; // Show the Sign Out button
        navLinks.forEach(link => link.style.display = 'none'); // Optionally hide other nav links
    } else {
        // No user is signed in
        signOutButton.style.display = 'none'; // Hide the Sign Out button
        navLinks.forEach(link => link.style.display = 'inline-block'); // Show the nav links
    }
});

// Sign out functionality
document.getElementById('signOutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User signed out');
        window.location.href = 'login.html'; // Redirect to login page or home page
    }).catch((error) => {
        console.error('Sign Out Error', error);
    });
});
