const allEqual = arr => arr.every(val => val === arr[0]);

function createPlayer(name, marker) {
    const playersMarker = () => marker;

    let isWinner = false;
    const playerWins = () => isWinner = true;

    const hasWon = () => isWinner;

    // These next 2 aren't currently being used! Do I need them?
    let playersCurrentMove = ''
    const playersChosenMove = (chosenMove) => playersCurrentMove = chosenMove
    const getCurrentMove = () => playersCurrentMove;

    const resetPlayer = () => {
        isWinner = false;
        playersCurrentMove = '';
    }

    return {name, playersMarker, hasWon, playerWins, playersChosenMove, getCurrentMove, resetPlayer};
}

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
    const setGameResult = (result) => gameResult = result;

    const getGameResult = () => gameResult;

    const resetBoard = () => {
        board = [['1','2','3'], ['4','5','6'], ['7','8','9']];
    }

    return {createGameBoard, getGameBoard, updateGameBoard, setGameResult, getGameResult, resetBoard};
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
                player.playerWins();
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
                player.playerWins();
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
            player.playerWins();
        }

        if (allEqual(diag2)) {
            //console.log(diag2WinningTiles)
            manageRender.colourWinningTiles(diag2WinningTiles)
            player.playerWins();
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
            gameBoard.setGameResult('draw');
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
        if (player1.hasWon() == true) {
            console.log('player 1 has won');
            gameBoard.setGameResult(player1.name);
            manageRender.announceResult('Player 1 has won')
            return true
        }

        if (player2.hasWon() == true) {
            console.log('player 2 has won');
            gameBoard.setGameResult(player2.name);
            manageRender.announceResult('Player 2 has won')
            return true
        }
        
        if (gameBoard.getGameResult() == 'draw') { 
            console.log('Its a draw');
            manageRender.announceResult('Player 1 has won')
            return true
        }  
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
            console.log('Choosing computer move')
            let player2Move = getMoves.getComputerMove(player2);
            gameBoard.updateGameBoard(player2Move, player2);
            manageRender.updateGameBoard();
            gameMechanics.checkforWinner(player2)
            gameMechanics.checkDraw();
    
            if (checkResult()) {
                console.log('Disabling tile buttons2')
                manageRender.disableTileButtons()
                return
            }
        }
        
        
    };

    const resetGame = () => {
        console.log('resetting...');
        player1.resetPlayer();
        player2.resetPlayer();
        gameBoard.resetBoard();
        autoPlayer.resetAutoPlayer();
        manageRender.buildGameboardHTML();
        manageRender.addTileListeners();
    }

    return {playerClicked, resetGame}
})();


manageRender.buildGameboardHTML();
manageRender.addTileListeners();
