$(document).ready(function(){

  $('div.startGame button').on('click', function(){
    // Hide the startGame div
    $('div.startGame').fadeOut(200, function(){
      $(this).remove();
    });

    // Randomly assign players characters
    t3.assignCharacters();

    // Set-up and then display the player's sidebar
    const playerName = $('#playerName').val();
    t3.displaySidebar('human', playerName);

    debugger;
    // Set-up and then display the player's flashcard
    t3.displayFlashcard('human', playerName);
  });

  $('button#createBoard').on('click', function(){
    // Hide the create board instructions
    $('div.instructions').css('display', 'none');

    // Create the players' game board according to the length input
    const length = $('input#lengthInput').val();
    t3.createBoard(length);

    // Display the reset and cheat buttons
    $('.reset').css('visibility', 'visible');
    $('button.cheat').css('visibility', 'visible');
  });

  // Delegate the click event to the whole document, and then get the browser to work out whether the click happened to the right element
  $(document).on('click', 'td', function(){
    const classNames = $(this)[0].className.split('-');
    const xPos = parseInt(classNames[0]);
    const yPos = parseInt(classNames[1]);

    t3.playRound(xPos, yPos);
  });

  $('button.cheat').on('mousedown', function(){
    const playerNum = $(this).val();
    const playerChar = t3.assignedCharSet[`char${playerNum}`];
    $(`td:contains(${playerChar})`).css('color', 'red');
  });

  $('button.cheat').on('mouseup', function(){
    const playerNum = $(this).val();
    const playerChar = t3.assignedCharSet[`char${playerNum}`];
    $(`td:contains(${playerChar})`).css('color', 'black');
  });

  $('.reset').on('click', function(){
    t3.resetGame()
  });

  $('input#lengthInput').on('focus', function(){
    $(this).val('');
  });
}); // $(document).ready
