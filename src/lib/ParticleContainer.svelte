<script context="module" lang="ts">
  export interface ParticleContainerComponentProps<
    Instance extends PIXI.ParticleContainer = PIXI.ParticleContainer
  > extends ExtractProps<PIXI.ParticleContainer> {
    instance?: Instance
    maxSize?: number
    properties?: PIXI.IParticleProperties
    batchSize?: number
    autoResize?: boolean
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'

  import Container, { type ContainerComponentProps } from './Container.svelte'
  import type { ExtractProps } from './util/props'

  type T = $$Generic<PIXI.ParticleContainer>
  type $$Props = ParticleContainerComponentProps<T> & ContainerComponentProps<T>

  export let maxSize: $$Props['maxSize'] = undefined
  export let properties: $$Props['properties'] = undefined
  export let batchSize: $$Props['batchSize'] = undefined
  export let autoResize: $$Props['autoResize'] = undefined

  /** @type {ParticleContainer} ParticleContainer instance to render */
  export let instance = new PIXI.ParticleContainer(
    maxSize,
    properties,
    batchSize,
    autoResize
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
