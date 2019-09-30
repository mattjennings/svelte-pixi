import { onMount } from "svelte";
import getParentContainer from "./getParentContainer";

/**
 * Helper function for instantiating a PIXI object in a svelte component. Call this inside the <script> tag
 *
 * Automatically destroys self in onMount()
 *
 * @param self - reference to self from component
 * @param onCreate - called when self does not exist, should return PIXI instance
 */
export default function createSelf(self, onCreate) {
  const parent = getParentContainer();

  if (parent && !parent.children.includes(self)) {
    self = onCreate();
    parent.addChild(self);

    onMount(() => {
      return () => {
        parent && parent.removeChild(self);
      };
    });
  } else {
    throw new Error("Unable to find container or stage");
  }
}
