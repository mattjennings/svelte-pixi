<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.NineSlicePlane>
  type $$Props = Container<T>['$$prop_def'] & {
    texture: PIXI.NineSlicePlane['texture']
    leftWidth: PIXI.NineSlicePlane['leftWidth']
    rightWidth: PIXI.NineSlicePlane['rightWidth']
    topHeight: PIXI.NineSlicePlane['topHeight']
    bottomHeight: PIXI.NineSlicePlane['bottomHeight']
    geometry?: PIXI.NineSlicePlane['geometry']
    shader?: PIXI.MeshMaterial | PIXI.Shader
    state?: PIXI.NineSlicePlane['state']
    drawMode?: PIXI.NineSlicePlane['drawMode']
  }

  /**
   * The texture to use on the NineSlicePlane.
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
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all this data to the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Geometry}
   */
  export let geometry: $$Props['geometry'] = undefined

  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Shader|PIXI.MeshMaterial}
   */
  export let shader: $$Props['shader'] = undefined

  /**
   * Represents the WebGL state the Mesh required to render, excludes shader and geometry.
   * E.g., blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
   *
   * @type {PIXI.State}
   */
  export let state: $$Props['state'] = undefined

  /**
   * The way the Mesh should be drawn, can be any of the PIXI.DRAW_MODES constants.
   *
   * @type {PIXI.DRAW_MODES}
   */
  export let drawMode: $$Props['drawMode'] = undefined

  /**
   * The PIXI.NineSlicePlane instance. Can be set or bound to.
   *
   * @type {PIXI.NineSlicePlane}
   */
  export let instance: T = new PIXI.NineSlicePlane(
    texture,
    leftWidth,
    topHeight,
    rightWidth,
    bottomHeight,
  ) as T

  const { invalidate } = getRenderer()

  const { applyProps, applyProp } = createApplyProps<
    PIXI.NineSlicePlane,
    $$Props
  >(instance)

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('geometry', geometry)
  $: applyProp('shader', shader)
  $: applyProp('state', state)
  $: applyProp('drawMode', drawMode)
  $: applyProp('texture', texture)

  $: applyProps({
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
  })

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
