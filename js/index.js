//firebase.auth().signOut();
var currentUserEmail;

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
              window.location.replace("./html/home-student.html");
            } else {
              window.location.replace("./html/home-teacher.html");
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