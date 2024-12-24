import * as PIXI from 'pixi.js'
import { getContext, setContext } from 'svelte'

interface ApplicationContext<T extends PIXI.Application> {
  app: T
}

export function getApp<T extends PIXI.Application>() {
  return getContext<ApplicationContext<T>>('pixi/app') ?? {}
}

export function setApp<T extends PIXI.Application>(app: T) {
  return setContext<ApplicationContext<T>>('pixi/app', { app })
}
