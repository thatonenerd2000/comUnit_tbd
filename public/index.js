// Initialize Firebase
var config = {
  apiKey: "AIzaSyC5QW6cFO5eumX5DadyHNonNZjwQCxRMSE",
  authDomain: "comunit-fbac5.firebaseapp.com",
  databaseURL: "https://comunit-fbac5.firebaseio.com",
  projectId: "comunit-fbac5",
  storageBucket: "comunit-fbac5.appspot.com",
  messagingSenderId: "795767464892"
};
firebase.initializeApp(config);

var auth = firebase.auth();

login = () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var wrongLabel = document.getElementById("wronglabel");
  auth.signOut();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
      console.log("it reacherd here");
    }).catch(error => {
      console.log(error);
      wrongLabel.style.display = "block";
    })
};
