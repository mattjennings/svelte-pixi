import { Application, Assets, Sprite } from 'pixi.js'
import bunnyUrl from './bunny.png'

// Represents a bunny sprite another
class Bunny extends Sprite {
  speed = 0
}

// Handle external post messages from main thread
self.onmessage = async ({ data: options }) => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render
  const app = new Application({ ...options, hello: true })

  // load the texture we need
  const texture = await Assets.load(bunnyUrl)

  // Create a collection of bunnies
  const bunnies = new Array(1000).fill(null).map(() => {
    const bunny = new Bunny(texture)
    bunny.speed = Math.random() * 0.1 - 0.05
    bunny.anchor.set(0.5)
    bunny.rotation = Math.random() * Math.PI * 2
    bunny.position.set(
      Math.random() * app.screen.width,
      Math.random() * app.screen.height,
    )
    return bunny
  })
  app.stage.addChild(...bunnies)

  // // Listen for frame updates
  app.ticker.add(() => {
    bunnies.forEach((bunny) => {
      bunny.rotation += bunny.speed
    })
  })
}
