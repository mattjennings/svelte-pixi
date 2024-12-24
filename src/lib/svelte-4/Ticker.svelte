<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { createEventDispatcher, onMount } from 'svelte'
  import { createApplyProps } from '../core/util/props'
  import { setTicker } from '../core/context/ticker'

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
   * When setting this property it is clamped to a value between 0 and Ticker.targetFPMS * 1000
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

  setTicker(instance)

  const { applyProp } = createApplyProps<PIXI.Ticker>(instance)

  onMount(() => {
    instance.add((delta) => {
      dispatch('tick', delta)
    }, priority)

    return () => {
      instance.destroy()
    }
  })

  $: applyProp('autoStart', autoStart)
  $: applyProp('maxFPS', maxFPS)
  $: applyProp('minFPS', minFPS)
  $: applyProp('speed', speed)
</script>

<slot />
