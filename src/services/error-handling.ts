/**
  * Wraps a function in try-catch block and returns function return value or undefined on error.
  * @param fn A function
  */
export function undefinedOnError(fn: () => any) {
  let value = undefined;
  try {
    value = fn();
  } catch {
    value = undefined;
  }
  return value;
}