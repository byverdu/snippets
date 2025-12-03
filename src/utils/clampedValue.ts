type Params = {
  value: number;
  minValue?: number;
  maxValue?: number;
};

/**
 * Clamps a number within the inclusive range specified by minValue and maxValue.
 *
 * @param {number} value - The number to clamp.
 * @param {number} [minValue=0] - The minimum value.
 * @param {number} [maxValue=100] - The maximum value.
 * @returns {number} The clamped number.
 */
export function clampedValue(params: Params = {}) {
  const { value, minValue = 0, maxValue = 100 } = params;
  const castValue = Number(value);

  if (isNaN(castValue)) return minValue;

  return Math.min(Math.max(castValue, minValue), maxValue);
}
