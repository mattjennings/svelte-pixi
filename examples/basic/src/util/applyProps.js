/**
 * Applies props to a pixi instance
 *
 * @param instance pixi instance
 * @param props props from svelte component (usually $$props)
 * @param {(key: string, value: any) => any} [applyProp] called for every prop that is to be applied. Return the value that should be applied, or undefined if it should not be applied at all
 */
export default function applyProps(
  instance,
  props,
  applyProp = (key, value) => value
) {
  for (const prop in props) {
    if (prop in instance) {
      const val = applyProp(prop, props[prop])

      if (val !== undefined) {
        instance[prop] = val
      }
    }
  }
}
