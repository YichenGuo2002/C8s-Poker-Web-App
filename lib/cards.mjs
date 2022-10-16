// cards.mjs
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const range = (...sta) =>{

    let start = 0;
    let inc = 1;
    let end = 0;
    if (sta.length === 1){
        end = sta[0];
    }
    else if (sta.length === 2){
        start = sta[0];
        end = sta[1];
    }
    else{
        start = sta[0];
        end = sta[1];
        inc = sta[2];
    }
    let resultArray = Array();
    for (let i = start;i < end; i = i + inc){
        resultArray.push(i);
    }
    return resultArray;
};

export const generateDeck = () =>{
    let cardArray = Array();
    Object.values(suits).forEach((eachSuit)=>{
        ranks.forEach((eachRank)=>{
            cardArray.push({suit:eachSuit, rank:eachRank});
        });
    });
    return cardArray;
};

export const shuffle = (deck) =>{
    let currentIndex = deck.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [deck[currentIndex], deck[randomIndex]] = [
      deck[randomIndex], deck[currentIndex]];
  }

  return deck;
  /*I used the algorithm from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
};

export const draw = (cardsArray, n = 1) =>{
    let newArray = cardsArray.slice(0, cardsArray.length - n);
    let removedElements = cardsArray.slice(-n);
    return Array(newArray, removedElements);
};

export const deal = (cardsArray, numHands = 2, cardsPerHand = 5) =>{
    let deckArray = cardsArray.slice(0, cardsArray.length - numHands * cardsPerHand);
    let handsArray = Array();
    let eachHand;
    for (let handsDraw = 0; handsDraw < numHands; handsDraw++){
        eachHand = Array();
        for (let cardsDraw = 0; cardsDraw < cardsPerHand; cardsDraw++){
            eachHand.push(cardsArray[cardsArray.length - 1 - handsDraw * cardsPerHand - cardsDraw]);
        };
        handsArray.push(eachHand);
    };
    return {
        deck: deckArray, hands: handsArray
    }

};

export const handToString = (hand, sep = '  ', numbers = false) =>{
    let cardString = "";
        if(!hand) return "";
        if(numbers){
            let cardNumber = 1;
            hand.forEach((eachCard) =>{
                cardString += cardNumber + ":" + eachCard.rank + eachCard.suit + sep;
                cardNumber++;
            })
        }
        else{
            hand.forEach((eachCardObject) =>{
                cardString += eachCardObject.rank + eachCardObject.suit + sep;
            })
        }  
        return cardString.substring(0, cardString.length -1); 
};

export const matchesAnyProperty = (obj, matchObj) =>{
    let propertyPair = false;
    Object.keys(obj).forEach((eachKey) =>{
        if(obj[eachKey] === matchObj[eachKey]){
            propertyPair = true;
        }
    });
    if(propertyPair) return true;
    else return false;

    /* I learned from https://stackoverflow.com/questions/24952112/return-statement-in-foreach-wont-stop-execution-of-function#:~:text=It's%20because%20you're%20passing,exit%20the%20calling%20function%20addPacking%20.
    that return true in the function wrapped inside forEach() function will only stop the function inside instead of terminating the whole matchesAnyProperty() function.
    Therefore I used a trick from the website.*/
};

export const drawUntilPlayable = (deck, matchObject) =>{
    let elseCard;
    let foundCard;
    let ableToFound = false;
    let i;
    for (i = deck.length -1 ; i >= 0; i--){
        if(deck[i].rank === matchObject.rank || deck[i].suit === matchObject.suit || deck[i].rank === 8){
            ableToFound = true;
            break;
        }
    };
    if(ableToFound){
        elseCard = deck.slice(0, i);
        foundCard = deck.slice(i);
        foundCard.reverse();
    }
    else{
        elseCard = Array();
        foundCard = [...deck];
        foundCard.reverse();
    };
    return Array(elseCard, foundCard);
};

export const checkPlayable = (obj, matchObj) =>{
    let propertyPair = false;
    Object.keys(obj).forEach((eachKey) =>{
        if(Object.keys(matchObj).includes(eachKey)){
            propertyPair = true;
        }
    });
    Object.values(obj).forEach((eachValue) =>{
        if(Object.values(matchObj).includes(eachValue)){
            propertyPair = true;
        }
    });
    if(propertyPair) return true;
    else return false;

    /* I learned from https://stackoverflow.com/questions/24952112/return-statement-in-foreach-wont-stop-execution-of-function#:~:text=It's%20because%20you're%20passing,exit%20the%20calling%20function%20addPacking%20.
    that return true in the function wrapped inside forEach() function will only stop the function inside instead of terminating the whole matchesAnyProperty() function.
    Therefore I used a trick from the website.*/
};

export const playerHandToString = (hand, sep = '  ', numbers = false) =>{
    let cardString = "";
        if(!hand) return "";
        if(numbers){
            let cardNumber = 1;
            hand.forEach((eachCardObject) =>{
                eachCardObject.forEach((eachCard) =>{
                cardString += cardNumber + ":" + eachCard.rank + eachCard.suit + sep;
                cardNumber++;
                })
            })
        }
        else{
            hand.forEach((eachCardObject) =>{
                eachCardObject.forEach((eachCardObject) =>{
                cardString += eachCardObject.rank + eachCardObject.suit + sep;
                })
            })
        }  
        return cardString.substring(0, cardString.length -1); 
};

export const removeHandCard = (hand, numb) =>{
    let cardNumber = 1;
    hand.forEach((eachCardObject) =>{
        eachCardObject.forEach((eachCard) =>{
        if(cardNumber === numb) return eachCard;
        cardNumber++;
        })
    })
};