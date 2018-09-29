
const t3 = {

  rows: [],

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

  currentPlayer: 1,
  movesCount: 0,
  gameInPlay: true,

  humanChar: {},
  computerChar: {},

  updateBoard: function(xPos, yPos, content){
    $(`td.${xPos}r-${yPos}c`).text(content);
  },

  displayWinner: function(){
    $(`#player${this.currentPlayer} .icon`).css('background-color', 'red');
    $(`#player${this.currentPlayer} .win`).css('visibility', 'visible');
  },

  displayDraw: function(){
    $('.alert').css('visibility', 'visible');
  },

  resetGame: function(){
    // Remove all <tr> and <td>
    $('tr').remove();

    // Reset all global variables
    this.rows = [];
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
  }, // resetGame

  // PLAY ROUND
  addMove: function(xPos, yPos){
    const playerIcon = (this.currentPlayer === 1) ? (this.assignedCharSet.char1) : (this.assignedCharSet.char2);

    this.rows[xPos][yPos] = playerIcon;
    this.updateBoard(xPos, yPos, playerIcon);
    this.movesCount++;
  }, // addMove

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
    if(!this.gameInPlay){
      return;
    }

    // Check that the cell hasn't already been taken.
    if(this.rows[xPos][yPos]){
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

  }, // playRound

  // GAME SETUP
  assignCharacters: function(){
    // Select a random array index
    const randomIndex = Math.floor(Math.random() * this.charSets.length);

    // Update the global variables humanChar and computerChar with the assigned character information
    this.humanChar = {
      char: this.charSets[randomIndex].char1,
      pron: this.charSets[randomIndex].pron1,
      defn: this.charSets[randomIndex].defn1,
    };

    this.computerChar = {
      char: this.charSets[randomIndex].char2,
      pron: this.charSets[randomIndex].pron2,
      defn: this.charSets[randomIndex].defn2,
    };

  },

  displaySidebar: function(player, playerName){
    // Add the player's name to their sidebar
    $(`#${player} h2`).text(playerName);
    // Add the player's character to their sidebar
    $(`#${player} div.icon p`).text(this[`${player}Char`].char);
    // Display the player's sidebar
    $(`#${player}`).css('visibility', 'visible');
  },

  displayFlashcard: function(player, playerName){
    // Add the player's name to their flashcard
    $('.flashcard p:first-child').html(`<span class=red> ${playerName},</span> you will be playing as:`);

    // Store the player's character info in variables and then add them to the flashcard
    const character = this[`${player}Char`].char;
    const pronunciation = this[`${player}Char`].pron;
    const definition = this[`${player}Char`].defn;

    $('div.flashcard p.pronunciation').html(`Pronunciation: ${pronunciation}`);
    $('div.flashcard p.character').html(`${character}`);
    $('div.flashcard p.definition').html(`Definition: ${definition}`);

    // Display the flashcard
    $('.flashcard').css('visibility', 'visible');
  },

  createBoard: function(length){
    for(let i = 0; i < length; i++){
      this.rows[i] = [];
      $('table').append('<tr></tr>');
      for(let j = 0; j < length; j++){
        this.rows[i][j] = 0;
        $(`table tr:nth-child(${i + 1})`).append(`<td class=${i}r-${j}c></td>`);
        this.updateBoard(i, j, '');
      }
    }
    $('td').css({width: `${48 / length}vw`, height: `${48 / length}vw`});
  },
}; // ticTacToe
