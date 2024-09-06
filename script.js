const cardsArray = [
    { name: 'A', id: 1 },
    { name: 'B', id: 2 },
    { name: 'C', id: 3 },
    { name: 'D', id: 4 },
    { name: 'A', id: 5 },
    { name: 'B', id: 6 },
    { name: 'C', id: 7 },
    { name: 'D', id: 8 }
];

let firstCard, secondCard;
let lockBoard = false;
let flippedCards = 0;

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart');

// Function to shuffle cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

// Function to createBoard
function createBoard() {
    shuffle(cardsArray);
    gameBoard.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);

        cardElement.innerHTML = `
            <div class="front">${card.name}</div>
            <div class="back">?</div>
        `;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Function to flipCard
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Function to checkForMatch
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}


// Function to disableCards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    flippedCards += 2;

    if (flippedCards === cardsArray.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

// Function to unflipCards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Function to resetBoard
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to restartGame

function restartGame() {
    flippedCards = 0;
    resetBoard();
    createBoard();
}

restartButton.addEventListener('click', restartGame);


// Function call createBoard
createBoard();
