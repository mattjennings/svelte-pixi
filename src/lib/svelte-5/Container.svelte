<script lang="ts" module>
  export interface ContainerProps<T extends PIXI.Container = PIXI.Container>
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
      | 'boundsArea'
      | 'cacheAsTexture'
      | 'cacheAsBitmap'
      | 'cullable'
      | 'cullableChildren'
      | 'cullArea'
      | 'cursor'
      | 'effects'
      | 'filterArea'
      | 'filters'
      | 'height'
      | 'hitArea'
      | 'eventMode'
      | 'interactive'
      | 'interactiveChildren'
      | 'isRenderGroup'
      | 'label'
      | 'name'
      | 'pivot'
      | 'position'
      | 'renderable'
      | 'rotation'
      | 'scale'
      | 'skew'
      | 'sortableChildren'
      | 'tabIndex'
      | 'width'
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

    /**
     * Called on creation of the component. You can use this to do any setup
     * on the instance directly
     */
    oncreate?: (instance: T) => void

    /**
     * Called when the instance is added to its parent or stage
     */
    onadded?: () => void

    /**
     * Called when the instance removed from its parent or stage
     */
    onremoved?: () => void

    children?: Snippet<[instance: T]>

    mask?: number | PIXI.Container | Partial<PIXI.MaskOptionsAndMask>
  }
</script>

<script lang="ts" generics="T extends PIXI.Container = PIXI.Container">
  import { createApplyProps } from '../core/util/props'

  import type { PickPixiProps } from '../core/util/data-types'

  import * as PIXI from 'pixi.js'
  import { onMount, type Snippet } from 'svelte'
  import {
    getContainer,
    setContainer,
    setStage,
  } from '../core/context/container'
  import { getRenderer } from '../core/context/renderer'

  let {
    children,
    accessible,
    accessibleChildren,
    accessibleHint,
    accessiblePointerEvents,
    accessibleTitle,
    accessibleType,
    alpha,
    angle,
    boundsArea,
    cacheAsBitmap,
    cacheAsTexture,
    cursor,
    cullableChildren,
    cullable,
    cullArea,
    effects,
    eventMode,
    filterArea,
    hitArea,
    filters,
    height,
    interactive,
    interactiveChildren,
    isRenderGroup,
    mask,
    label,
    name,
    pivot,
    position,
    renderable,
    rotation,
    scale,
    skew,
    sortableChildren,
    tabIndex,
    visible,
    x,
    y,
    width,
    zIndex,

    // events
    onadded,
    onclick,
    oncreate,
    onglobalmousemove,
    onglobalpointermove,
    onglobaltouchmove,
    onmousedown,
    onmousemove,
    onmouseout,
    onmouseover,
    onmouseup,
    onmouseupoutside,
    onmouseenter,
    onmouseleave,
    onpointercancel,
    onpointerdown,
    onpointermove,
    onpointerout,
    onpointerover,
    onpointertap,
    onpointerup,
    onpointerupoutside,
    onpointerenter,
    onpointerleave,
    onrightclick,
    onrightdown,
    onrightup,
    onrightupoutside,
    ontap,
    ontouchcancel,
    ontouchend,
    ontouchendoutside,
    ontouchmove,
    ontouchstart,
    onremoved,

    // bindings
    instance = $bindable() as T,
  }: ContainerProps<T> = $props()

  if (!instance) {
    instance = new PIXI.Container({
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()
  const { container: parent } = getContainer() ?? {}

  // if no parent, this is the stage (root container)
  if (!parent) {
    setStage(instance)
  }

  setContainer(instance)

  // preserve reference to instance & parent, they could
  // be lost by unmount
  let _instance = instance
  let _parent = parent

  if (_parent) {
    if (_parent.children.indexOf(_instance) === -1) {
      if (onadded) {
        // $effect will run after we add, so make onadd is properly setup initilaly
        _instance.once('added', onadded)
      }
      _parent.addChild(_instance)
    }
  }

  oncreate?.(instance)

  const { applyProp } = createApplyProps<PIXI.Container, ContainerProps>(
    instance,
    {
      onApply() {
        invalidate()
      },
      apply: {
        mask: (value, instance) => {
          if (value) {
            if (typeof value === 'number' || value instanceof PIXI.Container) {
              instance.setMask({ mask: value })
            } else {
              instance.setMask(value)
            }
          } else {
            instance.mask = null
          }
        },
        onadded: (value, instance) => {
          if (value) {
            instance.on('added', value)

            return () => {
              instance.off('added', value)
            }
          }
        },
        onremoved: (value, instance) => {
          if (value) {
            instance.on('removed', value)

            return () => {
              instance.off('removed', value)
            }
          }
        },
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
  $effect(() => applyProp('boundsArea', boundsArea))
  $effect(() => applyProp('cacheAsBitmap', cacheAsBitmap))
  $effect(() => applyProp('cacheAsTexture', cacheAsTexture))
  $effect(() => applyProp('cursor', cursor))
  $effect(() => applyProp('cullable', cullable))
  $effect(() => applyProp('cullableChildren', cullableChildren))
  $effect(() => applyProp('cullArea', cullArea))
  $effect(() => applyProp('effects', effects))
  $effect(() => applyProp('eventMode', eventMode))
  $effect(() => applyProp('filterArea', filterArea))
  $effect(() => applyProp('hitArea', hitArea))
  $effect(() => applyProp('filters', filters))
  $effect(() => applyProp('height', height))
  $effect(() => applyProp('interactive', interactive))
  $effect(() => applyProp('interactiveChildren', interactiveChildren))
  $effect(() => applyProp('mask', mask))
  $effect(() => applyProp('label', label ?? name))
  $effect(() => applyProp('pivot', pivot))
  $effect(() => applyProp('position', position))
  $effect(() => applyProp('renderable', renderable))
  $effect(() => applyProp('rotation', rotation))
  $effect(() => applyProp('scale', scale))
  $effect(() => applyProp('skew', skew))
  $effect(() => applyProp('sortableChildren', sortableChildren))
  $effect(() => applyProp('tabIndex', tabIndex))
  $effect(() => applyProp('visible', visible))
  $effect(() => applyProp('x', x))
  $effect(() => applyProp('y', y))
  $effect(() => applyProp('width', width))
  $effect(() => applyProp('zIndex', zIndex))

  // events
  $effect(() => applyProp('onadded', onadded))
  $effect(() => applyProp('onclick', onclick))
  $effect(() => applyProp('onglobalmousemove', onglobalmousemove))
  $effect(() => applyProp('onglobalpointermove', onglobalpointermove))
  $effect(() => applyProp('onglobaltouchmove', onglobaltouchmove))
  $effect(() => applyProp('onmousedown', onmousedown))
  $effect(() => applyProp('onmousemove', onmousemove))
  $effect(() => applyProp('onmouseout', onmouseout))
  $effect(() => applyProp('onmouseover', onmouseover))
  $effect(() => applyProp('onmouseup', onmouseup))
  $effect(() => applyProp('onmouseupoutside', onmouseupoutside))
  $effect(() => applyProp('onmouseenter', onmouseenter))
  $effect(() => applyProp('onmouseleave', onmouseleave))
  $effect(() => applyProp('onpointercancel', onpointercancel))
  $effect(() => applyProp('onpointerdown', onpointerdown))
  $effect(() => applyProp('onpointermove', onpointermove))
  $effect(() => applyProp('onpointerout', onpointerout))
  $effect(() => applyProp('onpointerover', onpointerover))
  $effect(() => applyProp('onpointertap', onpointertap))
  $effect(() => applyProp('onpointerup', onpointerup))
  $effect(() => applyProp('onpointerupoutside', onpointerupoutside))
  $effect(() => applyProp('onpointerenter', onpointerenter))
  $effect(() => applyProp('onpointerleave', onpointerleave))
  $effect(() => applyProp('onrightclick', onrightclick))
  $effect(() => applyProp('onrightdown', onrightdown))
  $effect(() => applyProp('onrightup', onrightup))
  $effect(() => applyProp('onrightupoutside', onrightupoutside))
  $effect(() => applyProp('ontap', ontap))
  $effect(() => applyProp('ontouchcancel', ontouchcancel))
  $effect(() => applyProp('ontouchend', ontouchend))
  $effect(() => applyProp('ontouchendoutside', ontouchendoutside))
  $effect(() => applyProp('ontouchmove', ontouchmove))
  $effect(() => applyProp('ontouchstart', ontouchstart))
  $effect(() => applyProp('onremoved', onremoved))

  onMount(() => {
    return () => {
      // @ts-ignore - release binding
      instance = undefined

      _instance?.destroy()
      _parent?.removeChild(_instance)
      invalidate()
    }
  })
</script>

{@render children?.(instance)}
