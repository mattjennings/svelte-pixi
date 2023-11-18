// import App from './App.svelte'
// import * as PIXI from 'pixi.js'

// console.log(PIXI)
// const app = new App({
//   target: document.getElementById('app'),
// })

// export default app

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas')
const width = 800
const height = 600
canvas.style.width = `${width}px`
canvas.style.height = `${height}px`
// canvas.style.backgroundColor = '#000000'
const resolution = window.devicePixelRatio

const worker = new Worker(new URL('./worker/worker.js', import.meta.url), {
  type: 'module',
})

const view = canvas.transferControlToOffscreen()
worker.postMessage({ width, height, resolution, view }, [view])
