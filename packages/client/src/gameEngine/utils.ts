/**
 *
 * @param min
 * @param max
 * @returns Random integer between min and max, inclusively
 */
export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param min
 * @param max
 * @returns Random number between min and max, exclusively
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
