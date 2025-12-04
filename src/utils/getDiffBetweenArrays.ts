/**
 * Returns the difference between two arrays, removing values present in the second array from the first.
 *
 * @param array - The array to inspect.
 * @param values - The values to exclude.
 * @returns Returns the new array of filtered values.
 *
 * @example
 *
 * getDiffBetweenArrays(); // []
 * getDiffBetweenArrays([1], [1]); // []
 * getDiffBetweenArrays([1, 2], [1]); // [2]
 * getDiffBetweenArrays([1, 2], [1]); // [2]
 */
export function getDiffBetweenArrays(array: unknown[], values: unknown[]) {
  if (!Array.isArray(array) || !Array.isArray(values)) return [];

  return array.reduce((acc, prev) => {
    if (values.includes(prev)) {
      return acc;
    }

    (acc as unknown[]).push(prev);

    return acc;
  }, []);
}
