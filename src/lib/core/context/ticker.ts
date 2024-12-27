import * as PIXI from 'pixi.js'
import { getContext, onMount, setContext, tick as svelteTick } from 'svelte'
import { derived, get, readable, type Writable, writable } from 'svelte/store'
import { getRenderer } from './renderer'

interface TickerContext<T extends PIXI.Ticker = PIXI.Ticker> {
  ticker: T
}

export function getTicker<T extends PIXI.Ticker = PIXI.Ticker>() {
  return getContext<TickerContext<T>>('pixi/ticker')
}

export function setTicker<T extends PIXI.Ticker = PIXI.Ticker>(ticker: T) {
  setContext<TickerContext<T>>('pixi/ticker', { ticker })
}

export function onTick<T extends PIXI.Ticker = PIXI.Ticker>(
  fn: (ticker: T) => any,
  priority?: number,
) {
  const { ticker } = getTicker()

  onMount(() => {
    if (ticker) {
      ticker.add(fn, null, priority)
      return () => {
        // @ts-ignore - safely check if ticker hasn't been destroyed
        if (ticker && ticker._head) {
          ticker.remove(fn, null)
        }
      }
    } else {
      throw new Error(`onTick requires a parent <Ticker />`)
    }
  })
}

/**
 * Runs the callback on every tick of the parent `<Ticker />`. Returns
 * the result as a writable Svelte store.
 */
export function tick<T>(
  callback: (ticker: PIXI.Ticker, prev?: T) => T,
  priority: number = -Infinity,
): Writable<T> {
  const ticker = getTicker()?.ticker
  let mounted = false

  if (!ticker) {
    throw new Error(`tick() requires a parent <Ticker />`)
  }

  const value = writable(callback(ticker))

  function update() {
    // run svelte tick() first incase stores were updated
    // and passed down as a prop between pixi ticks
    svelteTick().then(() => {
      if (mounted) {
        value.set(callback(ticker, get(value)))
      }
    })
  }

  onMount(() => {
    mounted = true
    ticker.add(update, null, priority)

    return () => {
      mounted = false
      ticker.remove(update, null)
    }
  })

  return value
}

/**
 * @deprecated - use `tick` instead
 */
export function track<T>(getter: () => T, initial?: T): Writable<T> {
  const { renderer } = getRenderer()
  const { ticker } = getTicker()

  const value = writable(initial)

  function update() {
    // svelte tick() first incase stores were updated
    // and passed down as a prop between pixi ticks
    svelteTick().then(() => {
      value.set(getter())
    })
  }

  onMount(() => {
    if (!ticker) {
      const item = {
        postrender: update,
      }
      renderer.runners.postrender.add(item)
      return () => {
        renderer.runners.postrender.remove(item)
      }
    }
  })

  if (ticker) {
    onTick(() => {
      update()
    }, -Infinity)
  }

  return value
}
