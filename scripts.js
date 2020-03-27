const cards = document.querySelectorAll('.memory-card');
let i = 0;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ? disableCards() : unflipCards();
}



function disableCards() {
  
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  i = i+1;
  if (i==8){
    modal.style.display = "block";
    
  }
  
  resetBoard();
}



function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
  
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

span.onclick = function() {
  modal.style.display = "none";
  resetBoard();
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetBoard();
  }
}