$(document).ready(function(){

  $('div.startGame button').on('click', function(){
    // Hide the startGame div
    $('div.startGame').css('display', 'none');

    // Add the player's name to their sidebar and display both sidebars
    const playerName = $('#playerName').val();
    $('#human h2').text(playerName);
    $('#human').fadeIn(1000);
    $('#computer').fadeIn(1000);

    // Add the player's name to the character set-up instructions and display the instructions
    $('div.charSetUp p').prepend(`<span class=red>${playerName}, </span>`);
    $('div.charSetUp').fadeIn(1000);
  });

  $('div.charSetUp button').on('click', function(){
    // Hide the character set-up instructions
    $('div.charSetUp').css('display', 'none');

    // Randomly assign players a character
    t3.assignCharacters();

    // Display the player's character in their sidebar
    $('#human .icon p').text(t3.humanChar.char);

    // Set-up and display the player's flashcard
    t3.displayFlashcard('human');

    // Hide the flashcard and display next instructions after 10 secs
    setTimeout(function(){
      $('div.flashcard').css('display', 'none');
      $('div.charSetUp').css('display', 'block');
    }, 10000);
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
