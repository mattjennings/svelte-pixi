<div
  class="with-app-container w-full h-full overflow-hidden flex items-center justify-center bg-gray-900"
>
  <slot />
</div>

<style>
  :global(.with-app-container canvas) {
    min-width: 100%;
    max-width: none;
  }
</style>
