const cards = [
  { id: 1, value: 'A' },
  { id: 2, value: 'A' },
  { id: 3, value: 'B' },
  { id: 4, value: 'B' },
  { id: 5, value: 'C' },
  { id: 6, value: 'C' },
  { id: 7, value: 'D' },
  { id: 8, value: 'D' },
  { id: 9, value: 'E' },
  { id: 10, value: 'E' },
  { id: 11, value: 'F' },
  { id: 12, value: 'F' },
  { id: 13, value: 'G' },
  { id: 14, value: 'G' },
  { id: 15, value: 'H' },
  { id: 16, value: 'H' },
];

let flippedCards = [];
let matchedCards = [];
let isBoardLocked = false;
let isTamerStarted = false;
let moves = 0;
let score = 0;
let timer;
let seconds = 0;

const createCardElement = (card) => {
  const element = document.createElement('div');
  element.classList.add('card');
  element.dataset.id = card.id;

  const frontFace = document.createElement('div');
  frontFace.classList.add('front-face');

  const backFace = document.createElement('div');
  backFace.classList.add('back-face');
  backFace.textContent = card.value;

  element.appendChild(frontFace);
  element.appendChild(backFace);

  element.addEventListener('click', flipCard);
  return element;
};

const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const renderCards = () => {
  const board = document.querySelector('.board');
  board.innerHTML = '';
  cards.forEach(card => {
    const cardElement = createCardElement(card);
    board.appendChild(cardElement);
  });
};

const flipCard = function () {
  if (!isTamerStarted) {
    startTimer();
    isTamerStarted = true;
  }
  if (isBoardLocked || this.classList.contains('flip')) return;
  this.classList.add('flip');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    isBoardLocked = true;
    moves++;
    document.getElementById('moves').textContent = moves;

    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.back-face').textContent;
    const value2 = card2.querySelector('.back-face').textContent;

    if (value1 === value2) {
      setTimeout(() => {
        flippedCards.forEach(card => card.remove());
        matchedCards.push(...flippedCards);
        flippedCards = [];
        isBoardLocked = false;
        score++;
        document.getElementById('score').textContent = score;
      }, 1000);
      if (matchedCards.length === cards.length - 2) {
        clearInterval(timer);
        setTimeout(() => {
          alert(`Congratulations! You won in ${moves} moves and ${seconds} seconds. Your score is ${score + 1}.`);
        }, 500);
      }
    } else {
      setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flip'));
        flippedCards = [];
        isBoardLocked = false;
      }, 1000);
    }
  }
};

const resetGame = () => {
  flippedCards = [];
  matchedCards = [];
  isBoardLocked = false;
  isTamerStarted = false;
  moves = 0;
  score = 0;
  seconds = 0;
  clearInterval(timer);

  document.getElementById('moves').textContent = moves;
  document.getElementById('timer').textContent = seconds;
  document.getElementById('score').textContent = score;

  shuffleCards(cards);
  renderCards();
};

const startTimer = () => {
  timer = setInterval(() => {
    seconds++;
    document.getElementById('timer').textContent = seconds;
  }, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  const resetBtn = document.querySelector('.reset-btn');
  resetBtn.addEventListener('click', resetGame);
  shuffleCards(cards);
  renderCards();
});
