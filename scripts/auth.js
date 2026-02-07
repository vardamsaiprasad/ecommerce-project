// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.style.display = 'none';
}

// Login form validation and submission
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!validateEmail(email)) {
      showError('email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      hideError('email-error');
    }

    if (!password) {
      showError('password-error', 'Password is required.');
      isValid = false;
    } else {
      hideError('password-error');
    }

    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = 'index.html';
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    }
  });
}

// Signup form validation and submission
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;

    if (!fullName) {
      showError('fullName-error', 'Full name is required.');
      isValid = false;
    } else {
      hideError('fullName-error');
    }

    if (!validateEmail(email)) {
      showError('email-error', 'Please enter a valid email address.');
      isValid = false;
    } else {
      hideError('email-error');
    }

    if (!validatePassword(password)) {
      showError('password-error', 'Password must be at least 8 characters with uppercase, lowercase, and number.');
      isValid = false;
    } else {
      hideError('password-error');
    }

    if (password !== confirmPassword) {
      showError('confirmPassword-error', 'Passwords do not match.');
      isValid = false;
    } else {
      hideError('confirmPassword-error');
    }

    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Signup successful!');
        window.location.href = 'index.html';
      } catch (error) {
        alert('Signup failed: ' + error.message);
      }
    }
  });
}

// Auth state observer
onAuthStateChanged(auth, (user) => {
  const nav = document.querySelector('.navbar nav');
  const existingAuthLink = nav.querySelector('.auth-link');
  if (existingAuthLink) {
    existingAuthLink.remove();
  }

  if (user) {
    // User is signed in
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.className = 'auth-link';
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        alert('Logged out successfully!');
        window.location.href = 'index.html';
      } catch (error) {
        alert('Logout failed: ' + error.message);
      }
    });
    nav.appendChild(logoutLink);
  } else {
    // User is signed out
    const loginLink = document.createElement('a');
    loginLink.href = 'login.html';
    loginLink.textContent = 'Login';
    loginLink.className = 'auth-link';
    nav.appendChild(loginLink);
  }
});
