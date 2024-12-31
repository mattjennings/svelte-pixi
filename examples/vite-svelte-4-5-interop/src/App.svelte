<script>
  import { Application } from 'svelte-pixi'
  import ClickMe4 from './ClickMe4.svelte'
  import ClickMe5 from './ClickMe5.svelte'
</script>

<Application width={400} height={400} antialias>
  <ClickMe4
    x={100}
    y={100}
    on:click={() => console.log('hello from svelte 4 syntax')}
  />
  <ClickMe5
    x={100}
    y={200}
    onclick={() => console.log('hello from svelte 5 syntax')}
  />
</Application>
