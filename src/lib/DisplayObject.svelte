<script context="module" lang="ts">
  export interface DisplayObjectComponentProps<
    Instance extends PixiDisplayObject
  > extends ExtractProps<Omit<PixiDisplayObject, 'scale' | 'skew'>>,
      ExtractProps<GlobalMixins.DisplayObject> {
    instance: Instance
    scale?: PointLike
    skew?: PointLike
  }
</script>

<script lang="ts">
  import type { DisplayObject as PixiDisplayObject } from '@pixi/display'
  import {
    afterUpdate,
    createEventDispatcher,
    getContext,
    onMount,
  } from 'svelte'
  import { getContainer } from './Container.svelte'
  import { createPixiEventDispatcher } from './util'
  import type { PointLike } from './util/data-types'
  import { applyPoint, applyProps, type ExtractProps } from './util/props'

  type T = $$Generic<PixiDisplayObject>
  type $$Props = DisplayObjectComponentProps<T>

  const { onComponentUpdate } = getContext('pixi_internal')

  /** @type {DisplayObject} DisplayObject instance to render */
  export let instance: PixiDisplayObject

  export let parent = getContainer()

  onMount(() => {
    let childIndex = -1

    // make sure child isn't already added to the parent
    try {
      // Container.getChildIndex throws an error if instance is not a child...
      childIndex = parent.getChildIndex(instance)
      // eslint-disable-next-line no-empty
    } catch (e) {}

    if (parent && childIndex === -1) {
      parent.addChild(instance)
    } else {
      throw new Error('Unable to find container or stage')
    }

    return () => {
      parent?.removeChild(instance)
    }
  })

  afterUpdate(() => {
    onComponentUpdate()
  })

  $: {
    applyProps(instance, $$props, {
      apply: {
        scale: applyPoint,
      },
    })
  }

  const dispatch = createEventDispatcher()

  onMount(() => {
    const dispatchers = [
      createPixiEventDispatcher(instance, dispatch, 'click'),
      createPixiEventDispatcher(instance, dispatch, 'mousedown'),
      createPixiEventDispatcher(instance, dispatch, 'mousemove'),
      createPixiEventDispatcher(instance, dispatch, 'mouseout'),
      createPixiEventDispatcher(instance, dispatch, 'mouseover'),
      createPixiEventDispatcher(instance, dispatch, 'mouseup'),
      createPixiEventDispatcher(instance, dispatch, 'mouseupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'mouseupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'pointercancel'),
      createPixiEventDispatcher(instance, dispatch, 'pointerdown'),
      createPixiEventDispatcher(instance, dispatch, 'pointermove'),
      createPixiEventDispatcher(instance, dispatch, 'pointerout'),
      createPixiEventDispatcher(instance, dispatch, 'pointerover'),
      createPixiEventDispatcher(instance, dispatch, 'pointertap'),
      createPixiEventDispatcher(instance, dispatch, 'pointerup'),
      createPixiEventDispatcher(instance, dispatch, 'pointerupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'removedFrom'),
      createPixiEventDispatcher(instance, dispatch, 'rightclick'),
      createPixiEventDispatcher(instance, dispatch, 'rightdown'),
      createPixiEventDispatcher(instance, dispatch, 'rightup'),
      createPixiEventDispatcher(instance, dispatch, 'rightupoutside'),
      createPixiEventDispatcher(instance, dispatch, 'tap'),
      createPixiEventDispatcher(instance, dispatch, 'touchcancel'),
      createPixiEventDispatcher(instance, dispatch, 'touchend'),
      createPixiEventDispatcher(instance, dispatch, 'touchendoutside'),
      createPixiEventDispatcher(instance, dispatch, 'touchmove'),
      createPixiEventDispatcher(instance, dispatch, 'touchstart'),
      createPixiEventDispatcher(instance, dispatch, 'added'),
      createPixiEventDispatcher(instance, dispatch, 'removed'),
    ]
    return () => {
      dispatchers.forEach((remove) => remove())
    }
  })
</script>

<slot />
