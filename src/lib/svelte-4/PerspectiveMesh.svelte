<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { afterUpdate } from 'svelte'
  import Container from './Container.svelte'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  type T = $$Generic<PIXI.PerspectiveMesh>

  type $$Props = Container<T>['$$prop_def'] & {
    shader?: PIXI.PerspectiveMesh['shader']
    state?: PIXI.PerspectiveMesh['state']
    texture: PIXI.PerspectivePlaneOptions['texture']
    verticesX: PIXI.PerspectivePlaneOptions['verticesX']
    verticesY: PIXI.PerspectivePlaneOptions['verticesY']
    x0?: PIXI.PerspectivePlaneOptions['x0']
    y0?: PIXI.PerspectivePlaneOptions['y0']
    x1?: PIXI.PerspectivePlaneOptions['x1']
    y1?: PIXI.PerspectivePlaneOptions['y1']
    x2?: PIXI.PerspectivePlaneOptions['x2']
    y2?: PIXI.PerspectivePlaneOptions['y2']
    x3?: PIXI.PerspectivePlaneOptions['x3']
    y3?: PIXI.PerspectivePlaneOptions['y3']
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
   * @type {number}
   */
  export let x0: $$Props['x0'] = undefined

  /**
   * @type {number}
   */
  export let y0: $$Props['y0'] = undefined

  /**
   * @type {number}
   */
  export let x1: $$Props['x1'] = undefined

  /**
   * @type {number}
   */
  export let y1: $$Props['y1'] = undefined

  /**
   * @type {number}
   */
  export let x2: $$Props['x2'] = undefined

  /**
   * @type {number}
   */
  export let y2: $$Props['y2'] = undefined

  /**
   * @type {number}
   */
  export let x3: $$Props['x3'] = undefined

  /**
   * @type {number}
   */
  export let y3: $$Props['y3'] = undefined

  /**
   * The PIXI.PerspectiveMesh instance. Can be set or bound to.
   *
   * @type {PIXI.PerspectiveMesh}
   */
  export let instance: T = new PIXI.PerspectiveMesh({
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
  $: if (
    x0 !== undefined &&
    y0 !== undefined &&
    x1 !== undefined &&
    y1 !== undefined &&
    x2 !== undefined &&
    y2 !== undefined &&
    x3 !== undefined &&
    y3 !== undefined
  ) {
    instance.setCorners(x0, y0, x1, y1, x2, y2, x3, y3)
  }

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
