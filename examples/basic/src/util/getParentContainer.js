import { getContext } from 'svelte'

export default function getParentContainer() {
  return getContext('container') || getContext('stage')
}
