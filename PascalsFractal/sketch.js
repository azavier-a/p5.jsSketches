let MAX = 4

function nCr(n, r) {
  if(n-r < 0)
    return 0

  if(r > n-r) r = n-r; // the symmetry of pascals allows us to bypass large loops
  
  let ans = 1

  for(let i = 1; i <= r; i++) {
    ans *= n - r + i;
    ans /= i;
  }

  return ans
}

let triangle = [[]]
function makeTriangle() {
  let i, j

  // initialize the first row
  triangle = [[1]] // C(0, 0) = 1

  for(i = 1; i < MAX; i++) {
    triangle[i] = []
    triangle[i].push(1) // C(i, 0) = 1

    for(j = 1; j <= i; j++) {
      if(j > i-j) {
        triangle[i][j] = triangle[i][i-j]
        continue
      }
      triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
    }
  }
}
function nCr2(n, r) {
  return triangle[n][r]
}

function lerp(a, b, t) {
  return b*t + a*(1-t)
}

class Grid {
  constructor(w, h) {
    this.wdt = w
    this.hgt = h
  }
}

let img, grid, canv;
function setup() {
  let r = 9.0 / 9.0
  let w = 300
  let h = w / r
  canv = createCanvas(w, h)

  makeTriangle()

  rectMode(RADIUS)
  noStroke()

  colorMode(RGB, 1)

  frameRate(32)
}

let n = 0
let start = Date.now()
function draw(timestamp) {
  let cur = Date.now()
  let time = (cur - start)*0.005
  
  background(0)
  
  grid = new Grid(n+1, n+1)
  let size = canv.width/(grid.wdt)
  
  let r = 0
  for (let i = 0; i < grid.hgt; i++) {
    for (let j = 0; j < grid.wdt; j++) {
      let pasc = nCr2(i, j)

      let x0 = j * size
      let y0 = i * size

      let s0 = 0.5 + sin(TAU*y0/canv.height + time)*0.5
      let s1 = 0.5 + sin(TAU*x0/canv.height + time)*0.5
      
      let hs = size * 0.5
      y0 += hs
      
      noStroke()
      fill(pasc & 1 ? color(0.7,2*s1*(1-s1),(1-s0)*0.9) : color(0))
      
      x0 += lerp(canv.width/2.0, 0, i/grid.hgt)
      
      square(x0, y0, hs + 0.4)
    }
  }

  if(n+1 < MAX)
    n++
}

function setMax(max) {
  MAX = max

  makeTriangle();
  n = 0
}

let m0 = 2
function mousePressed() {
  m0++;
  setMax(2**m0);
  m0 %= 6
}