let mvrs = []

function setup() {
  createCanvas(900, 900)
  for(let i = 0; i < 100; i++) {
    mvrs.push(new Mover())
  }
}

function draw() {
  background(0)
  for(let i = 0; i < mvrs.length; i++) {
    let mvr = mvrs[i]
    mvr.flock(mvrs, 1, 1.5, 1).run() // Cohesion, Separation, Alignment
  }
}