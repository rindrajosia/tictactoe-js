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

const checkGameStatus = () => {
     const topLeft = cellDivs[0].classList[2];
     const topMiddle = cellDivs[1].classList[2];
     const topRight = cellDivs[2].classList[2];
     const middleLeft = cellDivs[3].classList[2];
     const middleMiddle = cellDivs[4].classList[2];
     const middleRight = cellDivs[5].classList[2];
     const bottomLeft = cellDivs[6].classList[2];
     const bottomMiddle = cellDivs[7].classList[2];
     const bottomRight = cellDivs[8].classList[2];
}
