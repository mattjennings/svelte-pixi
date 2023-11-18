<script context="module">
  /**
   * An incrementing counter to ensure that the default value for
   * bundleName is always unique
   */
  let bundleCounter = 0
</script>

<script lang="ts">
  import { Assets } from 'pixi.js'
  import type * as PIXI from 'pixi.js'
  import { createEventDispatcher, onMount } from 'svelte'
  import { getRenderer } from './Renderer.svelte'

  interface $$Slots {
    default: {
      progress?: number
    }
    loading: {
      progress: number
    }
  }

  interface $$Events {
    complete: void
    progress: number
    start: void
  }

  type $$Props = {
    preferWorkers?: boolean
    bundleName?: string
    unload?: boolean
    assets: Array<string | PIXI.UnresolvedAssetObject>
  }

  /**
   * An array of assets to load. These will get loaded as a bundle.
   * @type {Array<string | PIXI.UnresolvedAssetObject>}
   */
  export let assets: $$Props['assets'] = []

  /**
   * The name of the bundle for the assets. By default a name is generated
   * for you.
   *
   * @type {string}
   */
  export let bundleName: string = `svelte-pixi-loader-${++bundleCounter}`

  /**
   * Unload the bundle when the component is unmounted, freeing
   * the assets from memory.
   *
   * Default is false
   *
   * @type {boolean}
   */
  export let unload: boolean = false

  const dispatch = createEventDispatcher<$$Events>()
  const { invalidate } = getRenderer()

  export let progress = 0

  $: loading = progress < 1

  onMount(() => {
    async function load() {
      const { cache } = Assets

      Assets.addBundle(
        bundleName,
        assets
          // filter out assets that are already loaded to prevent warning
          .filter((r) => {
            const key = typeof r === 'string' ? r : r.alias
            return !cache.has(key)
          })
          .map((r) => {
            if (typeof r === 'string') {
              return { alias: r, src: r }
            }
            return r
          })
      )

      dispatch('start')
      await Assets.loadBundle(bundleName, (prog) => {
        progress = prog

        dispatch('progress', progress)
      })
      console.log(Assets)
      progress = 1
      dispatch('complete')
    }

    load()
    return () => {
      if (unload) {
        Assets.unloadBundle(bundleName)
      }
    }
  })

  $: progress, invalidate()
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
