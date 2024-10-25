const manageRender = (function () {

    let gameButtons = [];
    const buildGameboardHTML = function() {
        gameButtons = [];
        const gameboard = document.querySelector('.gameboard');
        gameboard.innerHTML = '';
        for (let i=0; i< 3; i++) {
            for (let j=0; j <3; j++) {
                let gametile = document.createElement("button");
                gametile.id = `${i}${j}`
                gametile.classList = `gametile gametile${i}${j}`;
                gameboard.appendChild(gametile);
                gameButtons.push(gametile);
            }
        }
        return gameButtons;
    }
    
    const updateGameBoard = function () {
        let gameboard = gameBoard.getGameBoard()
        for (let i=0; i< 3; i++) {
            for (let j=0; j <3; j++) {
                const gameTile = document.querySelector(`.gametile${i}${j}`)
                // console.log(`.gametile${i}${j}`);
                if (gameboard[i][j] == 'X') {
                    gameTile.innerHTML = 'X'
                    gameTile.classList.add('X');
                } 
                if (gameboard[i][j] == 'O') {
                    gameTile.innerHTML = 'O'
                    gameTile.classList.add('O');
                } 

            }
        }    
    }

    const addTileListeners = function () {
        gameButtons.forEach(element => {
            element.addEventListener('click', () =>{
                playGame.player1Turn(element.id);
            })
        });
    }

    /*
    const resultDiv = document.querySelector('.gameResult');
    const announceResult = function (gameResult) {
        resultDiv.textContent = gameResult;
    }
        */

    const disableTileButtons = function () {
        console.log('disabling buttons...')
        gameButtons.forEach(element => { 
            element.disabled = true;
        });
    }

    const colourWinningTiles = function(winningTiles) {
        winningTiles.forEach(element => {
            console.log('gametile' + element)
            let winningTile = document.querySelector('.gametile' + element);
            winningTile.classList.add('winningTile');
        });
    }

    const score1display = document.querySelector('.player1scoredisplay');
    const score2display = document.querySelector('.player2scoredisplay');
    const displayScore = (player1, player2) => {
        score1display.textContent = player1.getPlayerScore();
        score2display.textContent = player2.getPlayerScore();

    }




    return {buildGameboardHTML, updateGameBoard, addTileListeners, disableTileButtons, colourWinningTiles, displayScore}

})();




