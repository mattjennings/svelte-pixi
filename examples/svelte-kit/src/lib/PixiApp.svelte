<script>
  import { Application, Sprite, texture } from 'svelte-pixi/svelte-4'
  import logoSrc from './pixijs-logo.svg'

  const logo = texture(logoSrc)
</script>

<Application width={400} height={400} antialias>
  <Sprite x={200} y={200} texture={$logo} anchor={0.5} />
</Application>
