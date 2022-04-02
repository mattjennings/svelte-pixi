<script context="module" lang="ts">
  export function getTicker(): Ticker {
    return getContext('pixi/ticker')
  }
</script>

<script lang="ts">
  import { BatchRenderer } from '@pixi/core'
  import { Ticker, UPDATE_PRIORITY } from '@pixi/ticker'
  import {
    createEventDispatcher,
    getContext,
    onMount,
    setContext,
  } from 'svelte'
  import { registerRendererPlugin } from './util/plugins'
  import { applyProps } from './util/props'

  type $$Props = {
    instance?: Ticker
    autoStart?: Ticker['autoStart']
    maxFPS?: Ticker['maxFPS']
    minFPS?: Ticker['minFPS']
    speed?: Ticker['speed']
    priority?: number
  }

  registerRendererPlugin('batch', BatchRenderer)
  const dispatch = createEventDispatcher()

  export let autoStart: $$Props['autoStart'] = true
  export let instance: $$Props['instance'] = new Ticker()

  /**
   * UPDATE_PRIORITY of the Ticker. Defaults to LOW
   */
  export let priority = UPDATE_PRIORITY.LOW

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
