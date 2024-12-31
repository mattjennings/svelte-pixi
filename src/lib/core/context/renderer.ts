import * as PIXI from 'pixi.js'
import { getContext, setContext } from 'svelte'

export interface RendererContextValue<T extends PIXI.Renderer> {
  renderer: T
  invalidate: () => void
}

export function getRenderer<
  T extends PIXI.Renderer,
>(): RendererContextValue<T> {
  return getContext('pixi/renderer')
}

export function setRenderer<T extends PIXI.Renderer>(
  value: T,
  callbacks: {
    onInvalidate: () => void
  },
) {
  return setContext('pixi/renderer', {
    renderer: value,
    invalidate: callbacks.onInvalidate,
  })
}
