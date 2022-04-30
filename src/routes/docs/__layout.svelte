<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    return {
      props: {
        links: await fetch('/links.json').then((res) => res.json()),
      },
    }
  }
</script>

<script>
  import Sidebar from '$lib/site/Sidebar/Sidebar.svelte'
  import ToC from '$lib/site/ToC.svelte'
  import { page } from '$app/stores'

  export let links

  $: currentLinkCategory = links.find((link) =>
    $page.url.pathname.startsWith(link.base)
  )

  $: currentLinkIndex = currentLinkCategory?.links.findIndex(
    (link) => link.href === $page.url.pathname
  )

  $: nextLink = currentLinkCategory?.links[currentLinkIndex + 1]
  $: prevLink = currentLinkCategory?.links[currentLinkIndex - 1]
</script>

<div class="bg-white flex max-w-[1600px] mx-auto">
  <Sidebar {links} />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <article class="py-6 pb-24 px-4 sm:px-6 prose prose-slate max-w-5xl">
        <slot />
        {#if prevLink || nextLink}
          <div class="not-prose mt-12">
            <hr />
            <div class="flex justify-between">
              {#if prevLink}
                <a class="prev" href={prevLink.href}>
                  <span class="label">Previous</span>
                  {prevLink.title}
                </a>
              {/if}
              <div />
              {#if nextLink}
                <a class="next" href={nextLink.href}>
                  <span class="label">Next</span>
                  {nextLink.title}
                </a>
              {/if}
            </div>
          </div>
        {/if}
      </article>
    </div>
  </main>
  <ToC />
</div>

<style lang="postcss">
  a.next,
  a.prev {
    @apply inline-flex flex-col gap-2 font-medium rounded-md;
  }

  a .label {
    @apply uppercase text-[0.75em] font-bold opacity-50;
  }

  a.next {
    @apply items-end;
  }

  hr {
    @apply mb-12;
  }
</style>
