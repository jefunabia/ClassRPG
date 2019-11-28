//const db = firebase.firestore();

const form = document.querySelector("#signup-form");
//var firebase = app_fireBase;
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uid = null;
var currentUserEmail;
var flag = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUserEmail = firebase.auth().currentUser.email;
    console.log(currentUserEmail);
    user_ref.once("value", function(snapshot) {
      snapshot.forEach(function(childsnapshot) {
        console.log(childsnapshot.child("Email").val());
        var email = childsnapshot.child("Email").val();
        if (email == currentUserEmail) {
          var universityID = childsnapshot.child("UnivID").val();
          console.log(universityID);
          if (universityID != "") {
            var userType = childsnapshot.child("UserType").val();
            if (userType == "Student") {
              window.location.replace("../html/home-student.html");
            } else {
              window.location.replace("../html/home-teacher.html");
            }
            flag = 1;
          }
        }
      });
      /*if (flag == 0) {
        window.location.replace("../html/register.html");
      }*/
    });
    // User is signed in.
  } else {
    //redirect to log in page
    //window.location.replace("../index.html");
  }
});

var currentUserEmailText = document.getElementById("currentUserEmail1");
//JM :: key should be user id instead of push()
form.addEventListener("submit", evt => {
  evt.preventDefault();
  user_ref.child(firebase.auth().currentUser.uid).set({
    FirstName: form.firstName.value,
    LastName: form.lastName.value,
    DisplayName: form.displayName.value,
    UnivID: form.univId.value,
    UserType: form.class.value,
    College: form.legion.value,
    Course: form.guild.value,
    Email: currentUserEmail
  });

  user_ref.once("value", function(snapshot) {
    snapshot.forEach(function(childsnapshot) {
      console.log(childsnapshot.child("Email").val());
      var email = childsnapshot.child("Email").val();
      if (email == currentUserEmail) {
        var universityID = childsnapshot.child("UnivID").val();
        console.log(universityID);
        if (universityID != "") {
          var userType = childsnapshot.child("UserType").val();
          if (userType == "Student") {
            window.location.replace("../html/home-student.html");
          } else {
            window.location.replace("../html/home-teacher.html");
          }
          flag = 1;
        }
      }
    });
    if (flag == 0) {
      window.location.replace("../html/register.html");
    }
  });
});

//saving data(firestore ver)
/*
form.addEventListener("submit", evt => {
  evt.preventDefault();
  db.collection("users").add({
    FirstName: form.firstName.value,
    LastName: form.lastName.value,
    DisplayName: form.displayName.value,
    SaisID: form.saisId.value,
    UserType: form.class.value,
    College: form.legion.value,
    Course: form.guild.value,
    Email: currentUserEmail
  });
  db.collection("users")
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        var email = doc.data().Email;
        if (email == currentUserEmail) {
          console.log(email);
          console.log(currentUserEmail);
          var saisID = doc.data().SaisID;
          console.log(saisID);
          if (saisID != "") {
            window.location.replace("../html/home-teacher.html");
            console.log("valid");
            flag = 1;
          }
        }
      });
      if (flag == 0) {
        window.location.replace("../html/register.html");
      }
    });
});*/