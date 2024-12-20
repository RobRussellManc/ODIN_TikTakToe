const allEqual = arr => arr.every(val => val === arr[0]);

function createPlayer(name, marker) {
    const playersMarker = () => marker;

    let score = 0;
    //const scoredisplay = document.querySelector(`${name}scoredisplay`);
    const increasePlayerScore = () => {
        score++;
        //scoredisplay.textContent = score;
    }

    const getPlayerScore = () => score;

    const resetPlayerScore = () => {
        score = 0;
    }

    

    return {name, playersMarker, increasePlayerScore, resetPlayerScore, getPlayerScore};
}


const gameRound = (function () {
    let round = 0; 
    const getRoundNumber = () => round;

    const roundDisplay = document.querySelector('.roundNumber > span');
    const increaseRound = () => {
        round++;
        roundDisplay.textContent = round;
    }

    let roundWinner = '';
    const resultDiv = document.querySelector('.gameResult');
    const setRoundWinner = (winner) => {
        if (winner === 'draw') {
            roundWinner = 'draw';
            resultDiv.textContent = 'The round was a draw';
        } else if (winner) { // Check if there's a player object as the winner
            roundWinner = winner.name; // Set the player object as roundWinner
            winner.increasePlayerScore(); // Increase the player's score
            resultDiv.textContent = 'Round winner: ' + roundWinner; // Display the winner's name
        } else {
            roundWinner = '';
            resultDiv.textContent = '';
        }
    };

    

    const getRoundWinner = () => roundWinner;
    const resetRoundNumber = () => {
        round = 0;
        roundDisplay.textContent = round;
    };
    return {getRoundNumber, increaseRound, setRoundWinner, getRoundWinner, resetRoundNumber}
})();

const gameResult = (function () {
    const gameWinner = '';
    const setGameWinner = (winner) => gameWinner = winner;
    const getGameWinner = () => gameWinner;

    return {setGameWinner, getGameWinner}
})();

const autoPlayer = (function () {
    let player1Moves = ['01', '10', '11', '20', '22']
    let player2Moves = ['00', '02', '12', '21']

    let player1Turn = 0;
    let player2Turn = 0;

    const playerAutoMove = (player) => {
        if (player.name == 'player1') {
            let move = player1Moves[player1Turn];
            player1Turn ++;
            return move;
        } else {
            let move = player2Moves[player2Turn];
            player2Turn ++;
            return move;
        }
    }

    const resetAutoPlayer = () => {
        player1Turn = 0;
        player2Turn = 0;
    }

    return {playerAutoMove, resetAutoPlayer}
})();

const getMoves = (function () {

    const getPlayerMove = (player) => {
        
        let validMove = false;
        while (!validMove) {
            playerMove =   autoPlayer.playerAutoMove(player) //  prompt('Your move: ');// prompt("Player 1 move: ");
            //console.log(player.name + ' move: ' + playerMove)
            validMove = gameMechanics.checkValidMove(gameBoard.getGameBoard(), playerMove);
        }
        return playerMove;
    }

    const getComputerMove = () => {
        let gameboard = gameBoard.getGameBoard();
        //console.table(gameboard);
        const getRandomNumber = () => Math.floor(Math.random() * 3);
        
        let selectedMove = 'X';
        let randomNum1;
        let randomNum2;

        
        while (selectedMove == 'X' || selectedMove == 'O' ) {
            // Get two random numbers
            randomNum1 = getRandomNumber();
            randomNum2 = getRandomNumber();
            selectedMove = gameboard[randomNum1][randomNum2]; 
            console.log('computer move: ' +selectedMove ) ;         
        }
        
        return '' + randomNum1 + randomNum2;
    }

    return {getPlayerMove, getComputerMove}
    
})();



const gameBoard = (function () {
    let board = [['1','2','3'], ['4','5','6'], ['7','8','9']];
    const createGameBoard = () => board;

    const getGameBoard = () => board;

    const updateGameBoard = (playersMove, player) => {
        let move = playersMove.split("");
        board[move[0]][move[1]] = player.playersMarker();
    }

    let gameResult;
    //const setGameResult = (result) => gameResult = result;

   

    const resetBoard = () => {
        board = [['1','2','3'], ['4','5','6'], ['7','8','9']];
    }

    return {createGameBoard, getGameBoard, updateGameBoard, resetBoard};
})();


const gameMechanics = (function () {

    const checkValidMove = (playerMove) => {
        let gameboard = gameBoard.getGameBoard();
        
        let [a, b] = playerMove.split("");
        
        if (a > 2 || a < 0 || b > 2 || b < 0) {
            console.log('the move was outside the board bounds')
            return false;
        }

        if (gameboard[a][b] == 'X' || gameboard[a][b] == 'O' ) {
            console.log('A player has already moved there')
            return false
        }

        return true
    }

    const checkforWinner = (player) => {
        gameboard = gameBoard.getGameBoard();
        // check horizontal
        for (let i=0; i <= 2; i++){
            let row = [gameboard[i][0]];
            let winningTiles = [`${i}0`];
            
            for (let j=1; j <= 2; j++) {
                row.push(gameboard[i][j]);
                winningTiles.push([`${i}${j}`])
            }
            let result = allEqual(row);
            //console.log('Horizontal: ' + row);
            if (result) {
                manageRender.colourWinningTiles(winningTiles)
                gameRound.setRoundWinner(player);
                //player.playerWins();
                break;
            }
        }

        // Check vertical
        for (let i=0; i <= 2; i++){
            let row = [gameboard[0][i]];
            let winningTiles = [`0${i}`];
            
            for (let j=1; j <= 2; j++) {
                row.push(gameboard[j][i]);
                winningTiles.push([`${j}${i}`])
            }
            let result = allEqual(row);
            //console.log('vertical: ' + row);
            if (result) {
                manageRender.colourWinningTiles(winningTiles)
                gameRound.setRoundWinner(player);
                //player.playerWins();
                break;
            }
        }

        // Check diags
        let diag1 = []
        let diag2 = []
        diag1WinningTiles = [];
        diag2WinningTiles = [];
        for (let z=0; z <=2; z++) {
            diag1.push(gameboard[z][z]);
            diag2.push(gameboard[z][2-z]);
            diag1WinningTiles.push([`${z}${z}`]);
            diag2WinningTiles.push([`${z}${2-z}`]);
        }

        if (allEqual(diag1)) {
            //console.log(diag1WinningTiles)
            manageRender.colourWinningTiles(diag1WinningTiles)
            gameRound.setRoundWinner(player);
            //player.playerWins();
        }

        if (allEqual(diag2)) {
            //console.log(diag2WinningTiles)
            manageRender.colourWinningTiles(diag2WinningTiles);
            gameRound.setRoundWinner(player);
            //player.playerWins();
        }
    }

    const checkDraw = () => {
        let gameboard = gameBoard.getGameBoard().flat();
        let temp = [];
        gameboard.forEach(element => {
            if (!isNaN(element)) {
                temp.push(element)
        }});
        
        //console.log('draw check: ' + temp)
        if (temp.length == 0) {
            gameRound.setRoundWinner('draw');
            //gameBoard.setGameResult('draw');
        };
    };
       
    

    return {checkValidMove, checkforWinner, checkDraw};
})();

/*
function applyMove(player, playerMove) {

    gameBoard.updateGameBoard(playerMove, player);
    manageRender.updateGameBoard();
    
    //gameMechanics.checkDraw();
}
*/

const playGame = (function () {
    // Create 2 players
    const player1 = createPlayer('player1', 'X');
    const player2 = createPlayer('player2', 'O');

    const checkResult = () => {
        if (gameRound.getRoundWinner() || gameRound.getRoundWinner() == 'draw') {
            return true
        }
    }

    const humanMove = (tileClicked) => {
        console.log('It is a valid move')
        gameBoard.updateGameBoard(tileClicked, player1);
        manageRender.updateGameBoard();
        gameMechanics.checkforWinner(player1)
        gameMechanics.checkDraw();
    }

    
    const computerMove = () => {
        console.log('Choosing computer move')
        let player2Move = getMoves.getComputerMove(player2);
        gameBoard.updateGameBoard(player2Move, player2);
        manageRender.updateGameBoard();
        gameMechanics.checkforWinner(player2)
        gameMechanics.checkDraw();
    }

    


    const player1Turn = (tileClicked) => {
        let validMove = gameMechanics.checkValidMove(tileClicked);
        if (validMove) {
            humanMove(tileClicked);
        } else {
            console.log('NOT a valid move')
            return
        }

        if (checkResult()) {
            console.log('Disabling tile buttons1')
            manageRender.disableTileButtons()
            manageRender.displayScore(player1, player2);
            return
        } else {
            computerMove();
            if (checkResult()) {
                console.log('Disabling tile buttons2')
                manageRender.disableTileButtons()
                manageRender.displayScore(player1, player2);
                return
            }
        }

    }

    const player2Turn = () => {
        if (!checkResult()) {computerMove();}
        
    }

    const playerClicked = (tileClicked) => {
        // Check tile is valid 
        console.log(tileClicked);

        let validMove = gameMechanics.checkValidMove(tileClicked);
        if (validMove) {
            console.log('It is a valid move')
            gameBoard.updateGameBoard(tileClicked, player1);
            manageRender.updateGameBoard();
            gameMechanics.checkforWinner(player1)
            gameMechanics.checkDraw();
        } else {
            console.log('NOT a valid move')
            return
        }
        
        if (checkResult()) {
            console.log('Disabling tile buttons1')
            manageRender.disableTileButtons()
            return
        } else {
            computerMove();
            if (checkResult()) {
                console.log('Disabling tile buttons2')
                manageRender.disableTileButtons()
                return
            }
        }
        
        
    };


    const nextRound = () => {
        gameBoard.resetBoard();
        gameRound.setRoundWinner('');
        gameRound.increaseRound();
        manageRender.buildGameboardHTML();
        manageRender.addTileListeners();
    }

    const resetGame = () => {
        console.log('resetting...');
        player1.resetPlayerScore();
        player2.resetPlayerScore();
        gameBoard.resetBoard();
        gameRound.resetRoundNumber();

        manageRender.buildGameboardHTML();
        manageRender.addTileListeners();
        manageRender.displayScore(player1, player2);
    }

    return {playerClicked, resetGame, nextRound, player1Turn, player2Turn}
})();


manageRender.buildGameboardHTML();
manageRender.addTileListeners();
