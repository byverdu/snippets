/**
 * Splits an array into chunks of a specified size.
 *
 * @param {Array<unknown>} array - The array to chunk.
 * @param {number} [size=1] - The size of each chunk.
 * @returns {Array<Array<unknown>>} A new array containing the chunks.
 */
export function chunk(array: Array<unknown>, size = 1) {
  const result: unknown[] = [];

  if (!Array.isArray(array) || size < 1) return result;

  const copy = [...array];

  while (copy.length >= 1) {
    result.push(copy.splice(0, size));
  }

  return result;
}
