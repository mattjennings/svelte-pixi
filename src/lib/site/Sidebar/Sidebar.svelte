<script lang="ts">
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { X, Menu } from '@steeze-ui/heroicons'
  import GitHub from '../GitHub.svelte'
  import Link from './Link.svelte'
  import { focusTrap } from 'svelte-focus-trap'

  export let links

  let isMenuOpen = false
  $: if ($page.url.pathname) {
    isMenuOpen = false
  }
</script>

<!-- Static sidebar for desktop -->
<div class="hidden lg:flex md:flex-shrink-0 h-screen sticky top-0">
  <div class="w-[15rem] flex flex-col">
    <div
      class="border-r border-gray-200  pb-4 flex flex-col flex-grow overflow-y-auto"
    >
      <div class="flex-grow mt-5 flex flex-col">
        <nav class="flex-1 bg-white px-2 space-y-1">
          <div class="flex justify-between">
            <a href="/" class="pl-3 text-2xl font-bold"> Svelte Pixi </a>
            <GitHub />
          </div>
          <ul>
            {#each links as link}
              <Link {link} />
            {/each}
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>

<!-- Mobile sidebar -->
{#if isMenuOpen}
  <div
    class="fixed inset-0 z-40 flex lg:hidden"
    role="dialog"
    aria-modal="true"
    use:focusTrap
  >
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
      transition:fade
      on:click={() => (isMenuOpen = false)}
    />

    <div
      class="relative max-w-[15rem] w-full bg-white pb-4 flex-1 flex flex-col"
      transition:fly={{
        x: -200,
        y: 0,
      }}
    >
      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <nav class="px-2 space-y-1">
          <div class="flex justify-between">
            <a href="/" class="pl-3 text-2xl font-bold"> svelte-pixi </a>
            <GitHub />
          </div>
          <ul>
            {#each links as link}
              <Link {link} />
            {/each}
          </ul>
        </nav>
      </div>
    </div>

    <div class="flex-shrink-0 w-14">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
{/if}

<div class="lg:hidden fixed bottom-0 right-4 z-50 flex-shrink-0 h-16 flex">
  <button
    on:click={() => (isMenuOpen = !isMenuOpen)}
    class="unstyled bg-white text-gray-800 border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center shadow"
  >
    <span class="sr-only">{isMenuOpen ? 'Close' : 'Open'} sidebar</span>
    <Icon src={isMenuOpen ? X : Menu} class="h-[1.25rem] w-[1.25rem]" />
  </button>
  <div />
</div>
