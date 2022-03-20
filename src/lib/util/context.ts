import { getContext } from 'svelte'
import type { Application } from '@pixi/app'
import type { Container } from '@pixi/display'

export function getPixiApp(): Application {
  return getContext('pixi/app')
}

export function getPixiContainer(): Container {
  return getContext('pixi/container') || getPixiStage()
}

export function getPixiStage(): Container {
  return getContext('pixi/stage')
}
