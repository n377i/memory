"use strict";

// Variables

const dogsDeck = [
  {
    name: "dog01",
    img: "img/dog01.jpg",
  },
  {
    name: "dog02",
    img: "img/dog02.jpg",
  },
  {
    name: "dog03",
    img: "img/dog03.jpg",
  },
  {
    name: "dog04",
    img: "img/dog04.jpg",
  },
  {
    name: "dog05",
    img: "img/dog05.jpg",
  },
  {
    name: "dog06",
    img: "img/dog06.jpg",
  },
  {
    name: "dog07",
    img: "img/dog07.jpg",
  },
  {
    name: "dog08",
    img: "img/dog08.jpg",
  },
  {
    name: "dog09",
    img: "img/dog09.jpg",
  },
  {
    name: "dog10",
    img: "img/dog10.jpg",
  },
  {
    name: "dog11",
    img: "img/dog11.jpg",
  },
  {
    name: "dog12",
    img: "img/dog12.jpg",
  },
];

const catsDeck = [
  {
    name: "cat01",
    img: "img/cat01.jpg",
  },
  {
    name: "cat02",
    img: "img/cat02.jpg",
  },
  {
    name: "cat03",
    img: "img/cat03.jpg",
  },
  {
    name: "cat04",
    img: "img/cat04.jpg",
  },
  {
    name: "cat05",
    img: "img/cat05.jpg",
  },
  {
    name: "cat06",
    img: "img/cat06.jpg",
  },
  {
    name: "cat07",
    img: "img/cat07.jpg",
  },
  {
    name: "cat08",
    img: "img/cat08.jpg",
  },
  {
    name: "cat09",
    img: "img/cat09.jpg",
  },
  {
    name: "cat10",
    img: "img/cat10.jpg",
  },
  {
    name: "cat11",
    img: "img/cat11.jpg",
  },
  {
    name: "cat12",
    img: "img/cat12.jpg",
  },
];

const decks = [dogsDeck, catsDeck];

let deck = [];
let selectedCards = [];
let numberOfMatches = 0;
let numberOfSeconds = 0;
let numberOfTries = 0;
let score = 0;
let highScore = 0;
let timer;
let timeAlert;

// Functions

const init = () => {
  // Assign the selected deck of cards to 'deck'
  const dogs = document.querySelector("#dogs");
  dogs.addEventListener("click", function () {
    deck = decks[0];
    // Hide selection pop-up and start game
    document.getElementById("deckselection").classList.add("hidepopup");
    startGame();
  });
  const cats = document.querySelector("#cats");
  cats.addEventListener("click", function () {
    deck = decks[1];
    document.getElementById("deckselection").classList.add("hidepopup");
    startGame();
  });
};

const startGame = () => {
  // Reset when (re)starting the game.
  document.querySelectorAll(".card").forEach((el) => {
    el.remove();
  });
  document.getElementById("counter").textContent = `Versuche: 0`;
  document.getElementById("timer").textContent = `Zeit: 00:00`;
  document.getElementById("congrats").classList.add("hidepopup");
  numberOfSeconds = 0;
  numberOfTries = 0;
  numberOfMatches = 0;
  score = 0;
  timer = 0;

  // Load and display high score
  const scoreStr = localStorage.getItem("highScore");
  if (scoreStr == null) {
    highScore = 0;
  } else {
    highScore = scoreStr;
  }
  document.getElementById("highscore").textContent = `Highscore: ${highScore}`;

  // Create new array with duplicate motifs
  const deckDoubled = deck.concat(deck);

  // Shuffle cards (random sorting)
  deckDoubled.sort(() => Math.random() - 0.5);

  // Execute the 'initCard' function for each element in the deckDoubled array.
  deckDoubled.forEach((item) => {
    initCard(item);
  });
};

const initCard = (item) => {
  const game = document.querySelector("#game");

  // Create div with 'card' class and data-name attribute
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = item.name;

  // Create div with 'hidden' class for hidden cards
  const hidden = document.createElement("div");
  hidden.classList.add("hidden");
  //hidden.textContent = item.name; // For testing

  // Create div with 'open' class and inline style for motif
  const open = document.createElement("div");
  open.classList.add("open");
  open.style.backgroundImage = `url(${item.img})`;

  // Attach the created divs
  game.appendChild(card);
  card.appendChild(hidden);
  card.appendChild(open);

  // Execute 'onClickCard' when clicking on a card
  card.addEventListener("click", onClickCard);
};

// Start timer when clicking on a card
const onClickCard = (evt) => {
  if (!timer) {
    startTimer();
  }
  // Return if card already contains class 'selected' to prevent matching with the same card
  const card = evt.currentTarget;
  if (card.classList.contains("selected")) {
    return;
  }
  // Add the class 'selected' when a maximum of 2 cards are selected (card is turned over)
  if (selectedCards.length < 2) {
    card.classList.add("selected");
    // Add name to recognize which cards were selected
    selectedCards.push(card.dataset.name);
  }
  // If two cards have been clicked, increase number of attempts by 1 and execute 'checkOfMatch'.
  if (selectedCards.length === 2) {
    numberOfTries++;
    document.getElementById(
      "counter"
    ).textContent = `Versuche: ${numberOfTries}`;
    checkForMatch();
  }
};

const startTimer = () => {
  timer = setInterval(() => {
    // Count up number of seconds at intervals of 1 second
    numberOfSeconds++;
    // Convert the number of seconds into minutes
    const minutes = Math.floor(numberOfSeconds / 60);
    const seconds = numberOfSeconds % 60;
    // Reformat minutes and seconds so that they contain two characters and numbers under 10 are padded with 0 (01:01 instead of 1:1)
    const formattedMinutes = minutes.toString().padStart(2, "0"); // 'padStart' can be used to fill a string with characters from the left
    const formattedSeconds = seconds.toString().padStart(2, "0");

    // Output timer in timer div
    document.getElementById(
      "timer"
    ).textContent = `Zeit: ${formattedMinutes}:${formattedSeconds}`;
    // Output stopped time in congratulations pop-up
    timeAlert = `${minutes} min. and ${seconds} sec.`;
  }, 1000);
};

// Empty 'selectedCards' array so that a new pair of cards can be selected
const resetSelectedCards = () => {
  selectedCards = [];
};

const checkForMatch = () => {
  // If selected cards match, add class 'matched' after 0.3 seconds and execute 'resetSelectedCards'
  if (selectedCards[0] === selectedCards[1]) {
    const name = selectedCards[0];
    setTimeout(() => {
      const matchedCardsSelector = `.card[data-name="${name}"]`;
      document.querySelectorAll(matchedCardsSelector).forEach((card) => {
        card.classList.add("matched");
        resetSelectedCards();
      });
    }, 300);
    // Increase number of matches by 1
    numberOfMatches++;
    // Execute 'stopGame' when all matching pairs where found
    if (numberOfMatches === 12) {
      stopGame();
    }
    // If cards do not match, remove 'selected' class after 0.8 seconds and execute 'resetSelectedCards'
  } else {
    setTimeout(() => {
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("selected");
        resetSelectedCards();
      });
    }, 800);
  }
};

const stopGame = () => {
  // Stop timer
  clearInterval(timer);

  // Calculate score (highest achievable score: 1000)
  score = Math.floor((120 / numberOfTries) * 100);
  // If current score is higher than current high score, save it as new high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", score);
  }

  // Show congratulations pop-up after 0.9 seconds
  setTimeout(() => {
    document.getElementById("congrats").classList.remove("hidepopup");
    document.getElementById(
      "result"
    ).textContent = `You found all the pairs in ${timeAlert} and used ${numberOfTries} attempts. For that, you earn ${score} points!`;
  }, 900);

  // When 'play again' is clicked, hide congratulations pop-up and show card deck selection pop-up
  const newGame = document.querySelector("#newgame");
  newGame.addEventListener("click", function () {
    document.getElementById("congrats").classList.add("hidepopup");
    document.getElementById("deckselection").classList.remove("hidepopup");
    init();
  });
};

init();
