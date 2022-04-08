<script>
  export let src
  export let meta

  $: src, meta
</script>

<div class="flex flex-col w-full overflow-hidden rounded mb-4">
  <div class="flex justify-center py-3 bg-slate-700">
    <div class="overflow-hidden rounded min-h-[400px]">
      {#if !meta.noApp}
        {#await import('svelte-pixi') then app}
          <svelte:component
            this={app.Application}
            width={meta.width || 400}
            height={meta.height || 400}
            backgroundColor={meta.bg === 'white' ? 0xffffff : undefined}
            antialias
          >
            <svelte:component
              this={app.Loader}
              resources={meta.resources ? meta.resources : []}
            >
              <slot name="example" />
            </svelte:component>
          </svelte:component>
        {/await}
      {:else}
        <slot name="example" />
      {/if}
    </div>
  </div>
  <div class="code max-h-[600px] overflow-scroll">
    <pre class="!my-0 !rounded-none"><slot name="code" /></pre>
  </div>
</div>
