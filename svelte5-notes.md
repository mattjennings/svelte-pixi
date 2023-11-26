# svelte 5 notes

The biggest blocker right now is a bug that causes children component to remount when props change https://github.com/sveltejs/svelte/issues/9652. Workaround is to wrap childern in `{#key}` blocks.

## breaking changes

- all events are now callback props. `on:pointermove` is now `onpointermove={e => ...}`

  - as such, the events are forwarded straight from PIXI, so `event.detail` no longer contains the event data. Instead use `event.data`.

- slot props for components are now snippets
