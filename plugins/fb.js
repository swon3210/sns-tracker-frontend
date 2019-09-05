import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import Firebase from 'firebase'
 
require('firebase/firestore')
 
Vue.use(VueFirestore)

// Initialize Firebase
if (!Firebase.apps.length) {
  Firebase.initializeApp({
    apiKey: "AIzaSyC7yCDP6owBa_h7TsJQeQOqEz4g02-FqrE",
    authDomain: "my-user-project-249107.firebaseapp.com",
    databaseURL: "https://my-user-project-249107.firebaseio.com",
    projectId: "my-user-project-249107",
    storageBucket: "",
    messagingSenderId: "508994781040",
    appId: "1:508994781040:web:74e334628a973f89"
  });
}
 
const firestore = firebaseApp.firestore();

