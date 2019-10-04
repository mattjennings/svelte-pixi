import { getContext } from 'svelte'

export default function getParentContainer() {
  return getContext('pixi-container') || getContext('pixi-stage')
}
