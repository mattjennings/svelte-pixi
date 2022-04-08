<script context="module" lang="ts">
  export function getTicker(): PIXI.Ticker {
    return getContext('pixi/ticker')
  }

  export function onTick(fn: (delta: number) => any) {
    const ticker = getTicker()

    onMount(() => {
      ticker.add(fn)
      return () => {
        // @ts-ignore - safely check if ticker hasn't been destroyed
        if (ticker && ticker._head) {
          ticker.remove(fn)
        }
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

  type $$Props = {
    instance?: PIXI.Ticker
    autoStart?: PIXI.Ticker['autoStart']
    maxFPS?: PIXI.Ticker['maxFPS']
    minFPS?: PIXI.Ticker['minFPS']
    speed?: PIXI.Ticker['speed']
    priority?: number
  }

  const dispatch = createEventDispatcher()

  export let autoStart: $$Props['autoStart'] = true
  export let instance: $$Props['instance'] = new PIXI.Ticker()

  /**
   * UPDATE_PRIORITY of the PIXI.Ticker. Defaults to LOW
   */
  export let priority = PIXI.UPDATE_PRIORITY.LOW

  setContext('pixi/ticker', instance)

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
