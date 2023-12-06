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
