let scl = 10
let inc = 0.1

let cols, rows
let zoff = 0

let particles = []
let field

let g

function setup() {
  createCanvas(800, 800)
  g = createGraphics(3200, 3200)
  g.background(0)
  cols = floor(g.width / scl)
  rows = floor(g.height / scl)

  field = new Array(cols * rows)


  for(let i = 0; i < 1000; i++) {
    particles.push(new Particle(random(g.width), random(g.height)))
  }
}

function draw() {
  //background(0, 10)
  if(frameCount % 30 == 0) {
    let yoff = 0
    for(let y = 0; y < rows; y++) {
      let xoff = 0
      for(let x = 0; x < cols; x++) {
        let angle = noise(xoff, yoff, zoff) * TAU
        let v = p5.Vector.fromAngle(angle)
        field[x + y * cols] = v
        xoff += inc
      }
      yoff += inc
      
    }
    zoff += inc
  }
  for(let p of particles) {
    p.follow(field)
    p.update()
    p.show()
  }
  image(g, 0, 0, width, height)
}

function randomize() {
  for(let p of particles) {
    p.pos.set(random(g.width), random(g.height))
  }
}


function Particle(x, y) {
  this.pos = createVector(x, y)
  this.vel = createVector()
  this.acc = field[floor(this.pos.x / scl) + floor(this.pos.y / scl) * cols] 
  this.points = []
  this.maxspeed = 1
}
Particle.prototype.follow = function(field) {
  let x = floor(this.pos.x / scl)
  let y = floor(this.pos.y / scl)
  let ind = (x + y * cols)
  let force = field[ind]
  this.applyForce(force)
}
Particle.prototype.show = function() {
  g.push()
  g.stroke(170, 0, 0, 1)
 g.fill(170, 0, 0, 1)
  g.strokeWeight(3)
  g.translate(this.pos.x, this.pos.y)
  g.circle(this.pos.x, this.pos.y, 2)
  g.pop()
}
Particle.prototype.update = function() {
  this.vel.add(this.acc)
  this.vel.limit(this.maxspeed)
  this.pos.add(this.vel)
  this.acc.mult(0)

  if(this.pos.x > g.width) {
    this.pos.x = 0
  } else if(this.pos.x < 0) {
    this.pos.x = g.width
  }
  if(this.pos.y > g.height) {
    this.pos.y = 0
  } else if(this.pos.y < 0) {
    this.pos.y = g.height
  }
}
Particle.prototype.applyForce = function(force) {
  this.acc.add(force)
}