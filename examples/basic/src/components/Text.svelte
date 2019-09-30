<script>
  import * as PIXI from 'pixi.js'
  import { onMount, beforeUpdate } from 'svelte'
  import addPixiInstance from '../util/addPixiInstance'

  export let text
  export let fill = 0xffffff
  export let fontSize = 16
  export let position

  const self = new PIXI.Text(text, { position, fill, fontSize })
  const removeSelf = addPixiInstance(self)

  beforeUpdate(() => {
    self.text = text
    self.position = position
    self.fill = fill
    self.fontSize = fontSize
  })

  onMount(() => removeSelf)
</script>
