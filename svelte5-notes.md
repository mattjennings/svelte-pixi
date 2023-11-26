# svelte 5 notes

- remount bugs

there's been a few scenarios where components seem to remount on prop changes. I was able to repro one here https://github.com/sveltejs/svelte/issues/9652 but there's another one that seems to be caused by exporting the `instance` prop:

This caused remounts:

```svelte
<script>
  const { instance: _instance } = $props()

  export const instance = _instance ?? new PIXI.Whatever()
</script>
```

This doesn't:

```svelte
<script>
  const { instance = new PIXI.Whatever() } = $props()

  export const instance = _instance
</script>
```

I have not been able to repro this outside of svelte-pixi yet.
