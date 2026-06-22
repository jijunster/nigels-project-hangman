const word = "";
let guessedLetters = [];
let wrongGuesses = 0;

fetch("json/words.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });