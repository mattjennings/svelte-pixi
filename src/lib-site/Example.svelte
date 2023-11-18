<script>
  import { browser } from '$app/environment'
  import Code from './Code.svelte'

  export let src
  export let meta

  $: src, meta
</script>

<div class="flex flex-col w-full overflow-hidden rounded mb-4">
  <div class="flex justify-center py-3 bg-slate-700">
    <div class="overflow-hidden rounded min-h-[400px]">
      {#if !meta.noApp && browser}
        {#await import('$lib-site/ExampleApplication.svelte') then app}
          <svelte:component
            this={app.default}
            width={meta.width || 400}
            height={meta.height || 400}
            backgroundColor={meta.bg === 'white' ? 0xffffff : undefined}
            antialias
            assets={meta.assets ? meta.assets : []}
          >
            <slot name="example" />
          </svelte:component>
        {/await}
      {:else}
        <slot name="example" />
      {/if}
    </div>
  </div>
  <Code class=""><slot name="code" /></Code>
</div>
