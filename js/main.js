
const t3 = {

  rows: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // Change to method that creates board.

  currentPlayer: 1,
  movesCount: 0,
  gameInPlay: true,

  // printBoard: function(){
  //   for(let i = 0; i < this.rows.length; i++){
  //     for(let j = 0; j < this.rows[i].length; j++){
  //       console.log(this.rows[i][j]);
  //     }
  //   }
  // },

  updateBoard: function(xPos, yPos, currentPlayer){
    $(`td.${xPos}r.${yPos}c`).text(currentPlayer);
  },

  // displayWinner: function(currentPlayer){
  //   const player
  //   $(``)
  // },

  addMove: function(xPos, yPos, currentPlayer){
    const selectedCell = this.rows[xPos][yPos];

    // Check that selected cell has not already been taken.
    if(!selectedCell){
      this.rows[xPos][yPos] = currentPlayer;
      this.updateBoard(xPos, yPos, currentPlayer);
      this.movesCount++;
    } else {
      console.log('Please select an EMPTY cell.');
      return;
    }
  }, // addMove

  // Takes an array of n cells and checks to see if all are equal. Returns true if all are equal and false if all are not equal.
  checkAllEqual: function(cells){
    const firstCell = cells[0];
    const allEqual = cells.every(i => i === firstCell);
    return allEqual;
  }, // checkAllEqual

  getRow: function(xPos){
    const row = this.rows[xPos];
    return this.checkAllEqual(row);
  },

  getColumn: function(yPos){
    const column = [];

    for(let i = 0; i < this.rows.length; i++){
      column[i] = this.rows[i][yPos];
    }

    return this.checkAllEqual(column);
  },

  getDiagonal1: function(xPos, yPos){
    const diagonal = [];

    for(let i = 0; i < this.rows.length; i++){
      diagonal[i] = this.rows[i][i];
    }

    return this.checkAllEqual(diagonal);
  }, // getDiagonal1

  getDiagonal2: function(xPos, yPos){
    const diagonal = [];
    const maxIndex = this.rows.length - 1;

    for(let i = 0; i < this.rows.length; i++){
      diagonal[i] = this.rows[i][maxIndex - i];
    }
    return this.checkAllEqual(diagonal);
  }, // getDiagonal2

  checkForWin: function(xPos, yPos){
    if(this.getRow(xPos)){
      return true;
    }

    if(this.getColumn(yPos)){
      return true;
    }

    if(xPos === yPos){
      if(this.getDiagonal1(xPos, yPos)){
        return true;
      }
    }

    if((xPos + yPos) === (this.rows.length - 1)){
      if(this.getDiagonal2(xPos, yPos)){
        return true;
      }
    }

    return false;
  }, // checkForWin

  playRound: function(xPos, yPos){
    // Check if the game is still in play.
    if(this.gameInPlay){
      this.addMove(xPos, yPos, this.currentPlayer);

      const startCheckWinMove = this.rows.length * 2 - 1;
      const maxMoves = Math.pow(this.rows.length, 2);

      // Begin checking for a win after the 5th move.
      if(this.movesCount >= startCheckWinMove){
        const hasWon = this.checkForWin(xPos, yPos);
        if(hasWon){
          console.log(`Congratulations Player ${this.currentPlayer}, you won the game!`);
          this.gameInPlay = false;
          return;
        }
      }

      // Check for a draw, i.e. all moves have been completed without a win
      if(this.movesCount === maxMoves){
        console.log(`It's a draw!`);
        this.gameInPlay = false;
        return;
      }

      // Switch players before the next round
      this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
    } else {
      console.log('Sorry, the game has already finished.');
      return;
    }
  }, // playRound

}; // ticTacToe
