<script>
  import Code from './Code.svelte'

  export let src
  export let meta

  $: src, meta

  let browser = typeof window !== 'undefined'
</script>

wrapper
