const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
var randomEmoji = require('random-emoji');

const settings = {
  scaleToView: true,
  dimensions: [ 2048, 2048 ],
  animate: true,
  fps: 24
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount)
  const background = random.pick(palettes).shift()
  const count = 50 || random.rangeFloor(4, 60)

  const createGrid = () =>{
    const points = [];

    for(let x = 0; x< count; x++) {
      for(let y= 0; y< count; y++ ){
        const u = count <=1 ? 0.5 :  x /(count-1);
        const v = count <=1 ? 0.5 : y/(count-1);
        const corner = random.pick([0, 0.5, 1, 1.5])
        const arcStart = Math.PI * corner;
        const arcEnd = arcStart +  Math.PI * 1.5
        random.pick([0, 0.5, 1, 1.5])
        // const radius = Math.abs(random.noise2D(u, v)) * 0.1
        // const radius = width / (gridColumnCount - 1) * scaleFactor

        // const arcCircumference = Math.PI * 1.5

        points.push(
          {
            color: random.pick(palette),
            rotation: Math.PI / (random.pick([0, 0.25, 0.4, 0.6, 0.8])),
            position: [u, v],
            arcStart,
            arcEnd
        }
        )
      }
    }
    return points
  }

  // random.setSeed(10)
  const points = createGrid()

  // .filter(() => random.value() > 0.5)

  return ({ context, width, height }) => {
    // const margin =  width * 0.175
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);

    // const char = randomEmoji.random({count: 1});

    points.forEach(point => {
      const {color, rotation, position, arcStart, arcEnd} = point;
      const [ u , v] = position;
      const margin =  width * 0.2
      const x = lerp(margin, width-margin, u);
      const y = lerp(margin, height-margin, v);

      const radius = width / (count - 1) * 0.4

      // context.beginPath();
      // context.moveTo(x, y)
      // context.arc(x, y, radius *.4, arcStart, arcEnd, false);
      // // context.translate(x, y)
      // // context.rotate(0.4)

      // context.fillStyle = color
      // context.fill()
      const cx = x;
      const cy = y

      context.save()
      context.translate(x, y)
      context.fillStyle = color
      context.beginPath();
      context.rotate(rotation)
      context.translate(-x, -y)
      context.moveTo(x,y); //x, y
      context.lineTo(x, y + 100); //y*2, x
      context.lineTo(x + 100, y+ 100); //y*2, x-y
      context.closePath()
      context.fill();
      context.restore()



      // context.translate(-x, -y)
      // context.lineWidth =20;

      // context.save()
      // // context.fillStyle = color;
      // context.font = `${radius * width}px "Arial"`
      // context.translate(x, y)
      // context.rotate(rotation)
      // context.fillText('🌹', 0, 0)
      // context.restore()
    });
  };
};

canvasSketch(sketch, settings);
