<script lang="ts">
  import { browser } from '$app/env'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  let scrollY = 0
  let headings = []
  let activeHeading

  function updateHeadings() {
    if (browser) {
      headings = Array.from(
        document.querySelectorAll('article h2, article h3, article h4')
      )
    }
  }
  afterNavigate(() => {
    updateHeadings()
  })
  $: $page, updateHeadings()

  $: if (headings) {
    activeHeading = [...headings]
      .reverse()
      .find((heading) => heading.offsetTop <= scrollY)
  }

  function handleClick(event, heading: HTMLElement) {
    if (heading.id) history.pushState({}, '', `#${heading.id}`)
    window.scrollTo({
      top: heading.offsetTop + 1,
      behavior: 'smooth',
    })
  }
</script>

<svelte:window bind:scrollY />
<aside class="hidden lg:block sticky h-screen top-12 pt-4 pr-2 w-[13rem]">
  {#if headings.length}
    <h6 id="__sections" class="uppercase text-slate-800 font-bold text-xs">
      On This Page
    </h6>

    <ul class="mt-3 space-y-3">
      {#each headings as heading}
        <li
          class="list-none !pl-0 text-sm text-slate-400 hover:text-slate-900 transition-colors"
          class:active={activeHeading === heading}
          style={`--depth: ${+heading.tagName[1] - 2}`}
        >
          <a
            class="!no-underline"
            href={`#${heading.id}`}
            on:click|preventDefault={(ev) => handleClick(ev, heading)}
            >{heading.innerText}</a
          >
        </li>
      {/each}
    </ul>
  {/if}
</aside>

<style lang="postcss">
  .heading {
    margin-left: calc(var(--depth, 0) * 0.75rem);
  }

  .active {
    @apply text-slate-900;
  }
</style>
