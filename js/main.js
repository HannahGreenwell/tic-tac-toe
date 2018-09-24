
const t3 = {

  rows: [
    [1, '', 2],
    ['', 1, ''],
    [2, '', 1],
  ], // Change to function that creates board.

  width: 2, // Change to variable
  currentPlayer: 1,
  movesCount: 0,

  printBoard: function(){
    for(let i = 0; i < this.rows.length; i++){
      for(let j = 0; j < this.rows[i].length; j++){
        console.log(this.rows[i][j]);
      }
    }
  },

  addMove: function(xPos, yPos, currentPlayer){
    const selectedCell = this.rows[xPos][yPos];

    // Check that selected cell has not already been taken.
    if(!selectedCell){
      this.rows[xPos][yPos] = currentPlayer;
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

    for(let i = 0; i < this.rows.length; i++){
      diagonal[i] = this.rows[i][this.width - i];
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
    if(xPos + yPos === this.width){
      if(this.getDiagonal2(xPos, yPos)){
        return true;
      }
    }
    return false;
  }, // checkForWin

  playRound: function(xPos, yPos){
    this.addMove(xPos, yPos, this.currentPlayer);
    // console.log(this.printBoard());
    this.movesCount++;
    // Begin checking for a win after the 5th move.
    if(this.movesCount >= 5){
      const hasWon = this.checkForWin(xPos, yPos);
      if(hasWon){
        console.log(`Congratulations Player ${this.currentPlayer}, you won the game!`);
        return;
      }
    }
    if(this.movesCount === 9){
      console.log(`It's a draw!`);
      return;
    }
    //Switch player for  the next round
    this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
  }, // playRound

}; // ticTacToe
