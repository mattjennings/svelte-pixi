<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate, getContext } from 'svelte'
  import { addPixiInstance, applyProps, shouldApplyProps } from './util'
  import Sprite from './Sprite.svelte'

  // Sprite props
  export let anchor: PIXI.AnimatedSprite['anchor'] = undefined
  export let blendMode: PIXI.AnimatedSprite['blendMode'] = undefined
  export let pluginName: PIXI.AnimatedSprite['pluginName'] = undefined
  export let roundPixels: PIXI.AnimatedSprite['roundPixels'] = undefined
  export let texture: PIXI.AnimatedSprite['texture'] | string = undefined
  export let tint: PIXI.AnimatedSprite['tint'] = undefined

  // Container props
  export let height: PIXI.AnimatedSprite['height'] = undefined
  export let width: PIXI.AnimatedSprite['width'] = undefined
  export let sortableChildren: PIXI.AnimatedSprite['sortableChildren'] = undefined
  export let interactiveChildren: PIXI.AnimatedSprite['interactiveChildren'] = undefined

  // DisplayObject props
  export let accessible: PIXI.AnimatedSprite['accessible'] = undefined
  export let accessibleChildren: PIXI.AnimatedSprite['accessibleChildren'] = true
  export let accessibleHint: PIXI.AnimatedSprite['accessibleHint'] = undefined
  export let accessiblePointerEvents: PIXI.AnimatedSprite['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: PIXI.AnimatedSprite['accessibleTitle'] = undefined
  export let accessibleType: PIXI.AnimatedSprite['accessibleType'] = undefined
  export let alpha: PIXI.AnimatedSprite['alpha'] = undefined
  export let angle: PIXI.AnimatedSprite['angle'] = undefined
  export let buttonMode: PIXI.AnimatedSprite['buttonMode'] = undefined
  export let cacheAsBitmap: PIXI.AnimatedSprite['cacheAsBitmap'] = undefined
  export let cursor: PIXI.AnimatedSprite['cursor'] = undefined
  export let filterArea: PIXI.AnimatedSprite['filterArea'] = undefined
  export let filters: PIXI.AnimatedSprite['filters'] = undefined
  export let hitArea: PIXI.AnimatedSprite['hitArea'] = undefined
  export let interactive: PIXI.AnimatedSprite['interactive'] = undefined
  export let mask: PIXI.AnimatedSprite['mask'] = undefined
  export let name: PIXI.AnimatedSprite['name'] = undefined
  export let pivot: PIXI.AnimatedSprite['pivot'] = undefined
  export let position: PIXI.AnimatedSprite['position'] = undefined
  export let renderable: PIXI.AnimatedSprite['renderable'] = undefined
  export let rotation: PIXI.AnimatedSprite['rotation'] = undefined
  export let scale: PIXI.AnimatedSprite['scale'] = undefined
  export let skew: PIXI.AnimatedSprite['skew'] = undefined
  export let transform: PIXI.AnimatedSprite['transform'] = undefined
  export let visible: PIXI.AnimatedSprite['visible'] = undefined
  export let x: PIXI.AnimatedSprite['x'] = undefined
  export let y: PIXI.AnimatedSprite['y'] = undefined
  export let zIndex: PIXI.AnimatedSprite['zIndex'] = undefined

  // AnimatedSprite props
  export let autoUpdate: PIXI.AnimatedSprite['autoUpdate'] = undefined
  export let animationSpeed: PIXI.AnimatedSprite['animationSpeed'] = undefined
  export let playing: PIXI.AnimatedSprite['playing'] = true
  export let textures: PIXI.AnimatedSprite['textures'] | string[]

  function getTextures(
    textures: PIXI.AnimatedSprite['textures'] | string[]
  ): PIXI.Texture[] {
    return (textures as any[]).map((texture) =>
      typeof texture === 'string'
        ? app.loader.resources[texture]?.texture
        : texture
    )
  }

  const app = getContext<PIXI.Application>('pixi/app')
  const instance = new PIXI.AnimatedSprite(getTextures(textures), autoUpdate)

  $: shouldApplyProps(autoUpdate) && (instance.autoUpdate = autoUpdate)

  $: shouldApplyProps(playing) && (playing ? instance.play() : instance.stop())
  $: shouldApplyProps(textures) && (instance.textures = getTextures(textures))
  $: shouldApplyProps(animationSpeed) &&
    (instance.animationSpeed = animationSpeed)
</script>

<Sprite
  {instance}
  {accessible}
  {accessibleChildren}
  {accessibleHint}
  {accessiblePointerEvents}
  {accessibleTitle}
  {accessibleType}
  {alpha}
  {anchor}
  {angle}
  {blendMode}
  {buttonMode}
  {cacheAsBitmap}
  {cursor}
  {filterArea}
  {filters}
  {height}
  {hitArea}
  {interactive}
  {interactiveChildren}
  {mask}
  {name}
  {pivot}
  {pluginName}
  {position}
  {renderable}
  {rotation}
  {roundPixels}
  {scale}
  {skew}
  {sortableChildren}
  {texture}
  {tint}
  {transform}
  {visible}
  {width}
  {x}
  {y}
  {zIndex}>
  <slot />
</Sprite>
