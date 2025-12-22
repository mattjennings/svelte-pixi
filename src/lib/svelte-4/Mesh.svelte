<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.Mesh>

  type $$Props = Container<T>['$$prop_def'] & {
    geometry: PIXI.Mesh['geometry']
    shader: PIXI.Shader
    state?: PIXI.Mesh['state']
  }

  /**
   * Includes vertex positions, face indices, normals, colors, UVs, and
   * custom attributes within buffers, reducing the cost of passing all this data to the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Geometry}
   */
  export let geometry: $$Props['geometry']

  /**
   * Represents the vertex and fragment shaders that processes the geometry and runs on the GPU.
   * Can be shared between multiple Mesh objects.
   *
   * @type {PIXI.Shader|PIXI.MeshMaterial}
   */
  export let shader: $$Props['shader']

  /**
   * Represents the WebGL state the Mesh required to render, excludes shader and geometry.
   * E.g., blend mode, culling, depth testing, direction of rendering triangles, backface, etc.
   *
   * @type {PIXI.State}
   */
  export let state: $$Props['state'] = undefined

  /**
   * The PIXI.Mesh instance. Can be set or bound to.
   *
   * WARNING: Type-safety limitation - If you are using a subclass of PIXI.Mesh,
   * you MUST provide the instance prop with your custom instance. Due to TypeScript's
   * limitations with generic types, if you don't provide an instance, a base
   * PIXI.Mesh will be created and cast to your type, which will cause runtime
   * errors when trying to access subclass-specific properties or methods.
   *
   * Example:
   *
   * ```typescript
   * class MyMesh extends PIXI.Mesh {
   *   myMethod() { ... }
   * }
   * const mesh = new MyMesh(geometry, shader)
   *
   * <!-- Correct: always provide instance for subclasses -->
   * <Mesh instance={mesh} />
   * ```
   *
   * @type {PIXI.Mesh}
   */
  export let instance: T = new PIXI.Mesh({
    geometry,
    shader,
    state,
    isRenderGroup: $$restProps.isRenderGroup,
  }) as T

  const { applyProp } = createApplyProps<PIXI.Mesh>(instance)
  const { invalidate } = getRenderer()

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('geometry', geometry)
  $: applyProp('shader', shader)
  $: applyProp('state', state)
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
