/**
 * Splits an array into chunks of a specified size.
 *
 * @param array - The array to chunk.
 * @param [size = 1] - The size of each chunk.
 * @returns A new array containing the chunks.
 *
 * @example
 * chunk() // []
 * chunk([1,2,3,4], 2) // [[1,2],[3,4]]
 * chunk([1,2,3,4], 0) // []
 * chunk([1,2,3], 2) // [[1,2],[3]]
 */
export function chunk(array: Array<unknown>, size = 1): Array<unknown> {
  const result: unknown[] = [];

  if (!Array.isArray(array) || size < 1) return result;

  const copy = [...array];

  while (copy.length >= 1) {
    result.push(copy.splice(0, size));
  }

  return result;
}
