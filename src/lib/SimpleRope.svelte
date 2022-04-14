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

  type T = $$Generic<PIXI.SimpleRope>
  type $$Props = Omit<Mesh<T>['$$prop_def'], 'shader' | 'geometry'> & {
    texture: PIXI.SimpleRope['texture']
    points: PointLike[]
    geometry?: PIXI.SimpleRope['geometry']
    shader?: PIXI.SimpleRope['shader']
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
   * The PIXI.SimpleRope instance. Can be set or bound to.
   *
   * @type {PIXI.SimpleRope}
   */
  export let instance: T = new PIXI.SimpleRope(
    texture,
    parsePoints(points),
    textureScale
  ) as T

  function parsePoints(points: PointLike[]): PIXI.Point[] {
    return points.map(parsePoint)
  }

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp(instance, { texture })

  // PIXI.SimpleRope only uses points to create the geometry on construction,
  // so we need to recreate it whenever points change
  $: applyProp(instance, { points: parsePoints(points) }, (value) => {
    instance.geometry = new PIXI.RopeGeometry(
      texture.height,
      value,
      textureScale
    )
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
