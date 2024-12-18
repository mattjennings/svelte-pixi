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
    getContext,
    onMount,
    setContext,
    type Snippet,
  } from 'svelte'
  import { getRenderer } from './Renderer.svelte'
  import type { PointLike } from './util/data-types'
  import { createApplyProps } from './util/props'

  type T = $$Generic<PIXI.Container>

  interface Props {
    /**
     * Flag for if the object is accessible.
     * If true AccessibilityManager will overlay a shadow div with attributes set
     *
     */
    accessible?: PIXI.Container['accessible']

    /**
     * Setting to false will prevent any children inside this container to be accessible.
     *
     */
    accessibleChildren?: PIXI.Container['accessibleChildren']

    /**
     * Sets the aria-label attribute of the shadow div
     *
     * @type {string}
     */
    accessibleHint?: PIXI.Container['accessibleHint']

    /**
     * Specify the pointer-events the accessible div will use. Defaults to auto.
     *
     * @type {string}
     */
    accessiblePointerEvents?: PIXI.Container['accessiblePointerEvents']

    /**
     * Sets the title attribute of the shadow div. If accessibleTitle AND accessibleHint
     * have not been set, this will default to 'displayObject [tabIndex]'
     *
     * @type {string}
     */
    accessibleTitle?: PIXI.Container['accessibleTitle']

    /**
     * Specify the type of div the accessible layer is.
     * Screen readers treat the element differently depending on this type.
     *
     * @type {string}
     */
    accessibleType?: PIXI.Container['accessibleType']

    /**
     * The opacity of the object.
     *
     */
    alpha?: PIXI.Container['alpha']

    /**
     * The angle of the object in degrees.
     * 'rotation' and 'angle' have the same effect on a display object;
     * rotation is in radians, angle is in degrees.
     *
     */
    angle?: PIXI.Container['angle']

    /**
     * Set this to true if you want this display object to be cached as a bitmap.
     * This basically takes a snapshot of the display object as it is at that moment.
     * It can provide a performance benefit for complex static displayObjects.
     * To remove simply set this property to false
     *
     * IMPORTANT GOTCHA - Make sure that all your textures are preloaded BEFORE
     * setting this property to true as it will take a snapshot of what is currently there.
     * If the textures have not loaded then they will not appear.
     *
     */
    cacheAsBitmap?: PIXI.Container['cacheAsBitmap']

    /**
     * The number of samples to use for cacheAsBitmap. If set to null, the renderer's sample count is used.
     * If cacheAsBitmap is set to true, this will re-render with the new number of samples.
     *
     * @type {PIXI.MSAA_QUALITY}
     */
    cacheAsBitmapMultisample?: PIXI.Container['cacheAsBitmapMultisample']

    /**
     * The resolution to use for cacheAsBitmap.
     * By default this will use the renderer's resolution but can be overridden for performance.
     * Lower values will reduce memory usage at the expense of render quality.
     * A falsey value of null or 0 will default to the renderer's resolution.
     * If cacheAsBitmap is set to true, this will re-render with the new resolution.
     *
     */
    cacheAsBitmapResolution?: PIXI.Container['cacheAsBitmapResolution']

    /**
     * Should this object be culled if it goes out of frame?
     *
     */
    cullable?: PIXI.Container['cullable']

    /**
     * If set, this shape is used for culling instead of the bounds of this object.
     * It can improve the culling performance of objects with many children.
     * The culling area is defined in local space.
     *
     */
    cullArea?: PIXI.Container['cullArea']

    /**
     * This defines what cursor mode is used when the mouse cursor is hovered over the displayObject.
     *
     */
    cursor?: PIXI.Container['cursor']

    /**
     * The area the filter is applied to.
     * This is used as more of an optimization rather than figuring out the dimensions of
     * the displayObject each frame you can set this rectangle.
     *
     * Also works as an interaction mask.
     *
     */
    filterArea?: PIXI.Container['filterArea']

    /**
     * Sets the filters for the displayObject.
     *
     * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer. To remove filters simply set this property to 'null'.
     *
     */
    filters?: PIXI.Container['filters']

    /**
     * The height of the Container, setting this will actually modify the scale to achieve the value set.
     *
     */
    height?: PIXI.Container['height']

    /**
     * Interaction shape. Children will be hit first, then this shape will be checked.
     * Setting this will cause this shape to be checked in hit tests rather than the displayObject's bounds.
     *
     */
    hitArea?: PIXI.Container['hitArea']

    /**
     * The type of interaction a DisplayObject can be.
     * For more information on values and their meaning, see https://pixijs.download/dev/docs/PIXI.DisplayObject.html#eventMode
     *
     */
    eventMode?: PIXI.Container['eventMode']

    /**
     * Enable interaction events for the DisplayObject.
     * Touch, pointer, and mouse events will not be emitted unless interactive is set to true.
     *
     * @deprecated since 7.0.0, Setting interactive is deprecated, use eventMode='none'/'passive'/'auto'/'static'/'dynamic' instead.
     */
    interactive?: PIXI.Container['interactive']

    /**
     * Determines if the children to the displayObject can be clicked/touched.
     * Setting this to false allows PixiJS to bypass a recursive hitTest function.
     *
     * @deprecated since 7.0.0, Setting interactive is deprecated, use eventMode='none'/'passive'/'auto'/'static'/'dynamic' instead.
     */
    interactiveChildren?: PIXI.Container['interactiveChildren']

    /**
     * Does any other displayObject use this object as a mask?
     *
     */
    isMask?: PIXI.Container['isMask']

    /**
     * Used to fast check if a sprite is.. a sprite!
     *
     */
    isSprite?: PIXI.Container['isSprite']

    /**
     * Sets a mask for the displayObject.
     * A mask is an object that limits the visibility of an object to the shape
     * of the mask applied to it. In PixiJS a regular mask must be a
     * PIXI.Graphics or a PIXI.Sprite object.
     * This allows for much faster masking in canvas as it utilizes shape clipping.
     * To remove a mask, set this property to null.
     *
     * For sprite masks, both alpha and the red channel are used. Black masks are the same as transparent masks.
     *
     * At the moment, PIXI.CanvasRenderer doesn't support PIXI.Sprite as a mask.
     *
     */
    mask?: PIXI.Container['mask']

    /**
     * The instance name of the object.
     *
     */
    name?: PIXI.Container['name']

    /**
     * The center of rotation, scaling, and skewing for this display object in its local space.
     * The position is the projection of pivot in the parent's local space.
     *
     * By default, the pivot is the origin (0, 0).
     *
     */
    pivot?: PointLike

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     */
    position?: PointLike

    /**
     * Can this object be rendered, if false the object will not be drawn but
     * the updateTransform methods will still be called.
     *
     * Only affects recursive calls from parent. You can ask for bounds manually.
     *
     */
    renderable?: PIXI.Container['renderable']

    /**
     * The rotation of the object in radians. 'rotation' and 'angle' have the
     * same effect on a display object; rotation is in radians, angle is in degrees.
     *
     */
    rotation?: PIXI.Container['rotation']

    /**
     * The scale factors of this object along the local coordinate axes.
     *
     * The default scale is (1, 1).
     *
     */
    scale?: PointLike

    /**
     * The skew factor for the object in radians.
     *
     */
    skew?: PointLike

    /**
     * If set to true, the container will sort its children by zIndex value when
     * updateTransform() is called, or manually if sortChildren() is called.
     *
     * This actually changes the order of elements in the array, so should be
     * treated as a basic solution that is not performant compared to other solutions, such as @link https://github.com/pixijs/pixi-display
     *
     * Also be aware that this may not work nicely with the addChildAt() function,
     * as the zIndex sorting may cause the child to be automatically sorted to another position.
     *
     */
    sortableChildren?: PIXI.Container['sortableChildren']

    /**
     * The width of the Container, setting this will actually modify the scale to achieve the value set.
     *
     */
    width?: PIXI.Container['width']

    /**
     * World transform and local transform of this object. This will become read-only later,
     * please do not assign anything there unless you know what you are doing.
     *
     */
    transform?: PIXI.Container['transform']

    /**
     * The visibility of the object. If false, the object will not be drawn,
     * and the updateTransform function will not be called.
     *
     * Only affects recursive calls from the parent. You can ask for bounds
     * or call updateTransform manually.
     *
     */
    visible?: PIXI.Container['visible']

    /**
     * The position of the displayObject on the x axis relative to the
     * local coordinates of the parent. An alias to position.x
     *
     */
    x?: PIXI.Container['x']

    /**
     * The position of the displayObject on the y axis relative
     * to the local coordinates of the parent. An alias to position.y
     *
     */
    y?: PIXI.Container['y']

    /**
     * The zIndex of the displayObject.
     *
     * If a container has the sortableChildren property set to true,
     * children will be automatically sorted by zIndex value; a higher value will mean it will be moved towards the end of the array, and thus rendered on top of other display objects within the same container.
     *
     */
    zIndex?: PIXI.Container['zIndex']

    instance: T
    applyPropOnMount?: boolean,
    children?: Snippet,
    click?: (event: PIXI.FederatedPointerEvent) => void,
    globalmousemove?: (event: PIXI.FederatedPointerEvent) => void, 
    globalpointermove?: (event: PIXI.FederatedPointerEvent) => void, 
    globaltouchmove?: (event: PIXI.FederatedPointerEvent) => void, 
    mousedown?: (event: PIXI.FederatedPointerEvent) => void, 
    mousemove?: (event: PIXI.FederatedPointerEvent) => void, 
    mouseout?: (event: PIXI.FederatedPointerEvent) => void, 
    mouseover?: (event: PIXI.FederatedPointerEvent) => void, 
    mouseup?: (event: PIXI.FederatedPointerEvent) => void, 
    mouseupoutside?: (event: PIXI.FederatedPointerEvent) => void, 
    pointercancel?: (event: PIXI.FederatedPointerEvent) => void, 
    pointerdown?: (event: PIXI.FederatedPointerEvent) => void, 
    pointermove?: (event: PIXI.FederatedPointerEvent) => void, 
    pointerout?: (event: PIXI.FederatedPointerEvent) => void, 
    pointerover?: (event: PIXI.FederatedPointerEvent) => void, 
    pointertap?: (event: PIXI.FederatedPointerEvent) => void, 
    pointerup?: (event: PIXI.FederatedPointerEvent) => void, 
    pointerupoutside?: (event: PIXI.FederatedPointerEvent) => void, 
    removedFrom?: (event: PIXI.FederatedPointerEvent) => void, 
    rightclick?: (event: PIXI.FederatedPointerEvent) => void, 
    rightdown?: (event: PIXI.FederatedPointerEvent) => void, 
    rightup?: (event: PIXI.FederatedPointerEvent) => void, 
    rightupoutside?: (event: PIXI.FederatedPointerEvent) => void, 
    tap?: (event: PIXI.FederatedPointerEvent) => void, 
    touchcancel?: (event: PIXI.FederatedPointerEvent) => void, 
    touchend?: (event: PIXI.FederatedPointerEvent) => void, 
    touchendoutside?: (event: PIXI.FederatedPointerEvent) => void, 
    touchmove?: (event: PIXI.FederatedPointerEvent) => void, 
    touchstart?: (event: PIXI.FederatedPointerEvent) => void, 
    create?: (event: PIXI.Container<PIXI.DisplayObject>) => void, 
    added?: (event: PIXI.Container<PIXI.DisplayObject>) => void, 
    removed?: (event: PIXI.Container<PIXI.DisplayObject>) => void
  }

  let {
    accessible = false,
    accessibleChildren = true,
    accessibleHint = undefined,
    accessiblePointerEvents = 'auto',
    accessibleTitle = undefined,
    accessibleType = 'button',
    alpha = undefined,
    angle = undefined,
    cacheAsBitmap = undefined,
    cacheAsBitmapMultisample = PIXI.MSAA_QUALITY.NONE,
    cacheAsBitmapResolution = undefined,
    cullable = undefined,
    cullArea = undefined,
    cursor = undefined,
    filterArea = undefined,
    filters = undefined,
    height = undefined,
    hitArea = undefined,
    eventMode = undefined,
    interactive = undefined,
    interactiveChildren = undefined,
    isMask = undefined,
    isSprite = undefined,
    mask = undefined,
    name = undefined,
    pivot = undefined,
    position = undefined,
    renderable = undefined,
    rotation = undefined,
    scale = undefined,
    skew = undefined,
    sortableChildren = undefined,
    width = undefined,
    transform = undefined,
    visible = undefined,
    x = undefined,
    y = undefined,
    instance,
    zIndex = undefined,
    children,
    create = undefined,
    click = undefined,
    globalmousemove = undefined,
    globalpointermove = undefined,
    globaltouchmove = undefined,
    mousedown = undefined,
    mousemove = undefined,
    mouseout = undefined,
    mouseover = undefined,
    mouseup = undefined,
    mouseupoutside = undefined,
    pointercancel = undefined,
    pointerdown = undefined,
    pointermove = undefined,
    pointerout = undefined,
    pointerover = undefined,
    pointertap = undefined,
    pointerup = undefined,
    pointerupoutside = undefined,
    removedFrom = undefined,
    rightclick = undefined,
    rightdown = undefined,
    rightup = undefined,
    rightupoutside = undefined,
    tap = undefined,
    touchcancel = undefined,
    touchend = undefined,
    touchendoutside = undefined,
    touchmove = undefined,
    touchstart = undefined,
    added = undefined,
    removed = undefined,
  }: Props = $props()

  const { applyProp, applyProps } = createApplyProps<PIXI.Container, Props>(
    instance,
  )

  const { invalidate } = getRenderer()
  const { container: parent } = getContainer() ?? {}

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

    create?.({
      instance: _instance,
    })

    // containers only update existing children but svelte will apply
    // initial props before its children are mounted.
    // so, if we have children, re-apply props

    // TODO: check if still relevant
    // if ($$slots.default) {
    //   applyProps(props)
    // }

    if(click) instance.on('click', click)
    if(globalmousemove) instance.on('globalmousemove', globalmousemove)
    if(globalpointermove) instance.on('globalpointermove', globalpointermove)
    if(globaltouchmove) instance.on('globaltouchmove', globaltouchmove)
    if(mousedown) instance.on('mousedown', mousedown)
    if(mousemove) instance.on('mousemove', mousemove)
    if(mouseout) instance.on('mouseout', mouseout)
    if(mouseover) instance.on('mouseover', mouseover)
    if(mouseup) instance.on('mouseup', mouseup)
    if(mouseupoutside) instance.on('mouseupoutside', mouseupoutside)
    if(mouseupoutside) instance.on('mouseupoutside', mouseupoutside)
    if(pointercancel) instance.on('pointercancel', pointercancel)
    if(pointerdown) instance.on('pointerdown', pointerdown)
    if(pointermove) instance.on('pointermove', pointermove)
    if(pointerout) instance.on('pointerout', pointerout)
    if(pointerover) instance.on('pointerover', pointerover)
    if(pointertap) instance.on('pointertap', pointertap)
    if(pointerup) instance.on('pointerup', pointerup)
    if(pointerupoutside) instance.on('pointerupoutside', pointerupoutside)
    if(removedFrom) instance.on('removedFrom', removedFrom)
    if(rightclick) instance.on('rightclick', rightclick)
    if(rightdown) instance.on('rightdown', rightdown)
    if(rightup) instance.on('rightup', rightup)
    if(rightupoutside) instance.on('rightupoutside', rightupoutside)
    if(tap) instance.on('tap', tap)
    if(touchcancel) instance.on('touchcancel', touchcancel)
    if(touchend) instance.on('touchend', touchend)
    if(touchendoutside) instance.on('touchendoutside', touchendoutside)
    if(touchmove) instance.on('touchmove', touchmove)
    if(touchstart) instance.on('touchstart', touchstart)

    if(added) instance.on('added', added)
    if(removed) instance.on('removed', removed)

    return () => {
      _instance?.destroy()
      _parent?.removeChild(_instance)
      invalidate()
    }
  })

  $effect(() => {
    invalidate()
    applyProp('accessible', accessible)
    applyProp('accessibleChildren', accessibleChildren)
    applyProp('accessibleHint', accessibleHint)
    applyProp('accessiblePointerEvents', accessiblePointerEvents)
    applyProp('accessibleTitle', accessibleTitle)
    applyProp('accessibleType', accessibleType)
    applyProp('alpha', alpha)
    applyProp('angle', angle)
    applyProp('cacheAsBitmap', cacheAsBitmap)
    applyProp('cacheAsBitmapResolution', cacheAsBitmapResolution)
    applyProp('cacheAsBitmapMultisample', cacheAsBitmapMultisample)
    applyProp('cursor', cursor)
    applyProp('cullable', cullable)
    applyProp('cullArea', cullArea)
    applyProp('eventMode', eventMode)
    applyProp('filterArea', filterArea)
    applyProp('hitArea', hitArea)
    applyProp('filters', filters)
    applyProp('height', height)
    applyProp('isMask', isMask)
    applyProp('isSprite', isSprite)
    applyProp('interactive', interactive)
    applyProp('interactiveChildren', interactiveChildren)
    applyProp('mask', mask)
    applyProp('name', name)
    applyProp('pivot', pivot)
    applyProp('position', position)
    applyProp('renderable', renderable)
    applyProp('rotation', rotation)
    applyProp('scale', scale)
    applyProp('skew', skew)
    applyProp('sortableChildren', sortableChildren)
    applyProp('transform', transform)
    applyProp('visible', visible)
    applyProp('x', x)
    applyProp('y', y)
    applyProp('width', width)
    applyProp('zIndex', zIndex)
  })

  // if no parent, this is the stage (root container)
  if (!parent) {
    setContext<StageContext<T>>('pixi/stage', { stage: instance })
  }

  setContext<ContainerContext<T>>('pixi/container', { container: instance })
</script>

{@render children?.()}
