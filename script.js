let activities = new Array(); // creates a dynamic array

function addActivity1() {
    var buttonState1 = document.getElementById("buttonAdd1");
    buttonState1.parentNode.removeChild(buttonState1);

    var buttonDiv = document.getElementById("buttonAddDiv");

    var activityInput = document.createElement("input");
    activityInput.id = "activityName";
    buttonDiv.appendChild(activityInput);

    var buttonState2 = document.createElement("button");
    buttonState2.className = "buttonAdd2";
    buttonState2.textContent = "Add";
    buttonState2.onclick = function() {
        addActivity2();
    };
    buttonDiv.appendChild(buttonState2);

}

function addActivity2() {
    // retrieves input from activityName input element (as per main.html)
    var input = document.getElementById("activityName").value;
    
    // checks if input is proper
    if(isInputValid(input) == false) { 
        return; 
    } else {
        activities.push(input);

        // part of the document where the activity card will be added to
        var activityListDiv = document.getElementById("activitiyListCard");

        // creates an activityCard element, which will contain the text and the button elements
        var addedActivityCard = document.createElement("div");
        addedActivityCard.className = "activityCard";
        addedActivityCard.id = generateID(input, "_card");
        activityListDiv.appendChild(addedActivityCard);

        // creates a new header text element per input provided
        var addedActivityText = document.createElement("p"); 
        addedActivityText.className = "activityCardText";
        addedActivityText.id = generateID(input, "_id"); // ids cannot have whitespaces
        addedActivityText.textContent = input;
        addedActivityCard.appendChild(addedActivityText);

        // creates a new button per input provided
        var addedDeleteButton = document.createElement("button");
        addedDeleteButton.id = generateID(input, "_button");
        addedDeleteButton.className = "buttonRemove";
        addedDeleteButton.innerHTML = "remove";
        addedDeleteButton.onclick = function() {
            removeActivity(input);
            var activityCardElementToDelete = document.getElementById(generateID(input, "_card"));
            activityCardElementToDelete.parentNode.removeChild(activityCardElementToDelete)
            var textElementToDelete = document.getElementById(generateID(input, "_id"));
            textElementToDelete.parentNode.removeChild(textElementToDelete);
            var buttonElementToDelete = document.getElementById(generateID(input, "_button"));
            buttonElementToDelete.parentNode.removeChild(buttonElementToDelete);
        }
        addedActivityCard.appendChild(addedDeleteButton);
        
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
            changeCardText("There are no decisions to make!");
            return;
        } else {
            // gets a random number from 0 to activities.length
            var randomNum = Math.floor(Math.random() * length);
            changeCardText("You should " + activities[randomNum]);
        }
    } catch(e){
        alert("Error: " + e);
    }
}

function changeCardText(cardText) {
    const chosenActivity = document.getElementById("cardText");
    chosenActivity.textContent = cardText;
}

function generateID(inputText, identifierText) {
    return(inputText.replace(" ", "") + identifierText);
}