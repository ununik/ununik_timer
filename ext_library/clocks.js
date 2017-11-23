var time_hours = 9;
var time_minutes = 30;
var time_seconds = 0;

function showClock(place){
	
	var html = '<div id="clock"><div class="unit" id="hours"></div>:<div class="unit" id="minutes"></div>:<div class="unit" id="seconds"></div></div><div id="alert"></div>';

$(place).html(html);

update();
window.setInterval(update, 1000);
}

function update(){
  var date = new Date();
  var $hOut = $('#hours'),
  $mOut = $('#minutes'),
  $sOut = $('#seconds');

  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time_hours, time_minutes, time_seconds);
  var timeAlert = today.getTime();
  
  var hours =  date.getHours() < 10
                ? '0' + date.getHours()
                : date.getHours();
  
  var minutes = date.getMinutes() < 10 
                ? '0' + date.getMinutes() 
                : date.getMinutes();
  
  var seconds = date.getSeconds() < 10 
                ? '0' + date.getSeconds() 
                : date.getSeconds();
  
  $hOut.text(hours);
  $mOut.text(minutes);
  $sOut.text(seconds);

    $('#clock').css('position', 'relative');
    $('#clock').css('font-size', '25vH');
    $('#clock').css('line-height', '65vH');
    $('#clock').css('text-align', 'center');
    $('#clock').css('margin-left', '0px');
    //$('#video').css('display', 'none');
  
    $('#alert').text('');
  var timespan = date.getTime();
  
  var missing = timeAlert - timespan;
  
  showMessage();
  
  if (missing > 0) {
	  missingMinutes = Math.floor((missing/1000)/60) + 1;
	  minutesWord = 'minut';
	  if (missingMinutes < 5 && missingMinutes > 1) {
		  minutesWord = 'minuty';
	  } else if (missingMinutes == 1) {
		  minutesWord = 'minutu';
	  }
	  $('#alert').text('Začínáme za ' + missingMinutes + ' ' + minutesWord)

	  if (missing <= 5000) {
		  $('#dark').css('background-color', 'black');
		  $('#clock').css('color', 'white');
	  }
//console.log(document.getElementById('video').duration);
	  if (missing < (document.getElementById('video').duration * 1000) + 1000) {
          $('body').css('background-color', 'black');
          $('#dark_video').css('background-color', 'black');
          $('#video').css('display', 'block');
          document.getElementById('video').play();
          $('#clock').css('font-size', '7vH');
          $('#clock').css('line-height', '10vH');
          $('#clock').css('text-align', 'right');
          $('#clock').css('margin-left', '5vW');
          $('#clock').css('position', 'absolute');
          $('#message_wrapper').css('display', 'none');
          $('#clock').css('margin-top', '0');
      } else {
          $('body').css('background-color', 'white');
          $('body').css('color', color);
          $('#dark_video').css('background-color', 'transparent');
          $('#message_wrapper').css('display', 'block');
      }


  } else {
      document.getElementById('video').pause();
  }
} 

$(document).ready(function() {
	showClock("#time_box");
})

date = new Date();
//alert(date.getTime() + 5*60*1000);

var messageAlerts = [
//{message:"Vypněte si své telefony", length: 5, icon:"style/no_tel.png"},
];
var messageNum = 0;
var messageLastTimestamp = 0;

function showMessage()
{
    if (messageAlerts.length != 0) {
        if (messageNum == 0) {
            lastMessage = messageAlerts.length - 1;
        } else {
            lastMessage = messageNum - 1;
        }
        actualTime = new Date();
        
        if (actualTime.getTime() > (messageLastTimestamp + (messageAlerts[lastMessage].length * 1000)) ) {
           //show message  messageNum
           
           $('#message_text').html(messageAlerts[lastMessage].message);
           if (messageAlerts[lastMessage].icon != '') {
              $('#message_icon').html("<img src='"+messageAlerts[lastMessage].icon+"'>")
           } else {
              $('#message_icon').html("")
           }
           
           messageLastTimestamp = actualTime.getTime();
           messageNum++;
           if (messageNum >= messageAlerts.length) {
               messageNum = 0;
           }
        }
    }
    
}

function getData(){
    storage.get('ununik_timer', function(error, data) {
        if (error) throw error;

        time_hours = data.time_hours;
        time_minutes = data.time_minutes;
        time_seconds = data.time_seconds;
        color = data.color;

        document.getElementById('video').setAttribute('src', data.video_path);
        document.getElementById('video').load();
        document.getElementById('video').setAttribute('src', data.video_path);
        console.log(data.background_path);
        	$('#background').css('background-image', 'url(' + data.background_path + ')');

        for (var i in data.messages.items) {
            messageAlerts.push({message: data.messages.items[i].text, length: data.messages.items[i].time, icon: data.messages.items[i].icon});
        }
    });

}

getData();