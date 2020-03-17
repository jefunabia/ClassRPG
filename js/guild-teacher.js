document.getElementById("access-key").style.display = "none";
let start = location.href.lastIndexOf("/");
let guild_course = location.href.substr(start + 1).replace(/[%]/g, " ");
let guild_key = guild_course.replace(/\s+/g, "").toLowerCase() + "id";

document.getElementById("access-key").innerHTML = guild_key;
document.getElementById("course-code").innerHTML =
  "Guild Mission<br> " + guild_course;

function logOut() {
  firebase.auth().signOut();
}

//-----------------------------DISPLAY SECTION------------------------------------
/////////LISTEN to DISPLAY////////////////////////////
///////////////////QUIZZES///////////////////////////
quiz_ref.once("value", function(snapshot) {
  count = 1;
  let q_count = 0;
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == guild_key) {
      let container = document.getElementById("quiz");
      container.innerHTML = "";
      childsnapshot.forEach(function(childe) {
        // console.log(childe.key)
        let b = document.createElement("button");
        b.setAttribute("class", "custom-btn btn btn-secondary");
        b.innerHTML = "quiz" + count;
        b.addEventListener("click", function() {
          showAct(
            childe.key,
            "view-mission",
            childe.child("SubTopics"),
            childe.child("date").val(),
            childe.child("name").val()
          );
        });
        container.appendChild(b);
        count += 1;

        childe.child("SubTopics").forEach(function(topics) {
          //to display SubTopics later
          console.log(topics.key);
          q_count += parseInt(topics.child("xp").val());
        });
      });
    }
  });

  let total_div = document.getElementById("quiz-total");
  total_div.innerHTML = "<h5>[QUIZ TOTAL]</h5> " + q_count;
  //document.body.appendChild(total_div);

  average(q_count);
});
/////////////////LAB ACTIVITIES///////////////////
lab_ref.once("value", function(snapshot) {
  count = 1;
  let l_count = 0;
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == guild_key) {
      let container = document.getElementById("labs");
      container.innerHTML = "";
      childsnapshot.forEach(function(childe) {
        let b = document.createElement("button");
        b.setAttribute("class", "custom-btn btn btn-secondary");
        b.innerHTML = "lab" + count;
        b.addEventListener("click", function() {
          showAct(
            childe.key,
            "lab-view",
            childe.child("SubTopics"),
            childe.child("date").val(),
            childe.child("name").val()
          );
        });
        container.appendChild(b);
        count += 1;

        childe.child("SubTopics").forEach(function(topics) {
          //to display SubTopics later
          console.log(topics.key);
          l_count += parseInt(topics.child("xp").val());
        });
      });
    }
  });

  let total_div = document.getElementById("lab-total");
  total_div.innerHTML = "<br><h5>[LAB TOTAL]</h5> " + l_count;
  //document.body.appendChild(total_div);
  average(l_count);
});
////////////////////////EXAMS////////////////////////////////
exam_ref.once("value", function(snapshot) {
  count = 1;
  let e_count = 0;
  snapshot.forEach(function(childsnapshot) {
    if (childsnapshot.key == guild_key) {
      let container = document.getElementById("exams");
      container.innerHTML = "";
      childsnapshot.forEach(function(childe) {
        let b = document.createElement("button");
        b.setAttribute("class", "custom-btn btn btn-secondary");
        b.innerHTML = "exam" + count;
        b.addEventListener("click", function() {
          showAct(
            childe.key,
            "exam-view",
            childe.child("SubTopics"),
            childe.child("date").val(),
            childe.child("name").val()
          );
        });
        container.appendChild(b);
        count += 1;

        childe.child("SubTopics").forEach(function(topics) {
          //to display SubTopics later
          console.log(topics.key);
          e_count += parseInt(topics.child("xp").val());
        });
      });
    }
  });

  let total_div = document.getElementById("exam-total");
  total_div.innerHTML = "<br><h5>[EXAM TOTAL]</h5> " + e_count;
  //document.body.appendChild(total_div);

  //DISPLAY OVERALL TOTAL
  let overall = document.getElementById("overall-total");
  overall.innerHTML = "<h5>" + average(e_count) + "</h5> <br>";
  // document.body.appendChild(overall);
});
//--------------------------------------------------------------------//
function showAct(act_id, container_id, subtopics, date, act_name) {
  var x = document.getElementById(container_id);
  x.innerHTML =
    "<br><h3>Name:</h3> " +
    act_name +
    "<br><br><h3>Date:</h3> " +
    date +
    "<br><br>";
  var subs = document.createElement("div");
  subs.innerHTML = "<h3>Sub-Activity:</h3>";
  subtopics.forEach(function(topic) {
    subs.innerHTML +=
      topic
        .child("title")
        .val()
        .toUpperCase() +
      "<br><br><h5>XP:</h5> " +
      topic.child("xp").val() +
      "<br>";
    x.appendChild(subs);
  });
  var input = document.createElement("button");
  input.setAttribute("class", "reg-input custom2-btn btn btn-primary");
  var record = document.createElement("button");
  record.setAttribute("class", "reg-input custom2-btn btn btn-primary");
  input.innerHTML = "Input XP";
  input.addEventListener("click", function() {
    if (container_id == "view-mission") {
      location.href =
        "input-xp.html?type=quiz?/id=" + act_id + "?/" + guild_key;
    } else {
      location.href =
        "input-xp.html?type=" +
        container_id.substr(0, container_id.lastIndexOf("-")) +
        "?/id=" +
        act_id +
        "?/" +
        guild_key;
    }

    // location.href = "input-xp.html?/" + guild_key;
  });
  record.innerHTML = "See Records";
  record.addEventListener("click", function() {
    if (container_id == "view-mission") {
      location.href =
        "view-records.html?type=quiz?/id=" + act_id + "?/" + guild_key;
    } else {
      location.href =
        "view-records.html?type=" +
        container_id.substr(0, container_id.lastIndexOf("-")) +
        "?/id=" +
        act_id +
        "?/" +
        guild_key;
    }
  });
  x.innerHTML += "<br>";
  x.appendChild(input);
  x.appendChild(record);

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

let t = 0;
function average(count) {
  t += count;
  return t;
}

function viewAccessKey() {
  var x = document.getElementById("access-key");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

document.getElementById("view-mission").style.display = "none";

function viewMission() {
  var x = document.getElementById("view-mission");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function expand() {
  var x = document.getElementById("add_quiz");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function addActivity() {
  //must assum that quiz id is randomized
  let act = document.getElementById("activity_type");
  let guildMissionType = act.options[act.selectedIndex].value;
  let date = document.getElementById("date").value;
  let name = document.getElementById("qtitle").value;
  //THIS NEEDS TO BE CHANGED INTO RANDOM
  let act_key = name.replace(/\s+/g, "") + "id";
  console.log(name);

  if (name !== "" && subs_list.length > 0) {
    // alert(JSON.stringify(subs_list).toString())
    if (guildMissionType == "quiz") {
      alert("quiz");
      quiz_ref
        .child(guild_key)
        .child(act_key)
        .set({
          date: date,
          name: name
        });

      for (let i = 0; i < subs_list.length; i++) {
        let sub_id =
          subs_list[i].topic.replace(/\s+/g, "").toLowerCase() + "id";
        quiz_ref
          .child(guild_key)
          .child(act_key)
          .child("SubTopics")
          .child(sub_id)
          .update({
            title: subs_list[i].topic,
            xp: subs_list[i].xp
          });
      }
    } else if (guildMissionType == "lab-activity") {
      lab_ref
        .child(guild_key)
        .child(act_key)
        .set({
          date: date,
          name: name
        });
      for (let i = 0; i < subs_list.length; i++) {
        lab_ref
          .child(guild_key)
          .child(act_key)
          .child("SubTopics")
          .child(subs_list[i].topic)
          .update({
            title: subs_list[i].topic,
            xp: subs_list[i].xp
          });
      }
    } else {
      exam_ref
        .child(guild_key)
        .child(act_key)
        .set({
          date: date,
          name: name
        });
      for (let i = 0; i < subs_list.length; i++) {
        let sub_id =
          subs_list[i].topic.replace(/\s+/g, "").toLowerCase() + "id";
        exam_ref
          .child(guild_key)
          .child(act_key)
          .child("SubTopics")
          .child(sub_id)
          .update({
            title: subs_list[i].topic,
            xp: subs_list[i].xp
          });
      }
    }

    alert("Succesfully Added");
    location.reload();
  } else {
    alert("add subtopics first");
  }
}
//TO FIX
//note TOTAL of Subtopics cannot be 0
let subs_list = new Array();
function addSubs() {
  let subname = document.getElementById("subtopic").value;
  let total = document.getElementById("total_num").value;

  subs_list.push({ topic: subname, xp: total });
  let subs = document.getElementById("subs_container");
  if (subs_list.length > 0) {
    subs.innerHTML = "";
    for (let i = 0; i < subs_list.length; i++) {
      let p = document.createElement("p");
      p.innerHTML =
        "<br><h3>Sub-Activity:</h3> " +
        subs_list[i].topic +
        "<br><br> <h3>XP:</h3> " +
        subs_list[i].xp;
      subs.appendChild(p);
    }
  }
  document.getElementById("subtopic").value = "";
  document.getElementById("total_num").value = 0;
  return;
}

function view_participants() {
  location.href = "participants.html" + "?/" + guild_key;
}
