class QElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}
 
// PriorityQueue class
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        // creating object from queue element
        var qElement = new QElement(element, priority);
        var contain = false;
    
        // iterating through the entire
        // item array to add element at the
        // correct location of the Queue
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                // Once the correct location is found it is
                // enqueued
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
    
        // if the element have the highest priority
        // it is added at the end of the queue
        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        // return the dequeued element
        // and remove it.
        // if the queue is empty
        // returns Underflow
        if (this.isEmpty())
            return null;
        return this.items.shift();
    }

    front() {
        // returns the highest priority element
        // in the Priority queue without removing it.
        if (this.isEmpty())
            return null;
        return this.items[0];
    }

    back() {
        // returns the lowest priority
        // element of the queue
        if (this.isEmpty())
            return null;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length === 0;
    }

    erase(qElement) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.ietms[i].element === qElement.element) {
                this.items.splice(i, 0);
            }
        }
    }
}

export default PriorityQueue;