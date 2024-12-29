import * as PIXI from 'pixi.js'
import { createRawSnippet, mount, tick, unmount, type Component } from 'svelte'
import { render } from 'vitest-browser-svelte'
import { Application } from '../src/lib/svelte-5'
import { type ContainerProps } from '../src/lib/svelte-5/Container.svelte'

type PixiInstanceType<P> = P extends ContainerProps<infer T> ? T : never

export async function renderContainer<P extends ContainerProps<any>>(
  component: Component<P, any, any>,
  props: NoInfer<P>,
  waitForInstance = true,
): Promise<
  Omit<ReturnType<typeof render>, 'rerender'> & {
    app: PIXI.Application
    instance: PixiInstanceType<P>
    rerender(props: Partial<P>): Promise<void>
  }
> {
  let app: any
  let instance: any

  const childProps = $state({
    ...props,
    oncreate: (i) => {
      instance = i
      props.oncreate?.(i)
    },
  })

  const result = render(Application, {
    props: {
      oninit: (a) => {
        app = a.application
      },
      children: createRawSnippet(() => {
        return {
          render: () => '<svelte:fragment />',
          setup(element) {
            const comp = mount(component, {
              target: element,
              props: childProps,
            })

            return () => {
              unmount(comp)
            }
          },
        }
      }),
    },
  })

  async function rerender(p) {
    Object.assign(childProps, p)
    await tick()
  }

  await Promise.all([
    new Promise((resolve, reject) => {
      const t = setTimeout(() => {
        reject(new Error('Timed out waiting for app'))
      }, 5000)

      const i = setInterval(() => {
        if (app) {
          clearInterval(i)
          clearTimeout(t)
          resolve(app)
        }
      }, 10)
    }),
    waitForInstance
      ? new Promise((resolve, reject) => {
          const t = setTimeout(() => {
            reject(new Error('Timed out waiting for instance'))
          }, 5000)

          const i = setInterval(() => {
            if (instance) {
              clearInterval(i)
              clearTimeout(t)
              resolve(instance)
            }
          }, 10)
        })
      : Promise.resolve(undefined),
  ])

  return {
    ...result,
    app,
    instance,
    rerender,
  } as any
}
