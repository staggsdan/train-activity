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

  var database = firebase.database();

 $("#add-train-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destinationName = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // googled a few different ways to reduce errors in the user data for the HH:mm format, and spun this solution out of someones tip for ensuring a certain number of digits.
    var formattedFirstTrain = ("0" + firstTrain).slice(-5);


    var newTrainToDatabase = {
        name: trainName,
        destination: destinationName,
        start: formattedFirstTrain,
        rate: trainFrequency,
    };

    database.ref().push(newTrainToDatabase);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
 });
//   create submission functionality. 1. write on(click). 2. prevent default/null entry. 2b. additional null protection: give every input an additional class for '.blank-check' and if field === no input, than prevent input from occuring. 3. get value from each input ID by creating new vars and defining them by each submission field with val() and trim(). 3b. do I need to create an 'if' that checks for incorectly formatted times?  4. create object array as a temporary holding zone. 5. push object array to database. 6. clear the entries. now they're in firebase.

database.ref().on("child_added", function(childSnapshot){

    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
    
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % trainFrequency;

    var tMinutesTillTrain = trainFrequency - tRemainder;

    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");

    var i = 0;
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationName),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain.format('HH:mm')),
        $("<td>").text(tMinutesTillTrain),
        $("<td>").html("<button class=removal-button>x</button>"),
    );
    newRow.addClass("row-" + i);

    $("#train-table").append(newRow);
    i++;
});

// create 'populate list' functionality. push from firebase back out to display once firebase receives data. 1. write an "on(child_added)" very similar to an "on(click)" that stores all the firebase/input fields into vars. 2. any necessary conversion math (double check instruction requests). 3. the necessary modal math to determine wait times for the next train. 4. write the modified data fields to a new var called 'newRow', format as a <tr>, and format all the fields as <td>. see exercise 4.2.17.

$(document).on("click", ".removal-button", function(){
    // identify the row correctly: ???
    // delete the row:
    // database.ref() _then some attr or cls info .remove();
})


// stretch goal: function to delete trains from the table.
// 1. tweak the append-to-database code to add an attribute ID = index position. 2. onclick xbutton id of a certain index, delete that object from firebase. should be easy with some google.

// stretch goal: function to refresh the time ever 15 or 30 seconds or so. plan to google, and accordinging to instructions, consider setting up a second repo

// database.setTimeout(function(){ location.reload(); }, 15000);
function viewRefresher(){


}

// stretch goal: prettify css

// the below brackets/paranthesis close the 'document.ready' command
});