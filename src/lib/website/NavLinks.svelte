<script>
  import { page } from '$app/stores'

  export let links
</script>

<ul>
  {#each links as link}
    {#if link.section}
      <li class="ml-2 mt-4">
        <div class="mb-2 font-semibold text-gray-600">
          {link.section}
        </div>
        <ul>
          {#each link.links as link}
            <li>
              <a
                href={link.href}
                class:active={$page.url.pathname === link.href}>{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </li>
    {:else}
      <li>
        <a href={link.href} class:active={$page.url.pathname === link.href}
          >{link.label}</a
        >
      </li>
    {/if}
  {/each}
</ul>

<style>
  a {
    @apply text-gray-600 rounded-md py-2 px-2 flex items-center text-sm font-medium;
  }
  a.active {
    @apply text-gray-900 bg-gray-200;
  }
</style>
