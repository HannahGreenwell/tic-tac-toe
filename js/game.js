
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
  updateBoard: function(row, col, content){
    $(`td[row=${row}][column=${col}]`).text(content);
  },

  // Update the winning player's sidebar
  displayWinner: function(){
    $(`#player${this.currentPlayer} .icon`).css('background-color', 'red');
    $(`#player${this.currentPlayer} .win`).css('visibility', 'visible');
  },

  // Update the display to show a draw
  displayDraw: function(){
    $('.draw-message').css('visibility', 'visible');
  },

  // Reset the game
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
    $('.icon').css('backgroundColor', '#BBB');
    $('.icon p').css('visibility', 'hidden');
    $('.win').css('visibility', 'hidden');
    $('.draw-message').css('visibility', 'hidden');
    $('.reset-draw-message').hide();
    $('.cheat').hide();

    // Display Player 1 character set-up instructions
    $('.assign-char-p1-instructions').show();
  },


  ///// PLAY CURRENT MOVE /////
  addMove: function(row, col){
    // Get the player's character
    const playerIcon = (this.currentPlayer === 1) ? (this.assignedCharSet.char1) : (this.assignedCharSet.char2);

    // Update the board variable with the player's icon
    this.board[row][col] = playerIcon;

    // Update the HTML board to display the player's icon
    this.updateBoard(row, col, playerIcon);

    // Increment the moves counter
    this.movesCount++;
  },

  // Takes an array of cells and checks if all the values are equal
  checkAllEqual: function(cells){
    const firstCell = cells[0];
    const allEqual = cells.every(cell => cell === firstCell);
    return allEqual;
  },

  // Gets the correct row and returns true if all cells are equal
  checkRow: function(row){
    const checkRow = this.board[row];
    return this.checkAllEqual(checkRow);
  },

  // Gets the correct column and returns true if all cells are equal
  checkColumn: function(col){
    const checkColumn = [];

    for(let i = 0; i < this.board.length; i++){
      checkColumn[i] = this.board[i][col];
    }

    return this.checkAllEqual(checkColumn);
  },

  // Gets the TL-BR diagonal and returns true if all cells are equal
  checkDiagonal1: function(){
    const diagonal = [];

    for(let i = 0; i < this.board.length; i++){
      diagonal[i] = this.board[i][i];
    }

    return this.checkAllEqual(diagonal);
  },

  // Gets the BL-TR diagonal and returns true if all cells are equal
  checkDiagonal2: function(){
    const diagonal = [];
    const maxIndex = this.board.length - 1;

    for(let i = 0; i < this.board.length; i++){
      diagonal[i] = this.board[i][maxIndex - i];
    }
    return this.checkAllEqual(diagonal);
  },

  // Check if current move wins the game
  checkForWin: function(row, col){
    // Check the row and return true if their is a win
    if(this.checkRow(row)){
      return true;
    }

    // Check the column and return true if their is a win
    if(this.checkColumn(col)){
      return true;
    }

    // If selected cell is on TL-BR diagonal,
    // check the diagonal and return true if their is a win
    if(row === col){
      if(this.checkDiagonal1()){
        return true;
      }
    }

    // If selected cell is on TL-BR diagonal,
    // check the diagonal and return true if their is a win
    if((row + col) === (this.board.length - 1)){
      if(this.checkDiagonal2()){
        return true;
      }
    }

    // If current move is not a winning move, return false
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

    // Add the move to the selected cell
    this.addMove(row, col);

    // Calculate when to start checking for a win and the maximum
    // number of moves, according to the size of the board
    const startCheckWinMove = this.board.length * 2 - 1;
    const maxMoves = Math.pow(this.board.length, 2);

    // Check whether to check for a win
    if(this.movesCount >= startCheckWinMove){
      // Check for win
      if(this.checkForWin(row, col)){
        // Update display to show winner and update game state
        this.displayWinner();
        this.gameInPlay = false;
        return;
      }
    }

    // Check for a draw, i.e. all moves have been completed without a win
    if(this.movesCount === maxMoves){
      // Update display to show a draw and update game state
      this.displayDraw();
      this.gameInPlay = false;
    }

    // Update currentPlayer before the next round
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
};
