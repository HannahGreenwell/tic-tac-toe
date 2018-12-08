
const t3 = {
  charSets: [
    {
      char1: '未',
      pron1: 'we&#768i',
      defn1: 'not yet (formal)',
      char2: '末',
      pron2: 'mo&#768',
      defn2: 'last, end',
    },
    {
      char1: '己',
      pron1: 'ji&#780',
      defn1: 'self',
      char2: '已',
      pron2: 'yi&#768',
      defn2: 'already',
    },
    {
      char1: '土',
      pron1: 'tu&#780',
      defn1: 'dirt, soil',
      char2: '士',
      pron2: 'shi&#768',
      defn2: 'scholar, warrior',
    },
  ],

  // 2D array representing the game board
  board: [],

  // Current game state
  currentPlayer: 1,
  movesCount: 0,
  gameInPlay: true,
  assignedCharSet: {},


  ///// UPDATE DISPLAY /////
  // Update the content of a cell on the HTML board
  updateBoard: function(xPos, yPos, content){
    $(`td[row=${xPos}][column=${yPos}]`).text(content);
  },

  // Update the winning player's sidebar
  displayWinner: function(){
    $(`#player${this.currentPlayer} .icon`).css('background-color', 'red');
    $(`#player${this.currentPlayer} .win`).show();
  },

  displayDraw: function(){
    $('.alert').css('visibility', 'visible');
  },

  resetGame: function(){
    // Remove all <tr> and <td>
    $('tr').remove();

    // Reset all global variables
    this.board = [];
    this.currentPlayer = 1;
    this.movesCount = 0;
    this.gameInPlay = true;
    this.assignedCharSet = {};

    // Reset CSS
    $(`.icon p`).css('visibility', 'hidden');
    $(`.icon`).css('backgroundColor', '#BBB');
    $(`p.win`).css('visibility', 'hidden');
    $('button.cheat').css('visibility', 'hidden');
    $('.alert').css('visibility', 'hidden');
    $('.reset').css('visibility', 'hidden');
    $('div.setUp p').html("Hey <span class='red'>Player 1</span>, you're up first! Hit that assign character button to get started.");
    $('div.boardSetUp').css('display', 'none');
    $('button#assignP1').css('display', 'inline');
    $('div.setUp').css('display', 'block');
  },


  ///// PLAY ROUND /////
  addMove: function(xPos, yPos){
    const playerIcon = (this.currentPlayer === 1) ? (this.assignedCharSet.char1) : (this.assignedCharSet.char2);

    this.rows[xPos][yPos] = playerIcon;
    this.updateBoard(xPos, yPos, playerIcon);
    this.movesCount++;
  },

  checkAllEqual: function(cells){
    const firstCell = cells[0];
    const allEqual = cells.every(i => i === firstCell);
    return allEqual;
  },

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
  },

  getDiagonal2: function(xPos, yPos){
    const diagonal = [];
    const maxIndex = this.rows.length - 1;

    for(let i = 0; i < this.rows.length; i++){
      diagonal[i] = this.rows[i][maxIndex - i];
    }
    return this.checkAllEqual(diagonal);
  },

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
  },

  playCurrentMove: function(row, col){
    // Check the game's state to see if it is still in play
    if(!this.gameInPlay){
      return;
    }

    // Check that the cell hasn't already been taken
    if(this.board[row][col]){
      return;
    }

    this.addMove(xPos, yPos);

    const startCheckWinMove = this.rows.length * 2 - 1;
    const maxMoves = Math.pow(this.rows.length, 2);

    // Begin checking for a win after the 5th move.
    if(this.movesCount >= startCheckWinMove){
      if(this.checkForWin(xPos, yPos)){
        this.displayWinner();
        this.gameInPlay = false;
        return;
      }
    }

    // Check for a draw, i.e. all moves have been completed without a win.
    if(this.movesCount === maxMoves){
      this.displayDraw();
      this.gameInPlay = false;
    }

    // Switch players before the next round
    this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;

  },


  ///// GAME SETUP /////
  // Assign current game a random character set
  assignCharSet: function(){
    const randomIndex = Math.floor(Math.random() * this.charSets.length);
    this.assignedCharSet = this.charSets[randomIndex];
  },

  // Add the correct content to each player's character flashcard
  setupCharacterFlashcard: function(playerNum){
    const character = this.assignedCharSet[`char${playerNum}`];
    const pronunciation = this.assignedCharSet[`pron${playerNum}`];
    const definition = this.assignedCharSet[`defn${playerNum}`];

    $('div.flashcard h3').html(`<span class=red>Player ${playerNum}</span> you are:`);
    $('div.flashcard p.pronunciation').html(`Pronunciation: ${pronunciation}`);
    $('div.flashcard p.character').html(`${character}`);
    $('div.flashcard p.definition').html(`Definition: ${definition}`);
  },

  // Create the game board using the inputted board length
  createBoard: function(length){
    for(let i = 0; i < length; i++){
      // Adds a 'row' array to the board variable
      this.board[i] = [];
      // Adds a table row to the HTML board
      $('table').append('<tr></tr>');

      for(let j = 0; j < length; j++){
        // Adds a cell to the board variable with a falsey value 
        this.board[i][j] = 0;
        // Adds a table cell to the HTML board with corresponding row and column attributes
        $(`table tr:nth-child(${i + 1})`).append(`<td row=${i} column=${j}></td>`);
        // Update the content of each cell within the HTML board to an empty string (so that the table doesn't collapse)
        this.updateBoard(i, j, '');
      }
    }
    // Set the width and height of the HTML board's cells relative to the board length
    $('td').css({width: `${48 / length}vw`, height: `${48 / length}vw`});
  },
}; // ticTacToe
