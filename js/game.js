
const t3 = {

  rows: [],

  charSet: [
    {
      char0: '未',
      char0Pron: 'wei4',
      char0Meaning: 'definition',
      char1: '末',
      char1Pron: 'mo4',
      char1Meaning: 'definition',
    },
    {
      char0: '己',
      char0Pron: '4',
      char0Meaning: 'definition',
      char1: '已',
      char1Pron: 'mo4',
      char1Meaning: 'definition',
    },
    {
      char0: '未',
      char0Pron: 'wei4',
      char0Meaning: 'definition',
      char1: '末',
      char1Pron: 'mo4',
      char1Meaning: 'definition',
    },
  ],

  currentPlayer: 1,
  movesCount: 0,
  gameInPlay: true,

  player1Char: '',
  player2Char: '',

  // printBoard: function(){
  //   for(let i = 0; i < this.rows.length; i++){
  //     for(let j = 0; j < this.rows[i].length; j++){
  //       console.log(this.rows[i][j]);
  //     }
  //   }
  // },

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

    // Reset CSS [ --> REFACTOR <-- ]
    $('.alert').css('visibility', 'hidden');
    $(`#player${this.currentPlayer} .icon`).css('background-color', '#BBB');
    $(`#player${this.currentPlayer} .win`).css('visibility', 'hidden');
    $('.createBoard').css('display', 'block');
    $('.reset').css('visibility', 'hidden');
  }, // resetGame

  // PLAY ROUND

  addMove: function(xPos, yPos){
    const playerIcon = (this.currentPlayer === 1) ? '未' : '末';
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
    // debugger;
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
    const random = Math.round(Math.random());
    const randomOpposite = random === 0 ? 1 : 0;

    this.player1Char = this.charSet[`char${random}`];
    this.player2Char = this.charSet[`char${randomOpposite}`];
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
