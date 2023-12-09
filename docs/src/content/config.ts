import { defineCollection } from 'astro:content'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ schema: i18nSchema() }),
}
