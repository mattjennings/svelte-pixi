import * as PIXI from 'pixi.js'
import { getContext, onMount, setContext } from 'svelte'

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
