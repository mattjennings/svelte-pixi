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

  /**
   * Whether or not this ticker starts automatically
   */
  export let autoStart: $$Props['autoStart'] = true

  /**
   * Manages the minimum amount of milliseconds required to elapse between invoking PIXI.Ticker#update.
   * This will effect the measured value of PIXI.Ticker#FPS.
   * If it is set to 0, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least minFPS
   */
  export let maxFPS: $$Props['maxFPS'] = 0

  /**
   * Manages the maximum amount of milliseconds allowed to elapse between invoking PIXI.Ticker#update.
   * This value is used to cap PIXI.Ticker#deltaTime, but does not effect the measured value of PIXI.Ticker#FPS.
   * When setting this property it is clamped to a value between 0 and PIXI.settings.TARGET_FPMS * 1000.
   */
  export let minFPS: $$Props['minFPS'] = 10

  /**
   * Factor of current PIXI.Ticker#deltaTime.
   */
  export let speed: $$Props['speed'] = 1

  /**
   * The PIXI.Ticker instance. Can be set or bound to.
   *
   * @type {PIXI.Ticker}
   */
  export let instance: T = new PIXI.Ticker() as T

  /**
   * Priority of the ticker for on:tick event. Defaults to LOW
   *
   * @type {PIXI.UPDATE_PRIORITY}
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

  $: applyProps(instance, { autoStart })
  $: applyProps(instance, { maxFPS })
  $: applyProps(instance, { minFPS })
  $: applyProps(instance, { speed })
</script>

<slot />
