import type PIXI from 'pixi.js'
import { getContext, onMount } from 'svelte'

export function onTick(fn: (delta: number) => any) {
  const app = getContext<PIXI.Application>('pixi/app')

  onMount(() => {
    app.ticker.add(fn)
    return () => {
      app.ticker.remove(fn)
    }
  })
}
