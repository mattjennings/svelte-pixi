<script lang="ts" module>
  export interface ParticleContainerProps<
    T extends PIXI.ParticleContainer = PIXI.ParticleContainer,
  > extends ContainerProps<T>,
      PickPixiProps<
        PIXI.ParticleContainer & PIXI.ParticleContainerOptions,
        'dynamicProperties' | 'shader' | 'roundPixels',
        'texture' | 'particles'
      > {}
</script>

<script
  lang="ts"
  generics="T extends PIXI.ParticleContainer = PIXI.ParticleContainer"
>
  import * as PIXI from 'pixi.js'
  import Container, { type ContainerProps } from './Container.svelte'
  import type { PickPixiProps } from '../core/util/data-types'

  let {
    dynamicProperties,
    shader,
    roundPixels,
    texture,
    particles,
    isRenderGroup,
    instance = $bindable(),
    ...restProps
  }: ParticleContainerProps<T> = $props()

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
