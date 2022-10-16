// game.mjs
/*
 import * as cards from '../lib/cards.mjs';
 import {question} from 'readline-sync';
 import clear from 'clear';
 import {readFile} from 'fs';
 import os from 'os';
 import { brotliDecompressSync } from 'zlib';
 import { start } from 'repl';

 const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
 let initialDeck, initialPlayerHand, initialComputerHand, initialDiscardPile, initialNextPlay;

 if(process.argv[2]){
    fetch(process.argv[2])
    .then((response) => JSON.parse(response))
    .then((jsonDeck) =>{
        initialDeck = jsonDeck.deck;
        initialPlayerHand = jsonDeck.playerHand;
        initialComputerHand = jsonDeck.computerHand;
        initialDiscardPile = jsonDeck.discardPile;
        initialNextPlay = jsonDeck.nextPlay;
    })

    //I used the fetch() function from https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
 }
 else{
    let initialDeal = cards.deal(cards.shuffle(cards.generateDeck()));
    initialDeck = initialDeal.deck;
    initialPlayerHand = initialDeal.hands;
    initialDiscardPile = Array();

    let drawResults = cards.draw(initialDeck, 1);
    initialDeck = drawResults[0];
    initialNextPlay = drawResults[1];
    initialDiscardPile.push(initialNextPlay);

    while(initialNextPlay.rank === 8){
      drawResults = cards.draw(initialDeck, 1);
      initialDeck = drawResults[0];
      initialNextPlay = drawResults[1];
      initialDiscardPile.push(initialNextPlay);
    };
 };

let crazyEight = false;
*/
 const printGameState = () =>{
   let gameState = `              
   CR🤪ZY 8's
   -----------------------------------------------
   Next suit/rank to play: ➡️  ${cards.handToString(initialNextPlay)}  ⬅️
   -----------------------------------------------
   Top of discard pile: ${cards.handToString(initialNextPlay)}
   Number of cards left in deck: ${initialDeck.length}
   -----------------------------------------------
   🤖✋ (computer hand): ${cards.playerHandToString(initialComputerHand)}
   😊✋ (player hand): ${cards.playerHandToString(initialPlayerHand)}
   -----------------------------------------------`
   console.log(gameState);
 }
 

 const playable = () =>{
   let playableState = `
   😊 Player's turn...
   Here are your playable cards:
   ${cards.playerHandToString(initialPlayerHand, os.EOL, true)}`;
   console.log(playableState);

   let cardNumber = question("Enter the number of the card you would like to play");
   return cardNumber;
 }

 const notPlayable = () =>{
   let initialDraw = cards.drawUntilPlayable(initialDeck, initialNextPlay);
   initialDeck = initialDraw[0];
   initialDraw[1].forEach((eachCard) =>{
      initialDiscardPile.push(eachCard);
   })
   initialNextPlay = initialDraw[1].slice(-1);

   let notPayableState = `
   😊 Player's turn...
   😔 You have no playable cards
   Press ENTER to draw cards until matching: ${cards.playerHandToString(initialNextPlay, ", ")}, 8
   .
   Cards drawn: ${cards.handToString(initialDraw[1])}
   Card played: ${cards.handToString(initialDraw[1].slice(-1))}`
   console.log(notPayableState);
   question(' Press ENTER to continue');
 };

 const playEight = () =>{
   let playEightState = `CRAZY EIGHTS! You played an 8 - choose a suit
   1: ♠️
   2: ❤️
   3: ♣️
   4: ♦️`
   console.log(playEightState);
   return question('"Enter the suit number you would like to choose');
 }

 const computerTurn = () =>{
   let computerState = `🤖 Computer's turn...`
   console.log(computerState);

   if(cards.checkPlayable(initialComputerHand, initialNextPlay)){
      computerState = `Computer's hand is ${cards.playerHandToString(initialComputerHand, os.EOL, true)}
      `
      console.log(computerState);
      question(' Press ENTER to continue');
   }
   else{ 
      let initialDraw = cards.drawUntilPlayable(initialDeck, initialNextPlay);
      initialDeck = initialDraw[0];
      initialDraw[1].forEach((eachCard) =>{
         initialDiscardPile.push(eachCard);
      })
      initialNextPlay = initialDraw[1].slice(-1);
   
      let notPayableState = `
      😔 Computer have no playable cards
      Computer draws cards until matching: ${cards.playerHandToString(initialNextPlay, ", ")}, 8
      .
      Cards drawn: ${cards.handToString(initialDraw[1])}
      Card played: ${cards.handToString(initialDraw[1].slice(-1))}`
      console.log(notPayableState);
      question(' Press ENTER to continue');}

      if(initialNextPlay.rank === 8){
      initialNextPlay = {rank:undefined , suit:suits[Math.floor(Math.random() * 4)]};
      let playEightState = `CRAZY EIGHTS! Computer played an 8 - It randomly chose ${initialNextPlay.suit} as the next suit`
      console.log(playEightState);
      question('Press ENTER to continue');
       }
 }


 console.log("hey");
 let start_bottom = document.getElementById("start");
 let next_play = document.getElementById("next-play")

 start_bottom.onclick = () =>{
  console.log("hey");
  next_play.innerText = "Hey";
  start_bottom.style.display = "none";
 }

 /*
 printGameState();
 let playerInput;
 if(playable){
   playerInput = playable();
   initialNextPlay = cards.removeHandCard(initialPlayerHand, playerInput);
 }
 else{
   notPlayable();
 }

 if(initialNextPlay.rank === 8){
   initialNextPlay = {rank:undefined , suit:suits[playEight()-1]};
 }
 clear;
 printGameState();
 computerTurn();
 clear;
 printGameState();
*/