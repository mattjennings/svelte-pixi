import { describe, expect, test, vitest } from 'vitest'
import { Container } from '../src/lib/svelte-5'
import { renderContainer } from '../test-utils/pixi.svelte'
import * as PIXI from 'pixi.js'

test('adds to stage', async () => {
  const { app, instance } = await renderContainer(Container, {})
  expect(app.stage.children.includes(instance)).toBe(true)
  expect(app.stage.children.length).toBe(1)
})

/*
    accessible,
    accessibleChildren,
    accessibleHint,
    accessiblePointerEvents,
    accessibleTitle,
    accessibleType,
    alpha,
    angle,
    boundsArea,
    cacheAsBitmap,
    cacheAsTexture,
    cursor,
    cullableChildren,
    cullable,
    cullArea,
    effects,
    eventMode,
    filterArea,
    hitArea,
    filters,
    height,
    interactive,
    interactiveChildren,
    isRenderGroup,
    mask,
    label,
    name,
    pivot,
    position,
    renderable,
    rotation,
    scale,
    skew,
    sortableChildren,
    tabIndex,
    visible,
    x,
    y,
    width,
    zIndex,
  */
describe('props', () => {
  test('accessible', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessible: true,
    })
    expect(instance.accessible).toBe(true)

    await rerender({ accessible: false })
    expect(instance.accessible).toBe(false)
  })

  test('accessibleChildren', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessibleChildren: true,
    })
    expect(instance.accessibleChildren).toBe(true)

    await rerender({ accessibleChildren: false })
    expect(instance.accessibleChildren).toBe(false)
  })

  test('accessibleHint', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessibleHint: 'hint',
    })
    expect(instance.accessibleHint).toBe('hint')

    await rerender({ accessibleHint: 'hint2' })
    expect(instance.accessibleHint).toBe('hint2')
  })

  test('accessiblePointerEvents', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessiblePointerEvents: 'none',
    })
    expect(instance.accessiblePointerEvents).toBe('none')

    await rerender({ accessiblePointerEvents: 'auto' })
    expect(instance.accessiblePointerEvents).toBe('auto')
  })

  test('accessibleTitle', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessibleTitle: 'title',
    })
    expect(instance.accessibleTitle).toBe('title')

    await rerender({ accessibleTitle: 'title2' })
    expect(instance.accessibleTitle).toBe('title2')
  })

  test('accessibleType', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      accessibleType: 'type',
    })
    expect(instance.accessibleType).toBe('type')

    await rerender({ accessibleType: 'type2' })
    expect(instance.accessibleType).toBe('type2')
  })

  test('alpha', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      alpha: 0.5,
    })
    expect(instance.alpha).toBe(0.5)

    await rerender({ alpha: 0.6 })
    expect(instance.alpha).toBe(0.6)
  })

  test('angle', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      angle: 0.5,
    })
    expect(instance.angle).toBe(0.5)

    await rerender({ angle: 0.6 })
    expect(instance.angle).toBe(0.6)
  })

  test('boundsArea', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      boundsArea: new PIXI.Rectangle(0, 0, 100, 100),
    })
    expect(instance.boundsArea).toBeInstanceOf(PIXI.Rectangle)

    await rerender({ boundsArea: new PIXI.Rectangle(0, 0, 200, 200) })
    expect(instance.boundsArea).toBeInstanceOf(PIXI.Rectangle)
  })

  test('cacheAsBitmap', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      cacheAsBitmap: true,
    })
    expect(instance.cacheAsBitmap).toBe(true)

    await rerender({ cacheAsBitmap: false })
    expect(instance.cacheAsBitmap).toBe(false)
  })

  test.only('cacheAsTexture', async () => {
    let spy!: ReturnType<typeof vitest.spyOn>
    const { instance, rerender } = await renderContainer(Container, {
      oncreate: (i) => {
        spy = vitest.spyOn(i, 'cacheAsTexture')
      },
      cacheAsTexture: true,
    })

    expect(spy).toHaveBeenCalledWith(true)

    await rerender({
      cacheAsTexture: {
        antialias: true,
        resolution: 2,
      },
    })
    expect(spy).toHaveBeenCalledWith({
      antialias: true,
      resolution: 2,
    })
  })

  test('cursor', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      cursor: 'pointer',
    })
    expect(instance.cursor).toBe('pointer')

    await rerender({ cursor: 'default' })
    expect(instance.cursor).toBe('default')
  })

  test('cullableChildren', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      cullableChildren: true,
    })
    expect(instance.cullableChildren).toBe(true)

    await rerender({ cullableChildren: false })
    expect(instance.cullableChildren).toBe(false)
  })

  test('cullable', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      cullable: true,
    })
    expect(instance.cullable).toBe(true)

    await rerender({ cullable: false })
    expect(instance.cullable).toBe(false)
  })

  test('cullArea', async () => {
    let rect = new PIXI.Rectangle(0, 0, 100, 100)
    const { instance, rerender } = await renderContainer(Container, {
      cullArea: rect,
    })
    expect(instance.cullArea).toEqual(rect)

    rect = new PIXI.Rectangle(0, 0, 200, 200)
    await rerender({ cullArea: rect })
    expect(instance.cullArea).toEqual(rect)
  })

  test('effects', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      effects: [],
    })
    expect(instance.effects).toEqual([])

    const effects = [new PIXI.FilterEffect()]
    await rerender({ effects })
    expect(instance.effects).toEqual(effects)
  })

  test('eventMode', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      eventMode: 'dynamic',
    })
    expect(instance.eventMode).toBe('dynamic')

    await rerender({ eventMode: 'static' })
    expect(instance.eventMode).toBe('static')
  })

  test('filterArea', async () => {
    let rect = new PIXI.Rectangle(0, 0, 100, 100)
    const { instance, rerender } = await renderContainer(Container, {
      filterArea: rect,
    })
    expect(instance.filterArea).toEqual(rect)

    rect = new PIXI.Rectangle(0, 0, 200, 200)
    await rerender({ filterArea: rect })
    expect(instance.filterArea).toEqual(rect)
  })

  test('hitArea', async () => {
    let rect = new PIXI.Rectangle(0, 0, 100, 100)
    const { instance, rerender } = await renderContainer(Container, {
      hitArea: rect,
    })
    expect(instance.hitArea).toEqual(rect)

    rect = new PIXI.Rectangle(0, 0, 200, 200)
    await rerender({ hitArea: rect })
    expect(instance.hitArea).toEqual(rect)
  })

  test('filters', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      filters: [],
    })
    expect(instance.filters).toEqual([])

    const filters = [new PIXI.Filter({})]
    await rerender({ filters })
    expect(instance.filters).toEqual(filters)
  })

  test('height', async () => {
    const { instance, rerender } = await renderContainer(Container, {})

    // container requires a child to set its local bounds before width/height do nayhting
    instance.addChild(new PIXI.Text({ text: 'abc' }))

    await rerender({ height: 200 })
    expect(instance.height).toBe(200)
  })

  test('interactive', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      interactive: true,
    })
    expect(instance.interactive).toBe(true)

    await rerender({ interactive: false })
    expect(instance.interactive).toBe(false)
  })

  test('interactiveChildren', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      interactiveChildren: true,
    })
    expect(instance.interactiveChildren).toBe(true)

    await rerender({ interactiveChildren: false })
    expect(instance.interactiveChildren).toBe(false)
  })

  test('isRenderGroup', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      isRenderGroup: true,
    })
    expect(instance.isRenderGroup).toBe(true)

    await rerender({ isRenderGroup: false })
    // can't be updated after creation
    expect(instance.isRenderGroup).toBe(true)
  })

  test('mask', async () => {
    let mask = new PIXI.Graphics()
    const { instance, rerender } = await renderContainer(Container, {
      mask,
    })
    expect(instance.mask).toBe(mask)

    mask = new PIXI.Graphics()
    await rerender({ mask })
    expect(instance.mask).toBe(mask)

    mask = new PIXI.Graphics()
    await rerender({ mask: { mask, inverse: true } })
    expect(instance.mask).toBe(mask)
  })

  test('label', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      label: 'label',
    })
    expect(instance.label).toBe('label')

    await rerender({ label: 'label2' })
    expect(instance.label).toBe('label2')
  })

  test('name (deprecated)', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      name: 'name',
    })
    expect(instance.label).toBe('name')

    await rerender({ name: 'name2' })
    expect(instance.label).toBe('name2')
  })

  test('pivot', async () => {
    let pivot: any = new PIXI.Point(0, 0)
    const { instance, rerender } = await renderContainer(Container, {
      pivot,
    })
    expect(instance.pivot.x).toEqual(pivot.x)
    expect(instance.pivot.y).toEqual(pivot.y)

    pivot = { x: 1, y: 1 }

    await rerender({ pivot })
    expect(instance.pivot.x).toEqual(pivot.x)
    expect(instance.pivot.y).toEqual(pivot.y)

    pivot = [2, 2]

    await rerender({ pivot })
    expect(instance.pivot.x).toEqual(pivot[0])
    expect(instance.pivot.y).toEqual(pivot[1])
  })

  test('position', async () => {
    let position: any = new PIXI.Point(0, 0)
    const { instance, rerender } = await renderContainer(Container, {
      position,
    })
    expect(instance.position.x).toEqual(position.x)
    expect(instance.position.y).toEqual(position.y)

    position = { x: 1, y: 1 }

    await rerender({ position })
    expect(instance.position.x).toEqual(position.x)
    expect(instance.position.y).toEqual(position.y)

    position = [2, 2]

    await rerender({ position })
    expect(instance.position.x).toEqual(position[0])
    expect(instance.position.y).toEqual(position[1])
  })

  test('renderable', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      renderable: true,
    })
    expect(instance.renderable).toBe(true)

    await rerender({ renderable: false })
    expect(instance.renderable).toBe(false)
  })

  test('rotation', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      rotation: 0.5,
    })
    expect(instance.rotation).toBe(0.5)

    await rerender({ rotation: 0.6 })
    expect(instance.rotation).toBe(0.6)
  })

  test('scale', async () => {
    let scale: any = new PIXI.Point(1, 1)
    const { instance, rerender } = await renderContainer(Container, {
      scale,
    })
    expect(instance.scale.x).toEqual(scale.x)
    expect(instance.scale.y).toEqual(scale.y)

    scale = { x: 2, y: 2 }

    await rerender({ scale })
    expect(instance.scale.x).toEqual(scale.x)
    expect(instance.scale.y).toEqual(scale.y)

    scale = [3, 3]

    await rerender({ scale })
    expect(instance.scale.x).toEqual(scale[0])
    expect(instance.scale.y).toEqual(scale[1])
  })

  test('skew', async () => {
    let skew: any = new PIXI.Point(0, 0)
    const { instance, rerender } = await renderContainer(Container, {
      skew,
    })
    expect(instance.skew.x).toEqual(skew.x)
    expect(instance.skew.y).toEqual(skew.y)

    skew = { x: 1, y: 1 }

    await rerender({ skew })
    expect(instance.skew.x).toEqual(skew.x)
    expect(instance.skew.y).toEqual(skew.y)

    skew = [2, 2]

    await rerender({ skew })
    expect(instance.skew.x).toEqual(skew[0])
    expect(instance.skew.y).toEqual(skew[1])
  })

  test('sortableChildren', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      sortableChildren: true,
    })
    expect(instance.sortableChildren).toBe(true)

    await rerender({ sortableChildren: false })
    expect(instance.sortableChildren).toBe(false)
  })

  test('tabIndex', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      tabIndex: 1,
    })
    expect(instance.tabIndex).toBe(1)

    await rerender({ tabIndex: 2 })
    expect(instance.tabIndex).toBe(2)
  })

  test('visible', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      visible: true,
    })
    expect(instance.visible).toBe(true)

    await rerender({ visible: false })
    expect(instance.visible).toBe(false)
  })

  test('x', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      x: 1,
    })
    expect(instance.x).toBe(1)

    await rerender({ x: 2 })
    expect(instance.x).toBe(2)
  })

  test('y', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      y: 1,
    })
    expect(instance.y).toBe(1)

    await rerender({ y: 2 })
    expect(instance.y).toBe(2)
  })

  test('width', async () => {
    const { instance, rerender } = await renderContainer(Container, {})

    // container requires a child to set its local bounds before width/height do nayhting
    instance.addChild(new PIXI.Text({ text: 'abc' }))

    await rerender({ width: 200 })
    expect(instance.width).toBe(200)
  })

  test('zIndex', async () => {
    const { instance, rerender } = await renderContainer(Container, {
      zIndex: 1,
    })
    expect(instance.zIndex).toBe(1)

    await rerender({ zIndex: 2 })
    expect(instance.zIndex).toBe(2)
  })

  describe.skip('events', () => {})
})
