<script context="module" lang="ts">
  export interface ContainerComponentProps<
    Instance extends PIXI.Container = PIXI.Container
  > extends ExtractProps<PIXI.Container>,
      ExtractProps<GlobalMixins.Container> {
    instance?: Instance
    applyPropsOnMount?: boolean
  }

  export function getContainer(): PIXI.Container {
    return getContext('pixi/container')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { getContext, onMount, setContext } from 'svelte'
  import DisplayObject from './DisplayObject.svelte'
  import type { ExtractProps } from './util/props'

  type T = $$Generic<PIXI.Container>
  type $$Props = ContainerComponentProps<T>

  /**
   * By default the container instance will have its props applied
   * before the children component instances are added to it.
   * By setting this to true, the container will re-apply its props
   * after the children have been added.
   */
  export let applyPropsOnMount: $$Props['applyPropsOnMount'] = false

  /** @type {Container} Container instance to render */
  export let instance: PIXI.Container = new PIXI.Container()

  onMount(() => {
    if (applyPropsOnMount) {
      // hacky way to force update on children - this may be unsafe
      $$restProps = $$restProps
    }
  })

  let parent = getContainer()

  if (!parent) {
    setContext('pixi/stage', instance)
  }

  setContext('pixi/container', instance)
</script>

<DisplayObject
  {instance}
  {parent}
  {...$$restProps}
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
</DisplayObject>
