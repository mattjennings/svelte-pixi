<script lang="ts">
  import type * as PIXI from 'pixi.js'
  import Container, { getContainer } from '../Container.svelte'
  import { getRenderer } from '../Renderer.svelte'

  type T = $$Generic<PIXI.Graphics>
  type Props = Omit<Container<T>['$$prop_def'], 'instance'> & {
    /**
     * If global, it will layout the children according to the renderer bounds
     *
     * If local, it will layout the children according to the parent container
     * or its own bounds if set
     */
    bounds?: 'global' | 'local'

    /**
     * The alignment of the children
     *
     * @type {'left' | 'center' | 'right' | { horizontal: 'left' | 'center' | 'right', vertical: 'top' | 'center' | 'bottom' }}
     */
    align?:
      | 'center'
      | {
          horizontal: 'left' | 'center' | 'right'
          vertical: 'top' | 'center' | 'bottom'
        }
  }

  let {
    bounds = 'local',
    align,
    width,
    height,
    x,
    y,
    ...restProps
  } = $props<Props>()

  let instance = $state<PIXI.Container | undefined>()

  const { renderer } = getRenderer()
  const { container } = getContainer()

  function updatePosition({
    bounds,
    width,
    height,
  }: Pick<Props, 'bounds' | 'width' | 'height'>) {
    const parentBounds =
      bounds === 'global'
        ? renderer.screen
        : {
            width: width ?? container.width,
            height: height ?? container.height,
          }

    if (align) {
      if (typeof align === 'string') {
        switch (align) {
          case 'center':
            x = parentBounds.width / 2
            y = parentBounds.height / 2
            break
        }
      } else {
        const { horizontal, vertical } = align
        switch (horizontal) {
          case 'left':
            x = 0
            break
          case 'right':
            x = parentBounds.width - container.width
            break
          case 'center':
            x = parentBounds.width / 2 - container.width / 2
            break
        }
        switch (vertical) {
          case 'top':
            y = 0
            break
          case 'bottom':
            y = parentBounds.height - container.height
            break
          case 'center':
            y = parentBounds.height / 2 - container.height / 2
            break
        }
      }
    }
  }

  $effect(() => {
    updatePosition({ bounds, width, height })
  })
</script>

<Container bind:instance {x} {y} {...restProps} />
