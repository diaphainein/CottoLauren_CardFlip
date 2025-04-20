import './styles.scss';

// define enum with card characteristics
enum CardFace {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King
}

// array of 6 of the card type
const cards: Card[] = [
  {
    id: 1,
    face: CardFace.Ace,
    isFlipped: false,
    isMatched: false
  },
  {
    id: 2,
    face: CardFace.Ace,
    isFlipped: false,
    isMatched: false
  },
  {
    id: 3,
    face: CardFace.Eight,
    isFlipped: false,
    isMatched: false
  },
  {
    id: 4,
    face: CardFace.Eight,
    isFlipped: false,
    isMatched: false
  },
  {
    id: 5,
    face: CardFace.Three,
    isFlipped: false,
    isMatched: false
  },
  {
    id: 6,
    face: CardFace.Three,
    isFlipped: false,
    isMatched: false
  },
]

// number of attempts
const attempts: number = 3;
// track attempts
let remainingAttempts = attempts;
// handle flipping 


// display array of faces
const cardFaces: string[] = ["A♠", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// type - card face, isFlipped
type Card = {
  id: number;
  face: CardFace;
  isFlipped: boolean;
  isMatched: boolean;
};

// track flipped cards
let flippedCards: Card[] = [];


// card flip logic


// check for match


// function to toggle is-flipped class on cards
const flipCardToggle = (card: HTMLElement): void => {
  card.classList.toggle('is-flipped');
}

// DOM elements to manipulate and do stuff with 



// function for starting new game
// take in card faces (3 faces)
const newGame = (card1: Card, card2: Card, card3: Card): void => {

}
// randomize & create 6 cards
// empty existing cards array and put new values in
// generate three random pairs
// get random number, store random number in array

// randomize cards

// function decrement # of attempts and returns bool to say if game finished or not

// function to check if 2nd card flipped is a match to first one, only want to check for matches on 2nd click
// flip cards back if not a match, if a match, leave unflipped

// track how many successful matches have occurred