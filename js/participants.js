let start = location.href.lastIndexOf("/");
let subject_key = location.href.substr(start + 1);

function logOut() {
  firebase.auth().signOut();
}

teach_subs_ref.once("value", function(snapshot) {
  snapshot.forEach(function(childe) {
    if (childe.key == firebase.auth().currentUser.uid) {
      childe.forEach(function(c) {
        document.getElementById("subject-code").innerHTML =
          "Guild Mission<br> " + c.child("course").val();
      });
    }
  });
});
enrolled_ref.once("value", function(snapshot) {
  snapshot.forEach(function(childsnapshot) {
    childsnapshot.forEach(function(childe) {
      if (childe.key == subject_key) {
        add_user_to_list(childsnapshot.key);
      }
    });
  });
  // console.log(participant_list)

  user_ref.once("value", function(snapshot) {
    let table = document.getElementById("user-table");
    let total_xp = 0;
    snapshot.forEach(function(childsnapshot) {
      for (let i = 0; i < participant_list.length; i++) {
        if (participant_list[i] == childsnapshot.key) {
          scores_ref.once("value", function(snapshot) {
            snapshot.forEach(function(childsnapshot) {
              if (childsnapshot.key == participant_list[i]) {
                childsnapshot.forEach(function(childe) {
                  childe.forEach(function(childes) {
                    childes.child("Subtopics").forEach(function(childs) {
                      total_xp += parseInt(childs.child("xp").val());
                    });
                  });
                });
              }
            });
            // alert(total_xp)
            let tr = document.createElement("tr");
            let fullname =
              childsnapshot.child("FirstName").val() +
              " " +
              childsnapshot.child("LastName").val();
            tr.innerHTML =
              "<th>" +
              fullname +
              "</th>" +
              "<th>" +
              childsnapshot.child("College").val() +
              "</th>" +
              "<th>" +
              4 +
              "</th>" +
              total_xp +
              "</th>";
            table.appendChild(tr);
          });
        }
      }
    });
  });
});

let participant_list = new Array();

function add_user_to_list(id) {
  participant_list.push(id);
}
