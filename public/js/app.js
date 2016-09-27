$(function() {


  $homepage = $('#homepage-section')
  $login = $('#login-section')
  $register = $('#register-section')
  $game = $('#game-section')

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

  $('#login-button').click(function(e) {
    // e.preventdefault();
    var username = $('#username').val();
    var password = $('#password').val();
    loginRequest(username, password);
  })

  $('#bet').click(function() {
    console.log('Raise Button');
  })
  $('#check').click(function() {
    console.log('Check Button');
  })
  $('#fold').click(function() {
    console.log('Fold button');
  })
  $('#call').click(function() {
    console.log('Call button');
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
        // alert('Success');

        $login.hide();
        $register.hide();
        $game.hide();
        $homepage.show();
        // window.location.href = "http://localhost:3001";
        $('#custom-msg').append('<h1>Welcome, ' + username + '</h1>')

      },
      400: function(response) {
        alert('Unsuccessful');
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
  $.ajax({
    url: "http://localhost:3000/api/games/new",
    type: 'POST',
    async: false,
    statusCode: {
      200: function(response) {
        // player 1 card 1
        var cardColor = getCardColour(response[0][0].suit)
        var suitType = getSuitType(response[0][0].suit);
        var cardValue = getCardValue(response[0][0].value);
        $('#left').append('<div class="card" id="' + cardColor + '">' +
          '<p class = "suit">' + suitType + '</p>' +
          '<p class="cardtype"> ' + cardValue + '</p>' +
          '<p class="upsidedown suit">' + suitType + '</p>' +
          '</div>'
        );
        // player 1 card 2
        cardColor = getCardColour(response[0][1].suit)
        suitType = getSuitType(response[0][1].suit);
        cardValue = getCardValue(response[0][1].value);
        $('#left').append('<div class="card" id="' + cardColor + '">' +
          '<p class = "suit">' + suitType + '</p>' +
          '<p class="cardtype"> ' + cardValue + '</p>' +
          '<p class="upsidedown suit">' + suitType + '</p>' +
          '</div>'
        );
      }
    }
  });
}
