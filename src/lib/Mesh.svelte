<script context="module" lang="ts">
  import type { ExtractProps } from './util/props'

  export interface MeshComponentProps<Instance extends PixiMesh = PixiMesh>
    extends ExtractProps<PixiMesh>,
      ExtractProps<GlobalMixins.Text> {
    instance?: Instance
  }
</script>

<script lang="ts">
  import { Mesh as PixiMesh } from '@pixi/mesh'
  import Container, { type ContainerComponentProps } from './Container.svelte'

  type T = $$Generic<PixiMesh>
  type $$Props = MeshComponentProps<T> & ContainerComponentProps<T>

  export let instance: PixiMesh = new PixiMesh(
    ($$props as $$Props).geometry,
    ($$props as $$Props).shader,
    ($$props as $$Props).state,
    ($$props as $$Props).drawMode
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
