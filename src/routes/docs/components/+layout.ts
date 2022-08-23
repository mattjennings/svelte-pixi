import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ url, fetch }) => {
  const component = humanize(url.pathname.split('/').pop())

  const docs = await fetch(`/sveld/${component}.json`).then((res) => res.json())

  return {
    docs,
  }
}

function humanize(str) {
  let i
  const frags = str.split(/-|_/)
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
  }
  return frags.join('')
}
