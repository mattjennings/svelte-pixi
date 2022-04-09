<script context="module" lang="ts">
  interface TickerContext<T extends PIXI.Ticker = PIXI.Ticker> {
    ticker: T
  }
  export function getTicker<T extends PIXI.Ticker = PIXI.Ticker>() {
    return getContext<TickerContext<T>>('pixi/ticker')
  }

  export function onTick(fn: (delta: number) => any) {
    const { ticker } = getTicker()

    onMount(() => {
      if (ticker) {
        ticker.add(fn)
        return () => {
          // @ts-ignore - safely check if ticker hasn't been destroyed
          if (ticker && ticker._head) {
            ticker.remove(fn)
          }
        }
      } else {
        throw new Error(`onTick requires a parent <Ticker />`)
      }
    })
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import {
    createEventDispatcher,
    getContext,
    onMount,
    setContext,
  } from 'svelte'
  import { applyProps } from './util/props'

  type T = $$Generic<PIXI.Ticker>
  type $$Props = {
    instance?: T
    autoStart?: PIXI.Ticker['autoStart']
    maxFPS?: PIXI.Ticker['maxFPS']
    minFPS?: PIXI.Ticker['minFPS']
    speed?: PIXI.Ticker['speed']
    priority?: number
  }

  const dispatch = createEventDispatcher()

  export let autoStart: $$Props['autoStart'] = true
  export let instance: T = new PIXI.Ticker() as T

  /**
   * UPDATE_PRIORITY of the PIXI.Ticker. Defaults to LOW
   */
  export let priority = PIXI.UPDATE_PRIORITY.LOW

  setContext<TickerContext<T>>('pixi/ticker', { ticker: instance })

  onMount(() => {
    instance.add((delta) => {
      dispatch('tick', delta)
    }, priority)

    return () => {
      instance.destroy()
    }
  })

  $: {
    applyProps(instance, { ...$$restProps, autoStart })
  }
</script>

<slot />
