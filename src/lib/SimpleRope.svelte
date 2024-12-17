<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { parsePoint, type PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.SimpleRope>
  type $$Props = Container<T>['$$prop_def'] & {
    texture: PIXI.SimpleRope['texture']
    points: PointLike[]
    geometry?: PIXI.SimpleRope['geometry']
    shader?: PIXI.SimpleRope['shader']
    state?: PIXI.SimpleRope['state']
    drawMode?: PIXI.SimpleRope['drawMode']
    textureScale?: number
  }

  /**
   * The texture to use
   *
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * An array of points or point-like objects to construct this rope.
   *
   * If this array changes the internal geometry will be recreated.
   * Consider using PIXI.Points and mutating them if that becomes too expensive.
   *
   * @type {PointLike[]}
   */
  export let points: $$Props['points']

  /**
   * Positive values scale rope texture keeping its aspect ratio.
   * You can reduce alpha channel artifacts by providing a larger texture and downsampling here.
   * If set to zero, texture will be stretched instead.
   *
   * @type {number}
   */
  export let textureScale: $$Props['textureScale'] = 0

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
   * The PIXI.SimpleRope instance. Can be set or bound to.
   *
   * @type {PIXI.SimpleRope}
   */
  export let instance: T = new PIXI.SimpleRope(
    texture,
    parsePoints(points),
    textureScale,
  ) as T

  function parsePoints(points: PointLike[]): PIXI.Point[] {
    return points.map(parsePoint)
  }

  const { applyProp } = createApplyProps<PIXI.SimpleRope, $$Props>(instance, {
    // PIXI.SimpleRope only uses points to create the geometry on construction,
    // so we need to recreate it whenever points change
    points: (value, instance) => {
      instance.geometry = new PIXI.RopeGeometry(
        texture.height,
        parsePoints(value),
        textureScale,
      )
    },
  })
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('geometry', geometry)
  $: applyProp('shader', shader)
  $: applyProp('state', state)
  $: applyProp('drawMode', drawMode)
  $: applyProp('texture', texture)
  $: applyProp('points', points)

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
