<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface SimplePlaneComponentProps<
    Instance extends PIXI.SimplePlane = PIXI.SimplePlane
  > extends ExtractProps<PIXI.SimplePlane>,
      ExtractProps<GlobalMixins.Mesh> {
    instance?: Instance
    vertices: PointLike
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Mesh, { type MeshComponentProps } from './Mesh.svelte'
  import { parsePoint, type PointLike } from './util/data-types'

  type T = $$Generic<PIXI.SimplePlane>
  type $$Props = SimplePlaneComponentProps<T> & MeshComponentProps<T>

  export let vertices: $$Props['vertices']
  export let instance: PIXI.SimplePlane = new PIXI.SimplePlane(
    ($$props as $$Props).texture,
    parsePoint(vertices).x,
    parsePoint(vertices).y
  )
</script>

<Mesh
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
