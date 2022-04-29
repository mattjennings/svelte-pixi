<script lang="ts">
  import { browser } from '$app/env'
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'

  let scrollY = 0
  let headings: HTMLHeadingElement[] = []
  let activeHeading

  function updateHeadings() {
    if (browser) {
      headings = Array.from(
        document.querySelectorAll(
          'article h1, article h2, article h3, article h4'
        )
      )
    }
  }

  afterNavigate(() => {
    updateHeadings()
  })

  $: $page, updateHeadings()

  $: if (headings) {
    activeHeading = [...headings].reverse().find((heading) => {
      return heading.offsetTop - 24 <= scrollY
    })
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
<aside
  class="hidden lg:block sticky h-screen top-12 right-4 px-2 pt-4 w-[13rem]"
>
  {#if headings.length}
    <h6 id="__sections" class="uppercase text-slate-800 font-bold text-xs">
      On This Page
    </h6>

    <ul class="mt-3 space-y-3">
      {#each headings as heading}
        {@const depth = +heading.tagName[1] - 1}
        <li
          class="heading list-none !pl-0 text-sm text-slate-400 hover:text-slate-900 transition-colors"
          class:active={activeHeading === heading}
          style={`--depth: ${depth}`}
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
    margin-left: calc(var(--depth, 0) * 0.5rem);
  }

  .active {
    @apply text-slate-900;
  }
</style>
