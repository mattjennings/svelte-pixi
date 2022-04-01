<script>
  import '../app.css'
  import '../prism.css'
  import Sidebar from '$lib/website/Sidebar.svelte'
</script>

<title>svelte-pixi</title>
<div class="bg-white flex max-w-[1600px] mx-auto">
  <Sidebar />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0 ">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <slot />
    </div>
  </main>
</div>
