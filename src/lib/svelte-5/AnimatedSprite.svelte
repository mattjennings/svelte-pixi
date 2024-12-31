<script module lang="ts">
  export interface AnimatedSpriteProps<
    T extends PIXI.AnimatedSprite = PIXI.AnimatedSprite,
  > extends ContainerProps<T>,
      PickPixiProps<
        PIXI.AnimatedSprite,
        | 'playing'
        | 'autoUpdate'
        | 'animationSpeed'
        | 'loop'
        | 'anchor'
        | 'blendMode'
        | 'roundPixels'
        | 'onComplete'
        | 'onFrameChange'
        | 'onLoop',
        'textures'
      > {
    instance?: T

    // because pixi has camel casing on these handlers, we'll also
    // support the lowercase versions
    /**
     * Alias for onLoop
     */
    onloop?: PIXI.AnimatedSprite['onLoop']

    /**
     * Alias for onComplete
     */
    oncomplete?: PIXI.AnimatedSprite['onComplete']

    /**
     * Alias for onFrameChange
     */
    onframechange?: PIXI.AnimatedSprite['onFrameChange']
  }
</script>

<script
  lang="ts"
  generics="T extends PIXI.AnimatedSprite = PIXI.AnimatedSprite"
>
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { createApplyProps } from '../core/util/props'
  import { getRenderer } from '../core/context/renderer'

  let {
    textures,
    playing,
    autoUpdate,
    animationSpeed,
    loop,
    anchor,
    blendMode,
    roundPixels,
    onComplete,
    onFrameChange,
    onLoop,
    onloop,
    oncomplete,
    onframechange,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: AnimatedSpriteProps<T> = $props()

  if (!instance) {
    instance = new PIXI.AnimatedSprite({
      textures,
      autoUpdate,
      isRenderGroup,
    }) as T
  }

  const { invalidate } = getRenderer()

  const { applyProp } = createApplyProps<
    PIXI.AnimatedSprite,
    AnimatedSpriteProps<T>
  >(instance, {
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

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('blendMode', blendMode))
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

      // invalidate after frame change
      invalidate()
    }),
  )
  $effect(() => applyProp('onLoop', onloop ?? onLoop))
  $effect(() => {
    textures.forEach((texture) => texture.on('update', invalidate))

    return () => {
      textures.forEach((texture) => texture.off('update', invalidate))
    }
  })
</script>

<Container {...restProps} {instance} />
