<script context="module" lang="ts">
  import ComponentDocs from '$lib/site/ComponentDocs.svelte'
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ url }) => {
    const component = humanize(url.pathname.split('/').pop())

    const docs = await import(
      `../../../lib/${component}.svelte?raw&sveld`
    ).then((res) => res.default)

    return {
      props: {
        docs,
      },
    }
  }

  function humanize(str) {
    var i,
      frags = str.split(/-|_/)
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
    }
    return frags.join('')
  }
</script>

<script>
  export let docs
</script>

<slot />
<ComponentDocs {docs} />
