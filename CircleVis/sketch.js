function Circle(x, y, r) {
  this.x = x
  this.y = y
  this.r = r
}
Circle.prototype.contains = function(p) {
  let dx = abs(p.x - this.x)
  if(dx > this.r) {
    return false
  }
  let dy = abs(p.y - this.y)
  if(dy > this.r) {
    return false
  }
  if(dx + dy <= this.r) {
    return true
  }
  return (dx*dx) + (dy*dy) <= (this.r * this.r)
}
Circle.prototype.show = function() {
  push()
  translate(this.x, this.y)
  circle(0, 0, this.r * 2)
  pop()
}

let c
let p

function setup() {
  createCanvas(400, 400)
  c = new Circle(width / 2, height / 2, 100)
  p = createVector()
  strokeWeight(1)
  stroke(70)
}

function draw() {
  background(100)
  p.set(mouseX, mouseY)
  text(int(dist(p.x, p.y, width / 2, height / 2)), 10, 10)

  if(c.contains(p)) {
    fill(0)
  } else {
    fill(100)
  }
  c.show()

  push()
  strokeWeight(3)
  stroke(100, 0, 0)
  point(p.x, p.y)
  pop()
}

function mousePressed() {
  if(mouseButton == LEFT) {
    c.x = random(width)
    c.y = random(height)
    c.r = random(5, 100)
  }
}