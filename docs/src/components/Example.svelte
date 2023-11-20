<script>
  import ExampleApplication from './ExampleApplication.svelte'
</script>

<div class="flex flex-col w-full overflow-hidden rounded mb-4">
  <div class="flex justify-center py-3 bg-slate-700">
    <div class="overflow-hidden rounded min-h-[400px]">
      <ExampleApplication width={400} height={400}>
        <slot />
      </ExampleApplication>
    </div>
  </div>
  <!-- <Code {code} lang="svelte" /> -->
</div>
