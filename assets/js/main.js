
$(document).ready(function () {
	var interval;
	var timeRemaining = 0;
	var breakMode = false;
	var timerStarted = false;
	var sessionLengthSetup = 25;
	var breakLengthSetup = 5;
	
	//add time to session setup
	$("#sessionPlusButton").click(function(){
		sessionLengthSetup = increaseSession(sessionLengthSetup);
		updateSessionDisplay();
		updateCountdownDisplayOnSetup();
	});
	//remove time from session setup
	$("#sessionMinusButton").click(function(){
		sessionLengthSetup = decreaseSession(sessionLengthSetup);
		updateSessionDisplay();
		updateCountdownDisplayOnSetup();
	});	
	//add time to break setup
	$("#breakPlusButton").click(function(){
		breakLengthSetup = increaseSession(breakLengthSetup);
		updateBreakDisplay();
	});
	//remove time from break setup
	$("#breakMinusButton").click(function(){
		breakLengthSetup = decreaseSession(breakLengthSetup);
		updateBreakDisplay();
	});		
	//start the timer
	$("#startButton").click(function(){
		startTimer();
	});
	//stop the timer
	$("#pauseButton").click(function(){
		stopTimer();
	});
	$("#resetButton").click(function(){
		resetTimer();
	});	
	
	
	//FUNCTION DECLARATIONS
	function updateSessionDisplay(){
		$("#sessionDisplay").html(sessionLengthSetup);
	}

	function updateBreakDisplay(){
		$("#breakDisplay").html(breakLengthSetup);
	}
	
	function updateCountdownDisplayOnSetup(){
		if(timerStarted === false){
			timeRemaining = sessionLengthSetup * 60;
		}
		updateCountdownDisplay();
	}
	
	function updateCountdownDisplay(){
		var minutes = Math.trunc(timeRemaining/60);
		var seconds = timeRemaining%60;
		if (seconds<10){var divider = ":0"}
		else {divider = ":"}
		$("#countdown").html(minutes + divider + seconds);		
	}	
	
	function timer() {
		timeRemaining--;
		if (timeRemaining === 0){switchState();}
		updateCountdownDisplay();
	}
	
	function switchState(){
		if (breakMode === false){
			breakMode = true;
			timeRemaining = breakLengthSetup * 60;
			$("body").css("background-color", "#8FFFA9");
		} else {
			breakMode = false;
			timeRemaining = sessionLengthSetup * 60;
			$("body").css("background-color", "#FF949D");

		}
	}
	
	function startTimer() {
		//if session already started, unpause instead of setting new length
		if (timerStarted === false){
			timeRemaining = sessionLengthSetup * 60;
			timerStarted = true;
		}
		//prevent multiple timers
		stopTimer();
		interval = setInterval(function() {timer()}, 10);	
	}
	
	function stopTimer() {
		 clearInterval(interval);
	}
	//functions to modify settings on button press
	function increaseSession(arg) {
		arg++;
		if (arg>60){arg=60;}
		return arg;
	}
	function decreaseSession(arg) {
		arg--;
		if (arg < 1){arg=1;}
		return arg;
	}
	//full reset button
	function resetTimer(){
		stopTimer();
		breakMode = false;
		timerStarted = false;
		$("body").css("background-color", "#FF949D");
		sessionLengthSetup = 25;
		breakLengthSetup = 5;
		timeRemaining = sessionLengthSetup * 60;
		updateBreakDisplay();
		updateSessionDisplay();
		updateCountdownDisplay();
	}

});


