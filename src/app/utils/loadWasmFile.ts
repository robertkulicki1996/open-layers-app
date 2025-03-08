import * as Lerc from "lerc";

/**
 * Loads a WebAssembly (.wasm) file to decode LERC data.
 *
 * @async
 * @function loadWasm
 * @param {string} [wasmPath='/lerc-wasm.wasm'] - The path to the WebAssembly (.wasm) file in the public folder. Defaults to '/lerc-wasm.wasm'.
 * @returns {Promise<void>} A promise that resolves when the WebAssembly is successfully loaded, or is rejected if an error occurs.
 *
 * @throws {Error} If the WebAssembly file fails to load or Lerc initialization fails.
 *
 * @example
 * // Loading WebAssembly with the default path
 * loadWasm().then(() => {
 *   console.log('WebAssembly loaded successfully.');
 * }).catch((error) => {
 *   console.error('Error loading WebAssembly:', error);
 * });
 *
 * @example
 * // Loading WebAssembly with a custom path
 * loadWasm("/custom-path/lerc-wasm.wasm").then(() => {
 *   console.log('WebAssembly loaded from custom path.');
 * }).catch((error) => {
 *   console.error('Error loading WebAssembly:', error);
 * });
 */
export const loadWasm = async (locateFile = "/lerc-wasm.wasm"): Promise<void> => {
  try {
    await Lerc.load({ locateFile: () => locateFile });
    console.log("WebAssembly loaded successfully!");
  } catch (error) {
    console.error("Error loading WebAssembly:", error);
  }
};
