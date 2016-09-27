$(function() {
  var $homepage = $('#homepage-section')
  var $login = $('#login-section')
  var $register = $('#register-section')
  var $game = $('#game-section')

  $login.hide();
  $register.hide();
  $game.hide();

  $('#loginpage').click(function() {
    console.log("pressed view");
    $login.show();
    $register.hide();
    $game.hide();
    $homepage.hide();
  });

  $('#homepage').click(function() {
    console.log("pressed view");
    $login.hide();
    $register.hide();
    $game.hide();
    $homepage.show();
  });

  $('#registerpage').click(function() {
    console.log("pressed view");
    $login.hide();
    $register.show();
    $game.hide();
    $homepage.hide();
  });

  $('#gamepage').click(function() {
    console.log("pressed view");
    $login.hide();
    $register.hide();
    $game.show();
    $homepage.hide();
  });
  $("#option1").click(function() {
    $("#stake").val(100);
  });
  $("#option2").click(function() {
    $("#stake").val(50);
  });
  $("#option3").click(function() {
    $("#stake").val(20);
  });


});
