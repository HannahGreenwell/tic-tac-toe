$(document).ready(function(){

  $('button#assignP1').on('click', function(){
    $('div.setUp').css('display', 'none');
    // Assign character set and then assign individual player characters
    t3.assignCharSet();
    // Display player 1's character in the grey circle
    $(`div#player1 div.icon p`).text(t3.assignedCharSet[`${t3.player1Char}`]).css('visibility', 'visible');
    // Display the flashcard
    $('div.flashcard').css('display', 'block');
    t3.displayFlashcard(1);

    // Change the text for charSetUp and display assignP2 button
    setTimeout(function(){
      $('div.flashcard').css('display', 'none');
      $('div.setUp p').html("Hey <span class='red'>Player 2</span>, you're turn now! Give that assign character button a little click.");
      $('button#assignP1').css('display', 'none');
      $('button#assignP2').css('display', 'inline');
      $('div.setUp').css('display', 'block');
    }, 1000);
  });

  $('button#assignP2').on('click', function(){
    $('div.setUp').css('display', 'none');
    $(`div#player2 div.icon p`).text(t3.assignedCharSet[`${t3.player2Char}`]).css('visibility', 'visible');
    $('div.flashcard').css('display', 'block');
    t3.displayFlashcard(2);

    setTimeout(function(){
      $('div.flashcard').css('display', 'none');
      $('div.setUp p').html("Altogether now... hit the button below to start setting up your board.");
      $('button#assignP2').css('display', 'none');
      $('button#boardSetUp').css('display', 'inline');
      $('div.setUp').css('display', 'block');
    }, 1000);
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
