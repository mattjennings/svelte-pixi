<script context="module" lang="ts">
  export interface ContainerProps<Instance extends Container = Container>
    extends ExtractProps<Container>,
      ExtractProps<GlobalMixins.Container> {
    instance?: Instance
    applyPropsOnMount?: boolean
  }
</script>

<script lang="ts">
  import { Container } from '@pixi/display'
  import { onMount, setContext } from 'svelte'
  import DisplayObject from './DisplayObject.svelte'
  import { getPixiContainer } from './util/context'
  import type { ExtractProps } from './util/props'

  type T = $$Generic<Container>
  type $$Props = ContainerProps<T>

  /**
   * By default the container instance will have its props applied
   * before the children component instances are added to it.
   * By setting this to true, the container will re-apply its props
   * after the children have been added.
   */
  export let applyPropsOnMount: $$Props['applyPropsOnMount'] = false

  /** @type {Container} Container instance to render */
  export let instance: Container = new Container()

  onMount(() => {
    if (applyPropsOnMount) {
      // hacky way to force update on children - this may be unsafe
      $$restProps = $$restProps
    }
  })

  let parent = getPixiContainer()
  setContext('pixi/container', instance)
</script>

<DisplayObject
  {instance}
  {parent}
  {...$$restProps}
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
</DisplayObject>
