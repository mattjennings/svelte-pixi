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
  import { onMount, type Snippet } from 'svelte'
  import { getRenderer } from './Renderer.svelte'

  interface Props {
    /**
     * An array of assets to load. These will get loaded as a bundle.
     * @type {Array<string | PIXI.UnresolvedAssetObject>}
     */
    assets: Array<string | PIXI.UnresolvedAssetObject>

    /**
     * Unload the bundle when the component is unmounted, freeing
     * the assets from memory.
     *
     * Default is false
     *
     * @type {boolean}
     */

    unload?: boolean

    /**
     * The name of the bundle for the assets. By default a name is generated
     * for you.
     *
     * @type {string}
     */
    bundleName: string

    /**
     * A snippet to render while the assets are loading. The progress of the
     * load is passed as a prop.
     *
     * @type {Snippet<{ progress: number }>}
     */
    loading?: Snippet<{ progress: number }>
    children?: Snippet<void>

    oncomplete?: () => void
    onprogress?: (ev: { progress: number }) => void
    onstart?: () => void
  }

  const {
    assets,
    bundleName = `svelte-pixi-loader-${++bundleCounter}`,
    loading,
    unload,
    children,
    oncomplete,
    onprogress,
    onstart,
  } = $props<Props>()

  const { invalidate } = getRenderer()

  let progress = $state(0)

  onMount(() => {
    async function load() {
      Assets.addBundle(
        bundleName,
        assets.map((r) => {
          if (typeof r === 'string') {
            return { alias: r, src: r }
          }
          return r
        }),
      )

      onstart?.()

      await Assets.loadBundle(bundleName, (prog) => {
        // loading isn't totally complete until this promise resolves,
        // so we'll track progress up to 1 and then set it to 1 ourselves afterwards
        if (prog < 1) {
          progress = prog
          onprogress?.({ progress })
          invalidate()
        }
      })

      progress = 1
      oncomplete?.()
      invalidate()
    }

    load()
    return () => {
      if (unload) {
        Assets.unloadBundle(bundleName)
      }
    }
  })
</script>

{#if progress < 1 && loading}
  {@render loading({ progress })}
{:else if progress === 1 && children}
  {@render children()}
{/if}
