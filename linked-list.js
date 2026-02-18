class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(value) {
        const node = new Node(value); 

        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.nextNode = node;
        }
        this.tail = node;
        this.size++;
    }

    prepend(value) {
        const node = new Node(value);

        node.nextNode = this.head;
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
        this.size++;
    }

    size() {
        return this.size;
    }

    head() {
        if (this.head === null) {
            return undefined;
        }
        return this.head.value;
    }

    tail() {
        if (this.tail === null) {
            return undefined;
        }
        return this.tail.value;
    }

    at(index) {
        if (index < 0 || index >= this.size) {
            return undefined;
        }

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.nextNode;
            count++;
        }
        return current.value;
    }

    pop() {
        if (this.head === null) {
            return undefined;
        }
        
        let poppedNode;
        if (this.head === this.tail) {
            poppedNode = this.head;
            this.head = null;
            this.tail = null;
        } else {
            let current = this.head;
            let nextTail = current;

            while (current.nextNode) {
                nextTail = current;
                current = current.nextNode;
            }
            poppedNode = current;
            this.tail = nextTail;
            this.tail.nextNode = null;
        }

        this.size--;
        return poppedNode.value;
    }

    contains(value) {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current.value === value){
                return true;
            }
            current = current.nextNode;
            index++;
        }
        return false;
    }

    toString() {
        let current = this.head;
        let string = "";

        while (current) {
            string += `(${current.value}) -> `;
            current = current.nextNode;
        }
        return string;
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size) {
            return undefined;
        }

        values.forEach((value, i) => {
            const newNode = new Node(value);

            if (index + i === 0) {
                newNode.nextNode = this.head;
                this.head = newNode;
                if (this.size === 0) this.tail = newNode;
            } else if (index + i === this.size) {
                this.tail.nextNode = newNode;
                this.tail = newNode;
            } else {
                let current = this.head;

                for (let count = 0; count < index + i - 1; count++){
                    current = current.nextNode;
                }
                newNode.nextNode = current.nextNode;
                current.nextNode = newNode; 
            }
            this.size++;
        });
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            return undefined;
        }
        
        let removed;

        if (index === 0) {
            removed = this.head;
            this.head = this.head.nextNode;
            if (this.size === 1) this.tail = null;
        } else {
            let current = this.head;
            for (let count = 0; count < index - 1; count++) {
                current = current.nextNode;
            }
            removed = current.nextNode;
            current.nextNode = removed.nextNode;
            if(index === this.size - 1) this.tail = current;
        }
        
        this.size--;
        return removed.value;
    }
}