<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'

  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { applyProp } from './util/props'

  type T = $$Generic<PIXI.Sprite>
  type $$Props = Container<T>['$$prop_def'] & {
    anchor?: PIXI.Sprite['anchor']
    blendMode?: PIXI.Sprite['blendMode']
    pluginName?: PIXI.Sprite['pluginName']
    roundPixels?: PIXI.Sprite['roundPixels']
    texture?: PIXI.Sprite['texture']
  }

  export let anchor: $$Props['anchor'] = undefined
  export let blendMode: $$Props['blendMode'] = undefined
  export let pluginName: $$Props['pluginName'] = undefined
  export let roundPixels: $$Props['roundPixels'] = undefined
  export let texture: $$Props['texture'] = undefined

  /** @type {PIXI.Sprite} PIXI.Sprite instance to render */
  export let instance: T = new PIXI.Sprite($$props.texture) as T

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp(instance, { anchor })
  $: applyProp(instance, { blendMode })
  $: applyProp(instance, { pluginName })
  $: applyProp(instance, { roundPixels })
  $: applyProp(instance, { texture })
</script>

<Container
  {...$$restProps}
  {instance}
  on:click
  on:mousedown
  on:mousemove
  on:mouseout
  on:mouseover
  on:mouseup
  on:mouseupoutside
  on:mouseupoutside
  on:pointercancel
  on:pointerdown
  on:pointermove
  on:pointerout
  on:pointerover
  on:pointertap
  on:pointerup
  on:pointerupoutside
  on:removedFrom
  on:rightclick
  on:rightdown
  on:rightup
  on:rightupoutside
  on:tap
  on:touchcancel
  on:touchend
  on:touchendoutside
  on:touchmove
  on:touchstart
  on:added
  on:removed
>
  <slot />
</Container>
