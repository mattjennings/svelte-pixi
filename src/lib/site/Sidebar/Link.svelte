<script lang="ts" context="module">
  export interface Link {
    label: string
    href?: string
    base?: string
    links?: Link[]
  }
</script>

<script lang="ts">
  import { page } from '$app/stores'
  import { slide } from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronDown } from '@steeze-ui/heroicons'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let link: Link
  export let parent: Link = undefined
  export let expanded = false // $page.url.pathname.startsWith(link.base)

  $: href = parent?.base ? parent.base + link.href : link.href

  function fadeSlide(node, options) {
    const slideTrans = slide(node, options)
    return {
      duration: options.duration,
      css: (t, u) => `
            ${slideTrans.css(t, u)}
            opacity: ${t};
        `,
    }
  }
</script>

{#if link.links}
  <li class="ml-2 mt-4">
    <button
      class="flex items-center p-1 w-full rounded text-left font-medium text-slate-800 group"
      role="group"
      on:click={() => dispatch('expand')}
    >
      {link.label}
      <div
        class="ml-2 w-4 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <Icon src={ChevronDown} />
      </div>
    </button>
    {#if expanded}
      <ul class="ml-2 pt-1 " transition:fadeSlide|local={{ duration: 200 }}>
        {#each link.links as sublink}
          <svelte:self link={sublink} parent={link} />
        {/each}
      </ul>
    {/if}
  </li>
{:else}
  <li class="mb-2">
    <a {href} class:active={$page.url.pathname === href}>{link.label}</a>
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
