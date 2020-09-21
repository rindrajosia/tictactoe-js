const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const form = document.getElementById('myForm');

let xIsNext = true;
let winner = null;

const handleWin = (letter, arg1, arg2) => {
  winner = letter;
  if (winner === 'x') {
    statusDiv.innerHTML = `${arg1.getName()} has WON!`;
  } else {
    statusDiv.innerHTML = `<span>${arg2.getName()} has WON!</span>`;
  }
};

const checkGameStatus = (arg1, arg2) => {
  const tplft = cellDivs[0].classList[1];
  const tpmid = cellDivs[1].classList[1];
  const tpri = cellDivs[2].classList[1];
  const midlft = cellDivs[3].classList[1];
  const midmid = cellDivs[4].classList[1];
  const midri = cellDivs[5].classList[1];
  const btmlft = cellDivs[6].classList[1];
  const btmmid = cellDivs[7].classList[1];
  const btmri = cellDivs[8].classList[1];

  if (tplft && tplft === tpmid && tplft === tpri) {
    handleWin(tplft, arg1, arg2);
  } else if (midlft && midlft === midmid && midlft === midri) {
    handleWin(midlft, arg1, arg2);
  } else if (btmlft && btmlft === btmmid && btmlft === btmri) {
    handleWin(btmlft, arg1, arg2);
  } else if (tplft && tplft === midlft && tplft === btmlft) {
    handleWin(tplft, arg1, arg2);
  } else if (tpmid && tpmid === midmid && tpmid === btmmid) {
    handleWin(tpmid, arg1, arg2);
  } else if (tpri && tpri === midri && tpri === btmri) {
    handleWin(tpri, arg1, arg2);
  } else if (tplft && tplft === midmid && tplft === btmri) {
    handleWin(tplft, arg1, arg2);
  } else if (tpri && tpri === midmid && tpri === btmlft) {
    handleWin(tpri, arg1, arg2);
  } else if (tplft && tpmid && tpri && midlft && midmid && midri && btmlft && btmmid && btmri) {
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
  xIsNext = true;
  winner = null;
  cellDivs.forEach(cellDiv => {
    cellDiv.classList.remove('x');
    cellDiv.classList.remove('o');
  });
};

const handleCellClick = (e, arg1, arg2) => {
  const { classList } = e.target;

  if (classList[1] === 'x' || classList[1] === 'o' || /WON/.test(statusDiv.textContent)) {
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

  resetDiv.addEventListener('click', handleReset);
  statusDiv.innerHTML = `${playerone.getName()} is next`;

  cellDivs.forEach(cellDiv => {
    cellDiv.addEventListener('click', (event) => handleCellClick(event, playerone, playertwo));
  });
  e.preventDefault();
});

const newGameForm = document.getElementById('new-game');

newGameForm.onclick = () => {
  location.reload();
  document.getElementById('divForm').style.display = 'block';
};
