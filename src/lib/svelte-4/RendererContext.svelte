<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { createEventDispatcher } from 'svelte'
  import { setRenderer } from '../core/context/renderer'

  export let renderer: PIXI.Renderer

  const dispatch = createEventDispatcher()
  setRenderer(renderer, {
    onInvalidate: () => {
      dispatch('invalidate')
    },
  })
</script>

<slot />
