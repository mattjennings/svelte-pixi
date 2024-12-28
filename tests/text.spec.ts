import { describe, expect, test } from 'vitest'
import { Text } from '../src/lib/svelte-5'
import { renderApp } from '../test-utils/pixi.svelte'
import * as PIXI from 'pixi.js'

test('renders', async () => {
  const { app, instance } = await renderApp(Text, {})
  expect(app.stage.children.includes(instance)).toBe(true)
  expect(app.stage.children.length).toBe(1)
})

describe('props', () => {
  describe('anchor', () => {
    test('tuple', async () => {
      const { instance, rerender } = await renderApp(Text, {
        anchor: [0.5, 0.5],
      })
      expect(instance.anchor.x).toBe(0.5)
      expect(instance.anchor.y).toBe(0.5)
      await rerender({ anchor: [0, 0] })
      expect(instance.anchor.x).toBe(0)
      expect(instance.anchor.y).toBe(0)
    })

    test('number', async () => {
      const { instance, rerender } = await renderApp(Text, {
        anchor: 0.5,
      })
      expect(instance.anchor.x).toBe(0.5)
      expect(instance.anchor.y).toBe(0.5)
      await rerender({ anchor: 0 })
      expect(instance.anchor.x).toBe(0)
      expect(instance.anchor.y).toBe(0)
    })

    test('PIXI.Point', async () => {
      const { instance, rerender } = await renderApp(Text, {
        anchor: new PIXI.Point(0.5, 0.5),
      })
      expect(instance.anchor.x).toBe(0.5)
      expect(instance.anchor.y).toBe(0.5)
      await rerender({ anchor: new PIXI.Point(0, 0) })
      expect(instance.anchor.x).toBe(0)
      expect(instance.anchor.y).toBe(0)
    })
  })

  test('blendMode', async () => {
    const { instance, rerender } = await renderApp(Text, {
      blendMode: 'color',
    })
    expect(instance.blendMode).toBe('color')
    await rerender({ blendMode: 'multiply' })
    expect(instance.blendMode).toBe('multiply')
  })

  test('text', async () => {
    const { instance, rerender } = await renderApp(Text, {
      text: 'abc',
    })
    expect(instance.text).toBe('abc')
    await rerender({ text: 'def' })
    expect(instance.text).toBe('def')
  })

  test('style', async () => {
    const { instance, rerender } = await renderApp(Text, {
      text: 'abc',
      style: {
        fill: 'white',
        fontSize: 20,
      },
    })
    expect(instance.style.fill).toBe('white')
    expect(instance.style.fontSize).toBe(20)
    await rerender({ style: { fill: 'black' } })
    expect(instance.style.fill).toBe('black')
    expect(instance.style.fontSize).toBe(20)
  })
})
