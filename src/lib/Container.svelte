<script context="module" lang="ts">
  interface ContainerContext<T extends PIXI.Container = PIXI.Container> {
    container: T
  }
  interface StageContext<T extends PIXI.Container = PIXI.Container> {
    stage: T
  }

  export function getContainer<T extends PIXI.Container = PIXI.Container>() {
    return getContext<ContainerContext<T>>('pixi/container')
  }

  export function getStage<T extends PIXI.Container = PIXI.Container>() {
    return getContext<StageContext<T>>('pixi/stage')
  }
</script>

<script lang="ts">
  import * as PIXI from 'pixi.js'
  import {
    afterUpdate,
    createEventDispatcher,
    getContext,
    onMount,
    setContext,
  } from 'svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Container>

  type $$Props = {
    accessible?: PIXI.Container['accessible']
    accessibleChildren?: PIXI.Container['accessibleChildren']
    accessibleHint?: PIXI.Container['accessibleHint']
    accessiblePointerEvents?: PIXI.Container['accessiblePointerEvents']
    accessibleTitle?: PIXI.Container['accessibleTitle']
    accessibleType?: PIXI.Container['accessibleType']
    alpha?: PIXI.Container['alpha']
    angle?: PIXI.Container['angle']
    cacheAsTexture?: boolean | PIXI.CacheAsTextureOptions
    cacheAsBitmap?: PIXI.Container['cacheAsBitmap']
    cullable?: PIXI.Container['cullable']
    cullArea?: PIXI.Container['cullArea']
    cursor?: PIXI.Container['cursor']
    filterArea?: PIXI.Container['filterArea']
    filters?: PIXI.Container['filters']
    height?: PIXI.Container['height']
    hitArea?: PIXI.Container['hitArea']
    eventMode?: PIXI.Container['eventMode']
    interactive?: PIXI.Container['interactive']
    interactiveChildren?: PIXI.Container['interactiveChildren']
    isRenderGroup?: PIXI.Container['isRenderGroup']
    mask?: PIXI.Container['mask']
    name?: PIXI.Container['name']
    label?: PIXI.Container['label']
    pivot?: PointLike
    position?: PointLike
    renderable?: PIXI.Container['renderable']
    rotation?: PIXI.Container['rotation']
    scale?: PointLike
    skew?: PointLike
    sortableChildren?: PIXI.Container['sortableChildren']
    width?: PIXI.Container['width']
    localTransform?: PIXI.Container['localTransform']
    groupTransform?: PIXI.Container['groupTransform']
    worldTransform?: PIXI.Container['worldTransform']
    visible?: PIXI.Container['visible']
    x?: PIXI.Container['x']
    y?: PIXI.Container['y']
    zIndex?: PIXI.Container['zIndex']
    instance?: T
    applyPropOnMount?: boolean
  }

  /**
   * Flag for if the object is accessible.
   * If true AccessibilityManager will overlay a shadow div with attributes set
   *
   * @type {boolean}
   */
  export let accessible: $$Props['accessible'] = false

  /**
   * Setting to false will prevent any children inside this container to be accessible.
   *
   * @type {boolean}
   */
  export let accessibleChildren: $$Props['accessibleChildren'] = true

  /**
   * Sets the aria-label attribute of the shadow div
   *
   * @type {string}
   */
  export let accessibleHint: $$Props['accessibleHint'] = undefined

  /**
   * Specify the pointer-events the accessible div will use Defaults to auto.
   *
   * @type {string}
   */
  export let accessiblePointerEvents: $$Props['accessiblePointerEvents'] =
    'auto'

  /**
   * Sets the title attribute of the shadow div If accessibleTitle AND accessibleHint
   * has not been this will default to 'displayObject [tabIndex]'
   *
   * @type {string}
   */
  export let accessibleTitle: $$Props['accessibleTitle'] = undefined

  /**
   * Specify the type of div the accessible layer is.
   * Screen readers treat the element differently depending on this type.
   *
   * @type {string}
   */
  export let accessibleType: $$Props['accessibleType'] = 'button'

  /**
   * The opacity of the object.
   *
   * @type {number}
   */
  export let alpha: $$Props['alpha'] = undefined

  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object;
   * rotation is in radians, angle is in degrees.
   *
   * @type {number}
   */
  export let angle: $$Props['angle'] = undefined

  /**
   * Legacy property for backwards compatibility with PixiJS v7 and below.
   * Use `cacheAsTexture` instead.
   * @deprecated Since PixiJS v8
   */
  export let cacheAsBitmap: $$Props['cacheAsBitmap'] = undefined

  /**
   * Caches this container as a texture. This allows the container to be rendered as a single texture,
   * which can improve performance for complex static containers.
   *
   * If true, enables caching with default options. If false, disables caching.
   * Can also pass options object to configure caching behavior.
   */
  export let cacheAsTexture: $$Props['cacheAsTexture'] = undefined

  /**
   * Should this object be rendered if the bounds of this object are out of frame?
   *
   * Culling has no effect on whether updateTransform is called.
   *
   * @type {boolean}
   */
  export let cullable: $$Props['cullable'] = undefined

  /**
   * If set, this shape is used for culling instead of the bounds of this object.
   * It can improve the culling performance of objects with many children.
   * The culling area is defined in local space.
   *
   * @type {PIXI.Rectangle}
   */
  export let cullArea: $$Props['cullArea'] = undefined

  /**
   * This defines what cursor mode is used when the mouse cursor is hovered over the displayObject.
   *
   * @type {string}
   */
  export let cursor: $$Props['cursor'] = undefined

  /**
   * The type of interaction a DisplayObject can be.
   * For more information on values and their meaning, see https://pixijs.download/dev/docs/PIXI.DisplayObject.html#eventMode
   *
   * @type {PIXI.EventMode}
   */
  export let eventMode: $$Props['eventMode'] = undefined

  /**
   * The area the filter is applied to.
   * This is used as more of an optimization rather than figuring out the dimensions of
   * the displayObject each frame you can set this rectangle.
   *
   * Also works as an interaction mask.
   *
   * @type {PIXI.Rectangle}
   */
  export let filterArea: $$Props['filterArea'] = undefined

  /**
   * Sets the filters for the displayObject.
   *
   * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer. To remove filters simply set this property to 'null'.
   *
   * @type {PIXI.Filter[] | null}
   */
  export let filters: $$Props['filters'] = undefined

  /**
   * The height of the Container, setting this will actually modify the scale to achieve the value set.
   *
   * @type {number}
   */
  export let height: $$Props['height'] = undefined

  /**
   * Interaction shape. Children will be hit first, then this shape will be checked.
   * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
   *
   * @type {PIXI.IHitArea}
   */
  export let hitArea: $$Props['hitArea'] = undefined

  /**
   * Enable interaction events for the DisplayObject.
   * Touch, pointer and mouse events will not be emitted unless interactive is set to true.
   *
   * @type {boolean}
   * @deprecated since 7.0.0, Setting interactive is deprecated, use eventMode='none'/'passive'/'auto'/'static'/'dynamic' instead.
   */
  export let interactive: $$Props['interactive'] = undefined

  /**
   * Determines if the children to the displayObject can be clicked/touched.
   * Setting this to false allows PixiJS to bypass a recursive hitTest function
   *
   * @type {boolean}
   * @deprecated since 7.0.0, Setting interactive is deprecated, use eventMode='none'/'passive'/'auto'/'static'/'dynamic' instead.
   */
  export let interactiveChildren: $$Props['interactiveChildren'] = undefined

  /**
   * Sets a mask for the displayObject.
   * A mask is an object that limits the visibility of an object to the shape
   * of the mask applied to it. In PixiJS a regular mask must be a
   * PIXI.Graphics or a PIXI.Sprite object.
   * This allows for much faster masking in canvas as it utilities shape clipping.
   * To remove a mask, set this property to null.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   *
   * At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as mask.
   *
   * @type {PIXI.Container | PIXI.MaskData | null}
   */
  export let mask: $$Props['mask'] = undefined

  /**
   * The instance name of the object.
   *
   * @deprecated use `label` instead, name will map to `label`
   * @type {string}
   */
  export let name: $$Props['name'] = undefined

  /**
   * The instance label of the object.
   *
   * @type {string}
   */
  export let label: $$Props['label'] = undefined

  /**
   * The center of rotation, scaling, and skewing for this display object in its local space.
   * The position is the projection of pivot in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   *
   * @type {PointLike}
   */
  export let pivot: $$Props['pivot'] = undefined

  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   *
   * @type {PointLike}
   */
  export let position: $$Props['position'] = undefined

  /**
   * Can this object be rendered, if false the object will not be drawn but
   * the updateTransform methods will still be called.
   *
   * Only affects recursive calls from parent. You can ask for bounds manually
   *
   * @type {boolean}
   */
  export let renderable: $$Props['renderable'] = undefined

  /**
   * The rotation of the object in radians. 'rotation' and 'angle' have the
   * same effect on a display object; rotation is in radians, angle is in degrees.
   *
   * @type {number}
   */
  export let rotation: $$Props['rotation'] = undefined

  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   *
   * @type {PointLike}
   */
  export let scale: $$Props['scale'] = undefined

  /**
   * The skew factor for the object in radians.
   *
   * @type {PointLike}
   */
  export let skew: $$Props['skew'] = undefined

  /**
   * If set to true, the container will sort its children by zIndex value when
   * updateTransform() is called, or manually if sortChildren() is called.
   *
   * This actually changes the order of elements in the array, so should be
   * treated as a basic solution that is not performant compared to other solutions, such as @link https://github.com/pixijs/pixi-display
   *
   * Also be aware of that this may not work nicely with the addChildAt() function,
   * as the zIndex sorting may cause the child to automatically sorted to another position.
   *
   * @type {boolean}
   */
  export let sortableChildren: $$Props['sortableChildren'] = undefined

  /**
   * The width of the Container, setting this will actually modify the scale to achieve the value set.
   *
   * @type {number}
   */
  export let width: $$Props['width'] = undefined

  /**
   * The visibility of the object. If false the object will not be drawn,
   * and the updateTransform function will not be called.
   *
   * Only affects recursive calls from parent. You can ask for bounds
   * or call updateTransform manually.
   *
   * @type {boolean}
   */
  export let visible: $$Props['visible'] = undefined

  /**
   * The position of the displayObject on the x axis relative to the
   * local coordinates of the parent. An alias to position.x
   *
   * @type {number}
   */
  export let x: $$Props['x'] = undefined

  /**
   * The position of the displayObject on the y axis relative
   * to the local coordinates of the parent. An alias to position.y
   *
   * @type {number}
   */
  export let y: $$Props['y'] = undefined

  /**
   * The zIndex of the displayObject.
   *
   * If a container has the sortableChildren property set to true,
   * children will be automatically sorted by zIndex value; a higher value will mean it will be moved towards the end of the array, and thus rendered on top of other display objects within the same container.
   *
   * @type {number}
   **/
  export let zIndex: $$Props['zIndex'] = undefined

  /**
   * Opts the container into "Render Group Mode". Must be set initially, cannot
   * be changed after. See more info on Render Groups here https://pixijs.download/release/docs/scene.Container.html
   *
   * @type {boolean}
   */
  export let isRenderGroup: $$Props['isRenderGroup'] = false

  /**
   * The PIXI.Container instance. Can be set or bound to.
   *
   * @type {PIXI.Container}
   */
  export let instance: T = new PIXI.Container({
    isRenderGroup,
  }) as T

  const { applyProp, applyProps } = createApplyProps<PIXI.Container, $$Props>(
    instance,
    {
      cacheAsTexture: (value, instance) => {
        if (value !== undefined) {
          instance.cacheAsTexture(value)
        }
      },
    },
  )

  const { invalidate } = getRenderer()
  const { container: parent } = getContainer() ?? {}
  const dispatch = createEventDispatcher()

  onMount(() => {
    let childIndex = -1

    // preserve reference to instance & parent, they could
    // be lost by unmount
    let _instance = instance
    let _parent = parent

    // make sure child isn't already added to the parent
    try {
      // Container.getChildIndex throws an error if instance is not a child...
      childIndex = _parent.getChildIndex(_instance)
      // eslint-disable-next-line no-empty
    } catch (e) {}

    // add instance to parent
    if (_parent && childIndex === -1) {
      _parent.addChild(_instance)
    }

    dispatch('create', {
      instance: _instance,
    })

    // containers only update existing children but svelte will apply
    // initial props before its children are mounted.
    // so, if we have children, re-apply props
    if ($$slots.default) {
      const { instance, ...props } = $$props
      applyProps(props)
    }

    function handleEvent(ev: PIXI.FederatedEvent) {
      dispatch(ev.type, ev)
    }

    function handleGlobalEvent(ev: PIXI.FederatedEvent) {
      dispatch(`global${ev.type}`, ev)
    }

    instance.on('click', handleEvent)
    instance.on('globalmousemove', handleGlobalEvent)
    instance.on('globalpointermove', handleGlobalEvent)
    instance.on('globaltouchmove', handleGlobalEvent)
    instance.on('mousedown', handleEvent)
    instance.on('mousemove', handleEvent)
    instance.on('mouseout', handleEvent)
    instance.on('mouseover', handleEvent)
    instance.on('mouseup', handleEvent)
    instance.on('mouseupoutside', handleEvent)
    instance.on('mouseupoutside', handleEvent)
    instance.on('pointercancel', handleEvent)
    instance.on('pointerdown', handleEvent)
    instance.on('pointermove', handleEvent)
    instance.on('pointerout', handleEvent)
    instance.on('pointerover', handleEvent)
    instance.on('pointertap', handleEvent)
    instance.on('pointerup', handleEvent)
    instance.on('pointerupoutside', handleEvent)
    instance.on('removedFrom', handleEvent)
    instance.on('rightclick', handleEvent)
    instance.on('rightdown', handleEvent)
    instance.on('rightup', handleEvent)
    instance.on('rightupoutside', handleEvent)
    instance.on('tap', handleEvent)
    instance.on('touchcancel', handleEvent)
    instance.on('touchend', handleEvent)
    instance.on('touchendoutside', handleEvent)
    instance.on('touchmove', handleEvent)
    instance.on('touchstart', handleEvent)

    instance.on('added', (ev) => dispatch('added', ev))
    instance.on('removed', (ev) => dispatch('removed', ev))

    return () => {
      _instance?.destroy()
      _parent?.removeChild(_instance)
      invalidate()
    }
  })

  afterUpdate(() => {
    invalidate()
  })

  $: applyProp('accessible', accessible)
  $: applyProp('accessibleChildren', accessibleChildren)
  $: applyProp('accessibleHint', accessibleHint)
  $: applyProp('accessiblePointerEvents', accessiblePointerEvents)
  $: applyProp('accessibleTitle', accessibleTitle)
  $: applyProp('accessibleType', accessibleType)
  $: applyProp('alpha', alpha)
  $: applyProp('angle', angle)
  $: applyProp('cacheAsBitmap', cacheAsBitmap)
  $: applyProp('cacheAsTexture', cacheAsTexture)
  $: applyProp('cursor', cursor)
  $: applyProp('cullable', cullable)
  $: applyProp('cullArea', cullArea)
  $: applyProp('eventMode', eventMode)
  $: applyProp('filterArea', filterArea)
  $: applyProp('hitArea', hitArea)
  $: applyProp('filters', filters)
  $: applyProp('height', height)
  $: applyProp('interactive', interactive)
  $: applyProp('interactiveChildren', interactiveChildren)
  $: applyProp('mask', mask)
  $: applyProp('label', label ?? name)
  $: applyProp('pivot', pivot)
  $: applyProp('position', position)
  $: applyProp('renderable', renderable)
  $: applyProp('rotation', rotation)
  $: applyProp('scale', scale)
  $: applyProp('skew', skew)
  $: applyProp('sortableChildren', sortableChildren)
  $: applyProp('visible', visible)
  $: applyProp('x', x)
  $: applyProp('y', y)
  $: applyProp('width', width)
  $: applyProp('zIndex', zIndex)

  // if no parent, this is the stage (root container)
  if (!parent) {
    setContext<StageContext<T>>('pixi/stage', { stage: instance })
  }

  setContext<ContainerContext<T>>('pixi/container', { container: instance })
</script>

<slot />
