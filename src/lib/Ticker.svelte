<script context="module" lang="ts">
  if (typeof window !== 'undefined') {
    registerRendererPlugin('batch', BatchRenderer)
  }

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
  }

  const dispatch = createEventDispatcher()

  export let autoStart: $$Props['autoStart'] = true
  export let instance: $$Props['instance'] = new Ticker()

  setContext('pixi/ticker', instance)

  onMount(() => {
    instance.add((delta) => {
      dispatch('tick', delta)
    }, UPDATE_PRIORITY.LOW)
  })

  $: {
    applyProps(instance, { ...$$restProps, autoStart })
  }
</script>

<slot />
