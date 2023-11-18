# v7 Migration Guide

## <Loader /> -> <AssetsLoader />

[PIXI.Loader has been replaced by PIXI.Assets](https://github.com/pixijs/pixijs/wiki/v7-Migration-Guide#-replaces-loader-with-assets) so the `Loader` component has been replaced by `AssetsLoader`. It works similarly but has a few notable differences:

- The `resources` prop is now `assets`. It accepts an array of urls or objects matching the [PIXI.UnresolvedAssetObject](https://pixijs.download/dev/docs/PIXI.html#UnresolvedAssetObject) type.
- Any Asset configurations should be set by calling `PIXI.Assets.init()` before rendering this component.

```svelte
<script>
  import { Application, AssetsLoader, Sprite, Text } from 'svelte-pixi'
  import * as PIXI from 'pixi.js'

  const initPromise = PIXI.Assets.init({
    baseUrl: '/assets'
  })
</script>

{#await initPromise}
{:then}
  <AssetsLoader assets={['/sprite.png']}>
    <slot let:progress  slot="loading">
      <Text text={`Loading... ${progress}`} x={200} y={200} anchor={0.5} />
    </slot>

    <Sprite
      texture={PIXI.Texture.from('/sprite.png')}
      x={20}
      y={50}
      width={360}
      height={300}
    />
  </AssetsLoader>
{/await}
```
