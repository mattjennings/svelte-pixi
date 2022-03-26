import { getPixi } from '$lib/Pixi.svelte'
import { onMount } from 'svelte'

export function onTick(fn: (delta: number) => any) {
  const { app } = getPixi()

  onMount(() => {
    app.ticker.add(fn)
    return () => {
      app.ticker.remove(fn)
    }
  })
}
