<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate } from 'svelte'
  import addPixiInstance from '../util/addPixiInstance'
  import applyProps from '../util/applyProps'

  export let text
  export let fill = 0xffffff
  export let fontSize = 16
  export let position

  const self = new PIXI.Text(text, { position, fill, fontSize })
  const removeSelf = addPixiInstance(self)

  beforeUpdate(() => {
    applyProps(self, $$props)
  })
  onMount(() => removeSelf)
</script>
