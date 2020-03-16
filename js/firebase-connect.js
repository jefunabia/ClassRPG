let firebaseApiKey = "AIzaSyDVUGLPKoEQ-cGgwEoC4wrj2w_k65NrXz8";

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "classrpg-b7837.firebaseapp.com",
    databaseURL: "https://classrpg-b7837.firebaseio.com",
    projectId: "classrpg-b7837",
    storageBucket: "",
    messagingSenderId: "366077905275",
    appId: "1:366077905275:web:ebc3737c4f73af408015de"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    let db = firebase.database();
    let quiz_ref = db.ref("Quizzes");
    let lab_ref = db.ref("Labs");
    let exam_ref = db.ref("Exams");
    let guild_ref = db.ref("Guilds");
    let user_ref = db.ref("Users");
    let enrolled_ref = db.ref("Enrolled_Students");
    let scores_ref = db.ref("Scores");
    let teach_subs_ref = db.ref("Subs_by_teachers")
    // let user_token = "id1"; //aka the current logged in user
 
    
    //returns database ref for reuse
    let prof_info = []
    user_ref.once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.key === firebase.auth().currentUser.uid){
                let fullname = childsnapshot.child("FirstName").val() + " " + childsnapshot.child("LastName").val();
                prof_info.push({
                    name: fullname,
                    course: childsnapshot.child("Course").val(),
                    department:childsnapshot.child("College").val(),
                    sais: childsnapshot.child("UnivID").val(),
                    email:childsnapshot.child("Email").val(),
                    dispname: childsnapshot.child("DisplayName").val()
                });
            }
        });
        show_profile() // ONLY FOR profile.html
    });

    

    
    //returns GUILD database ref for reuse
    // let temp = [];
    // guild_ref.once('value', function(snapshot){    
    //     snapshot.forEach(function(childsnapshot){
    //         temp.push({id:childsnapshot.key, name: childsnapshot.child('course').val()})       
    //     });
    //     dispSubject() // ONLY FOR home-teacher
    //     document.getElementsByClassName("header")[0].innerHTML = "<h1>Greetings, " + prof_info[0].name + " !!</h1>"; //USED BOTH FOR home-teacher and home-student
    // });
    
    let temp = [];
    let subjects = []
    teach_subs_ref.once('value', function(snapshot){    
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.key == firebase.auth().currentUser.uid){
                childsnapshot.forEach(function(childe){
                    temp.push({id:childe.key, name: childe.child('course').val()});
                });
            }
            childsnapshot.forEach(function(childe){
                subjects.push({id:childe.key, name: childe.child('course').val()});
            });       
        });
        dispSubject() // ONLY FOR home-teacher
        document.getElementsByClassName("header")[0].innerHTML = "<h1>Greetings, " + prof_info[0].dispname + " !!</h1>"; //USED BOTH FOR home-teacher and home-student
    });
    
    
    //returns STUDENT ENROLLED SUBJECTS database ref for reuse
    let student_load = []
    enrolled_ref.once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.key === firebase.auth().currentUser.uid){
                childsnapshot.forEach(function(child){
                    student_load.push({id:child.key, name:child.child("name").val()});
                });
            }
        });
        dispSubject() //ONLY FOR home-student
    });
    
    
    //////////////////////////////////////////
    /////////////FOOTNOTES//////////////////////
    //FIREBASE FUNCTION "ERRORS" CAN BE FIXED BY PUTTING THE
    //INDIVIDUAL FIREBASE REF IN THE SPECIFIC JS FILE
    // EXAMPLE//
    // enrolled_ref.once("value", function(snapshot){
    //     dispSubject() //ONLY FOR home-student
    // });
    ////////////IM LAZY SO IMA HEAD OUT//////////////