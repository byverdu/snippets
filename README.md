# Snippets

A collection of stuff that I found useful, utils methods, react components and so on...

## utils methods

### numberWithinRange

Util for when you want to validate a number between a range of 2 other numbers. If the value is smaller than the min provided value, the min provided value will be returned. The same will apply for the max number;

```js
function numberWithinRange(value, minValue = 0, maxValue = 100) {
  return Math.min(Math.max(value, minValue), maxValue);
}

numberWithinRange(-1); // 0
numberWithinRange(10); // 10
numberWithinRange(110); // 100

numberWithinRange(10, 15); // 15
```

### sleep

For when you need to wait for a certain time before executing next code in an async way

```js
function sleep(duration) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(true);
    }, duration);
  });
}

sleep(500); // .5 secs
sleep(1500); // 1.5 sec
```

### chunk

Splits an array into chunks of a specified size.

```js
function chunk(array, size = 1) {
  const copy = [...array];
  const result: unknown[] = [];

  if (!Array.isArray(array) || size < 1) return result;

  while (copy.length >= 1) {
    result.push(copy.splice(0, size));
  }

  return result;
}

chunk([1,2,3,4], 2) // [[1,2],[3,4]]
chunk([1,2,3], 2) // [[1,2],[3]]
```

### Canceable timeout or interval

A function to cancel a timer before it finishes.

```js
function cancelTimeOut(callback, delay, ...args) {
  const timer = setTimeout(() => {
    callback(args);
  }, delay);

  return () => {
    clearTimeout(timer);
  };
}

const callBack = (a, b) => a + b;

const timer = cancelTimeOut(callback, 2000, 3, 4);

// Callback will not be executed as we stopped the timer at 1 sec
setTimeout(() => {
  timer();
}, 1000);
```
