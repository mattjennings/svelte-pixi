<script lang="ts">
  import * as PIXI from 'pixi.js'
  import { onMount, setContext } from 'svelte'
  import { addPixiInstance,  shouldApplyProps, toPoint } from './util'
  import type { PointLike } from './util'

  export let alpha: PIXI.Text['alpha'] = undefined
  export let anchor: PIXI.Text['anchor'] = undefined
  export let angle: PIXI.Text['angle'] = undefined
  export let blendMode: PIXI.Text['blendMode'] = undefined
  export let buttonMode: PIXI.Text['buttonMode'] = undefined
  export let cursor: PIXI.Text['cursor'] = undefined
  export let filterArea: PIXI.Text['filterArea'] = undefined
  export let filters: PIXI.Text['filters'] = undefined
  export let hitArea: PIXI.Text['hitArea'] = undefined
  export let interactive: PIXI.Text['interactive'] = undefined
  export let interactiveChildren: PIXI.Text['interactiveChildren'] = undefined
  export let height: PIXI.Text['height'] = undefined
  export let mask: PIXI.Text['mask'] = undefined
  export let name: PIXI.Text['name'] = undefined
  export let pivot: PIXI.Text['pivot'] = undefined
  export let position: PIXI.Text['position'] | PointLike = undefined
  export let roundPixels: PIXI.Text['roundPixels'] = undefined
  export let resolution: PIXI.Text['resolution'] = undefined
  export let shader: PIXI.Text['shader'] = undefined
  export let skew: PIXI.Text['skew'] = undefined
  export let texture: PIXI.Text['texture'] = undefined
  export let visible: PIXI.Text['visible'] = undefined
  export let width: PIXI.Text['width'] = undefined
  export let zIndex: PIXI.Text['zIndex'] = undefined

  // styles
  export let align: PIXI.Text['style']['align'] = 'left'
  export let breakWords: PIXI.Text['style']['breakWords'] = false
  export let dropShadow: PIXI.Text['style']['dropShadow'] = false
  export let dropShadowAlpha: PIXI.Text['style']['dropShadowAlpha'] = 1
  export let dropShadowAngle: PIXI.Text['style']['dropShadowAngle'] =
    Math.PI / 6
  export let dropShadowBlur: PIXI.Text['style']['dropShadowBlur'] = 0
  export let dropShadowColor: PIXI.Text['style']['alidropShadowColorgn'] =
    'black'
  export let dropShadowDistance: PIXI.Text['style']['dropShadowDistance'] = 5
  export let fill: PIXI.Text['style']['fill'] = 'black'
  export let fillGradientType: PIXI.Text['style']['fillGradientType'] =
    PIXI.TEXT_GRADIENT.LINEAR_VERTICAL
  export let fillGradientStops: PIXI.Text['style']['fillGradientStops'] = undefined
  export let fontFamily: PIXI.Text['style']['fontFamily'] = 'Arial'
  export let fontSize: PIXI.Text['style']['fontSize'] = 26
  export let fontStyle: PIXI.Text['style']['fontStyle'] = 'normal'
  export let fontVariant: PIXI.Text['style']['fontVariant'] = 'normal'
  export let fontWeight: PIXI.Text['style']['fontWeight'] = 'normal'
  export let leading: PIXI.Text['style']['leading'] = 0
  export let letterSpacing: PIXI.Text['style']['letterSpacing'] = 0
  export let lineHeight: PIXI.Text['style']['lineHeight'] = undefined
  export let lineJoin: PIXI.Text['style']['lineJoin'] = 'miter'
  export let miterLimit: PIXI.Text['style']['miterLimit'] = 10
  export let padding: PIXI.Text['style']['padding'] = 0
  export let stroke: PIXI.Text['style']['stroke'] = 'black'
  export let strokeThickness: PIXI.Text['style']['strokeThickness'] = 0
  export let trim: PIXI.Text['style']['trim'] = false
  export let textBaseline: PIXI.Text['style']['textBaseline'] = 'alphabetic'
  export let whiteSpace: PIXI.Text['style']['whiteSpace'] = 'pre'
  export let wordWrap: PIXI.Text['style']['wordWrap'] = false
  export let wordWrapWidth: PIXI.Text['style']['wordWrapWidth'] = 100

  export let text: PIXI.Text['text']
  export let instance = new PIXI.Text(text)

  const removeSelf = addPixiInstance(instance)
  onMount(() => removeSelf)
  
  setContext('pixi/object', instance)
  setContext('pixi/container', instance)

  $: shouldApplyProps(alpha) && (instance.alpha = alpha)
  $: shouldApplyProps(anchor) && (instance.anchor = anchor)
  $: shouldApplyProps(angle) && (instance.angle = angle)
  $: shouldApplyProps(blendMode) && (instance.blendMode = blendMode)
  $: shouldApplyProps(buttonMode) && (instance.buttonMode = buttonMode)
  $: shouldApplyProps(cursor) && (instance.cursor = cursor)
  $: shouldApplyProps(filterArea) && (instance.filterArea = filterArea)
  $: shouldApplyProps(filters) && (instance.filters = filters)
  $: shouldApplyProps(hitArea) && (instance.hitArea = hitArea)
  $: shouldApplyProps(interactive) && (instance.interactive = interactive)
  $: shouldApplyProps(interactiveChildren) &&
    (instance.interactiveChildren = interactiveChildren)
  $: shouldApplyProps(height) && (instance.height = height)
  $: shouldApplyProps(mask) && (instance.mask = mask)
  $: shouldApplyProps(name) && (instance.name = name)
  $: shouldApplyProps(pivot) && (instance.pivot = pivot)
  $: shouldApplyProps(position) && (instance.position = toPoint(position))
  $: shouldApplyProps(roundPixels) && (instance.roundPixels = roundPixels)
  $: shouldApplyProps(shader) && (instance.shader = shader)
  $: shouldApplyProps(skew) && (instance.skew = skew)
  $: shouldApplyProps(texture) && (instance.texture = texture)
  $: shouldApplyProps(visible) && (instance.visible = visible)
  $: shouldApplyProps(width) && (instance.width = width)
  $: shouldApplyProps(zIndex) && (instance.zIndex = zIndex)

  $: shouldApplyProps(align) && (instance.style.align = align)
  $: shouldApplyProps(breakWords) && (instance.style.breakWords = breakWords)
  $: shouldApplyProps(dropShadow) && (instance.style.dropShadow = dropShadow)
  $: shouldApplyProps(dropShadowAlpha) &&
    (instance.style.dropShadowAlpha = dropShadowAlpha)
  $: shouldApplyProps(dropShadowAngle) &&
    (instance.style.dropShadowAngle = dropShadowAngle)
  $: shouldApplyProps(dropShadowBlur) &&
    (instance.style.dropShadowBlur = dropShadowBlur)
  $: shouldApplyProps(dropShadowColor) &&
    (instance.style.dropShadowColor = dropShadowColor)
  $: shouldApplyProps(dropShadowColor) &&
    (instance.style.dropShadowColor = dropShadowColor)
  $: shouldApplyProps(dropShadowDistance) &&
    (instance.style.dropShadowDistance = dropShadowDistance)
  $: shouldApplyProps(fill) && (instance.style.fill = fill)
  $: shouldApplyProps(fillGradientType) &&
    (instance.style.fillGradientType = fillGradientType)
  $: shouldApplyProps(fillGradientStops) &&
    (instance.style.fillGradientStops = fillGradientStops)
  $: shouldApplyProps(fontFamily) && (instance.style.fontFamily = fontFamily)
  $: shouldApplyProps(fontSize) && (instance.style.fontSize = fontSize)
  $: shouldApplyProps(fontStyle) && (instance.style.fontStyle = fontStyle)
  $: shouldApplyProps(fontVariant) && (instance.style.fontVariant = fontVariant)
  $: shouldApplyProps(fontWeight) && (instance.style.fontWeight = fontWeight)
  $: shouldApplyProps(leading) && (instance.style.leading = leading)
  $: shouldApplyProps(letterSpacing) &&
    (instance.style.letterSpacing = letterSpacing)
  $: shouldApplyProps(lineHeight) && (instance.style.lineHeight = lineHeight)
  $: shouldApplyProps(lineJoin) && (instance.style.lineJoin = lineJoin)
  $: shouldApplyProps(miterLimit) && (instance.style.miterLimit = miterLimit)
  $: shouldApplyProps(padding) && (instance.style.padding = padding)
  $: shouldApplyProps(stroke) && (instance.style.stroke = stroke)
  $: shouldApplyProps(strokeThickness) &&
    (instance.style.strokeThickness = strokeThickness)
  $: shouldApplyProps(trim) && (instance.style.trim = trim)
  $: shouldApplyProps(textBaseline) &&
    (instance.style.textBaseline = textBaseline)
  $: shouldApplyProps(wordWrap) && (instance.style.wordWrap = wordWrap)
  $: shouldApplyProps(wordWrapWidth) &&
    (instance.style.wordWrapWidth = wordWrapWidth)

  $: shouldApplyProps(resolution) && (instance.resolution = resolution)
  $: shouldApplyProps(text) && (instance.text = text)
  $: shouldApplyProps(whiteSpace) && (instance.style.whiteSpace = whiteSpace)
</script>

<slot />
