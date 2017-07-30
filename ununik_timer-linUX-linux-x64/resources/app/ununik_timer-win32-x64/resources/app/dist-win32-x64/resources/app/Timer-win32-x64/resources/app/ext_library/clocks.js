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

  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 30, 0);
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
    $('#video').css('display', 'none');
  
    $('#alert').text('');
  var timespan = date.getTime();
  
  var missing = timeAlert - timespan;
  
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

	  if (missing < (document.getElementById('video').duration * 1000) + 1000) {
          $('#video').css('display', 'block');
          document.getElementById('video').play();
          $('#clock').css('font-size', '7vH');
          $('#clock').css('line-height', '14vH');
          $('#clock').css('text-align', 'right');
          $('#clock').css('margin-left', '5vW');
          $('#clock').css('position', 'absolute');
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