# svelte 5 notes

## breaking changes

- all events are now callback props. `on:pointermove` is now `onpointermove={e => ...}`

  - as such, the events are forwarded straight from PIXI, so `event.detail` no longer contains the event data. Instead use `event.data`.

- slot props for components are now snippets
