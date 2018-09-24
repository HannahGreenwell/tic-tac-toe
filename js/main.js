
const t3 = {

  rows: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
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


  // Takes an array of 3 cells and checks to see if all three are equal. Returns true if all three are equal and false if all three are not equal.
  // CHECK FOR ERRORS
  checkAllEqual: function(cells){
    const firstCell = cells[0];
    const allEqual = cells.every(i => i === firstCell);
    return allEqual;
  }, // checkAllEqual

  checkRow: function(xPos){
    const row = this.rows[xPos];
    return this.checkAllEqual(row);
  },

  checkColumn: function(yPos){
    const column = [];

    for(let i = 0; i < this.rows.length; i++){
      column[i] = this.rows[i][yPos];
    }

    return this.checkAllEqual(column);
  },

  checkDiagonal: function(xPos, yPos){
    let allEqual;

    if(xPos === yPos){
      const diagonal = [];

      for(let i = 0; i < this.rows.length; i++){
        diagonal[i] = this.rows[i][i];
      }
      allEqual = this.checkAllEqual(diagonal);
    }

    if((xPos + yPos) === this.width){
      const diagonal = [];

      for(let i = 0; i < this.rows.length; i++){
        diagonal[i] = this.rows[i][this.width - i];
      }
      allEqual = this.checkAllEqual(diagonal); // Error: Changes previous true to false.
    }

    return allEqual;
  },

  checkForWin: function(xPos, yPos){
    if(this.checkRow(xPos) === true){
      return true;
    }
    if(this.checkColumn(yPos)){
      return true;
    }
    //Error: checkForWin(1,1);
    if(this.checkDiagonal(xPos, yPos)){
      return true;
    }

    return false;
  }, // checkForWin

  playRound: function(xPos, yPos){
    this.addMove(xPos, yPos, this.currentPlayer);
    console.log(this.printBoard());
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
    //Switch player for before the next round
    this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
  }, // playRound

}; // ticTacToe
