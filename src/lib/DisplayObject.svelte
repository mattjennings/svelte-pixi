<script context="module" lang="ts">
  export interface DisplayObjectComponentProps<
    Instance extends PixiDisplayObject
  > extends ExtractProps<PixiDisplayObject>,
      ExtractProps<GlobalMixins.DisplayObject> {
    instance: Instance
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
  import { createPixiEventDispatcher } from '$lib/util/helpers'
  import { applyProps, type ExtractProps } from './util/props'

  type T = $$Generic<PixiDisplayObject>
  type $$Props = DisplayObjectComponentProps<T>

  const { onComponentUpdate } = getContext('pixi/renderer_internal')

  /** @type {DisplayObject} DisplayObject instance to render */
  export let instance: PixiDisplayObject

  /**
   * The parent container to add this component to. Set to null
   * if you don't want to add it to a parent.
   */
  export let parent = getContainer()

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

    if (_parent && childIndex === -1) {
      _parent.addChild(_instance)

      return () => {
        _instance?.destroy()
        _parent?.removeChild(_instance)
      }
    }
  })

  afterUpdate(() => {
    onComponentUpdate()
  })

  $: applyProps(instance, $$props)

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
