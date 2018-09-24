
const t3 = {

  rows: [
    [1, 2, 3],
    [4, 1, 6],
    [7, 8, 1],
  ],

  width: 2, // Change to variable

  addMove: function(xPos, yPos, player){
    const selectedCell = this.rows[xPos][yPos];

    // Check that selected cell has not already been taken.
    if(!selectedCell){
      this.rows[xPos][yPos] = player;
      this.printRows();
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
    let allEqual = false;

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
      console.log('You won! (Row)');
      return true;
    }
    if(this.checkColumn(yPos)){
      console.log('You won! (Column)');
      return true;
    }
    if(this.checkDiagonal(xPos, yPos)){
      console.log('You won! (Diagonal)');
      return true;
    }

    return false;
  }, // checkForWin

}; // ticTacToe
