function Flock() {
    this.size = 0
    this.boids = []
    this.maxspeed = 3
    this.maxforce = 0.0625
    this.drawTree = true
    this.boidTree = new QuadTree(new Rect(width / 2, height / 2, width / 2, height / 2), 75)
}
Flock.prototype.push = function() {
    this.boids.push(new Boid())
    this.size++
    return this
}
Flock.prototype.pop = function() {
    this.boids.splice(this.boids.length - 1)
    this.size--
    return this
}
Flock.prototype.flock = function(cP, cS, sP, sS, aP, aS) {
    
    this.boidTree.buildTree(this.boids)
    if(this.drawTree) {
        this.boidTree.show()
    }

    for(let i = 0; i < this.boids.length; i++) {
        let boid = this.boids[i]
        boid.flock(this.boidTree, cP, cS, sP, sS, aP, aS)
        boid.run()
    }
    return this
}
Flock.prototype.treeCap = function(newCap) {
    if(this.boidTree.capacity != newCap) {
        this.boidTree.setCapacity(newCap)
    }
    return this
}
Flock.prototype.flockSize = function(numberOfBoids) {
    if(this.size != numberOfBoids) {
        if(this.size > numberOfBoids) {
            while(this.size > numberOfBoids) {
                this.pop()
            }
        } else {
            while(this.size < numberOfBoids) {
                this.push()
            }
        }
    }
}
Flock.prototype.showTree = function(bool) {
    this.drawTree = bool
}
Flock.prototype.setSizeAndMaxForce = function(newMaxS, newMaxF) {
    if(newMaxS != this.maxspeed) {
        for(let b of this.boids) {
            b.maxspeed = newMaxS
            this.maxspeed = newMaxS
        }
    }
    if(newMaxF != this.maxforce) {
        for(let b of this.boids) {
            b.maxforce = newMaxF
            this.maxforce = newMaxF
        }
    }
}