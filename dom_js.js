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
                playGame.playerClicked(element.id);
            })
        });
    }

    const resultDiv = document.querySelector('.gameResult');
    const announceResult = function (gameResult) {
        resultDiv.textContent = gameResult;

    }

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




    return {buildGameboardHTML, updateGameBoard, addTileListeners, announceResult, disableTileButtons, colourWinningTiles}

})();




