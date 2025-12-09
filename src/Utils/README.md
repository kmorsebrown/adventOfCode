# Resources

[How to create range in Javascript](https://dev.to/ycmjason/how-to-create-range-in-javascript-539i)

```javascript
function* range(start, end) {
  yield start;
  if (start === end) return;
  yield* range(start + 1, end);
}

let map = new Map();

const key = [...range(1, 5)];
const value = [...range(21, 25)];

for (let i = 0; i < key.length; i++) {
  map.set(key[i], value[i]);
}
```

## Exponentiation operator

`10 ** n` calculates `10` raised to the power of `n`.

Examples:

- `10 ** 0 = 1` (ones place)
- `10 ** 1 = 10` (tens place)
- `10 ** 2 = 100` (hundreds place)
- `10 ** 3 = 1000` (thousands place)

So if I wanted to put `x` in the `n`th digit, I could do this:

`x * (10 ** n)`
