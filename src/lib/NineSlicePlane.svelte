<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface NineSlicePlaneComponentProps<
    Instance extends PixiNineSlicePlane = PixiNineSlicePlane
  > extends ExtractProps<PixiNineSlicePlane>,
      ExtractProps<GlobalMixins.NineSlicePlane> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import { NineSlicePlane as PixiNineSlicePlane } from '@pixi/mesh-extras'
  import Mesh, { type MeshComponentProps } from './Mesh.svelte'

  type T = $$Generic<PixiNineSlicePlane>
  type $$Props = NineSlicePlaneComponentProps<T> & MeshComponentProps<T>

  export let instance: PixiNineSlicePlane = new PixiNineSlicePlane(
    ($$props as $$Props).texture,
    ($$props as $$Props).leftWidth,
    ($$props as $$Props).topHeight,
    ($$props as $$Props).rightWidth,
    ($$props as $$Props).bottomHeight
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
