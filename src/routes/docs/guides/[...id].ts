import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = ({ request, params }) => {
  return {
    headers: {
      // redirect to /advanced
      Location: `/docs/advanced/${params.id}`,
    },
    status: 301,
  }
}
