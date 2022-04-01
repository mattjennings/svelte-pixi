import type { IApplicationPlugin } from '@pixi/app'
import { Application } from '@pixi/app'
import type { IRendererPluginConstructor } from '@pixi/core'
import { Renderer } from '@pixi/core'
import { type ILoaderPlugin, Loader } from 'pixi.js'

export function registerApplicationPlugin(plugin: IApplicationPlugin) {
  const registered = (Application as any)._plugins
  if (!registered.includes(plugin)) {
    Application.registerPlugin(plugin)
  }
}

export function registerRendererPlugin(
  name: string,
  plugin: IRendererPluginConstructor
) {
  const registered = (Renderer as any).__plugins ?? {}
  if (!registered[name]) {
    Renderer.registerPlugin(name, plugin)
  }
}

export function registerLoaderPlugin(plugin: ILoaderPlugin) {
  const registered = (Loader as any)._plugins
  if (!registered.includes(plugin)) {
    Loader.registerPlugin(plugin)
  }
}
