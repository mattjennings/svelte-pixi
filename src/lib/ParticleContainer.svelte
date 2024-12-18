<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.ParticleContainer>
  type $$Props = Container<T>['$$prop_def'] & {
    maxSize?: number
    properties?: PIXI.IParticleProperties
    batchSize?: number
    autoResize?: boolean
  }

  
  interface Props {
    /**
   * The maximum number of particles that can be rendered by the container.
   * Affects size of allocated buffers.
   */
    maxSize?: $$Props['maxSize'];
    /**
   * The properties of children that should be uploaded to the gpu and applied.
   *
   * @type {PIXI.IParticleProperties}
   */
    properties?: $$Props['properties'];
    /**
   * Number of particles per batch. If less than maxSize, it uses maxSize instead.
   */
    batchSize?: $$Props['batchSize'];
    /**
   * If true, container allocates more batches in case there are more than maxSize particles.
   */
    autoResize?: $$Props['autoResize'];
    /**
   * The PIXI.ParticleContainer instance. Can be set or bound to.
   *
   * @type {PIXI.ParticleContainer}
   */
    instance?: T;
    children?: import('svelte').Snippet;
    [key: string]: any
  }

  let {
    maxSize = 1500,
    properties = undefined,
    batchSize = 16384,
    autoResize = false,
    instance = $bindable() as T,
    children,
    ...rest
  }: Props = $props();
  instance = new PIXI.ParticleContainer(
    maxSize,
    properties,
    batchSize,
    autoResize,
  ) as T

  const { invalidate } = getRenderer()

  $effect.pre(() => {
    invalidate()
  })
</script>

<Container
  {...rest}
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
  {@render children?.()}
</Container>
