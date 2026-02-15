const firebaseConfig = {
    apiKey: "AIzaSyDZ930j5aFGF3Mh6YCawQ-0jnzhGWN-dEQ",
    authDomain: "kaloleni-church.firebaseapp.com",
    projectId: "kaloleni-church",
    storageBucket: "kaloleni-church.firebasestorage.app",
    messagingSenderId: "1069887395313",
    appId: "1:1069887395313:web:ee2b704bfea55bda87e050",
    measurementId: "G-MG5S5E2XDF"
};

// --- Diagnostic Initialization ---
let auth, db;

try {
    if (typeof firebase === 'undefined') {
        throw new Error("Firebase SDK not loaded. Check your internet connection or script tags in HTML.");
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized for Project:", firebaseConfig.projectId);
    }

    auth = firebase.auth();
    db = firebase.firestore();

    // Initialize Analytics if available (optional)
    if (typeof firebase.analytics === 'function') {
        firebase.analytics();
        console.log("Analytics initialized.");
    }

} catch (error) {
    console.error("Firebase Initialization Error:", error);
    // Show a helpful alert to the user so they can report the exact error
    alert("Firebase Error: " + error.message + "\n\nPlease ensure you have followed the setup guide and have a stable internet connection.");
}
