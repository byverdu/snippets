/**
 * Clamps a number within the inclusive range specified by minValue and maxValue.
 *
 * @param {number} value - The number to clamp.
 * @param {number} [minValue=0] - The minimum value.
 * @param {number} [maxValue=100] - The maximum value.
 * @returns {number} The clamped number.
 */
export function clampedValue(value: number, minValue = 0, maxValue = 100) {
  return Math.min(Math.max(value, minValue), maxValue);
}
