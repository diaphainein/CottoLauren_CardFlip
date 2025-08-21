import './style.scss';

// enum for values 2–10
enum CardFace {
  Two = "2",
  Three = "3",
  Four = "4",
  Five = "5",
  Six = "6",
  Seven = "7",
  Eight = "8",
  Nine = "9",
  Ten = "10",
}

// custom Card type
type Card = {
  id: number;
  face: CardFace;
  flipped: boolean;
  matched: boolean;
};

// MAX_ATTEMPTS and attemptsLeft do not need declared types due to type inference
// max attempts are 3
const MAX_ATTEMPTS = 3;
// attempts left
let attemptsLeft = MAX_ATTEMPTS;
// stores all cards currently in the game
let deck: Card[] = [];
// tracks currently flipped cards
let flippedCards: Card[] = [];
// gameOver and isBusy do not need declared types due to type inference
let gameOver = false;
// prevent spam clicks and/or program crash while wrongly matched cards "flip" back over
let isBusy = false;

// deck creation - 3 random pairs
function createDeck(): Card[] {
  let idCounter = 1;
  const faces = Object.values(CardFace);
  const chosenFaces = faces.sort(() => 0.5 - Math.random()).slice(0, 3);

  const cards: Card[] = chosenFaces.flatMap((face) => [
    { id: idCounter++, face, flipped: false, matched: false },
    { id: idCounter++, face, flipped: false, matched: false },
  ]);

  // shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

// game logic
function flipCard(cardId: number) {
  if (gameOver || isBusy) return;

  const card = deck.find((c) => c.id === cardId);
  if (!card || card.flipped || card.matched) return;

  card.flipped = true;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    isBusy = true;
    checkForMatch();
  }

  renderDeck(deck);
}

function checkForMatch() {
  const [first, second] = flippedCards;

  if (first.face === second.face) {
    first.matched = true;
    second.matched = true;
    flippedCards = [];
    isBusy = false; // unlock immediately
    renderStatus();
    checkGameEnd();
  } else {
    attemptsLeft--;
    setTimeout(() => {
      first.flipped = false;
      second.flipped = false;
      flippedCards = [];
      isBusy = false; // unlock after flip-back
      renderDeck(deck);
      renderStatus();
      checkGameEnd();
    }, 1000);
  }
}

function checkGameEnd() {
  const messageEl = document.getElementById("message")!;
  const restartBtn = document.getElementById("restart-btn") as HTMLButtonElement;

  if (deck.every((c) => c.matched)) {
    gameOver = true;
    messageEl.textContent = "You win!";
    restartBtn.style.display = "inline-block";
  } else if (attemptsLeft <= 0) {
    gameOver = true;
    messageEl.textContent = "Game over!";
    deck.forEach((c) => (c.flipped = true));
    renderDeck(deck);
    restartBtn.style.display = "inline-block";
  }
}

// renderng deck
function renderDeck(deck: Card[]) {
  const gameBoard = document.getElementById("game-board")!;
  gameBoard.innerHTML = "";

  deck.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = `card ${card.flipped || card.matched ? "flipped" : ""}`;
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${card.face}</div>
        <div class="card-back"></div>
      </div>
    `;
    cardElement.addEventListener("click", () => flipCard(card.id));
    gameBoard.appendChild(cardElement);
  });
}

// update attempts left
function renderStatus() {
  // non-null assertion: I promise #status exists and will not be null
  const statusEl = document.getElementById("status")!;
  statusEl.textContent = `Attempts left: ${attemptsLeft}`;
}

// game restart
// non-null assertion: I promise #restart-btn exists and will not be null
document.getElementById("restart-btn")!.addEventListener("click", () => {
  deck = createDeck();
  attemptsLeft = MAX_ATTEMPTS;
  gameOver = false;
  flippedCards = [];
  isBusy = false;

  // I promise #message exists and will not be null
  document.getElementById("message")!.textContent = "";
  // using type assertion: I promise this button is an HTMLButtonElement
  (document.getElementById("restart-btn") as HTMLButtonElement).style.display = "none";

  renderDeck(deck);
  renderStatus();
});

// game init
deck = createDeck();
renderDeck(deck);
renderStatus();

