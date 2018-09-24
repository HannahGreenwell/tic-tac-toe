const t3 = {
  rows: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],

  printRows: function(){
    for(let i = 0; i < this.rows.length; i++){
      for(let j = 0; j < this.rows[i].length; j++){
        console.log(this.rows[i][j]);
      } // inner for
    } // outer for
  }, // printRows

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
}; // ticTacToe
