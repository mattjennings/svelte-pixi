/// <reference types="@sveltejs/kit" />
/// <reference types="vite-plugin-sveld" />
/// <reference types="@pixi/ticker" />
/// <reference types="@pixi/loaders" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare namespace GlobalMixins {
  interface Text {}
  interface AnimatedSprite {}
}
