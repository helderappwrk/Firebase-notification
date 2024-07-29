importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


// Initialize the Firebase app in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyBQUu7rrils0y9fHLR8pZDzlHMqIllJfk8",
  authDomain: "testing-87675.firebaseapp.com",
  projectId: "testing-87675",
  storageBucket: "testing-87675.appspot.com",
  messagingSenderId: "12456568743",
  appId: "1:12456568743:web:150dbc15f876eec0317882",
  measurementId: "G-1SBLHTLQ8M",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
