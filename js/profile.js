// import { type } from "os";

function logOut() {
  firebase.auth().signOut();
}

function show_profile() {
  let prof_parent = document.getElementsByClassName("prof-container")[0];
  prof_parent.innerHTML =
    "<br><h2>Name:</h5> " +
    prof_info[0].name +
    "<br><h2>Legion:</h5> " +
    prof_info[0].course +
    "<br><h2>Guild:</h5> " +
    prof_info[0].department +
    "<br><h2>SAIS ID:</h5> " +
    prof_info[0].sais +
    "<br><h2>Email:</h5> " +
    prof_info[0].email +
    "<br><br>";

  console.log(prof_info);
}

//returns database ref for reuse
// user_ref.once("value", function(snapshot){
//     snapshot.forEach(function(childsnapshot){
//         if(childsnapshot.key === firebase.auth().currentUser.uid){
//             alert("ASdada")
//             let fullname = childsnapshot.child("FirstName").val() + " " + childsnapshot.child("LastName").val();
//             let prof_parent = document.getElementsByClassName("prof-container")[0];
//                 prof_parent.innerHTML =
//                 "<br><h2>Name:</h5> " + fullname +
//                 "<br><h2>Legion:</h5> " +childsnapshot.child("Course").val() +
//                 "<br><h2>Guild:</h5> " + childsnapshot.child("College").val() +
//                 "<br><h2>SAIS ID:</h5> " +childsnapshot.child("UnivID").val() +
//                 "<br><h2>Email:</h5> " + childsnapshot.child("Email").val() + "<br><br>"

//         }
//     });
// });
let form = document.querySelector("#profile-sub");
form.addEventListener("submit", evt => {
  evt.preventDefault();
  let legion = form.legion.value;
  let guild = form.guild.value;
  let dname = document.getElementById("dname").value;
  if (legion == "") {
    legion = prof_info[0].course;
  }
  if (guild == "") {
    guild = prof_info[0].department;
  }
  user_ref.child(firebase.auth().currentUser.uid).update({
    DisplayName: dname
  });
  user_ref.child(firebase.auth().currentUser.uid).update({
    Course: legion
  });
  user_ref.child(firebase.auth().currentUser.uid).update({
    College: guild
  });
  location.reload();
});

document.getElementById("profile-form").style.display = "none";

function editProfile() {
  var x = document.getElementById("profile-form");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
