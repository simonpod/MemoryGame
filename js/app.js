// array of all cards
var openCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976  + amended to operate in-place
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        //moving classes around instead of shuffling elements. Adding value to co
        temporaryValue = array[currentIndex].classList.value;
        array[currentIndex].classList.value = array[randomIndex].classList.value;
        array[randomIndex].classList.value = temporaryValue;
    }
    return array;
}

function gameWon() {
	var numberMatchedCards = 0;

	getCards().forEach(function (card)
 {
 if (card.classList.contains("match")) {
 	numberMatchedCards += 1;
 }
 })

if (numberMatchedCards == 16) {
	alert('You won the game in ' + getScore() + ' moves.' )
	restart ();
}
}

 // gets the list of the cards
function getCards () {
 	var cards = document.getElementsByClassName("card");
 	//converts html collection into an array
	return [...cards];
}

function getMoves() {
 	try {
		var movesCounter = document.getElementsByClassName("moves")[0];
		return movesCounter;
	}
	catch(exception) {
		console.log(exception);
	}
}
//added function to display the result in a cleaner code
function getScore () {
	return parseInt(getMoves().innerText,10);
}
//add moves to the counter
function addMove () {
	 var score = getScore () + 1;
	 //converts string into number
	 getMoves().innerText = score;
	 updateStars();
}


 function updateStars() {
 	try {
 		//select the ul containing stars
	var starUl = document.getElementsByClassName("stars")[0];
	//gets i element and converts html collection into array
	var starArray = [... starUl.getElementsByTagName("i")];
// takes the current number of moves as an integer
	var score = parseInt(getMoves().innerText,10)
	if (score <= 12) {
		var starCount = 3
	}
	else if (score <= 18) {
		var starCount = 2
	}
	else if (score <= 25) {
		var starCount = 1
	}
	else {
		var starCount = 0
		alert("game over")
	restart()
	return
	}
// array of i elements with stars
	starArray.forEach(function (star, index) {
		if (starCount > index) {
			star.classList.add("fa-star")
		}
		//checks the index of the star against starCount adding or removing classes
		else {
			star.classList.remove("fa-star")
		}
	})
}
catch(exception) {
	console.log(exception);}
 }


 function restart () {
 //reset all cards
 	var cards = getCards()
 	// empty array for
 	var card_i_tags = [];
 	cards.forEach( function(card, index) {
 		card.classList.remove("show");
 		card.classList.remove("match");
 		card.classList.remove("open");
 		// extract i tags from li
 		card_i_tags.push(card.getElementsByTagName('i')[0])
 	});
 		//sets the array of open cards to 0
 		openCards = [];
 	shuffle(card_i_tags);
// resets moves
getMoves().innerHTML = "0";
updateStars();
 }

// attach reset function to restart button
try {
	var restartButton = document.getElementsByClassName("restart")[0];
	restartButton.addEventListener("click", restart);
} catch(exception) {
	console.log(exception);
}


//cards logic
function hideCard (card)  {
	card.classList.remove("open");
	card.classList.remove("show");
	card.classList.remove("match");
}

function reveal (card) {
	card.classList.add("open");
	card.classList.add("show");
	openCards.push(card);
}

function match (card) {
	reveal (card);
	card.classList.add("match");
}

function click (event) {
	// extract card from click event
var card = event.target;
// if card is an 'i' then get parent instead - fixes the bug when user click on the symbol instead of the container
if (card.nodeName.toLowerCase() === "i") {
	card = card.parentNode;
}
if (card.classList.contains("match")) {
	return;
}
	if (openCards.length == 2) {
// hide both, reveal new
 		hideCard(openCards[0]);
 		hideCard(openCards[1]);
 		openCards = [];
		reveal (card);
			// next click has 1 open already
	}
	else if (openCards.length == 1) {
		if (card.classList.contains("open")) {
		return;
	}
		//add the card to an array of "open" cards
		reveal (card);
 			if (openCards[0].firstElementChild.classList[1] == openCards[1].firstElementChild.classList[1]) {
				console.log('match');
				match (openCards[0]);
				match (openCards[1]);
			// flush list
		openCards = [];
			// next click has 0 open already
			addMove();
			setTimeout(gameWon, 500);
		}
			else {
				console.log('nomatch')
			// next clixk has 2 open already
			addMove();
		}

		} else if (openCards==0){
			// show card
			reveal (card);
			// next click has 1 open already
		}
		console.log(openCards);
	}
// performs action on the card  when it's clicked
 getCards().forEach(function(card) {
 	//display the card's symbol + converted anonymous function to a named function to access it elsewhere
	card.addEventListener('click', click)
});

restart ();
