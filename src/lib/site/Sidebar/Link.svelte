<script lang="ts">
  import { page } from '$app/stores'
  import { createEventDispatcher, onMount } from 'svelte'

  const dispatch = createEventDispatcher()

  export let link

  let anchorEl: HTMLAnchorElement
  $: active = $page.url.pathname === link.href

  function updateScroll() {
    if (active && anchorEl) {
      anchorEl.scrollIntoView({
        block: 'center',
      })
    }
  }

  onMount(() => {
    updateScroll()
  })

  $: $page, updateScroll()
</script>

{#if link.links}
  <li class="ml-2 mt-4">
    <span
      class="flex items-center p-1 w-full rounded text-left font-medium text-slate-800"
      role="group"
      on:click={() => dispatch('expand')}
    >
      {link.title}
    </span>
    <ul class="ml-2 pt-1">
      {#each link.links as sublink}
        <svelte:self link={sublink} />
      {/each}
    </ul>
  </li>
{:else}
  <li class="mb-2">
    <a bind:this={anchorEl} sveltekit:prefetch href={link.href} class:active
      >{link.title}</a
    >
  </li>
{/if}

<style>
  a {
    @apply text-slate-800 rounded-md py-0.5 my-1 px-2 flex items-center text-sm;
  }
  a.active {
    @apply text-slate-900 bg-slate-200 font-medium;
  }
</style>
