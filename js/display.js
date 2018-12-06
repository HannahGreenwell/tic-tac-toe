$(document).ready(function(){

  $('button.assignP1Char').on('click', function(){

    const playerNum = $(this).val();

    // Hide the set-up instructions
    $('div.setUp').css('display', 'none');

    // Assign a random character set
    if(playerNum === "1"){
      t3.assignCharSet();
    }

    // Display the player's character in the grey circle
    $(`div#player${playerNum} div.icon p`).text(t3.assignedCharSet[`char${playerNum}`]).css('visibility', 'visible');

    // Display the flashcard
    $('div.flashcard').css('display', 'block');
    t3.displayFlashcard(playerNum);

    // Remove the flashcard with a timeout and return to the set up
    setTimeout(function(){
      $('div.flashcard').css('display', 'none');

      if(playerNum === "1"){
        $('div.setUp p').html("Hey <span class='red'>Player 2</span>, you're turn now! Give that assign character button a little click.");
        $('button#assignP1').css('display', 'none');
        $('button#assignP2').css('display', 'inline');
      } else {
        $('div.setUp p').html("Altogether now... hit the button below to start setting up your board.");
        $('button#assignP2').css('display', 'none');
        $('button#boardSetUp').css('display', 'inline');
      }

      $('div.setUp').css('display', 'block');
    }, 6000);
  });

  $('button#boardSetUp').on('click', function(){
    $('button#boardSetUp').css('display', 'none');
    $('div.setUp p').html("Now put your heads together... think of a number between 3 and 10 (the width of your board) and enter it below.");
    $('div.boardSetUp').css('display', 'block');
  });

  $('button#createBoard').on('click', function(){
    const length = $('input#lengthInput').val();
    $('div.setUp').css('display', 'none');
    t3.createBoard(length);
    $('input#lengthInput').text('');
    $('.reset').css('visibility', 'visible');
    $('button.cheat').css('visibility', 'visible');
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

  $('input#lengthInput').on('focus', function(){
    $(this).val('');
  });

  // Delegate the click event to the whole document, and then get the browser to work out whether the click happened to the right element
  $(document).on('click', 'td', function(){
    const classNames = $(this)[0].className.split('-');
    const xPos = parseInt(classNames[0]);
    const yPos = parseInt(classNames[1]);

    t3.playRound(xPos, yPos);
  });

  $('.reset').on('click', function(){
    t3.resetGame()
  });

}); // $(document).ready
