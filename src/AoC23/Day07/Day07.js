const { getData } = require('../../Utils/globalFunctions.js');
const { sum } = require('../../Utils/maths.js');

// https://adventofcode.com/2023/day/7
exports.formatData = async (filepath) => {
  let data = await getData(filepath);

  data = data.split('\n').map((e) => {
    let [hand, bid] = e.split(' ');
    bid = parseInt(bid, 10);
    return {
      hand: hand,
      bid: bid,
    };
  });
  return data;
};

// Hand Types
const FIVE_OF_A_KIND = 'FIVE_OF_A_KIND'; // all 5 share label
const FOUR_OF_A_KIND = 'FOUR_OF_A_KIND'; // 4 share label, 1 w/distinct label
const FULL_HOUSE = 'FULL_HOUSE'; // 3 share label, 2 share 2nd label
const THREE_OF_A_KIND = 'THREE_OF_A_KIND'; // 3 share label, 2 w/distinct labels
const TWO_PAIR = 'TWO_PAIR'; // 2 share label, 2 share 2nd label
const ONE_PAIR = 'ONE_PAIR'; // 2 share label, 3 w/distinct labels
const HIGH_CARD = 'HIGH_CARD'; // all 5 have distinct labels

// Part One

// Gets unique characters in a string
const getDistinct = (str) => {
  let s = new Set();
  for (const char of str) {
    s.add(char);
  }
  return s;
};

// Counts instances of characters in a string
const countOccurrence = (char, str) => {
  return str.match(new RegExp(char, 'g')).length;
};

exports.getHandType = (hand) => {
  const distinctChars = getDistinct(hand);
  let charOccurrences = [];

  switch (distinctChars.size) {
    case 1:
      return FIVE_OF_A_KIND;
    case 2:
      for (const char of distinctChars) {
        charOccurrences.push(countOccurrence(char, hand));
      }
      return charOccurrences.includes(4) ? FOUR_OF_A_KIND : FULL_HOUSE;
    case 3:
      for (const char of distinctChars) {
        charOccurrences.push(countOccurrence(char, hand));
      }
      return charOccurrences.includes(3) ? THREE_OF_A_KIND : TWO_PAIR;
    case 4:
      return ONE_PAIR;
    case 5:
      return HIGH_CARD;
  }
};

exports.compareHandStrengthPartOne = (a, b) => {
  // Order hands first by type

  // Hand type, strongest to weakest:
  const handType = [
    FIVE_OF_A_KIND, // all 5 share label
    FOUR_OF_A_KIND, // 4 share label, 1 w/distinct label
    FULL_HOUSE, // 3 share label, 2 share 2nd label
    THREE_OF_A_KIND, // 3 share label, 2 w/distinct labels
    TWO_PAIR, // 2 share label, 2 share 2nd label
    ONE_PAIR, // 2 share label, 3 w/distinct labels
    HIGH_CARD, // all 5 have distinct labels
  ];

  const a_handTypeIndex = handType.indexOf(this.getHandType(a.hand));
  const b_handTypeIndex = handType.indexOf(this.getHandType(b.hand));

  if (a_handTypeIndex < b_handTypeIndex) {
    return -1;
  }
  if (a_handTypeIndex > b_handTypeIndex) {
    return 1;
  }
  if (a_handTypeIndex === b_handTypeIndex) {
    // If two hands same type, secondary order rule:

    // Card labels, strongest to weakest:
    const cardLabel = [
      'A',
      'K',
      'Q',
      'J',
      'T',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
    ];

    // Comare cards in each hand, in order
    // If they're different, the hand with the card with the stronger label is the stronger hand
    // Otherwise move on to the next card in each hand
    for (let i = 0; i < a.hand.length; i++) {
      let a_charLabelIndex = cardLabel.indexOf(a.hand[i]);
      let b_charLabelIndex = cardLabel.indexOf(b.hand[i]);

      if (a_charLabelIndex < b_charLabelIndex) {
        return -1;
      }
      if (a_charLabelIndex > b_charLabelIndex) {
        return 1;
      }
    }
  }
  return 0;
};

exports.partOne = async (input) => {
  // Goal to order hands based on the strength of each hand
  // A hand consists of 5 cards
  // each card has exactly one label, and each hand has exactly one type

  // sort hands by hand strength
  let sortedHands = input.sort(exports.compareHandStrengthPartOne);

  // each hand wins an amount equal to bid multipled by its rank
  // weakest hand is rank 1, second-weakest gets rank 2, etc.
  let winnings = sortedHands.map((hand, index) => {
    const rank = sortedHands.length - index;
    return rank * hand.bid;
  });

  // what are the total winnings?
  return sum(winnings);
};

// Part Two

// J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible
// J cards are now the weakest individual cards

exports.partTwo = async (input) => {
  return input;
};

exports.solve = async () => {
  const dataPath = require.resolve(
    '../../../src/AoC23/puzzleInputs/Day07Input.txt'
  );

  try {
    const formattedData = await exports.formatData(dataPath);
    const results = await Promise.all([
      await exports.partOne(formattedData),
      //await exports.partTwo(formattedData),
    ]);
    console.log(results);
    return results;
  } catch (err) {
    console.log(err);
  }
};

exports.solve();
