import * as PIXI from 'pixi.js'
import { getContext, setContext } from 'svelte'

export interface ContainerContext<T extends PIXI.Container = PIXI.Container> {
  container: T
}
export interface StageContext<T extends PIXI.Container = PIXI.Container> {
  stage: T
}

export function getContainer<T extends PIXI.Container = PIXI.Container>() {
  return getContext<ContainerContext<T>>('pixi/container')
}

export function getStage<T extends PIXI.Container = PIXI.Container>() {
  return getContext<StageContext<T>>('pixi/stage')
}

export function setContainer<T extends PIXI.Container = PIXI.Container>(
  container: T,
) {
  return setContext('pixi/container', { container })
}

export function setStage<T extends PIXI.Container = PIXI.Container>(stage: T) {
  return setContext('pixi/stage', { stage })
}
