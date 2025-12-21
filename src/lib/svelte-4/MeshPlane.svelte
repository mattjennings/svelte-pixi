<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.MeshPlane>

  type $$Props = Container<T>['$$prop_def'] & {
    shader?: PIXI.MeshPlane['shader']
    state?: PIXI.MeshPlane['state']
    texture: PIXI.MeshPlaneOptions['texture']
    verticesX: PIXI.MeshPlaneOptions['verticesX']
    verticesY: PIXI.MeshPlaneOptions['verticesY']
  }

  /**
   * @type {PIXI.Texture}
   */
  export let texture: $$Props['texture']

  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Shader}
   */
  export let shader: $$Props['shader'] = undefined

  /**
   * Represents the WebGL state the Mesh required to render, excludes shader and geometry.
   * E.g., blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
   *
   * @type {PIXI.State}
   */
  export let state: $$Props['state'] = undefined

  /**
   * @type {number}
   */
  export let verticesX: number = 10

  /**
   * @type {number}
   */
  export let verticesY: number = 10

  /**
   * The PIXI.MeshPlane instance. Can be set or bound to.
   *
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.MeshPlane,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.MeshPlane will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MyMeshPlane extends PIXI.MeshPlane {
   *   myMethod() { ... }
   * }
   * const plane = new MyMeshPlane(texture)
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <MeshPlane instance={plane} />
   * ```
   *
   * @type {PIXI.MeshPlane}
   */
  export let instance: T = new PIXI.MeshPlane({
    texture,
    verticesX,
    verticesY,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { applyProp } = createApplyProps<PIXI.Mesh>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('texture', texture)
  $: applyProp('shader', shader)
  $: applyProp('state', state)

  $: texture.on('update', () => invalidate())
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
