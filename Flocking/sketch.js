let mvrs = []

function setup() {
  createCanvas(700, 700)
  fill(85)
  noStroke()

  for(let i = 0; i < 315; i++) {
    mvrs.push(new Mover())
  }
}

function draw() {
  background(0)
  text(int(frameRate()), 10, 20)
  for(let i = 0; i < mvrs.length; i++) {
    let mvr = mvrs[i]
    mvr.flock(mvrs, 85, 35, 105, 1, 1.5, 1).run() // Cohesion, Separation, Alignment
  }
}