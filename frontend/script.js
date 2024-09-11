import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyf4Nz_IpQ-kZ7YZoV-U8hR45lW_oquyE",
    authDomain: "fastcare-5c2e5.firebaseapp.com",
    projectId: "fastcare-5c2e5",
    storageBucket: "fastcare-5c2e5.appspot.com",
    messagingSenderId: "581612897761",
    appId: "1:581612897761:web:365d069d03843b66bf3ea0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle sign-out
function handleSignOut() {
    signOut(auth).then(() => {
        console.log('User signed out');
        window.location.href = 'login.html'; // Redirect to login page
    }).catch((error) => {
        console.error('Sign Out Error:', error);
    });
}

// Function to handle auth link click
function handleAuthLinkClick(event) {
    event.preventDefault(); // Prevent default link behavior
    const authLink = document.getElementById('authLink');
    if (auth.currentUser) {
        // User is signed in, handle sign out
        handleSignOut();
    } else {
        // User is not signed in, redirect to login page
        window.location.href = 'login.html';
    }
}

// Function to update the auth link based on authentication state
function updateAuthLink(user) {
    const authLink = document.getElementById('authLink');
    if (user) {
        // User is signed in
        authLink.textContent = 'Sign Out';
        authLink.href = '#'; // Prevent default link behavior
        authLink.addEventListener('click', handleAuthLinkClick);
    } else {
        // User is not signed in
        authLink.textContent = 'Sign In/Sign Up';
        authLink.href = 'login.html'; // Redirect to login page
        authLink.removeEventListener('click', handleAuthLinkClick); // Remove sign-out listener
    }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    updateAuthLink(user);
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            console.log('User signed in:', userCredential.user);
            if (role === 'doctor') {
                window.location.href = 'index.html'; // Redirect to doctor dashboard
            } else if (role === 'patient') {
                window.location.href = 'Patient Portal/patient-dashboard.html'; // Redirect to patient dashboard
            } else {
                // Handle case if role is not selected properly
                document.getElementById('error-message').textContent = 'Please select a valid role.';
            }
        })
        .catch((error) => {
            // Display error message on the page
            const errorMessage = document.getElementById('error-message');
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.textContent = 'Invalid email address.';
                    break;
                case 'auth/user-not-found':
                    errorMessage.textContent = 'No user found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage.textContent = 'Incorrect password.';
                    break;
                default:
                    errorMessage.textContent = 'Error signing in. Please try again.';
            }
        });
}

// Wait until the DOM is fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
