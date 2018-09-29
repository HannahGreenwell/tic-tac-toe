$(document).ready(function(){

  $('div.startGame button').on('click', function(){
    // Hide the startGame div
    $('div.startGame').css('display', 'none');

    // Randomly assign players characters
    t3.assignCharacters();

    // Set-up and then display the player's sidebar
    const playerName = $('#playerName').val();
    t3.displaySidebar('human', playerName);

    // Set-up and then display the player's flashcard
    t3.displayFlashcard('human', playerName);
  });

  $('div.next button').on('click', function(){
    // Hide the previous flashcard
    $('div.flashcard').css('display', 'none');

    // Display the player's sidebar and flashcard
    t3.displaySidebar('computer', 'Computer');
    t3.displayFlashcard('computer', 'Computer');
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

}); // $(document).ready
