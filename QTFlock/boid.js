function Boid() {
    this.pos = createVector(random(width), random(height))
    this.vel = p5.Vector.random2D()
    this.acc = createVector()
    this.maxspeed = 3
    this.maxforce = 0.0625
    this.r = 2.5
}
Boid.prototype.applyForce = function(force) {
    this.acc.add(force)
    return this
}
Boid.prototype.update = function() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)

    if(this.pos.x > width) {
        this.pos.x = 0
    } else if(this.pos.x < -this.r) {
        this.pos.x = width
    }
    if(this.pos.y > height) {
        this.pos.y = 0
    } else if(this.pos.y < -this.r) {
        this.pos.y = height
    }
    return this
}
Boid.prototype.show = function() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading() - radians(90))
    triangle(-this.r / 2, 0, this.r / 2, 0, 0, this.r * 2)
    pop()
    return this
}
Boid.prototype.run = function() {
    this.update().show()
}
Boid.prototype.cohesion = function(mvrs) {
    let avg = createVector()

    for(let i = 0; i < mvrs.length; i++) {
        let mvr = mvrs[i]
        if(mvr != this) {
            avg.add(mvr.pos)
        }
    }

    if(mvrs.length > 1) {
        avg.div(mvrs.length - 1)

        const des = p5.Vector.sub(avg, this.pos)
        des.setMag(this.maxspeed)

        const str = p5.Vector.sub(des, this.vel)
        str.limit(this.maxforce)

        return str
    } else {
        return createVector()
    }
}
Boid.prototype.alignment = function(mvrs) {
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
Boid.prototype.separation = function(mvrs) {
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
Boid.prototype.flock = function(mvrTree, cP, cS, sP, sS, aP, aS) {
    let cMvrs = mvrTree.query(new Circle(this.pos.x, this.pos.y, cP))
    let sMvrs = mvrTree.query(new Circle(this.pos.x, this.pos.y, sP))
    let aMvrs = mvrTree.query(new Circle(this.pos.x, this.pos.y, aP))

    let coh = this.cohesion(cMvrs).mult(cS)
    let sep = this.separation(sMvrs).mult(sS)
    let ali = this.alignment(aMvrs).mult(aS)

    this.applyForce(coh)
    this.applyForce(sep)
    this.applyForce(ali)
}