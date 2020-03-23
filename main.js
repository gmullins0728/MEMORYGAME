// Set all variables
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

    let cardElements = document.getElementsByClassName('game-card');

    cardElementsArray = [...cardElements];

    for(i = 0; i < cardElements.length; i++) {
        //remove all extra classes for game play
        cardElements[i].classList.remove("show", "open", "match", "disabled");
        cardElements[i].children[0].classList.remove("show-img");
    }

    //listen for events on the cards
    for(let i = 0; i < cardElementsArray.length; i++) {
        cardElementsArray[i].addEventListener("click", displayCard)
    }

    //reset moves
    moves = 0;
    counter.innerText = `${moves} move(s)`;

    //Reset Timer on game reset
    timer.innerHTML = '0 mins 0 secs';
    clearInterval(interval);
}

function displayCard() {
    this.children[0].classList.toggle('show-img');
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    cardOpen(this);
}

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

function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    // disableMatched();
    openedCards = [];
    if(matchedCards.length == 12) {
        endGame();
    }
}

function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched", "disabled");
        openedCards[1].classList.remove("show", "open", "unmatched", "disabled");
        openedCards[0].children[0].classList.remove('show-img');
        openedCards[1].children[0].classList.remove('show-img');
        openedCards = [];
        
    }, 1100)
}

// function disableMatched() {
//     for(let i=0; i<matchedCards.length; i++) {
//         matchedCards[i].classList.add('disabled');
//      }

// }

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

function endGame() {
    clearInterval(interval);
    totalGameTime = timer.innerHTML;

    //show modal on game end
    modalElement.classList.add("show-modal");
    
    //show totalGameTime and moves in modal
    totalGameTimeElement.innerHTML = totalGameTime;
    totalGameMovesElement.innerHTML = moves;

    matchedCards = [];
}

function playAgain() {
    modalElement.classList.remove("show-modal");
    
    //regenerate card table with currentTheme
    generateCardTable(savedTheme);
    startGame();
}



