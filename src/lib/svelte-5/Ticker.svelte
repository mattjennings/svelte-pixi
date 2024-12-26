<script lang="ts" module>
  export interface TickerProps<T extends PIXI.Ticker = PIXI.Ticker>
    extends PickPixiProps<
      PIXI.Ticker,
      'autoStart' | 'maxFPS' | 'minFPS' | 'speed'
    > {
    instance?: T

    /**
     * The priority for emitting the tick event.
     */
    priority?: number
    ontick?: (ticker: T) => void

    children?: Snippet<[]>
  }
</script>

<script lang="ts" generics="T extends PIXI.Ticker = PIXI.Ticker">
  import * as PIXI from 'pixi.js'

  import { onMount, type Snippet } from 'svelte'
  import { setTicker } from '../core/context/ticker'
  import { createApplyProps } from '../core/util/props'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    autoStart,
    maxFPS,
    minFPS,
    speed,
    priority,
    ontick,
    children,
    instance = $bindable(),
  }: TickerProps<T> = $props()

  if (!instance) {
    instance = new PIXI.Ticker() as T
  }

  setTicker(instance)

  onMount(() => {
    if (ontick) {
      instance.add(ontick, priority)
    }
    return () => {
      instance.destroy()
    }
  })

  const { applyProp } = createApplyProps<PIXI.Ticker, TickerProps<T>>(
    instance,
    {
      onApply() {
        instance.start()
      },
    },
  )

  $effect(() => applyProp('autoStart', autoStart))
  $effect(() => applyProp('maxFPS', maxFPS))
  $effect(() => applyProp('minFPS', minFPS))
  $effect(() => applyProp('speed', speed))
</script>

{#if children}
  {@render children?.()}
{/if}
