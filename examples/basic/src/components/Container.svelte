<script>
  import * as PIXI from 'pixi.js'
  import { onMount, getContext, setContext } from 'svelte'

  import createSelf from '../util/createSelf'
  import getParentContainer from '../util/getParentContainer'

  const parent = getParentContainer()

  let self

  createSelf(self, () => {
    const container = new PIXI.Container()
    setContext('container', self)

    return container
  })

  onMount(() => {
    return () => {
      setContext('container', undefined)
    }
  })
</script>

<slot />
