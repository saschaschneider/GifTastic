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
while (i < topic.length) {
    var buttonHit = "buttonHit" + i;
    var $buttons = $('<input/>').attr({ "type": 'button', "class": "btn btn-primary ml-2 mt-2 mb-2 button", "id": buttonHit, "value": topic[i] });
    $(".var").append($buttons);
    i++;
}

// END: Dynamically creating buttons based on the array "topic"

queryResultLimit = 1; // limits the results given to x.
clicktracker = 0;

// if user wants to add animal, listen to keyevent "enter", add button and show picture 

addEventListener("keydown", function(e) {
    // Start: If function
    if (e.keyCode === 13) { //checks whether the pressed key is "Enter"
        clicktracker = clicktracker + 1;
        var buttonHit = "buttonHit" + topic.length; // creates the right ID # and ads it to var = buttonHit, so that we can add it programmatically to the new created buttons later. 

        newAnimal = $(".animalSearch").val().trim();
        topic.push(newAnimal);
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAnimal + "&api_key=x2WYS9CVbVty72a3mMX62krrcUPZsBmE&limit=" + queryResultLimit;
        console.log("Query URL = " +queryURL);
        console.log("Query URL = " +topic);

    // End: If function
        var i = 9 + clicktracker;
        while (i < topic.length) {
            var $buttons = $('<input/>').attr({ "type": 'button', "class": "btn btn-primary ml-2 mt-2 mb-2 button", "id": buttonHit, "value": topic[i] });
            $(".var").append($buttons);
            i++;

            $(".animalSearch").val("");
            
        }

        // Perfoming an AJAX GET request to our queryURL
       
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
                    animaleImageRating.html("Image Rating = " +response.data[z].rating);
                    animaleImageRating.attr("class", "m-2");
                                                            
                    // Setting the src attribute to imageUrl
                    animalImage.attr("src", response.data[z].images.downsized_still.url);
                    animalImage.attr("alt", "animal image");
                    animalImage.attr("data-still", response.data[z].images.downsized_still.url);
                    animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "still");
;
                    animalImage.attr("class", "m-2 images");

                    // Prepending the image to the images div
                    $("#images").prepend(animalImage);
                    $("#images").prepend(animaleImageRating);


          $(".images").on("click", function(){
             var state = $(".images").attr('data-state'); 
                    console.log(state);

            if ( state == "still") {

             $(".images").attr("src", $(".images").data("animate"));
             $(".images").attr("data-state", "animate");
             // animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "animate");
               
            }
            else
            {
             $(".images").attr('src', $(".images").data("still"));  
             $(".images").attr("data-state", "still");
            }
            
          })                           

                }})}})

    $(".button").click(function(e) {
    var idClicked = e.target.id;
    console.log("queryResultLimit = " + queryResultLimit);
    console.log("Array Length = " + topic.length);
    console.log("idClicked = " + idClicked);

    for (var b = 0; b < topic.length; b++) {
        console.log("idClicked = " + idClicked);   

        if (idClicked === "buttonHit" + b) {            

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic[b] + "&api_key=x2WYS9CVbVty72a3mMX62krrcUPZsBmE&limit=" + queryResultLimit;


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
                    animaleImageRating.html("Image Rating = " +response.data[z].rating);
                    animaleImageRating.attr("class", "m-2");
                                                            
                    // Setting the src attribute to imageUrl
                    animalImage.attr("src", response.data[z].images.downsized_still.url);
                    animalImage.attr("alt", "animal image");
                    animalImage.attr("data-still", response.data[z].images.downsized_still.url);
                    animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "still");
;
                    animalImage.attr("class", "m-2 images");

                    // Prepending the image to the images div
                    $("#images").prepend(animalImage);
                    $("#images").prepend(animaleImageRating);


          $(".images").on("click", function(){
             var state = $(".images").attr('data-state'); 
                    console.log(state);

            if ( state == "still") {

             $(".images").attr("src", $(".images").data("animate"));
             $(".images").attr("data-state", "animate");
             // animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "animate");
               

            }
            else
            {
             $(".images").attr('src', $(".images").data("still"));  
             $(".images").attr("data-state", "still");
            }
            
            })                           
                                     

        }})}}})


// When pre-generated buttons from array "topic" are clicked, adjust the API URl and show according picture

$(".button").click(function(e) {
    var idClicked = e.target.id;
    // console.log("queryResultLimit = " + queryResultLimit);
    // console.log("Array Length = " + topic.length);
    // console.log("idClicked = " + idClicked);

    for (var b = 0; b < topic.length; b++) {

        if (idClicked === "buttonHit" + b) {
           
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic[b] + "&api_key=x2WYS9CVbVty72a3mMX62krrcUPZsBmE&limit=" + queryResultLimit;


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
                    animaleImageRating.html("Image Rating = " +response.data[z].rating);
                    animaleImageRating.attr("class", "m-2");
                                                            
                    // Setting the src attribute to imageUrl
                    animalImage.attr("src", response.data[z].images.downsized_still.url);
                    animalImage.attr("alt", "animal image");
                    animalImage.attr("data-still", response.data[z].images.downsized_still.url);
                    animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "still");
;
                    animalImage.attr("class", "m-2 images");

                    // Prepending the image to the images div
                    $("#images").prepend(animalImage);
                    $("#images").prepend(animaleImageRating);


          $(".images").on("click", function(){
             var state = $(".images").attr('data-state'); 
                    console.log(state);

            if ( state == "still") {

             $(".images").attr("src", $(".images").data("animate"));
             $(".images").attr("data-state", "animate");
             // animalImage.attr("data-animate", response.data[z].images.downsized_large.url).attr("data-state", "animate");
               

            }
            else
            {
             $(".images").attr('src', $(".images").data("still"));  
             $(".images").attr("data-state", "still");
            }
            
          })                           
                                     

        }})}}})


 
