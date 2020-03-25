// Set all variables - globally
let cardElementsArray = [];
let counter = document.getElementById('moveCounter');
let timer = document.getElementById('timer');
let modalElement = document.getElementById('gameOverModal');
let totalGameMovesElement = document.getElementById('totalGameMoves');
let totalGameTimeElement = document.getElementById('totalGameTime');
let openedCards = [];
let matchedCards =  [];
let moves;
let second = 0,
    minute = 0,
    hour = 0,
    interval,
    totalGameTime;

// Start Game
function startGame() {
    // Set variables locally - cards array holds all cards
    let cardElements = document.getElementsByClassName('game-card');

    cardElementsArray = [...cardElements];

    //Loop to add event listener to each card
    for(let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard)
    }

    //Reset moves
    moves = 0;
    counter.innerText = `${moves} move(s)`;

    //Reset Timer on game reset
    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
}

// Shows the front image of cards
function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("disabled");
    cardOpen(this);
}

// Checks if cards are a match
function cardOpen(card) {
    openedCards.push(card);
    let len = openedCards.length;

    if(len === 2) {
        moveCounter();
        if(openedCards[0].innerHTML === openedCards[1].innerHTML) {
            matched();
        } else {
            unmatched();
        }
    }
}

// When the cards match - disable click when matched
function matched() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
    if(matchedCards.length == 12) {
        endGame();
    }
}

// When the cards do not match 
function unmatched() {
    setTimeout(function() {
        openedCards[0].classList.remove("disabled");
        openedCards[1].classList.remove("disabled");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        openedCards = [];
        
    }, 1000)
}

// Counts and keeps track of moves made
function moveCounter() {
    moves++;
    counter.innerHTML = `${moves} move(s)`;

    if(moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}

// Starts timer
function startTimer() {
    interval = setInterval(function(){
        timer.innerHTML = `${minute} mins ${second} secs`;
        second++;
        if(second == 60) {
            minute++;
            second = 0;
        }
        if(minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000)
}

// Once the game is completed - pop up message
function endGame() {
    clearInterval(interval);
    totalGameTime = timer.innerHTML;

    //show modal on game end
    modalElement.classList.add("show-modal");
    
    //show total time and total moves in modal
    totalGameTimeElement.innerHTML = totalGameTime;
    totalGameMovesElement.innerHTML = moves;

    matchedCards = [];
}

// Play again button
function playAgain() {
    modalElement.classList.remove("show-modal");
    
    // Regenerate card table with current theme
    generateCardTable(savedTheme);
    startGame();
}




