const path = require('path');
const { getData } = require('../../Utils/globalFunctions.js');

// https://adventofcode.com/2023/day/4

async function formatData(filepath) {
  let data = await getData(filepath);
  return data
    .split('\n')
    .map((card) => card.replaceAll('  ', ' ').split(/[:|]/))
    .map((card) => {
      card.shift();
      return card.map((stringOfNumbers) => stringOfNumbers.trim().split(' '));
    });
}

// Part One

function getPoints(number, length) {
  if (length === 0) {
    return 0;
  } else if (length === 1) {
    return number;
  } else {
    const newNumber = number * 2;
    const newLength = length - 1;
    if (newLength > 0) {
      return getPoints(newNumber, newLength);
    } else {
      return newNumber;
    }
  }
}

function getMatchingNumbers(card) {
  let matchingNums = [];
  card[0].forEach((num) => {
    if (card[1].includes(num)) {
      matchingNums.push(Number(num));
    }
  });
  return matchingNums;
}

async function partOne(input) {
  const matchingNumbers = input.map((card) => getMatchingNumbers(card));
  const points = matchingNumbers.map((card) => getPoints(1, card.length));
  return points.reduce((a, b) => a + b);
}

// Part Two
function getWinningCards(input) {
  let winningCards = new Map();

  input.forEach((card, index) => {
    let numMatches = 0;

    card[0].forEach((num) => {
      if (card[1].includes(num)) {
        numMatches += 1;
      }
    });
    if (numMatches > 0) {
      winningCards.set(`Card ${index + 1}`, {
        cardIndex: index,
        numMatches: numMatches,
      });
    }
  });
  return winningCards;
}

function getCardStats(input) {
  let cardsMap = new Map();

  input.forEach((card, index) => {
    cardsMap.set(`Card ${index + 1}`, 1);
  });
  return cardsMap;
}

function makeCopies(map, value, cardNum, numMatches) {
  let newKey = `Card ${cardNum + 1}`;

  if (map.has(newKey) && numMatches > 0) {
    map.set(newKey, map.get(newKey) + value);

    const newCardNum = cardNum + 1;
    const remainingMatches = numMatches - 1;

    makeCopies(map, value, newCardNum, remainingMatches);
  } else {
    return;
  }
}

function getTotalCards(cardsMap, winningCards) {
  for (const [key, value] of cardsMap) {
    if (winningCards.has(key)) {
      makeCopies(
        cardsMap,
        value,
        winningCards.get(key).cardIndex + 1,
        winningCards.get(key).numMatches
      );
    }
  }
}
async function partTwo(input) {
  const scratchCards = getCardStats(input);
  const winningCards = getWinningCards(input);
  getTotalCards(scratchCards, winningCards);
  return Array.from(scratchCards.values()).reduce((a, b) => a + b);
}

async function solve() {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day04Input.txt'
  );

  try {
    const formattedData = await formatData(dataPath);
    const results = await Promise.all([
      await partOne(formattedData),
      await partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
}

solve();

module.exports = {
  formatData,
  getPoints,
  getMatchingNumbers,
  partOne,
  getWinningCards,
  getCardStats,
  makeCopies,
  getTotalCards,
  partTwo,
  solve,
};

/* Kevin Talley's answer that I want to remember b/c it's got lots of neat l'il tidbits in it

  let input = data.split('\n')

  let total = 0;

  let cardCount = {};
  for (let i = 1; i <= input.length; i++) {
    cardCount[i] = 1;
  }

  input.forEach(card => {
    let [cardId, numbers] = card.split(':');
    let [winners, drawn] = numbers.split('|');

    cardId = parseInt(cardId.replace(/Card\s/, ''), 10);
    winners = winners.trim().split(' ').map(n => parseInt(n, 10)).filter(r => !isNaN(r));
    drawn = drawn.trim().split(' ').map(n => parseInt(n, 10)).filter(r => !isNaN(r));
    const matches = winners.filter(n => drawn.includes(n));

    if (matches.length) {
      total += Math.pow(2, matches.length - 1);

      for (let t = 0; t < cardCount[cardId]; t++) {
        for (let i = cardId; i < cardId + matches.length; i++) {
          cardCount[i + 1] += 1;
        }
      }
    }
  });
*/
