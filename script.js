let activities = new Array(); // creates a dynamic array


function addActivity() {
    // retrieves input from activityName input element (as per main.html)
    var input = document.getElementById("activityName").value;
    
    // checks if input is proper
    if(isInputValid(input) == false) { 
        return; 
    } else {
        activities.push(input);

        // creates a new header text element per input provided
        var addedActivityText = document.createElement("h3"); 
        addedActivityText.id = input;
        addedActivityText.textContent = input;
        document.body.appendChild(addedActivityText);

        // creates a new button per input provided
        var addedDeleteButton = document.createElement("button");
        addedDeleteButton.id = input + "_button";
        addedDeleteButton.type = "button";
        addedDeleteButton.innerHTML = "remove";
        addedDeleteButton.onclick = function() {
            removeActivity(input);
            var textElementToDelete = document.getElementById(input);
            textElementToDelete.parentNode.removeChild(textElementToDelete);
            var buttonElementToDelete = document.getElementById(input + "_button");
            buttonElementToDelete.parentNode.removeChild(buttonElementToDelete);
        }
        document.body.appendChild(addedDeleteButton);
        
        // clears the activityName input element
        document.getElementById("activityName").value = ""; 
    }
}


function isInputValid(input) {
    // checks for duplicate values
    for(var i = 0; i < activities.length; i ++) {
        if(input == activities[i]) {
            alert("Duplicate activities not allowed!");
            return false;
        }
    } 

    // checks for empty inputs
    if(input == "") {
        alert("Activity cannot be empty!");
        return false;
    }

    return true;
}


function removeActivity(input) {
    for(var i = 0; i < activities.length; i++) {
        if(input == activities[i]) {
            activities.splice(i, 1);
            break;
        }
    }
}


function chooseActivity() {
    try{
        var length = activities.length;
        if(length == 0) {
            // activities array is empty
            alert("No activities to choose from!");
            return;
        } else {
            // gets a random number from 0 to activities.length
            var randomNum = Math.floor(Math.random() * length);
            alert(activities[randomNum]);
        }
    } catch(e){
        alert("Error: " + e);
    }
}
