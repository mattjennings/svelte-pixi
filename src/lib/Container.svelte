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
  import { createApplyProps } from './util/props'

  import type { PickPixiProps } from './util/data-types'

  import * as PIXI from 'pixi.js'
  import { getContext, onMount, setContext, type Snippet } from 'svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.Container>

  interface Props
    extends PickPixiProps<
      PIXI.Container,
      | 'accessible'
      | 'accessibleChildren'
      | 'accessibleHint'
      | 'accessiblePointerEvents'
      | 'accessibleTitle'
      | 'accessibleType'
      | 'alpha'
      | 'angle'
      | 'cacheAsBitmap'
      | 'cacheAsBitmapMultisample'
      | 'cacheAsBitmapResolution'
      | 'cullable'
      | 'cullArea'
      | 'cursor'
      | 'filterArea'
      | 'filters'
      | 'height'
      | 'hitArea'
      | 'eventMode'
      | 'interactive'
      | 'interactiveChildren'
      | 'isMask'
      | 'isSprite'
      | 'mask'
      | 'name'
      | 'pivot'
      | 'position'
      | 'renderable'
      | 'rotation'
      | 'scale'
      | 'skew'
      | 'sortableChildren'
      | 'width'
      | 'transform'
      | 'visible'
      | 'x'
      | 'y'
      | 'zIndex'
      | 'onclick'
      | 'onglobalmousemove'
      | 'onglobalpointermove'
      | 'onglobaltouchmove'
      | 'onmousedown'
      | 'onmousemove'
      | 'onmouseout'
      | 'onmouseover'
      | 'onmouseup'
      | 'onmouseupoutside'
      | 'onmouseenter'
      | 'onmouseleave'
      | 'onpointercancel'
      | 'onpointerdown'
      | 'onpointermove'
      | 'onpointerout'
      | 'onpointerover'
      | 'onpointertap'
      | 'onpointerup'
      | 'onpointerupoutside'
      | 'onpointerenter'
      | 'onpointerleave'
      | 'onrightclick'
      | 'onrightdown'
      | 'onrightup'
      | 'onrightupoutside'
      | 'ontap'
      | 'ontouchcancel'
      | 'ontouchend'
      | 'ontouchendoutside'
      | 'ontouchmove'
      | 'ontouchstart'
    > {
    instance?: T
    onadded?: () => void
    onremoved?: () => void
    oncreated?: (detail: { instance: T }) => void
    children?: Snippet<void>
    applyPropOnMount?: boolean
  }

  const {
    children,
    accessible,
    accessibleChildren,
    accessibleHint,
    accessiblePointerEvents,
    accessibleTitle,
    accessibleType,
    alpha,
    angle,
    cacheAsBitmap,
    cacheAsBitmapResolution,
    cacheAsBitmapMultisample,
    cursor,
    cullable,
    cullArea,
    eventMode,
    filterArea,
    hitArea,
    filters,
    height,
    isMask,
    isSprite,
    interactive,
    interactiveChildren,
    mask,
    name,
    pivot,
    position,
    renderable,
    rotation,
    scale,
    skew,
    sortableChildren,
    transform,
    visible,
    x,
    y,
    width,
    zIndex,
    oncreated,
    instance: instanceProp,
    ...restProps
  } = $props<Props>()

  export const instance = instanceProp ?? new PIXI.Container()

  const { invalidate } = getRenderer()
  const { container: parent } = getContainer() ?? {}

  // if no parent, this is the stage (root container)
  if (!parent) {
    setContext<StageContext<T>>('pixi/stage', { stage: instance as T })
  }

  setContext<ContainerContext<T>>('pixi/container', {
    container: instance as T,
  })

  // preserve reference to instance & parent, they could
  // be lost by unmount
  let _instance = instance
  let _parent = parent

  if (_parent) {
    if (_parent.children.indexOf(_instance) === -1) {
      _parent.addChild(_instance)
    }
  }

  if (oncreated) {
    oncreated({ instance: _instance as T })
  }

  const { applyProp, applyProps } = createApplyProps<PIXI.Container, Props>(
    instance,
    {
      onApply() {
        invalidate()
      },
    },
  )

  $effect(() => applyProp('accessible', accessible))
  $effect(() => applyProp('accessibleChildren', accessibleChildren))
  $effect(() => applyProp('accessibleHint', accessibleHint))
  $effect(() => applyProp('accessiblePointerEvents', accessiblePointerEvents))
  $effect(() => applyProp('accessibleTitle', accessibleTitle))
  $effect(() => applyProp('accessibleType', accessibleType))
  $effect(() => applyProp('alpha', alpha))
  $effect(() => applyProp('angle', angle))
  $effect(() => applyProp('cacheAsBitmap', cacheAsBitmap))
  $effect(() => applyProp('cacheAsBitmapResolution', cacheAsBitmapResolution))
  $effect(() => applyProp('cacheAsBitmapMultisample', cacheAsBitmapMultisample))
  $effect(() => applyProp('cursor', cursor))
  $effect(() => applyProp('cullable', cullable))
  $effect(() => applyProp('cullArea', cullArea))
  $effect(() => applyProp('eventMode', eventMode))
  $effect(() => applyProp('filterArea', filterArea))
  $effect(() => applyProp('hitArea', hitArea))
  $effect(() => applyProp('filters', filters))
  $effect(() => applyProp('height', height))
  $effect(() => applyProp('isMask', isMask))
  $effect(() => applyProp('isSprite', isSprite))
  $effect(() => applyProp('interactive', interactive))
  $effect(() => applyProp('interactiveChildren', interactiveChildren))
  $effect(() => applyProp('mask', mask))
  $effect(() => applyProp('name', name))
  $effect(() => applyProp('pivot', pivot))
  $effect(() => applyProp('position', position))
  $effect(() => applyProp('renderable', renderable))
  $effect(() => applyProp('rotation', rotation))
  $effect(() => applyProp('scale', scale))
  $effect(() => applyProp('skew', skew))
  $effect(() => applyProp('sortableChildren', sortableChildren))
  $effect(() => applyProp('transform', transform))
  $effect(() => applyProp('visible', visible))
  $effect(() => applyProp('x', x))
  $effect(() => applyProp('y', y))
  $effect(() => applyProp('width', width))
  $effect(() => applyProp('zIndex', zIndex))

  const eventListeners = Object.keys(restProps)
    .filter((key) => key.startsWith('on'))
    .map((key) => ({
      eventName: key.slice(2).toLowerCase(),
      listener: restProps[key],
    }))

  eventListeners.forEach(({ eventName, listener }) => {
    instance.on(eventName, listener)
  })

  onMount(() => {
    // containers only update existing children but svelte will apply
    // initial props before its children are mounted.
    // so, if we have children, re-apply props
    // TODO: unsure how svelte handles this with props.children
    // if (children) {
    //   applyProps({ x, y, width, height })
    // }

    return () => {
      eventListeners.forEach(({ eventName, listener }) => {
        instance.off(eventName, listener)
      })

      _instance?.destroy()
      _parent?.removeChild(_instance)
      invalidate()
    }
  })
</script>

{#if children}
  {@render children()}
{/if}
