function QuadTree(boundary, capacity) {
    this.bounds = boundary
    this.capacity = capacity
    this.points = []
    this.NW
    this.NE
    this.SW
    this.SE
    this.divided = false
}
QuadTree.prototype.subdivide = function() {
    const x = this.bounds.x, y = this.bounds.y, w = this.bounds.w, h = this.bounds.h
    let NW = new Rect(x - w / 2, y - h / 2, w / 2, h / 2)
    this.NW = new QuadTree(NW, this.capacity)
    let NE = new Rect(x + w / 2, y - h / 2, w / 2, h / 2)
    this.NE = new QuadTree(NE, this.capacity)
    let SW = new Rect(x - w / 2, y + h / 2, w / 2, h / 2)
    this.SW = new QuadTree(SW, this.capacity)
    let SE = new Rect(x + w / 2, y + h / 2, w / 2, h / 2)
    this.SE = new QuadTree(SE, this.capacity)
    this.pass()
    this.divided = true
}
QuadTree.prototype.pass = function() {
    for(let i = 0; i < this.points.length; i++) {
        this.NW.insert(this.points[i])
        this.NE.insert(this.points[i])
        this.SW.insert(this.points[i])
        this.SE.insert(this.points[i])
    }
}
QuadTree.prototype.insert = function(point) {
    if(!this.bounds.contains(point)) {
        return
    }

    if(this.points.length < this.capacity) {
        this.points.push(point)
    } else {
        if(!this.divided){
            this.subdivide()
        }
        this.NW.insert(point)
        this.NE.insert(point)
        this.SW.insert(point)
        this.SE.insert(point)
    }
}
QuadTree.prototype.show = function() {
    this.bounds.show()
    if(!this.divided) {
        for(let i = 0; i < this.points.length; i++) {
            this.points[i].show()
        }
    } else {
        this.NW.show()
        this.NE.show()
        this.SW.show()
        this.SE.show()
    }
}
QuadTree.prototype.query = function(range, found) {
    if(!found) {
        found = []
    }

    if(!this.bounds.intersects(range)) {
        return null
    } else {
        if(this.divided) {
            this.NW.query(range, found)
            this.NE.query(range, found)
            this.SW.query(range, found)
            this.SE.query(range, found)
        } else {
            for(let i = 0; i < this.points.length; i++) {
                let p = this.points[i]
                if(range.contains(p)) {
                    found.push(p)
                }
            }
        }
    }

    return found
}


function Point(x, y) {
    this.x = x
    this.y = y
}
Point.prototype.show = function() {
    push()
    translate(this.x, this.y)
    point(0, 0)
    pop()
}

function Rect(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
}
Rect.prototype.contains = function(point) {
    return !(abs(point.x - this.x) > this.w || abs(point.y - this.y) > this.h)
}
Rect.prototype.intersects = function(other) {
    return !(abs(this.x - other.x) > this.w + other.w || 
             abs(this.y - other.y) > this.h + other.h)
}
Rect.prototype.show = function() {
    push()
    noFill()
    rectMode(RADIUS)
    translate(this.x, this.y)
    rect(0, 0, this.w, this.h)
    pop()
}