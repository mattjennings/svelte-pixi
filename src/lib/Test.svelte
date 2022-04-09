<script lang="ts">
  import * as PIXI from 'pixi.js'
  import type { ExtractProps } from './util/props'

  type T = $$Generic<PIXI.Container>
  type $$Props = ExtractProps<PIXI.Container> &
    ExtractProps<T> & {
      instance?: T
    }

  export const instance: T = new PIXI.Container() as T
  ;($$props as $$Props).x
</script>

<slot />
