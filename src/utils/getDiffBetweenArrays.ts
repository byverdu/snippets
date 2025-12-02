/**
 * Returns the difference between two arrays, removing values present in the second array from the first.
 *
 * @param {unknown[]} array - The array to inspect.
 * @param {unknown[]} values - The values to exclude.
 * @returns {unknown[]} Returns the new array of filtered values.
 */
export function getDiffBetweenArrays(array: unknown[], values: unknown[]) {
  return array.reduce((acc, prev) => {
    if (values.includes(prev)) {
      return acc;
    }

    (acc as unknown[]).push(prev);

    return acc;
  }, []);
}
