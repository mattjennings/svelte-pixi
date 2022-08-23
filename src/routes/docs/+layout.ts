import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
  return {
    links: await fetch('/links.json').then((res) => res.json()),
  }
}
