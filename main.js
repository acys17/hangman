import easyWords from "./data/easyWords.js"

const guesswordHTML = document.getElementById("guessword");
const button = document.getElementById("new-word-button");
const letterLines = document.getElementById("letterLines");
const inputLetter = document.querySelector("#inputLetter");
const inputButton = document.querySelector("#inputButton");
const incorrectLettersHTML = document.getElementById("guessedLetters")

let splitWord;

const showWord = () => {
    guesswordHTML.innerHTML = ""
    for (let i = 0; i < splitWord.length; i++) {
        guesswordHTML.innerHTML += `<span>${splitWord[i]}</span>`;
    }
}

const selectWord = () => {
    let randomNumber = Math.floor((Math.random() * 10) + 1)
    const findWord = (easyWords.filter(word => word.id === randomNumber))[0]; 
    splitWord = findWord.word.split("");
    showWord();
};

const showLetterLines = () => {
    let numberOfLetters = splitWord.length;
    letterLines.innerText = ("_ ".repeat(numberOfLetters));
}

button.addEventListener("click", () => {
    selectWord()
    showLetterLines()
    });

inputButton.addEventListener("click", () => {
    let guessword = (guesswordHTML.innerText);
    const guessedLetter = inputLetter.value.toLowerCase();
    const isLetterMatch = (guessword.toLowerCase().split("")).find(letter => letter === guessedLetter);
    if(isLetterMatch) {
        const spanArray = Array.from(guesswordHTML.children);
        const x = spanArray.map(span => span.innerText.toLowerCase());
        const letterPosition = x.indexOf(isLetterMatch);
        const letterHtml = spanArray[letterPosition];
        letterHtml.style.color = "black";
    } else {
        incorrectLettersHTML.innerText += guessedLetter + "";
    }
    inputLetter.value = "";
})

