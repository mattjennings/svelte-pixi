<script>
  import Prism from 'prismjs'
  import 'prism-svelte'

  export let src

  $: highlighted = Prism.highlight(src, Prism.languages.svelte, 'svelte')
</script>

<div class="flex flex-col w-full overflow-hidden rounded mb-4">
  <div class="flex justify-center py-3 bg-slate-700">
    <div class="overflow-hidden rounded">
      <slot />
    </div>
  </div>
  <div class="text-sm md:text-base">
    <pre class="!my-0 !rounded-none">{@html highlighted}</pre>
  </div>
</div>
