var shuffledDeck = [];
var computerCards = [];
var players = [];
var gameMode = `PLAYERS`;
var hitOrPassCounter = 0;
var wagerCounter = 0;
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
  }
  if (gameMode == `PLAYER${hitOrPassCounter + 1}` && input == `pass`) {
    // ensures that the hitorpasscounter stops at the player.length index for the cards
    while (hitOrPassCounter < players.length - 1) {
      hitOrPassCounter++;
      gameMode = `PLAYER${hitOrPassCounter + 1}`;
      ////// cant showcards as the hitorpasscounter is beyond the number of players
      ///// complications is because this code is changing based on the number of players thats why i cant just remove the showcards form the pass output value
      /////// i can just hack and remove the showcards form the pass statement but it will not show the final players cards
      myOutputValue = `Player${
        hitOrPassCounter + 1
      } please press "hit" or "pass" <br> ${showHands(hitOrPassCounter)}`;
      return myOutputValue;
    }
  }
  if (
    hitOrPassCounter >= players.length - 1 &&
    gameMode == `PLAYER${hitOrPassCounter + 1}`
  ) {
    // while computerCards are lesser than 17 it will draw a card
    while (calCompSum(computerCards) < 17) {
      var computerDraw = shuffledDeck.pop();
      computerCards.push(computerDraw);
    }
    gameMode = `CALCULATING`;
    myOutputValue = `All players have played their turn, the computer will now select. Press submit to reveal hands`;
    return myOutputValue;
  }
  if (gameMode == `CALCULATING`) {
    var computerHand = showCompHands(computerCards);
    console.log(computerHand);
    var myOutputValue = `Computer got <br> ${computerHand}`;
    var counter = 0;
    while (counter < players.length) {
      var calculating = ` Player ${counter + 1}  You got ${
        players[counter].sum
      } Result: ${calWinningCond(counter)} 
      `;
      console.log(calculating);
      myOutputValue = `${myOutputValue}  <br>  ${calculating} `;
      counter++;
    }
    gameMode = `RESTART`;
    return `${myOutputValue} <br> Input "restart" to restart the game`;
  }
  if (gameMode == `RESTART` && input == `restart`) {
    gameMode = `PLAYERS`;
    shuffledDeck = [];
    computerCards = [];
    players = [];
    hitOrPassCounter = 0;
    myOutputValue = `Please input the number of players to restart`;
  }
  return myOutputValue;
};

var showHands = function (hitOrPassCounter) {
  var myOutputValue = ` `;
  var playerCardsLength = players[hitOrPassCounter].cards.length;
  var playerCards = players[hitOrPassCounter].cards;
  var counter = 0;
  while (counter < playerCardsLength) {
    myOutputValue = `You got ${playerCards[counter].name} of ${playerCards[counter].suit} <br>  ${myOutputValue}`;
    counter++;
  }
  calPlayerSum(players);
  return myOutputValue + `<br> Your total is: ${players[hitOrPassCounter].sum}`;
};
var showCompHands = function (computerCards) {
  var myOutputValue = ` `;
  var computerCardsLength = computerCards.length;
  var counter = 0;
  while (counter < computerCardsLength) {
    myOutputValue = `${computerCards[counter].name} of ${computerCards[counter].suit} <br>  ${myOutputValue}`;
    counter++;
  }
  return (
    myOutputValue + `<br> Computers total is: ${calCompSum(computerCards)}`
  );
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
var calCompSum = function (noCompCards) {
  var computerCounter = 0;
  var computerSum = 0;
  var totalCards = computerCards.length;
  while (computerCounter < totalCards) {
    computerSum += computerCards[computerCounter].rank;
    computerCounter++;
  }
  return computerSum;
};

// computer more than 21 they bust
// player > 21 they bust
// player && computer < 21 then can compare them
var calWinningCond = function (playerIndex) {
  var myOutputValue = ` `;
  calPlayerSum(players);
  var playerTotal = players[playerIndex].sum;
  var computerTotal = calCompSum();
  console.log(playerTotal);
  console.log(computerTotal);
  if (computerTotal > 21) {
    myOutputValue = `Computer Bust`;
  } else if (playerTotal > 21) {
    myOutputValue = `Bust`;
  } else if (playerTotal == computerTotal) {
    myOutputValue = `Draw`;
  } else if (playerTotal < computerTotal) {
    myOutputValue = `Lost`;
  } else if (playerTotal > computerTotal) {
    myOutputValue = `Win`;
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
