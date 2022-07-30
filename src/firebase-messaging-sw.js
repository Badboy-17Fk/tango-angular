importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({

    apiKey: "AIzaSyBgMkbU2R-H8BFojt43ZCGK0N5TPc0XlEQ",
    authDomain: "tango-admin-stock.firebaseapp.com",
    projectId: "tango-admin-stock",
    storageBucket: "tango-admin-stock.appspot.com",
    messagingSenderId: "878676859415",
    appId: "1:878676859415:web:2133157b669b4f662b5a52"
});
const messaging = firebase.messaging();