import { onMount } from 'svelte'
import { getPixiApp } from './util/context'

export function onTick(fn: (delta: number) => any) {
  const app = getPixiApp()

  onMount(() => {
    app.ticker.add(fn)
    return () => {
      app.ticker.remove(fn)
    }
  })
}
