let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let isGameOver = false;

const letterButtons = document.getElementById("letter-buttons");
const wordDisplay = document.getElementById("word-display");
const maxWrongGuesses = 6;
const gameMessage = document.getElementById("game-message");
const hangmanImage = document.getElementById("hangman-image");
const restartButton = document.getElementById("play-again");
const hintDisplay = document.getElementById("hint");

fetch("json/words.json")
    .then(response => response.json())
    .then(data => {

        const randomIndex =
            Math.floor(Math.random() * data.length);

        selectedWord = data[randomIndex].word;
        
        hintDisplay.textContent = "Hint: " + data[randomIndex].hint;        

        wordDisplay.textContent = displayWord();

        createLetterButtons();

        console.log(selectedWord);


    });

function createLetterButtons() {

    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < alphabet.length; i++) {

        const button = document.createElement("button");

        button.textContent = alphabet[i];
        button.value = alphabet[i];

        button.addEventListener("click", function() {

            if (!isGameOver) {

                processGuess(button.value);
                button.disabled = true;

            }

        });

        letterButtons.appendChild(button);

    }

}

function checkWin() {

    for (let i = 0; i < selectedWord.length; i++) {

        if (!guessedLetters.includes(selectedWord[i])) {

            return false;

        }

    }

    return true;

}

function processGuess(letter) {

    if (!guessedLetters.includes(letter)) {

        if (selectedWord.includes(letter)) {

            guessedLetters.push(letter);

        }
        else {

            wrongGuesses++;
            hangmanImage.src = "images/hangman-" + wrongGuesses + ".png";

            hangmanImage.classList.remove("shake");
            void hangmanImage.offsetWidth;
            hangmanImage.classList.add("shake");            

        }

    }

    wordDisplay.textContent = displayWord();

    if (checkWin()) {

        showGameMessage("Good job! You didn't die.");
        isGameOver = true;

        disableLetterButtons();

        restartButton.style.display = "block";       

    }

    if (wrongGuesses >= maxWrongGuesses) {

        showGameMessage("You suck! The word was " + selectedWord + ".");
        isGameOver = true;

        disableLetterButtons();

        restartButton.style.display = "block";

    }
}

function disableLetterButtons() {

    const buttons = letterButtons.querySelectorAll("button");

    buttons.forEach(function(button) {

        button.disabled = true;

    });

}


function displayWord() {

    let displayedWord = "";

    for (let i = 0; i < selectedWord.length; i++) {


        if(guessedLetters.includes(selectedWord[i])){
            
            displayedWord += selectedWord[i]+" ";
        }
        else {

            displayedWord += "_ ";            
        }
   

    }

    return displayedWord;

}

function showGameMessage(message) {

    gameMessage.textContent = message;

}

restartButton.addEventListener("click", function() {

    location.reload();

});
