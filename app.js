const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const form = document.getElementById('myForm');

const xSymbol = '✕';
const oSymbol = '○';

let gameIsLive = true;
let xIsNext = true;
let winner = null;

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter, arg1, arg2) => {
  gameIsLive = false;
  winner = letter;
  if (winner === 'x') {
    statusDiv.innerHTML = `${arg1.getName()} has WON!`;
  } else {
    statusDiv.innerHTML = `<span>${arg2.getName()} has WON!</span>`;
  }
};

const checkGameStatus = (arg1, arg2) => {
  const topLeft = cellDivs[0].classList[2];
  const topMiddle = cellDivs[1].classList[2];
  const topRight = cellDivs[2].classList[2];
  const middleLeft = cellDivs[3].classList[2];
  const middleMiddle = cellDivs[4].classList[2];
  const middleRight = cellDivs[5].classList[2];
  const bottomLeft = cellDivs[6].classList[2];
  const bottomMiddle = cellDivs[7].classList[2];
  const bottomRight = cellDivs[8].classList[2];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft, arg1, arg2);
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    handleWin(middleLeft, arg1, arg2);
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    handleWin(bottomLeft, arg1, arg2);
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    handleWin(topLeft, arg1, arg2);
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    handleWin(topMiddle, arg1, arg2);
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    handleWin(topRight, arg1, arg2);
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft, arg1, arg2);
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    handleWin(topRight, arg1, arg2);
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is tied!';
  } else {
    xIsNext = !xIsNext;
    if (xIsNext) {
      statusDiv.innerHTML = `${arg1.getName()} is next`;
    } else {
      statusDiv.innerHTML = `<span>${arg2.getName()} is next</span>`;
    }
  }
};

const Player = (name) => {
  const getName = () => name;
  return { getName };
};

const handleReset = () => {
  resetModule.resetLoop();
};

const resetModule = (() => {
  xIsNext = true;
  winner = null;
  const resetLoop = () => {
    for (const cellDiv of cellDivs) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
    }
  };
  return {
    resetLoop,
  };
})();

const handleCellClick = (e, arg1, arg2) => {
  const classList = e.target.classList;
  const location = classList[1];

  if (classList[2] === 'x' || classList[2] === 'o' || /WON/.test(statusDiv.textContent)) {
    return;
  }

  if (xIsNext) {
    classList.add('x');
    checkGameStatus(arg1, arg2);
  } else {
    classList.add('o');
    checkGameStatus(arg1, arg2);
  }
};

form.addEventListener('submit', (e) => {
  const playerone = Player(document.getElementById('playerone').value);
  const playertwo = Player(document.getElementById('playertwo').value);

  document.getElementById('divForm').style.display = 'none';
  document.getElementById('divBoard').style.display = 'block';

  resetDiv.addEventListener('click', handleReset);
  statusDiv.innerHTML = `${playerone.getName()} is next`;

  for (let cellDiv of cellDivs)  {
    cellDiv.addEventListener('click', (event) => handleCellClick(event, playerone, playertwo));
  }
  e.preventDefault();
});

const newGameForm = document.getElementById('new-game');

newGameForm.onclick = () => {
  form.reset();
  resetModule.resetLoop();
  document.getElementById('divForm').style.display = 'block';
};
