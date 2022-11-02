const gameWrapper = document.querySelector('.game-wrapper');
const msgWrapper = document.querySelector('.message-wrapper');
const startAgainButton = document.querySelector('#start-again');
const vsComputerButton = document.querySelector('#vs-computer');
const vsHumanButton = document.querySelector('#vs-human');

gameWrapper.style.pointerEvents = 'none';

let currentMove = 0;
let currentCell;
let currentRow;
let currentColumn;
let isGameOver = false;
let vsComputer;

const gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.setAttribute('id', `row-${i}`);
    row.setAttribute('data-row-number', i);
    row.classList.add('row');
    gameWrapper.append(row);
    row.addEventListener('click', () => {
        currentRow = row.getAttribute('data-row-number');
    }, true)
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('id', `row-${i}-cell-${j}`);
        cell.setAttribute('data-cell-number', j);
        cell.classList.add('cell');
        row.append(cell);
        cell.addEventListener('click', () => {
            if (isGameOver) {
                return;
            }
            currentCell = cell;
            currentColumn = cell.getAttribute('data-cell-number');
            if (gameboard[currentRow][currentColumn]) {
                return;
            }
            if (vsComputer === true) {
                if (currentMove % 2 === 0) {
                    gameboard[currentRow][currentColumn] = 'X';
                    checkResult('X');
                    if (!isGameOver) {
                        computerMove();
                    }
                }
            } else {
                if (currentMove % 2 === 0) {
                    gameboard[currentRow][currentColumn] = 'X';
                } else {
                    gameboard[currentRow][currentColumn] = 'O';
                }
            }
            updateDisplay();
            currentMove++;
            checkResult('O');
            checkResult('X');
        })
    }
}

vsComputerButton.addEventListener('click', () => {
    gameWrapper.style.pointerEvents = 'all';
    vsComputer = true;
    vsComputerButton.classList.add('hide');
    vsHumanButton.classList.add('hide');
    startAgainButton.classList.remove('hide');
});

vsHumanButton.addEventListener('click', () => {
    gameWrapper.style.pointerEvents = 'all';
    vsComputer = false;
    vsComputerButton.classList.add('hide');
    vsHumanButton.classList.add('hide');
    startAgainButton.classList.remove('hide');
});

startAgainButton.addEventListener('click', () => window.location.reload());

function updateDisplay() {
    currentCell.innerText = gameboard[currentRow][currentColumn];
}

function checkResult(player) {
    const gameboardCopy = [...gameboard];
    const reversedGameboard = gameboardCopy.reverse();
    const leftToRightDiagonal = gameboard.map((c, i) => c[i]);
    const rightToLeftDiagonal = reversedGameboard.map((c, i) => c[i]);
    for (let i = 0; i < 3; i++) {
        if (gameboard[i].every(cell => cell.includes(player)) ||
            gameboard.every(cell => cell[i].includes(player)) ||
            leftToRightDiagonal.every(cell => cell.includes(player)) ||
            rightToLeftDiagonal.every(cell => cell.includes(player))) {
            isGameOver = true;
            gameWrapper.style.pointerEvents = 'none';
            msgWrapper.innerText = `${player} player won!`;
        } else if (currentMove === 9) {
            isGameOver = true;
            gameWrapper.style.pointerEvents = 'none';
            msgWrapper.innerText = `Draw!`;
        }
    }
}

function computerMove() {
    if (currentMove !== 8) {
        let randomRow = Math.floor(Math.random() * 3);
        let randomColumn = Math.floor(Math.random() * 3);
        while (gameboard[randomRow][randomColumn]) {
            randomRow = Math.floor(Math.random() * 3);
            randomColumn = Math.floor(Math.random() * 3);
            if (!gameboard[randomRow][randomColumn]) {
                break;
            }
        }
        gameboard[randomRow][randomColumn] = 'O';
        const randomCell = document.querySelector(`#row-${randomRow}-cell-${randomColumn}`);
        randomCell.innerText = 'O';
        currentMove++;
    }
}

