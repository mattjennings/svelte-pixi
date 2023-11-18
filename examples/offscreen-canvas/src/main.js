/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas')
const width = 800
const height = 600
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
const resolution = window.devicePixelRatio

const worker = new Worker(
  new URL('./worker/worker-svelte-pixi.js', import.meta.url),
  {
    type: 'module',
  },
)

const view = canvas.transferControlToOffscreen()
worker.postMessage({ width, height, resolution, view }, [view])
