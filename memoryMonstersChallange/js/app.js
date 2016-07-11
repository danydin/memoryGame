// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;
var cards_testing = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 6;

// Load an audio file win + right + wrong
var audioWin = new Audio('sound/win.mp3');

var audioRight = new Audio('sound/right.mp3');

var audioWrong = new Audio('sound/wrong.mp3');

// shuffle + reset game  flipped cards off
function shuffle(){
  // select all cards and runs loop to shuffle the order
var board = document.querySelector('.board');
for (var i = board.children.length; i >= 0; i--) {
board.appendChild(board.children[Math.random() * i | 0]);

    // Get all DOM object with class "flipped". as its what was used for displaying "hidden" image.
    var flipped_cards = document.getElementsByClassName('flipped');
    // Loops through all flipped_cards and flip them back by toggling class "flipped" off
    // already initialized i in this function block. So no need for var i.
    for(i = 0; i < flipped_cards.length; i++){
        // classList.toggle. adds class if element does not have it and removes it if elements have it.
        flipped_cards[i].classList.toggle('flipped');
    }
  }
}
// This function is called whenever the user click a card
function cardClicked(elCard) {
  // main scope, Only 2 card can be visible at same time.
if(cards_testing < 2){
    // This card will be visible. So one more card visible in counter.
    cards_testing++;
  
    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');

    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2){
            setTimeout(function () {
              // Hides this card again. So now two less card visible in counter.
                cards_testing -= 2;
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
            }, 1000)
            // Play music for a mistake
            AudioWrong.play();
        } 
      else {
            // Yes! a match!
          // Both card were correct. No need to hide both. Reset testing counter.
          cards_testing = 0;
          flippedCouplesCount++;
          elPreviousCard = null;
          audioRight.play();

            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
            
             }
  
         }

      }
  }

}
