<script lang="ts">
  import type * as PIXI from 'pixi.js'
  import Container, { getContainer } from '../Container.svelte'
  import { onTick } from '../Ticker.svelte'
  import { getRenderer } from '../Renderer.svelte'

  /**
   * The alignment of the children
   *
   * @type {'left' | 'center' | 'right' | { horizontal: 'left' | 'center' | 'right', vertical: 'top' | 'center' | 'bottom' }}
   */
  export let align: $$Props['align'] = undefined

  export let instance: PIXI.Container | undefined = undefined

  export let bounds: $$Props['bounds'] = 'local'
  export let width: $$Props['width'] = undefined
  export let height: $$Props['height'] = undefined

  type T = $$Generic<PIXI.Graphics>
  type $$Props = Container<T>['$$prop_def'] & {
    /**
     * If global, it will layout the children according to the renderer bounds
     *
     * If local, it will layout the children according to the parent container
     * or its own bounds if set
     */
    bounds?: 'global' | 'local'

    align?:
      | 'center'
      | {
          horizontal: 'left' | 'center' | 'right'
          vertical: 'top' | 'center' | 'bottom'
        }
  }

  const { renderer } = getRenderer()
  const { container } = getContainer()

  let x = 0
  let y = 0

  function updatePosition() {
    const parentBounds =
      bounds === 'global'
        ? renderer.screen
        : {
            // ...container.getBounds(),
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

  $: updatePosition()

  onTick(() => {
    updatePosition()
  })
</script>

<Container bind:instance {x} {y} {...$$restProps}>
  <slot />
</Container>
