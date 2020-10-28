# AnimatedSprite

An AnimatedSprite is a simple way to display an animation depicted by a list of textures.

I recommend using spritesheets created by TexturePacker ([they have a great tutorial on it](https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs5)).

If you don't want to use spritesheets, you can simply just pass in an array of your desired textures.

### Spritesheet

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, AnimatedSprite, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })

</script>

<Pixi {app}>
  <Loader
    resources={['static/assets/adventurer-spritesheet.json']}>
    <AnimatedSprite
      textures={[
        new PIXI.Texture.from('adventurer-idle-00.png'),
        new PIXI.Texture.from('adventurer-idle-01.png'),
        new PIXI.Texture.from('adventurer-idle-02.png'),
      ]}
      playing
      animationSpeed={0.1}
      anchor={new PIXI.Point(0.5, 0.5)}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }} />
  </Loader>
</Pixi>
```

### Multiple Animations from Spritesheet

```example
<script>
  import * as PIXI from 'pixi.js'
  import { Pixi, AnimatedSprite, Loader } from 'svelte-pixi'

  const app = new PIXI.Application({
    width: 400,
    height: 400,
    antialias: true
  })

  let spritesheet
  let animation = 'adventurer-idle'

  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length)
  }

  function changeAnimation() {
    // spritesheet.animation holds all of our animation keys, so we'll
    // pick one at random
    const keys = Object.keys(spritesheet.animations)
    animation = keys[getRandomIndex(keys)]
  }
</script>

<Pixi {app}>
  <Loader
    resources={['static/assets/adventurer-spritesheet.json']}
    on:complete={() => {
      spritesheet = app.loader.resources['static/assets/adventurer-spritesheet.json'].spritesheet
    }}
    >
    <AnimatedSprite
      textures={spritesheet.animations[animation]}
      playing
      animationSpeed={0.1}
      anchor={new PIXI.Point(0.5, 0.5)}
      x={200}
      y={200}
      scale={{ x: 2, y: 2 }}
      on:loop={changeAnimation}
      />
  </Loader>
</Pixi>
```

```properties pixiUrl:PIXI.AnimatedSprite.html
./../../packages/svelte-pixi/src/AnimatedSprite.svelte
```

## Events

[See PIXI.AnimatedSprite events](https://pixijs.download/release/docs/PIXI.AnimatedSprite.html#event:added)
