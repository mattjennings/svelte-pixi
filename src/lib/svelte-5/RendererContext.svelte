<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { type Snippet } from 'svelte'
  import { setRenderer } from '../core/context/renderer'

  let {
    children,
    renderer,
    oninvalidate,
  }: {
    children: Snippet<[]>
    renderer: PIXI.Renderer
    oninvalidate?: () => void
  } = $props()

  // svelte-ignore state_referenced_locally
  setRenderer(renderer, {
    onInvalidate: () => {
      oninvalidate?.()
    },
  })
</script>

{@render children?.()}
