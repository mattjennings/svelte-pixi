<script lang="ts">
  import * as PIXI from 'pixi.js'

  import { onMount, type Snippet } from 'svelte'
  import { setTicker } from '../core/context/ticker'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.Ticker>
  interface Props {
    instance?: T
    autoStart?: PIXI.Ticker['autoStart']
    maxFPS?: PIXI.Ticker['maxFPS']
    minFPS?: PIXI.Ticker['minFPS']
    speed?: PIXI.Ticker['speed']
    priority?: number
    ontick?: (ticker: T) => void

    children?: Snippet<[]>
  }

  const {
    autoStart,
    maxFPS,
    minFPS,
    speed,
    priority,
    instance: _instance,
    ontick,
    children,
  }: Props = $props()

  export const instance = (_instance ?? new PIXI.Ticker()) as T

  setTicker(instance)

  onMount(() => {
    if (ontick) {
      instance.add(ontick, priority)
    }
    return () => {
      instance.destroy()
    }
  })

  const { applyProp } = createApplyProps<PIXI.Ticker, Props>(instance, {
    onApply() {
      instance.start()
    },
  })

  $effect(() => applyProp('autoStart', autoStart))
  $effect(() => applyProp('maxFPS', maxFPS))
  $effect(() => applyProp('minFPS', minFPS))
  $effect(() => applyProp('speed', speed))
</script>

{#if children}
  {@render children()}
{/if}
