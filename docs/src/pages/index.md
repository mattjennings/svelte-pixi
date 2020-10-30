---
layout: 'empty'
title: false
---

<script>
    import Stars from '../components/Stars/Stars.svelte'
</script>

<div class="root">
    <div class="background-app">
        <Stars />
    </div>

    <div class="content">
        <div class="info">
            <h1>svelte-pixi</h1>
            <p>Create Pixi apps with Svelte</p>
            <div class="buttons">
                <a href="getting-started">Get Started</a>
            </div>
        </div>
    </div>

</div>

<style>
    /* :global(main) {
        max-width: 100vw;   
        margin: 0; 
        padding: 0;
    }

    :global(main article) {
        padding: 0 !important;
    } */

    .root {
        overflow: hidden;
        position: relative;
        height: 100vh;
    }

    .background-app {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: black;
    }

    .content {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        color: white;
    }

    .info h1 {
      text-align: center;
      margin-bottom: 0;
      font-size: 3em;
    }

    .info {
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .info p {
        font-size: 1.5em;
        text-align: center;
    }

    .buttons {
        flex: 0 0 auto;
        text-align: center;
        margin-bottom: 100px;
    }

    .buttons a {
        display: inline-block;
        padding: 10px;
        color: white;
        background: var(--primary);
        text-decoration: none;
        opacity: 1;
        border-radius: 3px;
    }

    .buttons a:hover{
        opacity: .8;
    }
</style>
