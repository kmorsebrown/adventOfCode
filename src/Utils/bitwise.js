const convertRowToBitwise = (row, onSymbol) => {
  let bitwiseRow = 0;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === onSymbol) {
      // Shift 1 into the correct bit position and add it to the total
      // We use (row.length - 1 - i) so the first element is the leftmost bit
      bitwiseRow |= 1 << (row.length - 1 - i);
    }
  }
  return bitwiseRow;
};

const flipHorizontal = (shape, width) => {
  return shape.map((row) => {
    let flipped = 0;
    for (let i = 0; i < width; i++) {
      // If the bit at position i is set, set the bit at the mirrored position
      if ((row >> i) & 1) {
        flipped |= 1 << (width - 1 - i);
      }
    }
    return flipped;
  });
};

const flipVertical = (shape) => {
  return [...shape].reverse();
};

const rotate90Clockwise = (shape, width) => {
  const height = shape.length;
  // The new height will be the old width
  const newShape = new Array(width).fill(0);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Isolate the bit at row, col
      // col 0 is the (width-1) bit.
      let bit = (shape[row] >> (width - 1 - col)) & 1;

      if (bit === 1) {
        // Map to New Row (col) and New Column (height - 1 - row)
        const newRow = col;
        const newCol = height - 1 - row;

        // Set the bit in the newRow
        // Again, shift by (height - 1 - newCol) to maintain bit order
        newShape[newRow] |= 1 << (height - 1 - newCol);
      }
    }
  }
  return newShape;
};

const rotate90Counterclockwise = (shape, width) => {
  const height = shape.length;
  // The new height will be the old width
  const newShape = new Array(width).fill(0);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Isolate the bit at row, col
      // col 0 is the (width-1) bit.
      let bit = (shape[row] >> (width - 1 - col)) & 1;

      if (bit === 1) {
        // Map to New Row (width - 1 - col) and New Column (row)
        const newRow = width - 1 - col;

        // Set bit using (height - 1 - r) to maintain left-to-right order
        newShape[newRow] |= 1 << (height - 1 - row);
      }
    }
  }
  return newShape;
};

// https://smithkruz.medium.com/mind-blowing-javascript-bitwise-hacks-youll-actually-use-208b45c35c6d
// aka "Hamming Weight"
const countSetBits = (n) => {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};

const boolToNum = (bool) => +bool;

class BitwiseGrid {
  constructor(width, height, rows) {
    this.width = width;
    this.height = height;
    this.rows = rows.map(BigInt);
  }

  /**
   * Returns 1 if the bit at (x, y) is set, 0 otherwise.
   * Equivalent to your getValueFromCoords
   */
  get(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
    // Shift right to move the target bit to position 0, then mask it
    return Number((this.rows[y] >> BigInt(this.width - 1 - x)) & 1n);
  }

  /**
   * Sets the bit at (x, y) to on (1) or off (0)
   */
  set(x, y, value) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;

    const bitMask = 1n << BigInt(this.width - 1 - x);

    if (value) {
      this.rows[y] |= bitMask; // Turn on
    } else {
      this.rows[y] &= ~bitMask; // Turn off
    }
  }

  fullRowMask() {
    // creates a string of '1's as long as the width and converts to BigInt
    return (1n << BigInt(this.width)) - 1n;
  }

  emptyRowMask() {
    // creates a string of '1's as long as the width and converts to BigInt
    return 0n;
  }

  getAllSetBitCoordinates() {
    const coords = [];
    for (let y = 0; y < this.height; y++) {
      let row = this.rows[y];
      // Optimization: Only iterate if the row has any bits set
      if (row === 0n) continue;

      for (let x = 0; x < this.width; x++) {
        // Check bit at x
        if ((row >> BigInt(this.width - 1 - x)) & 1n) {
          coords.push({ x, y });
        }
      }
    }
    return coords;
  }

  getAllUnSetBitCoordinates() {
    const coords = [];
    for (let y = 0; y < this.height; y++) {
      let row = this.rows[y];

      for (let x = 0; x < this.width; x++) {
        // Check bit at x
        if (!((row >> BigInt(this.width - 1 - x)) & 1n)) {
          coords.push({ x, y });
        }
      }
    }
    return coords;
  }

  /**
   * Returns a specific neighbor in a given direction.
   * Equivalent to your getAdjacentCoords
   * @returns {x, y, value} or null if out of bounds
   */
  getNeighbor(x, y, dir) {
    let nx = x;
    let ny = y;

    switch (dir) {
      case 'N':
        ny -= 1;
        break;
      case 'S':
        ny += 1;
        break;
      case 'E':
        nx += 1;
        break;
      case 'W':
        nx -= 1;
        break;
      case 'NE':
        nx += 1;
        ny -= 1;
        break;
      case 'NW':
        nx -= 1;
        ny -= 1;
        break;
      case 'SE':
        nx += 1;
        ny += 1;
        break;
      case 'SW':
        nx -= 1;
        ny += 1;
        break;
      default:
        return null;
    }

    // Bounds Check
    if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) {
      return null;
    }

    return { x: nx, y: ny, value: this.get(nx, ny) };
  }

  /**
   * Returns an array of all valid surrounding cells.
   * Equivalent to your getAllAdjacentCoords
   * @returns Array<{x, y, value}>
   */
  getAllNeighbors(x, y, allowDiagonals = false) {
    const neighbors = [];

    // Standard Cardinals (N, E, S, W)
    const deltas = [
      { dx: 0, dy: -1 }, // N
      { dx: 1, dy: 0 }, // E
      { dx: 0, dy: 1 }, // S
      { dx: -1, dy: 0 }, // W
    ];

    // Diagonals (NE, SE, SW, NW)
    if (allowDiagonals) {
      deltas.push(
        { dx: 1, dy: -1 }, // NE
        { dx: 1, dy: 1 }, // SE
        { dx: -1, dy: 1 }, // SW
        { dx: -1, dy: -1 } // NW
      );
    }

    for (const { dx, dy } of deltas) {
      const nx = x + dx;
      const ny = y + dy;

      // Bounds Check
      if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
        neighbors.push({
          x: nx,
          y: ny,
          value: this.get(nx, ny),
        });
      }
    }

    return neighbors;
  }

  getUnsetNeighbors(allowDiagonals = false) {
    const neighborRows = new Array(this.height).fill(0n);
    const fullMask = this.fullRowMask();

    for (let y = 0; y < this.height; y++) {
      const currentRow = this.rows[y];
      if (currentRow === 0n) continue;

      // 1. Horizontal Neighbors (Left and Right)
      // We must shift by a BigInt, so we wrap the '1' in BigInt()
      let horizontal = (currentRow << 1n) | (currentRow >> 1n);

      // 2. Combine into the neighbor mask
      neighborRows[y] |= horizontal;

      // Check bounds using standard Numbers, but assign BigInts
      if (y > 0) neighborRows[y - 1] |= currentRow;
      if (y < this.height - 1) neighborRows[y + 1] |= currentRow;

      if (allowDiagonals) {
        if (y > 0) neighborRows[y - 1] |= horizontal;
        if (y < this.height - 1) neighborRows[y + 1] |= horizontal;
      }
    }

    const resultCoords = [];
    for (let y = 0; y < this.height; y++) {
      // Only keep bits that were NOT set in the original grid
      // Logic: (Neighbors OR-ed together) AND (NOT original bits) AND (within width)
      neighborRows[y] &= ~this.rows[y] & fullMask;

      if (neighborRows[y] !== 0n) {
        for (let x = 0; x < this.width; x++) {
          // Explicitly convert (width - 1 - x) to BigInt for the shift
          const shiftAmount = BigInt(this.width - 1 - x);
          if ((neighborRows[y] >> shiftAmount) & 1n) {
            resultCoords.push({ x, y });
          }
        }
      }
    }
    return resultCoords;
  }

  /**
   * Returns a new BitwiseGrid containing only the contiguous block
   * connected to (startX, startY).
   * (A Bitwise equivalent of a Flood Fill)
   */
  getConnectedCluster(startX, startY, targetValue = 1, allowDiagonals = false) {
    // Check if the starting point even matches what we're looking for
    if (this.get(startX, startY) !== targetValue) {
      return new this.constructor(
        this.width,
        this.height,
        new Array(this.height).fill(0n)
      );
    }

    const clusterRows = new Array(this.height).fill(0n);
    const queue = [{ x: startX, y: startY }];

    // Mark start as visited
    clusterRows[startY] |= 1n << BigInt(this.width - 1 - startX);

    const dirs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    if (allowDiagonals) {
      dirs.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    }

    while (queue.length > 0) {
      const { x, y } = queue.shift();

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          // Check if the neighbor matches our target value (0 or 1)
          const matchTarget = this.get(nx, ny) === targetValue;

          // Check if NOT already in our cluster result
          const isVisited =
            (clusterRows[ny] >> BigInt(this.width - 1 - nx)) & 1n;

          if (matchTarget && !isVisited) {
            clusterRows[ny] |= 1n << BigInt(this.width - 1 - nx);
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }

    return new this.constructor(this.width, this.height, clusterRows);
  }

  getAllClusters(targetValue, allowDiagonals = false) {
    const clusters = [];

    // Create a tracking grid to keep track of what we've already "grouped"
    // We use a temporary BitwiseGrid so we can use its .get() and .set() methods
    let tracker = new BitwiseGrid(this.width, this.height, [...this.rows]);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // If this cell matches our target (0 or 1)...
        if (tracker.get(x, y) === targetValue) {
          // 1. Find the entire cluster starting here
          const clusterGrid = tracker.getConnectedCluster(
            x,
            y,
            targetValue,
            allowDiagonals
          );
          const clusterCoords = [];

          // 2. Extract coordinates and "remove" from tracker
          for (let cy = 0; cy < this.height; cy++) {
            if (clusterGrid.rows[cy] === 0n) continue; // Optimization: skip empty rows

            for (let cx = 0; cx < this.width; cx++) {
              if (clusterGrid.get(cx, cy)) {
                clusterCoords.push({ x: cx, y: cy });

                // To prevent finding this cluster again, we flip the bit
                // in the tracker to the opposite of the targetValue
                tracker.set(cx, cy, targetValue ^ 1);
              }
            }
          }
          clusters.push(clusterCoords);
        }
      }
    }
    return clusters;
  }

  flipHorizontal() {
    // a b c  =>  c b a
    // d e f  =>  f e d
    // g h i  =>  i h g

    const newRows = this.rows.map((row) => {
      let flipped = 0n;
      for (let i = 0; i < this.width; i++) {
        if ((row >> BigInt(i)) & 1n) {
          flipped |= 1n << BigInt(this.width - 1 - i);
        }
      }
      return flipped;
    });
    return new this.constructor(this.width, this.height, newRows);
  }

  flipVertical() {
    // a b c  =>  g h i
    // d e f  =>  d e f
    // g h i  =>  a b c

    const newRows = [...this.rows].reverse();
    return new this.constructor(this.width, this.height, newRows);
  }

  flipDiagonal() {
    const newWidth = this.height;
    const newHeight = this.width;

    // a b c  =>  a d g
    // d e f  =>  b e h
    // g h i  =>  c f i

    const newRows = new Array(newHeight).fill(0n);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y)) {
          const newX = y;
          const newY = x;
          // (newWidth - 1 - newX) === (height - 1 - y)
          newRows[newY] |= 1n << BigInt(newWidth - 1 - newX);
        }
      }
    }
    return new this.constructor(this.height, this.width, newRows);
  }

  rotate90Clockwise() {
    const newHeight = this.width;
    const newWidth = this.height;
    const newRows = Array(newHeight).fill(0n);

    // a b c  =>  g d a
    // d e f  =>  h e b
    // g h i  =>  i f c

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        // row 0 => col 2
        // row 1 => col 1
        // row 2 => col 0
        const newRow = col;

        // col 0 => row 0
        // col 1 => row 1
        // col 2 => row 2
        const newCol = this.width - 1 - row;

        const bit = this.rows[row] >> BigInt(this.width - 1 - col);

        if ((bit & 1n) === 1n) {
          newRows[newRow] |= 1n << BigInt(this.width - 1 - newCol);
        }
      }
    }
    return new this.constructor(newWidth, newHeight, newRows);
  }

  rotate90Counterclockwise() {
    const newHeight = this.width;
    const newWidth = this.height;
    const newRows = Array(newHeight).fill(0n);

    // a b c  =>  c f i
    // d e f  =>  b e h
    // g h i  =>  a d g

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        // row 0 => col 0
        // row 1 => col 1
        // row 2 => col 2
        const newRow = newHeight - 1 - col;

        // col 0 => row 2
        // col 1 => row 1
        // col 2 => row 0
        const newCol = row;

        const bit = this.rows[row] >> BigInt(this.width - 1 - col);

        if ((bit & 1n) === 1n) {
          newRows[newRow] |= 1n << BigInt(newWidth - 1 - newCol);
        }
      }
    }
    return new this.constructor(newWidth, newHeight, newRows);
  }

  rotate180() {
    return this.rotate90Clockwise().rotate90Clockwise();
  }

  rowToString(row, width, onChar = '#', offChar = '.') {
    return row
      .toString(2)
      .padStart(width, '0')
      .replace(/1/g, onChar)
      .replace(/0/g, offChar);
  }

  // Helper to see the shape in the console
  toString(onChar = '#', offChar = '.') {
    return this.rows
      .map((row) => this.rowToString(row, this.width, onChar, offChar))
      .join('\n');
  }

  /**
   * Converts the grid to a plain object for JSON serialization.
   * Note: BigInts are converted to strings to prevent JSON errors.
   */
  toJSON() {
    return {
      type: this.constructor.name, // "BitwiseShape" or "BitwiseField"
      width: this.width,
      height: this.height,
      rows: this.rows.map((row) => row.toString()),
    };
  }

  /**
   * Reconstructs a grid instance from a JSON object.
   */
  static fromJSON(json) {
    const { width, height, rows } =
      typeof json === 'string' ? JSON.parse(json) : json;

    // We convert strings back to BigInts here
    const bigIntRows = rows.map((val) => BigInt(val));

    // This refers to the class you call it on (BitwiseShape, BitwiseField, etc.)
    return new this(width, height, bigIntRows);
  }
}

class BitwiseShape extends BitwiseGrid {
  constructor(width, height, rows) {
    super(width, height, rows);
  }
  /**
   * Factory method to create a shape from an array of strings or 2D array
   * @param {*} data
   * @param {*} onSymbol
   * @returns
   */
  static fromData(data, onSymbol = '#') {
    const height = data.length;
    const width = data[0].length;

    const bitwiseRows = data.map((row) => {
      let val = 0n;
      for (let i = 0; i < width; i++) {
        if (row[i] === onSymbol) {
          val |= 1n << BigInt(width - 1 - i);
        }
      }
      return val;
    });

    return new BitwiseShape(width, height, bitwiseRows);
  }

  get horizontalFootprint() {
    // OR all rows together into one BigInt
    return this.rows.reduce((acc, row) => acc | row, 0n);
  }
}

class BitwiseField extends BitwiseGrid {
  constructor(width, height, rows = null) {
    // If rows aren't provided, initialize an empty grid
    const initialRows = rows || new Array(height).fill(0n);
    super(width, height, initialRows);
  }

  isRowEmpty(y) {
    return this.rows[y] === 0n;
  }

  isRowFull(y) {
    const fullRowMask = (1n << BigInt(this.width)) - 1n;
    return this.rows[y] === fullRowMask;
  }

  clearRow(y) {
    this.rows[y] = 0n;
  }

  /**
   *
   * @param {*} shape
   * @param {*} nextX x of top-left corner after move
   * @param {*} nextY y of top-left corner after move
   * @returns
   */
  isValidMove(shape, nextX, nextY) {
    // Strict Coordinate Bounds Check
    if (
      nextX < 0 ||
      nextY < 0 ||
      nextX + shape.width > this.width ||
      nextY + shape.height > this.height
    ) {
      return false;
    }

    // Prepare the Bitwise Shift
    const bNextX = BigInt(nextX);
    const bSWidth = BigInt(shape.width);
    const bGridWidth = BigInt(this.width);
    const shiftAmount = bGridWidth - bSWidth - bNextX;

    // Internal Collision Check (Overlap with existing blocks)
    // We only need to check the rows where the shape actually exists
    for (let i = 0; i < shape.height; i++) {
      // Shift this specific row of the shape to the target X position
      // If we shift a shape too far left, the bits go beyond the fieldMask
      // If we shift too far right, the bits become 0 or fall off
      const shiftedShapeRow = shape.rows[i] << shiftAmount;

      // Bitwise AND: if the result is anything other than 0n, they overlap.
      if ((this.rows[nextY + i] & shiftedShapeRow) !== 0n) return false;
    }

    // If it passed both coordinate and bitwise overlap checks, it's valid!
    return true;
  }

  /**
   * Tries to place a BitwiseShape at x, y.
   * Returns a NEW BitwiseField if successful, or null if collision/OOB.
   */
  tryPlace(shape, x, y) {
    // isValidMove Check
    if (!this.isValidMove(shape, x, y)) {
      return null;
    }

    // Shift the shape bits left to align with the field's X position
    const shiftAmount = BigInt(this.width - shape.width - x);
    const shiftedRows = shape.rows.map((row) => row << shiftAmount);

    // Create New Field State (Bitwise OR)
    const nextRows = [...this.rows];
    for (let i = 0; i < shape.height; i++) {
      nextRows[y + i] |= shiftedRows[i];
    }

    return new BitwiseField(this.width, this.height, nextRows);
  }

  /**
   * Places a BitwiseShape at x, y.
   * Sets the applicable cells if successful, throws error if collision/OOB.
   */
  place(shape, x, y) {
    // isValidMove Check
    if (this.isValidMove(shape, x, y)) {
      // Shift the shape bits left to align with the field's X position
      const shiftAmount = BigInt(this.width - shape.width - x);
      const shiftedRows = shape.rows.map((row) => row << shiftAmount);

      // Create New Field State (Bitwise OR)
      for (let i = 0; i < shape.height; i++) {
        this.rows[y + i] |= shiftedRows[i];
      }
      return 'success';
    } else {
      console.error('Move is not valid');
      return 'failure';
    }
  }
}

module.exports = {
  convertRowToBitwise,
  flipHorizontal,
  flipVertical,
  rotate90Clockwise,
  rotate90Counterclockwise,
  countSetBits,
  boolToNum,
  BitwiseShape,
  BitwiseGrid,
  BitwiseField,
};
