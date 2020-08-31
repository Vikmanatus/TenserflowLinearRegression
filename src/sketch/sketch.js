export default function sketch(p) {
  let canvas;
  
  let xs = [];
  let ys = [];

  p.setup = () => {
    canvas = p.createCanvas(300, 200);
    p.background(0);
  };

  p.mousePressed = () => {
    let x = p.map(p.mouseX, 0, p.width, 0, 1);
    let y = p.map(p.mouseY, 0, p.height, 1, 0);

    xs.push(x);
    ys.push(y);
  };

  p.draw = () => {
    p.background(0);
    p.stroke(255);
    p.strokeWeight(6);
    for (let i = 0; i < xs.length; i++) {
      let px = p.map(xs[i], 0, 1, 0, p.width);
      let py = p.map(ys[i], 0, 1, p.height, 0);
      p.point(px, py);
    }
  };
}
