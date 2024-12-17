<script context="module" lang="ts">
  export interface RendererContext<T extends PIXI.Renderer> {
    renderer: T
    invalidate: () => void
  }

  export function getRenderer<T extends PIXI.Renderer>(): RendererContext<T> {
    return getContext('pixi/renderer')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { createEventDispatcher, getContext, setContext } from 'svelte'

  export let renderer: PIXI.Renderer

  const dispatch = createEventDispatcher()
  setContext('pixi/renderer', {
    renderer,
    invalidate: () => {
      dispatch('invalidate')
    },
  })
</script>

<slot />
