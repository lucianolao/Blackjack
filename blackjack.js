// Luciano Oliveira, Anmolpreet Sandhu, Rushabh Raval
// Douglas College

var scoreWindow = null;
	var username = sessionStorage.myValue;
	var cards = new Array(52);
	var humanPlayer, AIPlayer;
	var bet = 0, turn = 0;
	createDeck();
	createPlayers();
	
	function createDeck() {
		var suit,rank;
		for (var i=0; i<4; i++) { // 4 suits
			for (var j=1; j<=13; j++) { // 13 ranks
				switch(i) {
					case 0:	suit = "clubs";		break;
					case 1:	suit = "diamonds";	break;
					case 2:	suit = "hearts";	break;
					case 3:	suit = "spades";	break;
				}
				switch(j) {
					case 1:		rank = "A";	break;
					case 11:	rank = "J";	break;
					case 12:	rank = "Q";	break;
					case 13:	rank = "K";	break;
					default:	rank = j;
				}
				cards[(i * 13) - 1 + j] = {
					suit: suit,
					rank: rank,
					value: j < 10 ? j : 10,
					image: "images/"+suit+rank+".png"
				};
			}
		}
	}
	
	function createPlayers() {
		humanPlayer = {
			id: 0,
			hand: new Array(),
			points: 0,
			cash: 1500
		};
		AIPlayer = {
			id: 1,
			hand: new Array(),
			points: 0
		};
	}
	
	function deal() {
		document.getElementById("deal").style.visibility="hidden";
		document.getElementById("hit").style.visibility="visible";
		document.getElementById("stand").style.visibility="visible";
		document.getElementById("1").style.visibility="hidden";
		document.getElementById("5").style.visibility="hidden";
		document.getElementById("25").style.visibility="hidden";
		document.getElementById("100").style.visibility="hidden";
		document.getElementById("500").style.visibility="hidden";
		document.getElementById("1000").style.visibility="hidden";
		hit(humanPlayer,true);
		hit(AIPlayer,true);
		hit(humanPlayer,true);
	}
	
	function shuffle() {
		for (var i = cards.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}
	}
	
	function makeBet(newBet) {
		if (document.getElementById("result").innerHTML != '') {
			reset();
		}
		if (newBet > humanPlayer.cash) {
			newBet = humanPlayer.cash;
		}
		bet += newBet;
		humanPlayer.cash -= newBet;
		if (newBet > 0) {
			updateControls();
			document.getElementById("deal").style.visibility="visible";
		}
	}
	
	function hit(player,initilization) {
		if (!initilization && player.id != turn) {
			alert("That's not your turn!");
			return;
		}
		if (cards.length > 0) {
			player.hand.push(cards.pop());
			player.points += player.hand[player.hand.length - 1].value;
		} else {
			alert("Out of cards!");
		}
		showHands();
		if (player.id == 0) {
			document.getElementById("humanPoints").innerHTML = player.points;
		} else if (player.id == 1) {
			document.getElementById("AIPoints").innerHTML = player.points;
		}
		if (player.points >= 21) {
			endTurn();
		}
	}
	
	function stand() {
		endTurn();
	}
	
	function endTurn() {
		turn++;
		if (turn == 1) {
			if (humanPlayer.points > 21) {
				endRound();
			} else {
				AITurn();
			}
		} else if (turn == 2) {
			endRound();
		}
	}
	
	function AITurn() {
		if (turn == AIPlayer.id) {
			if (AIPlayer.points > humanPlayer.points) {
				endTurn();
				return;
			}
			if (AIPlayer.points == humanPlayer.points && AIPlayer.points >= 16) {
				endTurn();
				return;
			}
			hit(AIPlayer,false);
			setTimeout("AITurn()",1000);
		}
	}
	
	function endRound() {
		if (humanPlayer.points > 21 || (humanPlayer.points < AIPlayer.points && AIPlayer.points <= 21)) {
			document.getElementById("result").innerHTML="You Lose";
		} else if (AIPlayer.points > 21 || humanPlayer.points > AIPlayer.points) {
			humanPlayer.cash += 2*bet;
			/*if (humanPlayer.cash > 1500) {
				saveScore(humanPlayer.cash);
			}*/
			document.getElementById("result").innerHTML="You Win";
		} else {
			humanPlayer.cash += bet;
			document.getElementById("result").innerHTML="&nbsp;&nbsp;Draw&nbsp;&nbsp;";
		}
		document.getElementById("1").style.visibility="visible";
		document.getElementById("5").style.visibility="visible";
		document.getElementById("25").style.visibility="visible";
		document.getElementById("100").style.visibility="visible";
		document.getElementById("500").style.visibility="visible";
		document.getElementById("1000").style.visibility="visible";
		document.getElementById("hit").style.visibility="hidden";
		document.getElementById("stand").style.visibility="hidden";
		document.getElementById("cash").value = humanPlayer.cash;
		document.getElementById("bet").value = '';
	}
	
	function showHands() {
		var result = '';
		for (var i = 0; i < humanPlayer.hand.length; i++) {
			result += "<img src='"+humanPlayer.hand[i].image+"' width='95' height='120'>";
		}
		document.getElementById("humanPlayer").innerHTML = result;
		result = '';
		for (var i = 0; i < AIPlayer.hand.length; i++) {
			result += "<img src='"+AIPlayer.hand[i].image+"' width='95' height='120'>";
		}
		document.getElementById("AIPlayer").innerHTML = result;
	}
	
	function restartGame() {
		resetPlayers();
		reset();
	}
	
	function resetPlayers() {
		humanPlayer.cash = 1500;
	}
	
	function reset() {
		returnCards();
		resetGlobalVariables();
		shuffle();
		showHands();
		updateControls();
		resetVisibilityControls();
	}
	
	function returnCards() {
		while (humanPlayer.hand.length > 0) {
			cards.push(humanPlayer.hand.pop());
		}
		humanPlayer.points = 0;
		while (AIPlayer.hand.length > 0) {
			cards.push(AIPlayer.hand.pop());
		}
		AIPlayer.points = 0;
	}
	
	function resetGlobalVariables() {
		bet = 0;
		turn = 0;
	}
	
	function updateControls() {
		document.getElementById("cash").value = humanPlayer.cash;
		if (bet == 0) {
			document.getElementById("bet").value = '';
		} else {
			document.getElementById("bet").value = bet;
		}
		document.getElementById("humanPoints").innerHTML = '';
		document.getElementById("AIPoints").innerHTML = '';
		document.getElementById("result").innerHTML = '';
	}
	
	function resetVisibilityControls() {
		document.getElementById("deal").style.visibility="hidden";
		document.getElementById("hit").style.visibility="hidden";
		document.getElementById("stand").style.visibility="hidden";
		document.getElementById("restart").style.visibility="visible";
		document.getElementById("score").style.visibility="visible";
		document.getElementById("1").style.visibility="visible";
		document.getElementById("5").style.visibility="visible";
		document.getElementById("25").style.visibility="visible";
		document.getElementById("100").style.visibility="visible";
		document.getElementById("500").style.visibility="visible";
		document.getElementById("1000").style.visibility="visible";
	}
	
	var xmlHttp = createXmlHttpRequestObject();
	// retrieves the XMLHttpRequest object
	function createXmlHttpRequestObject() {
		// will store the reference to the XMLHttpRequest object
		var xmlHttp;
		// if running Internet Explorer
		if(window.ActiveXObject) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xmlHttp = false;
			}
		} else {
			// if running Mozilla or other browsers
			try {
				xmlHttp = new XMLHttpRequest();
			} catch (e) {
				xmlHttp = false;
			}
		}
		// return the created object or display an error message
		if (!xmlHttp)
			alert("Error creating the XMLHttpRequest object.");
		else
			return xmlHttp;
	}
	// make asynchronous HTTP request using the XMLHttpRequest object
	
	function loadScore() {
        // proceed only if the xmlHttp object isn't busy
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
                xmlHttp.open("GET", "score_load.php", true);
                // define the method to handle server responses
                xmlHttp.onreadystatechange = handleServerResponse;
                // make the server request
                xmlHttp.send(null);
        } else {
                // if the connection is busy, try again after one second
                setTimeout('loadScore()', 1000);
        }
	}
	
	function saveScore(score) {
        // proceed only if the xmlHttp object isn't busy
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
                $.get("score_save.php",{"name":username,"score":score});
                //$.get("score_save.php",{"name":username,"score":score}, handleServerResponse);
        } else {
                // if the connection is busy, try again after one second
                setTimeout('saveScore(score)', 1000);
        }
	}
	// executed automatically when a message is received from the server
	function handleServerResponse() {
		// move forward only if the transaction has completed
		if (xmlHttp.readyState == 4) {
			// status of 200 indicates the transaction completed successfully
			if (xmlHttp.status == 200) {
				newScoreWindow(xmlHttp.responseText);
			}
			// a HTTP status different than 200 signals an error
			else {
				alert("There was a problem accessing the server: " + xmlHttp.statusText);
			}
		}
	}
	
	function newScoreWindow(msg) {
		if (!scoreWindow || scoreWindow.closed) {
			scoreWindow = window.open("", "MsgWindow", "toolbar=no,location=no,directories=no, status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no, top=150, left=350, width=300, height=350");
			scoreWindow.document.write(msg);
		}
	}
	

