/**
 * Logs a warning if the condition is met
 *
 * taken from https://github.com/alexreardon/tiny-warning/blob/master/src/index.js
 */
export function warning(condition: boolean, message: string): void {
  // condition passed: do not log
  if (condition) {
    return
  }

  const text = `Warning: ${message}`

  console.warn(text)

  // Throwing an error and catching it immediately
  // to improve debugging
  // A consumer can use 'pause on caught exceptions'
  // https://github.com/facebook/react/issues/4216
  try {
    throw Error(text)
    // eslint-disable-next-line no-empty
  } catch (x) {}
}

export function omitUndefined<T extends Record<string, any>>(object: T) {
  return Object.keys(object).reduce((acc, key) => {
    if (typeof object[key] === 'undefined') {
      return acc
    }

    return {
      ...acc,
      [key]: object[key],
    }
  }, {})
}
