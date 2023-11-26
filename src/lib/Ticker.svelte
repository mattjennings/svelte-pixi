<script context="module" lang="ts">
  interface TickerContext<T extends PIXI.Ticker = PIXI.Ticker> {
    ticker: T
  }
  export function getTicker<T extends PIXI.Ticker = PIXI.Ticker>() {
    return getContext<TickerContext<T>>('pixi/ticker')
  }

  export function onTick(fn: (delta: number) => any, priority?: number) {
    const { ticker } = getTicker()

    onMount(() => {
      if (ticker) {
        ticker.add(fn, null, priority)
        return () => {
          try {
            ticker.remove(fn, null)
          } catch (e) {
            // no-op, ticker may have already been destroyed
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

  import { getContext, onMount, setContext, type Snippet } from 'svelte'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Ticker>
  interface Props {
    instance?: T
    autoStart?: PIXI.Ticker['autoStart']
    maxFPS?: PIXI.Ticker['maxFPS']
    minFPS?: PIXI.Ticker['minFPS']
    speed?: PIXI.Ticker['speed']
    priority?: number
    ontick?: (delta: number) => void

    children?: Snippet<void>
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
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.Ticker()) as T

  setContext<TickerContext<T>>('pixi/ticker', { ticker: instance })

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
