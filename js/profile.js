

function show_profile(){
    alert("called")
    let prof_parent = document.getElementsByClassName("prof-container")[0];
    prof_parent.innerHTML = 
    "<br><h2>Name:</h5> " + prof_info[0].name +
    "<br><h2>Legion:</h5> " + prof_info[0].course +
    "<br><h2>Guild:</h5> " + prof_info[0].department +
    "<br><h2>SAIS ID:</h5> " + prof_info[0].sais +
    "<br><h2>Email:</h5> " + prof_info[0].email + "<br><br>"

    // console.log(prof_info)
    
}


function submit() {
    let name = document.getElementById("fname").value;
    let course = document.getElementById("guild").value;
    let department = document.getElementById("legion").value;
    let sais = document.getElementById("sais").value;

    updateProfile(name, course, department,sais)
    window.alert("Form Submitted!");
    location.reload()
}




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