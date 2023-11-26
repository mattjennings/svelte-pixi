import { parsePoint } from './data-types'
import type { Apply } from './props'
import * as PIXI from 'pixi.js'

function applyPropsRune<
  Instance,
  Props extends Partial<Record<keyof Instance, any>>,
>(
  instance: Instance,
  props: Props,
  opts: {
    ignore?: (keyof Props)[]
    apply?: {
      [Prop in keyof Props]?: Apply<Instance, Props[Prop]>
    }
    onApply?: (prop: keyof Props, value: Props[keyof Props]) => void
  } = {},
) {
  const ignore = [
    ...(opts.ignore ?? []),
    'instance',
    'children',
    ...Object.keys(props).filter((p) => p.startsWith('$')),
  ]

  const entries = Object.entries(props).filter(
    ([prop]) => !ignore.includes(prop as any),
  )

  for (const [prop, value] of entries) {
    $effect(() => {
      if (instance) {
        applyProp(instance, prop as keyof Instance, value, opts?.apply?.[prop])
        opts?.onApply?.(prop as keyof Props, value as any)
      }
    })
  }

  return {
    forceApply: () => {
      for (const [prop, value] of entries) {
        if (instance) {
          applyProp(
            instance,
            prop as keyof Instance,
            value,
            opts?.apply?.[prop],
          )
          opts?.onApply?.(prop as keyof Props, value as any)
        }
      }
    },
  }
}

function applyProp<Instance, Prop extends keyof Instance, Value>(
  instance: Instance,
  prop: Prop | null,
  value: Value,
  apply?: Apply<Instance, Value>,
) {
  if (instance) {
    if (prop === null) {
      apply?.(value, instance)
    } else {
      const instanceValue = instance[prop] as any
      if (instanceValue !== value && typeof value !== 'undefined') {
        if (apply) {
          apply(value, instance)
        } else {
          if (
            instance[prop] instanceof PIXI.Point ||
            instance[prop] instanceof PIXI.ObservablePoint
          ) {
            instance[prop as any] = parsePoint(value as any)
          } else {
            instance[prop as any] = value
          }
        }
      }
    }
  }
}
