var app_fireBase = {};
let firebaseApiKey = "AIzaSyDVUGLPKoEQ-cGgwEoC4wrj2w_k65NrXz8";
(function(){
var firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "classrpg-b7837.firebaseapp.com",
  databaseURL: "https://classrpg-b7837.firebaseio.com",
  projectId: "classrpg-b7837",
  storageBucket: "classrpg-b7837.appspot.com",
  messagingSenderId: "366077905275",
  appId: "1:366077905275:web:ebc3737c4f73af408015de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  app_fireBase = firebase;
})()
