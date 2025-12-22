<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'

  type T = $$Generic<PIXI.ParticleContainer>
  type $$Props = Container<T>['$$prop_def'] & {
    dynamicProperties?: PIXI.ParticleContainerOptions['dynamicProperties']
    shader?: PIXI.ParticleContainerOptions['shader']
    roundPixels?: PIXI.ParticleContainerOptions['roundPixels']
    texture?: PIXI.ParticleContainerOptions['texture']
    particles?: PIXI.ParticleContainerOptions['particles']
  }

  /**
   * @type {Record<string, boolean}
   */
  export let dynamicProperties: $$Props['dynamicProperties'] = undefined
  /**
   * @type {PIXI.Shader}
   */
  export let shader: $$Props['shader'] = undefined
  /**
   * @type {boolean}
   */
  export let roundPixels: $$Props['roundPixels'] = undefined
  /**
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture'] = undefined
  /**
   * @type {PIXI.IParticle[]}
   */
  export let particles: $$Props['particles'] = undefined

  /**
   * The PIXI.ParticleContainer instance. Can be set or bound to.
   *
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.ParticleContainer,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.ParticleContainer will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MyParticleContainer extends PIXI.ParticleContainer {
   *   myMethod() { ... }
   * }
   * const container = new MyParticleContainer()
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <ParticleContainer instance={container} />
   * ```
   *
   * @type {PIXI.ParticleContainer}
   */
  export let instance: T = new PIXI.ParticleContainer({
    dynamicProperties,
    shader,
    roundPixels,
    texture,
    particles,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

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
