var firebaseConfig = {
    apiKey: "AIzaSyAfsYcCiR_r58R78udITC3yIuQKpfAHXlM",
    authDomain: "train-scheduler-hw-d314d.firebaseapp.com",
    databaseURL: "https://train-scheduler-hw-d314d.firebaseio.com",
    projectId: "train-scheduler-hw-d314d",
    storageBucket: "train-scheduler-hw-d314d.appspot.com",
    messagingSenderId: "606074042625",
    appId: "1:606074042625:web:5a14b969abf9c8e34a4300"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var trainName;
var destination;
var firstTrain;
var frequency;
var firstTimeConverted;
var diffTime;
var Remainder;
var minTillNextTrain;
var nextTrain;
var nextTrainFormatted;


database.ref().on("child_added", function (snapshot) {
    
    $("table").append(
        $('<td>').text(snapshot.val().trainName);
        $('<td>').text(snapshot.val().destination);
        $('<td>').text(snapshot.val().frequency);
        $('<td>').text(snapshot.val().nextArrival);
        $('<td>').text(snapshot.val().minTillNextTrain);

        
        

    )
});


$("#submit").on("click", function (event) {
    event.preventDefault();

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#fristTrain").val().trim();
    frequency = parseInt($("#frequency").val().trim());


    firstTimeConverted = moment(firstTrain, "hh:mm");
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    Remainder = diffTime % frequency;
    minTillNextTrain = frequency - Remainder;
    nextTrain = moment().add(minTillNextTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm A");


    database.ref("train").push({
        trainName: trainName,
        destination: destination,
        fristTrain: firstTrain,
        frequency: frequency,
        nextTrain: minTillNextTrain,
        nextArrival: nextTrainFormatted

    })

    $("#trainName").val('')
    $("#destination").val('')
    $("#fristTrain").val('')
    $("#frequency").val('')

});
