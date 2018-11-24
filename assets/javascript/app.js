$(document).ready(function() { 

// link to firebase db

var config = {
    apiKey: "AIzaSyDb3LDkPpBCol4VpoxO2iglj6QwOqDMxI4",
    authDomain: "fb-train-times.firebaseapp.com",
    databaseURL: "https://fb-train-times.firebaseio.com",
    projectId: "fb-train-times",
    storageBucket: "fb-train-times.appspot.com",
    messagingSenderId: "520650314896"
  };
  firebase.initializeApp(config);

  var database = firebase(database);

 $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrainToDatabase = {
        name: trainName,
        destination: destinationName,
        start: firstTrain,
        rate: trainFrequency
    };

    database.ref().push(newTrainToDatabase);

    console.log(newTrainToDatabase.name);
    console.log(newTrainToDatabase.destination);
    console.log(newTrainToDatabase.start);
    console.log(newTrainToDatabase);

 });
//   create submission functionality. 1. write on(click). 2. prevent default/null entry. 2b. additional null protection: give every input an additional class for '.blank-check' and if field === no input, than prevent input from occuring. 3. get value from each input ID by creating new vars and defining them by each submission field with val() and trim(). 4. create object array as a temporary holding zone. 5. push object array to database. 6. clear the entries. now they're in firebase.

// create 'populate list' functionality. push from firebase back out to display once firebase receives data. 1. write an "on(child_added)" very similar to an "on(click)" that stores all the firebase/input fields into vars. 2. any necessary conversion math (double check instruction requests). 3. the necessary modal math to determine wait times for the next train. 4. write the modified data fields to a new var called 'newRow', format as a <tr>, and format all the fields as <td>. see exercise 4.2.17.

// stretch goal: function to delete trains from the table.

// stretch goal: function to refresh the time ever 15 or 30 seconds or so. plan to google, and accordinging to instructions, consider setting up a second repo

// stretch goal: prettify css

// closing the 'document.ready' command
});