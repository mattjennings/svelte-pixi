<script lang="ts">
  import ComponentDocs from '$lib/site/ComponentDocs.svelte'

  export let data: import('./$types').LayoutData
</script>

<slot />
<ComponentDocs docs={data.docs} />
