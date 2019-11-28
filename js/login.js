(function() {
  //const db = firebase.firestore();
  //firebase.auth().signOut();
  var flag = 0;
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        //go();
        //check();
        var currentUserEmail = firebase.auth().currentUser.email;
        user_ref.once("value", function(snapshot) {
          snapshot.forEach(function(childsnapshot) {
            console.log(childsnapshot.child("Email").val());
            var email = childsnapshot.child("Email").val();
            if (email == currentUserEmail) {
              var universityID = childsnapshot.child("UnivID").val();
              if (universityID != "") {
                var userType = childsnapshot.child("UserType").val();
                if (userType == "Student") {
                  window.location.replace("./html/home-student.html");
                } else {
                  window.location.replace("./html/home-teacher.html?");
                }
                flag = 1;
              }
            }
          });
          if (flag == 0) {
            window.location.replace("./html/register.html");
          }
        });

        //firestore ver
        /*db.collection("users")
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
                  window.location.replace("html/home-teacher.html");
                  console.log("valid");
                  flag = 1;
                }
              }
            });
            if (flag == 0) {
              window.location.replace("html/register.html");
            }
          });*/

        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "main.html",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider
        .PROVIDER_ID /*,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID*/
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>"
  };

  ui.start("#firebaseui-auth-container", uiConfig);
})();