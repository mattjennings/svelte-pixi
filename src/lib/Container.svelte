<script context="module" lang="ts">
  export function getContainer<T extends PIXI.Container = PIXI.Container>(): T {
    return getContext('pixi/container')
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
  import type { PointLike } from './util/data-types'
  import { applyProp } from './util/props'

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
    buttonMode?: PIXI.Container['buttonMode']
    cacheAsBitmap?: PIXI.Container['cacheAsBitmap']
    cacheAsBitmapMultisample?: PIXI.Container['cacheAsBitmapMultisample']
    cacheAsBitmapResolution?: PIXI.Container['cacheAsBitmapResolution']
    cullArea?: PIXI.Container['cullArea']
    cursor?: PIXI.Container['cursor']
    filterArea?: PIXI.Container['filterArea']
    filters?: PIXI.Container['filters']
    height?: PIXI.Container['height']
    hitArea?: PIXI.Container['hitArea']
    interactive?: PIXI.Container['interactive']
    interactiveChildren?: PIXI.Container['interactiveChildren']
    isMask?: PIXI.Container['isMask']
    isSprite?: PIXI.Container['isSprite']
    mask?: PIXI.Container['mask']
    name?: PIXI.Container['name']
    pivot?: PointLike
    position?: PIXI.Container['position']
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

  const { onComponentUpdate } = getContext('pixi/renderer_internal')
  const dispatch = createEventDispatcher()
  const parent = getContainer()

  export let accessible: $$Props['accessible'] = undefined
  export let accessibleChildren: $$Props['accessibleChildren'] = true
  export let accessibleHint: $$Props['accessibleHint'] = undefined
  export let accessiblePointerEvents: $$Props['accessiblePointerEvents'] =
    'auto'
  export let accessibleTitle: $$Props['accessibleTitle'] = undefined
  export let accessibleType: $$Props['accessibleType'] = 'button'
  export let alpha: $$Props['alpha'] = undefined
  export let angle: $$Props['angle'] = undefined
  export let buttonMode: $$Props['buttonMode'] = undefined
  export let cacheAsBitmap: $$Props['cacheAsBitmap'] = undefined
  export let cacheAsBitmapMultisample: $$Props['cacheAsBitmapMultisample'] =
    PIXI.MSAA_QUALITY.NONE
  export let cacheAsBitmapResolution: $$Props['cacheAsBitmapResolution'] = null
  export let cullArea: $$Props['cullArea'] = undefined
  export let cursor: $$Props['cursor'] = undefined
  export let filterArea: $$Props['filterArea'] = undefined
  export let filters: $$Props['filters'] = undefined
  export let height: $$Props['height'] = undefined
  export let hitArea: $$Props['hitArea'] = undefined
  export let interactive: $$Props['interactive'] = undefined
  export let interactiveChildren: $$Props['interactiveChildren'] = true
  export let isMask: $$Props['isMask'] = undefined
  export let isSprite: $$Props['isSprite'] = undefined
  export let mask: $$Props['mask'] = undefined
  export let name: $$Props['name'] = undefined
  export let pivot: $$Props['pivot'] = undefined
  export let position: $$Props['position'] = undefined
  export let renderable: $$Props['renderable'] = undefined
  export let rotation: $$Props['rotation'] = undefined
  export let scale: $$Props['scale'] = undefined
  export let skew: $$Props['skew'] = undefined
  export let sortableChildren: $$Props['sortableChildren'] = undefined
  export let width: $$Props['width'] = undefined
  export let transform: $$Props['transform'] = undefined
  export let visible: $$Props['visible'] = undefined
  export let x: $$Props['x'] = undefined
  export let y: $$Props['y'] = undefined
  export let zIndex: $$Props['zIndex'] = undefined

  export let instance: T = new PIXI.Container() as T

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
      // re-assigning instance will trigger prop effects
      instance = instance
    }

    instance.on('click', (ev) => dispatch('click', ev))
    instance.on('mousedown', (ev) => dispatch('mousedown', ev))
    instance.on('mouseout', (ev) => dispatch('mouseout', ev))
    instance.on('mouseover', (ev) => dispatch('mouseover', ev))
    instance.on('mouseup', (ev) => dispatch('mouseup', ev))
    instance.on('mouseupoutside', (ev) => dispatch('mouseupoutside', ev))
    instance.on('mouseupoutside', (ev) => dispatch('mouseupoutside', ev))
    instance.on('pointercancel', (ev) => dispatch('pointercancel', ev))
    instance.on('pointerdown', (ev) => dispatch('pointerdown', ev))
    instance.on('pointermove', (ev) => dispatch('pointermove', ev))
    instance.on('pointerout', (ev) => dispatch('pointerout', ev))
    instance.on('pointerover', (ev) => dispatch('pointerover', ev))
    instance.on('pointertap', (ev) => dispatch('pointertap', ev))
    instance.on('pointerup', (ev) => dispatch('pointerup', ev))
    instance.on('pointerupoutside', (ev) => dispatch('pointerupoutside', ev))
    instance.on('removedFrom', (ev) => dispatch('removedFrom', ev))
    instance.on('rightclick', (ev) => dispatch('rightclick', ev))
    instance.on('rightdown', (ev) => dispatch('rightdown', ev))
    instance.on('rightup', (ev) => dispatch('rightup', ev))
    instance.on('rightupoutside', (ev) => dispatch('rightupoutside', ev))
    instance.on('tap', (ev) => dispatch('tap', ev))
    instance.on('touchcancel', (ev) => dispatch('touchcancel', ev))
    instance.on('touchend', (ev) => dispatch('touchend', ev))
    instance.on('touchendoutside', (ev) => dispatch('touchendoutside', ev))
    instance.on('touchmove', (ev) => dispatch('touchmove', ev))
    instance.on('touchstart', (ev) => dispatch('touchstart', ev))
    instance.on('added', (ev) => dispatch('added', ev))
    instance.on('removed', (ev) => dispatch('removed', ev))

    return () => {
      _instance?.destroy()
      _parent?.removeChild(_instance)
    }
  })

  afterUpdate(() => {
    onComponentUpdate()
  })

  $: applyProp(instance, { accessible })
  $: applyProp(instance, { accessibleChildren })
  $: applyProp(instance, { accessibleHint })
  $: applyProp(instance, { accessiblePointerEvents })
  $: applyProp(instance, { accessibleTitle })
  $: applyProp(instance, { accessibleType })
  $: applyProp(instance, { alpha })
  $: applyProp(instance, { angle })
  $: applyProp(instance, { buttonMode })
  $: applyProp(instance, { cacheAsBitmap })
  $: applyProp(instance, { cacheAsBitmapResolution })
  $: applyProp(instance, { cacheAsBitmapMultisample })
  $: applyProp(instance, { cursor })
  $: applyProp(instance, { cullArea })
  $: applyProp(instance, { filterArea })
  $: applyProp(instance, { hitArea })
  $: applyProp(instance, { filters })
  $: applyProp(instance, { height })
  $: applyProp(instance, { isMask })
  $: applyProp(instance, { isSprite })
  $: applyProp(instance, { interactive })
  $: applyProp(instance, { interactiveChildren })
  $: applyProp(instance, { mask })
  $: applyProp(instance, { name })
  $: applyProp(instance, { pivot })
  $: applyProp(instance, { position })
  $: applyProp(instance, { renderable })
  $: applyProp(instance, { rotation })
  $: applyProp(instance, { scale })
  $: applyProp(instance, { skew })
  $: applyProp(instance, { sortableChildren })
  $: applyProp(instance, { transform })
  $: applyProp(instance, { visible })
  $: applyProp(instance, { x })
  $: applyProp(instance, { y })
  $: applyProp(instance, { width })
  $: applyProp(instance, { zIndex })

  // if no parent, this is the stage (root container)
  if (!parent) {
    setContext('pixi/stage', instance)
  }

  setContext('pixi/container', instance)
</script>

<slot />
