<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.ParticleContainer>
  type $$Props = Container<T>['$$prop_def'] & {
    maxSize?: number
    properties?: PIXI.IParticleProperties
    batchSize?: number
    autoResize?: boolean
  }

  /**
   * The maximum number of particles that can be rendered by the container.
   * Affects size of allocated buffers.
   */
  export let maxSize: $$Props['maxSize'] = 1500

  /**
   * The properties of children that should be uploaded to the gpu and applied.
   *
   * @type {PIXI.IParticleProperties}
   */
  export let properties: $$Props['properties'] = undefined

  /**
   * Number of particles per batch. If less than maxSize, it uses maxSize instead.
   */
  export let batchSize: $$Props['batchSize'] = 16384

  /**
   * If true, container allocates more batches in case there are more than maxSize particles.
   */
  export let autoResize: $$Props['autoResize'] = false

  /**
   * The PIXI.ParticleContainer instance. Can be set or bound to.
   *
   * @type {PIXI.ParticleContainer}
   */
  export let instance: T = new PIXI.ParticleContainer(
    maxSize,
    properties,
    batchSize,
    autoResize,
  ) as T

  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })
</script>

<Container
  {...$$restProps}
  {instance}
  on:create
  on:click
  on:globalmousemove
  on:globalpointermove
  on:globaltouchmove
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
