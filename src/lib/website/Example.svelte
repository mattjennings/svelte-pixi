<script>
  import { browser } from '$app/env'
</script>

<div class="flex flex-col w-full overflow-hidden rounded mb-4">
  <div class="flex justify-center py-3 bg-slate-700">
    <div class="overflow-hidden rounded min-h-[400px]">
      <slot name="example" />
    </div>
  </div>
  <div class="text-sm md:text-base">
    <pre class="!my-0 !rounded-none"><slot name="code" /></pre>
  </div>
</div>
