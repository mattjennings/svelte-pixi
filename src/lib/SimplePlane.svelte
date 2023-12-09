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

  type T = $$Generic<PIXI.SimplePlane>
  type $$Props = Container<T>['$$prop_def'] & {
    texture: PIXI.SimplePlane['texture']
    vertices: PointLike
    geometry?: PIXI.SimplePlane['geometry']
    shader?: PIXI.MeshMaterial | PIXI.Shader
    state?: PIXI.SimplePlane['state']
    drawMode?: PIXI.SimplePlane['drawMode']
  }

  /**
   * The texture to use
   *
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * The number of vertices in the plane. This is only used on initial mount.
   * If you need to update the vertices, you will have to update the geometry buffer
   * from the instance.
   *
   * @type {PointLike}
   */
  export let vertices: $$Props['vertices']

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
   * The PIXI.SimplePlane instance. Can be set or bound to.
   *
   * @type {PIXI.SimplePlane}
   */
  export let instance: T = new PIXI.SimplePlane(
    texture,
    parsePoint(vertices).x,
    parsePoint(vertices).y,
  ) as T

  const { applyProp } = createApplyProps<PIXI.SimplePlane>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('geometry', geometry)
  $: applyProp('shader', shader)
  $: applyProp('state', state)
  $: applyProp('drawMode', drawMode)
  $: applyProp('texture', texture)

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
