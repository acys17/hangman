import easyWords from "./data/easyWords.js";
import mediumWords from "./data/mediumWords.js";
import hardWords from "./data/hardWords.js";
import levelDescriptions from "./data/level.js";

const guesswordHTML = document.getElementById("guessword");
const newWordButton = document.getElementById("new-word-button");
const inputLetter = document.querySelector("#inputLetter");
const inputButton = document.querySelector("#inputButton");
const incorrectLettersHTML = document.getElementById("guessedLetters");
const hangman = document.getElementById("hangman");
const scoreDisplay = document.getElementById("score-display");
const levelDisplay = document.getElementById("level");
const loserCard = document.getElementById("loser-card")
const winnerCard = document.getElementById("winner-card");
const newGame = document.getElementById("new-game-button");

let livesLost = 0;
let score = 0;
let level = "Noob";

let findWord;
let incorrectLetters = [];
let correctLetters = [];
let guessedLetter;
let splitWord;
let lettersLeft;
let spanArray;
let letterArray;
let levelText;
let continueButton;

const showWord = () => {
    guesswordHTML.innerHTML = ""
    for (let i = 0; i < splitWord.length; i++) {
        guesswordHTML.innerHTML += `<span>${splitWord[i]}</span>`;
    }
}

const selectWord = () => {
    let randomNumber = Math.floor((Math.random() * 50) + 1)
    if(score <10) {
        findWord = (easyWords.filter(word => word.id === randomNumber))[0]; 
    } else if(score < 20) {
        findWord = (mediumWords.filter(word => word.id === randomNumber))[0]; 
    } else {
        findWord = (hardWords.filter(word => word.id === randomNumber))[0]; 
    }
    splitWord = findWord.word.split("");
    lettersLeft = findWord.word.length;
    showWord();
};

const showHangman = () => {
    hangman.src = `./assets/images/${livesLost}.png`;
}

const checkLetter = () => {
    if(letterArray.includes(guessedLetter)) {
        spanArray.forEach(span => {
            const letter = (span.innerText).toLowerCase();
            if(letter === guessedLetter) {
                span.style.color = "black";
                correctLetters.push(guessedLetter);
                lettersLeft--;
            } 
        })
    } else if(!guessedLetter) {
        alert("Please enter a letter");
    } else {
        livesLost++;
        incorrectLettersHTML.innerText += guessedLetter + "";
        incorrectLetters.push(guessedLetter);
    }
    inputLetter.value = "";
    showHangman();
    isAlive();
}

const showScore = () => {
    scoreDisplay.innerText = `Score: ${score}`
}

const showLevel = () => {
    if(score > 4 && score < 10) {
        level = "Rookie";
    } else if(score > 9 && score < 15) {
        level = "Notable";
    } else if(score > 14  && score < 20) {
        level = "Skilled";
    } else if(score > 19 && score < 25) {
        level = "Expert";
    } else if(score > 24 && score < 30) {
        level = "Genius";
    } else if(score > 29 && score < 35) {
        level = "Hero";
    } else if(score > 34 && score < 40) {
        level = "Grand Master";
    } else if(score > 39) {
        level = "Legend";
    }
    levelDisplay.innerText = `Level: ${level}`
}

const showLevelText = () => {
    const levelObject = levelDescriptions.find(description => description.level === level);
    levelText = levelObject.text;
}

const continueGame = () => {
    continueButton.addEventListener("click", () => {
        resetGame();
        winnerCard.style.visibility = "hidden";
        });
    }

const win = () => {
    score++;
    winnerCard.style.visibility = "visible";
    winnerCard.innerHTML = `
    <h2>Congratulations!</h2>
    <p>You guessed the word ${findWord.word} correctly!</p>
    <button id="continue-button" class="button">Play next word!</button>
    `
    continueButton = document.getElementById("continue-button");
    continueGame();
}

const lose = () => {
    loserCard.style.visibility = "visible";
    showLevelText();
    loserCard.innerHTML = `
    <h2>You Lose :( Better luck next time!</h2>
    <p>The word was <strong>${findWord.word}</strong></p>
    <h3>Score: ${score}</h3>
    <h3>Level: ${level}</h3>
    <p>${levelText}</p>
    <p>Click the button in the <strong>top right</strong> of the page to start a new game!</p>
    `
}

const isAlive = () => {
    if(livesLost === 12)
    lose();
}

const handleInput = (e) => {
    spanArray = Array.from(guesswordHTML.children);
    letterArray = spanArray.map(span => span.innerText.toLowerCase());
    guessedLetter = inputLetter.value.toLowerCase();
        if(incorrectLetters.includes(guessedLetter) || correctLetters.includes(guessedLetter) ) {
            alert("This letter has already been guessed");
        } else {
            checkLetter();
        }
    if(lettersLeft === 0) {
        win();
    }
    showScore();
    showLevel();
}

const resetGame = () => {
    lettersLeft = 12
    correctLetters = [];
    incorrectLetters = [];
    livesLost = 0;
    incorrectLettersHTML.innerText = "";
    selectWord()
    showHangman();
}

newWordButton.addEventListener("click", () => {
    resetGame();
    });

inputButton.addEventListener("click", (e) => {
    handleInput(e);
})

inputLetter.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        handleInput(e);
    }
})

selectWord();

newGame.addEventListener("click", () => {
    resetGame();
    loserCard.style.visibility = "hidden";
    score = 0;
})