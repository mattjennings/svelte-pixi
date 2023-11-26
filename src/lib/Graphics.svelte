<script lang="ts">
  import { createApplyProps } from './util/props'

  /**
   * @restProps {Container}
   */
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import { getRenderer } from './Renderer.svelte'

  type T = $$Generic<PIXI.Graphics>
  type Props = Container<T>['$$prop_def'] & {
    draw?: (graphics: PIXI.Graphics) => any
    blendMode?: PIXI.Graphics['blendMode']
    pluginName?: PIXI.Graphics['pluginName']
    tint?: PIXI.Graphics['tint']
    geometry?: PIXI.Graphics['geometry']
  }

  const {
    draw,
    blendMode,
    pluginName,
    tint,
    geometry,
    children,
    instance: _instance,
    ...restProps
  } = $props<Props>()

  export const instance = (_instance ?? new PIXI.Graphics(geometry)) as T

  const { invalidate } = getRenderer()
  const { applyProp } = createApplyProps<PIXI.Graphics>(instance as T, {
    onApply() {
      invalidate()
    },
  })

  $effect(() => applyProp('blendMode', blendMode))
  $effect(() => applyProp('pluginName', pluginName))
  $effect(() => applyProp('tint', tint))

  $effect(() => {
    if (draw) {
      draw(instance as T)
    }
  })
</script>

<Container {...restProps} {instance} {children} />
