<script>
  import * as PIXI from 'pixi.js'
  import { onMount, setContext } from 'svelte'

  import addPixiInstance from './util/addPixiInstance'

  const self = new PIXI.Container()
  const removeSelf = addPixiInstance(self)
  setContext('pixi-container', self)

  onMount(() => {
    return () => {
      removeSelf()
      setContext('pixi-container', undefined)
    }
  })
</script>

<slot />
