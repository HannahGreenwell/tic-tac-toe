$(document).ready(function(){

  $('button#assignP1').on('click', function(){
    $('div.characterSetUp').css('display', 'none');
    t3.assignCharSet();
    $(`div#player1 div.icon p`).text(t3.assignedCharSet[`${t3.player1Char}`]).css('visibility', 'visible');
    t3.displayFlashcard(1);

    window.setTimeout(function(){
      $('button#assignP2').css('visibility', 'visible');
    }, 5000);
  });

  $('button#assignP2').on('click', function(){
    $('button#assignP2').css('visibility', 'hidden');
    $(`div#player2 div.icon p`).text(t3.assignedCharSet[`${t3.player2Char}`]).css('visibility', 'visible');
    t3.displayFlashcard(2);

    window.setTimeout(function(){
      $('button#boardSetUp').css('visibility', 'visible');
    }, 5000);
  });

  $('button#boardSetUp').on('click', function(){
    $('div.flashcard').css('display', 'none');
    $('div.createBoard').css('display', 'block');
  });

  $('button#submitLength').on('click', function(){
    const length = $('input[name=length]:checked').val();
    $('.createBoard').css('display', 'none');
    t3.createBoard(length);
    $('.reset').css('visibility', 'visible');
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
