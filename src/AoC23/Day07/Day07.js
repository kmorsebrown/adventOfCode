import { getData } from '../../Utils/globalFunctions.js';
import { sum } from '../../Utils/maths.js';

// https://adventofcode.com/2023/day/7
export async function formatData(filepath) {
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

export function getHandType(hand) {
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

export function compareHandStrengthPartOne(a, b) {
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

  const a_handTypeIndex = handType.indexOf(getHandType(a.hand));
  const b_handTypeIndex = handType.indexOf(getHandType(b.hand));

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

export async function partOne(input) {
  // Goal to order hands based on the strength of each hand
  // A hand consists of 5 cards
  // each card has exactly one label, and each hand has exactly one type

  // sort hands by hand strength
  let sortedHands = input.sort(compareHandStrengthPartOne);

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
const getDistinctAndCount = (str) => {
  let m = new Map();
  for (const char of str) {
    if (!m.has(char)) {
      const count = countOccurrence(char, str);
      m.set(char, count);
    }
  }
  return m;
};
export function getHandTypeWithJokers(hand) {
  const distinctChars = getDistinctAndCount(hand);
  const charOccurrences = Array.from(distinctChars.values());

  switch (distinctChars.size) {
    case 1: // hand is 5:0 ratio
      return FIVE_OF_A_KIND;
    case 2: // hand is 4:1 or 3:2 ratio
      if (distinctChars.has('J')) {
        // if 4:1 && 4 or 1 Js => 5
        // if 3:2 && 3 or 2 Js => 5
        return FIVE_OF_A_KIND;
      }

      // 4:1 or 3:2
      return charOccurrences.includes(4) ? FOUR_OF_A_KIND : FULL_HOUSE;

    case 3: // hand is 3:1:1 or 2:2:1 ratio
      if (distinctChars.has('J')) {
        // if 3:1:1 && 3 or 1 Js => 4:1
        if (charOccurrences.includes(3)) {
          return FOUR_OF_A_KIND;
        }

        // if 2:2:1 && 2 Js => 4:1
        if (distinctChars.get('J') === 2) {
          return FOUR_OF_A_KIND;
        }

        // if 2:2:1 && 1 J => 3:2
        return FULL_HOUSE;
      }
      // 3:1:1 or 2:2:1
      return charOccurrences.includes(3) ? THREE_OF_A_KIND : TWO_PAIR;
    case 4: // hand is 2:1:1:1
      if (distinctChars.has('J')) {
        // if 2:1:1:1 && 2 or 1 Js => 3:1:1
        return THREE_OF_A_KIND;
      }

      // 2:1:1:1
      return ONE_PAIR;

    case 5: // hand is 1:1:1:1:1 ratio
      if (distinctChars.has('J')) {
        // if 1:1:1:1:1 && 1 J => 2:1:1:1
        return ONE_PAIR;
      }
      return HIGH_CARD;
  }
};

export function compareHandStrengthWithJokers(a, b) {
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

  const a_handTypeIndex = handType.indexOf(
    getHandTypeWithJokers(a.hand)
  );
  const b_handTypeIndex = handType.indexOf(
    getHandTypeWithJokers(b.hand)
  );

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
      'T',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
      'J',
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
export async function partTwo(input) {
  // Goal to order hands based on the strength of each hand
  // A hand consists of 5 cards
  // each card has exactly one label, and each hand has exactly one type

  // sort hands by hand strength
  let sortedHands = input.sort(compareHandStrengthWithJokers);

  // each hand wins an amount equal to bid multipled by its rank
  // weakest hand is rank 1, second-weakest gets rank 2, etc.
  let winnings = sortedHands.map((hand, index) => {
    const rank = sortedHands.length - index;
    return rank * hand.bid;
  });

  // what are the total winnings?
  return sum(winnings);
};

export async function solve() {
  const dataPath = new URL('../puzzleInputs/Day07Input.txt', import.meta.url).pathname;

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
};

