<script>
  import '../app.css'
  import '../prism.css'
  import Sidebar from '$lib/website/Sidebar.svelte'
</script>

<title>svelte-pixi</title>
<div class="bg-white flex sm:max-w-6xl mx-auto">
  <Sidebar />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0 ">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <article
        class="py-6 pb-24 px-4 sm:px-6 prose md:prose-lg lg:prose-x prose-slate"
      >
        <slot />
      </article>
    </div>
  </main>
</div>
