const {
  convertRowToBitwise,
  flipHorizontal,
  flipVertical,
  rotate90Clockwise,
  rotate90Counterclockwise,
  BitwiseShape,
  BitwiseGrid,
  BitwiseField,
} = require('./bitwiseGrids.js');
// npm test -- src/Utils/grids.spec.js

describe('bitwiseGrids', () => {
  describe('convertRowToBitwise', () => {
    it('converts #. row to bitwise', () => {
      const row = ['#', '#', '.'];
      const expected = 0b110;
      expect(convertRowToBitwise(row, '#')).toEqual(expected);
    });
    it('converts 1 0 row to bitwise', () => {
      const row = [1, 0, 1];
      const expected = 0b101;
      expect(convertRowToBitwise(row, 1)).toEqual(expected);
    });
  });
  describe('flipHorizontal', () => {
    it('flips bitwise grid horizontally', () => {
      const shape = [0b011, 0b100, 0b011];
      const expected = [0b110, 0b001, 0b110];
      expect(flipHorizontal(shape, 3)).toEqual(expected);
    });
  });
  describe('flipVertical', () => {
    it('flips bitwise grid vertically', () => {
      const shape = [0b011, 0b100, 0b011];
      const expected = [0b011, 0b100, 0b011];
      expect(flipVertical(shape)).toEqual(expected);
    });
  });
  describe('rotate90Clockwise', () => {
    it('rotates bitwise grid 90 degrees clockwise', () => {
      const shape = [0b011, 0b111, 0b110];
      const expected = [0b110, 0b111, 0b011];
      expect(rotate90Clockwise(shape, 3)).toEqual(expected);
    });
    it('rotates bitwise grid 90 degrees clockwise', () => {
      const shape = [0b111, 0b110, 0b011];
      const expected = [0b011, 0b111, 0b101];
      expect(rotate90Clockwise(shape, 3)).toEqual(expected);
    });
    it('rotates bitwise grid 90 degrees clockwise', () => {
      const shape = [0b111, 0b100, 0b111];
      const expected = [0b111, 0b101, 0b101];
      expect(rotate90Clockwise(shape, 3)).toEqual(expected);
    });
  });
  describe('rotate90Counterclockwise', () => {
    it('rotates bitwise grid 90 degrees counter-clockwise', () => {
      const expected = [0b011, 0b111, 0b110];
      const shape = [0b110, 0b111, 0b011];
      expect(rotate90Counterclockwise(shape, 3)).toEqual(expected);
    });
    it('rotates bitwise grid 90 degrees counter-clockwise', () => {
      const expected = [0b111, 0b110, 0b011];
      const shape = [0b011, 0b111, 0b101];
      expect(rotate90Counterclockwise(shape, 3)).toEqual(expected);
    });
    it('rotates bitwise grid 90 degrees counter-clockwise', () => {
      const expected = [0b111, 0b100, 0b111];
      const shape = [0b111, 0b101, 0b101];
      expect(rotate90Counterclockwise(shape, 3)).toEqual(expected);
    });
  });
  describe('BitwiseGrid', () => {
    describe('flipHorizontal', () => {
      it('flips bitwise grid horizontally', () => {
        const shape = new BitwiseGrid(3, 3, [0b011, 0b100, 0b011]);
        const result = shape.flipHorizontal();
        expect(result.rows).toEqual([0b110n, 0b001n, 0b110n]);
      });
    });
    describe('flipVertical', () => {
      it('flips bitwise grid vertically', () => {
        const rows = [0b011, 0b100, 0b111];
        const shape = new BitwiseGrid(3, 3, rows);
        const result = shape.flipVertical();
        expect(result.rows).toEqual([0b111n, 0b100n, 0b011n]);
      });
    });
    describe('rotate90Clockwise', () => {
      it('rotates Case A clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b011, 0b111, 0b110]);
        const result = shape.rotate90Clockwise();
        expect(result.rows).toEqual([0b110n, 0b111n, 0b011n]);
      });

      it('rotates Case B clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b111, 0b110, 0b011]);
        const result = shape.rotate90Clockwise();
        expect(result.rows).toEqual([0b011n, 0b111n, 0b101n]);
      });

      it('rotates Case C clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b111, 0b100, 0b111]);
        const result = shape.rotate90Clockwise();
        expect(result.rows).toEqual([0b111n, 0b101n, 0b101n]);
      });

      it('rotates a 2x4 into a 4x2 correctly (Clockwise)', () => {
        const rectRows = [0b10n, 0b10n, 0b11n, 0b01n];
        const rectShape = new BitwiseGrid(2, 4, rectRows);
        const rotated = rectShape.rotate90Clockwise();

        // The result should be 4 wide and 2 tall
        expect(rotated.width).toBe(4);
        expect(rotated.height).toBe(2);

        expect(rotated.rows).toEqual([0b0111n, 0b1100n]);
      });
    });
    describe('rotate90Counterclockwise', () => {
      it('rotates Case A counter-clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b110, 0b111, 0b011]);
        const result = shape.rotate90Counterclockwise();
        expect(result.rows).toEqual([0b011n, 0b111n, 0b110n]);
      });

      it('rotates Case B counter-clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b011, 0b111, 0b101]);
        const result = shape.rotate90Counterclockwise();
        expect(result.rows).toEqual([0b111n, 0b110n, 0b011n]);
      });

      it('rotates Case C counter-clockwise', () => {
        const shape = new BitwiseGrid(3, 3, [0b111, 0b101, 0b101]);
        const result = shape.rotate90Counterclockwise();
        expect(result.rows).toEqual([0b111n, 0b100n, 0b111n]);
      });

      it('rotates a 2x4 into a 4x2 correctly (Counter-Clockwise)', () => {
        const rectRows = [0b10n, 0b10n, 0b11n, 0b01n];
        const rectShape = new BitwiseGrid(2, 4, rectRows);
        const rotated = rectShape.rotate90Counterclockwise();

        expect(rotated.width).toBe(4);
        expect(rotated.height).toBe(2);
        expect(rotated.rows).toEqual([0b0011n, 0b1110n]);
      });
    });
    describe('rotate180', () => {
      it('should rotate an L-shape 180 degrees', () => {
        const shape = BitwiseShape.fromData(['#..', '###']);

        const rotated = shape.rotate180();
        expect(rotated.rows).toEqual([7n, 1n]);
        expect(rotated.width).toBe(3);
        expect(rotated.height).toBe(2);
      });
    });
    describe('toString()', () => {
      it('should return a correct visual representation of the bitwise rows', () => {
        const shape = new BitwiseGrid(3, 2, [0b101n, 0b111n]);

        const expected = '#.#\n' + '###';

        expect(shape.toString()).toBe(expected);
      });

      it('should support custom on/off characters', () => {
        const shape = new BitwiseGrid(3, 2, [0b101n, 0b111n]);

        // Using 1s and 0s instead of # and .
        const expected = '101\n' + '111';

        expect(shape.toString('1', '0')).toBe(expected);
      });

      it('should correctly pad rows that have leading zeros', () => {
        // toString must pad the left side with zeros (dots)
        const shape = new BitwiseGrid(4, 1, [0b0011n]);

        expect(shape.toString()).toBe('..##');
      });
    });
    describe('Serialization (JSON)', () => {
      it('should serialize and deserialize a BitwiseShape correctly', () => {
        const original = BitwiseShape.fromData(['#.', '##']);

        // Convert to JSON string
        const jsonString = JSON.stringify(original);

        // Restore from JSON string
        const restored = BitwiseShape.fromJSON(jsonString);

        expect(restored).toBeInstanceOf(BitwiseShape);
        expect(restored.width).toBe(2);
        expect(restored.rows).toEqual([0b10n, 0b11n]);
        expect(restored.toString()).toBe(original.toString());
      });

      it('should serialize and deserialize a BitwiseField correctly', () => {
        const field = new BitwiseField(50, 50);
        const json = field.toJSON();

        expect(json.width).toBe(50);
        expect(Array.isArray(json.rows)).toBe(true);
        expect(typeof json.rows[0]).toBe('string'); // Verified string conversion

        const restoredField = BitwiseField.fromJSON(json);
        expect(restoredField).toBeInstanceOf(BitwiseField);
        expect(restoredField.width).toBe(50);
      });
    });
    describe('get() and set()', () => {
      it('should correctly retrieve values from specific coordinates', () => {
        // 3x3 Identity matrix
        const grid = new BitwiseGrid(3, 3, [0b100n, 0b010n, 0b001n]);

        expect(grid.get(0, 0)).toBe(1);
        expect(grid.get(1, 1)).toBe(1);
        expect(grid.get(2, 2)).toBe(1);

        // Check empty spots
        expect(grid.get(1, 0)).toBe(0); // Row 0, Col 1
        expect(grid.get(0, 1)).toBe(0); // Row 1, Col 0
      });

      it('should return 0 for out of bounds coordinates', () => {
        const grid = new BitwiseGrid(1, 1, [0b1n]);
        expect(grid.get(-1, 0)).toBe(0);
        expect(grid.get(0, -1)).toBe(0);
        expect(grid.get(10, 0)).toBe(0);
      });

      it('should set bits on and off correctly', () => {
        // Initialize 3x3 empty grid
        const grid = new BitwiseGrid(3, 3, [0n, 0n, 0n]);

        // Set center on
        grid.set(1, 1, 1);
        expect(grid.get(1, 1)).toBe(1);
        expect(grid.rows[1]).toBe(0b010n);

        // Set center off
        grid.set(1, 1, 0);
        expect(grid.get(1, 1)).toBe(0);
        expect(grid.rows[1]).toBe(0n);
      });
    });
    describe('getAllCoordinates()', () => {
      it('should return {x,y} objects for every set bit', () => {
        const grid = new BitwiseGrid(3, 2, [0b101n, 0b010n]);

        const coords = grid.getAllCoordinates();

        // We expect 3 coordinates
        expect(coords).toHaveLength(3);

        // Check specific contents (order usually depends on iteration,
        // typically row by row, then col by col)
        expect(coords).toContainEqual({ x: 0, y: 0 });
        expect(coords).toContainEqual({ x: 2, y: 0 });
        expect(coords).toContainEqual({ x: 1, y: 1 });
      });

      it('should return an empty array for an empty grid', () => {
        const grid = new BitwiseGrid(2, 2, [0n, 0n]);
        expect(grid.getAllCoordinates()).toEqual([]);
      });
    });
    describe('transpose()', () => {
      it('should swap width and height for non-square grids', () => {
        // 2 Wide, 3 High
        // 1 0
        // 1 1
        // 0 1
        const grid = new BitwiseGrid(2, 3, [0b10n, 0b11n, 0b01n]);

        expect(grid.width).toBe(2);
        expect(grid.height).toBe(3);

        const transposed = grid.transpose();

        expect(transposed.width).toBe(3);
        expect(transposed.height).toBe(2);
      });

      it('should correctly flip the bits across the diagonal', () => {
        // Initial:
        // 1 0
        // 1 1
        // 0 1
        const grid = new BitwiseGrid(2, 3, [0b10n, 0b11n, 0b01n]);

        const transposed = grid.transpose();

        // Expected Transpose:
        // 1 1 0
        // 0 1 1
        expect(transposed.get(0, 0)).toBe(1);
        expect(transposed.get(1, 0)).toBe(1);
        expect(transposed.get(2, 0)).toBe(0);

        expect(transposed.get(0, 1)).toBe(0);
        expect(transposed.get(1, 1)).toBe(1);
        expect(transposed.get(2, 1)).toBe(1);
      });
    });
    describe('getConnectedCluster()', () => {
      it('should retrieve a contiguous shape starting from x,y', () => {
        // Shape:
        // 1 1 0 0
        // 1 0 0 0
        // 0 0 1 0  <-- Disconnected island
        const grid = new BitwiseGrid(4, 3, [0b1100n, 0b1000n, 0b0010n]);

        // Start flood fill at top-left (0,0)
        const cluster = grid.getConnectedCluster(0, 0);

        expect(cluster.toString('1', '0')).toEqual(
          '1100\n' + '1000\n' + '0000'
        );

        // Should have the 3 connected blocks
        expect(cluster.get(0, 0)).toBe(1);
        expect(cluster.get(1, 0)).toBe(1);
        expect(cluster.get(0, 1)).toBe(1);

        // Should NOT have the island at (2,2)
        expect(cluster.get(2, 2)).toBe(0);
      });

      it('should return an empty grid if the start coordinate is empty', () => {
        const grid = new BitwiseGrid(2, 2, [0b11n, 0b11n]);
        // 0,0 is full, but 5,5 is out of bounds/empty
        // Or picking an empty spot in the grid
        const emptySpot = grid.getConnectedCluster(2, 2);

        expect(emptySpot.getAllCoordinates()).toHaveLength(0);
      });

      it('should handle complex snake shapes', () => {
        // Shape "S"
        // 0 1 1
        // 1 1 0
        // 1 0 0
        const grid = new BitwiseGrid(3, 3, [0b011n, 0b110n, 0b100n]);

        const cluster = grid.getConnectedCluster(0, 2); // Start at bottom left

        // Verify it walked the whole path to top right
        expect(cluster.get(2, 0)).toBe(1);
        expect(cluster.getAllCoordinates()).toHaveLength(5);
        expect(cluster.toString('1', '0')).toEqual('011\n' + '110\n' + '100');
      });
    });
    describe('Neighbor Lookups', () => {
      // Grid Setup:
      // 1 0 0
      // 0 1 0
      // 1 1 1
      const grid = new BitwiseGrid(3, 3, [0b100n, 0b010n, 0b111n]);

      describe('getNeighbor()', () => {
        it('should return correct coord and value for a valid direction', () => {
          // Center is (1,1). North is (1,0) which is 0
          expect(grid.getNeighbor(1, 1, 'N')).toEqual({ x: 1, y: 0, value: 0 });

          // Center is (1,1). South is (1,2) which is 1
          expect(grid.getNeighbor(1, 1, 'S')).toEqual({ x: 1, y: 2, value: 1 });
        });

        it('should return null if direction leads out of bounds', () => {
          // (0,0) is top left. North is OOB.
          expect(grid.getNeighbor(0, 0, 'N')).toBeNull();
          expect(grid.getNeighbor(0, 0, 'W')).toBeNull();
        });

        it('should handle diagonals', () => {
          // (0,0) is 1. SE neighbor is (1,1) which is 1.
          expect(grid.getNeighbor(0, 0, 'SE')).toEqual({
            x: 1,
            y: 1,
            value: 1,
          });
        });
      });

      describe('getAllNeighbors()', () => {
        it('should return exactly 4 neighbors for a center tile (no diagonals)', () => {
          const neighbors = grid.getAllNeighbors(1, 1);

          expect(neighbors).toHaveLength(4);

          // North (1,0) -> 0
          expect(neighbors).toContainEqual({ x: 1, y: 0, value: 0 });
          // South (1,2) -> 1
          expect(neighbors).toContainEqual({ x: 1, y: 2, value: 1 });
          // West  (0,1) -> 0
          expect(neighbors).toContainEqual({ x: 0, y: 1, value: 0 });
          // East  (2,1) -> 0
          expect(neighbors).toContainEqual({ x: 2, y: 1, value: 0 });
        });

        it('should return fewer neighbors for a corner tile', () => {
          // Top-left (0,0) only has East and South
          const neighbors = grid.getAllNeighbors(0, 0);

          expect(neighbors).toHaveLength(2);
          expect(neighbors).toContainEqual({ x: 1, y: 0, value: 0 }); // E
          expect(neighbors).toContainEqual({ x: 0, y: 1, value: 0 }); // S
        });

        it('should include diagonals if requested', () => {
          // Center (1,1) has 8 neighbors
          const neighbors = grid.getAllNeighbors(1, 1, true);
          expect(neighbors).toHaveLength(8);
        });
      });
    });
  });
  describe('BitwiseShape', () => {
    it('should create a shape from string data correctly', () => {
      const shape = BitwiseShape.fromData(['#..', '###']);
      expect(shape.width).toBe(3);
      expect(shape.height).toBe(2);
      expect(shape.rows).toEqual([0b100n, 0b111n]);
    });

    it('should create a shape from string data correctly with custom on symbol', () => {
      const shape = BitwiseShape.fromData(['X..', 'XXX'], 'X');
      expect(shape.width).toBe(3);
      expect(shape.height).toBe(2);
      expect(shape.rows).toEqual([0b100n, 0b111n]);
    });

    it('should calculate the horizontal footprint', () => {
      const shape = BitwiseShape.fromData(['#..', '###']);
      // 100 | 111 = 111 (7n)
      expect(shape.horizontalFootprint).toBe(7n);
    });

    it('should return a BitwiseShape when rotating a BitwiseShape', () => {
      const shape = BitwiseShape.fromData(['#']);
      const rotated = shape.rotate90Clockwise();
      expect(rotated).toBeInstanceOf(BitwiseShape);
      expect(rotated.horizontalFootprint).toBeDefined(); // Property only on Shape
    });

    it('should maintain width and height after flipping', () => {
      const rect = BitwiseShape.fromData(['##', '#.', '#.']); // 2x3
      const flipped = rect.flipHorizontal();
      expect(flipped.width).toBe(2);
      expect(flipped.height).toBe(3);
      expect(flipped.rows).toEqual([0b11n, 0b01n, 0b01n]);
    });
  });
  describe('BitwiseField', () => {
    let field;
    const square = BitwiseShape.fromData(['##', '##']); // 3n, 3n

    beforeEach(() => {
      // Create an empty 10x10 field
      field = new BitwiseField(10, 10);
    });

    describe('isValidMove', () => {
      it('should identify valid and invalid moves based on walls', () => {
        // Valid move in center
        expect(field.isValidMove(square, 0, 0)).toBe(true);
        expect(field.isValidMove(square, 4, 4)).toBe(true);

        // Invalid move (Out of Right Bounds)
        // Width 10, Square Width 2. Max X is 8.
        expect(field.isValidMove(square, 9, 0)).toBe(false);

        // Invalid move (Out of Bottom Bounds)
        expect(field.isValidMove(square, 0, 9)).toBe(false);
      });

      it('should detect collisions with existing blocks', () => {
        // Place a square at 0,0
        const newField = field.tryPlace(square, 0, 0);

        // Try to place another square overlapping it at 1,1
        const collision = newField.isValidMove(square, 1, 1);
        expect(collision).toBe(false);

        // Try to place one that just touches it at 2,0 (Should be valid)
        const valid = newField.isValidMove(square, 2, 0);
        expect(valid).toBe(true);
      });

      it('should handle a 50-wide field correctly', () => {
        const wideField = new BitwiseField(50, 10);
        const tinyShape = BitwiseShape.fromData(['#']); // 1 wide

        // Test far left (X=0)
        expect(wideField.isValidMove(tinyShape, 0, 0)).toBe(true);

        // Test far right (X=49)
        expect(wideField.isValidMove(tinyShape, 49, 0)).toBe(true);

        // Test just out of bounds (X=50)
        expect(wideField.isValidMove(tinyShape, 50, 0)).toBe(false);
      });

      it('should return false when a shape is placed partially above the field (negative y)', () => {
        const field = new BitwiseField(10, 10);
        const shape = BitwiseShape.fromData(['#']);
        expect(field.isValidMove(shape, 0, -1)).toBe(false);
      });

      it('should allow a 1x1 shape to reach the exact last column', () => {
        const field = new BitwiseField(10, 10);
        const dot = BitwiseShape.fromData(['#']); // width 1

        expect(field.isValidMove(dot, 9, 0)).toBe(true); // Last valid index
        expect(field.isValidMove(dot, 10, 0)).toBe(false); // Out of bounds
      });

      it('should block a move if it overlaps by even a single bit', () => {
        // Field has one block at (5, 5)
        const field = new BitwiseField(10, 10);
        const dot = BitwiseShape.fromData(['#']);
        const fieldWithBlock = field.tryPlace(dot, 5, 5);

        // Moving a new dot to (5, 5) should fail
        expect(fieldWithBlock.isValidMove(dot, 5, 5)).toBe(false);
        // Moving a new dot to (4, 5) should pass
        expect(fieldWithBlock.isValidMove(dot, 4, 5)).toBe(true);
      });

      it('should handle a complex shape', () => {
        const complexShape = BitwiseShape.fromData(['###', '##.', '.##']);

        const newField = field.tryPlace(complexShape, 0, 0);

        // Try to place a square at 2,1
        const collision = newField.isValidMove(square, 2, 1);
        expect(collision).toBe(false);

        const rotatedComplexShape = complexShape.rotate180();

        const valid = newField.isValidMove(rotatedComplexShape, 2, 1);
        expect(valid).toBe(true);
      });
    });

    describe('tryPlace', () => {
      it('should return a new field instance upon successful tryPlace', () => {
        const newField = field.tryPlace(square, 5, 5);
        expect(newField).toBeInstanceOf(BitwiseField);
        expect(newField).not.toBe(field); // Immutable check
        expect(newField.rows[5]).not.toBe(0n);
      });

      it('should fail tryPlace if move is invalid', () => {
        const field = new BitwiseField(10, 10);
        const shape = BitwiseShape.fromData(['#']);
        // tryPlace usually calls isValidMove internally or returns null on collision
        const blockedField = field.tryPlace(shape, 0, 0);
        const collision = blockedField.tryPlace(shape, 0, 0);
        expect(collision).toBeNull();
      });

      it('visually verifies tryPlace in a larger field', () => {
        const field = new BitwiseField(10, 5);
        const block = BitwiseShape.fromData(['##']);

        const updatedField = field.tryPlace(block, 2, 1);

        const expected =
          '..........\n' + // row 0
          '..##......\n' + // row 1 (x=2)
          '..........\n' + // row 2
          '..........\n' + // row 3
          '..........'; // row 4

        expect(updatedField.toString()).toBe(expected);
      });
    });

    it('should correctly identify full and empty rows', () => {
      const smallField = new BitwiseField(3, 2);
      expect(smallField.isRowEmpty(0)).toBe(true);

      // Fill row 0: 0b111 = 7n
      const fullField = new BitwiseField(3, 2, [7n, 0n]);
      expect(fullField.isRowFull(0)).toBe(true);
      expect(fullField.isRowFull(1)).toBe(false);
    });

    it('should allow a row to be cleared and then verified as empty', () => {
      const rowField = new BitwiseField(5, 1, [31n]); // Full row
      expect(rowField.isRowFull(0)).toBe(true);
      rowField.clearRow(0);
      expect(rowField.isRowEmpty(0)).toBe(true);
    });

    it('should return a BitwiseField when flipping a BitwiseField', () => {
      const field = new BitwiseField(10, 10);
      const flipped = field.flipVertical();
      expect(flipped).toBeInstanceOf(BitwiseField);
      expect(flipped.tryPlace).toBeDefined(); // Method only on Field
    });

    it('should maintain the grid width even for empty rows', () => {
      const field = new BitwiseField(5, 2); // empty 5x2
      expect(field.toString()).toBe('.....\n.....');
    });

    describe('Mask Getters', () => {
      it('should generate correct wall masks for a 50-bit grid', () => {
        const field = new BitwiseField(50, 10);
        // Left wall should be 2^49
        expect(field.leftWallMask).toBe(1n << 49n);
        // Right wall should be 1
        expect(field.rightWallMask).toBe(1n);
      });

      it('should generate a full row mask correctly', () => {
        const field = new BitwiseField(4, 4);
        expect(field.isRowFull(0)).toBe(false);
        // 0b1111 is 15n
        const fullField = new BitwiseField(4, 1, [15n]);
        expect(fullField.isRowFull(0)).toBe(true);
      });
    });
  });
});
