<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate, onMount } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.ParticleContainer>
  type Props = Container<T>['$$prop_def'] & {
    /**
     * The maximum number of particles that can be rendered by the container.
     * Affects size of allocated buffers.
     */
    maxSize?: number
    /**
     * The properties of children that should be uploaded to the gpu and applied.
     *
     * @type {PIXI.IParticleProperties}
     */
    properties?: PIXI.IParticleProperties
    /**
     * Number of particles per batch. If less than maxSize, it uses maxSize instead.
     */
    batchSize?: number
    /**
     * If true, container allocates more batches in case there are more than maxSize particles.
     */
    autoResize?: boolean

    /**
     * The PIXI.ParticleContainer instance. Can be set or bound to.
     *
     * @type {PIXI.ParticleContainer}
     */
    instance?: T
  }

  const {
    maxSize,
    properties,
    batchSize,
    autoResize,
    children,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ??
    new PIXI.ParticleContainer(maxSize, properties, batchSize, autoResize)) as T

  const { invalidate } = getRenderer()

  onMount(() => {
    invalidate()
  })
</script>

<Container {...restProps} {instance} {children} />
