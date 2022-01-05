function Mover() {
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D()
    this.acc = createVector()
    this.maxspeed = 3
    this.maxforce = 0.0625
    this.r = 2
}
Mover.prototype.applyForce = function(force) {
    this.acc.add(force)
    return this
}
Mover.prototype.update = function() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
    return this
}
Mover.prototype.show = function() {
    push()
    let r = map(this.pos.x, 0, width, 0, 255)
    let g = map(this.pos.y, 0, height, 0, 255)
    let b = map(this.pos.x, 0, width, 255, 0)
    stroke(r, g, b)
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading() - radians(90))
    noFill()
    triangle(-this.r / 2, 0, this.r / 2, 0, 0, this.r * 2)
    pop()
    return this
}
Mover.prototype.edges = function() {
    if(this.pos.x > width) {
        this.pos.x = -this.r
    } else if(this.pos.x < -this.r) {
        this.pos.x = width + this.r
    }
    if(this.pos.y > height) {
        this.pos.y = -this.r
    } else if(this.pos.y < -this.r) {
        this.pos.y = height + this.r
    }
    return this
}
Mover.prototype.run = function() {
    this.update().edges().show()
}
Mover.prototype.seek = function(target) {
    let des, str
    des = p5.Vector.sub(target, this.pos)
    des.setMag(this.maxspeed)
    str = p5.Vector.sub(des, this.vel)
    str.limit(this.maxforce)

    return str
}
Mover.prototype.cohesion = function(mvrs) {
    let avg = createVector()

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        if(mvr != this) {
            avg.add(mvr.pos)
        }
    }

    if(mvrs.length > 1) {
        avg.div(mvrs.length - 1)
        return this.seek(avg)
    } else {
        return createVector()
    }
}
Mover.prototype.alignment = function(mvrs) {
    let heading = createVector()

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        if(mvr != this) {
            heading.add(mvr.vel)
        }
    }

    if(mvrs.length > 1) {
        heading.setMag(this.maxspeed)
        heading.sub(this.vel) 
        heading.limit(this.maxforce)
        return heading
    } else {
        return createVector()
    }
}
Mover.prototype.separation = function(mvrs, percep) {
    let away = createVector()

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        let dist = p5.Vector.dist(this.pos, mvr.pos)
        if(dist > 0) {
            let diff = p5.Vector.sub(this.pos, mvr.pos)
            diff.normalize()
            diff.div(dist)
            away.add(diff)
        }
    }
    if(mvrs.length > 1) {
        away.setMag(this.maxspeed)
        away.sub(this.vel)
        away.limit(this.maxforce)
        return away
    } else {
        return createVector()
    }
}
Mover.prototype.flock = function(mvrs, cS, sS, aS) {
    let coh = this.cohesion(mvrs).mult(cS)
    let sep = this.separation(mvrs).mult(sS)
    let ali = this.alignment(mvrs).mult(aS)

    this.applyForce(coh).applyForce(sep).applyForce(ali)
    return this
}