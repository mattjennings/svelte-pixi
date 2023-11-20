<script>
  import { Application } from 'svelte-pixi'

  // console.log($$props)
</script>

<Application width={400} height={400}>
  <slot />
</Application>
