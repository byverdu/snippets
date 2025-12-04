type Params = {
  value: number;
  minValue?: number;
  maxValue?: number;
};

/**
 * Clamps a number within the inclusive range specified by minValue and maxValue.
 *
 * @param params - The parameters object
 * @param params.value - The number to clamp
 * @param params.minValue - The minimum value (default: 0)
 * @param params.maxValue - The maximum value (default: 100)
 *
 * @returns The clamped number
 *
 * @example
 *
 * clampedValue() // 0
 * clampedValue(-1); // 0
 * clampedValue(10); // 10
 * clampedValue(110); // 100
 * clampedValue(10, 15); // 15
 */
export function clampedValue(params: Params = { value: 0 }) {
  const { value, minValue = 0, maxValue = 100 } = params;
  const castValue = Number(value);

  if (isNaN(castValue)) return minValue;

  return Math.min(Math.max(castValue, minValue), maxValue);
}
