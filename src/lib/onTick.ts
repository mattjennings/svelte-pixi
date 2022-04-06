import { getApp } from './Application.svelte'
import { onMount } from 'svelte'

export function onTick(fn: (delta: number) => any) {
  const app = getApp()

  onMount(() => {
    app.ticker.add(fn)
    return () => {
      app.ticker.remove(fn)
    }
  })
}
