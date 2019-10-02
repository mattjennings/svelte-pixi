import App from './App.svelte'

console.log(setContext === window.baseSetContext)

const app = new App({
  target: document.body
})

export default app

import { setContext } from 'svelte'
