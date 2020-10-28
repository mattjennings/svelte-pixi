<script>
  /* (!) Restart bandler if this file was edited
   *
   *   Properties data structure:
   *   data = [
   *       {
   *           name <string>,
   *           description <string>,
   *           attr[
   *               default<string>,
   *               types: <string> | [ <string> ]
   *           ]
   *       },
   *       ...
   *   ]
   */
  export let data
  export let pixiUrl

  const pixiLinkRegExp = /@pixiLink/
  $: parsedData = data
    .map((prop) => {
      const linkToPixi =
        pixiUrl && (!prop.description || prop.description.match(pixiLinkRegExp))
      const description =
        prop.description && prop.description.replace(pixiLinkRegExp, '')

      return {
        ...prop,
        required: !prop.attr.default,
        description,
        linkToPixi,
      }
    })
    .sort((aProp, bProp) => {
      // sort required first
      if (aProp.required && !bProp.required) {
        return -1
      }

      if (bProp.required && !aProp.required) {
        return 1
      }

      // then sort alphabetically
      return aProp.name < bProp.name ? -1 : 1
    })

  function getTypes(types) {
    if (!types) return ''

    const typeValue = (type) => {
      if (!type) return ''
      if (typeof type === 'string') return type

      return type.map((v) => `<i>${v}</i>`).join(',')
    }

    return types.map((type) => `<dfn>${typeValue(type)}</dfn>`).join('')
  }
</script>

<dl class="properties">
  {#each parsedData as prop}
    {#if !prop.linkToPixi}
      <dt class:required={prop.required}>{prop.name}</dt>
    {:else}
      <dt class:required={prop.required}>
        <a
          href={`https://pixijs.download/release/docs/${pixiUrl}#${prop.name}`}>
          {prop.name}
        </a>
      </dt>
    {/if}
    <dd>
      {@html getTypes(prop.attr.types)}
    </dd>
    <dd>{prop.attr.default ? prop.attr.default : ''}</dd>
    <dd>
      {@html prop.description ? prop.description : ''}
    </dd>
  {/each}
</dl>
