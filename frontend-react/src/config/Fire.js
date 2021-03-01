import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAHzWNu0SVxelvdw9qGTTPXn_vU2x17Mj0",
    authDomain: "ad320-thurs-w21-team1.firebaseapp.com",
    databaseURL: "",
    projectId: "ad320-thurs-w21-team1",
    storageBucket: "ad320-thurs-w21-team1.appspot.com",
    messagingSenderId: "492591355706",
    appId: "1:492591355706:web:00f156a28341d4ce6b2203"
};

const fire = firebase.initializeApp(config);
export default fire;