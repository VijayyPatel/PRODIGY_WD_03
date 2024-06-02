// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-button');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const clickSound = document.getElementById('click-sound');
    const winSound = document.getElementById('win-sound');
    const playerTurnElement = document.getElementById('player-turn');
    const confettiContainer = document.getElementById('confetti');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        clickSound.play();
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnElement.innerHTML = currentPlayer;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        let winningCells = [];
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCells = winCondition;
                break;
            }
        }

        if (roundWon) {
            gameStatus.innerHTML = `Player <span class="${currentPlayer}">${currentPlayer}</span> has won!`;
            gameActive = false;
            winSound.play();
            winningCells.forEach(index => {
                cells[index].classList.add('winning-cell');
            });
            launchConfetti();
            return;
        }

        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            gameStatus.innerHTML = 'Game ended in a draw!';
            gameActive = false;
            return;
        }

        handlePlayerChange();
    };

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameStatus.innerHTML = '';
        playerTurnElement.innerHTML = currentPlayer;
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('X', 'O', 'winning-cell');
        });
        confettiContainer.innerHTML = '';
    };

    const handleDarkModeToggle = () => {
        document.body.classList.toggle('dark-mode');
    };

    const launchConfetti = () => {
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.left = Math.random() * 100 + 'vw';
            confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confettiPiece);
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);
    darkModeToggle.addEventListener('click', handleDarkModeToggle);
});
