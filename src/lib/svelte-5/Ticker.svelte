<script lang="ts" module>
  export interface TickerProps<
    T extends PIXI.Ticker = PIXI.Ticker,
  > extends PickPixiProps<
    PIXI.Ticker,
    'autoStart' | 'maxFPS' | 'minFPS' | 'speed'
  > {
    /**
     * The PIXI.Ticker instance. Can be manually set or bound to.
     *
     * WARNING: Type-safety limitation: If you are using a subclass of PIXI.Ticker,
     * you MUST provide the instance prop with your custom instance. Due to TypeScript's
     * limitations with generic types, if you don't provide an instance, a base
     * PIXI.Ticker will be created and cast to your type, which will cause runtime
     * errors when trying to access subclass-specific properties or methods.
     *
     * Example:
     *
     * ```typescript
     * class MyTicker extends PIXI.Ticker {
     *   myMethod() { ... }
     * }
     * const ticker = new MyTicker()
     *
     * <!-- Correct: always provide instance for subclasses. -->
     * <Ticker instance={ticker} />
     * ```
     */
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
    autoStart = true,
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
    return () => {
      instance?.destroy()
      instance = undefined
    }
  })

  const { applyProp } = createApplyProps<PIXI.Ticker, TickerProps<T>>(
    instance,
    {
      apply: {
        ontick: (value) => {
          if (value) {
            instance?.add(value, priority)
            return () => instance?.remove(value)
          }
        },
      },
    },
  )

  $effect(() => applyProp('autoStart', autoStart))
  $effect(() => applyProp('maxFPS', maxFPS))
  $effect(() => applyProp('minFPS', minFPS))
  $effect(() => applyProp('speed', speed))
  $effect(() => applyProp('ontick', ontick))
</script>

{#if children}
  {@render children?.()}
{/if}
