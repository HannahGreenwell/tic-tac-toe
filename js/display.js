$(document).ready(function(){

  $('select#lengths').on('change', function(){
    const length = $(this).val();
    $('.createBoard').css('display', 'none');
    t3.createBoard(length);
    $('.reset').css('visibility', 'visible');
  })

  // delegate the click event to the whole document,
  // and then get the browser to work out whether the click happened to the right element
  $(document).on('click', 'td', function(){
    // debugger;
    const classNames = $(this)[0].className.split('-');
    const xPos = parseInt(classNames[0]);
    const yPos = parseInt(classNames[1]);

    t3.playRound(xPos, yPos);
  });

  $('.reset').on('click', function(){
    t3.resetGame()
  });

}); // $(document).ready
