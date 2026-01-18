import { parseStringOfInts, unique } from '../../Utils/parse.js';
import { sortDescending } from '../../Utils/maths.js';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',

  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',

  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

// Sleep function for animation
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Visualize the battery selection algorithm
const visualizeBatterySelection = async (
  bank,
  numBatteriesToTurnOn,
  animationSpeed = 200
) => {
  const uniqueJoltages = sortDescending(unique(parseStringOfInts(bank, '')));

  const onBatteries = [];
  const selectedIndices = [];
  let indexOfLastTurnedOnBattery;
  let remainingToTurnOn = numBatteriesToTurnOn;
  let stepNumber = 0;

  // Initial display
  console.log(`\n${colors.gray}Input:  ${bank}${colors.reset}`);

  // Reserve 3 lines for: trying line, visualization, and step counter
  let linesReserved = false;

  while (remainingToTurnOn > 0) {
    stepNumber++;

    // Try each joltage from highest to lowest
    for (const joltage of uniqueJoltages) {
      let indexOfFirst;

      if (typeof indexOfLastTurnedOnBattery === 'undefined') {
        indexOfFirst = bank.indexOf(joltage.toString());
      } else {
        indexOfFirst = bank.indexOf(
          joltage.toString(),
          indexOfLastTurnedOnBattery + 1
        );
      }

      // Build the trying line showing all unique joltages with current one highlighted
      const tryingLine = uniqueJoltages
        .map((j) => {
          if (j === joltage) {
            return `${colors.bgYellow}${colors.black}${j}${colors.reset}`;
          } else {
            return `${colors.dim}${j}${colors.reset}`;
          }
        })
        .join(' ');

      // Build the step text (initial - before selection)
      const partialSoFar = onBatteries.join('');
      const stepTextInitial = `${colors.gray}Step ${stepNumber}/${numBatteriesToTurnOn}  Partial: ${partialSoFar}${colors.reset}`;

      const checkingVisual = bank
        .split('')
        .map((digit, idx) => {
          if (selectedIndices.includes(idx)) {
            // Already selected - show in green
            return `${colors.green}${digit}${colors.reset}`;
          } else if (idx === indexOfFirst) {
            // Currently checking - highlight in yellow
            return `${colors.bgYellow}${colors.black}${digit}${colors.reset}`;
          } else if (idx > indexOfFirst) {
            // Everything after the selected position is the window
            return `${colors.bgBlue}${colors.white}${digit}${colors.reset}`;
          } else {
            // Already processed - show dimmed
            return `${colors.gray}${digit}${colors.reset}`;
          }
        })
        .join('');

      if (!linesReserved) {
        // First time: create the 3 lines
        process.stdout.write(tryingLine + '\n'); // trying line
        process.stdout.write('\n'); // visualization line
        process.stdout.write(stepTextInitial + '\n'); // step counter line
        linesReserved = true;
        // Cursor is now on line 4 (one past our 3 reserved lines)
      } else {
        // Update all 3 lines
        // Cursor is on line 4, move up 3 to line 1
        process.stdout.write('\x1b[3A'); // Move up to trying line
        process.stdout.write('\r\x1b[K' + tryingLine + '\n'); // Update trying line
        process.stdout.write('\r\x1b[K' + checkingVisual + '\n'); // Skip visualization line
        process.stdout.write('\r\x1b[K' + stepTextInitial + '\n'); // Update step counter
        // Cursor back at line 4
      }

      await sleep(animationSpeed / 2);

      // Check if this joltage is valid
      if (indexOfFirst === -1) {
        await sleep(animationSpeed / 3);
        continue;
      }

      if (indexOfFirst > bank.length - remainingToTurnOn) {
        // Show why this was rejected - too close to end, show reserved space
        const rejectedVisual = bank
          .split('')
          .map((digit, idx) => {
            if (selectedIndices.includes(idx)) {
              // Already selected - show in green
              return `${colors.green}${digit}${colors.reset}`;
            } else if (idx > bank.length - remainingToTurnOn) {
              // Reserved space (must leave room for remaining batteries)
              return `${colors.bgRed}${colors.white}${digit}${colors.reset}`;
            } else if (idx > (indexOfLastTurnedOnBattery ?? -1)) {
              // Window (everything after last selected but before reserved)
              return `${colors.bgBlue}${colors.white}${digit}${colors.reset}`;
            } else {
              // Already processed - show dimmed
              return `${colors.gray}${digit}${colors.reset}`;
            }
          })
          .join('');

        // Update visualization to show reserved space
        process.stdout.write('\x1b[3A'); // Move up to trying line
        process.stdout.write('\r\x1b[K' + tryingLine + '\n'); // Keep trying line
        process.stdout.write('\r\x1b[K' + rejectedVisual + '\n'); // Show reserved space
        process.stdout.write('\r\x1b[K' + stepTextInitial + '\n'); // Keep step counter
        // Cursor now at line 4

        await sleep(animationSpeed / 3);
        continue;
      }

      // This battery works! Show it with yellow highlight first
      const selectingVisual = bank
        .split('')
        .map((digit, idx) => {
          if (selectedIndices.includes(idx)) {
            // Already selected - show in green
            return `${colors.green}${digit}${colors.reset}`;
          } else if (idx === indexOfFirst) {
            // Currently selecting - highlight in yellow
            return `${colors.bgYellow}${colors.black}${digit}${colors.reset}`;
          } else if (idx > indexOfFirst) {
            // Everything after the selected position is the window
            return `${colors.bgBlue}${colors.white}${digit}${colors.reset}`;
          } else {
            // Already processed - show dimmed
            return `${colors.gray}${digit}${colors.reset}`;
          }
        })
        .join('');

      // Add this battery to selection
      onBatteries.push(joltage);
      selectedIndices.push(indexOfFirst);
      indexOfLastTurnedOnBattery = indexOfFirst;
      remainingToTurnOn -= 1;

      // Update with yellow highlight
      const partialResult = onBatteries.join('');
      const isFinalStep = remainingToTurnOn === 0;
      const stepText = isFinalStep
        ? `${colors.gray}Final: ${partialResult}${colors.reset}`
        : `${colors.gray}Step ${stepNumber}/${numBatteriesToTurnOn}  Partial: ${partialResult}${colors.reset}`;

      // Cursor at line 4, move up 3 to line 1
      process.stdout.write('\x1b[3A'); // Move up to trying line
      process.stdout.write('\r\x1b[K' + tryingLine + '\n'); // Keep trying line
      process.stdout.write('\r\x1b[K' + selectingVisual + '\n'); // Update visualization with yellow
      process.stdout.write('\r\x1b[K' + stepText + '\n'); // Update step counter
      // Cursor now at line 4

      await sleep(animationSpeed / 2);

      // Then show it as selected (green) instead of yellow
      const selectedVisual = bank
        .split('')
        .map((digit, idx) => {
          if (selectedIndices.includes(idx)) {
            // Selected - show in green
            return `${colors.green}${digit}${colors.reset}`;
          } else if (idx > indexOfFirst) {
            // Everything after the selected position is the window
            return `${colors.bgBlue}${colors.white}${digit}${colors.reset}`;
          } else {
            // Already processed - show dimmed
            return `${colors.gray}${digit}${colors.reset}`;
          }
        })
        .join('');

      // Update to show green instead of yellow
      // Cursor at line 4, move up 3 to line 1
      process.stdout.write('\x1b[3A'); // Move up to trying line
      process.stdout.write('\r\x1b[K' + tryingLine + '\n'); // Keep trying line
      process.stdout.write('\r\x1b[K' + selectedVisual + '\n'); // Overwrite visualization (yellow -> green)
      process.stdout.write('\r\x1b[K' + stepText + '\n'); // Rewrite step counter
      // Cursor now at line 4

      await sleep(animationSpeed / 2);

      break;
    }
  }

  const result = parseInt(onBatteries.join(''));
  return result;
};

// Run visualization with test data
const runVisualization = async () => {
  const testBanks = [
    '987654321111111',
    '811111111111119',
    '234234234234278',
    '818181911112111',
  ];

  const numBatteries = process.argv.includes('--part2') ? 12 : 2;
  const speed =
    parseInt(
      process.argv.find((arg) => arg.startsWith('--speed='))?.split('=')[1]
    ) || 500;

  // Show legend at the very top
  console.log('\n' + colors.bright + 'Legend:' + colors.reset);
  console.log(
    `${colors.bgBlue}${colors.white} window (pick from here) ${colors.reset} | ` +
      `${colors.bgRed}${colors.white} reserved (for future picks) ${colors.reset} | ` +
      `${colors.green}9${colors.reset} = max selected`
  );

  const results = [];
  for (let i = 0; i < testBanks.length; i++) {
    const result = await visualizeBatterySelection(
      testBanks[i],
      numBatteries,
      speed
    );
    results.push(result);
  }

  const total = results.reduce((sum, val) => sum + val, 0);
  console.log(
    `\n${colors.bright}${colors.yellow}Total: ${total}${colors.reset}\n`
  );

  console.log(`${colors.dim}💡 Options:`);
  console.log(`   --part2       Run Part 2 (12 batteries)`);
  console.log(
    `   --speed=N     Set animation speed in ms (default: 500)${colors.reset}\n`
  );
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runVisualization().catch(console.error);
}

export {
  visualizeBatterySelection,
  runVisualization,
};
