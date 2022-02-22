let activities = new Array(); // creates a dynamic array
const cat_photos = ["assets/pic1.jpg", "assets/pic2.jpg", "assets/pic3.jpg", "assets/pic4.jpg",
                    "assets/pic5.jpg", "assets/pic6.jpg"];
const loading_images = ["assets/loading1.jpg", "assets/loading2.jpg", "assets/loading3.jpg",
                        "assets/loading4.jpg", "assets/loading5.jpg", "assets/loading6.jpg"]

/** 
 * the function for add button's original state;
 * onclick, it replaces the original add button with
 * an input element and a button element
 */ 
function addActivity1() {
    // identifies the add button in the document
    var buttonState1 = document.getElementById("buttonAdd1");
    buttonState1.parentNode.removeChild(buttonState1);

    // identifies the div block in which the add button used to be in
    var buttonDiv = document.getElementById("buttonAddDiv");

    // adds a input and a button element
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

/**
 * adds input provided by the user into the activities
 */
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
            var textElementToDelete = document.getElementById(generateID(input, "_id"));
            textElementToDelete.parentNode.removeChild(textElementToDelete);
            var buttonElementToDelete = document.getElementById(generateID(input, "_button"));
            buttonElementToDelete.parentNode.removeChild(buttonElementToDelete);
            var activityCardElementToDelete = document.getElementById(generateID(input, "_card"));
            activityCardElementToDelete.parentNode.removeChild(activityCardElementToDelete)
        }
        addedActivityCard.appendChild(addedDeleteButton);
        
        // clears the activityName input element
        document.getElementById("activityName").value = ""; 
    }
}

/**
 *  checks if the input provided by the user for adding a decision is valid
 */ 
function isInputValid(input) {
    // checks for duplicate values
    for(var i = 0; i < activities.length; i ++) {
        // eliminate whitespaces in the input to ensure that there are no duplicates
        if(generateID(input, "") == generateID(activities[i], "")) {
            changeCardText("Duplicate decisions are not allowed!");
            setCatPhoto("assets/error_general.jpg");
            // clears the activityName input element
            document.getElementById("activityName").value = ""; 
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

/**
 * removes the selected activity item in the activity list
 */
function removeActivity(input) {
    for(var i = 0; i < activities.length; i++) {
        if(input == activities[i]) {
            activities.splice(i, 1);
            break;
        }
    }
}

/**
 *  randomly chooses an item from the array activities
 */ 
async function chooseActivity() {
    try{
        var length = activities.length;
        if(length == 0) {
            // activities array is empty
            changeCardText("How can I choose if there are no decisions to choose from?");
            setCatPhoto("assets/error_no_decisions.jpg");
            return;
        } else {
            await resultCardLoading();
            // gets a random number from 0 to activities.length
            var randomNum = Math.floor(Math.random() * length);
            getRandomCatPhoto();
            changeCardText("You should " + activities[randomNum]);
        }
    } catch(e){
        alert("Error: " + e);
    }
}

/**
 * changes the value of the text in the result card to the
 * provided cardText
*/
function changeCardText(cardText) {
    const chosenActivity = document.getElementById("resultCardText");
    chosenActivity.textContent = cardText;
}


/**
 * removes whitespace and appends a given string to create 
 * a unique id
*/
function generateID(inputText, identifierText) {
    return(inputText.replace(" ", "") + identifierText);
}

/**
 * randomly picks an item from the const array cat_photos
 * and sets it to the src field of the image element in 
 * the result card
*/
function getRandomCatPhoto() {
    var randomNum = Math.floor(Math.random() * cat_photos.length);
    var catImage = document.getElementById("catSrc");
    catImage.src = cat_photos[randomNum];
}

/**
 * replaces the src field of the image element in the
 * result card with the provided inputText 
 */
function setCatPhoto(inputText) {
    var catImage = document.getElementById("catSrc");
    catImage.src = inputText;
}

/**
 * shows a short loading image and text in the
 * result card
 */
async function resultCardLoading() {
    changeCardText("Making a decision...");
    for(var i=0; i < loading_images.length; i++) {
        setCatPhoto(loading_images[i]);
        await new Promise(r=> setTimeout(r, 300));
    }
}