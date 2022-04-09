<script lang="ts">
  /**
   * @restProps {SimplePlane}
   */
  import * as PIXI from 'pixi.js'
  import SimplePlane from './SimplePlane.svelte'
  import { applyProps } from './util/props'

  type T = $$Generic<PIXI.NineSlicePlane>
  type $$Props = Omit<SimplePlane<T>['$$prop_def'], 'vertices'> & {
    texture: PIXI.NineSlicePlane['texture']
    leftWidth: PIXI.NineSlicePlane['leftWidth']
    rightWidth: PIXI.NineSlicePlane['rightWidth']
    topHeight: PIXI.NineSlicePlane['topHeight']
    bottomHeight: PIXI.NineSlicePlane['bottomHeight']
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
   * The PIXI.NineSlicePlane instance. Can be set or bound to.
   *
   * @type {PIXI.NineSlicePlane}
   */
  export let instance: T = new PIXI.NineSlicePlane(
    texture,
    leftWidth,
    topHeight,
    rightWidth,
    bottomHeight
  ) as T

  $: applyProps(instance, {
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
  })
</script>

<SimplePlane
  vertices={undefined}
  {...$$restProps}
  {instance}
  {texture}
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
</SimplePlane>
