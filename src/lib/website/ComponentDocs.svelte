<script lang="ts">
  import Prism from 'prismjs'
  import 'prism-svelte'

  export let docs
  export let pixiDocs:
    | { name: string; isLinkableProp: (prop: string) => boolean }
    | undefined

  let pixiDocsUrl =
    pixiDocs && `https://pixijs.download/release/docs/${pixiDocs.name}.html`

  function formatCodeType(type) {
    if (type === undefined) return ''
    return type
      .replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]))
      .replace(/\|/g, '&#124;')
  }

  function formatCodeValue(value) {
    if (!value) {
      return ''
    }
    return value
      .replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]))
      .replace(/`/g, '\\`')
      .replace(/\|/g, '&#124;')
  }

  function formatDescription(description) {
    if (description === undefined || description.trim().length === 0) return ''
    return escapeHtml(description).replace(/\n/g, '<br />')
  }

  function escapeHtml(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  function formatSlotProps(props) {
    if (props === undefined || props === '{}') return ''
    return formatCodeType(formatTsProps(props).replace(/\n/g, ' '))
  }

  function formatSlotFallback(fallback) {
    if (fallback === undefined) return ''
    return formatCodeType(escapeHtml(fallback).replace(/\n/g, '<br />'))
  }

  function formatEventDetail(detail) {
    if (detail === undefined) return ''
    return formatCodeType(
      detail
        .replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]))
        .replace(/\n/g, ' ')
    )
  }

  function getTypeDefs(def) {
    if (def.typedefs.length === 0) return ''
    return def.typedefs.map((typedef) => typedef.ts).join('\n\n')
  }

  function formatTsProps(props) {
    if (props === undefined) return ''
    return props + '\n'
  }

  function isLinkableProp(name: string) {
    let isLinkable = true

    if (name === 'instance') {
      isLinkable = false
    }

    if (pixiDocs.isLinkableProp) {
      isLinkable = pixiDocs.isLinkableProp(name)
    }

    return isLinkable
  }

  // filter out context methods
  $: props = docs.props?.filter((prop) => !prop.name.startsWith('get'))
</script>

{#if docs.typedefs.length}
  <h2>Types</h2>
  <div class="text-sm md:text-base">
    <pre class="!my-0 !rounded-none">
    {@html Prism.highlight(
        getTypeDefs(docs),
        Prism.languages.svelte,
        'typescript'
      )}
  </pre>
  </div>
{/if}

{#if props.length}
  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props as prop}
        <tr>
          <td>
            {#if pixiDocsUrl && isLinkableProp(prop.name)}
              <a href={`${pixiDocsUrl}#${prop.name}`} rel="external">
                {prop.name}
              </a>
            {:else}
              {prop.name}
            {/if}
          </td>
          <td>
            {#if prop.type}
              <code>{formatCodeType(prop.type)}</code>
            {/if}
          </td>
          <td>
            {#if prop.value && prop.kind !== 'function'}
              <code>{formatCodeValue(prop.value)}</code>
            {/if}
          </td>
          <td>{@html formatDescription(prop.description)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

{#if docs.slots.length}
  <h2>Slots</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Props</th>
        <th>Fallback</th>
      </tr>
    </thead>
    <tbody>
      {#each docs.slots as slot}
        <tr>
          <td>{slot.name === '__default__' ? 'default' : slot.name}</td>
          <td>
            {#if slot.props}
              <code>{formatSlotProps(slot.props)}</code>
            {/if}
          </td>
          <td>
            {#if slot.fallback}
              <code>{formatSlotFallback(slot.fallback)}</code>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

{#if docs.events.length}
  <h2>Events</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Detail</th>
      </tr>
    </thead>
    <tbody>
      {#each docs.events as event}
        <tr>
          <td>{event.name}</td>
          <td>
            {#if event.type}
              <code>{formatCodeValue(event.type)}</code>
            {/if}
          </td>
          <td>
            {#if event.detail}
              <code>{formatEventDetail(event.detail)}</code>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
