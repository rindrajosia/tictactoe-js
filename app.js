const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

const xSymbol = '✕'
const oSymbol = '○'

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (winner === 'x') {
           statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;
         } else {
           statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`;
         }
};
