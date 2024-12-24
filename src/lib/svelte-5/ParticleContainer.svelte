<script lang="ts">
  import * as PIXI from 'pixi.js'
  import Container from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'

  type T = $$Generic<PIXI.ParticleContainer>
  type $$Props = Container<T>['$$prop_def'] &
    PickPixiProps<
      PIXI.ParticleContainer & PIXI.ParticleContainerOptions,
      'dynamicProperties' | 'shader' | 'roundPixels',
      'texture' | 'particles'
    > & {
      instance?: T
    }
  let {
    dynamicProperties,
    shader,
    roundPixels,
    texture,
    particles,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: $$Props = $props()

  if (!instance) {
    instance = new PIXI.ParticleContainer({
      dynamicProperties,
      shader,
      roundPixels,
      texture,
      particles,
      isRenderGroup,
    }) as T
  }
</script>

<Container {...restProps} {instance} />
