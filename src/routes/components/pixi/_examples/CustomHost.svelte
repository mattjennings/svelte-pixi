<script>
  import { Pixi } from 'svelte-pixi'
</script>

<Pixi width={400} height={400} antialias let:render>
  <div class="custom" use:render>
    <!-- some cool components -->
  </div>
</Pixi>

<style>
  :global(.custom canvas) {
    border: 5px solid tomato;
    border-radius: 5px;
  }
</style>
