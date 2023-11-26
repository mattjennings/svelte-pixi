# svelte 5 notes

The biggest blocker right now is a bug that causes children component to remount when props change https://github.com/sveltejs/svelte/issues/9652. Workaround is to wrap childern in `{#key}` blocks.

- breaking changes
