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
console.log(act_id);

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
quiz_ref.once("value", function(snapshot) {
  let sub_parent = document.getElementById("input-subs");
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == subject_key) {
      childsnapshot.forEach(function(childe) {
        if (childe.key == act_id) {
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

lab_ref.once("value", function(snapshot) {
  let sub_parent = document.getElementById("input-subs");
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == subject_key) {
      childsnapshot.forEach(function(childe) {
        if (childe.key == act_id) {
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

exam_ref.once("value", function(snapshot) {
  let sub_parent = document.getElementById("input-subs");
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == subject_key) {
      childsnapshot.forEach(function(childe) {
        if (childe.key == act_id) {
          let topics = document.createElement("input");
          childe.child("SubTopics").forEach(function(childes) {
            sub_parent.innerHTML += childes.child("title").val() + "  ";
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

function submit() {
  let sub_parent = document.getElementById("input-subs");
  let options = document.getElementById("participant-list").options;
  let participant = options[options.selectedIndex].value;
  let subnames = new Array();
  for (let i = 0; i < sub_parent.getElementsByTagName("input").length; i++) {
    let sub_id = sub_parent
      .getElementsByTagName("input")
      [i].getAttribute("id")
      .replace(/\s+/g, " ");
    let sub_input = "";
    try {
      sub_input = document.getElementById(sub_id).value;
    } catch {
    } finally {
      if (sub_input.length <= 0) {
        sub_input = "0";
      }
      if (mission_type == "quiz") {
        quiz_ref.once("value", function(snapshot) {
          snapshot.forEach(function(childsnapshot) {
            if (childsnapshot.key == subject_key) {
              childsnapshot.forEach(function(childe) {
                if (childe.key == act_id) {
                  childe.child("SubTopics").forEach(function(c) {
                    if (sub_id == c.key) {
                      scores_ref.once("value", function(snapshot) {
                        snapshot.forEach(function(childsnapshot) {
                          childsnapshot.child("Labs").forEach(function(childe) {
                            if (childe.hasChildren() && sub_input !== "0") {
                              scores_ref
                                .child(participant)
                                .child("Quizzes")
                                .child(act_id)
                                .child("Subtopics")
                                .child(sub_id)
                                .update({
                                  title: c.child("title").val(),
                                  xp: sub_input
                                })
                                .then(() => {
                                  window.alert("XP added successfully!");
                                  location.href = "../html/home-teacher.html";
                                });
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
      } else if (mission_type == "lab") {
        lab_ref.once("value", function(snapshot) {
          snapshot.forEach(function(childsnapshot) {
            if (childsnapshot.key == subject_key) {
              childsnapshot.forEach(function(childe) {
                if (childe.key == act_id) {
                  childe.child("SubTopics").forEach(function(c) {
                    if (sub_id == c.key) {
                      scores_ref.once("value", function(snapshot) {
                        snapshot.forEach(function(childsnapshot) {
                          childsnapshot.child("Labs").forEach(function(childe) {
                            if (childe.hasChildren() && sub_input !== "0") {
                              scores_ref
                                .child(participant)
                                .child("Labs")
                                .child(act_id)
                                .child("Subtopics")
                                .child(sub_id)
                                .update({
                                  title: c.child("title").val(),
                                  xp: sub_input
                                })
                                .then(() => {
                                  window.alert("XP added successfully!");
                                  location.href = "../html/home-teacher.html";
                                });
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
      } else {
        exam_ref.once("value", function(snapshot) {
          snapshot.forEach(function(childsnapshot) {
            if (childsnapshot.key == subject_key) {
              childsnapshot.forEach(function(childe) {
                if (childe.key == act_id) {
                  childe.child("SubTopics").forEach(function(c) {
                    if (sub_id == c.key) {
                      scores_ref.once("value", function(snapshot) {
                        snapshot.forEach(function(childsnapshot) {
                          childsnapshot.child("Labs").forEach(function(childe) {
                            if (childe.hasChildren() && sub_input !== "0") {
                              scores_ref
                                .child(participant)
                                .child("Exams")
                                .child(act_id)
                                .child("Subtopics")
                                .child(sub_id)
                                .update({
                                  title: c.child("title").val(),
                                  xp: sub_input
                                })
                                .then(() => {
                                  window.alert("XP added successfully!");
                                  location.href = "../html/home-teacher.html";
                                });
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
}
