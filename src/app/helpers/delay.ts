/**
 * Creates a delay for the specified amount of time.
 * The function returns a `Promise` that resolves after the given timeout.
 * 
 * @param {number} timeout - The delay time in milliseconds (ms).
 * @returns {Promise<void>} A promise that resolves after the `timeout` period has passed.
 * 
 * @example
 * // Example usage of the delay function:
 * async function fetchData() {
 *   console.log("Please wait...");
 *   await delay(2000); // Delay for 2 seconds
 *   console.log("After 2 seconds!");
 * }
 * 
 * fetchData();
 */
export const delay = (timeout: number) => {
  return new Promise((res) => {
    setTimeout(res, timeout);
  });
};