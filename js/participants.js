let start = location.href.lastIndexOf("/");
let subject_key = location.href.substr(start+1);
document.getElementById("subject-code").innerHTML = "Guild Mission<br> " + subject_key;


enrolled_ref.once("value", function(snapshot){
    snapshot.forEach(function(childsnapshot){
        childsnapshot.forEach(function(childe){
            if(childe.key + "id" == subject_key){
                add_user_to_list(childsnapshot.key);
            }
        });
    });
    // console.log(participant_list)
    
    user_ref.once("value", function(snapshot){
        let table = document.getElementById("user-table")
        snapshot.forEach(function(childsnapshot){
            for(let i = 0; i < participant_list.length;i++){
                if(participant_list[i] == childsnapshot.key){
                    let tr = document.createElement("tr");
                    tr.innerHTML = "<th>" + childsnapshot.child("fullname").val() + "</th>" +
                    "<th>" + childsnapshot.child("course").val() + "</th>" + "<th>" 
                    + childsnapshot.child("level").val() + "</th>"
                    + "<th>" + childsnapshot.child("total_xp").val() + "</th>";
                    table.appendChild(tr);
                }
            }
        });
      
    });
   
});

let participant_list = new Array();

function add_user_to_list(id){
    participant_list.push(id);
}

