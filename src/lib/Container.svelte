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
    cacheAsBitmap?: PIXI.Container['cacheAsBitmap']
    cacheAsBitmapMultisample?: PIXI.Container['cacheAsBitmapMultisample']
    cacheAsBitmapResolution?: PIXI.Container['cacheAsBitmapResolution']
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
    isMask?: PIXI.Container['isMask']
    isSprite?: PIXI.Container['isSprite']
    mask?: PIXI.Container['mask']
    name?: PIXI.Container['name']
    pivot?: PointLike
    position?: PointLike
    renderable?: PIXI.Container['renderable']
    rotation?: PIXI.Container['rotation']
    scale?: PointLike
    skew?: PointLike
    sortableChildren?: PIXI.Container['sortableChildren']
    width?: PIXI.Container['width']
    transform?: PIXI.Container['transform']
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
   * Set this to true if you want this display object to be cached as a bitmap.
   * This basically takes a snap shot of the display object as it is at that moment.
   * It can provide a performance benefit for complex static displayObjects.
   * To remove simply set this property to false
   *
   * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE
   * setting this property to true as it will take a snapshot of what is currently there.
   *  If the textures have not loaded then they will not appear.
   *
   * @type {boolean}
   */
  export let cacheAsBitmap: $$Props['cacheAsBitmap'] = undefined

  /**
   * The number of samples to use for cacheAsBitmap. If set to null, the renderer's sample count is used.
   * If cacheAsBitmap is set to true, this will re-render with the new number of samples.
   *
   * @type {PIXI.MSAA_QUALITY}
   */
  export let cacheAsBitmapMultisample: $$Props['cacheAsBitmapMultisample'] =
    PIXI.MSAA_QUALITY.NONE

  /**
   * The resolution to use for cacheAsBitmap.
   * By default this will use the renderer's resolution but can be overriden for performance.
   * Lower values will reduce memory usage at the expense of render quality.
   * A falsey value of null or 0 will default to the renderer's resolution.
   * If cacheAsBitmap is set to true, this will re-render with the new resolution.
   *
   * @type {number}
   */
  export let cacheAsBitmapResolution: $$Props['cacheAsBitmapResolution'] =
    undefined

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
   * Does any other displayObject use this object as a mask?
   *
   * @type {boolean}
   */
  export let isMask: $$Props['isMask'] = undefined

  /**
   * Used to fast check if a sprite is.. a sprite!
   *
   * @type {boolean}
   */
  export let isSprite: $$Props['isSprite'] = undefined

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
   * @type {string}
   */
  export let name: $$Props['name'] = undefined

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
   * World transform and local transform of this object. This will become read-only later,
   * please do not assign anything there unless you know what are you doing.
   *
   * @type {PIXI.Transform}
   */
  export let transform: $$Props['transform'] = undefined

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
   * The PIXI.Container instance. Can be set or bound to.
   *
   * @type {PIXI.Container}
   */
  export let instance: T = new PIXI.Container() as T

  const { applyProp, applyProps } = createApplyProps<PIXI.Container, $$Props>(
    instance,
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
    // instance.on('click', (ev) => dispatch('click', ev))
    // instance.on('mousedown', (ev) => dispatch('mousedown', ev))
    // instance.on('mousemove', (ev) => dispatch('mousemove', ev))
    // instance.on('mouseout', (ev) => dispatch('mouseout', ev))
    // instance.on('mouseover', (ev) => dispatch('mouseover', ev))
    // instance.on('mouseup', (ev) => dispatch('mouseup', ev))
    // instance.on('mouseupoutside', (ev) => dispatch('mouseupoutside', ev))
    // instance.on('mouseupoutside', (ev) => dispatch('mouseupoutside', ev))
    // instance.on('pointercancel', (ev) => dispatch('pointercancel', ev))
    // instance.on('pointerdown', (ev) => dispatch('pointerdown', ev))
    // instance.on('pointermove', (ev) => dispatch('pointermove', ev))
    // instance.on('pointerout', (ev) => dispatch('pointerout', ev))
    // instance.on('pointerover', (ev) => dispatch('pointerover', ev))
    // instance.on('pointertap', (ev) => dispatch('pointertap', ev))
    // instance.on('pointerup', (ev) => dispatch('pointerup', ev))
    // instance.on('pointerupoutside', (ev) => dispatch('pointerupoutside', ev))
    // instance.on('removedFrom', (ev) => dispatch('removedFrom', ev))
    // instance.on('rightclick', (ev) => dispatch('rightclick', ev))
    // instance.on('rightdown', (ev) => dispatch('rightdown', ev))
    // instance.on('rightup', (ev) => dispatch('rightup', ev))
    // instance.on('rightupoutside', (ev) => dispatch('rightupoutside', ev))
    // instance.on('tap', (ev) => dispatch('tap', ev))
    // instance.on('touchcancel', (ev) => dispatch('touchcancel', ev))
    // instance.on('touchend', (ev) => dispatch('touchend', ev))
    // instance.on('touchendoutside', (ev) => dispatch('touchendoutside', ev))
    // instance.on('touchmove', (ev) => dispatch('touchmove', ev))
    // instance.on('touchstart', (ev) => dispatch('touchstart', ev))

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
  $: applyProp('cacheAsBitmapResolution', cacheAsBitmapResolution)
  $: applyProp('cacheAsBitmapMultisample', cacheAsBitmapMultisample)
  $: applyProp('cursor', cursor)
  $: applyProp('cullable', cullable)
  $: applyProp('cullArea', cullArea)
  $: applyProp('eventMode', eventMode)
  $: applyProp('filterArea', filterArea)
  $: applyProp('hitArea', hitArea)
  $: applyProp('filters', filters)
  $: applyProp('height', height)
  $: applyProp('isMask', isMask)
  $: applyProp('isSprite', isSprite)
  $: applyProp('interactive', interactive)
  $: applyProp('interactiveChildren', interactiveChildren)
  $: applyProp('mask', mask)
  $: applyProp('name', name)
  $: applyProp('pivot', pivot)
  $: applyProp('position', position)
  $: applyProp('renderable', renderable)
  $: applyProp('rotation', rotation)
  $: applyProp('scale', scale)
  $: applyProp('skew', skew)
  $: applyProp('sortableChildren', sortableChildren)
  $: applyProp('transform', transform)
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
