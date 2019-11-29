
function addSubject(){ //ONLY ADD SUBJECT THAT DOESNT EXIST YET
    let name = document.getElementById("subject").value //get input
    let new_name = name.replace(/\s+/g, "").toLowerCase() + "id";
    if(typeof temp !== "undefined"){ //validation that we wont get an undefined database
        for(let i =0; i < temp.length;i++){
            console.log(temp[i],new_name)
            if(temp[i].id == new_name){ 
                alert("exist")
                return false;
            }
        }
        // guild_ref.child(new_name).set({ //add to database
        //     course: name.toUpperCase()
        // });
        teach_subs_ref.child(firebase.auth().currentUser.uid).child(new_name).set({
            course: name.toUpperCase()
        });
        alert("ADDED")
        location.reload();
        return true; 
        
    }
    else {
        setTimeout(addSubject(),1000); //wait until we get the value
    }
    
}


function dispSubject(){
    let pcontainer = document.getElementsByClassName("sub-container")[0]
    pcontainer.innerHTML = "";
    if(typeof temp !== "undefined" ){
        for(let i = 0; i < temp.length;i++){
            let sub_child = document.createElement("button");
            let sub_name = temp[i].name;

            sub_child.addEventListener("click", function(){
                alert("redirecting")
                window.location.href = "./guild-mission-teacher.html" + "?/" + sub_name.replace(/\s+/g, "%")
            });
            
            sub_child.innerHTML = "<h5>"+ sub_name +" </h5>";
            pcontainer.appendChild(sub_child);
            let br = document.createElement("br");
            pcontainer.appendChild(br);
            sub_child.setAttribute("class", "class=btn subjects-btn");
        }
    } else {
        console.log("unde")
    }
    
   
}

//forms stuff
// document.getElementById("add-subject").style.display = "none";

// document.getElementById("view-mission").style.display = "none";
function expand(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function submit(id){
    if(id == 'add-subject'){
        addSubject();
    }
   
}

//=============================TESTING AREA=====================================
//==============================================================================
//==============================================================================


exports.addSubject_test = function(temp,name){ //TEST FUNCTION FOR ADDSUBJET()
    let new_name = name.replace(" ","").toLowerCase();
    if(typeof temp !== "undefined"){ //validation that we wont get an undefined database
        for(let i =0; i < temp.length;i++){
            console.log(temp[i],new_name)
            if(temp[i].id == new_name){ 
                //DONT ADD ANYTHING TO DB
                return false;
            }
        }
        //ADD TO DB CODE HERE 
        return true; 
        
    }
    else {
        setTimeout(addSubject_test(temp,name),1000); //wait until we get the value
    }
    
}
