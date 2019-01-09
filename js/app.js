/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*

 *  -
 *  -
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

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
	} catch(exception) {
		console.log(exception);
	}
}

//add moves to the counter
function addMove () {
	 var score = parseInt(getMoves().innerText,10) + 1;
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

} catch(exception) {
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
var card = event.target || event.srcElement;
if (card.classList.contains("match")) {
	return;
}
				if (openCards.length == 2) {
// hide both, reveal new
 		hideCard(openCards[0]);
 		hideCard(openCards[1]);
 		openCards = [];
		reveal (card);
			// next clixk has 1 open already
	}
		//checks if cards match only if the array length is 2. Consider refactoring. TODO more logic for other instances and adding actions
		else if (openCards.length == 1) {
		//add the card to a *list* of "open" cards
		reveal (card);
 			if (openCards[0].firstElementChild.classList[1] == openCards[1].firstElementChild.classList[1]) {
				console.log('match');
				match (openCards[0]);
				match (openCards[1]);
			// flush list
		openCards = [];
			// next clixk has 0 open already
			addMove();
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

var openCards = [];

// performs action on the card  when it's clicked:
 getCards().forEach( function(card) {
 	//display the card's symbol + converted anonymous function to a named function to access it elsewhere
	card.addEventListener('click', click)
});

restart ();







