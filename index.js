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
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  auth.signOut();
  auth
    .signInWithEmailAndPassword(email, pass)
    .then(user => {
      username.innerHTML = "Welcome, " + user.user.displayName;
      usernamedb = user.user.displayName;
    })
    .then(() => {
      signinpage.style.display = "none";
      loggedin.style.display = "block";
      logoutbtn.style.display = "block";
    });
};
