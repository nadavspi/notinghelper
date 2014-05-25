var i = 0,
    flashInterval,
    timeout,
    timer,
    timerInterval,
    noteCounter = -1,
    notingInterval = 5;
function pad(val) {
  return val > 9 ? val : "0" + val;
}
function startFlash() {
  flashInterval = setInterval( function () {
    $("body").toggleClass('flash');
    i++;
    if (i == 3) {
      stopFlash();
    }
  }, 500);
  $("body").toggleClass("flash");
}
function stopFlash() {
  if (flashInterval) {
    clearInterval(flashInterval);
    $("body").removeClass('flash');
    i = false; 
  }
}
function toggleTimer() {
  var timer = $("#timer");
  var seconds = timer.find(".timer-seconds");
  var minutes = timer.find(".timer-minutes");
  if (!timerInterval) {
    var i = 0;
    timerInterval = setInterval( function () {
      seconds.html(pad(++i%60));
      minutes.html(pad(parseInt(i/60))); 
    }, 1000);
  }
  else {
    clearInterval(timerInterval);
    timerInterval = false;
    seconds.html("00");
    minutes.html("00");
  }
}
function initializeNoting() {
  notingInterval = $("#notingInterval").val() * 1000;
  $("body").addClass("noting--active");
  startNoting();
  toggleTimer();
}
function startNoting() {
  $("#reminder").hide();
  noteCounter++;
  $("#counter").html(noteCounter);
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    $("#reminder").show();
    startFlash();
  }, notingInterval);
}
function stopNoting() {
  $("#reminder").hide();
  noteCounter = -1;
  clearTimeout(timeout);
  stopFlash();
  $("body").removeClass('noting--active');
}
$("#startbutton").on("click", function (e) {
  e.preventDefault;
  initializeNoting();
});

$(document).keydown(function (e) {
  if ($("body").hasClass("noting--active")) {
    if (e.which == 32) { // space bar
      e.preventDefault();
      stopFlash();
      startNoting();
    }
    if (e.which == 27) { // escape key
      stopNoting();
      toggleTimer();
    } 
  }
  else if (e.which == 32) {
    initializeNoting();
  }
});

$(document).on("click", function(e) {
  if ($("body").hasClass("noting--active")) {
    e.preventDefault();
    stopFlash();
    startNoting();
  }
});

$("#stop").on("click", function(e) {
  e.stopPropagation();
  stopNoting();
  toggleTimer();
});