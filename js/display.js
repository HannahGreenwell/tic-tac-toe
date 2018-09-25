$(document).ready(function(){

  $('td').on('click', function(){
    const classNames = $(this)[0].className.split(' ');
    const xPos = parseInt(classNames[0]);
    const yPos = parseInt(classNames[1]);

    t3.playRound(xPos, yPos);
  });



}); // $(document).ready
