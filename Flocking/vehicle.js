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
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading() - radians(90))
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
Mover.prototype.cohesion = function(mvrs, percep) {
    let avg = createVector()
    let total = 0

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        let dist = p5.Vector.dist(this.pos, mvr.pos)
        if(dist > 0 && dist < percep) {
            avg.add(mvr.pos)
            total++
        }
    }

    if(total > 0) {
        avg.div(total)
        return this.seek(avg)
    } else {
        return createVector()
    }
}
Mover.prototype.alignment = function(mvrs, percep) {
    let heading = createVector()
    let total = 0

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        let dist = p5.Vector.dist(this.pos, mvr.pos)
        if(dist > 0 && dist < percep) {
            heading.add(mvr.vel)
            total++
        }
    }

    if(total > 0) {
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
    let total = 0

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        let dist = p5.Vector.dist(this.pos, mvr.pos)
        if(dist > 0 && dist < percep) {
            let diff = p5.Vector.sub(this.pos, mvr.pos)
            diff.normalize()
            diff.div(dist)
            away.add(diff)
            total++
        }
    }
    if(total > 0) {
        away.setMag(this.maxspeed)
        away.sub(this.vel)
        away.limit(this.maxforce)
        return away
    } else {
        return createVector()
    }
}
Mover.prototype.flock = function(mvrs, cP, sP, aP, cS, sS, aS) {
    let coh = this.cohesion(mvrs, cP).mult(cS)
    let sep = this.separation(mvrs, sP).mult(sS)
    let ali = this.alignment(mvrs, aP).mult(aS)

    this.applyForce(coh).applyForce(sep).applyForce(ali)
    return this
}