<script context="module">
  let uid = 1
</script>

<script>
  import ExampleLayout from '@svelte-docs/get/ExampleLayout'
  import basepath from '@svelte-docs/get/basepath'

  export let name
  export let code
  export let height = false

  const fixedheight = Number.isInteger(height)

  let iframe
  let iframe_id = uid++
  let iframe_height = fixedheight ? height : 70

  const srcdoc =
    `<!doctype html>
<html style="height: auto !important">
    <head>
        <meta charset='utf-8'>
        <base href='${basepath}' />
        <link rel='stylesheet' href='examples.css'>
        <scr` +
    `ipt defer src='examples.js'></scr` +
    `ipt>
    </head>
    <body style="height: auto !important"></body>
</html>`

  const sendMessage = function () {
    iframe.contentWindow.postMessage({ COMPONENT: name, iframe_id }, '*')
  }

  window.addEventListener('message', function (event) {
    if (event.data.iframe_id && event.data.iframe_id === iframe_id) {
      if (!fixedheight && event.data.hasOwnProperty('HEIGHT')) {
        iframe_height = event.data.HEIGHT
      }
    }
  })
</script>

<style>
  pre {
    margin: 0px;
  }

  iframe {
    width: 100%;
    display: block;
    border: none;
  }
</style>

<ExampleLayout>
  <iframe
    slot="result"
    on:load={sendMessage}
    style="height:{iframe_height}px"
    title="Result"
    scrolling="no"
    bind:this={iframe}
    sandbox="allow-same-origin allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-scripts"
    {srcdoc} />
  <pre slot="code" class="hljs"><code>{@html code.trim()}</code></pre>
</ExampleLayout>
