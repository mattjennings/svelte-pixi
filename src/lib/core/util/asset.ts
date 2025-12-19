import { derived, readable, type Readable } from 'svelte/store'
import * as PIXI from 'pixi.js'

/**
 * Gets or loads an asset from PIXI.Assets and returns a readable store containing
 * the loaded asset. If the asset has not been loaded, the store will update
 * when the loading completes.
 */
export function asset<T = any>(
  src: string | PIXI.UnresolvedAsset,
  opts?: {
    onProgress?: (progress: number) => void
    onComplete?: (asset: PIXI.ResolvedAsset) => void
    onError?: (error: Error) => void
  },
): Readable<T | undefined> {
  let key: string

  if (typeof src === 'string') {
    key = src
  } else if (typeof src.src === 'string') {
    key = src.src
  } else if (src.alias) {
    if (typeof src.alias === 'string') {
      key = src.alias
    } else {
      key = src.alias[0]
    }
  } else {
    throw new Error(
      'Asset src must be a string or an object with a src or alias property',
    )
  }

  const isLoaded = PIXI.Assets.cache.has(key)

  const store = readable(isLoaded ? PIXI.Assets.get(key) : undefined, (set) => {
    if (!isLoaded) {
      PIXI.Assets.load(key, opts?.onProgress)
        .then((asset) => {
          set(asset)
          if (opts && opts.onComplete) {
            opts.onComplete(asset)
          }
        })
        .catch((error) => {
          if (opts && opts.onError) {
            opts.onError(error)
          } else {
            console.error(error)
          }
        })
    }
  })

  return store
}

/**
 * Similar to asset() but will ensure the returned asset is a PIXI.Texture. If
 * the asset has not been loaded an empty texture will be returned.
 */
export function texture<T extends PIXI.Texture>(
  src: string | PIXI.UnresolvedAsset,
  opts?: {
    onProgress?: (progress: number) => void
    onComplete?: (asset: PIXI.ResolvedAsset) => void
    onError?: (error: Error) => void
  },
) {
  const _asset = asset<T>(src, opts)

  return derived(_asset, ($asset) => {
    if (!$asset) {
      return PIXI.Texture.EMPTY
    }

    if ($asset instanceof PIXI.Texture) {
      return $asset
    }

    return PIXI.Texture.from($asset as any as PIXI.TextureSourceLike)
  })
}
