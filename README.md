# Snippets

A collection of stuff that I found useful, utils methods, react components and so on...

## utils methods

### numberWithinRange

Util for when you want to validate a number between a range of 2 other numbers. If the value is smaller than the min provided value, the min provided value will be returned. The same will apply for the max number;

```js
function numberWithinRange(value, minValue = 0, maxValue = 100) {
  return Math.min(Math.max(value, minValue), maxValue);
}

numberWithinRange(-1) // 0
numberWithinRange(10) // 10
numberWithinRange(110) // 100

numberWithinRange(10, 15) // 15
```
