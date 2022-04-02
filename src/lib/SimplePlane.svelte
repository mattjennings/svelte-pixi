<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface SimplePlaneComponentProps<
    Instance extends PixiSimplePlane = PixiSimplePlane
  > extends ExtractProps<PixiSimplePlane>,
      ExtractProps<GlobalMixins.Mesh> {
    instance?: Instance
    vertices: PointLike
  }
</script>

<script lang="ts">
  import { SimplePlane as PixiSimplePlane } from '@pixi/mesh-extras'
  import Container, { type ContainerComponentProps } from './Container.svelte'
  import { parsePoint, type PointLike } from './util/data-types'

  type T = $$Generic<PixiSimplePlane>
  type $$Props = SimplePlaneComponentProps<T> & ContainerComponentProps<T>

  export let vertices: $$Props['vertices']
  export let instance: PixiSimplePlane = new PixiSimplePlane(
    ($$props as $$Props).texture,
    parsePoint(vertices).x,
    parsePoint(vertices).y
  )
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
