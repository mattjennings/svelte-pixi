<script lang="ts" module>
  export interface BitmapTextProps<T extends PIXI.BitmapText = PIXI.BitmapText>
    extends
      ContainerProps<T>,
      PickPixiProps<
        PIXI.BitmapText,
        'anchor' | 'roundPixels' | 'text' | 'style'
      > {
    /**
     * The PIXI.BitmapText instance. Can be set or bound to.
     *
     * WARNING: Type-safety limitation - If you are using a subclass of PIXI.BitmapText,
     * you MUST provide the instance prop with your custom instance. Due to TypeScript's
     * limitations with generic types, if you don't provide an instance, a base
     * PIXI.BitmapText will be created and cast to your type, which will cause runtime
     * errors when trying to access subclass-specific properties or methods.
     *
     * Example:
     * ```typescript
     * class MyBitmapText extends PIXI.BitmapText {
     *   myMethod() { ... }
     * }
     * const bitmapText = new MyBitmapText()
     *
     * <!-- Correct: always provide instance for subclasses -->
     * <BitmapText instance={bitmapText} />
     * ```
     */
    instance?: T
  }
</script>

<script lang="ts" generics="T extends PIXI.BitmapText = PIXI.BitmapText">
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'
  import { getRenderer } from '../core/context/renderer'
  import { createApplyProps } from '../core/util/props'

  let {
    anchor,
    roundPixels,
    text,
    style,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: BitmapTextProps<T> = $props()

  if (!instance) {
    // svelte-ignore state_referenced_locally
    instance = new PIXI.BitmapText({ text, style, isRenderGroup }) as T
  }

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.BitmapText>(instance, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('anchor', anchor))
  $effect(() => applyProp('roundPixels', roundPixels))
  $effect(() => applyProp('text', text))
  $effect(() => applyProp('style', style))
</script>

<Container {...restProps} {instance} />
