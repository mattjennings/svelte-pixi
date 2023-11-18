<script>
  import * as PIXI from 'pixi.js'
  import { Mesh, Graphics, AssetsLoader } from 'svelte-pixi'

  let mask

  const geometry = new PIXI.Geometry()
    .addAttribute(
      'aVertexPosition', // the attribute name
      [
        -100,
        -100, // x, y
        100,
        -100, // x, y
        100,
        100,
        -100,
        100,
      ], // x, y
      2
    ) // the size of the attribute
    .addAttribute(
      'aUvs', // the attribute name
      [
        0,
        0, // u, v
        1,
        0, // u, v
        1,
        1,
        0,
        1,
      ], // u, v
      2
    ) // the size of the attribute
    .addIndex([0, 1, 2, 0, 2, 3])

  const vertexSrc = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`

  const fragmentSrc = `
    precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler;
    uniform float time;

    void main() {

        gl_FragColor = texture2D(uSampler, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
    }`

  const uniforms = {
    uSampler: PIXI.Texture.from('/assets/bg_mesh.jpg'),
    time: 0,
  }

  const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, uniforms)

  export let x
  export let y

  let initX = x
  let initY = y
  let dragging = false
  let offset = { x: 0, y: 0 }
  let circleSize = 50

  function handleDragStart({ detail }) {
    dragging = true
    offset = {
      x: detail.data.global.x - x,
      y: detail.data.global.y - y,
    }
  }

  function handleDragEnd() {
    dragging = false
  }

  function handleDrag({ detail }) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
    const nextPosition = detail.data.global

    if (dragging) {
      x = clamp(nextPosition.x - offset.x, circleSize, 400 - circleSize)
      y = clamp(nextPosition.y - offset.y, circleSize, 400 - circleSize)

      updateShader()
    }
  }

  function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1
    let x = y2 - y1

    return Math.sqrt(x * x + y * y)
  }

  function updateShader() {
    shader.uniforms.time = getDistance(x, y, initX, initY) / 50
  }

  updateShader()
</script>

<AssetsLoader assets={['/assets/bg_mesh.jpg']}>
  <Mesh
    {x}
    {y}
    {geometry}
    {shader}
    {mask}
    scale={2}
    interactive
    hitArea={new PIXI.Circle(0, 0, circleSize)}
    on:pointerdown={handleDragStart}
    on:pointerup={handleDragEnd}
    on:pointerupoutside={handleDragEnd}
    on:mousemove={handleDrag}
  >
    <Graphics
      bind:instance={mask}
      isMask
      draw={(graphics) => {
        graphics.beginFill(0xffffff)
        graphics.drawCircle(0, 0, circleSize / 2)
        graphics.endFill()
      }}
    />
  </Mesh>
</AssetsLoader>
