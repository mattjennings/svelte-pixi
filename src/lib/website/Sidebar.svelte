<script>
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { X, Menu } from '@steeze-ui/heroicons'
  import GitHub from './GitHub.svelte'
  import NavLinks from './NavLinks.svelte'

  let isMenuOpen = false
  $: $page.url.pathname, (isMenuOpen = false)

  let links = [
    {
      href: '/',
      label: 'Intro',
    },
    // {
    //   section: 'Guides',
    //   links: [
    //   ],
    // },
    {
      section: 'API',
      links: [
        {
          href: '/api/components/animated-sprite',
          label: 'AnimatedSprite',
        },
        {
          href: '/api/components/container',
          label: 'Container',
        },
        {
          href: '/api/components/graphics',
          label: 'Graphics',
        },
        {
          href: '/api/components/loader',
          label: 'Loader',
        },
        {
          href: '/api/components/pixi',
          label: 'Pixi',
        },
        {
          href: '/api/components/sprite',
          label: 'Sprite',
        },
        {
          href: '/api/components/tiling-sprite',
          label: 'Tiling Sprite',
        },
        {
          href: '/api/components/text',
          label: 'Text',
        },
      ],
    },
  ]
</script>

{#if isMenuOpen}
  <div
    class="fixed inset-0 z-40 flex md:hidden"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
      transition:fade
      on:click={() => (isMenuOpen = false)}
    />

    <div
      class="relative max-w-xs w-full bg-white pb-4 flex-1 flex flex-col"
      transition:fly={{
        x: -200,
        y: 0,
      }}
    >
      <div class="absolute top-0 right-0 -mr-12 pt-2" transition:fade>
        <button
          on:click={() => (isMenuOpen = false)}
          class="unstyled ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span class="sr-only">Close sidebar</span>
          <Icon src={X} class="h-6 w-6 text-white" />
        </button>
      </div>

      <div class="mt-5 flex-1 h-0 overflow-y-auto">
        <nav class="px-2 space-y-1">
          <div class="flex justify-end">
            <GitHub />
          </div>
          <NavLinks {links} />
        </nav>
      </div>
    </div>

    <div class="flex-shrink-0 w-14">
      <!-- Dummy element to force sidebar to shrink to fit close icon -->
    </div>
  </div>
{/if}

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:flex-shrink-0 h-screen sticky top-0">
  <div class="w-64 flex flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="border-r border-gray-200  pb-4 flex flex-col flex-grow overflow-y-auto"
    >
      <div class="flex-grow mt-5 flex flex-col">
        <nav class="flex-1 bg-white px-2 space-y-1">
          <div class="flex justify-end">
            <GitHub />
          </div>
          <NavLinks {links} />
        </nav>
      </div>
    </div>
  </div>
</div>

{#if !isMenuOpen}
  <div class="md:hidden fixed bottom-0 right-4 z-10 flex-shrink-0 h-16 flex">
    <button
      on:click={() => (isMenuOpen = true)}
      class="unstyled bg-white text-gray-800 border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center shadow"
    >
      <span class="sr-only">Open sidebar</span>
      <Icon src={Menu} class="h-[1.25rem] w-[1.25rem]" />
    </button>
    <div />
  </div>
{/if}
