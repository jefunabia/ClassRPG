// document.getElementById("access-key").style.display = "none";
let start = location.href.lastIndexOf("/");
let courseNumber = location.href.substr(start + 1).replace(/[%]/g, " ");
let guild_key = courseNumber.replace(/\s+/g, "").toLowerCase() + "id";;
document.getElementById("course-number").innerHTML = "Guild Mission<br> " + courseNumber;

function logOut() {
    firebase.auth().signOut();
}
  
//-----------------------------DISPLAY SECTION------------------------------------
/////////LISTEN to DISPLAY////////////////////////////
///////////////////QUIZZES///////////////////////////



quiz_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("quiz");
            container.innerHTML = " ";
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.setAttribute("class", "custom-btn btn btn-secondary");
                b.innerHTML = "quiz" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "view-mission",  childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});

lab_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("labs");
            container.innerHTML = " ";
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.setAttribute("class", "custom-btn btn btn-secondary");
                b.innerHTML = "lab" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "lab-view",childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});

exam_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("exams");
            container.innerHTML = " ";
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.setAttribute("class", "custom-btn btn btn-secondary");
                b.innerHTML = "exam" + count;
                b.addEventListener("click", function(){
                  
                    showAct(childe.key, "exam-view",childe.child("date").val(),childe.child("name").val());                 
                    
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});
//--------------------------------------------------------------------//

function showAct(act_id, container_id, date, act_name){
    var x = document.getElementById(container_id);
    x.innerHTML = "<br>Name: " +  act_name + "<br>Date: " + date;
    var subs = document.createElement("div");
    subs.innerHTML = "<h4>SubTopics:</h4>";
    //###############################SHOWS PROGRESS AT ZERO################
    quiz_ref.once("value", function(snapshot){
        snapshot.child(guild_key).child(act_id).child("SubTopics")
        .forEach(function(topic){
            let pbar = document.createElement("div");
            pbar.id = topic.key; 
            pbar.innerHTML += "<br>" + topic.child("title").val()  + "<br>"
            x.appendChild(pbar);
            let total = topic.child("xp").val();
            bar_line(pbar.id, 0, total);
        });
    });
    lab_ref.once("value", function(snapshot){
        snapshot.child(guild_key).child(act_id).child("SubTopics")
        .forEach(function(topic){
            let pbar = document.createElement("div");
            pbar.id = topic.key; 
            pbar.innerHTML += "<br>" + topic.child("title").val()  + "<br>"
            x.appendChild(pbar);
            let total = topic.child("xp").val();
            bar_line(pbar.id, 0, total);
           
        });
    });  
    exam_ref.once("value", function(snapshot){
        snapshot.child(guild_key).child(act_id).child("SubTopics")
        .forEach(function(topic){
            let pbar = document.createElement("div");
            pbar.id = topic.key; 
            pbar.innerHTML += "<br>" + topic.child("title").val()  + "<br>"
            x.appendChild(pbar);
            let total = topic.child("xp").val();
            bar_line(pbar.id, 0, total);
        });
    });
    //#################################SHOWS PROGRESS WITH SCORE###########
    scores_ref.once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.key == firebase.auth().currentUser.uid){
                if(container_id == "view-mission"){
                    let check = childsnapshot.child("Quizzes").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            let pbar = document.getElementById(topic.key);
                            pbar.innerHTML = "" 
                            pbar.innerHTML += "<br>" + topic.child("title").val() + "<br>"
                            x.appendChild(pbar)
                            
                            quiz_ref.once("value", function(snapshot){
                                snapshot.child(guild_key).child(act_id).child("SubTopics")
                                .forEach(function(topic2){
                                    if(topic2.key == topic.key){
                                        let total =  topic2.child("xp").val();
                                        let percent = topic.child("xp").val() / total;
                                        bar_line(pbar.id, percent,total)
                                    }
                                   
                                });
                            });
                            
                        });
                    } 
                    
                } else if (container_id == "lab-view"){
                    let check = childsnapshot.child("Labs").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            let pbar = document.getElementById(topic.key);
                            pbar.innerHTML = "" 
                            pbar.innerHTML += "<br>" + topic.child("title").val()  + "<br>"
                            x.appendChild(pbar)
                            
                            lab_ref.once("value", function(snapshot){
                                snapshot.child(guild_key).child(act_id).child("SubTopics")
                                .forEach(function(topic2){
                                    if(topic2.key == topic.key){
                                        let total =  topic2.child("xp").val();
                                        let percent = topic.child("xp").val() / total;
                                        bar_line(pbar.id, percent,total)
                                    }
                                   
                                });
                            });   
                        });
                    }  
                    
                } else {
                    let check = childsnapshot.child("Exams").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            let pbar = document.getElementById(topic.key);
                            pbar.innerHTML = "" 
                            pbar.innerHTML += "<br>" + topic.child("title").val()  + "<br>"
                            x.appendChild(pbar)
                            
                            exam_ref.once("value", function(snapshot){
                                snapshot.child(guild_key).child(act_id).child("SubTopics")
                                .forEach(function(topic2){
                                    if(topic2.key == topic.key){
                                        let total =  topic2.child("xp").val();
                                        let percent = topic.child("xp").val() / total;
                                        bar_line(pbar.id, percent,total)
                                    }
                                   
                                });
                            }); 
                        });
                    }
                }
                
            }
        });
        // sub_id.forEach(function(i){
        //     // alert(i.name)
        //     bar_line(i.name, 0.6);
        // });
    });
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
//////////////////////////////////////////////////////////////
document.getElementById("view-mission").style.display = "none";

function viewMission() {
    var x = document.getElementById("view-mission");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/////DISPLAY CURRENT XP/////////////////////////////
scores_ref.once("value", function(snapshot){
    let xp_cont = document.getElementById("CXP");
    let xp_count = 0;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == firebase.auth().currentUser.uid){
            childsnapshot.forEach(function(childe){
                childe.forEach(function(childes){
                    childes.child("Subtopics").forEach(function(childs){
                        xp_count += parseInt(childs.child("xp").val());   
                    });
                });
            });
            
        }
    });
    xp_cont.innerHTML = "Current XP: " + xp_count;
    let xp = (xp_count / 1000);
    bar.animate(xp);
});