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

export function onStageEvent<T extends PIXI.Container>(
  event: keyof PIXI.ContainerEvents<T>,
  handler: (...args: PIXI.ContainerEvents<T>[typeof event]) => void,
) {
  const { stage } = getStage()
  stage.on(event, handler)
  return () => stage.off(event, handler)
}

export function onContainerEvent<T extends PIXI.Container>(
  event: keyof PIXI.ContainerEvents<T>,
  handler: (...args: PIXI.ContainerEvents<T>[typeof event]) => void,
) {
  const { container } = getContainer()
  container.on(event, handler)
  return () => container.off(event, handler)
}
