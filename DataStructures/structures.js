function Node(data) {
    this.data = data
    this.next = null
    this.previous = null
}

// -- STACK --
    function pStack() {
        this.head = null
        this.size = 0
    }

    pStack.prototype.push = function(data) {
        const newNode = new Node(data)
        let top = this.head
            
        this.head = newNode
        this.size++

        if(top == null) {
            return
        } else {
            this.head.next = top
        }
    }

    pStack.prototype.pop = function() {
        let top = this.head

        if(top == null) {
            return null
        } else {
            this.head = this.head.next
            this.size--
            return top.data
        }
    }

    pStack.prototype.peek = function() {
        if(this.head != null) {
            return this.head.data
        } else {
            return null
        }
    }
// --Linked List--
    function pLinkedList() {
        this.head = null
        this.size = 0
    }

    pLinkedList.prototype.append = function(data) {
        const newNode = new Node(data)

        if(this.head == null) {
            this.head = newNode
        } else {
            let current = this.head
            while(current.next != null) {
                current = current.next
            }
            current.next = newNode
        }
        this.size++
    }

    pLinkedList.prototype.prepend = function(data) {
        const newNode = new Node(data)
        
        newNode.next = this.head
        this.head = newNode
        this.size++
    }

    pLinkedList.prototype.removeAt = function(index) {
        if(index == 0) {
            const tmp = this.head.data
            this.head = this.head.next
            this.size--
            return tmp
        }

        const selected = this.getNode(index)
        let prev = this.getNode(index - 1)

        let tmp
        if(selected.next == null) {
            tmp = prev.next.data
            prev.next = null
            this.size--
        } else {
            tmp = prev.next.data
            prev.next = prev.next.next
            this.size--
        }
        return tmp
    }

    pLinkedList.prototype.get = function(index) {
        let current = this.head

        if(current == null) {
            return null
        }

        for(let i = 0; i <= index; i++) {
            if(i == index) {
                return current.data
            }

            current = current.next
        }
    } 

    pLinkedList.prototype.getNode = function(index) {
        let current = this.head

        if(current == null) {
            return null
        }

        for(let i = 0; i <= index; i++) {
            if(i == index) {
                return current
            }

            current = current.next
        }
    }
