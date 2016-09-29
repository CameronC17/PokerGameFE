$(function() {


  $homepage = $('#homepage-section')
  $login = $('#login-section')
  $register = $('#register-section')
  $game = $('#game-section')
  $gamebuttons = $('#gamebuttons')
  $singleplayer = $('#single')
  $multiplayer = $('#multiplayer')


  $gamebuttons.hide();
  $login.hide();
  $register.hide();
  $game.hide();

  $('#single').click(function() {
    console.log("pressed view");
    $gamebuttons.show();
    $singleplayer.hide();
    $multiplayer.hide();
  });

  $('#multiplayer').click(function() {
    console.log("pressed view");
    $gamebuttons.show();
    $singleplayer.hide();
    $multiplayer.hide();
  });

  $('#loginpage').click(function() {
    console.log("pressed view");
    $login.show();
    $register.hide();
    $game.hide();
    $homepage.hide();
    $('#title').text("Pokerbalmz Login");
  });

  $('#homepage').click(function() {
    console.log("pressed view");
    $login.hide();
    $register.hide();
    $game.hide();
    $homepage.show();
    $('#title').text("Pokerbalmz Home");
  });

  $('#registerpage').click(function() {
    console.log("pressed view");
    $login.hide();
    $register.show();
    $game.hide();
    $homepage.hide();
    $('#title').text("Pokerbalmz Register");
  });

  $('#gamepage').click(function() {
    // console.log(localStorage.getItem('user'));
    // if (localStorage.getItem('user')) {
    //
    //     console.log("pressed view");
    //     $login.hide();
    //     $register.hide();
    //     $game.show();
    //     $homepage.hide();
    //     $('#title').text("Pokerbalmz Game");
    //
    // } else {
    //   alert("You have to login in order to play");
    // }
    if(localStorage.getItem('username')){
          $login.hide();
          $register.hide();
          $game.show();
          $homepage.hide();
          $('#title').text("Pokerbalmz Game");

      } else {
        alert("You have to login in order to play");
      }
  });

  $('#login-button').click(function(e) {
    // e.preventdefault();
    var username = $('#username').val();
    var password = $('#password').val();
    loginRequest(username, password);
  });


  $('#register-button').click(function(e) {
    var username = $('#registerusername').val();
    var password = $('#registerpassword').val();
    registerRequest(username, password);
    $login.show();
    $register.hide();
    $game.hide();
    $homepage.hide();
    $('#title').text("Pokerbalmz Login");
  });

  $('#bet').click(function() {
  // console.log('Raise Button');
  userInput($("#stake").val(), false, false, false);
})
$('#check').click(function() {
  // console.log('Check Button');
  userInput(false, false, true, false);
})
$('#fold').click(function() {
  // console.log('Fold button');
  userInput(false, false, false, true);
})
$('#call').click(function() {
  userInput(false, true, false, false);
})
$('#start').click(function() {
  console.log('start');
  startGame();
})

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

function loginRequest(username, password) {
  $.ajax({
    url: "http://localhost:3000/api/users/login",
    type: 'POST',
    dataType: 'json',
    data: {
      "username": username,
      "password": password
    },
    async: false,
    statusCode: {
      200: function(response) {

        $login.hide();
        $register.hide();
        $game.hide();
        $homepage.show();
        // window.local = response.user;
        localStorage.setItem('user', response.user);
        localStorage.setItem('username', response.username);
        // window.location.href = "http://localhost:3001";

        $('#custom-msg').append('<h1>Welcome, ' + localStorage.getItem('username') + '</h1>')

        $('#title').text("Pokerbalmz Home");

      //   $('#gamepage').click(function() {
      //   console.log("pressed view");
      //   $login.hide();
      //   $register.hide();
      //   $game.show();
      //   $homepage.hide();
      //   $('#title').text("Pokerbalmz Game");
      // });

      },
      400: function(response) {
        $('.error-msg').html("<p>A user does not exist with the given details</p>");
        $('#username').val("");
        $('#password').val("");
      }
    }
  });
}

function getCardValue(val) {
  var value = val;
  switch (val) {
    case 11:
      value = "J";
      break;
    case 12:
      value = "Q";
      break;
    case 13:
      value = "K";
      break;
    case 14:
      value = "A";
      break;
    default:
      break;
  }
  return value;
}

function getCardColour(suit) {
  var colour = "black";
  if (suit === "diamond" || suit === "heart") {
    colour = "red";
  }
  return colour;
}

function getSuitType(suit) {
  var sSuit = "";
  switch (suit) {
    case "diamond":
      sSuit = "&#9830";
      break;
    case "heart":
      sSuit = "&#9829";
      break;
    case "spade":
      sSuit = "&#9824";
      break;
    case "club":
      sSuit = "&#9827";
      break;

  }
  return sSuit;
}

function startGame() {
  var userID = localStorage.getItem('user');
  $.ajax({
    url: "http://localhost:3000/api/games/new",
    type: 'POST',
    async: false,
    data: { user : userID},
    statusCode: {
      200: function(response) {
        var position = '#top-left';
        for (var i = 0; i < response.length; i++) {
          //change posiitons based on whos cards are what
          if (i >= 1) {
            position = "#bottom-left";
          }
          if (i >= 2) {
            position = "#bottom-middle";
          }
          if (i >= 3) {
            position = "#bottom-right";
          }
          if (i >= 4) {
            position = "#top-right";
          }
          //player card 1
          var cardColor = getCardColour(response[i][0].suit)
          var suitType = getSuitType(response[i][0].suit);
          var cardValue = getCardValue(response[i][0].value);
          $(position).html('<div class="card" id="' + cardColor + '">' +
            '<p class = "suit">' + suitType + '</p>' +
            '<p class="cardtype"> ' + cardValue + '</p>' +
            '<p class="upsidedown suit">' + suitType + '</p>' +
            '</div>'
          );

          //player card 2
          cardColor = getCardColour(response[i][1].suit)
          suitType = getSuitType(response[i][1].suit);
          cardValue = getCardValue(response[i][1].value);
          $(position).append('<div class="card" id="' + cardColor + '">' +
            '<p class = "suit">' + suitType + '</p>' +
            '<p class="cardtype"> ' + cardValue + '</p>' +
            '<p class="upsidedown suit">' + suitType + '</p>' +
            '</div>'
          );
        }




      }
    }
  });
}


function userInput(bet, call, check, fold) {
  $.ajax({
    url: "http://localhost:3000/api/games",
    type: 'POST',
    dataType: 'json',
    data: {
      "user": localStorage.getItem('user'),
      "bet": bet,
      "call": call,
      "check": check,
      "fold": fold
    },
    async: false,
    statusCode: {
      200: function(response) {
        console.log(response);
        var position = '#top-middle';
        for (var i = 0; i < response.length; i++) {
          //change posiitons based on whos cards are what
          //player card 1
          var cardColor = getCardColour(response[i].suit)
          var suitType = getSuitType(response[i].suit);
          var cardValue = getCardValue(response[i].value);
          if(i == 0){
            $(position).html('<div class="card" id="' + cardColor + '">' +
              '<p class = "suit">' + suitType + '</p>' +
              '<p class="cardtype"> ' + cardValue + '</p>' +
              '<p class="upsidedown suit">' + suitType + '</p>' +
              '</div>'
              );
          }else{
            $(position).append('<div class="card" id="' + cardColor + '">' +
              '<p class = "suit">' + suitType + '</p>' +
              '<p class="cardtype"> ' + cardValue + '</p>' +
              '<p class="upsidedown suit">' + suitType + '</p>' +
              '</div>'
              );
          }
        }
      }
    }
  });
}

function registerRequest(username, password) {
  $.ajax({
    url: "http://localhost:3000/api/users",
    type: 'POST',
    dataType: 'json',
    data: {
      "username": username,
      "password": password
    },
    async: false,
    statusCode: {
      201: function(response) {
        $('#register-msg').append('<p>You have successfully registered. Now you can login</p>');

        $login.show();
        $register.hide();
        $game.hide();
        $homepage.hide();
        // window.location.href = "http://localhost:3001/users";

      },
    }
  });
}
