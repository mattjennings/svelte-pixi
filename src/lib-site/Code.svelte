<script>
  import Prism from 'prismjs'
  import 'prism-svelte'

  export let src = undefined
  export let lang = 'svelte'
  let className = 'rounded'

  export { className as class }

  let highlighted = src && Prism.highlight(src, Prism.languages[lang])

  const preClass = `!my-0 !rounded-tl-none !rounded-tr-none language-${lang}`
</script>

<div class={[`max-h-[600px] overflow-scroll`, className].join(' ')}>
  {#if highlighted}
    <pre class={preClass}>{@html highlighted}</pre>
  {:else}
    <pre class={preClass}><slot />
  </pre>
  {/if}
</div>
