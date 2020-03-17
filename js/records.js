let start = location.href.lastIndexOf("/");
let subject_key = location.href.substr(start + 1);

//TYPE: QUIZ / LAB / EXAM
let t_index = location.href.indexOf("=");
let i_type = location.href.substr(t_index + 1);
let mission_type = i_type.substr(0, i_type.indexOf("?"));
let p_cont = document.getElementById("selector");

//ID OF QUIZ / LAB / EXAM
let id_index = location.href.indexOf("id=");
let id_type = location.href.substr(id_index + 3);
let act_id = id_type.substr(0, id_type.indexOf("?"));

function logOut() {
  firebase.auth().signOut();
}

//display guild mission name
function displayGuildMissionName(){
if (mission_type == "lab") {
  lab_ref.child(subject_key).once("value", function(snapshot) {
    snapshot.forEach(function(childe) {
      if (childe.key == act_id) {
        document.getElementById("subject-code").innerHTML =
          "Guild Mission<br> " + childe.child("name").val();
      }
    });
  });
} else if (mission_type == "quiz") {
  quiz_ref.child(subject_key).once("value", function(snapshot) {
    snapshot.forEach(function(childe) {
      if (childe.key == act_id) {
        document.getElementById("subject-code").innerHTML =
          "Guild Mission<br> " + childe.child("name").val();
      }
    });
  });
} else {
  exam_ref.child(subject_key).once("value", function(snapshot) {
    snapshot.forEach(function(childe) {
      if (childe.key == act_id) {
        document.getElementById("subject-code").innerHTML =
          "Guild Mission<br> " + childe.child("name").val();
      }
    });
  });
}
}

displayGuildMissionName();

enrolled_ref.once("value", function(snapshot) {
  snapshot.forEach(function(childsnapshot) {
    childsnapshot.forEach(function(childe) {
      if (childe.key == subject_key) {
        add_user_to_list(childsnapshot.key);
      }
    });
  });
  console.log(participant_list);

  user_ref.once("value", function(snapshot) {
    let selector = document.getElementById("participant-list");
    snapshot.forEach(function(childsnapshot) {
      for (let i = 0; i < participant_list.length; i++) {
        let opt = document.createElement("option");
        if (childsnapshot.key == participant_list[i]) {
          opt.value = participant_list[i];
          let fullname =
            childsnapshot.child("FirstName").val() +
            " " +
            childsnapshot.child("LastName").val();
          opt.text = fullname;
          selector.appendChild(opt);
        }
      }
    });
    p_cont.appendChild(selector);
  });
});

let participant_list = new Array();

function add_user_to_list(id) {
  participant_list.push(id);
}

//selected id

let options = document.getElementById("participant-list");
// let participant = null;
let sub_parent = document.getElementById("input-subs");
options.addEventListener("change", function() {
  document.getElementById("def").style = "display:none";
  participant = options[options.selectedIndex].value;
  console.log(participant);
  sub_parent.innerHTML = "";
  // display subtopics #repeat for lab and exam
  scores_ref.once("value", function(snapshot) {
    // console.log(options.selectedIndex)
    let total_score = 0;
    snapshot.forEach(function(childsnapshot) {
      if (childsnapshot.key == participant) {
        childsnapshot.forEach(function(childe) {
          if (childe.key.toLowerCase().includes(mission_type)) {
            childe.forEach(function(childs) {
              if (childs.key == act_id) {
                let topics = document.createElement("div");
                childs.child("Subtopics").forEach(function(childes) {
                  sub_parent.innerHTML += childes.key + "  ";
                  topics.id = childes.key;
                  topics.innerText = childes.child("xp").val();
                  sub_parent.appendChild(topics);
                  sub_parent.innerHTML += "<br>";

                  total_score += parseInt(childes.child("xp").val());
                });
              }
            });
          }
        });
      }
    });
    document.getElementById("total").innerHTML =
      "<h2>Total Gained XP:</h2> " + total_score;
  });
});

// if(childsnapshot.key == subject_key){
//     childsnapshot.forEach(function(childe){
//         if(childe.key == act_id){
//             let topics = document.createElement("input");
//             childe.child("SubTopics").forEach(function(childes){
//                 sub_parent.innerHTML +=  childes.key + "  ";
//                 topics.id = childes.key;
//                 sub_parent.appendChild(topics);
//                 sub_parent.innerHTML += "<br>"
//             });
//         }
//     });
// }
