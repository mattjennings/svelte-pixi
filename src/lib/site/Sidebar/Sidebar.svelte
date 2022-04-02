<script>
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { X, Menu } from '@steeze-ui/heroicons'
  import GitHub from '../GitHub.svelte'
  import Link from './Link.svelte'
  import { focusTrap } from 'svelte-focus-trap'

  let isMenuOpen = false
  $: $page.url.pathname, (isMenuOpen = false)

  let links = [
    {
      label: 'Intro',
      base: '/docs/intro',
      links: [
        {
          label: 'Getting Started',
          href: '/getting-started',
        },
      ],
    },
    {
      label: 'Components',
      base: '/docs/components',
      links: [
        {
          href: '/animated-sprite',
          label: 'AnimatedSprite',
        },
        {
          href: '/application',
          label: 'Application',
        },
        {
          href: '/bitmap-text',
          label: 'BitmapText',
        },
        {
          href: '/container',
          label: 'Container',
        },
        {
          href: '/graphics',
          label: 'Graphics',
        },
        {
          href: '/loader',
          label: 'Loader',
        },
        {
          href: '/renderer',
          label: 'Renderer',
        },
        {
          href: '/sprite',
          label: 'Sprite',
        },
        {
          href: '/ticker',
          label: 'Ticker',
        },
        {
          href: '/tiling-sprite',
          label: 'Tiling Sprite',
        },
        {
          href: '/text',
          label: 'Text',
        },
      ],
    },

    {
      label: 'Animation',
      base: '/docs/animation',
      links: [
        {
          href: '/svelte-motion',
          label: 'svelte/motion',
        },
      ],
    },
    {
      label: 'Guides',
      base: '/docs/guides',
      links: [
        {
          href: '/reducing-bundle-size',
          label: 'Reducing Bundle Size',
        },
        {
          href: '/custom-renderer',
          label: 'Custom Renderer',
        },
      ],
    },
  ]

  $: expandedLink = links.find((link) =>
    $page.url.pathname.startsWith(link.base)
  )
</script>

<!-- Static sidebar for desktop -->
<div class="hidden md:flex md:flex-shrink-0 h-screen sticky top-0">
  <div class="w-[12rem] flex flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="border-r border-gray-200  pb-4 flex flex-col flex-grow overflow-y-auto"
    >
      <div class="flex-grow mt-5 flex flex-col">
        <nav class="flex-1 bg-white px-2 space-y-1">
          <div class="flex justify-end">
            <GitHub />
          </div>
          <ul>
            {#each links as link}
              <Link
                {link}
                expanded={link === expandedLink}
                on:expand={() => (expandedLink = link)}
              />
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
    class="fixed inset-0 z-40 flex md:hidden"
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
          <div class="flex justify-end">
            <GitHub />
          </div>
          <ul>
            {#each links as link}
              <Link
                {link}
                expanded={link === expandedLink}
                on:expand={() => (expandedLink = link)}
              />
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

<div class="md:hidden fixed bottom-0 right-4 z-50 flex-shrink-0 h-16 flex">
  <button
    on:click={() => (isMenuOpen = !isMenuOpen)}
    class="unstyled bg-white text-gray-800 border border-gray-300 rounded-full h-10 w-10 flex items-center justify-center shadow"
  >
    <span class="sr-only">{isMenuOpen ? 'Close' : 'Open'} sidebar</span>
    <Icon src={isMenuOpen ? X : Menu} class="h-[1.25rem] w-[1.25rem]" />
  </button>
  <div />
</div>
