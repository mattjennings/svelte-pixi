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
    unload?: boolean
    assets: Array<string | PIXI.UnresolvedAssetObject>
    bundleName: string
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
  export let bundleName: $$Props['bundleName'] = `svelte-pixi-loader-${++bundleCounter}`

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
  $: progress, invalidate()

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
          }),
      )

      dispatch('start')
      await Assets.loadBundle(bundleName, (prog) => {
        // loading isn't totally complete until this promise resolves,
        // so we'll track progress up to 1 and then set it to 1 ourselves afterwards
        if (prog < 1) {
          progress = prog
          dispatch('progress', progress)
        }
      })

      progress = 1
      dispatch('progress', progress)
      dispatch('complete')
    }

    load()
    return () => {
      if (unload) {
        Assets.unloadBundle(bundleName)
      }
    }
  })
</script>

{#if loading}
  <slot name="loading" {progress} />
{:else}
  <slot />
{/if}
