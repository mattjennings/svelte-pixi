// created by https://pixijs.io/customize/
export * from '@pixi/display'
export * from '@pixi/core'
export * from '@pixi/assets'
export * from '@pixi/events'
export * from '@pixi/extract'
export * from '@pixi/compressed-textures'
export * from '@pixi/basis'
export * from '@pixi/mesh'
export * from '@pixi/particle-container'
export * from '@pixi/sprite'
export * from '@pixi/accessibility'
export * from '@pixi/app'
export * from '@pixi/graphics'
export * from '@pixi/sprite-animated'
export * from '@pixi/sprite-tiling'
export * from '@pixi/spritesheet'
export * from '@pixi/text-bitmap'
export * from '@pixi/text'
export * from '@pixi/prepare'

// feel free to remove, it's just to show that this file is being used
if (import.meta.env.DEV) {
  console.log(
    '%cUsing custom pixi.js file!',
    'background: yellow; color: black; padding: 2px 5px; border-radius: 3px; font-weight: bold;',
  )
}
