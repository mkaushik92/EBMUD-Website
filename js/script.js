// Earthquake probability calculator

function earthquakeProbability() {
  var x = document.getElementById("numYears").value;
  if (x == "1") {
    var prob = "1%"
    document.getElementById("prob").innerHTML = "There is approximately a " +
    prob + " chance that an earthquake of 6.7 magnitude or higher will occur in the next " + x + " year.";
  }
  if (x == "5"){
    var prob = "6%"
    document.getElementById("prob").innerHTML = "There is approximately a " +
    prob + " chance that an earthquake of 6.7 magnitude or higher will occur in the next " + x + " years.";
  }
  if (x == "10") {
    var prob = "12%"
    document.getElementById("prob").innerHTML = "There is approximately a " +
    prob + " chance that an earthquake of 6.7 magnitude or higher will occur in the next " + x + " years.";
  }
  if (x == "30") {
    var prob = "36%"
    document.getElementById("prob").innerHTML = "There is a " +
    prob + " chance that an earthquake of 6.7 magnitude or higher will occur in the next " + x + " years.";
  }
}

// Total number of gallons to store calculator

function myFunction() {
var x = document.getElementById("mySelect").value;
var galNum = x * 14;
document.getElementById("result").innerHTML = "A one week supply of emergency water for " +
x + " people is " + galNum + " gallons (2 gallons per person per day).";
}


// Timeline script

(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();
