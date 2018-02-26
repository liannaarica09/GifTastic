// Initial array of reactions
      var reactions = ["Yes", "No", "WTF", "LOL", "Feels"];

      // Function for displaying astronaut data
      function renderButtons() {

        $("#buttons-view").empty();

        // Looping through the array of astornauts
        for (var i = 0; i < reactions.length; i++) {

          // Then dynamicaly generating buttons for each astronaut in the array
          var a = $("<button>");
          // Adding a class of react to our button
          a.addClass("react");
          // Adding a data-attribute
          a.attr("data-name", reactions[i]);
          // Providing the initial button text
          a.text(reactions[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#addReact").on("click", function(event) {
        console.log("addReact triggered");
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var reactPhrase = $("#reactInput").val().trim();
        console.log(reactPhrase);

        // Adding the movie from the textbox to our array
        reactions.push(reactPhrase);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      function pauseOrPlay(){
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }

      function findGifs() {
          // In this case, the "this" keyword refers to the button that was clicked
          var reaction = $(this).attr("data-name");
          console.log(reaction);

          // Constructing a URL to search Giphy for the name of the astronaut 
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dmseLITUBdFeee6cPWwIVaVUjdK4JQhV&q=" + reaction + "&limit=10&offset=0";

          // Performing our AJAX GET request
          $.ajax({
              url: queryURL,
              method: "GET"
            })
            .then(function(response) {
              console.log(response);
              // Storing an array of results in the results variable
              var results = response.data;

              // Looping over every result item
              for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                  // Creating a div with the class "item"
                  var gifDiv = $("<div>");

                  // Storing the result item's rating
                  var rating = results[i].rating;

                  // Creating a paragraph tag with the result item's rating
                  var ratingP = $("<p>").text("Rating: " + rating);

                  // Creating an image tag
                  var reactImage = $("<img class='item'>");

                  // Giving the image tag an src attribute of a proprty pulled off the
                  // result item
                  reactImage.attr("src", results[i].images.fixed_height.url);
                  reactImage.attr("data-state", "animate");
                  reactImage.attr("data-animate", results[i].images.fixed_height.url);
                  reactImage.attr("data-still", results[i].images.fixed_height_still.url);

                  // Appending the paragraph and reactImage we created to the "gifDiv" div we created
                  gifDiv.append(ratingP);
                  gifDiv.append(reactImage);

                  // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                  $("#gifs-appear-here").prepend(gifDiv);
                }
              }
            });
          }

          $(document).on("click", ".react", findGifs);
          $(document).on("click", ".item", pauseOrPlay);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();