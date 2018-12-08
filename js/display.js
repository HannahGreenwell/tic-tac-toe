
$(document).ready(function(){

  // Player 1 'Assign Character' button click handler
  $('#assign-p1').on('click', function(){
    // Hide Player 1's character set-up instructions
    $('.assign-char-p1-instructions').hide();

    // Assign current game a random character set
    t3.assignCharSet();

    // Display Player 1's character in their sidebar
    $('#player1 .icon p').text(t3.assignedCharSet['char1']).css('visibility', 'visible');

    // Set up Player 1's flashcard and then display it
    t3.setupCharacterFlashcard(1);
    $('div.flashcard').show();

    // After 5 seconds, hide Player 1's flashcard and then display Player 2's character set-up instructions
    setTimeout(function(){
      $('div.flashcard').hide();
      $('.assign-char-p2-instructions').show();
    }, 1000);
  });

  // Player 2 'Assign Character' button click handler
  $('#assign-p2').on('click', function(){
    // Hide Player 2's character set-up instructions
    $('.assign-char-p2-instructions').hide();

    // Display Player 2's character in their sidebar
    $('#player2 .icon p').text(t3.assignedCharSet['char2']).css('visibility', 'visible');

    // Set up Player 2's flashcard and then display it
    t3.setupCharacterFlashcard(2);
    $('div.flashcard').show();

    // After 5 seconds, hide Player 2's flashcard and then display board set-up instructions
    setTimeout(function(){
      $('div.flashcard').hide();
      $('.board-setup').show();
    }, 1000);
  });

  // 'Make My Board' click handler
  $('#create-board').on('click', function(){
    // Using the inputted board length, create a new game board
    const length = $('#length-input').val();
    t3.createBoard(length);

    // Hide the board set-up instructions
    $('.board-setup').hide();
    // Display the div containing the reset button and draw alert message
    $('.reset-draw-message').show();
    // Display both players' cheat buttons
    $('.cheat').show();
  });

  // Game board cell click handler (using delegation)
  $(document).on('click', 'td', function(){
    // Get the clicked row and column from the cell's attributes
    const row = parseInt($(this).attr('row'));
    const column = parseInt($(this).attr('column'));

    // Play the current move according to the selected cell
    t3.playCurrentMove(row, column);
  });

  // 'Cheat' buttons mousedown event handler
  $('.cheat').on('mousedown', function(){
    // Get the player's number and assigned character
    const playerNum = $(this).val();
    const playerChar = t3.assignedCharSet[`char${playerNum}`];

    // Highlight the player's previous moves by changing the font colour to red
    $(`td:contains(${playerChar})`).css('color', 'red');
  });

  // 'Cheat' buttons mouseup event handler
  $('button.cheat').on('mouseup', function(){
    // Get the player's number and assigned character
    const playerNum = $(this).val();
    const playerChar = t3.assignedCharSet[`char${playerNum}`];

    // Change the font colour of the player's previous moves back to black
    $(`td:contains(${playerChar})`).css('color', 'black');
  });

  // Reset button click handler
  $('.reset').on('click', function(){
    // Reset game
    t3.resetGame()
  });
}); // $(document).ready
