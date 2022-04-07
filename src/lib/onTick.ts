import { onMount } from 'svelte'
import { getTicker } from './Ticker.svelte'

export function onTick(fn: (delta: number) => any) {
  const ticker = getTicker()

  onMount(() => {
    ticker.add(fn)
    return () => {
      ticker.remove(fn)
    }
  })
}
