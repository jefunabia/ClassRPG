let start = location.href.lastIndexOf("/");
let subject_key = location.href.substr(start + 1);

//TYPE: QUIZ / LAB / EXAM
let t_index = location.href.indexOf("=");
let i_type = location.href.substr(t_index + 1);
let mission_type = i_type.substr(0, i_type.indexOf("?"));
let p_cont = document.getElementById("selector");

//ID OF QUIZ / LAB / EXAM
let activityIndexOfId = location.href.indexOf("id=");
let activityType = location.href.substr(activityIndexOfId + 3);
let activityId = activityType.substr(0, activityType.indexOf("?"));
console.log(activityId);

function logOut() {
  firebase.auth().signOut();
}

function getGuildMissionRef(missionType){
  let missionRef = "";
  if(missionType == "lab"){
    missionRef = lab_ref;
  } else if(missionType == "quiz"){
    missionRef = quiz_ref;
  } else{
    missionRef = exam_ref;
  }
  return missionRef;
}

let missionRef = getGuildMissionRef(mission_type);
// display guild mission name
function displayGuildMissionName(){
  missionRef.child(subject_key).once("value", function(snapshot){
    snapshot.forEach(function(childe) {
      if (childe.key == activityId) {
        document.getElementById("subject-code").innerHTML =
          "Guild Mission<br> " + childe.child("name").val();
      }
    });
  });
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
    let selector = document.createElement("select");
    selector.id = "participant-list";
    selector.innerHTML = "<option>nothing yet</option>";
    snapshot.forEach(function(childsnapshot) {
      for (let i = 0; i < participant_list.length; i++) {
        let opt = document.createElement("option");
        if (childsnapshot.key == participant_list[i]) {
          selector.innerHTML = "";
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

//display subtopics #repeat for lab and exam
missionRef.once("value", function(snapshot) {
  let sub_parent = document.getElementById("input-subs");
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == subject_key) {
      childsnapshot.forEach(function(childe) {
        if (childe.key == activityId) {
          let topics = document.createElement("input");
          childe.child("SubTopics").forEach(function(childes) {
            sub_parent.innerHTML += childes.key + "  ";
            topics.id = childes.key;
            sub_parent.appendChild(topics);
            sub_parent.innerHTML += "<br>";
          });
        }
      });
    }
  });
});

let participant_list = new Array();
function add_user_to_list(id) {
  participant_list.push(id);
}

function getMissionTypeDatabaseName(){
  if(mission_type.includes("quiz")){
    return "Quizzes";
  } else if(missionRef.toString().includes("lab")){
    return "Labs";
  } else{
    return "Exams"
  }
}
function submitActivityScore() {
  let sub_parent = document.getElementById("input-subs");
  let options = document.getElementById("participant-list").options;
  let participant = options[options.selectedIndex].value;
  let missionType = getMissionTypeDatabaseName();
  let xp = 0;
  for (let i = 0; i < sub_parent.getElementsByTagName("input").length; i++) {
    let sub_id = sub_parent.getElementsByTagName("input")[i].getAttribute("id").replace(/\s+/g, " ");
    let sub_input = "";
    try {
      sub_input = document.getElementById(sub_id).value;
    } catch {
      console.log("something went wrong");
    } finally {
      missionRef.once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
          if(childsnapshot.key == subject_key){
            childsnapshot.forEach(function(childe){
              if(childe.key == activityId){
                childe.child("SubTopics").forEach(function(childes){
                  if(sub_id == childes.key){
                    scores_ref.once("value", function(snapshot){
                      snapshot.forEach(function(childsnapshot) {
                        childsnapshot.forEach(function(childe) {
                          if (childe.hasChildren()) {
                            if(sub_input != ""){
                              xp = parseInt(sub_input);
                              scores_ref.child(participant).child(missionType).child(activityId).child("Subtopics").child(sub_id)
                              .update({
                                title: childes.child("title").val(),
                                xp: xp
                              }).then(() => {
                                xp = 0
                                alert("XP added successfully!");
                                location.href = "../html/home-teacher.html";
                              });
                            }
                          }
                        });
                      });
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
  }
}
