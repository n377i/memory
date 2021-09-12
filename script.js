'use strict';

// VARIABLEN

const dogsDeck = [{
        name: 'dog01',
        img: 'img/dog01.jpg',
    },
    {
        name: 'dog02',
        img: 'img/dog02.jpg',
    },
    {
        name: 'dog03',
        img: 'img/dog03.jpg',
    },
    {
        name: 'dog04',
        img: 'img/dog04.jpg',
    },
    {
        name: 'dog05',
        img: 'img/dog05.jpg',
    },
    {
        name: 'dog06',
        img: 'img/dog06.jpg',
    },
    {
        name: 'dog07',
        img: 'img/dog07.jpg',
    },
    {
        name: 'dog08',
        img: 'img/dog08.jpg',
    },
    {
        name: 'dog09',
        img: 'img/dog09.jpg',
    },
    {
        name: 'dog10',
        img: 'img/dog10.jpg',
    },
    {
        name: 'dog11',
        img: 'img/dog11.jpg',
    },
    {
        name: 'dog12',
        img: 'img/dog12.jpg',
    },
];

const catsDeck = [{
        name: 'cat01',
        img: 'img/cat01.jpg',
    },
    {
        name: 'cat02',
        img: 'img/cat02.jpg',
    },
    {
        name: 'cat03',
        img: 'img/cat03.jpg',
    },
    {
        name: 'cat04',
        img: 'img/cat04.jpg',
    },
    {
        name: 'cat05',
        img: 'img/cat05.jpg',
    },
    {
        name: 'cat06',
        img: 'img/cat06.jpg',
    },
    {
        name: 'cat07',
        img: 'img/cat07.jpg',
    },
    {
        name: 'cat08',
        img: 'img/cat08.jpg',
    },
    {
        name: 'cat09',
        img: 'img/cat09.jpg',
    },
    {
        name: 'cat10',
        img: 'img/cat10.jpg',
    },
    {
        name: 'cat11',
        img: 'img/cat11.jpg',
    },
    {
        name: 'cat12',
        img: 'img/cat12.jpg',
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


// FUNKTIONEN

const init = () => {
    // Bei Klick auf ein Thema im Auswahl Pop-up wird deck das entsprechende Array aus decks zugewiesen.
    const dogs = document.querySelector("#dogs");
    dogs.addEventListener('click', function () {
        deck = decks[0];
        // deckselection wird die Klasse hidepopup hinzugefügt -> Das Pop-up verschwindet, startGame wird ausgeführt.
        document.getElementById('deckselection').classList.add('hidepopup');
        startGame();
    });
    const cats = document.querySelector("#cats");
    cats.addEventListener('click', function () {
        deck = decks[1];
        document.getElementById('deckselection').classList.add('hidepopup');
        startGame();
    });
}

const startGame = () => {
    // Beim (erneuten) Start des Spiels, wird die Klasse card entfernt -> alle vorherigen Karten werden gelöscht.
    document.querySelectorAll('.card').forEach((el) => {
        el.remove();
    })
    // Alles wird auf 0 zurückgesetzt, congrats wird die Klasse hidepopup hinzugefügt -> Das Glückwunsch Pop-up verschwindet.
    document.getElementById('counter').textContent = `Versuche: 0`;
    document.getElementById('timer').textContent = `Zeit: 00:00`;
    document.getElementById('congrats').classList.add('hidepopup');
    numberOfSeconds = 0;
    numberOfTries = 0;
    numberOfMatches = 0;
    score = 0;
    timer = 0;

    // Highscore wird geladen und im div mit der id higscore ausgegeben. Wenn (noch) kein Highscore gespeichert wurde, wird 0 ausgegeben.
    const scoreStr = localStorage.getItem('highScore');
    if (scoreStr == null) {
        highScore = 0;
    } else {
        highScore = scoreStr;
    }
    document.getElementById('highscore').textContent = `Highscore: ${highScore}`;

    // Neues Array aus Verknüpfung von deck Array und deck Array (concat = concatenate = verknüpfen) -> Motive werden verdoppelt.
    const deckDoubled = deck.concat(deck);

    // Zufällige Sortierung des Arrays -> Karten werden gemischt.
    deckDoubled.sort(() => Math.random() - 0.5);

    // Ausführung der Funktion initCard für jedes Element im deckDoubled Array.
    deckDoubled.forEach((item) => {
        initCard(item);
    });
}

const initCard = (item) => {
    const game = document.querySelector('#game');

    // Erstellung eines divs mit der Klasse card.
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    // Erstellung eines divs mit der Klasse hidden für verdeckte Karten.
    const hidden = document.createElement('div');
    hidden.classList.add('hidden');
    //hidden.textContent = item.name; // Für Testzwecke

    // Erstellung eines divs mit der Klasse open für aufgedeckte Karten.
    const open = document.createElement('div');
    open.classList.add('open');
    open.style.backgroundImage = `url(${item.img})`;

    // Anhängen von card an game und hidden und open an card.
    game.appendChild(card);
    card.appendChild(hidden);
    card.appendChild(open);

    // Bei Klick auf eine Karte wird onClickCard ausgeführt.
    card.addEventListener('click', onClickCard);
}

// Sobald die erste Karte angeklickt wird, wird startTimer ausgeführt.
const onClickCard = (evt) => {
    if (!timer) {
        startTimer();
    }
    // Wenn die Karte bereits die Klasse selected enthält, kann sie nicht nochmal angeklickt werden. -> Verhindert Match mit derselben Karte.
    const card = evt.currentTarget;
    if (card.classList.contains('selected')) {
        return
    }
    // Bei der Auswahl von höchstes 2 Karten, wird card die Klasse selected hinzugefügt. -> Die Karte wird umgedreht.
    if (selectedCards.length < 2) {
        card.classList.add('selected');
        // Um zu erkennen welche Karten ausgewählt wurden, wird der Name angefügt.
        selectedCards.push(card.dataset.name);
    }
    // Wenn zwei Karten angeklickt wurden, wird je ein Versuch mehr im div mit der id counter ausgegeben und checkforMatch wird ausgeführt.
    if (selectedCards.length === 2) {
        numberOfTries++;
        document.getElementById('counter').textContent = `Versuche: ${numberOfTries}`;
        checkForMatch();
    }
}

const startTimer = () => {
    timer = setInterval(() => {
        // Die Sekunden werden im Interval von einer Sekunde hochgezählt.
        numberOfSeconds++;
        // Die Sekunden werden in Minuten und Sekunden umgerechnet.
        const minutes = Math.floor(numberOfSeconds / 60);
        const seconds = numberOfSeconds % 60;
        // Minuten und Sekunden sollen 2 Zeichen enthalten, Zahlen < 10 werden mit 0 aufgefüllt. -> = 01:01 statt 1:1
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Mit padStart lässt sich ein String von links mit Zeichen auffüllen. 
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Timer wird im div mit der id timer ausgegeben.
        document.getElementById('timer').textContent = `Zeit: ${formattedMinutes}:${formattedSeconds}`;
        // Gestoppte Zeit wird im Glückwunsch Pop-up ausgegeben.
        timeAlert = `${minutes} Min. und ${seconds} Sek.`;
    }, 1000);
}

// Ausgewählte Karten werden zurückgesetzt -> Es können wieder zwei Karten ausgewählt werden.
const resetSelectedCards = () => {
    selectedCards = [];
}

const checkForMatch = () => {
    // Wenn die ausgewählten Karten übereinstimmen, wird nach 0,3 sec die Klasse matched hinzugefügt und resetSelectedCards ausgeführt.
    if (selectedCards[0] === selectedCards[1]) {
        const name = selectedCards[0];
        setTimeout(() => {
            const matchedCardsSelector = `.card[data-name="${name}"]`;
            document.querySelectorAll(matchedCardsSelector).forEach((card) => {
                card.classList.add('matched');
                resetSelectedCards();
            })
        }, 300)
        // Die Matches werden jeweils um 1 hochgezählt.
        numberOfMatches += 1;
        // Wenn alle Matches gefunden wurden, wird stopGame ausgeführt.
        if (numberOfMatches === 12) {
            stopGame();
        }
        // Wenn die Karten nicht übereinstimmen, wird nach 0,8 sec die Klasse selected entfernt und resetSelectedCards ausgeführt. 
    } else {
        setTimeout(() => {
            document.querySelectorAll('.card').forEach((card) => {
                card.classList.remove('selected');
                resetSelectedCards();
            })
        }, 800)
    }
}

const stopGame = () => {
    // Die Zeit wird angehalten.
    clearInterval(timer);

    // Berechnung der Punktzahl (Höchste erreichbare Punktzahl: 1000)
    score = Math.floor(120 / numberOfTries * 100);
    // Ist die aktuelle Punktzahl höher als der aktuelle Highscore, wird sie als neuer Highscore im Local Storage gespeichert.
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', score);
    }

    // Glückwunsch Pop-up erscheint nach 0,9 sec.
    setTimeout(() => {
        document.getElementById('congrats').classList.remove('hidepopup');
        document.getElementById('result').textContent = `Du hast alle Paare in ${timeAlert} gefunden und ${numberOfTries} Versuche gebraucht. Dafür gibt es ${score} Punkte!`;
    }, 900)

    // Bei Klick auf "Nochmal spielen" wird die Klasse hidepopup congrats hinzugefügt und bei deckselection entfernt.
    // -> Das Glückwunsch Pop-up verschwindet, das Kartendeck Auswahl Pop-up erscheint, init wird ausgeführt.
    const newGame = document.querySelector("#newgame");
    newGame.addEventListener('click', function () {
        document.getElementById('congrats').classList.add('hidepopup');
        document.getElementById('deckselection').classList.remove('hidepopup');
        init();
    });
}

init();