<script>
  import * as PIXI from "pixi.js";
  import { onMount, getContext } from "svelte";
  import createSelf from "../util/createSelf";

  export let text;
  export let fill = 0xffffff;
  export let fontSize = 16;
  export let position;

  const game = getContext("game");

  let self;

  createSelf(self, () => new PIXI.Text(text, { position, fill, fontSize }));

  if (self) {
    self.text = text;
    self.position = position;
    self.fill = fill;
    self.fontSize = fontSize;
  }
</script>
