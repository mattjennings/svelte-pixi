<script lang="ts">
  import { page } from '$app/stores'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronDown } from '@steeze-ui/heroicons'
  import { createEventDispatcher } from 'svelte'
  import type { Link } from 'src/routes/links.json'

  const dispatch = createEventDispatcher()

  export let link: Link
</script>

{#if link.links}
  <li class="ml-2 mt-4">
    <button
      class="flex items-center p-1 w-full rounded text-left font-medium text-slate-800 group"
      role="group"
      on:click={() => dispatch('expand')}
    >
      {link.title}
      <div
        class="ml-2 w-4 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <Icon src={ChevronDown} />
      </div>
    </button>
    <ul class="ml-2 pt-1">
      {#each link.links as sublink}
        <svelte:self link={sublink} />
      {/each}
    </ul>
  </li>
{:else}
  <li class="mb-2">
    <a href={link.href} class:active={$page.url.pathname === link.href}
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
