---
layout: 'no_sidebar'
title: false
---

<script>
    import Stars from '../components/Stars/Stars.svelte'
</script>

<div class="hero">
    <div class="banner">
        <h1>svelte-pixi</h1>
        <p>Create Pixi apps with Svelte</p>
    </div>

    <div class="buttons">
        <a href="getting-started">Get Started</a>
    </div>

    <Stars />

</div>

<style>
    .banner h1 {
      text-align: center;
      margin-bottom: 0;
      font-size: 3em;
    }

    .banner{
        flex: 1 0 auto;
        margin-top: 100px;
    }

    .banner p{
        font-size: 1.5em;
        text-align: center;
    }

    .buttons{
        flex: 0 0 auto;
        text-align: center;
        margin-bottom: 100px;
    }

    .buttons a{
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
