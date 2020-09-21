const gameBoard = (() => {
  const gameboard = Array(9).fill(' - ');

  const getBoard = () => gameboard;

  const resetBoard = () => gameboard.fill(' - ');

  const getValue = (position) => gameboard[position];

  const getXValue = () => {
    const xarray = gameboard.filter(item => item === 'X');
    return xarray.reduce((sum) => sum + 1, 0);
  };

  const getOValue = () => {
    const oarray = gameboard.filter(item => item === 'O');
    return oarray.reduce((sum) => sum + 1, 0);
  };

  const logicTurn = () => getXValue() >= getOValue();
  const setBoard = (position) => {
    logicTurn() ? gameboard[position] = 'O' : gameboard[position] = 'X';
  };

  return {
    getBoard,
    getValue,
    logicTurn,
    resetBoard,
    setBoard,
  };
})();

const checkBoard = (() => {
  const arrBoard = gameBoard.getBoard();
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const notFull = () => arrBoard.some((currentValue) => currentValue === ' - ');

  const checkWin = () => {
    for (let i = 0; i < line.length; i += 1) {
      const [a, b, c] = line[i];
      if (arrBoard[a] === arrBoard[b] && arrBoard[b] === arrBoard[c] && arrBoard[a] !== ' - ') {
        return arrBoard[a];
      }
    }
    return false;
  };

  const getWinnerName = (arg1, arg2) => (checkWin() === 'O' ? arg1.getName() : arg2.getName());

  const drawGame = () => {
    if (!notFull() && !checkWin()) {
      return true;
    }
    return false;
  };

  return {
    notFull,
    checkWin,
    getWinnerName,
    drawGame,
  };
})();

const render = (arg1, arg2) => {
  let k = 0;
  if (document.contains(document.getElementById('myTable'))) {
    document.getElementById('myTable').remove();
  }
  const grid = document.querySelector('.grid');
  const board = document.querySelector('.board');
  const table = document.createElement('table');
  table.setAttribute('id', 'myTable');
  const tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'idTbody');
  for (let i = 0; i < 3; i += 1) {
    const row = document.createElement('tr');
    row.classList.add('row');
    for (let j = 0; j < 3; j += 1) {
      // eslint-disable-next-line no-use-before-define
      row.appendChild(renderCell.getCell(k, arg1, arg2));
      k += 1;
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  grid.appendChild(table);
  board.style.display = 'block';
  const turnDiv = document.querySelector('.title');
  if (checkBoard.drawGame()) {
    alert('The board is full, its a draw'); // eslint-disable-line no-alert
    turnDiv.innerHTML = 'The board is full, its a draw';
  } else if (checkBoard.checkWin()) {
    alert(`The winner is: ${checkBoard.getWinnerName(arg1, arg2)}`); // eslint-disable-line no-alert
    turnDiv.innerHTML = `The winner is: ${checkBoard.getWinnerName(arg1, arg2)}`;
  } else {
    turnDiv.innerHTML = `It is your turn: ${arg1.turnName(arg2)}`;
  }
};

const renderCell = (() => {
  const arrBoard = gameBoard.getBoard();

  const eventAddElement = (position, arg1, arg2) => {
    gameBoard.getValue(position) !== ' - ' ? alert('Choose another cell') : gameBoard.setBoard(position); // eslint-disable-line no-alert
    render(arg1, arg2);
  };

  const getCell = (position, arg1, arg2) => {
    const cell = document.createElement('td');
    if (!checkBoard.drawGame() && !checkBoard.checkWin()) {
      cell.addEventListener('click', eventAddElement.bind(cell, position, arg1, arg2), { once: true });
    }
    const cellText = document.createTextNode(arrBoard[position]);
    cell.appendChild(cellText);
    cell.classList.add('cell');
    return cell;
  };
  return {
    getCell,
  };
})();

const renderReset = (() => {
  const eventResetBoard = (arg1, arg2) => {
    gameBoard.resetBoard();
    render(arg1, arg2);
  };

  const getResetButton = (arg1, arg2) => {
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      eventResetBoard(arg1, arg2);
    });
    button.classList.add('sign-in', 'font', 'top');
    if (document.contains(document.getElementById('reset'))) {
      document.getElementById('reset').remove();
    }
    button.setAttribute('id', 'reset');
    button.textContent = 'Reset';
    return button;
  };
  return {
    getResetButton,
    eventResetBoard,
  };
})();

const renderNewPlayer = (() => {
  const eventNewPlayer = () => {
    gameBoard.resetBoard();
    document.querySelector('.board').style.display = 'none';
    document.getElementById('divForm').style.display = 'block';
  };

  const getNewPlayerButton = () => {
    const button = document.createElement('button');
    button.addEventListener('click', () => {
      eventNewPlayer();
    });
    button.classList.add('sign-in', 'font', 'top');
    if (document.contains(document.getElementById('newplayer'))) {
      document.getElementById('newplayer').remove();
    }
    button.setAttribute('id', 'newplayer');
    button.textContent = 'New Player';
    return button;
  };
  return {
    eventNewPlayer,
    getNewPlayerButton,
  };
})();

const Player = (name) => {
  const getName = () => name;

  const turnName = opponent => (gameBoard.logicTurn() ? getName() : opponent.getName());
  return {
    getName,
    turnName,
  };
};

const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
  const playerone = Player(document.getElementById('playerone').value);
  const playertwo = Player(document.getElementById('playertwo').value);
  document.getElementById('divForm').style.display = 'none';
  document.querySelector('.board').style.display = 'block';
  render(playerone, playertwo);
  const resetbtn = document.querySelector('.box-reset');
  resetbtn.appendChild(renderReset.getResetButton(playerone, playertwo));
  const newplayer = document.querySelector('.box-newplayer');
  newplayer.appendChild(renderNewPlayer.getNewPlayerButton());
  form.reset();
  e.preventDefault();
});
