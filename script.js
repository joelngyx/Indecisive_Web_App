let activities = new Array(); // creates a dynamic array
const cat_photos = ["assets/pic1.jpg", "assets/pic2.jpg", "assets/pic3.jpg", "assets/pic4.jpg",
                    "assets/pic5.jpg", "assets/pic6.jpg", "assets/pic7.jpg"];

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
            changeCardText("Duplicate decisions are not allowed!");
            setCatPhoto("assets/error_general.jpg");
            return false;
        }
    } 
    // checks for empty inputs
    if(input == "") {
        changeCardText("Just as my food bowl cannot be empty, neither can your input!");
        setCatPhoto("assets/error_empty.jpg");
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
            changeCardText("How can I choose if there are no decisions to choose from?");
            setCatPhoto("assets/error_no_decisions.jpg");
            return;
        } else {
            // gets a random number from 0 to activities.length
            var randomNum = Math.floor(Math.random() * length);
            getRandomCatPhoto();
            changeCardText("You should " + activities[randomNum]);
        }
    } catch(e){
        alert("Error: " + e);
    }
}

function changeCardText(cardText) {
    const chosenActivity = document.getElementById("resultCardText");
    chosenActivity.textContent = cardText;
}

function generateID(inputText, identifierText) {
    return(inputText.replace(" ", "") + identifierText);
}

function getRandomCatPhoto() {
    var randomNum = Math.floor(Math.random() * cat_photos.length);
    var catImage = document.getElementById("catSrc");
    catImage.src = cat_photos[randomNum];
}

function setCatPhoto(inputText) {
    var catImage = document.getElementById("catSrc");
    catImage.src = inputText;
}