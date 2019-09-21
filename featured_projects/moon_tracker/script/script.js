var decimalPhase = SunCalc.getMoonIllumination(new Date()).phase;
var phase = decimalToPhase(decimalPhase);
var calendar = document.getElementById("calendar");
var infoBox = document.getElementsByClassName("info")[0];
const inputBar = document.getElementById('myTextInput');
const myButton = document.getElementById('myButton');

// Display messages
var message1 = document.createElement('p');
message1.innerHTML = "The moon is " + (decimalPhase <= 0.50 ? decimalPhase * 200 : (1 - decimalPhase) * 200).toFixed(2) + "% full";
infoBox.appendChild(message1);

var image = document.createElement('img');
image.src = getPhaseImg(decimalPhase);
infoBox.appendChild(image);

var message2 = document.createElement('p');
message2.innerHTML = phase;
infoBox.appendChild(message2);


window.onkeydown = function(key) {
    if(key.keyCode == 13) {
        myButton.click();
    }
}

function decimalToPhase(decimalPhase) {
    var degrees = decimalPhase * 360;
    var range = 360/8;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
                  "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    
    if (degrees >= low || degrees < high) { return "New Moon"; }
    for (angle in angles) {
        if (degrees >= low && degrees < high) { return angles[angle]; } 
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
}

// Returns a string to be used as an img src
function getPhaseImg(decimalPhase) {
    var degrees = decimalPhase * 360;
    var range = 360/30;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var fileName = "img/moon_phase/";
    if (degrees >= low || degrees < high) { fileName += 0; }
    for (var i = 0; i < 30; i++) {
        if (degrees >= low && degrees < high) { fileName += i; } 
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    fileName += ".png"
    return fileName;
}

function blink() {
    var colon = document.getElementById("colon");
    colon.style.visibility = colon.style.visibility == "hidden" ? "visible" : "hidden";
}

document.body.onload = function() {
    updateCalendar();
    setInterval("updateCalendar()", 1000);
    setInterval("blink()", 500);
}

function updateCalendar() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var hours = today.getHours() % 12;
    if (hours == 0) { hours = 12; }
    var minutes = today.getMinutes();
    var timeOfDay = (today.getHours()) < 12 ? "AM" : "PM";
    if (minutes < 10) { minutes = "0" + minutes; }
    var date_time = month + "/" + day + "/" + year + " " + hours + "<span id='colon'>:</span>" + minutes + timeOfDay;
    calendar.innerHTML = date_time;
}