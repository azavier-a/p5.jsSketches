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
    this.divided = true
}
QuadTree.prototype.insert = function(point) {
    if(!this.bounds.contains(point)) {
        return false
    }

    if(this.divided) {
        if(this.NW.insert(point)) {
            return true
        } else if(this.NE.insert(point)) {
            return true
        } else if(this.SW.insert(point)) {
            return true
        } else if(this.SE.insert(point)) {
            return true
        }
    } else {
        this.points.push(point)
        if(this.points.length > this.capacity) {
            this.subdivide()
            for(let i = 0; i < this.points.length; i++) {
                let pnt = this.points[i]
                if(this.NW.insert(pnt)) {
                    continue
                } else if(this.NE.insert(pnt)) {
                    continue
                } else if(this.SW.insert(pnt)) {
                    continue
                } else if(this.SE.insert(pnt)) {
                    continue
                }
            }
            this.points = []
            return true
        }
    }
}
QuadTree.prototype.show = function() {
    this.bounds.show()
    if(this.divided) {
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
QuadTree.prototype.clear = function() {
    this.points = []
    this.NW = null
    this.NE = null
    this.SW = null
    this.SE = null
    this.divided = false
}
QuadTree.prototype.buildTree = function(points) {
    this.clear()
    for(let i = 0; i < points.length; i++) {
        let point = points[i]
        this.insert(point)
    }
}
QuadTree.prototype.setCapacity = function(newCap) {
    this.capacity = newCap
    let pnts = this.query(this.bounds)
    this.buildTree(pnts)
}

function Rect(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
}
Rect.prototype.contains = function(point) {
    return !(abs(point.pos.x - this.x) > this.w || 
             abs(point.pos.y - this.y) > this.h)
}
Rect.prototype.intersects = function(other) {
    if(other.r) {
        return !(abs(this.x - other.x) > this.w + other.r || 
                 abs(this.y - other.y) > this.h + other.r)
    }
    return !(abs(this.x - other.x) > this.w + other.w || 
             abs(this.y - other.y) > this.h + other.h)
}
Rect.prototype.show = function() {
    push()
    noFill()
    // strokeWeight(1)
    stroke(30)
    rectMode(RADIUS)
    translate(this.x, this.y)
    rect(0, 0, this.w, this.h)
    pop()
}

function Circle(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
}
Circle.prototype.contains = function(point) {
    let dx = abs(point.pos.x - this.x)
    if(dx > this.r) {
        return false
    }
    let dy = abs(point.pos.y - this.y)
    if(dy > this.r) {
        return false
    }
    if(dx + dy <= this.r) {
        return true
    }
    return (dx*dx) + (dy*dy) <= (this.r * this.r)
}