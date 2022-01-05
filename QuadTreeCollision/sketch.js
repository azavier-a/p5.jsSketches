let circles = []
let qTree

const count = 2000
const tries = 1000 // The number of tries before the loop exits
const detectionRadius = 20

const minRadius = .2
const maxRadius = 8

const treeCapacity = 5
const useQuadTree = true
const showQuadTree = false

function setup() {
  createCanvas(950, 950)
  if(useQuadTree) {
    const boundary = new Rect(width/2, height/2, width/2, height/2)
    qTree = new QuadTree(boundary, treeCapacity)
  }
  let cur = 0
  for(let i = 0; i < count; i++) {
    if(cur > tries) {
      break
    }
    let newCircle = new Circle(random(width), random(height), random(minRadius, maxRadius))
    if(newCircle.intersectsOtherCircles(circles)) {
      i--
      cur++
      continue
    }
    circles.push(newCircle)
  }
}

function draw() {
  background(100)
  if(useQuadTree) {
    qTree.buildTree(circles)
    for(let c of circles) {
      c.wiggle()
      let circles = qTree.query(new Circle(c.x, c.y, c.r))
      if(circles != null && circles.length > 1) {
        fill(0)
      } else {
        noFill()
      }
      c.show()
    }
    if(showQuadTree) {
      qTree.show()
    }
  } else {
    for(let c of circles) {
      c.wiggle()
      if(c.intersectsOtherCircles(circles)) {
        fill(0)
      } else {
        noFill()
      }
      c.show()
    }
  }
  fill(255)
  text(int(frameRate()), 10, 20)
}

function Circle(x, y, r) {
  this.x = x
  this.y = y
  this.r = r
}
Circle.prototype.wiggle = function() {
  this.x += random(-.5, .5)
  this.y += random(-.5, .5)
}
Circle.prototype.show = function() {
  push()
  translate(this.x, this.y)
  circle(0, 0, this.r * 2)
  pop()
}
Circle.prototype.intersectsOtherCircles = function(others) {
  for(let c of others) {
    if(c != this) {
      const condition = sq(this.x - c.x) + sq(this.y - c.y) < sq(this.r + c.r)
      if(condition) {
        return true
      }
    }
  }
}
Circle.prototype.contains = function(circle) {
  return sq(this.x - circle.x) + sq(this.y - circle.y) < sq(this.r + circle.r)
}