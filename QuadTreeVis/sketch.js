let qt
let range
let rangePoints = []
let places = []
let compare = false
let show = false

function setup() {
  createCanvas(900, 900)
  let boundary = new Rect(width / 2, height / 2, width / 2, height / 2)
  qt = new QuadTree(boundary, 2)

  for(let i = 0; i < 1_000_000; i++) {
    let p = new Point(random(width), random(height))
    if(!compare) {
      qt.insert(p)
    }
    else {
      places.push(p)
    }
  }
  range = new Rect(width / 3, height / 3, width / 18, height / 18)
}

function draw() {
  range.x = mouseX
  range.y = mouseY
  if(qt.bounds.contains(new Point(mouseX, mouseY))) {
    rangePoints = qt.query(range)
  } else {
    rangePoints = []
  }
  background(100)
  stroke(20)
  strokeWeight(2)
  qt.show()
  stroke(0, 150, 0)
  strokeWeight(3)
  textAlign(CENTER, CENTER)
  if(!show){
    if(!compare) {
      text(rangePoints.length, range.x, range.y)
    } else {
      let t = 0
      for(let p of places) {
        if(range.contains(p)) {
          t++
        }
      }
      text(t, range.x, range.y)
    }
  } else {
    for(let p of rangePoints) {
      p.show()
    }
  }
  text(int(frameRate()), range.x + range.w + 15, range.y)
  range.show()
}

function mousePressed() {
  if(mouseButton == LEFT) {
    let newPoint = new Point(mouseX, mouseY)
    qt.insert(newPoint)
  }
}