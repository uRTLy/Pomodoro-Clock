var clock = (function () {

	var timeScreen = document.getElementById("time-passing");
	var breakLengthDOM = document.getElementById('breakLength');
	var sessionLengthDOM = document.getElementById('sessionLength');
	var icons = document.getElementsByTagName("i")
	var initialSessionLength = 25;
	var initialBreakLength = 5;
	var countDown;
	var isCountingDown = 1;

	function bindEvents() {
		addEventListenersToCollection(icons, "click", emitEvent);
		console.log(icons);
	}

	function startCountingDown() {
		isCountingDown++;
		var sessionInSeconds = initialSessionLength * 60;
		var breakInSeconds = initialBreakLength * 60;
		var modifyBtns = removeFromCollectionByID(icons, "time-passing");

		if (isCountingDown % 2 === 0) {
			removeEventListenersFromCollection(modifyBtns, "click", emitEvent);
			countDown = setInterval(displayTime, 1000);
			return;
		}
		initialState();

		function displayTime() {
			var seconds = 0;
			if ((breakInSeconds <= 0) && (sessionInSeconds <= 0)) {
				sessionInSeconds = initialSessionLength * 60;
				breakInSeconds = initialBreakLength * 60;
			}
			if (sessionInSeconds > 0) {
				sessionInSeconds--;
				seconds = sessionInSeconds;
			}
			if ((breakInSeconds > 0) && (sessionInSeconds <= 0)) {
				breakInSeconds--;
				seconds = breakInSeconds;
			}

			var minutes = Math.floor(seconds / 60);
			seconds = Math.floor(seconds % 60);

			timeScreen.innerHTML = getFormattedTime(minutes, seconds);

		}
	}

	function getFormattedTime(mins, seconds) {
		if (mins < 10) {
			var mins = "0" + mins;
		}
		if (seconds < 10) {
			var seconds = "0" + seconds;
		}

		return mins + ":" + seconds;
	}

	function initialState() {

		clearInterval(countDown);
		isCountingDown = 1;
		initialSessionLength = 25;
		initialBreakLength = 5;
		sessionLengthDOM.innerHTML = initialSessionLength;
		breakLengthDOM.innerHTML = initialBreakLength;
		timeScreen.innerHTML = initialSessionLength;
	}

	function modifySessionLength(operation) {
		initialSessionLength += operation;
		if (initialSessionLength < 1) {
			initialSessionLength = 1;
		}
		sessionLengthDOM.innerHTML = initialSessionLength;
		timeScreen.innerHTML = initialSessionLength;
	}

	function modifyBreakLength(operation) {
		initialBreakLength += operation;
		if (initialBreakLength < 1) {
			initialBreakLength = 1;
		}
		breakLengthDOM.innerHTML = initialBreakLength;
	}

	function emitEvent() {
		var self = this;
		var eventDelegator = {
			"break-plus": modifyBreakLength.bind(null, 1),
			"break-minus": modifyBreakLength.bind(null, -1),
			"session-plus": modifySessionLength.bind(null, 1),
			"session-minus": modifySessionLength.bind(null, -1),
			"time-passing": startCountingDown.bind(self)
		};

		return eventDelegator[this.id]();

	}

	function addEventListenersToCollection(collection, eventType, eventName) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].addEventListener(eventType, eventName);
		}
	}

	function removeEventListenersFromCollection(collection, eventType, eventName) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].removeEventListener("click", eventName);
		}
	}

	function removeFromCollectionByID(collection, id) {
		var newCollection = [];
		for (var i = 0; i < collection.length; i++) {
			if (!collection[i].id === id) {
				newCollection.push(collection[i]);
			}
		}
		return newCollection;
	}

	return {
		bindEvents: bindEvents,
		initialState: initialState
	};

})();
clock.bindEvents();
clock.initialState();
