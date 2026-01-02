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

function rotate90Clockwise(shape, width) {
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
}

function rotate90Counterclockwise(shape, width) {
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
}

const binaryStrings = (bitwiseRow, numCols) => {
  // .toString(2) converts the number to a binary string
  // .padStart(numCols, '0') ensures it's always numCols digits long (e.g., 1 -> 001)
  return '0b' + bitwiseRow.toString(2).padStart(numCols, '0');
};

class BitwiseGrid {
  constructor(width, height, rows) {
    this.rows = rows.map(BigInt);
    this.width = width;
    this.height = height;
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

  getAllCoordinates() {
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

  transpose() {
    // New width = old height, New height = old width
    const newRows = new Array(this.width).fill(0n);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y)) {
          // Old (x, y) becomes New (y, x)
          // In new grid, we shift by (newWidth - 1 - newX) -> (height - 1 - y)
          newRows[x] |= 1n << BigInt(this.height - 1 - y);
        }
      }
    }
    return new this.constructor(this.height, this.width, newRows);
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

  /**
   * Returns a new BitwiseGrid containing only the contiguous block
   * connected to (startX, startY).
   * (A Bitwise equivalent of a Flood Fill)
   */
  getConnectedCluster(startX, startY) {
    if (!this.get(startX, startY))
      return new this.constructor(
        this.width,
        this.height,
        new Array(this.height).fill(0n)
      );

    // We will build a "visited" grid using BigInts (efficient!)
    const clusterRows = new Array(this.height).fill(0n);

    // Queue for BFS
    const queue = [{ x: startX, y: startY }];

    // Mark start as visited in our result grid
    clusterRows[startY] |= 1n << BigInt(this.width - 1 - startX);

    const dirs = [
      [0, 1], // S
      [0, -1], // N
      [1, 0], // E
      [-1, 0], // W
    ];

    while (queue.length > 0) {
      const { x, y } = queue.shift();

      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        // 1. Bounds check
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          // 2. Check if the bit is set in the source grid
          const isSetInSource =
            (this.rows[ny] >> BigInt(this.width - 1 - nx)) & 1n;

          // 3. Check if we haven't visited it yet (is NOT set in clusterRows)
          const isVisited =
            (clusterRows[ny] >> BigInt(this.width - 1 - nx)) & 1n;

          if (isSetInSource && !isVisited) {
            // Mark as visited/added
            clusterRows[ny] |= 1n << BigInt(this.width - 1 - nx);
            queue.push({ x: nx, y: ny });
          }
        }
      }
    }

    return new this.constructor(this.width, this.height, clusterRows);
  }

  fullRowMask() {
    // creates a string of '1's as long as the width and converts to BigInt
    return (1n << this.width) - 1n;
  }

  emptyRowMask() {
    // creates a string of '1's as long as the width and converts to BigInt
    return 0n;
  }

  flipHorizontal() {
    const newRows = this.rows.map((row) => {
      let flipped = 0n;
      for (let i = 0; i < this.width; i++) {
        // If the bit at position i is set, set the bit at the mirrored position
        if ((row >> BigInt(i)) & 1n) {
          flipped |= 1n << BigInt(this.width - 1 - i);
        }
      }
      return flipped;
    });
    return new this.constructor(this.width, this.height, newRows);
  }

  flipVertical() {
    const newRows = [...this.rows].reverse();
    return new this.constructor(this.width, this.height, newRows);
  }

  rotate90Clockwise() {
    // The new height will be the old width
    const newRows = new Array(this.width).fill(0n);

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        // Isolate the bit at row, col
        // col 0 is the (width-1) bit.
        let bit = (this.rows[row] >> BigInt(this.width - 1 - col)) & 1n;

        if (bit === 1n) {
          // Map to New Row (col) and New Column (height - 1 - row)
          // Set the bit in the newRow
          // Shift by (height - 1 - New Column) to maintain bit order
          // (height - 1 - (height - 1 - row)) is the same as row
          newRows[col] |= 1n << BigInt(row);
        }
      }
    }
    return new this.constructor(this.height, this.width, newRows);
  }

  rotate90Counterclockwise() {
    const newRows = new Array(this.width).fill(0n);
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let bit = (this.rows[row] >> BigInt(this.width - 1 - col)) & 1n;
        if (bit === 1n) {
          // New Row: width - 1 - col, New Col: row
          newRows[this.width - 1 - col] |= 1n << BigInt(this.height - 1 - row);
        }
      }
    }
    return new this.constructor(this.height, this.width, newRows);
  }

  rotate180() {
    return this.rotate90Clockwise().rotate90Clockwise();
  }

  // Helper to see the shape in the console
  toString(onChar = '#', offChar = '.') {
    return this.rows
      .map((row) =>
        row
          .toString(2)
          .padStart(this.width, '0')
          .replace(/1/g, onChar)
          .replace(/0/g, offChar)
      )
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

  get leftWallMask() {
    return 1n << (BigInt(this.width) - 1n);
  }

  get rightWallMask() {
    return 1n;
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
    // 1. Bounds Check
    if (
      x < 0 ||
      y < 0 ||
      x + shape.width > this.width ||
      y + shape.height > this.height
    ) {
      return null;
    }

    // 2. Prepare shifted rows for collision check
    // Logic: Shift the shape bits left to align with the field's X position
    const shiftAmount = BigInt(this.width - shape.width - x);
    const shiftedRows = shape.rows.map((row) => row << shiftAmount);

    // 3. Collision Check (Bitwise AND)
    for (let i = 0; i < shape.height; i++) {
      if ((this.rows[y + i] & shiftedRows[i]) !== 0n) {
        return null; // Collision!
      }
    }

    // 4. Create New Field State (Bitwise OR)
    const nextRows = [...this.rows];
    for (let i = 0; i < shape.height; i++) {
      nextRows[y + i] |= shiftedRows[i];
    }

    return new BitwiseField(this.width, this.height, nextRows);
  }
}

module.exports = {
  convertRowToBitwise,
  flipHorizontal,
  flipVertical,
  rotate90Clockwise,
  rotate90Counterclockwise,
  BitwiseShape,
  BitwiseGrid,
  BitwiseField,
};
