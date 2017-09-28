// ------ Start: Defining variables ----- // 
// API KEY = x2WYS9CVbVty72a3mMX62krrcUPZsBmE //

var topic = [];
var newAnimal;
var buttons;
var clicktracker;
var queryURL;
var queryResultLimit;
var topicIndex;
var buttonHitAttr;
var buttonHitValue;
var $buttonHit;
// ------ END: Defining variables ----- // 

// ------ START: Script ----- // 

topic = ["Giraffe", "Coati", "Panda", "Hog", "Chimpanzee", "Musk Deer", "Chipmunk", "Wildcat", "Rhinoceros", "Doe"]; // Array with Animals


// Start: Dynamically creating buttons based on the array "topic"
var i = 0;

function createButtons() {
    while (i < topic.length) {
        var buttonHit = "buttonHit" + i;
        var $buttons = $('<input/>').attr({ "type": 'button', "class": "btn btn-primary ml-2 mt-2 mb-2 button", "id": buttonHit, "value": topic[i] });
        $(".var").append($buttons);
        i++;
    }
}

createButtons()
// END: Dynamically creating buttons based on the array "topic"

queryResultLimit = 10; // limits the results given to x.
clicktracker = 0;

// if user wants to add animal, listen to keyevent "enter", add button and show picture 

$("#myForm").submit(function(e) {
    e.preventDefault()

    var buttonHit = "buttonHit" + topic.length; // creates the right ID # and ads it to var = buttonHit, so that we can add it programmatically to the new created buttons later. 

    newAnimal = $(".animalSearch").val().trim();
    topic.push(newAnimal);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAnimal + "&api_key=x2WYS9CVbVty72a3mMX62krrcUPZsBmE&limit=" + queryResultLimit;
    console.log("Query URL = " + queryURL);
    console.log("Query URL = " + topic);

    createButtons()

    getGiphies(queryURL)
    // Perfoming an AJAX GET request to our queryURL

})

function getGiphies(queryURL) {
    $.ajax({
            url: queryURL,
            method: "GET"
        })

        // After the data from the AJAX request comes back
        .done(function(response) {

            for (var z = 0; z < queryResultLimit; z++) {

                // Saving the image_original_url property
                var imageUrl = response.data[z].images.downsized_still.url;

                // Creating and storing an image tag
                var animalImage = $("<img>");
                var animaleImageRating = $("</p>");

                animaleImageRating.attr("class", "rating");
                animaleImageRating.html("Image Rating = " + response.data[z].rating);
                animaleImageRating.attr("class", "m-2");

                // Setting the src attribute to imageUrl
                animalImage.attr("src", response.data[z].images.downsized_still.url);
                animalImage.attr("alt", "animal image");
                animalImage.attr("data-still", response.data[z].images.downsized_still.url);
                animalImage.attr("data-animate", response.data[z].images.downsized.url).attr("data-state", "still");;
                animalImage.attr("class", "m-2 images");

                // Prepending the image to the images div
                $("#images").prepend(animalImage);
                $("#images").prepend(animaleImageRating);

            }
        })
}

// When pre-generated buttons from array "topic" are clicked, adjust the API URl and show according picture

$(".var").on('click', ".button", function(e) {
    var topic = $(this).val()
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=x2WYS9CVbVty72a3mMX62krrcUPZsBmE&limit=" + queryResultLimit;

    getGiphies(queryURL)
})

$("#images").on("click", ".images", function() {
    var state = $(this).attr('data-state');
    console.log(state);

    if (state == "still") {

        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
        // animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "animate");

    } else {
        $(this).attr('src', $(this).data("still"));
        $(this).attr("data-state", "still");
    }

})