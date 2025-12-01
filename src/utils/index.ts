/**
 * Clamps a number within the inclusive range specified by minValue and maxValue.
 *
 * @param {number} value - The number to clamp.
 * @param {number} [minValue=0] - The minimum value.
 * @param {number} [maxValue=100] - The maximum value.
 * @returns {number} The clamped number.
 */
function numberWithinRange(value: number, minValue = 0, maxValue = 100) {
  return Math.min(Math.max(value, minValue), maxValue);
}

/**
 * Delays code execution for a set duration.
 *
 * @param {number} duration - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves to true after the specified duration.
 */
function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, duration);
  });
}

/**
 * Cancels a timeout before it executes.
 *
 * @param {(args: Array<unknown>) => void} callback - The function to invoke after the delay.
 * @param {number} delay - The delay in milliseconds before the callback is invoked.
 * @param {...Array<unknown>} args - Arguments to pass to the callback function.
 * @returns {() => void} A function that, when called, clears the timeout.
 */

function cancelTimeOut(
  callback: (args: Array<unknown>) => void,
  delay: number,
  ...args: Array<unknown>
) {
  const timer = setTimeout(() => {
    callback(args);
  }, delay);

  return () => {
    clearTimeout(timer);
  };
}

/**
 * Splits an array into chunks of a specified size.
 *
 * @param {Array<unknown>} array - The array to chunk.
 * @param {number} [size=1] - The size of each chunk.
 * @returns {Array<Array<unknown>>} A new array containing the chunks.
 */
function chunk(array: Array<unknown>, size = 1) {
  const copy = [...array];
  const result: unknown[] = [];

  if (!Array.isArray(array) || size < 1) return result;

  while (copy.length >= 1) {
    result.push(copy.splice(0, size));
  }

  return result;
}

/**
 * Returns the difference between two arrays, removing values present in the second array from the first.
 *
 * @param {unknown[]} array - The array to inspect.
 * @param {unknown[]} values - The values to exclude.
 * @returns {unknown[]} Returns the new array of filtered values.
 */
function differenceBetweenArrays(array: unknown[], values: unknown[]) {
  return array.reduce((acc, prev) => {
    if (values.includes(prev)) {
      return acc;
    }

    (acc as unknown[]).push(prev);

    return acc;
  }, []);
}

export {
  numberWithinRange,
  sleep,
  cancelTimeOut,
  chunk,
  differenceBetweenArrays,
};
