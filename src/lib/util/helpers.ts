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

  const text: string = `Warning: ${message}`

  console.warn(text)

  // Throwing an error and catching it immediately
  // to improve debugging
  // A consumer can use 'pause on caught exceptions'
  // https://github.com/facebook/react/issues/4216
  try {
    throw Error(text)
  } catch (x) {}
}

export const createPixiEventDispatcher = (
  instance,
  dispatch,
  event,
  makeArgs: (...args: any[]) => any = (event) => event
) => {
  const callback = (...args) => dispatch(event, makeArgs(...args))

  instance.on(event, callback)

  return () => instance.off(event, callback)
}
