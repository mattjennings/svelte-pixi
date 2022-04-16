<script lang="ts">
  /**
   * @restProps {Mesh}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Mesh from './Mesh.svelte'
  import { getRenderer } from './Renderer.svelte'
  import { parsePoint, type PointLike } from './util/data-types'
  import { applyProp } from './util/props'

  type T = $$Generic<PIXI.SimplePlane>
  type $$Props = Omit<Mesh<T>['$$prop_def'], 'shader' | 'geometry'> & {
    texture: PIXI.SimplePlane['texture']
    vertices: PointLike
    geometry?: PIXI.SimplePlane['geometry']
    shader?: PIXI.SimplePlane['shader']
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
   * The PIXI.SimplePlane instance. Can be set or bound to.
   *
   * @type {PIXI.SimplePlane}
   */
  export let instance: T = new PIXI.SimplePlane(
    texture,
    parsePoint(vertices).x,
    parsePoint(vertices).y
  ) as T

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp(instance, { texture }, (texture) => {
    instance.texture = texture
    texture.on('update', () => invalidate())
  })
</script>

<Mesh
  geometry={undefined}
  shader={undefined}
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
</Mesh>
