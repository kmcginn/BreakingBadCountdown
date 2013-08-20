MILLI_IN_DAY = 86400000;
MILLI_IN_HOUR = 3600000;
MILLI_IN_MINUTE = 60000;
MILLI_IN_SECOND = 1000;

$(document).ready(function(){

  var running = setInterval(function(){updateTime()}, 100);
  resizeFont();

  $("#test").mouseover(function(){
    $("#test").html("<img src='img/scratch/provides_elem.png'>");
  });

  $("#test").mouseout(function(){
    $("#test").html("ba");
  });

});

var resizeTimer;

$(window).resize(function(){
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeFont, 100);
});


function resizeFont(){
  var w=window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth;
  var newSize = 16*w/376.0;
  $(".phrase").css('font-size',newSize);
}

function updateTime() {
  curr = new Date();
  showTime = new Date("August 11, 2013 21:00:00");
  diff = showTime - curr;

  num_days = Math.floor(diff/MILLI_IN_DAY);
  num_days = addZero(num_days);
  diff %= MILLI_IN_DAY;

  num_hours = Math.floor(diff/MILLI_IN_HOUR);
  num_hours = addZero(num_hours);
  diff %= MILLI_IN_HOUR;

  num_minutes = Math.floor(diff/MILLI_IN_MINUTE);
  num_minutes = addZero(num_minutes);
  diff %= MILLI_IN_MINUTE;

  num_seconds = (diff/MILLI_IN_SECOND).toFixed(1);
  num_seconds = addZero(num_seconds);
  $("#time_left").text(num_days + ":" + num_hours + ":" + num_minutes + ":" + num_seconds);
}

function addZero(num) {
  if(num < 10) {
    return "0" + num;
  }
  return num;
}