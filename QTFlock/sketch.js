let flock
let cohPerS,
    cohStrS,
    sepPerS,
    sepStrS,
    aliPerS,
    aliStrS,
    boidCount,
    treeCap,
    maxS,
    maxF,
    showTree,
    showUi

function setup() {
  createCanvas(700, 700)
  flock = new Flock()
  fill(85)
  noStroke()
  cohPerS = createSlider(0, 250, 46, 1).position(20, 41)
  cohStrS = createSlider(0, 2, 0.7, 0.05).position(20, 56)
  sepPerS = createSlider(0, 250, 12, 1).position(20, 84)
  sepStrS = createSlider(0, 2, 1.45, 0.05).position(20, 99)
  aliPerS = createSlider(0, 250, 55, 1).position(20, 127)
  aliStrS = createSlider(0, 2, 0.9, 0.05).position(20, 142)
  boidCount = createSlider(0, 500, 215, 1).position(42, 172)
  maxS = createSlider(1, 15, 3, 1).position(72, 187)
  maxF = createSlider(0.05, 1, 0.0625, 0.05).position(68, 203)
  treeCap = createSlider(1, 100, 7, 1).position(70, 218)
  showTree = createCheckbox("", true).position(5, 239)
  showTree.changed(treeVis)
  showUi = createCheckbox("Show UI", true)
  showUi.changed(sliderPos)
}

function renderUi() {
    text("Cohesion:\nP:\nS:", 10, 40)
    text(cohPerS.value(), 155, 55)
    text(cohStrS.value(), 155, 69)

    text("Separation:\nP:\nS:", 10, 83)
    text(sepPerS.value(), 155, 99)
    text(sepStrS.value(), 155, 114)

    text("Alignment:\nP:\nS:", 10, 126)
    text(aliPerS.value(), 155, 142)
    text(aliStrS.value(), 155, 157)

    text("\nBoids:\nCount:\nMax Speed:\nMax Force:\nQTree Cap:", 10, 156)
    text(boidCount.value(), 175, 186)
    text(maxS.value(), 205, 201)
    text(maxF.value(), 200, 218)
    text(treeCap.value(), 202, 232)
    text("Show QuadTree", 25, 253)

    
}


function draw() {
  background(0)
  flock.flock(cohPerS.value(), 
              cohStrS.value(), 
              sepPerS.value(), 
              sepStrS.value(),  
              aliPerS.value(), 
              aliStrS.value()) // Cohesion, Separation, Alignment
  flock.flockSize(boidCount.value())
  flock.treeCap(treeCap.value())
  flock.setSizeAndMaxForce(maxS.value(), maxF.value())
  push()
  fill(255)
  text(int(frameRate()), 10, 20)
  if(showUi.checked()) {
    renderUi()
  }
  pop()
}

function treeVis() {
  if(this.checked()) {
    flock.showTree(true)
  } else {
    flock.showTree(false)
  }
}

function sliderPos() {
  if(this.checked()) {
    cohPerS.position(20, 41)
    cohStrS.position(20, 56)
    sepPerS.position(20, 84)
    sepStrS.position(20, 99)
    aliPerS.position(20, 127)
    aliStrS.position(20, 142)
    boidCount.position(42, 172)
    maxS.position(72, 187)
    maxF.position(68, 203)
    treeCap.position(70, 218)
    showTree.position(5, 240)
  } else {
    cohPerS.position(width + 10, 0)
    cohStrS.position(width + 10, 0)
    sepPerS.position(width + 10, 0)
    sepStrS.position(width + 10, 0)
    aliPerS.position(width + 10, 0)
    aliStrS.position(width + 10, 0)
    boidCount.position(width + 10, 0)
    maxS.position(width + 10, 0)
    maxF.position(width + 10, 0)
    treeCap.position(width + 10, 0)
    showTree.position(width + 10, 0)
  }
}