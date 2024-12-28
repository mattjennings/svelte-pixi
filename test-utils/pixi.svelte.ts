import * as PIXI from 'pixi.js'
import { createRawSnippet, mount, tick, unmount, type Component } from 'svelte'
import { render } from 'vitest-browser-svelte'
import { Application } from '../src/lib/svelte-5'
import { type ContainerProps } from '../src/lib/svelte-5/Container.svelte'

export async function renderApp<
  Props extends ContainerProps<any>,
  WaitForInstance extends true | false = true,
>(
  component: Component<Props, any>,
  props: Props,
  waitForInstance?: WaitForInstance,
): Promise<
  Omit<ReturnType<typeof render>, 'rerender'> & {
    app: PIXI.Application
    instance: WaitForInstance extends true
      ? InstanceType<Props['instance']>
      : undefined
    rerender(props: Partial<Props>): Promise<void>
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
