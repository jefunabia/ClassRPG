
function show_profile(){
    alert("called")
    let prof_parent = document.getElementsByClassName("prof-container")[0];
    prof_parent.innerHTML = 
    "<br><h2>Name:</h5> " + prof_info[0].name +
    "<br><h2>Legion:</h5> " + prof_info[0].course +
    "<br><h2>Guild:</h5> " + prof_info[0].department +
    "<br><h2>SAIS ID:</h5> " + prof_info[0].sais +
    "<br><h2>Email:</h5> " + prof_info[0].email + "<br><br>"

    console.log(prof_info)
    
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


function submit() {
    let name = document.getElementById("fname").value;
    let course = document.getElementById("guild").value;
    let department = document.getElementById("legion").value;
    let sais = document.getElementById("sais").value;

    updateProfile(name, course, department,sais)
    window.alert("Form Submitted!");
    location.reload()
}



//need to fix 
function updateProfile(name, course, department,sais){
    user_ref.child(user_token).update({
        fullname:name,
        course: course,
        department:department,
        sais:sais,
    }).then(()=>{
        alert("done")
    });
}
document.getElementById("profile-form").style.display = "none";

function editProfile() {
    var x = document.getElementById("profile-form");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}