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

  export let links
</script>

<title>svelte-pixi</title>
<div class="bg-white flex max-w-[1600px] mx-auto">
  <Sidebar {links} />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0 ">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <slot />
    </div>
  </main>
</div>
