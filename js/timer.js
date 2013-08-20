//constants
MILLI_IN_DAY = 86400000;
MILLI_IN_HOUR = 3600000;
MILLI_IN_MINUTE = 60000;
MILLI_IN_SECOND = 1000;

//array of shows
var shows = [{title:"Blood Money",airtime:new Date("August 11, 2013 21:00:00")},
             {title:"Buried",airtime:new Date("August 18, 2013 21:00:00")},
             {title:"Confessions",airtime:new Date("August 25, 2013 21:00:00")},
             {title:"Rabid Dog",airtime:new Date("September 1, 2013 21:00:00")},
             {title:"To'hajiilee",airtime:new Date("September 8, 2013 21:00:00")},
             {title:"Ozymandias",airtime:new Date("September 15, 2013 21:00:00")},
             {title:"Granite State",airtime:new Date("September 22, 2013 21:00:00")},
             {title:"Felina",airtime:new Date("September 29, 2013 21:00:00")}];


$(document).ready(function(){

  var next_show = getNextShow();

  var running = setInterval(function(){updateTime(next_show)}, 100);

  //set episode title, if valid
  if(next_show >= 0) {
    $("#ep_title").html("\"" + shows[next_show].title + "\"");
  }

  //whenever one of the elements (text or image) is clicked
  $(".js-elem").click(function(){

    //element is in image form
    if($(this).hasClass("is-image")) {

      //set html to the text based on the id
      //"al" gets special treatment since it needs to be capital
      if($(this).attr("id") == "al") {
        $(this).html("Al");
      }

      else {
        $(this).html($(this).attr("id"));
      }

    }

    //element is in text form
    else {
      //set html to the image corresponding to the id
      $(this).html("<img src='img/" + $(this).attr("id") + "_elem.png'>");
    }

    //toggle whether or not the element is an image
    $(this).toggleClass("is-image");
  });

});

//returns index of show that is next to air
//-1 if all shows have aired
function getNextShow() {
  curr = new Date();
  for(var i = 0; i < shows.length; i++) {
    if(shows[i].airtime - curr > 0) {
      return i;
    }
  }

  return -1;
}

function updateTime(next_show) {

  //check if show index is valid
  if(next_show >= 0) {

    curr = new Date();
    showTime = shows[next_show].airtime;
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

  else{
    $("#time_left").text("00:00:00:00.0");
  }
}

//adds a 0 to the front of a countdown number if needed
function addZero(num) {
  if(num < 10) {
    return "0" + num;
  }
  return num;
}