var shuffledDeck = [];
var computerCards = [];
var players = [];
var gameMode = `PLAYERS`;
var hitOrPassCounter = 0;
//// Hit or stand functionality DONE
//// implement a wager calculation function
//// Ace functionality to be implemented in the cards
// complete the whole game flow
//// make a function that dispalys the current hands
/// make a game condition function that can be applied to each hand and then
/// make another function that will eliminate the hand based on the winning condition
var main = function (input) {
  var myOutputValue = " ";
  if (gameMode == `PLAYERS`) {
    calNumbPlayers(input);
    startOfGame();
    gameMode = `PLAYER1`;
    return (myOutputValue = `Player1 please press "hit" or "pass" <br> ${showHands(
      hitOrPassCounter
    )}`);
  }
  /////can i move this whole chunk into a function??
  // moves into players hit or pass turn through game mode
  if (gameMode == `PLAYER1` && input == `hit`) {
    var hit = shuffledDeck.pop();
    players[hitOrPassCounter].cards.push(hit);
    myOutputValue = `PLAYER1 please press "hit" or "pass" <br> ${showHands(
      hitOrPassCounter
    )}`;
    calPlayerSum(players);
    return myOutputValue;
  } else if (gameMode == `PLAYER1` && input == `pass`) {
    hitOrPassCounter++;
    gameMode = `PLAYER${hitOrPassCounter + 1}`;
    myOutputValue = `Player${
      hitOrPassCounter + 1
    } please press "hit" or "pass" <br> ${showHands(hitOrPassCounter)}`;
    return myOutputValue;
  }
  //will keep on moving to the next player indefinitely  until all players have done their turn
  if (gameMode == `PLAYER${hitOrPassCounter + 1}` && input == `hit`) {
    var hit = shuffledDeck.pop();
    players[hitOrPassCounter].cards.push(hit);
    myOutputValue = `Player${
      hitOrPassCounter + 1
    } please press "hit" or "pass" <br> ${showHands(hitOrPassCounter)}`;
    calPlayerSum(players);
    return myOutputValue;
  } else if (gameMode == `PLAYER${hitOrPassCounter + 1}` && input == `pass`) {
    gameMode = `PLAYER${hitOrPassCounter + 1}`;
    hitOrPassCounter++;
    myOutputValue = `Player${
      hitOrPassCounter + 1
    } please press "hit" or "pass" <br> ${showHands(hitOrPassCounter)}`;
    return myOutputValue;
  }
  ///// it cant showHands and runs into an error here
  ///// because the hitorpass counter becomes more than then players.length and showcards has no index at that location
  //will stop the players turns once all players have hit or pass
  if (hitOrPassCounter >= players.length) {
    // while computerCards are lesser than 17 it will draw a card
    while (calCompSum(computerCards) < 17) {
      var computerDraw = shuffledDeck.pop();
      computerCards.push(computerDraw);
    }
    gameMode = `COMPUTERTURN`;
    myOutputValue = `All players have played their turn, the computer will now select. Press submit to reveal hands`;
  }
  return myOutputValue;
};

var showHands = function (hitOrPassCounter) {
  var myOutputValue = ` `;
  var playerCardsLength = players[hitOrPassCounter].cards.length;
  var playerCards = players[hitOrPassCounter].cards;
  var counter = 0;
  console.log(counter);
  while (counter < playerCardsLength) {
    myOutputValue = `You got ${playerCards[counter].name} of ${playerCards[counter].suit} <br>  ${myOutputValue}`;
    counter++;
  }
  calPlayerSum(players);
  return myOutputValue + `<br> Your total is: ${players[hitOrPassCounter].sum}`;
};
//making player objects in global variable to store player information
/////// it works fine when i give it a number but it just doesnt PUSH the card to the array on top
var calNumbPlayers = function (input) {
  var numbOfPlayers = input;
  var counter = 1;
  while (counter <= numbOfPlayers) {
    var playerName = `Player${counter}`;
    var card = [];
    var wins = 0;
    var wager = 100;
    var sum = 0;
    var player = {
      name: playerName,
      cards: card,
      wins: wins,
      wager: wager,
      sum: sum,
    };
    players.push(player);
    console.log(players);
    counter++;
  }
  return Number(players.length);
};
// making deck and drawing two cards each for player and computer
///// Need to distribute based on the number of players
var startOfGame = function () {
  var totalPlayers = players.length;
  console.log(totalPlayers);
  //make and shuffle a deck
  var shuffledDeck = shuffleDeck();
  // draws a card for each player
  var outerCounter = 0;
  while (outerCounter < totalPlayers) {
    var counter = 0;
    while (counter < 2) {
      var playerDraw = shuffledDeck.pop();
      console.log(playerDraw);
      players[outerCounter].cards.push(playerDraw);
      counter++;
    }
    outerCounter++;
  }
  //draws a card for the computer
  var computerCounter = 0;
  while (computerCounter < 2) {
    var computerDraw = shuffledDeck.pop();
    console.log(computerDraw);
    computerCards.push(computerDraw);
    computerCounter++;
  }
  // calculates and pushes the sum into players array
  calPlayerSum(players);
};

// calculates the sum for each player based on number of players and number of cards each player has
// pushes the sums into the players array
var calPlayerSum = function (players) {
  var playerCounter = 0;
  // runs as many times as there are players
  while (playerCounter < players.length) {
    // for each player need to make a function that calcuates the sum of their cards
    var playerCards = 0;
    var playerSum = 0;
    // run as many times as there are cards of each player
    while (playerCards < players[playerCounter].cards.length) {
      // adds the sum everytime it runs
      playerSum = playerSum + players[playerCounter].cards[playerCards].rank;
      playerCards++;
    }
    // changing the SUM in players array
    players[playerCounter]["sum"] = playerSum;
    playerCounter++;
  }
};
// calculates the sum for comp
var calCompSum = function (computerCards) {
  var computerCounter = 0;
  var computerSum = 0;
  while (computerCounter < computerCards.length) {
    computerSum += computerCards[computerCounter].rank;
    computerCounter++;
  }
  return computerSum;
};

// winning conditions
/* 
Player wins if:
1. player 21
2. computer bust
3. player is closer to 21 then the computer
Player loses if:
1. Comp 21
2. Player bust
3. Comp closer to 21 then player
*/

// need to make the winning condition to accept various cards and compare them all to the computers hand
// see if any burst or any win immediately
// in that essence need to make a function that just takes the player hand and apply game condiditons into them

var calWinningCond = function () {
  var myOutputValue = ``;
  /// need to redo this programme to accept players array
  var computerTotal = calCompSum();
  //  take the sum of the players and evaluate these winning conditions against the computer
  // so need to run this the number of times that there are players
  var counter = 0;
  while (counter < players.length) {
    if (playerTotal < 21 && computerTotal > 21) {
      myOutputValue = `You won `;
    } else if (playerTotal > 21) {
      myOutputValue = `You Bust`;
    } else if (
      (playerTotal < 21 && computerTotal < 21 && computerTotal > playerTotal) ||
      computerTotal == 21
    ) {
      myOutputValue = `You lost`;
    }
    myOutputValue = counter++;
  }
  return myOutputValue;
};

var makeDeck = function () {
  var deck = [];
  var suitCounter = 0;
  var suits = [
    "Diamonds\u{1F48E}",
    "Clubs\u{1F340}",
    "Hearts\u{1F497}",
    "Spades\u2660\uFE0F",
  ];
  while (suitCounter < suits.length) {
    var currentSuit = suits[suitCounter];
    var counter = 1;
    while (counter < 14) {
      var currentRank = counter;
      if (counter == 1) {
        cardName = "ACE😎";
        currentRank = 11;
      } else if (counter == 11) {
        cardName = "JACK👶";
        currentRank = 10;
      } else if (counter == 12) {
        cardName = "QUEEN👸";
        currentRank = 10;
      } else if (counter == 13) {
        cardName = "KING🤴";
        currentRank = 10;
      } else cardName = counter;
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };
      deck.push(card);
      counter++;
    }
    suitCounter++;
  }
  return deck;
};

// get a random number from 0 to 51, to find random index(card)
var getRandomIndex = function () {
  var randomNumber = Math.floor(Math.random() * 52);
  return randomNumber;
};

//creates a deck and shuffles it , return a shuffled deck which is pushed into the global variable shuffledDeck
var shuffleDeck = function () {
  shuffledDeck = makeDeck();
  counter = 0;
  while (counter < shuffledDeck.length) {
    var randomNumb = getRandomIndex();
    currentCard = shuffledDeck[counter];
    randomCard = shuffledDeck[randomNumb];
    shuffledDeck[counter] = randomCard;
    shuffledDeck[randomNumb] = currentCard;
    counter++;
  }
  return shuffledDeck;
};

// // making a function to find hit or miss
// // only shows cards of the player selected
// var calHitOrMiss = function (input) {
//   var myOutputValue = ``;
//   //if game mode is in player 1 it will
//   if (gameMode == `PLAYER1` && input == `hit`) {
//     var hit = shuffledDeck.pop();
//     players[hitOrPassCounter].cards.push(hit);
//     /////// why isnt it returning this myoutputvalue??
//     myOutputValue = `PLAYER1 please press "hit" or "pass"`;
//     return myOutputValue;
//   } else if (gameMode == `PLAYER1` && input == `pass`) {
//     hitOrPassCounter++;
//     gameMode = `Player${hitOrPassCounter + 1}`;
//     myOutputValue = `Player${
//       hitOrPassCounter + 1
//     } please press "hit" or "pass"`;
//     return myOutputValue;
//   }
//   if (gameMode == `PLAYER${hitOrPassCounter + 1}` && input == `hit`) {
//     var hit = shuffledDeck.pop();
//     players[hitOrPassCounter].cards.push(hit);
//     myOutputValue = `Player${
//       hitOrPassCounter + 1
//     } please press "hit" or "pass"`;
//     return myOutputValue;
//   } else if (gameMode == `PLAYER${hitOrPassCounter}` && input == `pass`) {
//     hitOrPassCounter++;
//     gameMode = `Player${hitOrPassCounter}`;
//     myOutputValue = `Player${
//       hitOrPassCounter + 1
//     } please press "hit" or "pass"`;
//     return myOutputValue;
//   }
// };
