<script lang="ts">
  import Prism from 'prismjs'
  import 'prism-svelte'

  export let docs

  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
    var to = 'aaaaeeeeiiiioooouuuunc------'
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes

    return str
  }

  function formatCodeType(type) {
    if (type === undefined) return ''
    return type.replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]))
    // .replace(/\|/g, '&#124;')
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
    return text //.replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

  // filter out context methods
  $: props = docs.props?.filter((prop) => !prop.name.startsWith('get'))
</script>

<h2>Component API</h2>

{#if docs.typedefs.length}
  <h3>Types</h3>
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
  <h3 id="props">
    <a href="#props">Props</a>
  </h3>
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
            {prop.name}
          </td>
          <td class="flex gap-1 flex-wrap">
            {#if prop.type}
              {#each prop.type.split(/\s?\|\s?/g) as type}
                <code>
                  {formatCodeType(type)}
                </code>
              {/each}
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
  {#if docs.rest_props}
    <p>
      Additional props are passed on to <a
        href={`/docs/components/${slugify(docs.rest_props.name)}`}
        >{docs.rest_props.name}</a
      >
    </p>
  {/if}
{/if}

{#if docs.slots.length}
  <h3 id="slots">
    <a href="#slots">Slots</a>
  </h3>
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
  <h3 id="events">
    <a href="#events">Events</a>
  </h3>
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
