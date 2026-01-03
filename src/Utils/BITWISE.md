# Bitwise

[TOC]

## Resources:

- https://web.archive.org/web/20191126002154/https://www.yoyogames.com/blog/46/an-introduction-to-binary
- http://graphics.stanford.edu/~seander/bithacks.html
- https://smithkruz.medium.com/mind-blowing-javascript-bitwise-hacks-youll-actually-use-208b45c35c6d
- https://github.com/xKaptanCan/BitForge?tab=readme-ov-file#-features-at-a-glance
  - Demo: https://xkaptancan.github.io/BitForge/
- https://www.digitalocean.com/community/tutorials/using-bitwise-operators-in-javascript

## Operators

### Byte

A byte => a collection of 8 bits. Bit start at bit 0 and go upwards.

There are 32 bits in an INTEGER, and the bits range from 0 to 31.

BYTE can store numbers from 0 to 255

BYTE table

```text
00000001 = 1
00000010 = 2
00000100 = 4
00001000 = 8
00010000 = 16
00100000 = 32
01000000 = 64
10000000 = 128
```

```text
00000010   = 2
00000100   = 4
00000110   = 6
```

### OR (|)

OR merges all the bits together into a single value.

- If either bit is 1, return 1
- If both bits are 0, return 0

TRUTH table for the OR

```text
00 | 00 = 00
00 | 01 = 01
01 | 01 = 01
01 | 00 = 01
```

### AND (&)

With AND, bits that are set in both values are kept, while the bits that are clear in either value, are removed.

- If both bits are 1, return 1
- If either bit is 0, return 0

TRUTH table for AND

```text
00 & 00 = 00
01 & 00 = 00
00 & 01 = 00
01 & 01 = 01
```

### NOT (~)

TRUTH table for NOT

```text
~ 00 = 11
~ 01 = 10
~ 10 = 01
~ 11 = 00
```

### Exclusive OR (^)

Exclusive OR (EOR or XOR) flips the bits set in both values.

- If both bits are different, then return 1
- If both bits are the same, then return 0

TRUTH table for Exclusive OR

```text
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

If you need to flip a specific bit, XOR has your back.

```javascript
const toggleBit = (num, bitPosition) => num ^ (1 << bitPosition);
console.log(toggleBit(5, 1)); // 7
// 5 = 0b0101
// 7 = 0b0111
```

### SHIFT Left (<<)

Syntax: Number << Position

The left side number of the shift operator is the actual number and the right side of the operator is the position. For example, `5 << 2` tells Javascript to perform a shift left on number 5 for two positions. Here is how JavaScript actually performs the shift left operation.

- It converts the number to the binary equivalent. In our case, number `5` will be converted to binary form: `0b101`.
- Adds two `00`s to the right of the binary string. This will result in `0b10100` for number `5`.
- Convert the binary string to a decimal number. In our case, it will be `20` for binary string `0b10100`.

SHIFT LEFT (multiplication) operator examples

```
00000100 * 2 = 00001000 = 8
```

```text
0b00000001 << 1 = 0b000000010 = 2
0b00000001 << 2 = 0b000000100 = 4
0b00000001 << 3 = 0b000001000 = 8
0b00000001 << 4 = 0b000010000 = 16
0b00000001 << 5 = 0b000100000 = 32
0b00000001 << 6 = 0b001000000 = 64
0b00000001 << 7 = 0b010000000 = 128
0b00000001 << 8 = 0b100000000 = 256
```

Can set constants for bit numbers.

Ex: Bit 5 is an "active" flag, and bit 0 is an "exploding" flag.

```javascript
const ACTIVE = 5;
const BOOM = 0;
let A = A | (1 << ACTIVE) | (1 << BOOM);
// 0b100001 => 33
```

The compiler will pre-compile these operations into a single value so that we end up with this as actual code.

```javascript
let A = A | 33;
```

Clearing these bits (as we saw above) is simply a matter of using the NOT modifier, like this…

```javascript
let A = A & ~((1 << ACTIVE) | (1 << BOOM));
// 0b000000 => 33
```

### SHIFT Right (>>)

Shift right operator will remove binary numbers from right. How many numbers will be removed? As you might have guessed, the number mentioned as the position.

Syntax: Number >> Position

Shift right operator will remove binary numbers from right. How many numbers will be removed? As you might have guessed, the number mentioned as the position.

Here is an example. Let's say we have `5 >> 2`.

- JavaScript will convert `5` to binary equivalent. `0b101` in our case.
- Remove two numbers from the right side. This will result in `0b1`.
- Convert the result into decimal. The result will be `1` in our case.

Here's an example of it being used for division

```
64 / 32 = 01000000  >> 5 = 00000010
```

I have an X and Y position, and I want to get the grid cell this falls in, where the grid is 32x32 in size. This method allows is to store objects, collisions, flags - all manner of things, and access them very quickly. So here we go.

```javascript
let  X_index = x>>5;
let Y_index = y>>5;
let cell_data = mygrid[# X_index,Y_index];
```

This is quick, very quick. This avoids the need to do a floating point divide, and then a floor() calculation - which all adds up.

So, what if we wanted the remainder? Perhaps this remainder is used as some kind of order or something, whatever the reason, getting a remainder is as simple as doing an AND.

```javascript
let r = x & 31;
let X_Index = x >> 5;
```

Bit 5 is 32, so all the bits below would be 31, and that's the maximum remainder so that's what we AND with.

We could also use `((1<<5)-1)` which would make `32-1 = 31`.

## Examples for Games

### Tile Alignment

If we use proper power-of-2 tiles, then we have a very simple method that's also lightning fast.

If we are moving right, and we've moved into a collision block, then as we know everything is aligned to 32, we need to also align the sprite to a 32 pixel boundary - preferably the one to the left, so the sprite is moved OUT of the collision! This is really easy, knowing the rules we've used above to get the remainder, and knowing how to get the inverse of bits, we can simply do this….

`X = x&~31;`

By changing the 31 we can align to anything we like - as long as it's a power of 2. (This is the equivalent of dividing by 32, then multiplying by 32, thereby removing the lower bits.)

If we wanted to align to the right, then we'd do the above, but then add 32 to move it into the next tile. Simple. All this makes the whole collision code monumentally faster, and lets you spend the CPU time where you really need it.

### Keys and Doors

Another example.... Let’s say you have a level with a few doors, and a key for each. How can you easily mark a key for a key?

Well, normally you'd just assign an ID to the key and the door.

So what if you wanted a key to open 2 or 3 doors? Easy. You use a MASK.

The door would have a single "bit" assigned like so:

```javascript
const doors = {
  1: {
    door_id: 1, //0b0001
  },
  2: {
    door_id: 2, //0b0010
  },
  3: {
    door_id: 4, //0b0100
  },
  4: {
    door_id: 8, //0b1000
  },
};
```

If we wanted the key to open door 1 and 3, the key would have the MASK of 5 (which is 101 in binary).

```javascript
const keys = {
  1: {
    key_id: 5, //0b0101
  },
};
```

If we perform and AND of this, and it comes out "not zero", then we know if the key can open the door. You could also have keys that opened nothing by having a MASK of 0. See the code below for the actual check....

```javascript
if ((key_id & door_id) != 0) {
  opendoor();
}
```

### Index alignment

Here's a quick bit of code to align to power of 2 numbers. (1,2,4,8,16 and so on).

This can be very useful for memory allocation, or making sure you write data to proper boundaries.

In this example, `argument0` needs to be aligned to `argument1` bytes, where `argument1` is a power of 2 number.

This little script rounds UP to the next boundary of the desired number.

```javascript
return (argument0 + (argument1 - 1)) & ~(argument1 - 1);
```
