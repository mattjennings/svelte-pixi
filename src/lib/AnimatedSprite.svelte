<script lang="ts">
  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import { getRenderer } from './Renderer.svelte'
  import Container from './Container.svelte'
  import { createApplyProps } from './util/props'
  import type { PickPixiProps } from './util/data-types'

  type T = $$Generic<PIXI.AnimatedSprite>
  type Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.AnimatedSprite,
      | 'playing'
      | 'autoUpdate'
      | 'animationSpeed'
      | 'loop'
      | 'anchor'
      | 'blendMode'
      | 'pluginName'
      | 'roundPixels'
      | 'onComplete'
      | 'onFrameChange'
      | 'onLoop',
      'textures'
    > & {
      instance?: T
      // because pixi has camel casing on these handlers, we'll also
      // support the lowercase versions
      onloop?: PIXI.AnimatedSprite['onLoop']
      oncomplete?: PIXI.AnimatedSprite['onComplete']
      onframechange?: PIXI.AnimatedSprite['onFrameChange']
    }

  const {
    textures,
    playing,
    autoUpdate,
    animationSpeed,
    loop,
    anchor,
    blendMode,
    pluginName,
    roundPixels,
    instance: _instance,
    onComplete,
    onFrameChange,
    onLoop,
    onloop,
    oncomplete,
    onframechange,
    ...restProps
  } = $props<Props>()

  export const instance: T = (_instance ??
    new PIXI.AnimatedSprite(textures, autoUpdate)) as T

  const { applyProp } = createApplyProps<PIXI.AnimatedSprite, Props>(instance, {
    onApply() {
      invalidate()
    },
    apply: {
      textures: (value, instance) => {
        instance.textures = value

        if (playing) {
          instance.play()
        }
      },
      playing: (value, instance) => {
        if (playing) {
          instance.play()
        } else {
          instance.stop()
        }
      },
    },
  })

  const { invalidate } = getRenderer()

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('autoUpdate', autoUpdate))
  $effect(() => applyProp('animationSpeed', animationSpeed))
  $effect(() => applyProp('loop', loop))
  $effect(() => applyProp('textures', textures))
  $effect(() => applyProp('playing', playing))

  $effect(() => applyProp('onComplete', oncomplete ?? onComplete))
  $effect(() =>
    applyProp('onFrameChange', (...args: [any]) => {
      if (onframechange) {
        onframechange(...args)
      } else if (onFrameChange) {
        onFrameChange(...args)
      }
      invalidate()
    }),
  )
  $effect(() => applyProp('onLoop', onloop ?? onLoop))

  // trigger render if texture loads (was not preloaded)
  $effect(() => {
    textures.forEach((texture) => texture.on('update', invalidate))

    return () => {
      textures.forEach((texture) => texture.off('update', invalidate))
    }
  })
</script>

<Container {...restProps} {instance} />
