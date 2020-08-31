import * as tf from "@tensorflow/tfjs";

export default function sketch(p) {
  let canvas;

  let x_vals = [];
  let y_vals = [];
  let m, b;
  const learningRate = 0.5;
  const optimizer = tf.train.sgd(learningRate);

  p.setup = () => {
    canvas = p.createCanvas(400, 400);
    p.background(0);
    m = tf.variable(tf.scalar(p.random(1)));
    b = tf.variable(tf.scalar(p.random(1)));
  };
  p.loss = (pred, labels) => {
    return pred.sub(labels).square().mean();
  };

  p.predict = (x) => {
    const xs = tf.tensor1d(x);
    // y = mx +b
    const ys = xs.mul(m).add(b);
    return ys;
  };

  p.mousePressed = () => {
    let x = p.map(p.mouseX, 0, p.width, 0, 1);
    let y = p.map(p.mouseY, 0, p.height, 1, 0);

    x_vals.push(x);
    y_vals.push(y);
  };

  // Function used and called when an items needs to be drawn

  p.draw = () => {
    tf.tidy(()=>{
      if (x_vals.length > 0) {
        const ys = tf.tensor1d(y_vals);
        ys.print();
        optimizer.minimize(() => p.loss(p.predict(x_vals), ys));
      }
    })


    p.background(0);
    p.stroke(255);
    p.strokeWeight(10);
    // Getting the coordinates of the clicked points so they can be drawn

    for (let i = 0; i < x_vals.length; i++) {
      let px = p.map(x_vals[i], 0, 1, 0, p.width);
      let py = p.map(y_vals[i], 0, 1, p.height, 0);
      p.point(px, py);
    }

      let lineX = [0, 1];
      const ys = tf.tidy(()=>p.predict(lineX)); 
      let lineY = ys.dataSync();
      ys.dispose()
  
  
      let x1 = p.map(lineX[0], 0, 1, 0, p.width);
      let x2 = p.map(lineX[1], 0, 1, 0, p.width);
  
      let y1 = p.map(lineY[0], 0, 1, p.height, 0);
      let y2 = p.map(lineY[1], 0, 1, p.height, 0);
      p.strokeWeight(2);
      p.line(x1, y1, x2, y2);


    // ys.dispose()
  };
}
