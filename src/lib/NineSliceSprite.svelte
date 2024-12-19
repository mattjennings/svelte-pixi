<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.NineSliceSprite>
  type $$Props = Container<T>['$$prop_def'] & {
    texture: PIXI.NineSliceSprite['texture']
    leftWidth: PIXI.NineSliceSprite['leftWidth']
    rightWidth: PIXI.NineSliceSprite['rightWidth']
    topHeight: PIXI.NineSliceSprite['topHeight']
    bottomHeight: PIXI.NineSliceSprite['bottomHeight']
    width?: PIXI.NineSliceSprite['width']
    height?: PIXI.NineSliceSprite['height']
    shader?: PIXI.Shader
    roundPixels?: PIXI.NineSliceSprite['roundPixels']
  }

  /**
   * The texture to use on the NineSliceSprite.
   *
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * The width of the left column.
   *
   * @type {number}
   */
  export let leftWidth: $$Props['leftWidth']

  /**
   * The width of the right column.
   *
   * @type {number}
   */
  export let rightWidth: $$Props['rightWidth']

  /**
   * The height of the top row.
   *
   * @type {number}
   */
  export let topHeight: $$Props['topHeight']

  /**
   * The height of the bottom row.
   *
   * @type {number}
   */
  export let bottomHeight: $$Props['bottomHeight']

  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Shader|PIXI.MeshMaterial}
   */
  export let shader: $$Props['shader'] = undefined

  export let width: $$Props['width'] = undefined
  export let height: $$Props['height'] = undefined
  export let roundPixels: $$Props['roundPixels'] = undefined

  /**
   * The PIXI.NineSliceSprite instance. Can be set or bound to.
   *
   * @type {PIXI.NineSliceSprite}
   */
  export let instance: T = new PIXI.NineSliceSprite({
    texture,
    width,
    height,
    leftWidth,
    topHeight,
    rightWidth,
    bottomHeight,
    roundPixels,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { invalidate } = getRenderer()

  const { applyProps, applyProp } = createApplyProps<
    PIXI.NineSliceSprite,
    $$Props
  >(instance)

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('shader', shader)
  $: applyProp('texture', texture)
  $: applyProps({
    width,
    height,
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
  })
  $: applyProp('roundPixels', roundPixels)

  $: texture.on('update', () => invalidate())
</script>

<Container
  {...$$restProps}
  {instance}
  on:create
  on:click
  on:globalmousemove
  on:globalpointermove
  on:globaltouchmove
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
